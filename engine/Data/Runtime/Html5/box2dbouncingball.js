//----------------------------------------------------------------------------------
//
// CRunMvtbox2dbouncingball
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2012 Clickteam
 *
 * This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
 *
 * Permission is hereby granted to any person obtaining a legal copy
 * of Clickteam Multimedia Fusion 2 to use or modify this source code for
 * debugging, optimizing, or customizing applications created with
 * Clickteam Multimedia Fusion 2.
 * Any other use of this source code is this.hohibited.
 *
 * THE SOFTWARE IS this.hoVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
CRunMvtbox2dbouncingball.B2FLAG_ROTATE = 0x0001;
CRunMvtbox2dbouncingball.BBFLAG_MOVEATSTART = 0x0002;
CRunMvtbox2dbouncingball.B2FLAG_SMOOTH = 0x0004;
CRunMvtbox2dbouncingball.B2FLAG_BULLET = 0x0008;
CRunMvtbox2dbouncingball.B2FLAG_FIXED = 0x0010;
CRunMvtbox2dbouncingball.BBFLAG_FINECOLLISIONS = 0x0020;
CRunMvtbox2dbouncingball.DECMULT = 0.08;
CRunMvtbox2dbouncingball.SPEEDMULT = 0.195;
CRunMvtbox2dbouncingball.MOVING = 123456789;
function CRunMvtbox2dbouncingball()
{
	this.m_type = CRunBox2DBase.MTYPE_OBJECT;
	this.m_angle = 0;
	this.m_friction = 0;
	this.m_gravity = 0;
	this.m_density = 0;
	this.m_restitution = 0;
	this.m_shape = 0;
	this.m_flags = 0;
	this.m_previousX = 0;
	this.m_previousY = 0;
	this.m_addVX = 0;
	this.m_addVY = 0;
	this.m_addVFlag = 0;
	this.m_speed = 0;
	this.m_deceleration = 0;
	this.m_previousAngle = 0;
	this.m_fixture = null;
	this.speedDWORD = 0;
	this.m_scaleX = 1.0;
	this.m_scaleY = 1.0;
	this.m_imgWidth = 0;
	this.m_imgHeight = 0;
	this.m_decelerationDW = 0;
	this.m_applyImpulse = 0;
	this.m_jointType = 0;
	this.m_jointAnchor = 0;
	this.m_rJointLLimit = 0;
	this.m_rJointULimit = 0;
	this.m_dJointFrequency = 0;
	this.m_dJointDamping = 0;
	this.m_pJointLLimit = 0;
	this.m_pJointULimit = 0;
	this.m_jointName = null;
	this.m_jointObject = null;
	this.m_started = false;
	this.m_angleMoving = 0;
}

CRunMvtbox2dbouncingball.prototype = CServices.extend(new CRunMBase(),
	{
		DirAtStart: function (dirAtStart)
		{
			var dir;

			// Compte le nombre de directions demandees
			var cpt = 0;
			var das = dirAtStart;
			var das2;
			for (var n = 0; n < 32; n++)
			{
				das2 = das;
				das >>= 1;
				if (das2 & 1) cpt++;
			}

			// Une ou zero direction?
			if (cpt == 0)
			{
				dir = 0;
			}
			else
			{
				// Appelle le hasard pour trouver le bit
				cpt = this.rh.random(cpt);
				das = dirAtStart;
				for (dir = 0; ; dir++)
				{
					das2 = das;
					das >>= 1;
					if (das2 & 1)
					{
						cpt--;
						if (cpt < 0) break;
					}
				}
			}
			return dir;
		},

		initialize: function (file)
		{
		    file.skipBytes(1);
		    this.ho.roc.rcDir = this.DirAtStart(file.readAInt());
		    this.m_angle = (this.ho.roc.rcDir * 180.0) / 16.0;
			this.m_friction = file.readAInt() / 100.0;
			this.m_gravity = file.readAInt() / 100.0;
			this.m_density = file.readAInt() / 100.0;
			this.m_restitution = file.readAInt() / 100.0;
			this.m_flags = file.readAInt() | CRunMvtbox2dbouncingball.BBFLAG_MOVEATSTART;
			this.m_shape = file.readAShort();
			this.m_speedDWORD = file.readAInt();
			this.m_speed = this.m_speedDWORD * CRunMvtbox2dbouncingball.SPEEDMULT;
			this.m_decelerationDW = file.readAInt();
			this.m_deceleration = this.m_decelerationDW * CRunMvtbox2dbouncingball.DECMULT;
			this.m_identifier = file.readAInt();
			this.m_jointType = file.readAShort();
			this.m_jointAnchor = file.readAShort();
			this.m_jointName = file.readAString(CRunBox2DBase.MAX_JOINTNAME);
			this.m_jointObject = file.readAString(CRunBox2DBase.MAX_JOINTOBJECT);
			this.m_rJointLLimit = file.readAInt() * Box2D.Common.b2Settings.b2_pi / 180.0;
			this.m_rJointULimit = file.readAInt() * Box2D.Common.b2Settings.b2_pi / 180.0;
			this.m_dJointFrequency = file.readAInt();
			this.m_dJointDamping = file.readAInt() / 100.0;
			this.m_pJointLLimit = file.readAInt();
			this.m_pJointULimit = file.readAInt();

			this.m_applyImpulse = 0;

			this.m_addVX = this.m_addVY = 0;
			this.m_addVFlag = false;
			this.m_previousAngle = -1;
			this.m_started = false;

			this.m_base = this.GetBase();
			this.m_body = null;
			this.InitBase(this.ho, CRunMBase.MTYPE_OBJECT);
		},

		kill: function ()
		{
			var pBase = this.GetBase();
			if (pBase != null)
			{
				pBase.rDestroyBody(this.m_body);
			}
		},

		GetBase: function ()
		{
			var pOL = 0;
			var nObjects = 0;
			for (nObjects = 0; nObjects < this.rh.rhNObjects; pOL++, nObjects++)
			{
				while (this.rh.rhObjectList[pOL] == null) pOL++;
				var pBase = this.rh.rhObjectList[pOL];
				if (pBase.hoType >= 32)
				{
					if (pBase.hoCommon.ocIdentifier == CRun.BASEIDENTIFIER)
					{
						if (pBase.ext.identifier == this.m_identifier)
						{
							return pBase.ext;
						}
					}
				}
			}
			return null;
		},

		CreateBody: function ()
		{
			if (this.m_body != null)
				return true;

			if (this.m_base == null)
			{
				this.m_base = this.GetBase();
				if (this.m_base == null)
				{
					if (!bAlerted)
					{
						alert("Please drop a Physics - Engine object in the frame.");
						bAlerted = true;
					}
				}
			}

			if (this.m_base == null)
				return false;

			var flags = CRunBox2DBase.CBFLAG_DAMPING;
			if (this.m_flags & CRunMvtbox2dbouncingball.B2FLAG_BULLET)
				flags |= CRunBox2DBase.CBFLAG_BULLET;
			this.m_body = this.m_base.rCreateBody(Box2D.Dynamics.b2Body.b2_dynamicBody, this.ho.hoX, this.ho.hoY, this.m_angle, this.m_gravity, this, flags, this.m_deceleration);
			if (!this.ho.roa)
			{
				this.m_shape = 0;
				this.m_imgWidth = this.ho.hoImgWidth;
				this.m_imgHeight = this.ho.hoImgHeight;
			}
			else
			{
				this.m_image = this.ho.roc.rcImage;
				var img = this.rh.rhApp.imageBank.getImageFromHandle(this.m_image);
				this.m_imgWidth = img.width;
				this.m_imgHeight = img.height;
			}
			this.CreateFixture();

			var position = this.m_body.GetPosition();
			this.m_previousX = position.x;
			this.m_previousY = position.y;
			this.m_currentAngle = this.m_angle;
			if ((this.m_flags & CRunMvtbox2dbouncingball.BBFLAG_MOVEATSTART))
			{
				var angle = this.m_angle * Box2D.Common.b2Settings.b2_pi / 180.0;
				var vect = new Box2D.Common.Math.b2Vec2(this.m_speed * Math.cos(angle), this.m_speed * Math.sin(angle));
				this.m_body.SetLinearVelocity(vect);
				if (this.m_speed == 0)
					this.m_angleMoving = this.m_angle;
				else
					this.m_angleMoving = CRunMvtbox2dbouncingball.MOVING;
			}
			else
			{
				this.m_angleMoving = this.m_angle;
			}
			return true;
		},

		CreateFixture: function ()
		{
			if (this.m_fixture != null)
			{
				this.m_base.rBodyDestroyFixture(this.m_body, this.m_fixture);
			}
			this.m_scaleX = this.ho.roc.rcScaleX;
			this.m_scaleY = this.ho.roc.rcScaleY;
			switch (this.m_shape)
			{
				case 0:
					this.m_fixture = this.m_base.rBodyCreateBoxFixture(this.m_body, this, this.ho.hoX, this.ho.hoY, this.m_imgWidth * this.m_scaleX, this.m_imgHeight * this.m_scaleY, this.m_density, this.m_friction, this.m_restitution);
					break;
				case 1:
					this.m_fixture = this.m_base.rBodyCreateCircleFixture(this.m_body, this, this.ho.hoX, this.ho.hoY, (this.ho.hoImgWidth + this.ho.hoImgHeight) / 4 * (this.m_scaleX + this.m_scaleY) / 2, this.m_density, this.m_friction, this.m_restitution);
					break;
				case 2:
					this.m_fixture = this.m_base.rBodyCreateShapeFixture(this.m_body, this, this.ho.hoX, this.ho.hoY, this.ho.roc.rcImage, this.m_density, this.m_friction, this.m_restitution, this.m_scaleX, this.m_scaleY);
					break;
			}
		},

		CreateJoint: function ()
		{
			switch (this.m_jointType)
			{
				case CRunBox2DBase.JTYPE_REVOLUTE:
					this.m_base.rJointCreate(this, this.m_jointType, this.m_jointAnchor, this.m_jointName, this.m_jointObject, this.m_rJointLLimit, this.m_rJointULimit);
					break;
				case CRunBox2DBase.JTYPE_DISTANCE:
					this.m_base.rJointCreate(this, this.m_jointType, this.m_jointAnchor, this.m_jointName, this.m_jointObject, this.m_dJointFrequency, this.m_dJointDamping);
					break;
				case CRunBox2DBase.JTYPE_PRISMATIC:
					this.m_base.rJointCreate(this, this.m_jointType, this.m_jointAnchor, this.m_jointName, this.m_jointObject, this.m_pJointLLimit, this.m_pJointULimit);
					break;
				default:
					break;
			}
		},

		move:           function ()
		{
		    if (!this.CreateBody() || this.m_base.isPaused())
				return false;

			// Scale changed?
			if (this.ho.roc.rcScaleX != this.m_scaleX || this.ho.roc.rcScaleY != this.m_scaleY)
				this.CreateFixture();

			this.m_base.rBodyAddVelocity(this.m_body, this.m_addVX, this.m_addVY);
			if (this.m_addVFlag)
				this.m_addVFlag = false;
			else
			{
				this.m_addVX = 0;
				this.m_addVY = 0;
			}

			if (this.m_flags & CRunMvtbox2dbouncingball.B2FLAG_FIXED)
			{
				var v = this.m_body.GetLinearVelocity();
				var angle = Math.atan2(v.y, v.x) * 180.0 / 3.141592653589;
				if (this.m_angleMoving != CRunMvtbox2dbouncingball.MOVING)
				{
					if (Math.abs(v.x) < 0.01 && Math.abs(v.y) < 0.01)
					{
						angle = this.m_angleMoving;
					}
				}
				this.m_base.rBodySetAngle(this.m_body, angle);
			}
			var o = {};
			this.m_base.rGetBodyPosition(this.m_body, o);
			this.m_currentAngle = o.angle;
			if (o.x != this.ho.hoX || o.y != this.ho.hoY)
			{
				this.ho.hoX = o.x;
				this.ho.hoY = o.y;
				this.m_started = true;
				this.ho.roc.rcChanged = true;
			}
			if (this.m_currentAngle != this.m_previousAngle)
			{
				this.SetTheAngle(this.m_currentAngle);
			}

			if (this.m_deceleration == 0)
			{
				if (this.m_applyImpulse > 0)
				{
					this.m_applyImpulse--;
					if (this.m_applyImpulse == 0)
					{
						var vect = this.m_body.GetLinearVelocity();
						var angle = Math.atan2(vect.y, vect.x);
						var length = Math.sqrt(vect.x * vect.x + vect.y * vect.y);
						vect.x = Math.max(this.m_speed, length) * Math.cos(angle);
						vect.y = Math.max(this.m_speed, length) * Math.sin(angle);
						this.m_body.SetLinearVelocity(vect);
					}
				}
			}

			var position = this.m_body.GetPosition();
			var deltaX = (position.x - this.m_previousX) * this.m_base.factor;
			var deltaY = (position.y - this.m_previousY) * this.m_base.factor;
			this.m_previousX = position.x;
			this.m_previousY = position.y;
			var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			this.ho.roc.rcSpeed = Math.floor((50.0 * length / 7.0) * this.rh.rh4MvtTimerCoef);
			this.ho.roc.rcSpeed = Math.min(this.ho.roc.rcSpeed, 250);

			var anim = CAnim.ANIMID_STOP;
			if (this.ho.roc.rcSpeed > 0)
				anim = CAnim.ANIMID_WALK;
			this.animations(anim);
			if (this.flags & CRunMvtbox2dbouncingball.BBFLAG_FINECOLLISIONS)
				this.collisions();
			return this.ho.roc.rcChanged != 0;
		},
		SetTheAngle:    function (angle)
		{
			this.m_previousAngle = angle;
			this.ho.roc.rcChanged = true;
			if (this.m_flags & CRunMvtbox2dbouncingball.B2FLAG_ROTATE)
			{
				this.ho.roc.rcAngle = angle;
				this.ho.roc.rcDir = 0;
			}
			else
			{
				this.ho.roc.rcDir = Math.floor(angle / 11.25);
				while (this.ho.roc.rcDir < 0)
					this.ho.roc.rcDir += 32;
				while (this.ho.roc.rcDir >= 32)
					this.ho.roc.rcDir -= 32;
			}
		},
		SetFriction:    function (friction)
		{
			this.m_friction = friction / 100.0;
			this.m_fixture.SetFriction(this.m_friction);
		},
		SetGravity:     function (gravity)
		{
			this.m_gravity = gravity / 100.0;
			this.m_body.SetGravityScale(this.m_gravity);
		},
		SetDensity:     function (density)
		{
			this.m_density = density / 100.0;
			this.m_base.rBodyResetMassData(this.m_body);
		},
		SetRestitution: function (restitution)
		{
			this.m_restitution = restitution / 100.0;
			this.m_fixture.SetRestitution(this.m_restitution);
		},

		setAngle: function (angle)
		{
			if (this.m_angleMoving != CRunMvtbox2dbouncingball.MOVING)
				this.m_angleMoving = angle;
			this.m_base.rBodySetAngle(this.m_body, angle);
			if (!this.m_started) {
			    this.SetTheAngle(angle);
				var vect = this.m_body.GetLinearVelocity();
				var length = Math.sqrt(vect.x * vect.x + vect.y * vect.y);
				vect.x = length * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0);
				vect.y = length * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0);
				this.m_body.SetLinearVelocity(vect);
			}
		},

		getAngle: function ()
		{
			if (this.m_flags & CRunMvtbox2dbouncingball.B2FLAG_ROTATE)
			{
				var angle = this.m_currentAngle;
				while (angle >= 360)
					angle -= 360;
				while (angle < 0)
					angle += 360;
				return angle;
			}
			return CRunMBase.ANGLE_MAGIC;
		},

		setPosition: function (x, y)
		{
			if (x != this.ho.hoX || y != this.ho.hoY)
			{
				if (!this.m_started)
				{
					this.ho.hoX = x;
					this.ho.hoY = y;
				}
				this.m_base.rBodySetPosition(this.m_body, x, y);
			}
		},

		setXPosition: function (x)
		{
			if (x != this.ho.hoX)
			{
				if (!this.m_started)
					this.ho.hoX = x;
				this.m_base.rBodySetPosition(this.m_body, x, CRunBox2DBase.POSDEFAULT);
			}
		},

		setYPosition: function (y)
		{
			if (y != this.ho.hoY)
			{
				if (!this.m_started)
					this.ho.hoY = y;
				this.m_base.rBodySetPosition(this.m_body, CRunBox2DBase.POSDEFAULT, y);
			}
		},

		stop: function (bCurrent)
		{
			this.SetStopFlag(true);
			if (this.m_eventCount != this.rh.rh4EventCount)
			{
				if (this.m_angleMoving == CRunMvtbox2dbouncingball.MOVING)
				{
					var v = this.m_body.GetLinearVelocity();
					var angle = Math.atan2(v.y, v.x) * 180.0 / 3.141592653589;
					this.m_angleMoving = angle;
				}
				this.m_base.rBodySetLinearVelocityAdd(this.m_body, 0, 0, 0, 0);
			}
		},

		bounce: function (bCurrent)
		{
			this.SetStopFlag(true);
			this.m_applyImpulse = 1;
			if (this.m_eventCount != this.ho.hoAdRunHeader.rh4EventCount)
			{
				var velocity = this.m_body.GetLinearVelocity();
				velocity.x = -velocity.x;
				velocity.y = -velocity.y;
				this.m_body.SetLinearVelocity(velocity);
			}
		},

		setDir: function (dir)
		{
			this.setAngle(dir * 11.25);
		},

		getDir: function ()
		{
			if (this.m_flags & CRunMvtbox2dbouncingball.B2FLAG_ROTATE)
				return Math.floor(this.m_currentAngle / 11.25);
			else
				return this.ho.roc.rcDir;
		},

		setGravity: function (gravity)
		{
			this.m_gravity = gravity / 100.0;
			this.m_body.SetGravityScale(this.m_gravity);
		},

		setSpeed: function (speed)
		{
			var v = this.m_body.GetLinearVelocity();
			var angle = Math.atan2(v.y, v.x) * 180.0 / 3.141592653589;
			if (speed == 0)
			{
				if (this.m_angleMoving == CRunMvtbox2dbouncingball.MOVING)
					this.m_angleMoving = angle;
			}
			else
			{
				if (this.m_angleMoving != CRunMvtbox2dbouncingball.MOVING)
				{
					if (Math.abs(v.x) < 0.01 && Math.abs(v.y) < 0.01)
					{
						angle = this.m_angleMoving;
					}
				}
				this.m_angleMoving = CRunMvtbox2dbouncingball.MOVING;
			}
			this.m_base.rBodySetLinearVelocity(this.m_body, speed * CRunMvtbox2dbouncingball.SPEEDMULT, angle);
		},

		getSpeed: function ()
		{
			return this.ho.roc.rcSpeed;
		},

		getGravity: function ()
		{
			return this.m_gravity * 100.0;
		},

		setDec: function (dec)
		{
			this.m_decelerationDW = dec;
			this.m_deceleration = dec * CRunMvtbox2dbouncingball.DECMULT;
			this.m_body.SetLinearDamping(this.m_deceleration);
		},

		getDeceleration: function ()
		{
			return this.m_decelerationDW;
		},

		actionEntry: function (action)
		{
			if (this.m_base == null)
				return 0;

			switch (action)
			{
				case CAct.ACT_EXTSETGRAVITYSCALE:
					this.SetGravity(this.getParam());
					break;
				case CAct.ACT_EXTSETFRICTION:
					this.SetFriction(this.getParam());
					break;
				case CAct.ACT_EXTSETELASTICITY:
					this.SetRestitution(this.getParam());
					break;
				case CAct.ACT_EXTSETDENSITY:
					this.SetDensity(this.getParam());
					break;
				case CAct.ACT_EXTAPPLYIMPULSE:
					var force = this.getParam()[0] / 100.0 * CRunBox2DBase.APPLYIMPULSE_MULT;
					var angle = this.getParam()[1];
					this.m_base.rBodyApplyMMFImpulse(this.m_body, force, angle);
					break;
				case CAct.ACT_EXTAPPLYANGULARIMPULSE:
					var torque = this.getParam() / 100.0 * CRunBox2DBase.APPLYANGULARIMPULSE_MULT;
					this.m_base.rBodyApplyAngularImpulse(this.m_body, torque);
					break;
				case CAct.ACT_EXTAPPLYFORCE:
					var force = this.getParam()[0] / 100.0 * CRunBox2DBase.APPLYFORCE_MULT;
					var angle = this.getParam()[1];
					this.m_base.rBodyApplyForce(this.m_body, force, angle);
					break;
				case CAct.ACT_EXTAPPLYTORQUE:
					var torque = this.getParam() / 100.0 * CRunBox2DBase.APPLYTORQUE_MULT;
					this.m_base.rBodyApplyTorque(this.m_body, torque);
					break;
				case CAct.ACT_EXTSETLINEARVELOCITY:
					var force = this.getParam()[0] / 100.0 * CRunBox2DBase.SETVELOCITY_MULT;
					var angle = this.getParam()[1];
					this.m_base.rBodySetLinearVelocity(this.m_body, force, angle);
					break;
				case CAct.ACT_EXTSETANGULARVELOCITY:
					var torque = this.getParam() / 100.0 * CRunBox2DBase.SETANGULARVELOCITY_MULT;
					this.m_base.rBodySetAngularVelocity(this.m_body, torque);
					break;
				case CAct.ACT_EXTSTOPFORCE:
					this.m_base.rBodyStopForce(this.m_body);
					break;
				case CAct.ACT_EXTSTOPTORQUE:
					this.m_base.rBodyStopTorque(this.m_body);
					break;
				case CExp.EXP_EXTGETFRICTION:
					return this.m_friction * 100;
				case CExp.EXP_EXTGETRESTITUTION:
					return this.m_restitution * 100;
				case CExp.EXP_EXTGETDENSITY:
					return this.m_density * 100;
				case CExp.EXP_EXTGETVELOCITY:
					var v = this.m_body.GetLinearVelocity();
					var velocity = Math.sqrt(v.x * v.x + v.y * v.y) * 100.0 / CRunBox2DBase.SETVELOCITY_MULT;
					if (velocity < 0.001)
						velocity = 0;
					return velocity;
				case CExp.EXP_EXTGETANGLE:
					var v = this.m_body.GetLinearVelocity();
					if (Math.abs(v.x) < 0.001 && Math.abs(v.y) < 0.001)
						return -1;
					var angle = Math.atan2(v.y, v.x) * 180.0 / 3.141592653589;
					if (angle < 0)
						angle = 360 + angle;
					return angle;
				case CExp.EXP_EXTGETMASS:
					return this.m_body.GetMass();
			    case CExp.EXP_EXTGETANGULARVELOCITY:
			        return (this.m_body.GetAngularVelocity() * 100.0) / CRunBox2DBase.SETANGULARVELOCITY_MULT;
			    default:
					break;
			}
			return 0;
		}
	});


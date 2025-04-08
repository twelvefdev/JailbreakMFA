//----------------------------------------------------------------------------------
//
// CRunMvtbox2d8directions
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
CRunMvtbox2d8directions.B2FLAG_ROTATE = 0x0001;
CRunMvtbox2d8directions.B2FLAG_FINECOLLISIONS = 0x0004;
CRunMvtbox2d8directions.ACCMULT = 3.0;
CRunMvtbox2d8directions.DECMULT = 0.05;

function CRunMvtbox2d8directions()
{
	this.m_type = CRunBox2DBase.MTYPE_OBJECT;

	this.m_angle = 0;
	this.m_friction = 0;
	this.m_gravity = 0;
	this.m_density = 0;
	this.m_restitution = 0;
	this.m_speed = 0;
	this.m_acceleration = 0;
	this.m_deceleration = 0;
	this.m_shape = 0;
	this.m_flags = 0;
	this.m_previousX = 0;
	this.m_previousY = 0;
	this.m_player = 0;
	this.m_dirs = 0;
	this.m_currentSpeed = 0;
	this.m_addVX = 0;
	this.m_addVY = 0;
	this.m_addVFlag = false;
	this.m_previousAngle = 0;
	this.m_fixture = null;
	this.m_rotationSpeed = 0;
	this.m_gotoSpeed = 0;
	this.m_gotoAngle = 0;
	this.m_calculAngle = 0;
	this.m_numberOfSteps = 0;
	this.m_fixture = null;
	this.m_imgWidth = 0;
	this.m_imgHeight = 0;
	this.m_scaleX = 1.0;
	this.m_scaleY = 1.0;
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
}

CRunMvtbox2d8directions.prototype = CServices.extend(new CRunMBase(),
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
			// Store pointer to edit data
			file.skipBytes(1);
			this.m_currentAngle = this.DirAtStart(file.readAInt()) * 180.0 / 16.0;
			this.m_friction = file.readAInt() / 100.0;
			this.m_gravity = file.readAInt() / 100.0;
			this.m_density = file.readAInt() / 100.0;
			this.m_restitution = file.readAInt() / 100.0;
			this.m_flags = file.readAInt();
			this.m_shape = file.readAShort();
			this.ho.roc.rcMaxSpeed = file.readAInt();
			this.m_speed = this.ho.roc.rcMaxSpeed / 100.0 / 2.0;
			this.m_acceleration = file.readAInt() / (100.0 * CRunMvtbox2d8directions.ACCMULT);
			this.m_deceleration = file.readAInt() * CRunMvtbox2d8directions.DECMULT;
			this.m_dirs = file.readAInt();
			this.m_identifier = file.readAInt();
			this.m_rotationSpeed = file.readAInt() / 100.0 * 20.0;
			this.m_player = file.readAInt();
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

			this.m_currentSpeed = 0;
			if (this.m_rotationSpeed >= 100)
				this.m_rotationSpeed = 360.0;
			this.m_gotoSpeed = 0;
			this.m_currentAngle = this.Minus(this.m_currentAngle);
			this.m_gotoAngle = this.m_currentAngle;
			this.m_calculAngle = this.m_currentAngle;
			this.m_numberOfSteps = 0;
			this.ho.roc.rcMinSpeed = 0;
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

			this.m_body = this.m_base.rCreateBody(Box2D.Dynamics.b2Body.b2_dynamicBody, this.ho.hoX, this.ho.hoY, this.m_angle, this.m_gravity, this, 0, 0);
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

			this.m_body.SetLinearDamping(this.m_deceleration);
			var position = this.m_body.GetPosition();
			this.m_previousX = position.x;
			this.m_previousY = position.y;

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

		Normalize: function (angle)
		{
			while (angle > 360.0)
				angle -= 360.0;
			while (angle < 0.0)
				angle += 360.0;
			return angle;
		},

		Minus: function (angle)
		{
			if (angle > 180.0)
				angle = angle - 360.0;
			return angle;
		},

		move:            function ()
		{
		    if (!this.CreateBody(this.ho) || this.m_base.isPaused())
				return false;

			// Scale changed?
			if (this.ho.roc.rcScaleX != this.m_scaleX || this.ho.roc.rcScaleY != this.m_scaleY)
				this.CreateFixture();

			// Get the joystick
			var j = this.rh.rhPlayer[this.m_player];

			// Rotation of the ship
			var anim = CAnim.ANIMID_STOP;
			var flag = false;
			if ((j & 15) != 0)
			{
				var mask = 1 << CMove.Joy2Dir[j & 15];
				if (this.m_dirs & mask)
				{
					this.m_gotoAngle = CMove.Joy2Dir[j & 15] * 11.25;
					this.m_gotoAngle = this.Minus(this.m_gotoAngle);
					this.m_calculAngle = this.Minus(this.m_calculAngle);
					var dir = this.m_gotoAngle - this.m_calculAngle;
					if (dir > 0 && Math.abs(dir) <= 180)
						this.m_gotoSpeed = this.m_rotationSpeed;
					else if (dir > 0 && Math.abs(dir) > 180)
						this.m_gotoSpeed = -this.m_rotationSpeed;
					else if (dir < 0 && Math.abs(dir) <= 180)
						this.m_gotoSpeed = -this.m_rotationSpeed;
					else if (dir < 0 && Math.abs(dir) > 180)
						this.m_gotoSpeed = this.m_rotationSpeed;
					if (this.m_rotationSpeed != 0) {
					    if (Math.abs(dir) < 180)
					        this.m_numberOfSteps = Math.max(1, Math.floor(Math.abs(dir) / this.m_rotationSpeed));
					    else
					        this.m_numberOfSteps = Math.max(1, Math.floor((360.0 - Math.abs(dir)) / this.m_rotationSpeed));
					}
					else {
					    this.m_numberOfSteps = 1;
					}
                    flag = true;
				}
			}
			if (this.m_numberOfSteps > 0)
			{
				this.m_calculAngle += this.m_gotoSpeed;
				this.m_numberOfSteps--;
				if (this.m_numberOfSteps == 0)
				{
					this.m_calculAngle = this.m_gotoAngle;
				}
				this.m_currentAngle = this.Normalize(this.m_calculAngle);
			}
			if (flag)
			{
				this.m_body.SetLinearDamping(0);
				this.m_base.rBodyAddLinearVelocity(this.m_body, this.m_acceleration, this.m_currentAngle);
			}
			else
			{
				this.m_body.SetLinearDamping(this.m_deceleration);
			}
			this.m_base.rBodyAddVelocity(this.m_body, this.m_addVX, this.m_addVY);
			this.ResetAddVelocity();
			this.m_base.rBodySetAngle(this.m_body, this.m_currentAngle);
			this.SetCurrentAngle();

			var position = this.m_body.GetPosition();
			var deltaX = (position.x - this.m_previousX) * this.m_base.factor;
			var deltaY = (position.y - this.m_previousY) * this.m_base.factor;
			this.m_previousX = position.x;
			this.m_previousY = position.y;
			var length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
			this.ho.roc.rcSpeed = Math.floor((50.0 * length / 7.0) * this.rh.rh4MvtTimerCoef);
			this.ho.roc.rcSpeed = Math.min(this.ho.roc.rcSpeed, 250);
			this.animations(anim);
			if (this.m_flags & CRunMvtbox2d8directions.B2FLAG_FINECOLLISIONS)
				this.collisions();

			var o = {};
			this.m_base.rGetBodyPosition(this.m_body, o);
			if (o.x != this.ho.hoX || o.y != this.ho.hoY)
			{
				this.ho.hoX = o.x;
				this.ho.hoY = o.y;
				this.m_started = true;
				this.ho.roc.rcChanged = true;
			}

			// The object has been moved
			return this.ho.roc.rcChanged;
		},
		SetCurrentAngle: function ()
		{
			if (this.m_currentAngle != this.m_previousAngle)
			{
				this.m_previousAngle = this.m_currentAngle;
				this.ho.roc.rcChanged = true;
				if (this.m_flags & CRunMvtbox2d8directions.B2FLAG_ROTATE)
				{
					this.ho.roc.rcAngle = this.m_currentAngle;
					this.ho.roc.rcDir = 0;
				}
				else
				{
					this.ho.roc.rcDir = Math.floor(this.m_currentAngle / 11.25);
					while (this.ho.roc.rcDir < 0)
						this.ho.roc.rcDir += 32;
					while (this.ho.roc.rcDir >= 32)
						this.ho.roc.rcDir -= 32;
				}
			}
		},
		SetFriction:     function (friction)
		{
			this.m_friction = friction / 100.0;
			this.m_fixture.SetFriction(this.m_friction);
		},
		SetGravity:      function (gravity)
		{
			this.m_gravity = gravity / 100.0;
			this.m_body.SetGravityScale(this.m_gravity);
		},
		SetDensity:      function (density)
		{
			this.m_density = density / 100.0;
			this.m_base.rBodyResetMassData(this.m_body);
		},
		SetRestitution:  function (restitution)
		{
			this.m_restitution = restitution / 100.0;
			this.m_fixture.SetRestitution(this.m_restitution);
		},

		setAngle: function (angle)
		{
			this.m_currentAngle = angle;
			this.m_calculAngle = angle;
			if (!this.m_started)
				this.SetCurrentAngle();

			var vect = this.m_body.GetLinearVelocity();
			var length = Math.sqrt(vect.x * vect.x + vect.y * vect.y);
			vect.x = length * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0);
			vect.y = length * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0);
			this.m_body.SetLinearVelocity(vect);
		},

		getAngle: function ()
		{
			if (this.m_flags & CRunMvtbox2d8directions.B2FLAG_ROTATE)
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
				{
					this.ho.hoX = x;
				}
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
				this.m_base.rBodySetLinearVelocityAdd(this.m_body, 0, 0, 0, 0);
			}
		},

		setDir: function (dir)
		{
			if (this.m_flags & CRunMvtbox2d8directions.B2FLAG_ROTATE)
			{
				var angle = dir * 11.25;
				this.SetAngle(angle);
			}
			else
				this.ho.roc.rcDir = dir;
		},
		getDir: function ()
		{
			if (this.m_flags & CRunMvtbox2d8directions.B2FLAG_ROTATE)
				return Math.floor(this.m_currentAngle / 11.25);
			else
				return this.ho.roc.rcDir;
		},

		setSpeed: function (speed)
		{
			var speedf = speed / 100.0 * CRunBox2DBase.SETVELOCITY_MULT;
			var angle = this.m_base.rBodyGetAngle(this.m_body);
			this.m_base.rBodySetLinearVelocity(this.m_body, speedf, angle);
		},

		setAcc: function (acc)
		{
			this.m_acceleration = acc / (100.0 * CRunMvtbox2d8directions.ACCMULT);
		},

		setDec: function (dec)
		{
			this.m_deceleration = dec * CRunMvtbox2d8directions.DECMULT;
		},

		setGravity: function (gravity)
		{
			this.m_gravity = gravity / 100.0;
			this.m_body.SetGravityScale(this.m_gravity);
		},

		getSpeed: function ()
		{
			return this.ho.roc.rcSpeed;
		},

		getAcceleration: function ()
		{
			return this.m_acceleration * (100.0 * CRunMvtbox2d8directions.ACCMULT);
		},

		getDeceleration: function ()
		{
			return this.m_deceleration / CRunMvtbox2d8directions.DECMULT;
		},

		getGravity: function ()
		{
			return this.m_gravity * 100.0;
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
				case CAct.ACT_EXTAPPLYFORCE:
					var force = this.getParam()[0] / 100.0 * CRunBox2DBase.APPLYFORCE_MULT;
					var angle = this.getParam()[1];
					this.m_base.rBodyApplyForce(this.m_body, force, angle);
					break;
				case CAct.ACT_EXTSETLINEARVELOCITY:
					var force = this.getParam()[0] / 100.0 * CRunBox2DBase.SETVELOCITY_MULT;
					var angle = this.getParam()[1];
					this.m_base.rBodySetLinearVelocity(this.m_body, force, angle);
					break;
				case CAct.ACT_EXTSTOPFORCE:
					this.m_base.rBodyStopForce(this.m_body);
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



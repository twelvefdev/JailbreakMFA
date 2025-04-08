//----------------------------------------------------------------------------------
//
// CRunMvtbox2dplatform
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
 * LIABILITY, WHETHER IN AN ACTION OF RACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
CRunMvtbox2dplatform.B2FLAG_ROTATE = 0x0001;
CRunMvtbox2dplatform.ACCMULT = 1.0;
CRunMvtbox2dplatform.DECMULT = 1.0;
CRunMvtbox2dplatform.MPFLAG_CONTROLJUMP = 0x0001;
CRunMvtbox2dplatform.MPFLAG_ALLOWCROUCH = 0x0002;
CRunMvtbox2dplatform.MPFLAG_JUMPCROUCHED = 0x0004;
CRunMvtbox2dplatform.MPFLAG_ACCMOVEMENTS = 0x0008;
CRunMvtbox2dplatform.MPFLAG_FINECOLLISIONS = 0x0010;
CRunMvtbox2dplatform.MPFLAG_JUMPSTOPXIFNOINPUT = 0x0020;
CRunMvtbox2dplatform.GDIR_BOTTOM = 0;
CRunMvtbox2dplatform.GDIR_TOP = 1;
CRunMvtbox2dplatform.GDIR_LEFT = 2;
CRunMvtbox2dplatform.GDIR_RIGHT = 3;

function CRunMvtbox2dplatform()
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
	this.m_flags = 0;
	this.m_previousX = 0;
	this.m_previousY = 0;
	this.m_player = 0;
	this.m_currentSpeed = 0;
	this.m_strength = 0;
	this.m_strength2 = 0;
	this.m_jumps = 0;
	this.m_control = 0;
	this.m_offsetY = 0;
	this.m_previousJump = 0;
	this.m_jump = 0;
	this.m_jumpCounter = 0;
	this.m_crouchSpeed = 0;
	this.m_deltaX = 0;
	this.m_deltaY = 0;
	this.m_addVX = 0;
	this.m_addVY = 0;
	this.m_addVFlag = 0;
	this.m_setVX = 0;
	this.m_setVY = 0;
	this.m_setVFlag = 0;
	this.m_previousAngle = 0;
	this.m_fixture = null;
	this.m_climbingSpeed = 0;
	this.m_offsetX = 0;
	this.gravityAngle = 0;
	this.m_collidingObject = null;
	this.m_gravityDir = 0;
	this.m_scaleX = 1.0;
	this.m_scaleY = 1.0;
	this.m_imgWidth = 0;
	this.m_imgHeight = 0;
	this.m_maskWidth = 100;
	this.platformUnder = null;
	this.previousPlatformUnder = null;
	this.m_platformPositionX = 0;
	this.m_platformPositionY = 0;
	this.m_loopCollision = -10;
	this.m_previousLadder = false;
	this.m_previousLadderDir = 0;
	this.m_previousLadderEnd = 0;
	this.m_onLadder = false;
	this.m_falling = 0;
	this.m_noStop = false;
}

CRunMvtbox2dplatform.prototype = CServices.extend(new CRunMBase(),
	{
		initialize: function (file)
		{
			// Store pointer to edit data
			file.skipBytes(1);
			this.m_angle = file.readAInt();
			this.m_strength2 = file.readAInt() / 100.0 * 25.0;
			this.m_gravity = file.readAInt() / 100.0;
			this.m_density = file.readAInt() / 100.0;
			this.m_restitution = file.readAInt() / 100.0;
			this.m_flags = file.readAInt();
			var speed = file.readAInt();
			this.m_speed = speed / 100.0 * 10.0;
			this.m_acceleration = file.readAInt() / (100.0 * CRunMvtbox2dplatform.ACCMULT);
			this.m_deceleration = file.readAInt() / (100.0 * CRunMvtbox2dplatform.DECMULT);
			this.m_strength = file.readAInt() / 100.0 * 25.0;
			this.m_jumps = file.readAInt();
			this.m_control = file.readAShort();
			this.m_crouchSpeed = file.readAInt() / 100.0 * 10.0;
			this.m_friction = 0;
			this.m_player = file.readAInt();
			this.m_identifier = file.readAInt();
			this.m_climbingSpeed = file.readAInt() / 100.0 * 10.0;
			this.m_maskWidth = file.readAInt() / 100.0;

			this.platformUnder = null;
			this.m_currentSpeed = 0;
			this.m_previousJump = false;
			this.m_jump = 0;
			this.ho.roc.rcMinSpeed = 0;
			this.ho.roc.rcMaxSpeed = speed;
			this.m_addVX = 0;
			this.m_addVY = 0;
			this.m_addVFlag = false;
			this.m_setVX = 0;
			this.m_setVY = 0;
			this.m_setVFlag = false;
			this.m_previousAngle = -1;
			this.m_falling = 0;
			this.m_noStop = false;

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

		SetVelocity: function (vx, vy)
		{
			this.m_setVX = vx * 22.5;
			this.m_setVY = vy * 22.5;
			this.m_setVFlag = true;
		},

		CreateBody: function ()
		{
			if (this.m_body != null)
				return true;
			if (!this.ho.roa)
				return false;

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

			this.ho.roc.rcDir = ((this.m_angle & 31) / 16) * 16;
			this.m_currentAngle = 0.0;
			if (this.ho.roc.rcDir == 16)
			    this.m_currentAngle = 180.0;
			this.ho.roc.rcSpeed = 0;
			this.animations(CAnim.ANIMID_STOP);

			this.m_body = this.m_base.rCreateBody(Box2D.Dynamics.b2Body.b2_dynamicBody, this.ho.hoX, this.ho.hoY, 0, this.m_gravity, this, CRunBox2DBase.CBFLAG_FIXEDROTATION, 0);
			this.CreateFixture();

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

			var o = {};
			this.m_base.rBodyCreatePlatformFixture(this.m_body, this, this.ho.roc.rcImage, 0, 0, this.m_density, this.m_friction, this.m_restitution, o, this.m_scaleX, this.m_scaleY, this.m_maskWidth);
			this.m_fixture = o.pFixture;

			this.m_offsetX = 0;
			this.m_offsetY = 0;
		},

		move: function ()
		{
		    if (!this.CreateBody() || this.m_base.isPaused())
				return false;

			// Scale changed?
			if (this.ho.roc.rcScaleX != this.m_scaleX || this.ho.roc.rcScaleY != this.m_scaleY)
				this.CreateFixture();

			// Get the joystick
			var joyDir = this.rh.rhPlayer[this.m_player];
			var anim = CAnim.ANIMID_STOP;
			var flag = false;
			var velocity = this.m_body.GetLinearVelocity();

			// Previous position
			var position = this.m_body.GetPosition();
			this.m_deltaX = (position.x - this.m_previousX) * this.m_base.factor;
			this.m_deltaY = (position.y - this.m_previousY) * this.m_base.factor;
			this.m_previousX = position.x;
			this.m_previousY = position.y;

			var length = Math.sqrt(this.m_deltaX * this.m_deltaX + this.m_deltaY * this.m_deltaY);
			this.ho.roc.rcSpeed = Math.floor((50.0 * length / 7.0) * this.rh.rh4MvtTimerCoef);
			this.ho.roc.rcSpeed = Math.min(this.ho.roc.rcSpeed, 250);

			var o = {};
			this.m_base.rGetBodyPosition(this.m_body, o);
			if (o.x + this.m_offsetX != this.ho.hoX || o.y + this.m_offsetY != this.ho.hoY)
			{
				this.ho.hoX = o.x + this.m_offsetX;
				this.ho.hoY = o.y + this.m_offsetY;
				this.ho.roc.rcChanged = 1;
			}
			if (this.m_currentAngle != this.m_previousAngle)
			{
				this.m_previousAngle = this.m_currentAngle;
				this.ho.roc.rcChanged = 1;
			}
			this.ho.roc.rcDir = Math.floor(this.m_currentAngle / 11.25);

			var bCrouching = false;
			var yLadder = this.rh.check_Ladder(-1, this.ho.hoX, this.ho.hoY);
			var bLadder = yLadder != CRun.INTBAD;
			var ySpeed = 0;
			var xSpeed = 0;
			var speed = this.m_speed;
			var jumpVX = 0;
			var jumpVY = 0;
			var ladderDir = 0;
			var ladderEnd = 0;

			if (this.m_jump == 0)
			    this.m_jumpCounter = this.m_jumps;

			if ((joyDir & 2) && this.m_jump == 0)
			{
				if (!bLadder)
				{
					if (this.m_flags & CRunMvtbox2dplatform.MPFLAG_ALLOWCROUCH)
					{
						speed = this.m_crouchSpeed;
						bCrouching = true;
					}
				}
				else
				{
					var y = this.rh.check_Ladder(-1, this.ho.hoX, this.ho.hoY + 2);
					if (y != CRun.INTBAD)
					{
						ySpeed = -this.m_climbingSpeed;
						ladderDir = 24;
						this.m_onLadder = true;
					}
				}
			}
			if ((joyDir & 1) && this.m_jump == 0)
			{
				if (bLadder)
				{
					var y = this.rh.check_Ladder(-1, this.ho.hoX, this.ho.hoY - 2);
					if (y != CRun.INTBAD)
					{
						ySpeed = this.m_climbingSpeed;
						ladderDir = 8;
						this.m_onLadder = true;
					}
				}
				else
				{
					if (Math.abs(velocity.x) < 0.01 && this.m_previousLadder)
					{
						this.m_base.rBodySetPosition(this.m_body, CRunBox2DBase.POSDEFAULT, this.m_previousLadderEnd);
						velocity.y = 0;
					}
				}
			}
			if (bLadder)
			{
				ladderEnd = yLadder;
				if (this.m_jump == 0)
				{
					this.m_body.SetGravityScale(0);
					velocity.y = ySpeed;
				}
				else
				{
					if (this.m_deltaY > 0)
						this.m_body.SetGravityScale(this.m_gravity);
					else
					{
						velocity.y = 0;
						this.m_body.SetGravityScale(0);
						this.m_jump = 0;
					}
				}
			}
			else
			{
				this.m_onLadder = false;
				this.m_body.SetGravityScale(this.m_gravity);
			}

			flag = false;
			if ((joyDir & (4 | 8)) != 0)			// Gauche
			{
				this.m_onLadder = false;
				if (this.m_jump == 0 || (this.m_jump > 0 && (this.m_flags & CRunMvtbox2dplatform.MPFLAG_CONTROLJUMP) != 0))
				{
					if ((this.m_flags & CRunMvtbox2dplatform.MPFLAG_ACCMOVEMENTS) == 0)
					{
						if (this.m_currentSpeed < speed)
						{
							this.m_currentSpeed += this.m_acceleration;
						}
						if (this.m_currentSpeed > speed)
						{
							this.m_currentSpeed -= this.m_deceleration;
						}
						if (joyDir & 4)
						{
							this.m_currentAngle = 180.0;
							velocity.x = -this.m_currentSpeed;
							flag = true;
						}
						if (joyDir & 8)
						{
							this.m_currentAngle = 0.0;
							velocity.x = this.m_currentSpeed;
							flag = true;
						}
					}
					else
					{
						if (velocity.x == 0)
							this.m_currentSpeed = 0;
						if (joyDir & 4)
						{
							if (this.m_currentAngle == 180.0)
							{
								this.m_currentSpeed += this.m_acceleration;
								this.m_currentSpeed = Math.min(speed, this.m_currentSpeed);
								velocity.x = -this.m_currentSpeed;
							}
							else
							{
								this.m_currentSpeed -= this.m_deceleration;
								if (this.m_currentSpeed < 0)
								{
									this.m_currentAngle = 180.0;
									this.m_currentSpeed = 0;
								}
								velocity.x = this.m_currentSpeed;
							}
							flag = true;
						}
						if (joyDir & 8)
						{
							if (this.m_currentAngle == 0.0)
							{
								this.m_currentSpeed += this.m_acceleration;
								this.m_currentSpeed = Math.min(speed, this.m_currentSpeed);
								velocity.x = this.m_currentSpeed;
							}
							else
							{
								this.m_currentSpeed -= this.m_deceleration;
								if (this.m_currentSpeed < 0)
								{
									this.m_currentAngle = 0.0;
									this.m_currentSpeed = 0;
								}
								velocity.x = -this.m_currentSpeed;
							}
							flag = true;
						}
					}
					anim = CAnim.ANIMID_WALK;
				}
			}
			if (!flag)
			{
			    if ( ladderDir == 0 && (this.m_jump == 0 || ((this.m_flags & CRunMvtbox2dplatform.MPFLAG_JUMPSTOPXIFNOINPUT) != 0 && (joyDir & 12) == 0)))
			    {
					if (this.m_currentSpeed > 0)
					{
						this.m_currentSpeed -= this.m_deceleration;
						this.m_currentSpeed = Math.max(this.m_currentSpeed, 0);
					}
					if (this.m_currentAngle == 180.0)
						velocity.x = -this.m_currentSpeed;
					else
						velocity.x = this.m_currentSpeed;

					if (this.m_jump == 0 && this.m_currentSpeed != 0)
						anim = CAnim.ANIMID_WALK;
				}
			}
			else
				this.m_previousLadder = 0;

			// En train de tomber?
			if (bLadder == false && Math.abs(this.rh.rhLoopCount - this.m_loopCollision) > 5)
			{
				if (velocity.y < -0.5)
				{
					this.m_falling = 2;
				}
			}

			// Teste le saut
			var bJump = false;
			var j = this.m_control;
			if (j != 0)
			{
				j--;
				if (j == 0)
				{
					if ((joyDir & 5) == 5)
						bJump = true;							// Haut gauche
					if ((joyDir & 9) == 9)
						bJump = true;							// Haut droite
				}
				else
				{
					j <<= 4;
					if (joyDir & j)
						bJump = true;
				}
			}
			if (bCrouching && (this.m_flags & CRunMvtbox2dplatform.MPFLAG_JUMPCROUCHED) == 0)
				bJump = false;
			if (this.m_falling > 0 && this.m_jumps <= 1)
				bJump = false;
			if (bJump)
			{
				if (!this.m_previousJump)
				{
					this.m_previousJump = true;
					if (this.m_jump == 0)
					{
						this.m_jump = 8;
						jumpVY = this.m_strength;
						this.m_jumpCounter = this.m_jumps - 1;
					}
					else
					{
					    if (this.m_jumpCounter >= 0)
					    {
					        this.m_jumpCounter--;
					        if (this.m_jumpCounter >= 0)
					        {
					            jumpVY = this.m_strength2;
					        }
					    }
					}
				}
			}
			else
			{
				this.m_previousJump = false;
			}
			if (jumpVY != 0)
				velocity.y = jumpVY;
			this.m_body.SetLinearVelocity(velocity);
			this.m_base.rBodyAddVelocity(this.m_body, this.m_addVX + this.m_setVX, this.m_addVY + this.m_setVY);
			this.ResetAddVelocity();

			if (this.m_platformUnder != null && !bJump)
			{
				if (this.m_platformUnder != this.m_previousPlatformUnder)
				{
					this.m_previousPlatformUnder = this.m_platformUnder;
					this.m_platformPositionX = this.m_platformUnder.m_pHo.hoX;
				}
				var positionChar = this.m_body.GetPosition();
				positionChar.x += (this.m_platformUnder.m_pHo.hoX - this.m_platformPositionX) / this.m_base.factor;
				var angle = this.m_body.GetAngle();
				this.m_base.rBodySetTransform(this.m_body, positionChar, angle);
				this.m_platformPositionX = this.m_platformUnder.m_pHo.hoX;
			}
			else
			{
				this.m_previousPlatformUnder = null;
			}
			this.m_platformUnder = null;

			this.m_previousLadder = bLadder;
			this.m_previousLadderEnd = ladderEnd;

			if (bCrouching)
				anim = CAnim.ANIMID_CROUCH;
			if (bLadder)
			{
				if (ladderDir != 0)
				{
					anim = CAnim.ANIMID_CLIMB;
					this.ho.roc.rcDir = ladderDir;
					this.m_previousLadderDir = ladderDir;
				}
				else if (this.m_onLadder && this.m_previousLadder != 0)
				{
					anim = CAnim.ANIMID_CLIMB;
					this.ho.roc.rcDir = this.m_previousLadderDir;
				}
			}
			if (this.m_jump > 0)
			{
				anim = CAnim.ANIMID_JUMP;
				this.m_previousLadder = false;
			}
			if (this.m_falling > 0)
			{
				anim = CAnim.ANIMID_FALL;
				this.m_previousLadder = false;
				this.m_falling--;
			}

			//var length = Math.sqrt(this.m_deltaX * this.m_deltaX + this.m_deltaY * this.m_deltaY);
			//this.ho.roc.rcSpeed = Math.floor((50.0 * length / 7.0) * this.rh.rh4MvtTimerCoef);
			//this.ho.roc.rcSpeed = Math.min(this.ho.roc.rcSpeed, 250);
			this.animations(anim);
			if (this.m_flags & CRunMvtbox2dplatform.MPFLAG_FINECOLLISIONS)
			{
				this.m_noStop = true;
				this.collisions();
				this.m_noStop = false;
			}

			// The object has been moved
			return this.ho.roc.rcChanged;
		},

		setAngle: function (angle)
		{
		},

		getAngle: function ()
		{
			return 0;
		},

		setPosition: function (x, y)
		{
			if (x != this.ho.hoX || y != this.ho.hoY)
				this.m_base.rBodySetPosition(this.m_body, x, y);
		},

		setXPosition: function (x)
		{
			if (x != this.ho.hoX)
				this.m_base.rBodySetPosition(this.m_body, x, CRunBox2DBase.POSDEFAULT);
		},

		setYPosition: function (y)
		{
			if (y != this.ho.hoY)
				this.m_base.rBodySetPosition(this.m_body, CRunBox2DBase.POSDEFAULT, y);
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
		getDir:         function ()
		{
			return this.ho.roc.rcDir;
		},
		stop:           function (bCurrent)
		{
		    if (this.m_eventCount == this.rh.rh4EventCount && this.m_collidingObject != null)
			{
				if (this.m_noStop)
					return;

				var bLadder = this.rh.check_Ladder(-1, this.ho.hoX, this.ho.hoY) != CRun.INTBAD;
				if (!bLadder)
				{
					this.SetStopFlag(true);
				}

				var o = {};
				this.m_base.rGetBodyPosition(this.m_collidingObject.m_body, o);
				var left = o.x + this.m_collidingObject.rc.left;
				var right = o.x + this.m_collidingObject.rc.right;
				var top = o.y + this.m_collidingObject.rc.top;
				var bottom = o.y + this.m_collidingObject.rc.bottom;

				if (this.m_collidingObject.m_subType == CRunMBase.MSUBTYPE_BOTTOM)
				{
				    this. m_loopCollision = this.rh.rhLoopCount;
				    this.m_jump = max(this.m_jump-1, 0);
				}
				else if ((this.ho.hoX >= left && this.ho.hoX <= right && this.ho.hoY <= bottom))
				{
					this.m_loopCollision = this.rh.rhLoopCount;
					this.m_jump = Math.max(this.m_jump - 1, 0);
					if (this.m_collidingObject.m_type == CRunMBase.MTYPE_FAKEOBJECT)
						this.m_platformUnder = this.m_collidingObject;
				}
            }
			else
			{
				this.m_base.rBodySetLinearVelocityAdd(this.m_body, 0, 0, 0, 0);
			}
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

		getGravity: function ()
		{
			return this.m_gravity * 100.0;
		},

		getAcceleration: function ()
		{
			return Math.floor(this.m_acceleration * (100.0 * CRunMvtbox2dplatform.ACCMULT));
		},

		getDeceleration: function ()
		{
			return Math.floor(this.m_deceleration * (100.0 * CRunMvtbox2dplatform.DECMULT));
		},

		setSpeed: function (speed)
		{
			this.m_currentSpeed = speed / 100.0 * 10.0;
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
				case CExp.EXP_EXTGETFRICTION:
					return this.m_friction * 100;
				case CExp.EXP_EXTGETRESTITUTION:
					return this.m_restitution * 100;
				case CExp.EXP_EXTGETDENSITY:
					return this.m_density * 100;
				case CExp.EXP_EXTGETVELOCITY:
					var v = this.m_body.GetLinearVelocity();
					return Math.sqrt(v.x * v.x + v.y * v.y) * 100.0 / CRunBox2DBase.SETVELOCITY_MULT;
				case CExp.EXP_EXTGETANGLE:
					var v = this.m_body.GetLinearVelocity();
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



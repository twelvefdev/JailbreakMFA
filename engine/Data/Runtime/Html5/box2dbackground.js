//----------------------------------------------------------------------------------
//
// CRunMvtbox2dbackground
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
 * Any other use of this source code is prohibited.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
CRunMvtbox2dbackground.B2FLAG_ROTATE = 0x0001;
function CRunMvtbox2dbackground()
{
	this.m_type = CRunBox2DBase.MTYPE_OBJECT;

	this.m_friction = 0;
	this.m_restitution = 0;
	this.m_angle = 0;
	this.m_shape = 0;
	this.m_flags = 0;
	this.m_obstacle = 0;
	this.m_body = 0;
	this.m_fixture = null;
	this.m_scaleX = 1.0;
	this.m_scaleY = 1.0;
	this.m_imgWidth = 0;
	this.m_imgHeight = 0;
	this.m_previousAngle = -1;
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
	this.m_moved = 0;
}

CRunMvtbox2dbackground.prototype = CServices.extend(new CRunMBase(),
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
			this.m_friction = file.readAInt() / 100.0;
			this.m_restitution = file.readAInt() / 100.0;
			this.m_flags = file.readAInt();
			this.m_angle = this.DirAtStart(file.readAInt()) * 180.0 / 16.0;
			this.m_shape = file.readAShort();
			this.m_obstacle = file.readAShort();
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

			this.m_base = this.GetBase();
			this.m_body = null;
			this.InitBase(this.ho, CRunMBase.MTYPE_OBJECT);
			this.m_background = true;
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

			var obstacle;
			switch (this.m_obstacle)
			{
				case 1:
					this.m_type = CRunMBase.MTYPE_OBSTACLE;
					break;
				case 2:
					this.m_type = CRunMBase.MTYPE_PLATFORM;
					break;
				default:
					this.m_type = CRunMBase.MTYPE_OBJECT;
					break;
			}
			this.m_body = this.m_base.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, this.ho.hoX, this.ho.hoY, this.m_angle, 0, this, 0, 0);
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
			this.m_moved = 2;

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

		kill: function ()
		{
			var pBase = this.GetBase();
			if (pBase != null)
			{
				pBase.rDestroyBody(this.m_body);
			}
		},

		move: function ()
		{
		    if (!this.CreateBody() || this.m_base.isPaused())
				return false;

			// Scale changed?
			if (this.ho.roc.rcScaleX != this.m_scaleX || this.ho.roc.rcScaleY != this.m_scaleY)
				this.CreateFixture();

			var o = {};
			this.m_base.rGetBodyPosition(this.m_body, o);
			this.m_currentAngle = o.angle;
			if (this.m_moved > 0)
			{
				if (o.x != this.ho.hoX || o.y != this.ho.hoY)
				{
					this.ho.hoX = o.x;
					this.ho.hoY = o.y;
					this.ho.roc.rcChanged = 1;
				}
				this.m_moved--;
			}
			if (this.m_currentAngle != this.m_previousAngle)
			{
				this.m_previousAngle = this.m_currentAngle;
				this.ho.roc.rcChanged = 1;
				if (this.m_flags & CRunMvtbox2dbackground.B2FLAG_ROTATE)
				{
					this.ho.roc.rcAngle = this.m_currentAngle;
					this.ho.roc.rcDir = 0;
				}
				else
				{
					this.ho.roc.rcDir = Math.floor(m_currentAngle / 11.25);
					while (this.ho.roc.rcDir < 0)
						this.ho.roc.rcDir += 32;
					while (this.ho.roc.rcDir >= 32)
						this.ho.roc.rcDir -= 32;
				}
			}
			this.animations(CAnim.ANIMID_STOP);
			return this.ho.roc.rcChanged != 0;
		},

		stop: function (bCurrent)
		{
			this.SetStopFlag(true);
		},

		SetFriction: function (friction)
		{
			this.m_friction = friction / 100.0;
			this.m_fixture.SetFriction(this.m_friction);
		},

		SetRestitution: function (restitution)
		{
			this.m_restitution = restitution / 100.0;
			this.m_fixture.SetRestitution(this.m_restitution);
		},

		GetFriction: function (friction)
		{
			return this.m_friction * 100.0;
		},

		GetRestitution: function (restitution)
		{
			return this.m_restitution * 100.0;
		},

		setPosition: function (x, y)
		{
			if (x != this.ho.hoX || y != this.ho.hoY)
			{
				this.m_base.rBodySetPosition(this.m_body, x, y);
				this.m_moved = 10;
			}
		},

		setXPosition: function (x)
		{
			if (x != this.ho.hoX)
			{
				this.m_base.rBodySetPosition(this.m_body, x, CRunBox2DBase.POSDEFAULT);
				this.m_moved = 10;
			}
		},

		setYPosition: function (y)
		{
			if (y != this.ho.hoY)
			{
				this.m_base.rBodySetPosition(this.m_body, CRunBox2DBase.POSDEFAULT, y);
				this.m_moved = 10;
			}
		},

		getAngle: function ()
		{
			if (this.m_flags & CRunMvtbox2dbackground.B2FLAG_ROTATE)
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

		setAngle: function (angle)
		{
			this.m_base.rBodySetAngle(this.m_body, angle);
		},

		actionEntry: function (action)
		{
			if (this.m_base == null)
				return 0;

			switch (action)
			{
				case CAct.ACT_EXTSETFRICTION:
					this.SetFriction(this.getParam());
					break;
				case CAct.ACT_EXTSETELASTICITY:
					this.SetRestitution(this.getParam());
					break;
				case CExp.EXP_EXTGETFRICTION:
					return this.GetFriction();
				case CExp.EXP_EXTGETRESTITUTION:
					return this.GetRestitution();
				default:
					break;
			}
			return 0;
		}
	});



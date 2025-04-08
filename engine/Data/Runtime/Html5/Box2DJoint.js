//----------------------------------------------------------------------------------
//
// CRUNBOX2DGROUND
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

CRunBox2DJoint.PINFLAG_LINK = 0x0001;
CRunBox2DJoint.ACT_SETLIMITS = 0;
CRunBox2DJoint.ACT_SETMOTOR = 1;
CRunBox2DJoint.ACT_DESTROY = 2;
CRunBox2DJoint.EXP_ANGLE1 = 0;
CRunBox2DJoint.EXP_ANGLE2 = 1;
CRunBox2DJoint.EXP_TORQUE = 2;
CRunBox2DJoint.EXP_SPEED = 3;

function CRunBox2DJoint()
{
	this.flags = 0;
	this.number = 0;
	this.angle1 = 0;
	this.angle2 = 0;
	this.speed = 0;
	this.torque = 0;
	this.identifier = 0;
	this.bodyStatic = 0;
	this.joints = null;
	this.base = null;
	this.bodyStatic = null;
}

CRunBox2DJoint.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 0;
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
						if (pBase.ext.identifier == this.identifier)
						{
							return pBase.ext;
						}
					}
				}
			}
			return null;
		},

		rStartObject: function ()
		{
			if (this.base == null)
			{
				this.base = this.GetBase();
				if (this.base == null)
				{
					if (!bAlerted)
					{
						alert("Please drop a Physics - Engine object in the frame.");
						bAlerted = true;
					}
				}
			}
			return this.base.started;
		},

		createRunObject: function (file, cob, version)
		{
			this.ho.hoX = cob.cobX;
			this.ho.hoY = cob.cobY;
			if (cob.cobFlags & CRun.COF_CREATEDATSTART)
			{
				this.ho.hoX += 16;
				this.ho.hoY += 16;
			}
			this.flags = file.readAInt();
			this.number = file.readAShort();
			this.angle1 = file.readAInt();
			this.angle2 = file.readAInt();
			this.torque = file.readAInt();
			this.speed = file.readAInt();
			this.identifier = file.readAInt();
			this.joints = new CArrayList();
			return 0;
		},

		destroyRunObject: function ()
		{
			if (this.bodyStatic != null)
			{
				var pBase = this.GetBase();
				if (pBase != null)
					pBase.rDestroyBody(this.bodyStatic);
			}

		    // Build 286.5: destroy the joints for the objects that still exist...
			this.VerifyJoints();
			for (n = 0; n < this.joints.size() ; n++) {
			    var pJointO = this.joints.get(n);
			    this.base.rDestroyJoint(pJointO.m_joint);
			}
		},

		GetTopMostObjects: function (list, x, y, w, h)
		{
			var pOL = 0;
			var nObjects = 0;
			for (nObjects = 0; nObjects < this.rh.rhNObjects; pOL++, nObjects++)
			{
				while (this.rh.rhObjectList[pOL] == null) pOL++;
				var pHo = this.rh.rhObjectList[pOL];
				if (pHo.hoType == 2)
				{
					var image = this.rh.rhApp.imageBank.getImageFromHandle(pHo.roc.rcImage);
					var mask = image.getMask(0, 0, 1.0, 1.0);
					if (mask.testRect2(pHo.hoX - image.xSpot, pHo.hoY - image.ySpot, 0, x, y, w, h))
					{
						var pMBase = this.base.GetMBase(pHo);
						if (pMBase != null && pMBase.m_identifier == this.identifier)
							list.add(pMBase);
					}
				}
			}
		},

		handleRunObject: function ()
		{
		    if (!this.rStartObject() || this.base.isPaused())
				return 0;

			var list = new CArrayList();
			var x = this.ho.hoX;
			var y = this.ho.hoY;
			this.GetTopMostObjects(list, this.ho.hoX, this.ho.hoY, 32, 32);
			if (list.size() > 0)
			{
				if ((this.flags & CRunBox2DJoint.PINFLAG_LINK) != 0 || list.size() == 1)
				{
					this.bodyStatic = this.base.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, x, y, 0, 0, null, 0, 0);
					this.base.rBodyCreateBoxFixture(this.bodyStatic, null, x, y, 16, 16, 0, 0, 0);
				}
				var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
				jointDef.collideConnected = true;
				var position = new Box2D.Common.Math.b2Vec2(x, y);
				this.base.rFrameToWorld(position);
				var joint;
				if (list.size() == 1)
				{
					var pMBase = list.get(0);
					joint = this.base.rWorldCreateRevoluteJoint(jointDef, this.bodyStatic, pMBase.m_body, position);
					this.base.rRJointSetLimits(joint, this.angle1, this.angle2);
					this.base.rRJointSetMotor(joint, this.torque, this.speed);
					this.joints.add(new CJointO(null, pMBase, joint));
				}
				if (list.size() >= 2)
				{
					var numbers = 1;
					if (this.number == 1)
						numbers = 10000;
					var n;
					var pMBase1;
					var pMBase2;
					for (n = 0; n < numbers; n++)
					{
						var index = list.size() - 1 - n;
						pMBase1 = list.get(index);
						pMBase2 = list.get(index - 1);
						joint = this.base.rWorldCreateRevoluteJoint(jointDef, pMBase1.m_body, pMBase2.m_body, position);
						this.base.rRJointSetLimits(joint, this.angle1, this.angle2);
						this.base.rRJointSetMotor(joint, this.torque, this.speed);
						this.joints.add(new CJointO(pMBase1, pMBase2, joint));
						if (index == 1)
							break;
					}
					if ((this.flags & CRunBox2DJoint.PINFLAG_LINK) != 0)
					{
						joint = this.base.rWorldCreateRevoluteJoint(jointDef, this.bodyStatic, pMBase2.m_body, position);
						this.joints.add(new CJointO(null, pMBase2, joint));
					}
				}
			}
			return CRunExtension.REFLAG_ONESHOT;
		},

		GetHO: function (fixedValue)
		{
			var hoPtr = this.rh.rhObjectList[fixedValue & 0xFFFF];
			if (hoPtr != null && hoPtr.hoCreationId == fixedValue >> 16)
				return hoPtr;
			return null;
		},

		VerifyJoints: function ()
		{
			var n;
			for (n = 0; n < this.joints.size(); n++)
			{
				var pJointO = this.joints.get(n);
				var pHo;
				var bFlag = true;
				if (pJointO.m_fv1 != -1)
				{
					pHo = this.GetHO(pJointO.m_fv1);
					if (pHo == null)
						bFlag = false;
				}
				if (pJointO.m_fv2 != -1)
				{
					pHo = this.GetHO(pJointO.m_fv2);
					if (pHo == null)
						bFlag = false;
				}
				if (!bFlag)
				{
					this.joints.removeIndex(n);
					n--;
				}
			}
		},

		action: function (num, act)
		{
			var n, param1, param2;
			switch (num)
			{
				case CRunBox2DJoint.ACT_SETLIMITS:
					this.angle1 = act.getParamExpression(this.rh, 0);
					this.angle2 = act.getParamExpression(this.rh, 1);
					this.VerifyJoints();
					for (n = 0; n < this.joints.size(); n++)
					{
						var pJointO = this.joints.get(n);
						this.base.rRJointSetLimits(pJointO.m_joint, this.angle1, this.angle2);
					}
					break;
				case CRunBox2DJoint.ACT_SETMOTOR:
					this.torque = act.getParamExpression(this.rh, 0);
					this.speed = act.getParamExpression(this.rh, 1);
					this.VerifyJoints();
					for (n = 0; n < this.joints.size(); n++)
					{
						var pJointO = this.joints.get(n);
						this.base.rRJointSetMotor(pJointO.m_joint, this.torque, this.speed);
					}
					break;
				case CRunBox2DJoint.ACT_DESTROY:
					this.VerifyJoints();
					for (n = 0; n < this.joints.size(); n++)
					{
						var pJointO = this.joints.get(n);
						this.base.rDestroyJoint(pJointO.m_joint);
						this.joints.removeIndex(n);
						n--;
					}
					break;
			}
		},

		expression: function (num)
		{
			switch (num)
			{
				case CRunBox2DJoint.EXP_ANGLE1:
					return this.angle1;
				case CRunBox2DJoint.EXP_ANGLE2:
					return this.angle2;
				case CRunBox2DJoint.EXP_TORQUE:
					return this.torque;
				case CRunBox2DJoint.EXP_SPEED:
					return this.speed;
			}
		}
	});

function CJointO(pBase1, pBase2, joint)
{
	var pHo;
	this.m_fv1 = -1;
	if (pBase1 != null)
	{
		pHo = pBase1.m_pHo;
		this.m_fv1 = (pHo.hoCreationId << 16) | (pHo.hoNumber & 0xFFFF);
	}
	this.m_fv2 = -1;
	if (pBase2 != null)
	{
		pHo = pBase2.m_pHo;
		this.m_fv2 = (pHo.hoCreationId << 16) | (pHo.hoNumber & 0xFFFF);
	}
	this.m_joint = joint;
}

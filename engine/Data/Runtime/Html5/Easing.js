//----------------------------------------------------------------------------------
//
// CRunEasing
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
CRunEasing.CON_ANYOBJECTSTOPPED = 0;
CRunEasing.CON_SPECIFICOBJECTSTOPPED = 1;
CRunEasing.CON_ISOBJECTMOVING = 2;
CRunEasing.CND_LAST = 3;

CRunEasing.ACT_MOVEOBJ = 0;
CRunEasing.ACT_STOPOBJECT = 1;
CRunEasing.ACT_STOPALLOBJECTS = 2;
CRunEasing.ACT_REVERSEOBJECT = 3;
CRunEasing.ACT_SETAMPLITUDE = 4;
CRunEasing.ACT_SETOVERSHOOT = 5;
CRunEasing.ACT_SETPERIOD = 6;
CRunEasing.ACT_SETOBJECTAMPLITUDE = 7;
CRunEasing.ACT_SETOBJECTOVERSHOOT = 8;
CRunEasing.ACT_SETOBJECTPERIOD = 9;
CRunEasing.ACT_MOVEOBJEXPLICIT = 10;

CRunEasing.EXP_GETNUMCONTROLLED = 0;
CRunEasing.EXP_GETSTOPPEDFIXED = 1;
CRunEasing.EXP_EASEIN = 2;
CRunEasing.EXP_EASEOUT = 3;
CRunEasing.EXP_EASEINOUT = 4;
CRunEasing.EXP_EASEOUTIN = 5;
CRunEasing.EXP_EASEINBETWEEN = 6;
CRunEasing.EXP_EASEOUTBETWEEN = 7;
CRunEasing.EXP_EASEINOUTBETWEEN = 8;
CRunEasing.EXP_EASEOUTINBETWEEN = 9;
CRunEasing.EXP_GETAMPLITUDE = 10;
CRunEasing.EXP_GETOVERSHOOT = 11;
CRunEasing.EXP_GETPERIOD = 12;
CRunEasing.EXP_GETDEFAULTAMPLITUDE = 13;
CRunEasing.EXP_GETDEFAULTOVERSHOOT = 14;
CRunEasing.EXP_GETDEFAULTPERIOD = 15;
CRunEasing.EASEIN = 0;
CRunEasing.EASEOUT = 1;
CRunEasing.EASEINOUT = 2;
CRunEasing.EASEOUTIN = 3;

function CRunEasing()
{
	this.controlled;
	this.deleted;
	this.easeVars;
	this.controlledCount;
	this.currentMovedObj;
	this.currentMoved;
}
CRunEasing.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return CRunEasing.CND_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			this.controlled = {};
			this.deleted = {};
			this.controlledCount = 0;
			this.currentMovedObj = null;
			this.currentMoved = null;
			this.easeVars = new CRunEasingVars();

			var bParser = new BinaryParser(false);
			var temp = file.readInString(4);
			this.easeVars.overshoot = bParser.toFloat(temp);
			temp = file.readInString(4);
			this.easeVars.amplitude = bParser.toFloat(temp);
			temp = file.readInString(4);
			this.easeVars.period = bParser.toFloat(temp);

			return false;
		},

		handleRunObject: function ()
		{
			var finnishedMoving = false;
			var step;

			var key;
			for (key in this.controlled)
			{
			    var object = this.GetObjectFromFixed(key);
				var moved = this.controlled[key];

				if (object != null)
				{
					if (moved.timeMode == 0)
					{
						var currentTime = new Date();
						var diff = (currentTime.getTime() - moved.startdate.getTime());

						step = diff / (moved.timespan);

						if (diff >= moved.timespan)
						{
							finnishedMoving = true;
						}
					}
					else
					{
						moved.eventloop_step++;
						step = moved.eventloop_step / (moved.timespan);

						if (moved.eventloop_step >= moved.timespan)
						{
							finnishedMoving = true;
						}
					}

					var easeStep = (this.calculateEasingValue(moved.easingMode, moved.functionA, moved.functionB, step, moved));

					//                object.hoX = ((moved.startX + (moved.destX - moved.startX) * easeStep + 0.5));
					//                object.hoY = ((moved.startY + (moved.destY - moved.startY) * easeStep + 0.5));
					object.hoX = CServices.floatToInt((moved.startX + (moved.destX - moved.startX) * easeStep + 0.5));
					object.hoY = CServices.floatToInt((moved.startY + (moved.destY - moved.startY) * easeStep + 0.5));
					object.roc.rcChanged = true;

					if (finnishedMoving)
					{
						finnishedMoving = false;

						object.hoX = CServices.floatToInt(moved.destX);
						object.hoY = CServices.floatToInt(moved.destY);

						this.deleted[key] = moved;
						delete this.controlled[key];
						this.controlledCount--;
					}
				}
				else
				{
					delete this.controlled[object];
					this.controlledCount--;
				}
			}

			//Trigger the 'Object stopped moving' events
			for (var dkey in this.deleted)
			{
				this.currentMovedObj = this.GetObjectFromFixed(dkey);
				this.currentMoved = (this.deleted[dkey]);
				this.ho.generateEvent(CRunEasing.CON_ANYOBJECTSTOPPED, 0);
				this.ho.generateEvent(CRunEasing.CON_SPECIFICOBJECTSTOPPED, 0);
				delete this.deleted[dkey];
			}
			this.currentMovedObj = null;
			this.currentMoved == null;
			return 0;
		},


		// Conditions
		// -------------------------------------------------
		condition:       function (num, cnd)
		{
			switch (num)
			{
				case CRunEasing.CON_ANYOBJECTSTOPPED:
					return this.con_AnyObjectStopped();
				case CRunEasing.CON_SPECIFICOBJECTSTOPPED:
					return this.con_SpecificObjectStopped(cnd);
				case CRunEasing.CON_ISOBJECTMOVING:
					return this.con_IsObjectMoving(cnd, CCnd.negaFALSE(this.rh.currentPtr));
			}
			return false;
		},

		// Actions
		// -------------------------------------------------
		action:          function (num, act)
		{
			switch (num)
			{
				case CRunEasing.ACT_MOVEOBJ:
					this.act_MoveObj(act.getParamObject(this.rh, 0), act.getParamExtension(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3), act.getParamExtension(this.rh, 4), act.getParamExpression(this.rh, 5));
					break;
				case CRunEasing.ACT_STOPOBJECT:
					this.act_StopObject(act.getParamObject(this.rh, 0));
					break;
				case CRunEasing.ACT_STOPALLOBJECTS:
					this.act_StopAllObjects();
					break;
			    case CRunEasing.ACT_REVERSEOBJECT:
					this.act_ReverseObject(act.getParamObject(this.rh, 0));
					break;
				case CRunEasing.ACT_SETAMPLITUDE:
					this.act_SetAmplitude(act.getParamExpDouble(this.rh, 0));
					break;
				case CRunEasing.ACT_SETOVERSHOOT:
					this.act_SetOvershoot(act.getParamExpDouble(this.rh, 0));
					break;
				case CRunEasing.ACT_SETPERIOD:
					this.act_SetPeriod(act.getParamExpDouble(this.rh, 0));
					break;
				case CRunEasing.ACT_SETOBJECTAMPLITUDE:
					this.act_SetObjectAmplitude(act.getParamObject(this.rh, 0), act.getParamExpDouble(this.rh, 1));
					break;
				case CRunEasing.ACT_SETOBJECTOVERSHOOT:
					this.act_SetObjectOvershoot(act.getParamObject(this.rh, 0), act.getParamExpDouble(this.rh, 1));
					break;
				case CRunEasing.ACT_SETOBJECTPERIOD:
					this.act_SetObjectPeriod(act.getParamObject(this.rh, 0), act.getParamExpDouble(this.rh, 1));
					break;
				case CRunEasing.ACT_MOVEOBJEXPLICIT:
					this.act_MoveObjExplicit(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3), act.getParamExpression(this.rh, 4), act.getParamExpression(this.rh, 5), act.getParamExpression(this.rh, 6), act.getParamExpression(this.rh, 7));
					break;
			}
		},

		// Expressions
		// -------------------------------------------------
		expression:      function (num)
		{
			switch (num)
			{
				case CRunEasing.EXP_GETNUMCONTROLLED:
					return this.exp_GetNumControlled();
				case CRunEasing.EXP_GETSTOPPEDFIXED:
					return this.exp_GetStoppedFixed();
				case CRunEasing.EXP_EASEIN:
					return this.exp_EaseIn(this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_EASEOUT:
					return this.exp_EaseOut(this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_EASEINOUT:
					return this.exp_EaseInOut(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_EASEOUTIN:
					return this.exp_EaseOutIn(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_EASEINBETWEEN:
					return this.exp_EaseInBetween(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_EASEOUTBETWEEN:
					return this.exp_EaseOutBetween(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_EASEINOUTBETWEEN:
					return this.exp_EaseInOutBetween(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_EASEOUTINBETWEEN:
					return this.exp_EaseOutInBetween(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
				case CRunEasing.EXP_GETAMPLITUDE:
					return this.exp_GetAmplitude(this.ho.getExpParam());
				case CRunEasing.EXP_GETOVERSHOOT:
					return this.exp_GetOvershoot(this.ho.getExpParam());
				case CRunEasing.EXP_GETPERIOD:
					return this.exp_GetPeriod(this.ho.getExpParam());
				case CRunEasing.EXP_GETDEFAULTAMPLITUDE:
					return this.exp_GetDefaultAmplitude();
				case CRunEasing.EXP_GETDEFAULTOVERSHOOT:
					return this.exp_GetDefaultOvershoot();
				case CRunEasing.EXP_GETDEFAULTPERIOD:
					return this.exp_GetDefaultPeriod();
			}
			return 0;
		},

		con_AnyObjectStopped: function ()
		{
			return true;
		},

		con_SpecificObjectStopped: function (cnd)
		{
			var oiList = cnd.evtParams[0].oiList;
			if (this.select == null)
				this.select = new ObjectSelection(this.rh.rhApp);
			if (this.currentMovedObj != null && this.select.objectIsOfType(this.currentMovedObj, oiList))
			{
				this.select.selectOneObject(this.currentMovedObj);
				return true;
			}
			return false;
		},

		//Should it select the given object?
		filterMoving:              function (rdPtr, object)
		{
			return (rdPtr.controlled[rdPtr.GetFixedFromObject(object)] != null);
		},

		con_IsObjectMoving: function (cnd, isNegated)
		{
			var oiList = cnd.evtParams[0].oiList;
			if (this.select == null)
				this.select = new ObjectSelection(this.rh.rhApp);
			return this.select.filterObjects(this, oiList, isNegated, this.filterMoving);
		},

		act_MoveObj: function (obj, easingMode, targetX, targetY, timeMode, time)
		{
			if (obj === undefined || obj === null || obj.hoX === undefined || obj.hoY === undefined)
				return;

			var easingVars = new CRunEasingVars();
			easingVars.amplitude = this.easeVars.amplitude;
			easingVars.overshoot = this.easeVars.overshoot;
			easingVars.period = this.easeVars.period;
			easingVars.startX = obj.hoX;
			easingVars.startY = obj.hoY;
			easingVars.destX = targetX;
			easingVars.destY = targetY;
			easingVars.timespan = time;
			easingVars.fixed = this.GetFixedFromObject(obj);

			easingMode.skipBytes(1);
			easingVars.easingMode = easingMode.readAByte();
			easingVars.functionA = easingMode.readAByte();
			easingVars.functionB = easingMode.readAByte();

			easingVars.timeMode = timeMode.readAByte();
			if (easingVars.timeMode == 0)
			{
				easingVars.startdate = new Date();
			}

			var key = this.GetFixedFromObject(obj);
			if ( this.controlled[key] == null )
			    this.controlledCount++;
		    this.controlled[key] = easingVars;
		},

		act_MoveObjExplicit: function (fixed, easingMode, funcA, funcB, targetX, targetY, timeMode, time)
		{
			var easingVars = new CRunEasingVars();
			easingVars.amplitude = this.easeVars.amplitude;
			easingVars.overshoot = this.easeVars.overshoot;
			easingVars.period = this.easeVars.period;

			var obj = this.GetObjectFromFixed(fixed);
			if (obj == null)
				return;

			easingVars.fixed = fixed;
			easingVars.easingMode = easingMode;
			easingVars.functionA = funcA;
			easingVars.functionB = funcB;
			easingVars.startX = obj.hoX;
			easingVars.startY = obj.hoY;
			easingVars.destX = targetX;
			easingVars.destY = targetY;
			easingVars.timespan = time;

			easingVars.timeMode = timeMode;
			if (easingVars.timeMode == 0)
			{
				easingVars.startdate = new Date();
			}

			var key = this.GetFixedFromObject(obj);
			if (this.controlled[key] == null)
			    this.controlledCount++;
			this.controlled[key] = easingVars;
		},

		act_StopObject: function (obj)
		{
			var key = this.GetFixedFromObject(obj);
			if (this.controlled[key] != null)
			{
				delete this.controlled[key];
				this.controlledCount--;
			}
		},

		act_StopAllObjects: function ()
		{
			for (var obj in this.controlled)
			{
				delete this.controlled[this.GetFixedFromObject(obj)];
			}
			this.controlledCount = 0;
		},

		act_ReverseObject: function (object)
		{
			var reversed = null;
			var fixed = this.GetFixedFromObject(object);

			if (this.controlled[fixed] != null)
			{
				reversed = this.controlled[fixed];
				delete this.controlled[fixed];
				this.controlledCount--;
            }
			if (reversed == null)
			{
				reversed = new CRunEasingVars();
			}

			//If it was the object that was just stopped then use that one.
			if (reversed.fixed == 0)
			{
			    if (this.currentMoved != null && this.currentMoved.fixed == fixed)
				{
					reversed = this.currentMoved;
				}
				else
				{	//If no object found, abort
					return;
				}
			}

			reversed.destX = reversed.startX;
			reversed.destY = reversed.startY;

			reversed.startX = object.hoX;
			reversed.startY = object.hoY;

			//Recalculate the time it should take moving to the previous position
			if (reversed.timeMode == 0)
			{
				reversed.timespan = Math.floor(new Date().getTime() - reversed.startdate.getTime());
				reversed.startdate = new Date();
			}
			else
			{
				reversed.timespan = reversed.eventloop_step;
				reversed.eventloop_step = 0;
			}

			this.controlled[fixed] = reversed;
			this.controlledCount++;
		},

		act_SetAmplitude: function (val)
		{
			this.easeVars.amplitude = val;
		},

		act_SetOvershoot: function (val)
		{
			this.easeVars.overshoot = val;
		},

		act_SetPeriod: function (val)
		{
			this.easeVars.period = val;
		},

		act_SetObjectAmplitude: function (obj, val)
		{
			var key = this.GetFixedFromObject(obj);
			var vars = (this.controlled[key]);
			if (vars == null)
			{
				return;
			}

			vars.amplitude = val;
			this.controlled[key] = vars;
		},

		act_SetObjectOvershoot: function (obj, val)
		{
			var key = this.GetFixedFromObject(obj);
			var vars = (this.controlled[key]);
			if (vars == null)
			{
				return;
			}

			vars.overshoot = val;
			this.controlled[key] = vars;
		},

		act_SetObjectPeriod: function (obj, val)
		{
			var key = this.GetFixedFromObject(obj);
			var vars = (this.controlled[key]);
			if (vars == null)
			{
				return;
			}

			vars.period = val;
			this.controlled[key] = vars;
		},

		exp_GetNumControlled: function ()
		{
			return (this.controlledCount);
		},

		exp_GetStoppedFixed: function ()
		{
			if (this.currentMovedObj == null)
			{
				return 0;
			}
			return (this.GetFixedFromObject(this.currentMovedObj));
		},

		exp_EaseIn: function (func, step)
		{
			return (this.easeIn(func, step, this.easeVars));
		},

		exp_EaseOut: function (func, step)
		{
			return (this.easeOut(func, step, this.easeVars));
		},

		exp_EaseInOut: function (funcA, funcB, step)
		{
			return (this.easeInOut(funcA, funcB, step, this.easeVars));
		},

		exp_EaseOutIn: function (funcA, funcB, step)
		{
			return (this.easeOutIn(funcA, funcB, step, this.easeVars));
		},

		exp_EaseInBetween: function (start, end, func, step)
		{
			var ease = this.easeIn(func, step, this.easeVars);
			return (start + (end - start) * ease);
		},

		exp_EaseOutBetween: function (start, end, func, step)
		{
			var ease = this.easeOut(func, step, this.easeVars);
			return (start + (end - start) * ease);
		},

		exp_EaseInOutBetween: function (start, end, funcA, funcB, step)
		{
			var ease = this.easeInOut(funcA, funcB, step, this.easeVars);
			return (start + (end - start) * ease);
		},

		exp_EaseOutInBetween: function (start, end, funcA, funcB, step)
		{
			var ease = this.easeOutIn(funcA, funcB, step, this.easeVars);
			return (start + (end - start) * ease);
		},

		exp_GetAmplitude: function (fixed)
		{
			var obj = this.GetControlledFromFixed(fixed);
			if (obj != null)
			{
				var vars = (this.controlled[fixed]);
				return (vars.amplitude);
			}
			return (-1);
		},

		exp_GetOvershoot: function (fixed)
		{
			var obj = this.GetControlledFromFixed(fixed);
			if (obj != null)
			{
				var vars = (this.controlled[fixed]);
				return (vars.overshoot);
			}
			return (-1);
		},

		exp_GetPeriod: function (fixed)
		{
			var obj = this.GetControlledFromFixed(fixed);
			if (obj != null)
			{
				var vars = (this.controlled[fixed]);
				return (vars.period);
			}
			return (-1);
		},

		exp_GetDefaultAmplitude: function ()
		{
			return (this.easeVars.amplitude);
		},

		exp_GetDefaultOvershoot: function ()
		{
			return (this.easeVars.overshoot);
		},

		exp_GetDefaultPeriod: function ()
		{
			return (this.easeVars.period);
		},


		//Easing functions:
		linear:               function (step, vars)
		{
			return step;
		},
		quad:                 function (step, vars)
		{
			return Math.pow(step, 2.0);
		},
		cubic:                function (step, vars)
		{
			return Math.pow(step, 3.0);
		},
		quart:                function (step, vars)
		{
			return Math.pow(step, 4.0);
		},
		quint:                function (step, vars)
		{
			return Math.pow(step, 5.0);
		},
		sine:                 function (step, vars)
		{
			return 1.0 - Math.sin((1 - step) * 90.0 * Math.PI / 180.0);
		},
		expo:                 function (step, vars)
		{
			return Math.pow(2.0, step * 10.0) / 1024.0;
		},
		circ:                 function (step, vars)
		{
			return 1.0 - Math.sqrt(1.0 - Math.pow(step, 2.0));
		},
		back:                 function (step, vars)
		{
			return (vars.overshoot + 1.0) * Math.pow(step, 3.0) - vars.overshoot * Math.pow(step, 2.0);
		},
		elastic:              function (step, vars)
		{
			step -= 1.0;
			var amp = Math.max(1.0, vars.amplitude);
			var s = (vars.period / (2.0 * Math.PI) * Math.asin(1.0 / amp));
			return -(amp * Math.pow(2.0, 10 * step) * Math.sin((step - s) * (2 * Math.PI) / vars.period));
		},
		bounce:               function (step, vars)
		{
			step = 1 - step;
			if (step < (8 / 22.0))
			{
				return 1 - 7.5625 * step * step;
			}
			else if (step < (16 / 22.0))
			{
				step -= 12 / 22.0;
				return 1 - vars.amplitude * (7.5625 * step * step + 0.75) - (1 - vars.amplitude);
			}
			else if (step < (20 / 22.0))
			{
				step -= 18 / 22.0;
				return 1 - vars.amplitude * (7.5625 * step * step + 0.9375) - (1 - vars.amplitude);
			}
			else
			{
				step -= 21 / 22.0;
				return 1 - vars.amplitude * (7.5625 * step * step + 0.984375) - (1 - vars.amplitude);
			}
		},

		doFunction: function (number, step, vars)
		{
			switch (number)
			{
				default:
				case 0:
					return this.linear(step, vars);
				case 1:
					return this.quad(step, vars);
				case 2:
					return this.cubic(step, vars);
				case 3:
					return this.quart(step, vars);
				case 4:
					return this.quint(step, vars);
				case 5:
					return this.sine(step, vars);
				case 6:
					return this.expo(step, vars);
				case 7:
					return this.circ(step, vars);
				case 8:
					return this.back(step, vars);
				case 9:
					return this.elastic(step, vars);
				case 10:
					return this.bounce(step, vars);
			}
		},

		easeIn: function (func, step, vars)
		{
			return this.doFunction(func, step, vars);
		},

		easeOut: function (func, step, vars)
		{
			return 1.0 - this.doFunction(func, 1.0 - step, vars);
		},

		easeInOut: function (functionA, functionB, step, vars)
		{
			if (step < 0.5)
			{
				return this.easeIn(functionA, step * 2.0, vars) / 2.0;
			}
			else
			{
				return this.easeOut(functionB, (step - 0.5) * 2.0, vars) / 2.0 + 0.5;
			}
		},

		easeOutIn: function (functionA, functionB, step, vars)
		{
			if (step < 0.5)
			{
				return this.easeOut(functionA, step * 2.0, vars) / 2.0;
			}
			else
			{
				return this.easeIn(functionB, (step - 0.5) * 2.0, vars) / 2.0 + 0.5;
			}
		},

		calculateEasingValue: function (mode, functionA, functionB, step, vars)
		{
			switch (mode)
			{
				default:
				case CRunEasing.EASEIN:
					return this.easeIn(functionA, step, vars);
				case CRunEasing.EASEOUT:
					return this.easeOut(functionA, step, vars);
				case CRunEasing.EASEINOUT:
					return this.easeInOut(functionA, functionB, step, vars);
				case CRunEasing.EASEOUTIN:
					return this.easeOutIn(functionA, functionB, step, vars);
			}
		},

		GetFixedFromObject:     function (obj)
		{
			return (obj.hoCreationId << 16) + (obj.hoNumber & 0xFFFF);
		},
		GetControlledFromFixed: function (fixedvalue)
		{
			var fixed;
			for (fixed in controlled)
			{
				if (fixed == fixedvalue)
				{
					return this.GetObjectFromFixed(fixed);
				}
			}
			return null;
		},
		GetObjectFromFixed:     function (fixed)
		{
			return (this.ho.hoAdRunHeader.rhObjectList[fixed & 0x0000FFFF]);
		}
	});

function CRunEasingVars()
{
	this.overshoot = 0;
	this.amplitude = 0;
	this.period = 0;

	this.startX = 0;
	this.startY = 0;
	this.destX = 0;
	this.destY = 0;

	this.easingMode = 0;
	this.functionA = 0;
	this.functionB = 0;

	this.timeMode = 0;
	this.startdate = null;

	this.timespan = 0;
	this.eventloop_step = 0;
	this.fixed = 0;
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/classes/binary-parser [rev. #1]
BinaryParser = function (bigEndian, allowExceptions)
{
	this.bigEndian = bigEndian, this.allowExceptions = allowExceptions;
};

BinaryParser.prototype =
{
	encodeFloat: function (number, precisionBits, exponentBits)
	{
		var bias = Math.pow(2, exponentBits - 1) - 1, minExp = -bias + 1, maxExp = bias, minUnnormExp = minExp - precisionBits,
			status = isNaN(n = parseFloat(number)) || n == -Infinity || n == +Infinity ? n : 0,
			exp = 0, len = 2 * bias + 1 + precisionBits + 3, bin = new Array(len),
			signal = (n = status !== 0 ? 0 : n) < 0, n = Math.abs(n), intPart = Math.floor(n), floatPart = n - intPart,
			i, lastBit, rounded, j, result;
		for (i = len; i; bin[--i] = 0);
		for (i = bias + 2; intPart && i; bin[--i] = intPart % 2, intPart = Math.floor(intPart / 2));
		for (i = bias + 1; floatPart > 0 && i; (bin[++i] = ((floatPart *= 2) >= 1) - 0) && --floatPart);
		for (i = -1; ++i < len && !bin[i];);
		if (bin[(lastBit = precisionBits - 1 + (i = (exp = bias + 1 - i) >= minExp && exp <= maxExp ? i + 1 : bias + 1 - (exp = minExp - 1))) + 1])
		{
			if (!(rounded = bin[lastBit]))
				for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]);
			for (j = lastBit + 1; rounded && --j >= 0; (bin[j] = !bin[j] - 0) && (rounded = 0));
		}
		for (i = i - 2 < 0 ? -1 : i - 3; ++i < len && !bin[i];);

		(exp = bias + 1 - i) >= minExp && exp <= maxExp ? ++i : exp < minExp &&
			(exp != bias + 1 - len && exp < minUnnormExp && this.warn("encodeFloat::float underflow"), i = bias + 1 - (exp = minExp - 1));
		(intPart || status !== 0) && (this.warn(intPart ? "encodeFloat::float overflow" : "encodeFloat::" + status),
			exp = maxExp + 1, i = bias + 2, status == -Infinity ? signal = 1 : isNaN(status) && (bin[i] = 1));
		for (n = Math.abs(exp + bias), j = exponentBits + 1, result = ""; --j; result = (n % 2) + result, n = n >>= 1);
		for (n = 0, j = 0, i = (result = (signal ? "1" : "0") + result + bin.slice(i, i + precisionBits).join("")).length, r = [];
		     i; n += (1 << j) * result.charAt(--i), j == 7 && (r[r.length] = String.fromCharCode(n), n = 0), j = (j + 1) % 8);
		r[r.length] = n ? String.fromCharCode(n) : "";
		return (this.bigEndian ? r.reverse() : r).join("");
	},

	encodeInt: function (number, bits, signed)
	{
		var max = Math.pow(2, bits), r = [];
		(number >= max || number < -(max >> 1)) && this.warn("encodeInt::overflow") && (number = 0);
		number < 0 && (number += max);
		for (; number; r[r.length] = String.fromCharCode(number % 256), number = Math.floor(number / 256));
		for (bits = -(-bits >> 3) - r.length; bits--; r[r.length] = "\0");
		return (this.bigEndian ? r.reverse() : r).join("");
	},

	decodeFloat: function (data, precisionBits, exponentBits)
	{
		var b = ((b = new this.Buffer(this.bigEndian, data)).checkBuffer(precisionBits + exponentBits + 1), b),
			bias = Math.pow(2, exponentBits - 1) - 1, signal = b.readBits(precisionBits + exponentBits, 1),
			exponent = b.readBits(precisionBits, exponentBits), significand = 0,
			divisor = 2, curByte = b.buffer.length + (-precisionBits >> 3) - 1,
			byteValue, startBit, mask;
		do
			for (byteValue = b.buffer[++curByte], startBit = precisionBits % 8 || 8, mask = 1 << startBit;
			     mask >>= 1; (byteValue & mask) && (significand += 1 / divisor), divisor *= 2);
		while (precisionBits -= startBit);
		return exponent == (bias << 1) + 1 ? significand ? NaN : signal ? -Infinity : +Infinity
			: (1 + signal * -2) * (exponent || significand ? !exponent ? Math.pow(2, -bias + 1) * significand
			: Math.pow(2, exponent - bias) * (1 + significand) : 0);
	},

	decodeInt: function (data, bits, signed)
	{
		var b = new this.Buffer(this.bigEndian, data), x = b.readBits(0, bits), max = Math.pow(2, bits);
		return signed && x >= max / 2 ? x - max : x;
	},

	warn: function (msg)
	{
		if (this.allowExceptions)
			throw new Error(msg);
		return 1;
	},

	toSmall: function (data)
	{
		return this.decodeInt(data, 8, true);
	},

	fromSmall: function (number)
	{
		return this.encodeInt(number, 8, true);
	},

	toByte: function (data)
	{
		return this.decodeInt(data, 8, false);
	},

	fromByte: function (number)
	{
		return this.encodeInt(number, 8, false);
	},

	toShort: function (data)
	{
		return this.decodeInt(data, 16, true);
	},

	fromShort: function (number)
	{
		return this.encodeInt(number, 16, true);
	},

	toWord: function (data)
	{
		return this.decodeInt(data, 16, false);
	},

	fromWord: function (number)
	{
		return this.encodeInt(number, 16, false);
	},

	toInt: function (data)
	{
		return this.decodeInt(data, 32, true);
	},

	fromInt: function (number)
	{
		return this.encodeInt(number, 32, true);
	},

	toDWord: function (data)
	{
		return this.decodeInt(data, 32, false);
	},

	fromDWord: function (number)
	{
		return this.encodeInt(number, 32, false);
	},

	toFloat: function (data)
	{
		return this.decodeFloat(data, 23, 8);
	},

	fromFloat: function (number)
	{
		return this.encodeFloat(number, 23, 8);
	},

	toDouble: function (data)
	{
		return this.decodeFloat(data, 52, 11);
	},

	fromDouble: function (number)
	{
		return this.encodeFloat(number, 52, 11);
	}
};

BinaryParser.prototype.Buffer = function (bigEndian, buffer)
{
	this.bigEndian = bigEndian || 0, this.buffer = [], this.setBuffer(buffer);
};

BinaryParser.prototype.Buffer.prototype =
{
	readBits: function (start, length)
	{
		//shl fix: Henri Torgemane ~1996 (compressed by Jonas Raoni)
		function shl(a, b)
		{
			for (++b; --b; a = ((a %= 0x7fffffff + 1) & 0x40000000) == 0x40000000 ? a * 2 : (a - 0x40000000) * 2 + 0x7fffffff + 1);
			return a;
		}

		if (start < 0 || length <= 0)
			return 0;
		this.checkBuffer(start + length);
		for (var offsetLeft, offsetRight = start % 8, curByte = this.buffer.length - (start >> 3) - 1,
			     lastByte = this.buffer.length + (-(start + length) >> 3), diff = curByte - lastByte,
			     sum = ((this.buffer[curByte] >> offsetRight) & ((1 << (diff ? 8 - offsetRight : length)) - 1))
				     + (diff && (offsetLeft = (start + length) % 8) ? (this.buffer[lastByte++] & ((1 << offsetLeft) - 1))
				     << (diff-- << 3) - offsetRight : 0); diff; sum += shl(this.buffer[lastByte++], (diff-- << 3) - offsetRight)
			);
		return sum;
	},

	setBuffer: function (data)
	{
		if (data)
		{
			for (var l, i = l = data.length, b = this.buffer = new Array(l); i; b[l - i] = data.charCodeAt(--i));
			this.bigEndian && b.reverse();
		}
	},

	hasNeededBits: function (neededBits)
	{
		return this.buffer.length >= -(-neededBits >> 3);
	},

	checkBuffer: function (neededBits)
	{
		if (!this.hasNeededBits(neededBits))
			throw new Error("checkBuffer::missing bytes");
	}
};

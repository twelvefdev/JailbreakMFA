//----------------------------------------------------------------------------------
//
// CRunFunctionEggtimer
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
CRunFunctionEggtimer.CONONFUNCTION = 0;
CRunFunctionEggtimer.CONANYFUNCTION = 1;
CRunFunctionEggtimer.CND_LAST = 2;
CRunFunctionEggtimer.ACDELAYFUNCTION = 0;
CRunFunctionEggtimer.ACTCANCELFUNCTION = 1;
CRunFunctionEggtimer.ACSETREPEAT = 2;
CRunFunctionEggtimer.ACSETPRIVATEDATA = 3;
CRunFunctionEggtimer.ACUSESUCCESSFLAG = 4;
CRunFunctionEggtimer.ACFUNCTIONSUCCESSFULL = 5;
CRunFunctionEggtimer.ACIMMEDIATEFUNCTION = 6;
CRunFunctionEggtimer.ACSTOPALL = 7;
CRunFunctionEggtimer.EXPGETFUNCTIONSINQUEUE = 0;
CRunFunctionEggtimer.EXTLASTFUNCTIONNAME = 1;
CRunFunctionEggtimer.EXTPRIVATEDATA = 2;
CRunFunctionEggtimer.EXTREMAININGREPEATS = 3;

function CRunFunctionEggtimer()
{
	this.head = null;
	this.tail = null;
	this.itemCount = 0;
	this.lastFunctionName = "";
	this.currentFunction = null;
}
CRunFunctionEggtimer.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return CRunFunctionEggtimer.CND_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			return false;
		},

		destroyRunObject: function (bFast)
		{
			this.head = this.tail = null;
		},

		handleRunObject: function ()
		{
			var it;
			for (it = this.head; it != null; it = it.next)
			{
				this.currentFunction = it;

				//Delete the function if it was marked as successful or if function
				//is immediate but not asked to loop
				if (it.deleteMe == true || (it.immediateFunc && !it.immediateApproved))
				{
					this.DeleteItem(it);
					continue;
				}

				//When the time expires, trigger the functions if
				//function is not set to repeat.
				if (it.time <= 0)
				{
					var deleteMe = true;

					//Update the this.lastFunctionName string
					this.lastFunctionName = it.name;

					//Handle repeatable functions
					if (it.repeat > 1 || it.repeat == -1)
					{
						it.time = it.initialTime;
						it.repeat = Math.max(it.repeat - 1, -1);
						deleteMe = false;
					}

					//Triggers the 'on function' events.
					this.ho.generateEvent(CRunFunctionEggtimer.CONONFUNCTION, 0);
					this.ho.generateEvent(CRunFunctionEggtimer.CONANYFUNCTION, 0);

					//Delete the function from the queue
					if (deleteMe && it.waitForSuccellfull == false)
					{
						this.DeleteItem(it);
						continue;
					}
				}
				else
					it.time--;
			}

			return 0;
		},


		// Conditions
		// -------------------------------------------------
		condition:       function (num, cnd)
		{
			switch (num)
			{
				case CRunFunctionEggtimer.CONONFUNCTION:
					return this.conOnFunction(cnd.getParamExpString(this.rh, 0));
				case CRunFunctionEggtimer.CONANYFUNCTION:
					return this.conAnyFunction();
			}
			return false;
		},

		// Actions
		// -------------------------------------------------
		action:          function (num, act)
		{
			switch (num)
			{
				case CRunFunctionEggtimer.ACDELAYFUNCTION:
					this.acDelayFunction(act.getParamExpString(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunFunctionEggtimer.ACTCANCELFUNCTION:
					this.actCancelFunction(act.getParamExpString(this.rh, 0));
					break;
				case CRunFunctionEggtimer.ACSETREPEAT:
					this.acSetRepeat(act.getParamExpression(this.rh, 0));
					break;
				case CRunFunctionEggtimer.ACSETPRIVATEDATA:
					this.acSetPrivateData(act.getParamExpression(this.rh, 0));
					break;
				case CRunFunctionEggtimer.ACUSESUCCESSFLAG:
					this.acUseSuccessFlag();
					break;
				case CRunFunctionEggtimer.ACFUNCTIONSUCCESSFULL:
					this.acFunctionSuccessfull();
					break;
				case CRunFunctionEggtimer.ACIMMEDIATEFUNCTION:
					this.acImmediateFunction(act.getParamExpString(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunFunctionEggtimer.ACSTOPALL:
					this.acStopAll();
					break;
			}
		},

		// Expressions
		// -------------------------------------------------
		expression:      function (num)
		{
			switch (num)
			{
				case CRunFunctionEggtimer.EXPGETFUNCTIONSINQUEUE:
					return this.expGetFunctionsInQueue();
				case CRunFunctionEggtimer.EXTLASTFUNCTIONNAME:
					return this.extLastFunctionName();
				case CRunFunctionEggtimer.EXTPRIVATEDATA:
					return this.extPrivateData();
				case CRunFunctionEggtimer.EXTREMAININGREPEATS:
					return this.extRemainingRepeats();
			}
			return (0);
		},

		DeleteItem: function (it)
		{
			//Deleting this object and fixing pointers
			if (it.prev != null)
				it.prev.next = it.next;
			else
				this.head = it.next;

			if (it.next != null)
				it.next.prev = it.prev;
			else
				this.tail = it.prev;

			this.itemCount--;
		},

		AddItem: function (it)
		{
			if (this.tail == null)
			{
				this.head = this.tail = it;
				it.prev = it.next = null;
			}
			else
			{
				this.tail.next = it;
				it.prev = this.tail;
				it.next = null;
				this.tail = it;
			}
			this.itemCount++;
		},

		conOnFunction: function (functionName)
		{
			if (functionName == this.lastFunctionName)
				return true;
			return false;
		},

		conAnyFunction: function ()
		{
			return true;
		},

		acDelayFunction: function (functionName, delay)
		{
			var newfunc = new CRunFunctionEggtimerFunction();
			newfunc.name = functionName;
			newfunc.initialTime = delay;
			newfunc.time = delay;
			newfunc.deleteMe = false;
			newfunc.privateData = 0;
			newfunc.repeat = 0;
			newfunc.waitForSuccellfull = false;
			newfunc.immediateFunc = false;
			newfunc.immediateApproved = false;

			this.AddItem(newfunc);
		},

		actCancelFunction: function (functionName)
		{
			var it;
			for (it = this.head; it != null; it = it.next)
				if (functionName == it.name)
					this.DeleteItem(it);
		},

		acSetRepeat: function (repetitions)
		{
			if (this.tail == null)
				return;

			var func = this.tail;

			if (func.immediateFunc == false)
				func.repeat = Math.max(repetitions, -1);
			else if (repetitions >= 0)
				func.repeat = Math.max(repetitions - 1, 0);
			else
				func.repeat = -1;

			func.immediateApproved = true;
		},

		acSetPrivateData: function (privateData)
		{
			if (this.tail == null)
				return;
			this.tail.privateData = privateData;
		},

		acUseSuccessFlag: function ()
		{
			if (this.tail == null)
				return;
			this.tail.waitForSuccellfull = true;
		},

		acFunctionSuccessfull: function ()
		{
			if (this.currentFunction != null)
				this.currentFunction.deleteMe = true;
		},

		acImmediateFunction: function (functionName, delay)
		{
			var newfunc = new CRunFunctionEggtimerFunction();
			newfunc.name = functionName;
			newfunc.initialTime = delay;
			newfunc.time = delay;
			newfunc.deleteMe = false;
			newfunc.privateData = 0;
			newfunc.repeat = 0;
			newfunc.waitForSuccellfull = false;
			newfunc.immediateFunc = true;
			newfunc.immediateApproved = false;

			this.AddItem(newfunc);

			this.lastFunctionName = functionName;
			this.ho.generateEvent(CRunFunctionEggtimer.CONONFUNCTION, 0);
			this.ho.generateEvent(CRunFunctionEggtimer.CONANYFUNCTION, 0);
		},

		acStopAll: function ()
		{
			this.head = this.tail = null;
		},

		expGetFunctionsInQueue: function ()
		{
			return (this.itemCount);
		},

		extLastFunctionName: function ()
		{
			var ret = (0);
			ret.forceString(this.lastFunctionName)
			return ret;
		},

		extPrivateData: function ()
		{
			if (this.currentFunction != null)
				return (this.currentFunction.privateData);
			else
				return (0);
		},

		extRemainingRepeats: function ()
		{
			if (this.currentFunction != null)
				return (this.currentFunction.repeat);
			else
				return (0);
		}
	});

function CRunFunctionEggtimerFunction()
{
	this.name = null;
	this.time = 0;
	this.initialTime = 0;
	this.repeat = 0;
	this.privateData = 0;
	this.waitForSuccellfull = false;
	this.deleteMe = false;
	this.immediateFunc = false;
	this.immediateApproved = false;

	this.next = null;
	this.prev = null;
}


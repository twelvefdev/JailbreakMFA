//----------------------------------------------------------------------------------
//
// CRunForEach
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
CRunForEach.CON_ONFOREACHLOOPSTRING = 0;
CRunForEach.CON_FOREACHLOOPISPAUSED = 1;
CRunForEach.CON_OBJECTISPARTOFLOOP = 2;
CRunForEach.CON_OBJECTISPARTOFGROUP = 3;
CRunForEach.CON_ONFOREACHLOOPOBJECT = 4;
CRunForEach.CON_LAST = 5;
CRunForEach.ACT_STARTFOREACHLOOPFOROBJECT = 0;
CRunForEach.ACT_PAUSEFOREACHLOOP = 1;
CRunForEach.ACT_RESUMEFOREACHLOOP = 2;
CRunForEach.ACT_SETFOREACHLOOPITERATION = 3;
CRunForEach.ACT_STARTFOREACHLOOPFORGROUP = 4;
CRunForEach.ACT_ADDOBJECTTOGROUP = 5;
CRunForEach.ACT_ADDFIXEDTOGROUP = 6;
CRunForEach.ACT_REMOVEOBJECTFROMGROUP = 7;
CRunForEach.ACT_REMOVEFIXEDFROMGROUP = 8;
CRunForEach.EXP_LOOPFV = 0;
CRunForEach.EXP_LOOPITERATION = 1;
CRunForEach.EXP_LOOPMAXITERATION = 2;
CRunForEach.EXP_GROUPSIZE = 3;

function CRunForEach()
{
	this.name = null;
	this.fvs = new CArrayList();
	this.loopIndex = 0;
	this.loopMax = 0;
	this.paused = false;
	this.forEachLoops = null; // Name => ForEachLoop lookup
	this.pausedLoops = null; // Name => Paused ForEachLoop lookup
	this.groups = null;// Groupname => CArrayList of objects
	this.currentForEach = null;
	this.currentGroup = null;
	this.selection = null;
	this.currentLooped = null;

	//Variables for the ObjectSelection framework to access
	this.populateLoop = null; //To fill with all currently selected objects
	this.partOfLoop = null; //To access the loop in question
	this.partOfGroup = null; //To access the group in question
	this.oiToCheck = 0;
}
CRunForEach.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return CRunForEach.CON_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			this.currentGroup = null;

			this.forEachLoops = new Array();
			this.pausedLoops = new Array();
			this.groups = new Array();

			return true;
		},

		condition: function (num, cnd)
		{
			if (this.selection == null)
				this.selection = new ObjectSelection(this.rh.rhApp);

			switch (num)
			{
				case CRunForEach.CON_ONFOREACHLOOPSTRING:
					return cnd.getParamExpString(this.rh, 0) == this.currentForEach.name;

				case CRunForEach.CON_FOREACHLOOPISPAUSED:
				{
					var loop = this.forEachLoops[cnd.getParamExpString(this.rh, 0)];
					return loop != null && loop.paused == true;
				}

				case CRunForEach.CON_OBJECTISPARTOFLOOP:
				{
					var param = cnd.evtParams[0].oiList;

					if ((partOfLoop = this.forEachLoops[cnd.getParamExpString(this.rh, 1)]) == null)
						return false;

					return this.selection.filterObjects(this, param, (cnd.evtFlags2 & CEvent.EVFLAG2_NOT) != 0, this.filterPartOfLoop);
				}

				case CRunForEach.CON_OBJECTISPARTOFGROUP:
				{
					var param = cnd.evtParams[0].oiList;

					if ((this.partOfGroup = this.groups[cnd.getParamExpString(this.rh, 1)]) == null)
						return false;

					return this.selection.filterObjects(this, param, (cnd.evtFlags2 & CEvent.EVFLAG2_NOT) != 0, this.filterPartOfGroup);
				}

				case CRunForEach.CON_ONFOREACHLOOPOBJECT:

					if (this.currentForEach != null && cnd.getParamExpString(this.rh, 0) == this.currentForEach.name)
					{
						this.selection.selectOneObject(this.currentLooped);
						return true;
					}

					return false;
			}

			return false;
		},

		action: function (num, act)
		{
			if (this.selection == null)
				this.selection = new ObjectSelection(this.rh.rhApp);

			switch (num)
			{
				case CRunForEach.ACT_STARTFOREACHLOOPFOROBJECT:
				{
					var loopName = act.getParamExpString(this.rh, 0);
					var oi = act.evtParams[1].oiList;

					var loop = new ForEachLoop();
					this.populateLoop = loop;

					//Populate the current foreachloop with all the fixed values of the currently selected objects
					this.selection.filterObjects(this, oi, false, filterGetSelected);

					loop.name = loopName;
					loop.loopMax = loop.fvs.size();

					this.executeForEachLoop(loop);

					break;
				}
				case CRunForEach.ACT_PAUSEFOREACHLOOP:
				{
					var loop = this.forEachLoops[act.getParamExpString(this.rh, 0)];
					if (loop != null)
					{
						loop.paused = true;
					}
					break;
				}
				case CRunForEach.ACT_RESUMEFOREACHLOOP:
				{
					var loopName = act.getParamExpString(this.rh, 0);
					var loop = this.forEachLoops[loopName];
					if (loop != null)
					{
						loop.paused = false;
						this.pausedLoops.splice(loopName, 1);
						this.executeForEachLoop(loop);
					}
					break;
				}
				case CRunForEach.ACT_SETFOREACHLOOPITERATION:
				{
					var loop = this.forEachLoops[act.getParamExpString(this.rh, 0)];
					if (loop != null)
					{
						loop.loopIndex = act.getParamExpression(this.rh, 1);
					}
					break;
				}
				case CRunForEach.ACT_STARTFOREACHLOOPFORGROUP:
				{
					var loopName = act.getParamExpString(this.rh, 0);
					var group = this.groups[act.getParamExpString(this.rh, 1)];
					if (group != null)
					{
						var loop = new ForEachLoop();
						loop.name = loopName;
						loop.loopMax = group.size();
						var i;
						for (i = 0; i < group.length; i++)
						{
							if (group[i])
							{
								loop.fvs.add(group);
							}
						}
						this.executeForEachLoop(loop);
					}
					break;
				}
				case CRunForEach.ACT_ADDOBJECTTOGROUP:
				{
					if (this.ho.hoAdRunHeader.rhEvtProg.rh2ActionLoopCount != 0)
						return;

					var oi = act.evtParams[0].oiList;
					this.currentGroup = act.getParamExpString(this.rh, 1);
					var group = this.groups[this.currentGroup];

					//Create group if it doesn't exist
					if (group == null)
					{
						group = new CArrayList();
						this.groups[currentGroup] = group;
					}

					this.selection.filterObjects(this, oi, false, filterGetSelectedForGroup);
					this.currentGroup = null;

					break;
				}
				case CRunForEach.ACT_ADDFIXEDTOGROUP:
				{
					var fixed = act.getParamExpression(this.rh, 0);
					var groupName = act.getParamExpString(this.rh, 1);
					var group = this.groups[groupName];

					if (fixed == 0)
						break;

					//Create group if it doesn't exist
					if (group == null)
					{
						group = new CArrayList();
						this.groups[groupName] = group;
					}

					group.add(fixed);
					break;
				}
				case CRunForEach.ACT_REMOVEOBJECTFROMGROUP:
				{
					var object = act.getParamObject(this.rh, 0);
					var groupName = act.getParamExpString(this.rh, 1);
					var group = this.groups[groupName];

					if (group == null || object == null)
						break;

					group.removeObject(object.fixedValue());

					//Delete group if empty
					if (group.size() == 0)
						this.groups.splice(groupName, 1);

					break;
				}
				case CRunForEach.ACT_REMOVEFIXEDFROMGROUP:
				{
					var fixed = act.getParamExpression(this.rh, 0);
					var groupName = act.getParamExpString(this.rh, 1);
					var group = this.groups[groupName];

					if (group == null || fixed == 0)
						break;

					group.removeObject(fixed);

					//Delete group if empty
					if (group.size() == 0)
						this.groups.splice(groupName, 1);

					break;
				}
			}
		},

		executeForEachLoop: function (loop)
		{
			//Store current loop
			var prevLoop = this.currentForEach;
			this.forEachLoops[loop.name] = loop;
			this.currentForEach = loop;
			for (; loop.loopIndex < loop.loopMax; ++loop.loopIndex)
			{
				//Was the loop paused?
				if (loop.paused)
				{
					//Move the fastloop to the 'paused' table
					this.pausedLoops[loop.name] = loop;
					this.forEachLoops.splice(loop.name, 1);
					break;
				}
				this.ho.generateEvent(CRunForEach.CON_ONFOREACHLOOPSTRING, 0);

				this.currentLooped = this.ho.getObjectFromFixed(loop.fvs.get(loop.loopIndex));
				if (this.currentLooped != null)
					this.ho.generateEvent(CRunForEach.CON_ONFOREACHLOOPOBJECT, 0);
			}
			//Release the loop?
			if (!loop.paused)
				this.forEachLoops.splice(loop.name, 1);

			//Restore the previous loop (in case of nested loops)
			this.currentForEach = prevLoop;
		},

		expression: function (num)
		{
			switch (num)
			{
				case CRunForEach.EXP_LOOPFV:
				{
					var loop = this.forEachLoops[this.ho.getExpParam()];
					if (loop == null)
						break;
					return loop.fvs.get(loop.loopIndex);
				}
				case CRunForEach.EXP_LOOPITERATION:
				{
					var loop = this.forEachLoops[this.ho.getExpParam()];
					if (loop == null)
						break;
					return loop.loopIndex;
				}
				case CRunForEach.EXP_LOOPMAXITERATION:
				{
					var loop = this.forEachLoops[this.ho.getExpParam()];
					if (loop == null)
						break;
					return loop.loopMax - 1;
				}
				case CRunForEach.EXP_GROUPSIZE:
				{
					var group = this.groups[this.ho.getExpParam()];
					if (group == null)
						break;
					return group.size();
				}
			}
			return 0;
		}

	});

function filterPartOfLoop(rdPtr, object)
{
	return rdPtr.partOfLoop.fvs.contains(object.fixedValue());
}

function filterPartOfGroup(rdPtr, object)
{
	return rdPtr.partOfGroup.contains(object.fixedValue());
}
//Adds all selected objects to the list of fixed values

function filterGetSelectedForGroup(rdPtr, object)
{
	var foreach = rdPtr;
	var array = foreach.groups[foreach.currentGroup];
	var currentFixed = object.fixedValue();

	if (array != null)
	{
		var i;
		for (i = 0; i < array.size(); ++i)
		{
			var fixedInArray = array.get(i);

			if (currentFixed == fixedInArray)
				return true;
		}
		array.add(currentFixed);
	}
	return true; //Don't filter out any objects
}

//Adds all selected objects to the current group
function filterGetSelected(rdPtr, object)
{
	rdPtr.populateLoop.addObject(object);
	return true;
}


function ForEachLoop()
{
	this.name = null;
	this.fvs = new CArrayList();
	this.loopIndex = 0;
	this.loopMax = 0;
	this.paused = 0;
}
ForEachLoop.prototype =
{
	addObject: function (object)
	{
		this.fvs.add(object.fixedValue());
	},
	addFixed:  function (fixed)
	{
		this.fvs.add(fixed);
	}
}

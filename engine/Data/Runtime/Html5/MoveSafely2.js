//----------------------------------------------------------------------------------
//
// CRUNMOVESAFELY2 : MoveSafely object
//
//----------------------------------------------------------------------------------
this.MoveSafely2 = CRunMoveSafely2;

CRunMoveSafely2.CID_OnSafety = 0;
CRunMoveSafely2.AID_Prepare = 0;
CRunMoveSafely2.AID_Start = 1;
CRunMoveSafely2.AID_Stop = 2;
CRunMoveSafely2.AID_SetObject = 3;
CRunMoveSafely2.AID_Stop2 = 4;
CRunMoveSafely2.AID_Setdist = 5;
CRunMoveSafely2.AID_Reset = 6;
CRunMoveSafely2.EID_GetX = 0;
CRunMoveSafely2.EID_GetY = 1;
CRunMoveSafely2.EID_Getfixed = 2;
CRunMoveSafely2.EID_GetNumber = 3;
CRunMoveSafely2.EID_GetIndex = 4;
CRunMoveSafely2.EID_Getdist = 5;

function CRunMoveSafely2()
{
	this.mypointer = null;
	this.X = 0;
	this.Y = 0;
	this.NewX = 0;
	this.NewY = 0;
	this.Debug = 0;
	this.Temp = 0;
	this.Temp2 = 0;
	this.Loopindex = 0;
	this.Dist = 0;
	this.hasstopped = false;
	this.inobstacle = false;
	this.last = false;
}
CRunMoveSafely2.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 1;
		},

		createRunObject: function (file, cob, version)
		{
			this.Dist = 1;
			this.mypointer = new CRunMoveSafely2myclass();
			return true;
		},

		condition: function (num, cnd)
		{
			if (num == CRunMoveSafely2.CID_OnSafety)
			{
				return true;
			}
			return false;
		},

		action:  function (num, act)
		{
			switch (num)
			{
				case CRunMoveSafely2.AID_Prepare:
					this.Prepare();
					break;
				case CRunMoveSafely2.AID_Start:
					this.Start();
					break;
				case CRunMoveSafely2.AID_Stop:
					this.Stop();
					break;
				case CRunMoveSafely2.AID_SetObject:
					this.SetObject(act.getParamObject(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunMoveSafely2.AID_Stop2:
					this.Stop2();
					break;
				case CRunMoveSafely2.AID_Setdist:
					this.SetDist(act.getParamExpression(this.rh, 0));
					break;
				case CRunMoveSafely2.AID_Reset:
					this.Reset();
					break;
			}
		},
		Prepare: function ()
		{
			var i;
			for (i = 0; i < this.mypointer.Mirrorvector.size(); i++)
			{
				this.mypointer.iterator = (this.mypointer.Mirrorvector.get(i));
				this.mypointer.iterator.OldX = this.mypointer.iterator.obj.hoX;
				this.mypointer.iterator.OldY = this.mypointer.iterator.obj.hoY;
			}
		},
		Start:   function ()
		{
			var i;
			for (i = 0; i < this.mypointer.Mirrorvector.size(); i++)
			{
				this.mypointer.iterator = (this.mypointer.Mirrorvector.get(i));
				this.mypointer.iterator.NewX = this.mypointer.iterator.obj.hoX;
				this.mypointer.iterator.NewY = this.mypointer.iterator.obj.hoY;
				this.X = this.mypointer.iterator.OldX;
				this.Y = this.mypointer.iterator.OldY;
				this.mypointer.iterator.obj.hoX = this.X;
				this.mypointer.iterator.obj.hoY = this.Y;
			}
			for (i = 0; i < this.mypointer.Mirrorvector.size(); i++)
			{
				this.Loopindex = 0;
				this.mypointer.iterator = (this.mypointer.Mirrorvector.get(i));
				this.NewX = this.mypointer.iterator.NewX;
				this.NewY = this.mypointer.iterator.NewY;
				this.Temp = Math.max(Math.abs(this.mypointer.iterator.OldX - this.NewX),
					Math.abs(this.mypointer.iterator.OldY - this.NewY));
				if (this.Temp != 0)
				{
					this.Temp2 = 1;
					var first = true;
					this.last = false;
					var doit = true;
					while (true)
					{
						if (!first)
							this.Temp2 += this.mypointer.iterator.Dist;
						if (first)
							first = false;
						if (this.Temp2 < this.Temp)
							doit = true;
						if (this.Temp2 >= this.Temp)
							doit = false;

						if (!doit && !this.last)
						{
							this.last = true;
							doit = true;
							this.Temp2 = this.Temp;
						}
						if (!doit)
							break;
						var x = this.NewX - this.mypointer.iterator.OldX;
						var y = this.NewY - this.mypointer.iterator.OldY;
						this.X = this.mypointer.iterator.OldX + x * this.Temp2 / this.Temp;
						this.Y = this.mypointer.iterator.OldY + y * this.Temp2 / this.Temp;
						this.mypointer.iterator.obj.hoX = this.X;
						this.mypointer.iterator.obj.hoY = this.Y;

						this.Debug++;
						this.ho.generateEvent(CRunMoveSafely2.CID_OnSafety, this.ho.getEventParam());
						this.Loopindex++;
					}
				}
				//get rid of the stopped or other objects will be piseed off :)
				this.hasstopped = false;
			}
		},

		Stop: function ()
		{
			//If the below happens, we are using the 'push out of obsticle' ruitine.
			if (this.hasstopped)
			{
				this.inobstacle = true;
				return;
			}
			//If the below happens, then we have specified for a 'push out of obstacle' routine.

			//I will need to make a loop, if the 'has stopped' is true, then you are still in an obstacle
			//if it's false, then you CAN stop the object moving :D
			this.hasstopped = true;
			this.inobstacle = true;
			var loop = 0;
			if (this.mypointer.iterator != null)
			{
				while (this.inobstacle)
				{
					loop++;
					this.inobstacle = false;

					var x = this.NewX - this.mypointer.iterator.OldX;
					var y = this.NewY - this.mypointer.iterator.OldY;
					this.X = this.mypointer.iterator.OldX + x * (this.Temp2 - loop) / this.Temp;
					this.Y = this.mypointer.iterator.OldY + y * (this.Temp2 - loop) / this.Temp;
					this.mypointer.iterator.obj.hoX = this.X;
					this.mypointer.iterator.obj.hoY = this.Y;
					this.ho.generateEvent(CRunMoveSafely2.CID_OnSafety, this.ho.getEventParam());
				}
				//stop movin
				this.Temp2 = this.Temp;
				this.last = true;
				this.mypointer.iterator.obj.roc.rcChanged = true;
			}
		},

		SetObject: function (object, distance)
		{
			if (object != null)
			{
				this.mypointer.Mirrorvector.add(new CRunMoveSafely2CloneObjects(object, distance));
			}
		},
		Stop2:     function ()
		{
			//If the below happens, we are using the 'push out of obsticle' ruitine.
			if (this.hasstopped)
			{
				this.inobstacle = true;
				return;
			}
			//stop movin
			this.Temp2 = this.Temp;
			if (this.mypointer.iterator != null)
			{
				this.mypointer.iterator.obj.roc.rcChanged = true;
			}
		},
		SetDist:   function (dist)
		{
			this.Dist = dist;
		},
		Reset:     function ()
		{
			this.mypointer.Mirrorvector.clear();
			this.mypointer.iterator = null;
		},

		expression: function (num)
		{
			switch (num)
			{
				case CRunMoveSafely2.EID_GetX:
					return (this.X);
				case CRunMoveSafely2.EID_GetY:
					return (this.Y);
				case CRunMoveSafely2.EID_Getfixed:
					return this.Getfixed();
				case CRunMoveSafely2.EID_GetNumber:
					return (this.mypointer.Mirrorvector.size());
				case CRunMoveSafely2.EID_GetIndex:
					return (this.Loopindex);
				case CRunMoveSafely2.EID_Getdist:
					return (this.Debug);
			}
			return (0);//won't be used
		},

		Getfixed: function ()
		{
			if (this.mypointer.iterator != null)
			{
				return ((this.mypointer.iterator.obj.hoCreationId << 16) + this.mypointer.iterator.obj.hoNumber);
			}
			return (0);
		}
	});

function CRunMoveSafely2CloneObjects(o, d)
{
	this.obj = o;
	this.Dist = d;
	this.OldX = 0;
	this.OldY = 0;
	this.NewX = 0;
	this.NewY = 0;
}
function CRunMoveSafely2myclass()
{
	this.Mirrorvector = new CArrayList();
	this.iterator = null;
}



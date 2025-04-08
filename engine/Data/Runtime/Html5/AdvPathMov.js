//----------------------------------------------------------------------------------
//
// CRunAdvPathMov: advanced path movement object
//
//----------------------------------------------------------------------------------
this.AdvPathMov = CRunAdvPathMov;

CRunAdvPathMov.CID_ismoving = 0;
CRunAdvPathMov.CID_nodesconnected = 1;
CRunAdvPathMov.CID_isstopping = 2;
CRunAdvPathMov.CID_Hasreachedend = 3;
CRunAdvPathMov.CID_touchednewnod = 4;

CRunAdvPathMov.AID_creatpathnod = 0;
CRunAdvPathMov.AID_removepathnod = 1;
CRunAdvPathMov.AID_Clearpath = 2;
CRunAdvPathMov.AID_Connectnods = 3;
CRunAdvPathMov.AID_Addnodjourney = 4;
CRunAdvPathMov.AID_Insertnodjourney = 5;
CRunAdvPathMov.AID_Removelastnodjourney = 6;
CRunAdvPathMov.AID_Deletenodjourney = 7;
CRunAdvPathMov.AID_Findjourney = 8;
CRunAdvPathMov.AID_LoadPath = 9;
CRunAdvPathMov.AID_SavePath = 10;
CRunAdvPathMov.AID_MovementStart = 11;
CRunAdvPathMov.AID_MovementStop = 12;
CRunAdvPathMov.AID_MovementPause = 13;
CRunAdvPathMov.AID_Setspeed = 14;
CRunAdvPathMov.AID_Setobject = 15;
CRunAdvPathMov.AID_setXoffset = 16;
CRunAdvPathMov.AID_setYoffset = 17;
CRunAdvPathMov.AID_Enableautostep = 18;
CRunAdvPathMov.AID_Disableautostep = 19;
CRunAdvPathMov.AID_Forcemovexsteps = 20;
CRunAdvPathMov.AID_SetNodeX = 21;
CRunAdvPathMov.AID_SetNodeY = 22;
CRunAdvPathMov.AID_Disconnectnode = 23;
CRunAdvPathMov.AID_ClearJourney = 24;
CRunAdvPathMov.AID_ChangeX = 25;
CRunAdvPathMov.AID_ChangeY = 26;
CRunAdvPathMov.AID_ChangeDirection = 27;

CRunAdvPathMov.EID_Findnode = 0;
CRunAdvPathMov.EID_Numberofnods = 1;
CRunAdvPathMov.EID_GetJourneynode = 2;
CRunAdvPathMov.EID_Countjourneynode = 3;
CRunAdvPathMov.EID_ObjectGetX = 4;
CRunAdvPathMov.EID_ObjectGetY = 5;
CRunAdvPathMov.EID_ObjectGetSpeed = 6;
CRunAdvPathMov.EID_NodeDistance = 7;
CRunAdvPathMov.EID_NodeX = 8;
CRunAdvPathMov.EID_NodeY = 9;
CRunAdvPathMov.EID_GetCurrentSpeed = 10;
CRunAdvPathMov.EID_GetXoffset = 11;
CRunAdvPathMov.EID_GetYoffset = 12;
CRunAdvPathMov.EID_GetAngle = 13;
CRunAdvPathMov.EID_GetDirection = 14;
CRunAdvPathMov.EID_Getconnection = 15;
CRunAdvPathMov.EID_GetNumberconnections = 16;
CRunAdvPathMov.EID_GetNodesSpeed = 17;
CRunAdvPathMov.EID_AutochangeX = 18;
CRunAdvPathMov.EID_AutochangeY = 19;
CRunAdvPathMov.EID_AutochangeDirection = 20;

function CRunAdvPathMov()
{
	this.mypointer = null;
	this.distance = 0;
	this.speed = 0;
	this.totaldist = 0;
	this.ismoving = false;
	this.muststop = false;
	this.enableautostep = false;
	this.ChangeX = false;
	this.ChangeY = false;
	this.ChangeDirection = false;
	this.debug = 0;
	this.x = 0;
	this.y = 0;
	this.xoffset = 0;
	this.yoffset = 0;
	this.angle = 0;
	this.myObject = null;
}
CRunAdvPathMov.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 5;
		},

		createRunObject: function (file, cob, version)
		{
			file.setUnicode(false);
			this.mypointer = new CRunAdvPathMovmyclass();
			this.ho.hoX = cob.cobX;
			this.ho.hoY = cob.cobY;
			file.skipBytes(4);
			this.ho.hoImgWidth = file.readAShort();
			this.ho.hoImgHeight = file.readAShort();
			this.speed = (file.readAInt()) / 100.0;
			this.xoffset = file.readAInt();
			this.yoffset = file.readAInt();
			this.ChangeX = file.readAByte() == 1 ? true : false;
			this.ChangeY = file.readAByte() == 1 ? true : false;
			this.ChangeDirection = file.readAByte() == 1 ? true : false;
			this.enableautostep = file.readAByte() == 1 ? true : false;

			return true;
		},

		handleRunObject: function ()
		{
			if (this.mypointer.myjourney.size() == 1)
			{
				//	MessageBox(NULL,"Hi",NULL,NULL);
				//This is so the object is at the first point if its not moving.
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
				this.mypointer.theIterator = (this.mypointer.myvector.get(this.mypointer.JourneyIterator.Node));
				this.x = this.mypointer.theIterator.X;
				this.y = this.mypointer.theIterator.Y;
				if (this.ChangeX == true)
				{
					this.myObject.hoX = this.x;
				}
				if (this.ChangeY == true)
				{
					this.myObject.hoY = this.y;
				}
				this.myObject.roc.rcChanged = true;
			}
			if (this.ismoving == false)
			{
				return 0;
			}
			if (this.enableautostep == false)
			{
				return 0;
			}
			this.distance += this.speed;

			var FirstNode = 0;
			var NextNode = 0;
			var connectfound = false;
			var i;

			while ((this.ismoving == true) && (this.distance >= this.totaldist))
			{

				//Take away the this.distance travelled so far :)
				this.mypointer.myjourney.removeIndex(0);

				////Calculate position ( for when it touches a new node )
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
				FirstNode = this.mypointer.JourneyIterator.Node;
				this.mypointer.theIterator = (this.mypointer.myvector.get(FirstNode));
				this.x = this.mypointer.theIterator.X + this.xoffset;
				this.y = this.mypointer.theIterator.Y + this.yoffset;

				if (this.ChangeX == true)
				{
					this.myObject.hoX = this.x;
				}
				if (this.ChangeY == true)
				{
					this.myObject.hoY = this.y;
				}

				this.myObject.roc.rcChanged = true;
				this.ho.generateEvent(CRunAdvPathMov.CID_touchednewnod, this.ho.getEventParam());
				//callRunTimeFunction(rdPtr, RFUNCTION_GENERATEEVENT, 4, 0);

				if ((this.mypointer.myjourney.size()) <= 1 || (this.muststop == true))
				{
					this.ismoving = false;
					this.distance = 0;
					this.muststop = false;
					this.totaldist = 0;
					this.ho.generateEvent(CRunAdvPathMov.CID_Hasreachedend, this.ho.getEventParam());
					//callRunTimeFunction(rdPtr, RFUNCTION_GENERATEEVENT, 3, 0);
				}

				if (this.ismoving == true)
				{
					this.distance -= this.totaldist;

					//Set the iterator to the first journey step
					this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
					//Now we know what the current point has to be :)
					FirstNode = this.mypointer.JourneyIterator.Node;
					this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(1));
					//Now we what what the next point is going to be :)
					NextNode = this.mypointer.JourneyIterator.Node;

					//now we select the first point
					this.mypointer.theIterator = (this.mypointer.myvector.get(FirstNode));
					//Great...now we need to run through all the connections and find the right one
					for (i = 0; i < this.mypointer.theIterator.Connections.size(); i++)
					{
						this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
						if (this.mypointer.theIterator.ConnectIterator.PointID == NextNode)
						{
							this.totaldist = this.mypointer.theIterator.ConnectIterator.Distance;
							connectfound = true;
						}
					}
					if (connectfound == false)
					{
						this.ismoving = false;
						this.distance = 0;
						this.muststop = false;
						this.totaldist = 0;
					}
				}
			}

			if ((this.ismoving == true) && (this.distance != 0))
			{
				////Get points
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
				//Now we know what the current point has to be :)
				FirstNode = this.mypointer.JourneyIterator.Node;
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(1));
				//Now we want what the next point is going to be :)
				NextNode = this.mypointer.JourneyIterator.Node;

				this.mypointer.theIterator = (this.mypointer.myvector.get(FirstNode));
				var x1 = this.mypointer.theIterator.X;
				var y1 = this.mypointer.theIterator.Y;

				this.mypointer.theIterator = (this.mypointer.myvector.get(NextNode));
				var x2 = this.mypointer.theIterator.X;
				var y2 = this.mypointer.theIterator.Y;
				var deltax = x2 - x1;
				var deltay = y2 - y1;

				/////Below need to go in main

				if (this.totaldist != 0)
				{
					var myval = (Math.atan2((deltax + 0.0), (deltay + 0.0)) / 3.1415926535897932384626433832795 * 180.0);
					this.angle = CServices.floatToInt(180.0 - myval);
				}


				///////////////////////////End
				/////Below need to go in main
				if (this.totaldist != 0)
				{
					this.x = CServices.floatToInt(x1 + deltax * (this.distance / this.totaldist ) + this.xoffset);
					this.y = CServices.floatToInt(y1 + deltay * (this.distance / this.totaldist ) + this.yoffset);
					if (this.ChangeX == true)
					{
						this.myObject.hoX = this.x;
					}
					if (this.ChangeY == true)
					{
						this.myObject.hoY = this.y;
					}

					if (this.ChangeDirection == true)
					{
						var direction = (this.angle * 32 + 180) / 360;
						direction = 8 - direction;
						if (direction < 0)
						{
							direction += 32;
						}
						//	return direction;
						this.myObject.roc.rcDir = direction;
					}
					this.myObject.roc.rcChanged = true;
				}
			}
			return 0;
		},

		// Conditions
		// --------------------------------------------------
		condition:       function (num, cnd)
		{
			switch (num)
			{
				case CRunAdvPathMov.CID_ismoving:
					return this.ismoving;
				case CRunAdvPathMov.CID_nodesconnected:
					return this.nodesconnected(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1));
				case CRunAdvPathMov.CID_isstopping:
					return this.muststop;
				case CRunAdvPathMov.CID_Hasreachedend:
					return true;
				case CRunAdvPathMov.CID_touchednewnod:
					return true;
			}
			return false;//won't happen
		},

		nodesconnected: function (param1, param2)
		{
			param1--;
			param2--;
			if (param1 < 0 || param2 < 0)
			{
				return false;
			}
			if ((param1 >= this.mypointer.myvector.size()) || (param2 >= this.mypointer.myvector.size()))
			{
				return false;
			}

			//param1 contains the number inputed by the user
			//param2 contains the number inputed by the user
			this.mypointer.theIterator = (this.mypointer.myvector.get(param1));
			var i;
			for (i = 0; i < this.mypointer.theIterator.Connections.size(); i++)
			{
				this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
				if (this.mypointer.theIterator.ConnectIterator.PointID == param2)
				{
					return true;
				}
			}
			return false;
		},

		// Actions
		// -------------------------------------------------
		action:         function (num, act)
		{
			switch (num)
			{
				case CRunAdvPathMov.AID_creatpathnod:
					this.creatpathnod(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunAdvPathMov.AID_removepathnod:
					this.removepathnod(act.getParamExpression(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_Clearpath:
					this.Clearpath(act.getParamExpression(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_Connectnods:
					this.Connectnods(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpDouble(this.rh, 2));
					break;
				case CRunAdvPathMov.AID_Addnodjourney:
					this.Addnodjourney(act.getParamExpression(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_Insertnodjourney:
					this.Insertnodjourney(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunAdvPathMov.AID_Removelastnodjourney:
					this.mypointer.myjourney.removeIndex(this.mypointer.myjourney.size() - 1);
					break;
				case CRunAdvPathMov.AID_Deletenodjourney:
					this.Deletenodjourney(act.getParamExpression(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_Findjourney:
					this.Findjourney(act.getParamExpression(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_LoadPath:
					break;
				case CRunAdvPathMov.AID_SavePath:
					break;
				case CRunAdvPathMov.AID_MovementStart:
					this.MovementStart();
					break;
				case CRunAdvPathMov.AID_MovementStop:
					this.muststop = true;
					break;
				case CRunAdvPathMov.AID_MovementPause:
					this.ismoving = false;
					break;
				case CRunAdvPathMov.AID_Setspeed:
					this.Setspeed(act.getParamExpDouble(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_Setobject:
					this.Setobject(act.getParamObject(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_setXoffset:
					this.xoffset = act.getParamExpression(this.rh, 0);
					break;
				case CRunAdvPathMov.AID_setYoffset:
					this.yoffset = act.getParamExpression(this.rh, 0);
					break;
				case CRunAdvPathMov.AID_Enableautostep:
					this.enableautostep = true;
					break;
				case CRunAdvPathMov.AID_Disableautostep:
					this.enableautostep = true;
					break;
				case CRunAdvPathMov.AID_Forcemovexsteps:
					this.Forcemovexsteps(act.getParamExpDouble(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_SetNodeX:
					this.SetNodeX(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunAdvPathMov.AID_SetNodeY:
					this.SetNodeY(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunAdvPathMov.AID_Disconnectnode:
					this.Disconnectnode(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunAdvPathMov.AID_ClearJourney:
					this.ClearJourney();
					break;
				case CRunAdvPathMov.AID_ChangeX:
					this.DoChangeX(act.getParamExpression(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_ChangeY:
					this.DoChangeY(act.getParamExpression(this.rh, 0));
					break;
				case CRunAdvPathMov.AID_ChangeDirection:
					this.DoChangeDirection(act.getParamExpression(this.rh, 0));
					break;
			}
		},

		creatpathnod:  function (param1, param2)
		{
			this.mypointer.myvector.add(new CRunAdvPathMovPoints(param1, param2));
		},
		removepathnod: function (param1)
		{
			if (this.distance != 0)
			{
				return;
			}
			if (this.mypointer.myjourney.size() != 0)
			{
				return;
			}
			if (param1 < 1)
			{
				return;
			}
			if (param1 > this.mypointer.myvector.size())
			{
				return;
			}
			this.mypointer.myvector.removeIndex(param1 - 1);
			var connectionspot;
			///Loop through all the vectors!

			var i, j;
			for (i = 0;
			     i < this.mypointer.myvector.size();
			     i++)
			{
				this.mypointer.theIterator = (this.mypointer.myvector.get(i));
				connectionspot = -1;
				for (j = 0;
				     j < this.mypointer.theIterator.Connections.size();
				     j++)
				{
					this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(j));
					connectionspot++;
					if (this.mypointer.theIterator.ConnectIterator.PointID == param1 - 1)
					{
						this.mypointer.theIterator.Connections.removeIndex(connectionspot);
					}
					if (this.mypointer.theIterator.ConnectIterator.PointID >= param1 - 1)
					{
						this.mypointer.theIterator.ConnectIterator.PointID -= 1;
					}
				}
			}
		},
		remove:        function (array, from, max)
		{
			var i = from;
			while (i <= max)
			{
				array.removeIndex(from);
				i++;
			}
		},
		Clearpath:     function (param1)
		{
			////THIS IS ACTUALLY CLEAR JOURNEY
			if (this.mypointer.myjourney.size() < 2)
			{
				this.distance = 0;
				this.totaldist = 0;
				this.ismoving = false;
				return;
			}
			if (param1 == 0)
			{
				this.mypointer.myjourney.clear();
				this.distance = 0;
				this.totaldist = 0;
				this.ismoving = false;
				return;
			}
			if ((param1 == 1) && (this.distance == 0))
			{
				this.remove(this.mypointer.myjourney, 1, this.mypointer.myjourney.size());

				this.distance = 0;
				this.totaldist = 0;
			}

			if ((param1 == 1) && (this.distance > 0))
			{
				this.remove(this.mypointer.myjourney, 2, this.mypointer.myjourney.size());
			}
		},
		Connectnods:   function (p1, p2, p3)
		{
			p1--;
			p2--;
			/// Idiot Proof :P
			if (p1 < 0
				|| p2 < 0
				|| p1 >= this.mypointer.myvector.size()
				|| p2 >= this.mypointer.myvector.size()
				|| p1 == p2)
			{
				return;
			}
			//int myval = 0;
			/////Check for existing connections.
			this.mypointer.theIterator = (this.mypointer.myvector.get(p1));

			var i;
			for (i = 0;
			     i < this.mypointer.theIterator.Connections.size();
			     i++)
			{
				this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));

				if (this.mypointer.theIterator.ConnectIterator.PointID == p2)
				{
					this.mypointer.theIterator.Connections.removeObject(this.mypointer.theIterator.ConnectIterator);
				}
				//	myval ++;
			}

			/////
			//Get second vector
			this.mypointer.theIterator = (this.mypointer.myvector.get(p2));
			var v2x = this.mypointer.theIterator.X;
			var v2y = this.mypointer.theIterator.Y;

			//Get first vector
			this.mypointer.theIterator = (this.mypointer.myvector.get(p1));
			var v1x = this.mypointer.theIterator.X;
			var v1y = this.mypointer.theIterator.Y;
			var deltax = v2x - v1x;
			var deltay = v2y - v1y;
			var distance = (Math.sqrt(deltax * deltax + deltay * deltay));
			var vectorentry = (distance / p3);
			// now stick the data into the first vector
			if (p3 == 0)
			{
				p3 = 1;
			}
			this.mypointer.theIterator.Connections.add(new CRunAdvPathMovConnect(p2, vectorentry));
		},

		Addnodjourney:    function (param1)
		{
			if (param1 < 1
				|| param1 > this.mypointer.myvector.size())
			{
				return;
			}
			if (this.mypointer.myjourney.size() > 0)
			{
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(this.mypointer.myjourney.size() - 1));
				if (param1 - 1 == this.mypointer.JourneyIterator.Node)
				{
					return;
				}
			}
			this.mypointer.myjourney.add(new CRunAdvPathMovJourney(param1 - 1));
		},
		Insertnodjourney: function (param1, param2)
		{
			//param1 is the Node

			if (param1 < 0)
			{
				param1 = 0;
			}
			param1--;

			//param2 is the position ( starting at 0 )
			if (param2 >= this.mypointer.myjourney.size())
			{
				this.mypointer.myjourney.add(new CRunAdvPathMovJourney(param1));
				return;
			}

			if (param2 < 0)
			{
				param2 = 0;
			}
			//param2--;
			//	int temp;
			var i;
			for (i = this.mypointer.myjourney.size() - 1; i >= 0; i--)
			{
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(i));

				if (i == this.mypointer.myjourney.size() - 1)
				{
					this.mypointer.myjourney.add(new CRunAdvPathMovJourney(this.mypointer.JourneyIterator.Node));
				}
				else
				{
					var temp = this.mypointer.JourneyIterator.Node;
					this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(i + 1));
					this.mypointer.JourneyIterator.Node = temp;
				}

			}

			this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(param2));
			this.mypointer.JourneyIterator.Node = param1;
		},
		Deletenodjourney: function (param1)
		{
			///FOOL PROOF
			if (param1 < 0
				|| param1 > this.mypointer.myjourney.size())
			{
				return;
			}
			///////////

			if (this.distance == 0)
			{
				this.mypointer.myjourney.removeIndex(param1);
			}
			//param1 contains the number inputed by the user
		},
		Findjourney:      function (param1)
		{
			param1--;
			if (param1 < 0)
			{
				return;
			}
			if (param1 > this.mypointer.myvector.size())
			{
				return;
			}
			if (this.mypointer.myjourney.size() == 0)
			{
				return;
			}

			/////stuff from the class
			var ThePoints = new CArrayList();//holds the point numbers
			var Connection = new CArrayList();//holds which connection id it has
			var distance = new CArrayList();
			var Results = new CArrayList();
			var Get;
			//all ArrayList<Integer>

			var Resultdistance = 0;
			var Resultfound = false;
			var TheDistance = 0;
			var v;

			//Put the first point into the point array
			this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(this.mypointer.myjourney.size() - 1));
			ThePoints.add(this.mypointer.JourneyIterator.Node);
			Connection.add(0);
			distance.add(0);
			Resultfound = false;

			var dontstop = true;
			this.debug = -1;

			while (dontstop)
			{
				// Get the point we need to check for connections
				Get = (ThePoints.get(ThePoints.size() - 1));
				this.mypointer.theIterator = (this.mypointer.myvector.get(Get));
				// Check the point
				//check that there will be another conection spot
				if (this.mypointer.theIterator.Connections.size() > (Connection.get(Connection.size() - 1)))
				{
					//Select the next connection point
					this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(((Connection.get(Connection.size() - 1)))));


					/// We look through all the points used so far ( this is necassary so not to go over the same point twice)
					var worked = true;
					var Currentpos;
					for (Currentpos = 0;
					     Currentpos < ThePoints.size();
					     Currentpos++)
					{
						Get = (ThePoints.get(Currentpos));

						if (this.mypointer.theIterator.ConnectIterator.PointID == Get)
						{
							worked = false;

							if (ThePoints.size() == 0)
							{
								dontstop = false;
							}
							else
							{
								v = (Connection.get(Connection.size() - 1));
								Connection.set(Connection.size() - 1, v + 1);
							}
						}
					}
					//// MUST STICK SOMETHING IN HERE FOR ADDING TO THE DISTANCE
					if (worked)
					{
						ThePoints.add(this.mypointer.theIterator.ConnectIterator.PointID);
						distance.add((this.mypointer.theIterator.ConnectIterator.Distance));
						TheDistance += this.mypointer.theIterator.ConnectIterator.Distance;

						Connection.add(0);
						if (TheDistance > Resultdistance && Resultfound == true)
						{
							Connection.removeIndex(Connection.size() - 1);
							TheDistance -= (distance.get(distance.size() - 1));
							distance.removeIndex(distance.size() - 1);
							ThePoints.removeIndex(ThePoints.size() - 1);
							v = (Connection.get(Connection.size() - 1));
							Connection.set(Connection.size() - 1, (v + 1));
						}
						///check if the point we have just added is the one we are after
						Get = (ThePoints.get(ThePoints.size() - 1));
						if (Get == param1)
						{
							///////////////////////////////////////////////////////////////////////////////
							/////    WOOOHOOOOO PATH HAS BEEN FOUND FRIGGIN AWSOME :D!!!!                //
							///////////////////////////////////////////////////////////////////////////////

							////first we calculate the total distance of the journey....i love C++ :)
							//   int totaldis = 0;
							// for(int this.x = 0;this.x<distance.size();this.x++)
							// {
							//	   totaldis += distance.at(this.x);}


							///no point doing anything if the route is longer

							if (Resultdistance > TheDistance || Resultfound == false)
							{
								Resultfound = true;
								Resultdistance = TheDistance;
								Results.clear();

								//////Now we must stick the distance in the vector and copy all the points
								var y;
								for (y = 0; y < ThePoints.size(); y++)
								{
									Get = (ThePoints.get(this.y));
									Results.add(Get);
								}
							}
							Connection.removeIndex(Connection.size() - 1);
							TheDistance -= (distance.get(distance.size() - 1));
							distance.removeIndex(distance.size() - 1);
							ThePoints.removeIndex(ThePoints.size() - 1);
							v = (Connection.get(Connection.size() - 1));
							Connection.set(Connection.size() - 1, (v + 1));
						}
					}
				}
				else
				{
					ThePoints.removeIndex(ThePoints.size() - 1);
					Connection.removeIndex(Connection.size() - 1);
					TheDistance -= (distance.get(distance.size() - 1));
					distance.removeIndex(distance.size() - 1);
					if (ThePoints.size() == 0)
					{
						dontstop = false;
					}
					else
					{
						v = (Connection.get(Connection.size() - 1));
						Connection.set(Connection.size() - 1, v + 1);
					}
				}
			}

			///Now we have found all the paths, we must stick them into the journey:)

			var z;
			for (z = 1; z < Results.size(); z++)
			{
				Get = (Results.get(z));
				this.mypointer.myjourney.add(new CRunAdvPathMovJourney(Get));
			}
			//param1 contains the number inputed by the user
			Results.clear();
			ThePoints.clear();
			Connection.clear();
			distance.clear();
			this.debug = ThePoints.size() + Connection.size() + distance.size() + Results.size();

		},


		MovementStart:   function ()
		{
			if (this.mypointer.myjourney.size() < 1)
			{
				return;
			}
			this.ismoving = true;
			this.muststop = false;

			//Set the iterator to the first journey step
			this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
			//Now we know what the current point has to be :)
			var FirstNode = this.mypointer.JourneyIterator.Node;
			var NextNode = 0;
			if (this.mypointer.myjourney.size() > 1)
			{
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(1));
				//Now we what what the next point is going to be :)
				NextNode = this.mypointer.JourneyIterator.Node;
			}

			var connectfound = false;

			//now we select the first point
			this.mypointer.theIterator = (this.mypointer.myvector.get(FirstNode));
			//Great...now we need to run through all the connections and find the right one
			var i;
			for (i = 0;
			     i < this.mypointer.theIterator.Connections.size();
			     i++)
			{
				this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
				if (this.mypointer.theIterator.ConnectIterator.PointID == NextNode)
				{
					this.totaldist = this.mypointer.theIterator.ConnectIterator.Distance;
					connectfound = true;
				}
			}
			if (connectfound == false)
			{
				this.ismoving = false;
				this.distance = 0;
				this.muststop = false;
				this.totaldist = 0;
			}
		},
		Setspeed:        function (speed)
		{
			if (speed <= 0)
			{
				return;
			}
			this.speed = speed;
		},
		Setobject:       function (object)
		{
			this.myObject = object;
		},
		Forcemovexsteps: function (p1)
		{
			if (p1 <= 0)
			{
				return;
			}
			var oldspeed = this.speed;
			this.speed = p1;

			///////////////////////////////////////////////////
			//////////////////////////////////////////////////
			/////////////////////////////////////////////////
			////////////////////////////////////////////////
			///////////////////////////////////////////////
			//////////////////////////////////////////////
			if (this.mypointer.myjourney.size() == 1)
			{
				//	MessageBox(NULL,"Hi",NULL,NULL);
				//This is so the object is at the first point if its not moving.
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
				this.mypointer.theIterator = (this.mypointer.myvector.get(this.mypointer.JourneyIterator.Node));
				this.x = this.mypointer.theIterator.X;
				this.y = this.mypointer.theIterator.Y;
				if (this.ChangeX == true)
				{
					this.myObject.hoX = this.x;
				}
				if (this.ChangeY == true)
				{
					this.myObject.hoY = this.y;
				}
				this.myObject.roc.rcChanged = true;
			}

			if (this.ismoving == false)
			{
				return;
			}

			this.distance += this.speed;

			var FirstNode = 0;
			var NextNode = 0;
			var connectfound = false;
			while ((this.ismoving == true) && (this.distance >= this.totaldist))
			{
				//Take away the this.distance travelled so far :)
				this.mypointer.myjourney.removeIndex(0);

				////Calculate position ( for when it touches a new node )
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
				FirstNode = this.mypointer.JourneyIterator.Node;
				this.mypointer.theIterator = (this.mypointer.myvector.get(FirstNode));
				this.x = this.mypointer.theIterator.X + this.xoffset;
				this.y = this.mypointer.theIterator.Y + this.yoffset;

				if (this.ChangeX == true)
				{
					this.myObject.hoX = this.x;
				}
				if (this.ChangeY == true)
				{
					this.myObject.hoY = this.y;
				}

				this.myObject.roc.rcChanged = true;
				this.ho.generateEvent(CRunAdvPathMov.CID_touchednewnod, this.ho.getEventParam());
				//callRunTimeFunction(rdPtr, RFUNCTION_GENERATEEVENT, 4, 0);

				if (this.mypointer.myjourney.size() <= 1
					|| this.muststop == true)
				{
					this.ismoving = false;
					this.distance = 0;
					this.muststop = false;
					this.totaldist = 0;
					this.ho.generateEvent(CRunAdvPathMov.CID_Hasreachedend, this.ho.getEventParam());
					//callRunTimeFunction(rdPtr, RFUNCTION_GENERATEEVENT, 3, 0);
				}
				if (this.ismoving == true)
				{
					this.distance -= this.totaldist;

					//Set the iterator to the first journey step
					this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
					//Now we know what the current point has to be :)
					FirstNode = this.mypointer.JourneyIterator.Node;
					this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(1));
					//Now we what what the next point is going to be :)
					NextNode = this.mypointer.JourneyIterator.Node;

					//now we select the first point
					this.mypointer.theIterator = (this.mypointer.myvector.get(FirstNode));
					//Great...now we need to run through all the connections and find the right one
					var i;
					for (i = 0;
					     i < this.mypointer.theIterator.Connections.size();
					     i++)
					{
						this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
						if (this.mypointer.theIterator.ConnectIterator.PointID == NextNode)
						{
							this.totaldist = this.mypointer.theIterator.ConnectIterator.Distance;
							connectfound = true;
						}
					}
					if (connectfound == false)
					{
						this.ismoving = false;
						this.distance = 0;
						this.muststop = false;
						this.totaldist = 0;
					}
				}
			}
			if ((this.ismoving == true) && (this.distance != 0))
			{
				////Get points
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(0));
				//Now we know what the current point has to be :)
				FirstNode = this.mypointer.JourneyIterator.Node;
				this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(1));
				//Now we want what the next point is going to be :)
				NextNode = this.mypointer.JourneyIterator.Node;


				this.mypointer.theIterator = (this.mypointer.myvector.get(FirstNode));
				var x1 = this.mypointer.theIterator.X;
				var y1 = this.mypointer.theIterator.Y;

				this.mypointer.theIterator = (this.mypointer.myvector.get(NextNode));
				var x2 = this.mypointer.theIterator.X;
				var y2 = this.mypointer.theIterator.Y;
				var deltax = x2 - x1;
				var deltay = y2 - y1;

				/////Below need to go in main

				if (this.totaldist != 0)
				{
					var myval = (Math.atan2((deltax + 0.0), (deltay + 0.0)) / 3.1415926535897932384626433832795 * 180);
					this.angle = CServices.floatToInt(180 - myval);
				}


				///////////////////////////End


				/////Below need to go in main
				if (this.totaldist != 0)
				{
					this.x = CServices.floatToInt(x1 + deltax * (this.distance / this.totaldist ) + this.xoffset);
					this.y = CServices.floatToInt(y1 + deltay * (this.distance / this.totaldist ) + this.yoffset);
					if (this.ChangeX == true)
					{
						this.myObject.hoX = this.x;
					}
					if (this.ChangeY == true)
					{
						this.myObject.hoY = this.y;
					}

					if (this.ChangeDirection == true)
					{
						var direction = (this.angle * 32 + 180) / 360;
						direction = 8 - direction;
						if (direction < 0)
						{
							direction += 32;
						}
						//	return direction;
						this.myObject.roc.rcDir = direction;
					}
					this.myObject.roc.rcChanged = true;
				}
			}
			/////////////////////////////////////
			/////////////////
			////////////////
			///////////////
			this.speed = oldspeed;
		},
		SetNodeX:        function (param1, param2)
		{
			param1--; // 1 based index convert to 0 based
			//use param1
			// and 2
			var i, j;
			var X1;
			var Y1;
			var Olddist;
			var vecspeed;
			var Newdist;
			if ((param1 >= 0) && (param1 < this.mypointer.myvector.size()))
			{
				this.mypointer.theIterator = (this.mypointer.myvector.get(param1));
				var OldX = this.mypointer.theIterator.X;
				var OldY = this.mypointer.theIterator.Y;
				this.mypointer.theIterator.X = param2;
				var NewX = this.mypointer.theIterator.X;
				var NewY = this.mypointer.theIterator.Y;

				for (i = 0;
				     i < this.mypointer.myvector.size();
				     i++)
				{
					this.mypointer.theIterator = (this.mypointer.myvector.get(i));
					if (this.mypointer.theIterator != (this.mypointer.myvector.get(param1)))
					{
						for (j = 0;
						     j < this.mypointer.theIterator.Connections.size();
						     j++)
						{
							this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(j));
							if (this.mypointer.theIterator.ConnectIterator.PointID == param1)
							{
								//we need to figure the this.speed
								X1 = this.mypointer.theIterator.X;
								Y1 = this.mypointer.theIterator.Y;
								Olddist = (Math.sqrt((X1 - OldX ) * (X1 - OldX ) + (Y1 - OldY ) * (Y1 - OldY )));
								vecspeed = this.mypointer.theIterator.ConnectIterator.Distance / Olddist;
								Newdist = (Math.sqrt((X1 - NewX ) * (X1 - NewX ) + (Y1 - NewY ) * (Y1 - NewY )));
								this.mypointer.theIterator.ConnectIterator.Distance = vecspeed * Newdist;
							}
						}
					}
				}
				this.mypointer.theIterator = (this.mypointer.myvector.get(param1));


				for (i = 0;
				     i < this.mypointer.theIterator.Connections.size();
				     i++)
				{
					this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
					//rdPtr->this.mypointer->theIterator->ConnectIterator = rdPtr->this.mypointer->theIterator->Connections.begin() + temp;

					var Distancexspeed = this.mypointer.theIterator.ConnectIterator.Distance;

					this.mypointer.theIterator = (this.mypointer.myvector.get(this.mypointer.theIterator.ConnectIterator.PointID));
					X1 = this.mypointer.theIterator.X;
					Y1 = this.mypointer.theIterator.Y;
					Olddist = (Math.sqrt((X1 - OldX ) * (X1 - OldX ) + (Y1 - OldY ) * (Y1 - OldY )));
					vecspeed = Distancexspeed / Olddist;
					Newdist = (Math.sqrt((X1 - NewX ) * (X1 - NewX ) + (Y1 - NewY ) * (Y1 - NewY )));
					this.mypointer.theIterator = (this.mypointer.myvector.get(param1));
					this.mypointer.theIterator.ConnectIterator.Distance = vecspeed * Newdist;

				}
			}
		},

		SetNodeY:          function (param1, param2)
		{
			param1--; // 1 based index convert to 0 based
			//use param1
			// and 2
			var i, j;
			var X1;
			var Y1;
			var Olddist;
			var vecspeed;
			var Newdist;

			if ((param1 >= 0) && (param1 < this.mypointer.myvector.size()))
			{
				this.mypointer.theIterator = (this.mypointer.myvector.get(param1));
				var OldX = this.mypointer.theIterator.X;
				var OldY = this.mypointer.theIterator.Y;
				this.mypointer.theIterator.Y = param2;
				var NewX = this.mypointer.theIterator.X;
				var NewY = this.mypointer.theIterator.Y;

				for (i = 0;
				     i < this.mypointer.myvector.size();
				     i++)
				{
					this.mypointer.theIterator = (this.mypointer.myvector.get(i));
					// For points that are connected to the just moved one we need to update
					if (this.mypointer.theIterator != (this.mypointer.myvector.get(param1)))
					{

						for (j = 0;
						     j < this.mypointer.theIterator.Connections.size();
						     j++)
						{
							this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(j));
							if (this.mypointer.theIterator.ConnectIterator.PointID == param1)
							{
								//we need to figure the this.speed
								X1 = this.mypointer.theIterator.X;
								Y1 = this.mypointer.theIterator.Y;
								Olddist = (Math.sqrt((X1 - OldX ) * (X1 - OldX ) + (Y1 - OldY ) * (Y1 - OldY )));
								vecspeed = this.mypointer.theIterator.ConnectIterator.Distance / Olddist;
								Newdist = (Math.sqrt((X1 - NewX ) * (X1 - NewX ) + (Y1 - NewY ) * (Y1 - NewY )));
								this.mypointer.theIterator.ConnectIterator.Distance = vecspeed * Newdist;
							}
						}
					}
				}
				///Ok now we must update the point so all the things its connected to will change

				this.mypointer.theIterator = (this.mypointer.myvector.get(param1));

				for (i = 0;
				     i < this.mypointer.theIterator.Connections.size();
				     i++)
				{
					this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
					//rdPtr->this.mypointer->theIterator->ConnectIterator = rdPtr->this.mypointer->theIterator->Connections.begin() + temp;

					var Distancexspeed = this.mypointer.theIterator.ConnectIterator.Distance;

					this.mypointer.theIterator = (this.mypointer.myvector.get(this.mypointer.theIterator.ConnectIterator.PointID));
					X1 = this.mypointer.theIterator.X;
					Y1 = this.mypointer.theIterator.Y;
					Olddist = (Math.sqrt((X1 - OldX ) * (X1 - OldX ) + (Y1 - OldY ) * (Y1 - OldY )));
					vecspeed = Distancexspeed / Olddist;
					Newdist = (Math.sqrt((X1 - NewX ) * (X1 - NewX ) + (Y1 - NewY ) * (Y1 - NewY )));
					this.mypointer.theIterator = (this.mypointer.myvector.get(param1));
					this.mypointer.theIterator.ConnectIterator.Distance = vecspeed * Newdist;

				}
			}
		},
		Disconnectnode:    function (param1, param2)
		{
			param1--;
			param2--;
			//param 1 and param 2
			if ((param1 >= 0) && (param1 < this.mypointer.myvector.size()))
			{
				this.mypointer.theIterator = (this.mypointer.myvector.get(param1));

				var i;
				for (i = 0;
				     i < this.mypointer.theIterator.Connections.size();
				     i++)
				{
					this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
					if (this.mypointer.theIterator.ConnectIterator.PointID == param2)
					{
						this.mypointer.theIterator.Connections.removeObject(this.mypointer.theIterator.ConnectIterator);
						//         rdPtr->this.mypointer->theIterator->ConnectIterator--;
					}
				}
			}
		},
		ClearJourney:      function ()
		{
			////THIS IS ACTUALLY CLEAR PATH!!!!!!
			this.mypointer.myvector.clear();
			this.mypointer.myjourney.clear();
			this.ismoving = false;
		},
		DoChangeX:         function (param1)
		{
			if (param1 == 1)
			{
				this.ChangeX = true;
			}
			if (param1 == 0)
			{
				this.ChangeX = false;
			}
		},
		DoChangeY:         function (param1)
		{
			if (param1 == 1)
			{
				this.ChangeY = true;
			}
			if (param1 == 0)
			{
				this.ChangeY = false;
			}
		},
		DoChangeDirection: function (param1)
		{
			if (param1 == 1)
			{
				this.ChangeDirection = true;
			}
			if (param1 == 0)
			{
				this.ChangeDirection = false;
			}
		},

		// Expressions
		// --------------------------------------------
		expression:        function (num)
		{
			switch (num)
			{
				case CRunAdvPathMov.EID_Findnode:
					return Findnode(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
				case CRunAdvPathMov.EID_Numberofnods:
					return (this.mypointer.myvector.size());
				case CRunAdvPathMov.EID_GetJourneynode:
					return this.GetJourneynode(this.ho.getExpParam());
				case CRunAdvPathMov.EID_Countjourneynode:
					return (this.mypointer.myjourney.size());
				case CRunAdvPathMov.EID_ObjectGetX:
					return (this.x);
				case CRunAdvPathMov.EID_ObjectGetY:
					return (this.y);
				case CRunAdvPathMov.EID_ObjectGetSpeed:
					return (this.speed);
				case CRunAdvPathMov.EID_NodeDistance:
					return this.NodeDistance(this.ho.getExpParam(), this.ho.getExpParam());
				case CRunAdvPathMov.EID_NodeX:
					return this.NodeX(this.ho.getExpParam());
				case CRunAdvPathMov.EID_NodeY:
					return this.NodeY(this.ho.getExpParam());
				case CRunAdvPathMov.EID_GetCurrentSpeed:
					return (0);
				case CRunAdvPathMov.EID_GetXoffset:
					return (this.xoffset);
				case CRunAdvPathMov.EID_GetYoffset:
					return (this.yoffset);
				case CRunAdvPathMov.EID_GetAngle:
					return (this.angle);
				case CRunAdvPathMov.EID_GetDirection:
					return this.GetDirection();
				case CRunAdvPathMov.EID_Getconnection:
					return this.Getconnection(this.ho.getExpParam(), this.ho.getExpParam());
				case CRunAdvPathMov.EID_GetNumberconnections:
					return this.GetNumberconnections(this.ho.getExpParam());
				case CRunAdvPathMov.EID_GetNodesSpeed:
					return this.GetNodesSpeed(this.ho.getExpParam(), this.ho.getExpParam());
				case CRunAdvPathMov.EID_AutochangeX:
					return (this.ChangeX ? 1 : 0);
				case CRunAdvPathMov.EID_AutochangeY:
					return (this.ChangeY ? 1 : 0);
				case CRunAdvPathMov.EID_AutochangeDirection:
					return (this.ChangeDirection ? 1 : 0);
			}
			return (0);//won't be used
		},

		Findnode: function (p1, p2, p3)
		{
			var Answer = p3 * p3;
			var result = 0;
			var deltaX = 0;
			var deltaY = 0;
			var loopcount = 0;

			var i;
			for (i = 0;
			     i < this.mypointer.myvector.size();
			     i++)
			{
				this.mypointer.theIterator = (this.mypointer.myvector.get(i));
				loopcount++;
				deltaX = Math.abs(this.mypointer.theIterator.X - p1);
				deltaY = Math.abs(this.mypointer.theIterator.Y - p2);

				if (Answer > (deltaX * deltaX + deltaY * deltaY ))
				{
					Answer = (deltaX * deltaX + deltaY * deltaY );
					result = loopcount;
				}
			}
			return (result);
		},

		GetJourneynode:       function (p1)
		{
			if (p1 < 0)
			{
				return (0);
			}
			if (this.mypointer.myjourney.size() == 0)
			{
				return (0);
			}
			if (p1 >= this.mypointer.myjourney.size())
			{
				return (0);
			}
			this.mypointer.JourneyIterator = (this.mypointer.myjourney.get(p1));
			return (this.mypointer.JourneyIterator.Node + 1);
		},
		NodeDistance:         function (p1, p2)
		{
			p1--;
			p2--;
			if ((p1 >= 0) && (p1 < this.mypointer.myvector.size()) &&
				(p2 >= 0) && (p2 < this.mypointer.myvector.size()))
			{
				//Get second vector
				this.mypointer.theIterator = (this.mypointer.myvector.get(p2));
				var v2x = this.mypointer.theIterator.X;
				var v2y = this.mypointer.theIterator.Y;

				//Get first vector
				this.mypointer.theIterator = (this.mypointer.myvector.get(p1));
				var v1x = this.mypointer.theIterator.X;
				var v1y = this.mypointer.theIterator.Y;
				var deltax = v2x - v1x;
				var deltay = v2y - v1y;
				var distance = Math.sqrt(deltax * deltax + deltay * deltay);
				return distance;
			}
			return (0);
		},
		NodeX:                function (p1)
		{
			if (p1 < 1)
			{
				return (0);
			}
			if (this.mypointer.myvector.size() == 0)
			{
				return (0);
			}
			if (p1 > this.mypointer.myvector.size())
			{
				return (0);
			}
			this.mypointer.theIterator = (this.mypointer.myvector.get(p1 - 1));
			return (this.mypointer.theIterator.X);
		},
		NodeY:                function (p1)
		{
			if (p1 < 1)
			{
				return (0);
			}
			if (this.mypointer.myvector.size() == 0)
			{
				return (0);
			}
			if (p1 > this.mypointer.myvector.size())
			{
				return (0);
			}
			this.mypointer.theIterator = (this.mypointer.myvector.get(p1 - 1));
			return (this.mypointer.theIterator.Y);
		},
		GetDirection:         function ()
		{
			var direction = (this.angle * 32 + 180) / 360;
			direction = 8 - direction;
			if (direction < 0)
			{
				direction += 32;
			}
			return (direction);
		},
		Getconnection:        function (p1, p2)
		{
			p1--;
			if (p1 < 0)
			{
				return (0);
			}
			if (p1 >= this.mypointer.myvector.size())
			{
				return (0);
			}

			this.mypointer.theIterator = (this.mypointer.myvector.get(p1));
			if (p2 < 0)
			{
				return (0);
			}
			if (this.mypointer.theIterator.Connections.size() <= p2)
			{
				return (0);
			}
			this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(p2));
			return (this.mypointer.theIterator.ConnectIterator.PointID + 1);
		},
		GetNumberconnections: function (p1)
		{
			p1--;
			if (p1 < 0)
			{
				return (0);
			}
			if (p1 >= this.mypointer.myvector.size())
			{
				return (0);
			}
			this.mypointer.theIterator = (this.mypointer.myvector.get(p1));
			return (this.mypointer.theIterator.Connections.size());
		},
		GetNodesSpeed:        function (p1, p2)
		{
			p1--;
			p2--;
			var speed = 0;
			var cont = true;
			var ret = (0);
			ret.forceDouble(0.0);

			//param1 contains the number inputed by the user
			//param2 contains the number inputed by the user
			if ((p1 >= 0) && (p1 < this.mypointer.myvector.size()) &&
				(p2 >= 0) && (p2 < this.mypointer.myvector.size()))
			{
				this.mypointer.theIterator = (this.mypointer.myvector.get(p1));
				var i;
				for (i = 0;
				     i < this.mypointer.theIterator.Connections.size();
				     i++)
				{
					this.mypointer.theIterator.ConnectIterator = (this.mypointer.theIterator.Connections.get(i));
					if (this.mypointer.theIterator.ConnectIterator.PointID == p2)
					{
						speed = this.mypointer.theIterator.ConnectIterator.Distance;
						cont = false;
					}
				}

				if (cont)
				{
					return ret;
				}
				//Get second vector
				this.mypointer.theIterator = (this.mypointer.myvector.get(p2));
				var v2x = this.mypointer.theIterator.X;
				var v2y = this.mypointer.theIterator.Y;

				//Get first vector
				this.mypointer.theIterator = (this.mypointer.myvector.get(p1));
				var v1x = this.mypointer.theIterator.X;
				var v1y = this.mypointer.theIterator.Y;
				var deltax = v2x - v1x;
				var deltay = v2y - v1y;
				var distance = Math.sqrt(deltax * deltax + deltay * deltay);
				if (distance == 0)
				{
					ret.forceDouble(1.0);
					return ret;
				}
				ret.forceDouble(distance / speed);
				return ret;
			}
			return ret;
		}
	});

function CRunAdvPathMovConnect(PID, Dist)
{
	this.PointID = PID;
	this.Distance = Dist;
}

function CRunAdvPathMovJourney(n)
{
	this.Node = n;
}

function CRunAdvPathMovmyclass()
{
	this.myvector = new CArrayList();
	this.theIterator = null;
	this.myjourney = new CArrayList();
	this.JourneyIterator = null;
}

function CRunAdvPathMovPoints(XX, YY)
{
	this.X = XX;
	this.Y = YY;
	this.Connections = new CArrayList();
	this.ConnectIterator = null;
}

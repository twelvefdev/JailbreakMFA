//----------------------------------------------------------------------------------
//
// CRunMoveIt
//
//----------------------------------------------------------------------------------
CRunMoveIt.CND_ONOBJECTFINNISHED = 0;
CRunMoveIt.CND_LAST = 1;

CRunMoveIt.ACTMOVEOBJSPEED = 0;
CRunMoveIt.ACTMOVEOBJTIME = 1;
CRunMoveIt.ACTSTOPMOVEMENTUSINGFIXED = 2;
CRunMoveIt.ACTSTOPMOVEMENTUSINGINDEXVALUE = 3;
CRunMoveIt.ACTSTOPMOVEMENTUSINGSELECTOR = 4;
CRunMoveIt.ACTADDOBJECTS = 5;
CRunMoveIt.ACTCLEARQUEUE = 6;
CRunMoveIt.ACTSTOPALL = 7;
CRunMoveIt.ACTFORCEMOVE = 8;

CRunMoveIt.EXPGETNUMMOVING = 0;
CRunMoveIt.EXPGETFIXEDVALUE = 1;
CRunMoveIt.EXPGETTOTALDISTANCE = 2;
CRunMoveIt.EXPGETREMAINING = 3;
CRunMoveIt.EXPGETANGLE = 4;
CRunMoveIt.EXPGETDIRECTION = 5;
CRunMoveIt.EXPGETINDEXFIXEDVALUE = 6;
CRunMoveIt.EXPGETINDEXTOTALDISTANCE = 7;
CRunMoveIt.EXPGETINDEXREMAINING = 8;
CRunMoveIt.EXPGETINDEXANGLE = 9;
CRunMoveIt.EXPGETINDEXDIR = 10;
CRunMoveIt.EXPGETONSTOPPEDFIXED = 11;

function CRunMoveIt() {
    this.head;		// CRunMoveItItem
    this.tail;		// CRunMoveItItem
    this.movingCount;
    this.queue;
    this.triggeredObject;	// CObject
}
CRunMoveIt.prototype = CServices.extend(new CRunExtension(),
	{
	    getNumberOfConditions: function () {
	        return CRunMoveIt.CND_LAST;
	    },

	    createRunObject: function (file, cob, version) {
	        this.head = null;		// CRunMoveItItem
	        this.tail = null;		// CRunMoveItItem
	        this.movingCount = 0;
	        this.queue = new Array();
	        this.triggeredObject = null;	// CObject
	        return false;
	    },

	    destroyRunObject: function (bFast) {
	        this.head = null;
	        this.tail = null;
	        this.queue = null;
	    },

	    handleRunObject: function () {
	        if (this.movingCount > 0)
	            this.DoMoveStep();
	        return 0;
	    },

	    DoMoveStep: function () {
	        var it;		// CRunMoveItItem
	        for (it = this.head; it != null; it = it.next) {
	            if ((it.object.hoFlags & CObject.HOF_DESTROYED) != 0) {
	                this.DeleteItem(it);
	                continue;
	            }

	            it.step++;
	            it.object.hoX = ((it.destX - it.sourceX) * it.step) / it.cycles + it.sourceX;
	            it.object.hoY = ((it.destY - it.sourceY) * it.step) / it.cycles + it.sourceY;
	            it.object.roc.rcChanged = true;

	            if (it.step >= it.cycles) {
	                this.triggeredObject = it.object;
	                this.DeleteItem(it);
	                this.ho.generateEvent(CRunMoveIt.CND_ONOBJECTFINNISHED, 0);
	            }
	        }
	    },

	    MoveObject: function (object, destX, destY, cycles) {
	        //First check if the object added allready exist in MoveIt
	        var foundObject = false;
	        var it;	// CRunMoveItItem

	        for (it = this.head; it != null; it = it.next) {
	            if (object == it.object) {
	                //If the object allready exists, then update the data
	                foundObject = true;
	                it.sourceX = object.hoX;
	                it.sourceY = object.hoY;
	                it.destX = destX;
	                it.destY = destY;
	                it.step = 0;
	                it.cycles = Math.max(cycles, 1);
	            }
	        }

	        //If the object wasn't in the MoveIt object, then add it.
	        if (!foundObject) {
	            var item = new CRunMoveItItem(
	                    object,
	                    object.hoX,
	                    object.hoY,
	                    destX,
	                    destY,
	                    Math.max(cycles, 1)
	            );
	            this.AddItem(item);
	        }
	    },

	    DeleteItem: function (it) {
	        //Deleting this object and fixing pointers
	        if (it.prev != null)
	            it.prev.next = it.next;
	        else
	            this.head = it.next;

	        if (it.next != null)
	            it.next.prev = it.prev;
	        else
	            this.tail = it.prev;

	        this.movingCount--;
	    },

	    AddItem: function (it) {
	        if (this.tail == null) {
	            this.head = this.tail = it;
	            it.prev = it.next = null;
	        }
	        else {
	            this.tail.next = it;
	            it.prev = this.tail;
	            it.next = null;
	            this.tail = it;
	        }

	        this.movingCount++;
	    },

	    GetFixedValue: function (obj) {
	        return (obj.hoCreationId << 16) + (obj.hoNumber & 0xFFFF);
	    },

	    // Conditions
	    // -------------------------------------------------
	    condition: function (num, cnd) {
	        switch (num) {
	            case CRunMoveIt.CND_ONOBJECTFINNISHED:
	                return true;
	        }
	        return false;
	    },

	    // Actions
	    // -------------------------------------------------
	    action: function (num, act) {
	        switch (num) {
	            case CRunMoveIt.ACTMOVEOBJSPEED:
	                this.actMoveObjSpeed(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
	                break;
	            case CRunMoveIt.ACTMOVEOBJTIME:
	                this.actMoveObjTime(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
	                break;
	            case CRunMoveIt.ACTSTOPMOVEMENTUSINGFIXED:
	                this.actStopMovementUsingFixed(act.getParamExpression(this.rh, 0));
	                break;
	            case CRunMoveIt.ACTSTOPMOVEMENTUSINGINDEXVALUE:
	                this.actStopMovementUsingIndexValue(act.getParamExpression(this.rh, 0));
	                break;
	            case CRunMoveIt.ACTSTOPMOVEMENTUSINGSELECTOR:
	                this.actStopMovementUsingSelector(act.getParamObject(this.rh, 0));
	                break;
	            case CRunMoveIt.ACTADDOBJECTS:
	                this.actAddObjects(act.getParamObject(this.rh, 0));
	                break;
	            case CRunMoveIt.ACTCLEARQUEUE:
	                this.actClearQueue();
	                break;
	            case CRunMoveIt.ACTSTOPALL:
	                this.actStopAll();
	                break;
	            case CRunMoveIt.ACTFORCEMOVE:
	                this.actForceMove();
	                break;
	        }
	    },

	    // Expressions
	    // -------------------------------------------------
	    expression: function (num) {
	        switch (num) {
	            case CRunMoveIt.EXPGETNUMMOVING:
	                return this.expGetNumMoving();
	            case CRunMoveIt.EXPGETFIXEDVALUE:
	                return this.expGetFixedValue(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETTOTALDISTANCE:
	                return this.expGetTotalDistance(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETREMAINING:
	                return this.expGetRemaining(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETANGLE:
	                return this.expGetAngle(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETDIRECTION:
	                return this.expGetDirection(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETINDEXFIXEDVALUE:
	                return this.expGetIndexFixedValue(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETINDEXTOTALDISTANCE:
	                return this.expGetIndexTotalDistance(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETINDEXREMAINING:
	                return this.expGetIndexRemaining(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETINDEXANGLE:
	                return this.expGetIndexAngle(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETINDEXDIR:
	                return this.expGetIndexDir(this.ho.getExpParam());
	            case CRunMoveIt.EXPGETONSTOPPEDFIXED:
	                return this.expGetOnStoppedFixed();
	        }
	        return 0;
	    },

	    ///////////
	    //ACTIONS//
	    ///////////

	    actAddObjects: function (object) {
	        this.queue.push(object);
	    },

	    actClearQueue: function () {
	        this.queue = new Array();
	    },

	    actMoveObjSpeed: function (destX, destY, intspeed) {
	        var speed = intspeed / 10.0;
	        if (intspeed <= 0)
	            return;

	        var i;
	        for (i = 0; i < this.queue.length; i++) {
	            var object = this.queue[i];
	            var distance = Math.sqrt(
	                                  Math.pow(object.hoX - destX, 2.0)
	                                + Math.pow(object.hoY - destY, 2.0)
	                              );
	            var cycles = Math.round(distance / speed);
	            this.MoveObject(object, destX, destY, cycles);
	        }
	        this.actClearQueue();
	    },

	    actMoveObjTime: function (destX, destY, time) {
	        var i;
	        for (i = 0; i < this.queue.length; i++) {
	            var object = this.queue[i];
	            this.MoveObject(object, destX, destY, time);
	        }
	        this.actClearQueue();
	    },

	    actStopMovementUsingFixed: function (fixedvalue) {
	        var it;
	        for (it = this.head; it != null; it = it.next) {
	            if (this.GetFixedValue(it.object) == fixedvalue) {
	                this.DeleteItem(it);
	                return;
	            }
	        }
	    },

	    actStopMovementUsingIndexValue: function (index) {
	        var i = 0;
	        var it;
	        for (it = this.head; it != null; it = it.next) {
	            if (i == index) {
	                this.DeleteItem(it);
	                return;
	            }
	            i++;
	        }
	    },

	    actStopMovementUsingSelector: function (object) {
	        this.actStopMovementUsingFixed(this.GetFixedValue(object));
	    },

	    actStopAll: function () {
	        this.head = this.tail = null;
	    },

	    actForceMove: function () {
	        this.DoMoveStep();
	    },

	    ///////////////
	    //EXPRESSIONS//
	    ///////////////

	    GetItemFromFixed: function (fixed) {
	        var it;
	        for (it = this.head; it != null; it = it.next) {
	            if (this.GetFixedValue(it.object) == fixed)
	                return it;
	        }
	        return null;
	    },

	    GetItemFromIndex: function (index) {
	        var i = 0;
	        var it;
	        for (it = this.head; it != null; it = it.next) {
	            if (i == index)
	                return it;
	            i++;
	        }
	        return null;
	    },

	    expGetNumMoving: function () {
	        return this.movingCount;
	    },

	    expGetFixedValue: function (fixedvalue) {
	        //From fixed get index
	        var i = 0;
	        var it;
	        for (it = this.head; it != null; it = it.next) {
	            if (this.GetFixedValue(it.object) == fixedvalue)
	                return i;
	            i++;
	        }
	        return -1;
	    },

	    expGetTotalDistance: function (fixedvalue) {
	        var item = this.GetItemFromFixed(fixedvalue);
	        if (item != null)
	            return Math.sqrt(Math.pow(item.sourceX - item.destX, 2.0) + Math.pow(item.sourceY - item.destY, 2.0));
	        else
	            return -1;
	    },

	    expGetRemaining: function (fixedvalue) {
	        var item = this.GetItemFromFixed(fixedvalue);
	        if (item != null)
	            return Math.sqrt(Math.pow(item.object.hoX - item.destX, 2.0) + Math.pow(item.object.hoY - item.destY, 2.0));
	        else
	            return -1;
	    },

	    expGetAngle: function (fixedvalue) {
	        var item = this.GetItemFromFixed(fixedvalue);
	        if (item != null)
	            return Math.atan2(item.destX - item.sourceX, item.destY - item.sourceY) * 180.0 / Math.PI + 270;
	        else
	            return -1;
	    },

	    expGetDirection: function (fixedvalue) {
	        var item = this.GetItemFromFixed(fixedvalue);
	        if (item != null)
	            return Math.atan2(item.destX - item.sourceX, item.destY - item.sourceY) * 16.0 / Math.PI + 24;
	        else
	            return -1;
	    },

	    expGetIndexFixedValue: function (index) {
	        var i = 0;
	        var it;
	        for (it = this.head; it != null; it = it.next) {
	            if (i == index)
	                return this.GetFixedValue(it.object);
	            i++;
	        }
	        return -1;
	    },

	    expGetIndexTotalDistance: function (index) {
	        var item = this.GetItemFromIndex(index);
	        if (item != null)
	            return Math.sqrt(Math.pow(item.sourceX - item.destX, 2.0) + Math.pow(item.sourceY - item.destY, 2.0));
	        else
	            return -1;
	    },

	    expGetIndexRemaining: function (index) {
	        var item = this.GetItemFromIndex(index);
	        if (item != null)
	            return Math.sqrt(Math.pow(item.object.hoX - item.destX, 2.0) + Math.pow(item.object.hoY - item.destY, 2.0));
	        else
	            return -1;
	    },

	    expGetIndexAngle: function (index) {
	        var item = this.GetItemFromIndex(index);
	        if (item != null)
	            return Math.atan2(item.destX - item.sourceX, item.destY - item.sourceY) * 180.0 / Math.PI + 270;
	        else
	            return -1;
	    },

	    expGetIndexDir: function (index) {
	        var item = this.GetItemFromIndex(index);
	        if (item != null)
	            return Math.atan2(item.destX - item.sourceX, item.destY - item.sourceY) * 16.0 / Math.PI + 24;
	        else
	            return -1;
	    },

	    expGetOnStoppedFixed: function () {
	        if (this.triggeredObject != null)
	            return this.GetFixedValue(this.triggeredObject);
	        else
	            return -1;
	    }
	});

function CRunMoveItItem(object, sourceX, sourceY, destX, destY, cycles) {
    this.object = object;
    this.sourceX = sourceX;
    this.sourceY = sourceY;
    this.destX = destX;
    this.destY = destY;
    this.cycles = cycles;

    this.step = 0;
    this.next = null;
    this.prev = null;
}

/**
 * Created by Benjamin on 8/17/2014.
 */

CProfilerAPI.NUMBEROF_SYSTEMTYPES = 7;
CProfilerAPI.NUMBEROF_NORMALTYPES = 10;
CProfilerAPI.COMMON_TYPE = CProfilerAPI.NUMBEROF_SYSTEMTYPES + 10;
CProfilerAPI.EXTENSIONS_TYPE = CProfilerAPI.NUMBEROF_SYSTEMTYPES + 11;
CProfilerAPI.FUNCTIONS_TYPE = CProfilerAPI.NUMBEROF_SYSTEMTYPES + 12;
CProfilerAPI.NUMBEROF_TYPES = CProfilerAPI.FUNCTIONS_TYPE + 1;
CProfilerAPI.EXTBASE = 80;
CProfilerAPI.MAXARRAYS_CONDITIONS = 30;
CProfilerAPI.MAXARRAYS_ACTIONS = 40;
CProfilerAPI.MAXARRAYS_EXPRESSIONS = 70;
CProfilerAPI.MAXARRAYS_COMMON = 81;
CProfilerAPI.MAX_VBLPOSITIONS = 50;

//Default Settings values

CProfilerAPI.DEF_AUTO_CONNECT = true;
CProfilerAPI.DEF_AUTO_RETRY = true;
CProfilerAPI.DEF_MAX_ATTEMPTS = 5;

CProfilerAPI.DEF_SERVER_NAME = 'localhost';
CProfilerAPI.DEF_SERVER_PATH = '';
CProfilerAPI.DEF_SERVER_PORT = 9080;

CProfilerAPI.DEF_MAX_FPS = 10;

CProfilerAPI.DEF_RETRY_DELAY = 500;


//CProfilerAPI Private Types

CProfilerAPI.Object = function CProfilerAPI_Object(objectNum) {
    this.objectNum = objectNum;

    this.actions = [];
    this.conditions = [];
    this.expressions = [];

    this.now = 0;

    this.totalSteps = 0;
    this.highestTime = 0;

    this.totalTime = 0;
};

CProfilerAPI.Object.prototype = {
    startStep: function () {
        this.now = performance.now();
        this.actions.forEach(this.startStepLoop);
        this.conditions.forEach(this.startStepLoop);
        this.expressions.forEach(this.startStepLoop);
    },
    endStep: function () {
        this.now = performance.now();
        this.actions.forEach(this.endStepLoop);
        this.conditions.forEach(this.endStepLoop);
        this.expressions.forEach(this.endStepLoop);
    },
    startStepLoop: function (method) {
        method.startStep(this.now);
    },
    endStepLoop: function (method) {
        method.endStep(this.now);
    },
    getMethod: function (type, num) {
        var anum = Math.abs(num);
        if (!this[type][anum]) {
            this[type][anum] = new CProfilerAPI.Method(type, num, this.objectNum);
        }
        return this[type][anum];
    },
    startSession: function () {
        this.now = performance.now();
        this.actions.forEach(this.startSessionLoop.bind(this));
        this.conditions.forEach(this.startSessionLoop.bind(this));
        this.expressions.forEach(this.startSessionLoop.bind(this));
        this.totalTime = this.highestTime = this.totalSteps = 0;
    },
    endSession: function () {
        this.now = performance.now();
        this.actions.forEach(this.endSessionLoop.bind(this));
        this.conditions.forEach(this.endSessionLoop.bind(this));
        this.expressions.forEach(this.endSessionLoop.bind(this));
    },
    startSessionLoop: function (e) {
        e.startSession(this.now);
    },
    endSessionLoop: function (e) {
        e.endSession(this.now);
        if (e.avgLoopTime > this.highestTime) {
            this.highestTime = e.avgLoopTime;
        }
    }
};

CProfilerAPI.Method = function CProfilerAPI_Method(type, functionNum, objectNum) {
    this.type = type;
    this.functionNum = functionNum;
    this.objectNum = objectNum;

    this.startTime = 0;
    this.endTime = 0;

    this.highestTime = 0;
    this.avgLoopTime = 0;
    this.callsPerLoop = 1;

    this.totalSteps = 0;
    this.totalCallTime = 0;
    this.totalCallCount = 0;

    this.startedCalls = 0;
    this.endedCalls = 0;

    this.startCall();
};

CProfilerAPI.Method.prototype = {
    startStep: function () {
        this.totalSteps++;
    },
    endStep: function () {

    },
    startCall: function (startTime) {
        this.startedCalls++;
        this.totalCallCount++;
        this.startTime = startTime || performance.now();
    },
    endCall: function (endTime) {
        this.endedCalls++;
        this.endTime = endTime || performance.now();
        this.totalCallTime += this.endTime - this.startTime;
        if ((this.endTime - this.startTime) > this.highestTime) {
            this.highestTime = (this.endTime - this.startTime);
        }
    },
    startSession: function () {
        this.totalSteps = this.totalCallTime = this.totalCallCount = 0;
        this.avgLoopTime = this.callsPerLoop = 0;
        this.startTime = this.endTime = this.highestTime = 0;
    },
    endSession: function () {
        this.avgLoopTime = this.totalCallTime / this.totalSteps;
        this.callsPerLoop = this.totalCallCount / this.totalSteps;
    }
};

CProfilerAPI.Function = function CProfilerAPI_Function(name) {
    this.functionName = name;

    this.startTime = performance.now();
    this.endTime = 0;

    this.highestTime = 0;

    this.avgCallTime = 0;
    this.callsPerLoop = 0;

    this.totalSteps = 0;
    this.totalCallTime = 0;
    this.totalCallCount = 0;

    this.startedCalls = 0;
    this.endedCalls = 0;

    this.startCall();
};

CProfilerAPI.Function.prototype = {
    startStep: function () {
        this.totalSteps++;
    },
    endStep: function () {

    },
    startCall: function (startTime) {
        this.startedCalls++;
        this.startTime = startTime || performance.now();
        this.totalCallCount++;
    },
    stopCall: function (endTime) {
        this.endedCalls++;
        this.endTime = endTime || performance.now();
        this.totalCallTime += this.endTime - this.startTime;
        if ((this.endTime - this.startTime) > this.highestTime) {
            this.highestTime = this.endTime - this.startTime;
        }
    },
    startSession: function () {
        this.totalSteps = this.totalCallTime = this.totalCallCount = 0;
        this.avgCallTime = this.callsPerLoop = 0;
        this.startTime = this.endTime = this.highestTime = 0;
    },
    endSession: function () {
        this.avgCallTime = this.totalCallTime / this.totalSteps;
        this.callsPerLoop = this.totalCallCount / this.totalSteps;
    }
};

//CProfilerAPI Public Methods

CProfilerAPI.makeObj = function CProfilerAPI_makeObj(str) {
    var ret = false;
    try {
        ret = JSON.parse(str);
    } catch (e) {
    }
    return ret;
};

CProfilerAPI.convertCode = function CProfilerAPI_convertCode(code) {
    var oType = (code & 0xFFFF) >= 32768 ? (code & 0xFFFF) - 65536 : (code & 0xFFFF);
    var obj = (CProfilerAPI.NUMBEROF_SYSTEMTYPES + oType), num = (-(code >> 16)) - 1;

    if (oType >= 32) {
        obj = CProfilerAPI.EXTENSIONS_TYPE;
    } else if (oType < 2) {
        obj = (CProfilerAPI.NUMBEROF_SYSTEMTYPES + oType);
    } else if (num < CProfilerAPI.EXTBASE) {
        obj = CProfilerAPI.COMMON_TYPE;
    } else {
        num -= CProfilerAPI.EXTBASE;
    }

    return [obj, num];
};

CProfilerAPI.getFPS = function CProfilerAPI_getFPS(app) {
    var fps = 0;
    app.run.rh4FrameRateArray.forEach(function (e, i) {
        if (i < CRun.MAX_FRAMERATE) {
            fps += e;
        }
    });
    return Math.round((1000 * CRun.MAX_FRAMERATE) / fps);
};

function CProfilerAPI(app, serverName, serverPath, port, maxFPS, autoRetry, retryDelay) {
    this.app = app;
    this.appName = false;

    this.recording = false;

    this.sendNextLoop = false;

    this.con = null;

    this.conFailCount = 0;
    this.retrying = false;

    this.serverName = serverName || CProfilerAPI.DEF_SERVER_NAME;
    this.serverPath = serverPath || CProfilerAPI.DEF_SERVER_PATH;
    this.serverPort = port || CProfilerAPI.DEF_SERVER_PORT;

    this.maxFPS = maxFPS || CProfilerAPI.DEF_MAX_FPS;

    this.autoRetry = autoRetry || CProfilerAPI.DEF_AUTO_RETRY;

    this.retryDelay = retryDelay || CProfilerAPI.DEF_RETRY_DELAY;
    this.retryTimer = null;

    this.fpsArray = [];

    this.objects = [];
    this.functions = {};

    //Timing and Step counters

    this.tStartTime = 0;
    this.tStopTime = 0;
    this.totalTime = 0;

    this.highestTime = 0;

    this.totalSteps = 0;

    this.dStartTime = 0;
    this.dStopTime = 0;
    this.deltaTime = 0;

    this.deltaSteps = 0;

    this.totalLoopTime = 0;
    this.avgLoopTime = 0;

    //API Hooks
    this.startAction = this.regMethod.bind(this, true, 'actions');
    this.endAction = this.regMethod.bind(this, false, 'actions');
    this.startCondition = this.regMethod.bind(this, true, 'conditions');
    this.endCondition = this.regMethod.bind(this, false, 'conditions');
    this.startExpression = this.regMethod.bind(this, true, 'expressions');
    this.endExpression = this.regMethod.bind(this, false, 'expressions');

    //Memory Saving Objects
    this.sendFPSObj = {
        type: "fps",
        data: []
    };
    this.sendDataObj = {
        type: "data",
        session: {},
        data: {}
    };
    this.sendAppNameObj = {
        type: 'appName'
    };

    if (CProfilerAPI.DEF_AUTO_CONNECT) {
        this.startCon();
    }
}

CProfilerAPI.prototype.reset = function CProfilerAPI_reset(full) {
    this.recStat(false);

    this.objects = [];
    this.functions = {};

    this.tStartTime = this.tStopTime = this.totalTime = 0;
    this.dStartTime = this.dStopTime = this.deltaTime = 0;
    this.totalSteps = this.deltaSteps = 0;
    this.totalLoopTime = this.avgLoopTime = 0;
    this.sendFPSObj.data = [];
    this.sendDataObj.data = {};

    if (full) {
        if (this.con && this.con.readyState === 1) {
            this.con.close();
        }
        this.con = null;
    }
};

CProfilerAPI.prototype.getSession = function CProfilerAPI_getSession() {
    return {
        totalTime: this.totalTime,
        totalSteps: this.totalSteps,
        deltaTime: this.deltaTime,
        deltaSteps: this.deltaSteps,
        avgLoopTime: this.avgLoopTime,
        highestTime: this.highestTime
    };
};

CProfilerAPI.prototype.getData = function CProfilerAPI_getData() {
    return {
        objects: this.objects,
        functions: this.functions
    };
};

CProfilerAPI.prototype.recStat = function CProfilerAPI_recStat(rec) {
    this.recording = rec || false;
};

CProfilerAPI.prototype.makeCon = function CProfilerAPI_makeCon() {
    if (this.con && this.con.readyState === 1) {
        return this.con;
    }
    else {
        return new WebSocket('ws://' + this.serverName + ':' + this.serverPort + '/' + this.serverPath);
    }
};

CProfilerAPI.prototype.getObject = function CProfilerAPI_getObject(objNum) {
    if (!this.objects[objNum]) {
        this.objects[objNum] = new CProfilerAPI.Object(objNum);
    }
    return this.objects[objNum];
};

CProfilerAPI.prototype.startCon = function CProfilerAPI_startCon() {
    if (this.con && this.con.readyState === 1) {
        this.con.close();
    }

    this.con = this.makeCon();

    this.con.onerror = this.conError.bind(this);
    this.con.onopen = this.conOpen.bind(this);
    this.con.onclose = this.conClose.bind(this);
    this.con.onmessage = this.conMessage.bind(this);
};

CProfilerAPI.prototype.stopCon = function CProfilerAPI_stopCon() {
    this.recStat(false);
    if (this.con && this.con.readyState === 1) {
        this.con.close();
    }
    this.con = null;
};

CProfilerAPI.prototype.conError = function CProfilerAPI_conError(e) {
    if (this.autoRetry && !this.retrying) {
        this.tryCon();
    }
};

CProfilerAPI.prototype.conOpen = function CProfilerAPI_conOpen(e) {
    this.conFailCount = 0;
    this.retrying = false;
    this.sendAppName();
};

CProfilerAPI.prototype.conClose = function CProfilerAPI_conClose(e) {
    //if (this.autoRetry && !this.retrying) this.tryCon();
};

CProfilerAPI.prototype.tryCon = function CProfilerAPI_tryCon() {
    if (this.conFailCount < CProfilerAPI.DEF_MAX_ATTEMPTS && this.con && this.con.readyState !== 1) {
        this.retrying = true;
        this.conFailCount++;
        this.startCon();
    }
};

CProfilerAPI.prototype.conMessage = function CProfilerAPI_conMessage(e) {
    var mes = CProfilerAPI.makeObj(e.data);
    if (mes) {
        switch (mes.type) {
            case 'start':
                this.recStat(true);
                break;

            case 'stop':
                this.recStat(false);
                break;

            case 'pause':
                break;

            case 'unpause':
                break;

            case 'request':
                this.sendNextLoop = true;
                break;

            case 'end':
                this.stopCon();
                break;

            case 'refresh':
                location.reload();
                break;
        }
    }
};

CProfilerAPI.prototype.sendFPS = function CProfilerAPI_sendFPS() {
    if (this.con && this.con.readyState === 1) {
        this.sendFPSObj.data = this.fpsArray;
        this.con.send(JSON.stringify(this.sendFPSObj));
        this.fpsArray = [];
    }
};

CProfilerAPI.prototype.sendAppName = function CProfilerAPI_sendAppName() {
    if (!this.appName) {
        this.appName = this.app.appName;
        this.sendAppNameObj.appName = this.appName;
    }
    if (this.con && this.con.readyState === 1) {
        this.con.send(JSON.stringify(this.sendAppNameObj));
    }
};

CProfilerAPI.prototype.sendData = function CProfilerAPI_sendData() {
    if (this.con && this.con.readyState === 1) {
        this.objects.forEach(function (e) {
            e.endSession();
        });

        for (var prop in this.functions) {
            if (this.functions.hasOwnProperty(prop)) {
                this.functions[prop].endSession();
            }
        }

        this.sEndTime = performance.now();
        this.totalTime = this.sEndTime - this.sStartTime;

        this.sendDataObj.data = this.getData();
        this.sendDataObj.session = this.getSession();

        this.con.send(JSON.stringify(this.sendDataObj));

        this.sendNextLoop = false;

        this.objects.forEach(function (e) {
            e.startSession();
        });

        for (var prop in this.functions) {
            if (this.functions.hasOwnProperty(prop)) {
                this.functions[prop].startSession();
            }
        }

        this.totalSteps = 0;
        this.highestTime = 0;

        this.sStartTime = performance.now();
    }
};

CProfilerAPI.prototype.handle = function CProfilerAPI_handle(now) {
    if (now || (this.fpsArray.length >= this.maxFPS)) {
        this.sendFPS();
        this.sendAppName();
    }
    if (this.sendNextLoop) {
        this.sendData();
    }
};

CProfilerAPI.prototype.startStep = function CProfilerAPI_startStep() {
    if (this.recording) {
        this.dStartTime = performance.now();
        this.deltaTime = this.dEndTime = 0;

        this.objects.forEach(this.forStepStart);
        for (var prop in this.functions) {
            if (this.functions.hasOwnProperty(prop)) {
                this.functions[prop].startStep();
            }
        }
    }
};

CProfilerAPI.prototype.endStep = function CProfilerAPI_endStep() {
    if (this.recording) {
        this.dEndTime = performance.now();
        this.deltaTime = this.dEndTime - this.dStartTime;

        this.totalLoopTime += this.deltaTime;

        if (this.deltaTime > this.highestTime) {
            this.highestTime = this.deltaTime;
        }

        this.avgLoopTime = this.totalLoopTime / this.totalSteps;

        this.fpsArray.push(CProfilerAPI.getFPS(this.app));

        this.objects.forEach(this.forStepEnd);
        for (var prop in this.functions) {
            if (this.functions.hasOwnProperty(prop)) {
                this.functions[prop].endStep();
            }
        }
        this.totalSteps++;
    }
};

CProfilerAPI.prototype.forStepStart = function CProfilerAPI_forStepStart(e, i, a) {
    e.startStep();
};

CProfilerAPI.prototype.forStepEnd = function CProfilerAPI_forStepEnd(e, i, q) {
    e.endStep();
};

CProfilerAPI.prototype.regMethod = function CProfilerAPI_regMethod(stat, type, code) {
    var now = performance.now();
    var ca = CProfilerAPI.convertCode(code);
    var obj = this.getObject(ca[0]);
    var method = obj.getMethod(type, ca[1]);

    if (this.recording && stat) {
        method.startCall(now);
    }
    else {
        method.endCall(now);
    }
};

CProfilerAPI.prototype.startFunction = function CProfilerAPI_startFunction(name) {
    if (!this.functions[name]) {
        this.functions[name] = new CProfilerAPI.Function(name);
    } else {
        this.functions[name].startCall();
    }
};

CProfilerAPI.prototype.endFunction = function CProfilerAPI_endFunction(name) {
    if (this.functions[name]) {
        this.functions[name].stopCall();
    }
};

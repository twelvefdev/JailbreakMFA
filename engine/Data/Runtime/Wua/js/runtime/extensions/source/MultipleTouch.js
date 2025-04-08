//----------------------------------------------------------------------------------
//
// CRUNMULTIPLETOUCH
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2016 Clickteam
 *
 * This source code is part of the HTML5 or Windows10 exporter for Clickteam Multimedia Fusion 2.
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
CRunMultipleTouch.CND_NEWTOUCH = 0;
CRunMultipleTouch.CND_ENDTOUCH = 1;
CRunMultipleTouch.CND_NEWTOUCHANY = 2;
CRunMultipleTouch.CND_ENDTOUCHANY = 3;
CRunMultipleTouch.CND_TOUCHMOVED = 4;
CRunMultipleTouch.CND_TOUCHACTIVE = 5;
CRunMultipleTouch.CND_NEWTOUCHOBJECT = 6;
CRunMultipleTouch.CND_TOUCHACTIVEOBJECT = 7;
CRunMultipleTouch.CND_NEWPITCH = 8;
CRunMultipleTouch.CND_PITCHACTIVE = 9;
CRunMultipleTouch.CND_NEWGESTURE = 10;
CRunMultipleTouch.CND_LAST = 11;
CRunMultipleTouch.ACT_SETORIGINX = 0;
CRunMultipleTouch.ACT_SETORIGINY = 1;
CRunMultipleTouch.ACT_RECOGNIZE = 2;
CRunMultipleTouch.ACT_SETRECOGNITION = 3;
CRunMultipleTouch.ACT_SETZONE = 4;
CRunMultipleTouch.ACT_SETZONECOORD = 5;
CRunMultipleTouch.ACT_LOADINI = 6;
CRunMultipleTouch.ACT_RECOGNIZEG = 7;
CRunMultipleTouch.ACT_CLEARGESTURES = 8;
CRunMultipleTouch.EXP_GETNUMBER = 0;
CRunMultipleTouch.EXP_GETLAST = 1;
CRunMultipleTouch.EXP_MTGETX = 2;
CRunMultipleTouch.EXP_MTGETY = 3;
CRunMultipleTouch.EXP_GETLASTNEWTOUCH = 4;
CRunMultipleTouch.EXP_GETLASTENDTOUCH = 5;
CRunMultipleTouch.EXP_GETORIGINX = 6;
CRunMultipleTouch.EXP_GETORIGINY = 7;
CRunMultipleTouch.EXP_GETDELTAX = 8;
CRunMultipleTouch.EXP_GETDELTAY = 9;
CRunMultipleTouch.EXP_GETTOUCHANGLE = 10;
CRunMultipleTouch.EXP_GETDISTANCE = 11;
CRunMultipleTouch.EXP_PITCHDISTANCE = 12;
CRunMultipleTouch.EXP_PITCHANGLE = 13;
CRunMultipleTouch.EXP_PITCHPERCENTAGE = 14;
CRunMultipleTouch.EXP_RECOGNIZEDNAME = 15;
CRunMultipleTouch.EXP_RECOGNIZEDPERCENT = 16;
CRunMultipleTouch.TOUCHID_EMPTY = 0x69865358;
CRunMultipleTouch.MTFLAG_RECOGNITION = 0x0001;
CRunMultipleTouch.MTFLAG_AUTO = 0x0002;

function CRunMultipleTouch() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.newTouchCount = 0;
    this.endTouchCount = 0;
    this.movedTouchCount = 0;
    this.touchesID = null;
    this.touchesX = null;
    this.touchesY = null;
    this.startX = null;
    this.startY = null;
    this.dragX = null;
    this.dragY = null;
    this.touchesNew = null;
    this.touchesEnd = null;
    this.lastTouch = 0;
    this.lastNewTouch = 0;
    this.lastEndTouch = 0;
    this.maxTouches = 0;
    this.OiUnder = 0;
    this.hoUnder = 0;
    this.newPitchCount = 0;
    this.pitch1 = -1;
    this.pitch2 = -1;
    this.pitchDistance = 0;
    this.flags = 0;
    this.width = 0;
    this.height = 0;
    this.depth = 0;
    this.touchArray = null;
    this.gestureName = "";
    this.gesturePercent = 0;
}

CRunMultipleTouch.prototype = {
    getNumberOfConditions: function () {
        return CRunMultipleTouch.CND_LAST;
    },

    createRunObject: function (file, cob, version) {
        this.width = file.readAShort();
        this.height = file.readAShort();
        this.flags = file.readAInt();
        this.depth = file.readAShort();
        var text = file.readAString();
        if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
            this.createRecognizer();
            this.addGestures(this.getStrings(text));
            this.touchArray = new Array();
        }

        this.maxTouches = CRunApp.MAX_TOUCHES;
        this.touchesID = new Array(this.maxTouches);
        this.touchesX = new Array(this.maxTouches);
        this.touchesY = new Array(this.maxTouches);
        this.startX = new Array(this.maxTouches);
        this.startY = new Array(this.maxTouches);
        this.dragX = new Array(this.maxTouches);
        this.dragY = new Array(this.maxTouches);
        this.touchesNew = new Array(this.maxTouches);
        this.touchesEnd = new Array(this.maxTouches);

        this.newPitchCount = -1;
        this.newTouchCount = -1;
        this.endTouchCount = -1;
        this.movedTouchCount = -1;
        this.lastNewTouch = -1;
        this.lastEndTouch = -1;
        this.lastTouch = -1;

        var n;
        for (n = 0; n < this.maxTouches; n++) {
            this.touchesID[n] = CRunMultipleTouch.TOUCHID_EMPTY;
            this.touchesX[n] = -1;
            this.touchesY[n] = -1;
            this.touchesNew[n] = 0;
            this.touchesEnd[n] = 0;
            this.startX[n] = 0;
            this.startY[n] = 0;
            this.dragX[n] = 0;
            this.dragY[n] = 0;
        }
        this.rh.rhApp.addTouchDelegate(this);

        return true;
    },

    destroyRunObject: function (bFast) {
        this.rh.rhApp.removeTouchDelegate(this);
    },

    handleRunObject: function () {
        /*
            if (this.rh.rhApp.keyBuffer[CRunApp.VK_LBUTTON])
            {
            this.ho.generateEvent(CRunMultipleTouch.CND_TOUCHMOVED, 0);
            }
            */
        var n;
        for (n = 0; n < this.maxTouches; n++) {
            if (this.touchesNew[n] > 0) {
                this.touchesNew[n]--;
            }
            if (this.touchesEnd[n] > 0) {
                this.touchesEnd[n]--;
            }
        }
        return 0;
    },

    onTouchStarted: function (touch) {
        var n;
        for (n = 0; n < this.maxTouches; n++) {
            if (this.touchesID[n] == touch.pointerId) {
                break;
            }
            if (this.touchesID[n] == CRunMultipleTouch.TOUCHID_EMPTY) {
                break;
            }
        }

        if (n < this.maxTouches && this.touchesID[n] == CRunMultipleTouch.TOUCHID_EMPTY) {
            this.counter = 0;
            this.touchesID[n] = touch.pointerId;
            this.touchesX[n] = this.rh.rhApp.getTouchX(touch);
            this.touchesY[n] = this.rh.rhApp.getTouchY(touch);
            this.startX[n] = this.touchesX[n];
            this.startY[n] = this.touchesY[n];
            this.dragX[n] = this.touchesX[n];
            this.dragY[n] = this.touchesY[n];
            this.touchesNew[n] = 2;
            this.lastTouch = n;
            this.lastNewTouch = n;
            this.newTouchCount = this.ho.getEventCount();

            if (this.pitch1 < 0) {
                this.pitch1 = n;
            }
            else if (this.pitch2 < 0) {
                this.pitch2 = n;
                this.ho.generateEvent(CRunMultipleTouch.CND_NEWPITCH, 0);
                this.newPitchCount = this.ho.getEventCount();
                this.pitchDistance = this.expPitchDistance();
            }
            else {
                this.pitch1 = -1;
                this.pitch2 = -1;
            }
            if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
                if (this.touchArray.length >= this.depth) {
                    this.touchArray.splice(0, 1);
                }
                this.touchArray.push(new Array());
                if (this.touchesX[n] >= this.ho.hoX && this.touchesX[n] < this.ho.hoX + this.width && this.touchesY[n] >= this.ho.hoY && this.touchesY[n] < this.ho.hoY + this.height) {
                    this.touchArray[this.touchArray.length - 1].push(this.touchesX[n] - this.ho.hoX);
                    this.touchArray[this.touchArray.length - 1].push(this.touchesY[n] - this.ho.hoY);
                }
            }
            this.ho.generateEvent(CRunMultipleTouch.CND_NEWTOUCH, 0);
            this.ho.generateEvent(CRunMultipleTouch.CND_NEWTOUCHANY, 0);
            this.callObjectConditions(this.touchesX[n], this.touchesY[n]);
        }
        return false;
    },

    onTouchMoved: function (touch) {
        var n;
        for (n = 0; n < this.maxTouches; n++) {
            if (this.touchesID[n] == touch.pointerId) {
                this.counter++;
                if (this.counter == 10) {
                    var toto = 5;
                }

                this.touchesX[n] = this.rh.rhApp.getTouchX(touch);
                this.touchesY[n] = this.rh.rhApp.getTouchY(touch);
                this.dragX[n] = this.touchesX[n]
                this.dragY[n] = this.touchesY[n]
                this.lastTouch = n;
                this.ho.generateEvent(CRunMultipleTouch.CND_TOUCHMOVED, 0);
                if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
                    if (this.touchesX[n] != this.touchXPrevious || this.touchesY[n] != this.touchYPrevious) {
                        this.touchXPrevious = this.touchesX[n];
                        this.touchYPrevious = this.touchesY[n];
                        if (this.touchesX[n] >= this.ho.hoX && this.touchesX[n] < this.ho.hoX + this.width && this.touchesY[n] >= this.ho.hoY && this.touchesY[n] < this.ho.hoY + this.height) {
                            this.touchArray[this.touchArray.length - 1].push(this.touchesX[n] - this.ho.hoX);
                            this.touchArray[this.touchArray.length - 1].push(this.touchesY[n] - this.ho.hoY);
                        }
                    }
                }
            }
        }
        return false;
    },

    onTouchEnded: function (touch) {
        var n;
        for (n = 0; n < this.maxTouches; n++) {
            if (this.touchesID[n] == touch.pointerId) {
                this.touchesX[n] = this.rh.rhApp.getTouchX(touch);
                this.touchesY[n] = this.rh.rhApp.getTouchY(touch);
                this.dragX[n] = this.touchesX[n]
                this.dragY[n] = this.touchesY[n]
                this.touchesID[n] = CRunMultipleTouch.TOUCHID_EMPTY;
                this.touchesEnd[n] = 2;
                this.lastTouch = n;
                this.lastEndTouch = n;
                this.endTouchCount = this.ho.getEventCount();
                if (n == this.pitch1) {
                    this.pitch1 = -1;
                } else if (n == this.pitch2) {
                    this.pitch2 = -1;
                }
                if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
                    if (this.touchesX[n] != this.touchXPrevious || this.touchesY[n] != this.touchYPrevious) {
                        if (this.touchesX[n] >= this.ho.hoX && this.touchesX[n] < this.ho.hoX + this.width && this.touchesY[n] >= this.ho.hoY && this.touchesY[n] < this.ho.hoY + this.height) {
                            this.touchArray[this.touchArray.length - 1].push(this.touchesX[n] - this.ho.hoX);
                            this.touchArray[this.touchArray.length - 1].push(this.touchesY[n] - this.ho.hoY);
                        }
                    }
                }

                this.ho.generateEvent(CRunMultipleTouch.CND_ENDTOUCH, 0);
                this.ho.generateEvent(CRunMultipleTouch.CND_ENDTOUCHANY, 0);
            }
        }
        return false;
    },

    createRecognizer: function () {
        if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
            if (this.recognizer == null) {
                this.recognizer = new PDollarRecognizer();
            }
        }
    },

    addGestures: function (strings) {
        var number, name, end;
        var line = 0;
        var points = new Array();
        while (true) {
            for (; line < strings.length; line++) {
                if (strings[line].indexOf("[") >= 0) {
                    break;
                }
            }
            if (line >= strings.length) {
                break;
            }
            end = strings[line].indexOf("]");
            if (end < 0) {
                continue;
            }
            name = strings[line].substring(1, end);

            var number;
            for (line++, number = 0; line < strings.length; number++, line++) {
                var equal = strings[line].indexOf("=");
                if (equal < 0) {
                    break;
                }

                var string = strings[line].substring(equal + 1);
                points.length = 0;
                var bracket = 0;
                var comma, x, y;
                while (true) {
                    bracket = string.indexOf("(", bracket);
                    if (bracket < 0) {
                        break;
                    }
                    comma = string.indexOf(",", bracket);
                    if (comma < 0) {
                        break;
                    }
                    x = parseInt(string.substring(bracket + 1, comma));
                    bracket = string.indexOf(")", comma);
                    if (bracket < 0) {
                        break;
                    }
                    y = parseInt(string.substring(comma + 1, bracket));
                    if (isNaN(x) || isNaN(y)) {
                        break;
                    }
                    points.push(new Point(x, y, number));
                }
            }
            this.recognizer.AddGesture(name, points);
        }
    },

    recognize: function (depth, name) {
        this.createRecognizer();

        var points = new Array();
        var position;

        for (position = 0; position < depth; position++) {
            if (position >= this.touchArray.length) {
                break;
            }

            var t = this.touchArray[this.touchArray.length - position - 1];
            var n;
            var count = 0;
            for (n = 0; n < t.length; n += 2) {
                points.push(new Point(t[n], t[n + 1], position));
                count++;
            }
        }

        if (points.length >= 2) {
            this.recognizer.Recognize(points, name);
            this.gestureNumber = this.recognizer.gestureNumber;
            this.gesturePercent = this.recognizer.gesturePercent;
            this.gestureName = this.recognizer.gestureName;
            if (this.gestureNumber >= 0) {
                this.ho.generateEvent(CRunMultipleTouch.CND_NEWGESTURE, 0);
            }
        }
        else {
            this.gestureNumber = 0;
            this.gesturePercent = 0;
            this.gestureName = "";
        }
    },

    condition: function (num, cnd) {
        switch (num) {
            case CRunMultipleTouch.CND_NEWTOUCH:
                return this.cndNewTouch(cnd);
            case CRunMultipleTouch.CND_ENDTOUCH:
                return this.cndEndTouch(cnd);
            case CRunMultipleTouch.CND_NEWTOUCHANY:
                return this.cndNewTouchAny(cnd);
            case CRunMultipleTouch.CND_ENDTOUCHANY:
                return this.cndEndTouchAny(cnd);
            case CRunMultipleTouch.CND_TOUCHMOVED:
                return this.cndTouchMoved(cnd);
            case CRunMultipleTouch.CND_TOUCHACTIVE:
                return this.cndTouchActive(cnd);
            case CRunMultipleTouch.CND_NEWTOUCHOBJECT:
                return this.cndNewTouchObject(cnd);
            case CRunMultipleTouch.CND_TOUCHACTIVEOBJECT:
                return this.isActiveRoutine(cnd.getParamExpression(this.rh, 0), cnd.getParamObject(this.rh, 1).oiList);
            case CRunMultipleTouch.CND_NEWPITCH:
                return this.cndNewPitch(cnd);
            case CRunMultipleTouch.CND_PITCHACTIVE:
                return this.cndPitchActive(cnd);
            case CRunMultipleTouch.CND_NEWGESTURE:
                return this.cndNewGesture(cnd);
        }
        return false;
    },

    getObjectsUnder: function (x, y) {
        var rhPtr = this.ho.hoAdRunHeader;
        var list = null;
        var pHox, count = 0, i;
        for (i = 0; i < rhPtr.rhNObjects; i++) {
            while (rhPtr.rhObjectList[count] == null) {
                count++;
            }
            pHox = rhPtr.rhObjectList[count];
            count++;

            if (this.isObjectUnder(pHox, x, y)) {
                if (list == null) {
                    list = new CArrayList();
                }
                list.add(pHox);
            }
        }
        return list;
    },

    callObjectConditions: function (x, y) {
        var list = this.getObjectsUnder(x, y);
        if (list != null) {
            var count;
            for (count = 0; count < list.size(); count++) {
                pHox = list.get(count);
                this.OiUnder = pHox.hoOi;
                this.hoUnder = (pHox.hoCreationId << 16) | (pHox.hoNumber & 0xFFFF);
                this.ho.generateEvent(CRunMultipleTouch.CND_NEWTOUCHOBJECT, 0);
            }
        }
    },

    isObjectUnder: function (pHox, x, y) {
        var x1, y1, x2, y2;
        var rhPtr = this.ho.hoAdRunHeader;

        x1 = pHox.hoX - pHox.hoImgXSpot - this.rh.rhWindowX;    // Build 285.2: remove scroll position
        y1 = pHox.hoY - pHox.hoImgYSpot - this.rh.rhWindowY;
        x2 = x1 + pHox.hoImgWidth;
        y2 = y1 + pHox.hoImgHeight;
        if (x >= x1 && x < x2 && y >= y1 && y < y2) {
            if ((pHox.hoFlags & CObject.HOF_DESTROYED) == 0) {
                if (pHox.hoType == COI.OBJ_SPR) {
                    if ((pHox.ros.rsFlags & CRSpr.RSFLAG_COLBOX) == 0) {
                        var image = rhPtr.rhApp.imageBank.getImageFromHandle(pHox.roc.rcImage);
                        var mask = image.getMask(CMask.GCMF_OBSTACLE, pHox.roc.rcAngle, pHox.roc.rcScaleX, pHox.roc.rcScaleY);
                        return mask.testPoint(x1, y1, x, y);
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return true;
                }
            }
        }
        return false;
    },

    isActiveRoutine: function (touch, oiList) {
        if (touch >= 0 && touch < this.maxTouches) {
            if (this.touchesID[touch] != CRunMultipleTouch.TOUCHID_EMPTY) {
                var rhPtr = this.ho.hoAdRunHeader;
                var rhEvtProg = rhPtr.rhEvtProg;

                var rh2EventPrev = rhEvtProg.rh2EventPrev;
                var rh2EventPrevOiList = rhEvtProg.rh2EventPrevOiList;
                var rh2EventPos = rhEvtProg.rh2EventPos;
                var rh2EventPosOiList = rhEvtProg.rh2EventPosOiList;
                var evtNSelectedObjects = rhEvtProg.evtNSelectedObjects;
                var result = false;
                do
                {
                    var pHo = rhPtr.rhEvtProg.evt_FirstObject(oiList);
                    if (pHo == null) {
                        break;
                    }
                    var count = rhPtr.rhEvtProg.evtNSelectedObjects;

                    do
                    {
                        if (!this.isObjectUnder(pHo, this.touchesX[touch], this.touchesY[touch])) {
                            count--;
                            rhPtr.rhEvtProg.evt_DeleteCurrentObject();
                        }
                        pHo = rhPtr.rhEvtProg.evt_NextObject();
                    } while (pHo != null);

                    result = (count != 0);
                } while (false)

                rhEvtProg.rh2EventPrev = rh2EventPrev;
                rhEvtProg.rh2EventPrevOiList = rh2EventPrevOiList;
                rhEvtProg.rh2EventPos = rh2EventPos;
                rhEvtProg.rh2EventPosOiList = rh2EventPosOiList;
                rhEvtProg.evtNSelectedObjects = evtNSelectedObjects;

                return result;
            }
        }
        return false;
    },

    selectObjectByFixedValue: function (oiList, hoFV) {
        var rhPtr = this.ho.hoAdRunHeader;
        var rhEvtProg = rhPtr.rhEvtProg;

        var rh2EventPrev = rhEvtProg.rh2EventPrev;
        var rh2EventPrevOiList = rhEvtProg.rh2EventPrevOiList;
        var rh2EventPos = rhEvtProg.rh2EventPos;
        var rh2EventPosOiList = rhEvtProg.rh2EventPosOiList;
        var evtNSelectedObjects = rhEvtProg.evtNSelectedObjects;

        var result = false;
        do {
            var pHo = rhPtr.rhEvtProg.evt_FirstObject(oiList);
            if (pHo == null) {
                break;
            }
            var count = rhPtr.rhEvtProg.evtNSelectedObjects;

            do {
                var fv = (pHo.hoCreationId << 16) | (pHo.hoNumber & 0xFFFF);
                if (fv != hoFV) {
                    count--;
                    rhPtr.rhEvtProg.evt_DeleteCurrentObject();
                }
                pHo = rhPtr.rhEvtProg.evt_NextObject();
            } while (pHo != null);

            result = (count != 0);
        } while (false);

        rhEvtProg.rh2EventPrev = rh2EventPrev;
        rhEvtProg.rh2EventPrevOiList = rh2EventPrevOiList;
        rhEvtProg.rh2EventPos = rh2EventPos;
        rhEvtProg.rh2EventPosOiList = rh2EventPosOiList;
        rhEvtProg.evtNSelectedObjects = evtNSelectedObjects;

        return result;
    },

    cndNewTouchObject: function (cnd) {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
            var param = cnd.getParamObject(this.rh, 0);
            if (this.OiUnder != param.oi && param.oi >= 0) {
                return false;
            }
            return this.selectObjectByFixedValue(param.oiList, this.hoUnder);
        }
        if (this.ho.getEventCount() == this.newTouchCount) {
            return this.isActiveRoutine(this.lastNewTouch, cnd.getParamObject(this.rh, 0).oiList);
        }
        return false;
    },

    cndNewTouch: function (cnd) {
        var touch = cnd.getParamExpression(this.rh, 0);
        var bTest = false;
        if (touch < 0) {
            bTest = true;
        }
        if (touch >= 0 && touch < this.maxTouches) {
            if (this.touchesNew[touch] != 0) {
                bTest = true;
            }
        }
        if (bTest) {
            if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
                return true;
            }
            if (this.ho.getEventCount() == this.newTouchCount) {
                return true;
            }
        }
        return false;
    },

    cndNewTouchAny: function (cnd) {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
            return true;
        }
        if (this.ho.getEventCount() == this.newTouchCount) {
            return true;
        }
        return false;
    },

    cndEndTouchAny: function (cnd) {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
            return true;
        }
        if (this.ho.getEventCount() == this.newTouchCount) {
            return true;
        }
        return false;
    },

    cndEndTouch: function (cnd) {
        var touch = cnd.getParamExpression(this.rh, 0);
        var bTest = false;
        if (touch < 0) {
            bTest = true;
        }
        if (touch >= 0 && touch < this.maxTouches) {
            if (this.touchesEnd[touch] != 0) {
                bTest = true;
            }
        }
        if (bTest) {
            if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
                return true;
            }
            if (this.ho.getEventCount() == this.endTouchCount) {
                return true;
            }
        }
        return false;
    },

    cndTouchMoved: function (cnd) {
        var touch = cnd.getParamExpression(this.rh, 0);
        var bTest = false;
        if (touch < 0) {
            bTest = true;
        }
        if (touch == this.lastTouch) {
            bTest = true;
        }
        if (bTest) {
            if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
                return true;
            }
            if (this.ho.getEventCount() == this.movedTouchCount) {
                return true;
            }
        }
        return false;
    },

    cndTouchActive: function (cnd) {
        var touch = cnd.getParamExpression(this.rh, 0);
        if (touch >= 0 && touch < this.maxTouches) {
            if (this.touchesID[touch] != CRunMultipleTouch.TOUCHID_EMPTY) {
                return true;
            }
        }
        return false;
    },

    cndNewPitch: function (cnd) {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
            return true;
        }
        if (this.ho.getEventCount() == this.newPitchCount) {
            return true;
        }
        return false;
    },

    cndNewGesture: function (cnd) {
        if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
            return true;
        }
        if (this.ho.getEventCount() == this.newGestureCount) {
            return true;
        }
        return false;
    },

    cndPitchActive: function (cnd) {
        return (this.pitch1 >= 0 && this.pitch2 >= 0);
    },

    action: function (num, act) {
        switch (num) {
            case CRunMultipleTouch.ACT_SETORIGINX:
                this.setOriginX(act);
                break;
            case CRunMultipleTouch.ACT_SETORIGINY:
                this.setOriginY(act);
                break;
            case CRunMultipleTouch.ACT_RECOGNIZE:
                this.actRecognize(act);
                break;
            case CRunMultipleTouch.ACT_SETRECOGNITION:
                this.actSetRecognition(act);
                break;
            case CRunMultipleTouch.ACT_SETZONE:
                this.actSetZone(act);
                break;
            case CRunMultipleTouch.ACT_SETZONECOORD:
                this.actSetZoneCoords(act);
                break;
            case CRunMultipleTouch.ACT_LOADINI:
                this.actLoadIni(act);
                break;
            case CRunMultipleTouch.ACT_RECOGNIZEG:
                this.actRecognizeG(act);
                break;
            case CRunMultipleTouch.ACT_CLEARGESTURES:
                this.actClearGestures(act);
                break;
        }
    },

    actSetZone: function (act) {
        var zone = act.getParamZone(this.rh, 0);
        this.ho.hoX = zone.x1;
        this.ho.hoY = zone.y1;
        this.width = zone.x2 - zone.x1;
        this.height = zone.y2 - zone.y1;
    },

    actSetZoneCoords: function (act) {
        this.ho.hoX = act.getParamExpression(this.rh, 0);
        this.ho.hoY = act.getParamExpression(this.rh, 1);
        this.width = act.getParamExpression(this.rh, 2);
        this.height = act.getParamExpression(this.rh, 3);
    },

    getStrings: function (text) {
        var end, end1, end2, begin = 0;
        var strings = new Array();
        while (begin < text.length) {
            end1 = text.indexOf(String.fromCharCode(10), begin);
            end2 = text.indexOf(String.fromCharCode(13), begin);
            if (end1 < 0) {
                end1 = text.length;
            }
            if (end2 < 0) {
                end2 = text.length;
            }
            end = Math.min(end1, end2);
            strings.push(text.substring(begin, end));
            begin = Math.max(end1 + 1, end2 + 1);
        }
        return strings;
    },

    actLoadIni: function (act) {
        if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
            this.createRecognizer();

            var strings;
            var filename = act.getParamFilename(this.rh, 0);
            var file = this.rh.rhApp.openFile(filename, false);
            if (file != null) {
                while (!file.isEOF()) {
                    strings.push(file.readAStringEOL());
                }
            }

            if (strings.length > 0) {
                this.addGestures(strings);
            }
        }
    },

    actClearGestures: function () {
        if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
            this.createRecognizer();
            this.recognizer.ClearGestures();
        }
    },

    actRecognize: function (act) {
        if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
            var depth = act.getParamExpression(this.rh, 0);
            if (depth < 0) {
                depth = 1;
            }
            if (depth > this.depth) {
                depth = this.depth;
            }
            this.recognize(depth);
        }
    },

    actRecognizeG: function (act) {
        if (this.flags & CRunMultipleTouch.MTFLAG_RECOGNITION) {
            var name = act.getParamExpression(this.rh, 0);
            var depth = act.getParamExpression(this.rh, 1);
            if (depth < 0) {
                depth = 1;
            }
            if (depth > this.depth) {
                depth = this.depth;
            }
            this.recognize(depth, name);
        }
    },

    actSetRecognition: function (act) {
        var onOff = act.getParamExpression(this.rh, 0);
        var depth = act.getParamExpression(this.rh, 1);
        if (depth < 1) {
            depth = 1;
        }
        if (depth > 10) {
            depth = 10;
        }
        this.depth = depth;

        if (onOff) {
            this.flags = this.flags | CRunMultipleTouch.MTFLAG_RECOGNITION;
            this.touchArray = new Array();
        }
        else {
            this.flags &= ~CRunMultipleTouch.MTFLAG_RECOGNITION;
            this.touchArray = null;
        }
    },

    setOriginX: function (act) {
        var touch = act.getParamExpression(this.rh, 0);
        var coord = act.getParamExpression(this.rh, 1);

        if (touch >= 0 && touch < this.maxTouches) {
            this.startX[touch] = coord - this.rh.rhWindowX;
        }
    },

    setOriginY: function (act) {
        var touch = act.getParamExpression(this.rh, 0);
        var coord = act.getParamExpression(this.rh, 1);

        if (touch >= 0 && touch < this.maxTouches) {
            this.startY[touch] = coord - this.rh.rhWindowY;
        }
    },

    expression: function (num) {
        switch (num) {
            case CRunMultipleTouch.EXP_GETNUMBER:
                return this.expGetNumber();
            case CRunMultipleTouch.EXP_GETLAST:
                return this.lastTouch;
            case CRunMultipleTouch.EXP_MTGETX:
                return this.expGetX();
            case CRunMultipleTouch.EXP_MTGETY:
                return this.expGetY();
            case CRunMultipleTouch.EXP_GETLASTNEWTOUCH:
                return this.lastNewTouch;
            case CRunMultipleTouch.EXP_GETLASTENDTOUCH:
                return this.lastEndTouch;
            case CRunMultipleTouch.EXP_GETORIGINX:
                return this.expGetOriginX();
            case CRunMultipleTouch.EXP_GETORIGINY:
                return this.expGetOriginY();
            case CRunMultipleTouch.EXP_GETDELTAX:
                return this.expGetDeltaX();
            case CRunMultipleTouch.EXP_GETDELTAY:
                return this.expGetDeltaY();
            case CRunMultipleTouch.EXP_GETTOUCHANGLE:
                return this.expGetAngle();
            case CRunMultipleTouch.EXP_GETDISTANCE:
                return this.expGetDistance();
            case CRunMultipleTouch.EXP_PITCHDISTANCE:
                return this.expPitchDistance();
            case CRunMultipleTouch.EXP_PITCHANGLE:
                return this.expPitchAngle();
            case CRunMultipleTouch.EXP_PITCHPERCENTAGE:
                return this.expPitchPercentage();
            case CRunMultipleTouch.EXP_RECOGNIZEDNAME:
                return this.gestureName;
            case CRunMultipleTouch.EXP_RECOGNIZEDPERCENT:
                return Math.floor(this.gesturePercent * 100);
        }
        return 0;
    },

    expPitchAngle: function () {
        if (this.pitch1 >= 0 && this.pitch2 >= 0) {
            var deltaX = this.touchesX[this.pitch2] - this.touchesX[this.pitch1];
            var deltaY = this.touchesY[this.pitch2] - this.touchesY[this.pitch1];
            var angle = Math.atan2(-deltaY, deltaX) * 57.295779513082320876798154814105;
            if (angle < 0) {
                angle = 360.0 + angle;
            }
            return Math.floor(angle);
        }
        return -1;
    },

    expPitchDistance: function () {
        if (this.pitch1 >= 0 && this.pitch2 >= 0) {
            var deltaX = this.touchesX[this.pitch2] - this.touchesX[this.pitch1];
            var deltaY = this.touchesY[this.pitch2] - this.touchesY[this.pitch1];
            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            return Math.floor(distance);
        }
        return -1;
    },

    expPitchPercentage: function () {
        var distance = this.expPitchDistance();
        if (distance >= 0 && this.pitchDistance > 0) {
            var percent = (distance / this.pitchDistance) * 100;
            return Math.floor(percent);
        }
        return -1;
    },

    expGetNumber: function () {
        var count = 0;
        var n;
        for (n = 0; n < this.maxTouches; n++) {
            if (this.touchesID[n] != CRunMultipleTouch.TOUCHID_EMPTY) {
                count++;
            }
        }
        return count;
    },

    expGetX: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            return this.touchesX[touch] + this.rh.rhWindowX;
        }
        return -1;
    },

    expGetY: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            return this.touchesY[touch] + this.rh.rhWindowY;
        }
        return -1;
    },

    expGetOriginX: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            return this.startX[touch] + this.rh.rhWindowX;
        }
        return -1;
    },

    expGetOriginY: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            return this.startY[touch] + this.rh.rhWindowY;
        }
        return -1;
    },

    expGetDeltaX: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            return this.dragX[touch] - this.startX[touch];
        }
        return -1;
    },

    expGetDeltaY: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            return this.dragY[touch] - this.startY[touch];
        }
        return -1;
    },

    expGetAngle: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            var deltaX = this.dragX[touch] - this.startX[touch];
            var deltaY = this.dragY[touch] - this.startY[touch];
            var angle = Math.atan2(-deltaY, deltaX) * 57.295779513082320876798154814105;
            if (angle < 0) {
                angle = 360.0 + angle;
            }
            return angle;
        }
        return -1;
    },

    expGetDistance: function () {
        var touch = this.ho.getExpParam();
        if (touch >= 0 && touch < this.maxTouches) {
            var deltaX = this.dragX[touch] - this.startX[touch];
            var deltaY = this.dragY[touch] - this.startY[touch];
            var distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            return Math.floor(distance);
        }
        return -1;
    }

};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunMultipleTouch);

/**
 * The $P Point-Cloud Recognizer (JavaScript version)
 *
 *    Radu-Daniel Vatavu, Ph.D.
 *    University Stefan cel Mare of Suceava
 *    Suceava 720229, Romania
 *    vatavu@eed.usv.ro
 *
 *    Lisa Anthony, Ph.D.
 *      UMBC
 *      Information Systems Department
 *      1000 Hilltop Circle
 *      Baltimore, MD 21250
 *      lanthony@umbc.edu
 *
 *    Jacob O. Wobbrock, Ph.D.
 *    The Information School
 *    University of Washington
 *    Seattle, WA 98195-2840
 *    wobbrock@uw.edu
 *
 * The academic publication for the $P recognizer, and what should be
 * used to cite it, is:
 *
 *    Vatavu, R.-D., Anthony, L. and Wobbrock, J.O. (2012).
 *      Gestures as point clouds: A $P recognizer for user interface
 *      prototypes. Proceedings of the ACM Int'l Conference on
 *      Multimodal Interfaces (ICMI '12). Santa Monica, California
 *      (October 22-26, 2012). New York: ACM Press, pp. 273-280.
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (c) 2012, Radu-Daniel Vatavu, Lisa Anthony, and
 * Jacob O. Wobbrock. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University Stefan cel Mare of Suceava,
 *    University of Washington, nor UMBC, nor the names of its contributors
 *    may be used to endorse or promote products derived from this software
 *    without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Radu-Daniel Vatavu OR Lisa Anthony
 * OR Jacob O. Wobbrock BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
 * OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 **/
// Point class
function Point(x, y, id) // constructor
{
    this.X = x;
    this.Y = y;
    this.ID = id; // stroke ID to which this point belongs (1,2,...)
}

// PointCloud class: a point-cloud template
function PointCloud(name, points) // constructor
{
    this.Name = name;
    this.Points = CRunMultipleTouch.Resample(points, NumPoints);
    this.Points = CRunMultipleTouch.Scale(this.Points);
    this.Points = CRunMultipleTouch.TranslateTo(this.Points, Origin);
}

// Result class
function Result(name, score) // constructor
{
    this.Name = name;
    this.Score = score;
}

// PDollarRecognizer class constants
var NumPoints = 32;
var Origin = new Point(0, 0, 0);

// PDollarRecognizer class
function PDollarRecognizer() // constructor
{
    this.gesturePercent = 0;
    this.gestureNumber = -1;
    this.gestureName = "";

    //
    // one predefined point-cloud for each gesture
    //    
    this.PointClouds = new Array();
    /*
     this.PointClouds[0] = new PointCloud("T", new Array(
     new Point(30,7,1),new Point(103,7,1),
     new Point(66,7,2),new Point(66,87,2)
     ));
     this.PointClouds[1] = new PointCloud("N", new Array(
     new Point(177,92,1),new Point(177,2,1),
     new Point(182,1,2),new Point(246,95,2),
     new Point(247,87,3),new Point(247,1,3)
     ));
     this.PointClouds[2] = new PointCloud("D", new Array(
     new Point(345,9,1),new Point(345,87,1),
     new Point(351,8,2),new Point(363,8,2),new Point(372,9,2),new Point(380,11,2),new Point(386,14,2),new Point(391,17,2),new Point(394,22,2),new Point(397,28,2),new Point(399,34,2),new Point(400,42,2),new Point(400,50,2),new Point(400,56,2),new Point(399,61,2),new Point(397,66,2),new Point(394,70,2),new Point(391,74,2),new Point(386,78,2),new Point(382,81,2),new Point(377,83,2),new Point(372,85,2),new Point(367,87,2),new Point(360,87,2),new Point(355,88,2),new Point(349,87,2)
     ));
     this.PointClouds[3] = new PointCloud("P", new Array(
     new Point(507,8,1),new Point(507,87,1),
     new Point(513,7,2),new Point(528,7,2),new Point(537,8,2),new Point(544,10,2),new Point(550,12,2),new Point(555,15,2),new Point(558,18,2),new Point(560,22,2),new Point(561,27,2),new Point(562,33,2),new Point(561,37,2),new Point(559,42,2),new Point(556,45,2),new Point(550,48,2),new Point(544,51,2),new Point(538,53,2),new Point(532,54,2),new Point(525,55,2),new Point(519,55,2),new Point(513,55,2),new Point(510,55,2)
     ));
     this.PointClouds[4] = new PointCloud("X", new Array(
     new Point(30,146,1),new Point(106,222,1),
     new Point(30,225,2),new Point(106,146,2)
     ));
     this.PointClouds[5] = new PointCloud("H", new Array(
     new Point(188,137,1),new Point(188,225,1),
     new Point(188,180,2),new Point(241,180,2),
     new Point(241,137,3),new Point(241,225,3)
     ));
     this.PointClouds[6] = new PointCloud("I", new Array(
     new Point(371,149,1),new Point(371,221,1),
     new Point(341,149,2),new Point(401,149,2),
     new Point(341,221,3),new Point(401,221,3)
     ));
     this.PointClouds[7] = new PointCloud("exclamation", new Array(
     new Point(526,142,1),new Point(526,204,1),
     new Point(526,221,2)
     ));
     this.PointClouds[8] = new PointCloud("line", new Array(
     new Point(12,347,1),new Point(119,347,1)
     ));
     this.PointClouds[9] = new PointCloud("five-point star", new Array(
     new Point(177,396,1),new Point(223,299,1),new Point(262,396,1),new Point(168,332,1),new Point(278,332,1),new Point(184,397,1)
     ));
     this.PointClouds[10] = new PointCloud("null", new Array(
     new Point(382,310,1),new Point(377,308,1),new Point(373,307,1),new Point(366,307,1),new Point(360,310,1),new Point(356,313,1),new Point(353,316,1),new Point(349,321,1),new Point(347,326,1),new Point(344,331,1),new Point(342,337,1),new Point(341,343,1),new Point(341,350,1),new Point(341,358,1),new Point(342,362,1),new Point(344,366,1),new Point(347,370,1),new Point(351,374,1),new Point(356,379,1),new Point(361,382,1),new Point(368,385,1),new Point(374,387,1),new Point(381,387,1),new Point(390,387,1),new Point(397,385,1),new Point(404,382,1),new Point(408,378,1),new Point(412,373,1),new Point(416,367,1),new Point(418,361,1),new Point(419,353,1),new Point(418,346,1),new Point(417,341,1),new Point(416,336,1),new Point(413,331,1),new Point(410,326,1),new Point(404,320,1),new Point(400,317,1),new Point(393,313,1),new Point(392,312,1),
     new Point(418,309,2),new Point(337,390,2)
     ));
     this.PointClouds[11] = new PointCloud("arrowhead", new Array(
     new Point(506,349,1),new Point(574,349,1),
     new Point(525,306,2),new Point(584,349,2),new Point(525,388,2)
     ));
     this.PointClouds[12] = new PointCloud("pitchfork", new Array(
     new Point(38,470,1),new Point(36,476,1),new Point(36,482,1),new Point(37,489,1),new Point(39,496,1),new Point(42,500,1),new Point(46,503,1),new Point(50,507,1),new Point(56,509,1),new Point(63,509,1),new Point(70,508,1),new Point(75,506,1),new Point(79,503,1),new Point(82,499,1),new Point(85,493,1),new Point(87,487,1),new Point(88,480,1),new Point(88,474,1),new Point(87,468,1),
     new Point(62,464,2),new Point(62,571,2)
     ));
     this.PointClouds[13] = new PointCloud("six-point star", new Array(
     new Point(177,554,1),new Point(223,476,1),new Point(268,554,1),new Point(183,554,1),
     new Point(177,490,2),new Point(223,568,2),new Point(268,490,2),new Point(183,490,2)
     ));
     this.PointClouds[14] = new PointCloud("asterisk", new Array(
     new Point(325,499,1),new Point(417,557,1),
     new Point(417,499,2),new Point(325,557,2),
     new Point(371,486,3),new Point(371,571,3)
     ));
     this.PointClouds[15] = new PointCloud("half-note", new Array(
     new Point(546,465,1),new Point(546,531,1),
     new Point(540,530,2),new Point(536,529,2),new Point(533,528,2),new Point(529,529,2),new Point(524,530,2),new Point(520,532,2),new Point(515,535,2),new Point(511,539,2),new Point(508,545,2),new Point(506,548,2),new Point(506,554,2),new Point(509,558,2),new Point(512,561,2),new Point(517,564,2),new Point(521,564,2),new Point(527,563,2),new Point(531,560,2),new Point(535,557,2),new Point(538,553,2),new Point(542,548,2),new Point(544,544,2),new Point(546,540,2),new Point(546,536,2)
     ));
     */
    //
    // The $P Point-Cloud Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), DeleteUserGestures()
    //
    this.Recognize = function (points, name) {
        points = CRunMultipleTouch.Resample(points, NumPoints);
        points = CRunMultipleTouch.Scale(points);
        points = CRunMultipleTouch.TranslateTo(points, Origin);

        var b = +Infinity;
        var u = -1;
        if (!name) {
            for (var i = 0; i < this.PointClouds.length; i++) // for each point-cloud template
            {
                var d = CRunMultipleTouch.GreedyCloudMatch(points, this.PointClouds[i]);
                if (d < b) {
                    b = d; // best (least) distance
                    u = i; // point-cloud
                }
            }
        }
        else {
            var num;
            for (num = 0; num < this.PointClouds.length; num++) {
                if (this.PointClouds[num].Name == name) {
                    break;
                }
            }
            if (num < this.PointClouds.length) {
                b = CRunMultipleTouch.GreedyCloudMatch(points, this.PointClouds[num]);
                u = num;
            }
        }
        this.gesturePercent = Math.max((b - 2.0) / -2.0, 0.0);
        if (this.gesturePercent > 0) {
            this.gestureNumber = u;
            this.gestureName = (u == -1) ? "" : this.PointClouds[u].Name;
        }
        else {
            this.gestureNumber = -1;
            this.gestureName = "";
        }
    };
    this.AddGesture = function (name, points) {
        var num;
        for (num = 0; num < this.PointClouds.length; num++) {
            if (this.PointClouds[num].Name == name) {
                break;
            }
        }
        if (num < this.PointClouds.length) {
            this.PointClouds[num] = new PointCloud(name, points);
        } else {
            this.PointClouds.push(new PointCloud(name, points));
        }
        return num;
    }
    this.ClearGestures = function () {
        this.PointClouds.length = 0; // clear any beyond the original set
    }
}

//functions
CRunMultipleTouch.GreedyCloudMatch = function(points, P) {
    var e = 0.50;
    var step = Math.floor(Math.pow(points.length, 1 - e));
    var min = +Infinity;
    for (var i = 0; i < points.length; i += step) {
        var d1 = CRunMultipleTouch.CloudDistance(points, P.Points, i);
        var d2 = CRunMultipleTouch.CloudDistance(P.Points, points, i);
        min = Math.min(min, Math.min(d1, d2)); // min3
    }
    return min;
}

CRunMultipleTouch.CloudDistance = function(pts1, pts2, start) {
    var matched = new Array(pts1.length); // pts1.length == pts2.length
    for (var k = 0; k < pts1.length; k++) {
        matched[k] = false;
    }
    var sum = 0;
    var i = start;
    do
    {
        var index = -1;
        var min = +Infinity;
        for (var j = 0; j < matched.length; j++) {
            if (!matched[j]) {
                var d = CRunMultipleTouch.Distance(pts1[i], pts2[j]);
                if (d < min) {
                    min = d;
                    index = j;
                }
            }
        }
        matched[index] = true;
        var weight = 1 - ((i - start + pts1.length) % pts1.length) / pts1.length;
        sum += weight * min;
        i = (i + 1) % pts1.length;
    } while (i != start);
    return sum;
}

CRunMultipleTouch.Resample = function(points, n) {
    var I = CRunMultipleTouch.PathLength(points) / (n - 1); // interval length
    var D = 0.0;
    var newpoints = new Array(points[0]);
    for (var i = 1; i < points.length; i++) {
        if (points[i].ID == points[i - 1].ID) {
            var d = CRunMultipleTouch.Distance(points[i - 1], points[i]);
            if ((D + d) >= I) {
                var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
                var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
                var q = new Point(qx, qy, points[i].ID);
                newpoints[newpoints.length] = q; // append new point 'q'
                points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
                D = 0.0;
            }
            else {
                D += d;
            }
        }
    }
    while (newpoints.length < n) // sometimes we fall a rounding-error short of adding the last point, so add it if so
    {
        newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y, points[points.length - 1].ID);
    }
    return newpoints;
}

CRunMultipleTouch.Scale = function(points) {
    var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
    for (var i = 0; i < points.length; i++) {
        minX = Math.min(minX, points[i].X);
        minY = Math.min(minY, points[i].Y);
        maxX = Math.max(maxX, points[i].X);
        maxY = Math.max(maxY, points[i].Y);
    }
    var size = Math.max(maxX - minX, maxY - minY);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = (points[i].X - minX) / size;
        var qy = (points[i].Y - minY) / size;
        newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
    }
    return newpoints;
}

CRunMultipleTouch.TranslateTo = function(points, pt) {
    // translates points' centroid
    var c = CRunMultipleTouch.Centroid(points);
    var newpoints = new Array();
    for (var i = 0; i < points.length; i++) {
        var qx = points[i].X + pt.X - c.X;
        var qy = points[i].Y + pt.Y - c.Y;
        newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
    }
    return newpoints;
}

CRunMultipleTouch.Centroid = function(points) {
    var x = 0.0, y = 0.0;
    for (var i = 0; i < points.length; i++) {
        x += points[i].X;
        y += points[i].Y;
    }
    x /= points.length;
    y /= points.length;
    return new Point(x, y, 0);
}

CRunMultipleTouch.PathDistance = function(pts1, pts2) {
    // average distance between corresponding points in two paths
    var d = 0.0;
    for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
    {
        d += CRunMultipleTouch.Distance(pts1[i], pts2[i]);
    }
    return d / pts1.length;
}

CRunMultipleTouch.PathLength = function(points) {
    // length traversed by a point path
    var d = 0.0;
    for (var i = 1; i < points.length; i++) {
        if (points[i].ID == points[i - 1].ID) {
            d += CRunMultipleTouch.Distance(points[i - 1], points[i]);
        }
    }
    return d;
}

CRunMultipleTouch.Distance = function (p1, p2) {
    // Euclidean distance between two points
    var dx = p2.X - p1.X;
    var dy = p2.Y - p1.Y;
    return Math.sqrt(dx * dx + dy * dy);
}

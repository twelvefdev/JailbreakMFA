//CND_EXTCOLLISION Object
// -----------------------------------------------------------------
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

function CND_EXTCOLLISION() {
    CCnd.call(this);
}

CND_EXTCOLLISION.prototype = {
    eva1: function (rhPtr, pHo) {
        var pHo1 = rhPtr.rhObjectList[rhPtr.rhEvtProg.rh1stObjectNumber];
        if (pHo1 == null) {
            var toto = 2;
        }
        var oiEvent = this.evtOi;
        var p = this.evtParams[0];
        var oiParam = p.oi;

        while (true) {
            if (oiEvent == pHo.hoOi) {
                if (oiParam == pHo1.hoOi) {
                    break;
                }
                if (oiParam >= 0) {
                    return false;
                }
                if (this.colGetList(rhPtr, p.oiList, pHo1.hoOi)) {
                    break;
                }
                return false;
            }
            if (oiParam == pHo.hoOi) {
                if (oiEvent == pHo1.hoOi) {
                    break;
                }
                if (oiEvent >= 0) {
                    return false;
                }
                if (this.colGetList(rhPtr, this.evtOiList, pHo1.hoOi)) {
                    break;
                }
                return false;
            }
            if (oiEvent < 0) {
                if (oiParam < 0) {
                    if (this.colGetList(rhPtr, this.evtOiList, pHo.hoOi)) {
                        if (this.colGetList(rhPtr, p.oiList, pHo1.hoOi)) {
                            break;
                        }
                        if (this.colGetList(rhPtr, p.oiList, pHo.hoOi) == false) {
                            return false;
                        }
                        if (this.colGetList(rhPtr, this.evtOiList, pHo1.hoOi)) {
                            break;
                        }
                        return false;
                    }
                    else {
                        if (this.colGetList(rhPtr, this.evtOiList, pHo1.hoOi)) {
                            break;
                        }
                        return false;
                    }
                }
                else {
                    if (oiParam == pHo1.hoOi) {
                        break;
                    }
                    return false;
                }
            }
            if (oiParam >= 0) {
                return false;
            }
            if (oiEvent != pHo1.hoOi) {
                return false;
            }
            break;
        }

        var id = ( (pHo1.hoCreationId) << 16) | ((this.evtIdentifier) & 0x0000FFFF);
        if (CCnd.compute_NoRepeatCol(id, pHo) == false) {
            if ((rhPtr.rhEvtProg.rhEventGroup.evgFlags & CEventGroup.EVGFLAGS_STOPINGROUP) == 0) {
                return false;
            }
            rhPtr.rhEvtProg.rh3DoStop = true;
        }
        id = ( (pHo.hoCreationId) << 16) | ((this.evtIdentifier) & 0x0000FFFF);
        if (CCnd.compute_NoRepeatCol(id, pHo1) == false) {
            if ((rhPtr.rhEvtProg.rhEventGroup.evgFlags & CEventGroup.EVGFLAGS_STOPINGROUP) == 0) {
                return false;
            }
            rhPtr.rhEvtProg.rh3DoStop = true;
        }

        if (oiEvent < 0)
            rhPtr.rhEvtProg.evt_DeleteCurrentQualifier(this.evtOiList);
        if (oiParam < 0)
            rhPtr.rhEvtProg.evt_DeleteCurrentQualifier(p.oiList);
        rhPtr.rhEvtProg.evt_AddCurrentObject(pHo);
        rhPtr.rhEvtProg.evt_AddCurrentObject(pHo1);

        if (pHo1.rom.rmMovement.rmCollisionCount == rhPtr.rh3CollisionCount) {
            pHo.rom.rmMovement.rmCollisionCount = rhPtr.rh3CollisionCount;
        } else if (pHo.rom.rmMovement.rmCollisionCount == rhPtr.rh3CollisionCount) {
            pHo1.rom.rmMovement.rmCollisionCount = rhPtr.rh3CollisionCount;
        }

        return true;
    },
    eva2: function (rhPtr) {
        return this.isColliding(rhPtr);
    },
    colGetList: function (rhPtr, oiList, lookFor) {
        if (oiList == -1) {
            return false;
        }
        var qoil = rhPtr.rhEvtProg.qualToOiList[oiList & 0x7FFF];
        var index;
        for (index = 0; index < qoil.qoiList.length; index += 2) {
            if (qoil.qoiList[index] == lookFor) {
                return true;
            }
        }
        return false;
    }
};

//setup inheritance using extend
CServices.extend(CCnd, CND_EXTCOLLISION);
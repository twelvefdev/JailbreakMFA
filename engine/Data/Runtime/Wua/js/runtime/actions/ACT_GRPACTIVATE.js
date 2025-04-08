//ACT_GRPACTIVATE Object
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

function ACT_GRPACTIVATE() {
}
ACT_GRPACTIVATE.prototype = {
    execute: function (rhPtr) {
        var p = this.evtParams[0];
        var evg = p.pointer;
        var evgPtr = rhPtr.rhEvtProg.events[evg];
        var evtPtr = evgPtr.evgEvents[0];

        var grpPtr = evtPtr.evtParams[0];
        var bFlag = (grpPtr.grpFlags & PARAM_GROUP.GRPFLAGS_GROUPINACTIVE) != 0;
        grpPtr.grpFlags &= ~PARAM_GROUP.GRPFLAGS_GROUPINACTIVE;

        if (bFlag) {
            this.grpActivate(rhPtr, evg);
        }
    },
    grpActivate: function (rhPtr, evg) {
        var evgPtr = rhPtr.rhEvtProg.events[evg];
        var evtPtr = evgPtr.evgEvents[0];
        var grpPtr = evtPtr.evtParams[0];
        var cpt;
        var bQuit = false;

        if ((grpPtr.grpFlags & PARAM_GROUP.GRPFLAGS_PARENTINACTIVE) == 0) {
            evgPtr.evgFlags &= ~CEventGroup.EVGFLAGS_INACTIVE;

            for (evg++, bQuit = false, cpt = 1; ;) {
                evgPtr = rhPtr.rhEvtProg.events[evg];
                evtPtr = evgPtr.evgEvents[0];
                switch (evtPtr.evtCode) {
                    case ((-10 << 16) | 65535):
                        grpPtr = evtPtr.evtParams[0];
                        if (cpt == 1) {
                            grpPtr.grpFlags &= ~PARAM_GROUP.GRPFLAGS_PARENTINACTIVE;
                        }
                        if ((grpPtr.grpFlags & PARAM_GROUP.GRPFLAGS_GROUPINACTIVE) == 0) {
                            evg = this.grpActivate(rhPtr, evg);
                            continue;
                        }
                        else {
                            cpt++;
                        }
                        break;
                    case ((-11 << 16) | 65535):
                        cpt--;
                        if (cpt == 0) {
                            evgPtr.evgFlags &= ~CEventGroup.EVGFLAGS_INACTIVE;
                            bQuit = true;
                            evg++;
                        }
                        break;
                    case ((-23 << 16) | 65535):
                        if (cpt == 1) {
                            evgPtr.evgFlags &= ~CEventGroup.EVGFLAGS_INACTIVE;
                            evgPtr.evgFlags &= ~CEventGroup.EVGFLAGS_ONCE;
                        }
                        break;
                    case ((-42 << 16) | 65535):
                        evgPtr.evgFlags |= CEventGroup.EVGFLAGS_INACTIVE;
                        break;
                    default:
                        if (cpt == 1) {
                            evgPtr.evgFlags &= ~CEventGroup.EVGFLAGS_INACTIVE;
                        }
                        break;
                }
                if (bQuit) {
                    break;
                }
                evg++;
            }
        }
        else {
            for (evg++, bQuit = false, cpt = 1; ; evg++) {
                evgPtr = rhPtr.rhEvtProg.events[evg];
                evtPtr = evgPtr.evgEvents[0];
                switch (evtPtr.evtCode) {
                    case ((-10 << 16) | 65535):
                        cpt++;
                        break;
                    case ((-11 << 16) | 65535):
                        cpt--;
                        if (cpt == 0) {
                            bQuit = true;
                            evg++;
                        }
                        break;
                    case ((-42 << 16) | 65535):
                        evgPtr.evgFlags |= CEventGroup.EVGFLAGS_INACTIVE;
                        break;
                }
                if (bQuit) {
                    break;
                }
            }
        }
        return evg;
    }
}

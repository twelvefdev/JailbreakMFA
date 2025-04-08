//ACT_GRPDEACTIVATE Object
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

function ACT_GRPDEACTIVATE() {
}
ACT_GRPDEACTIVATE.prototype = {
    execute: function (rhPtr) {
        var p = this.evtParams[0];
        var evg = p.pointer;
        var evgPtr = rhPtr.rhEvtProg.events[evg];
        var evtPtr = evgPtr.evgEvents[0];

        var grpPtr = evtPtr.evtParams[0];
        var bFlag = (grpPtr.grpFlags & PARAM_GROUP.GRPFLAGS_GROUPINACTIVE) == 0;
        grpPtr.grpFlags |= PARAM_GROUP.GRPFLAGS_GROUPINACTIVE;

        if (bFlag == true && (grpPtr.grpFlags & PARAM_GROUP.GRPFLAGS_PARENTINACTIVE) == 0) {
            this.grpDeactivate(rhPtr, evg);
        }
    },
    grpDeactivate: function (rhPtr, evg) {
        var evgPtr = rhPtr.rhEvtProg.events[evg];
        var evtPtr = evgPtr.evgEvents[0];
        var grpPtr = evtPtr.evtParams[0];

        evgPtr.evgFlags |= CEventGroup.EVGFLAGS_INACTIVE;

        var cpt;
        var bQuit, bFlag;

        for (evg++, bQuit = false, cpt = 1; ;) {
            evgPtr = rhPtr.rhEvtProg.events[evg];
            evtPtr = evgPtr.evgEvents[0];
            switch (evtPtr.evtCode) {
                case ((-10 << 16) | 65535):
                    grpPtr = evtPtr.evtParams[0];
                    bFlag = (grpPtr.grpFlags & PARAM_GROUP.GRPFLAGS_PARENTINACTIVE) == 0;
                    if (cpt == 1) {
                        grpPtr.grpFlags |= PARAM_GROUP.GRPFLAGS_PARENTINACTIVE;
                    }
                    if (bFlag != false && (grpPtr.grpFlags & PARAM_GROUP.GRPFLAGS_GROUPINACTIVE) == 0) {
                        evg = this.grpDeactivate(rhPtr, evg);
                        continue;
                    }
                    else {
                        cpt++;
                    }
                    break;
                case ((-11 << 16) | 65535):
                    cpt--;
                    if (cpt == 0) {
                        evgPtr.evgFlags |= CEventGroup.EVGFLAGS_INACTIVE;
                        bQuit = true;
                        evg++;
                    }
                    break;
                default:
                    if (cpt == 1) {
                        evgPtr.evgFlags |= CEventGroup.EVGFLAGS_INACTIVE;
                    }
                    break;
            }
            if (bQuit) {
                break;
            }

            evg++;
        }
        return evg;
    }
}

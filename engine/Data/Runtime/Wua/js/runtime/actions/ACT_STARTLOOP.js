//ACT_STARTLOOP Object
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

function ACT_STARTLOOP() {
}
ACT_STARTLOOP.prototype = {
    execute: function (rhPtr) {
        var name;
        var number;

        // Accelerated handling
        if (rhPtr.rhEvtProg.complexOnLoop == false && this.evtParams[0].fastFastLoop) {
            var infoLoop = rhPtr.rh4PosOnLoop[this.evtParams[0].fastFastLoop - 1];
            if (infoLoop.m_bOR == false) {
                //name = infoLoop.name;
                number = Math.floor(rhPtr.get_EventExpressionInt(this.evtParams[1]));

                var pLoop = rhPtr.rh4FastLoops.get(infoLoop.fastLoopIndex);
                pLoop.flags &= ~CLoop.FLFLAG_STOP;

                var bInfinite = false;
                if (number < 0) {
                    bInfinite = true;
                    number = 10;
                }
                var save = rhPtr.rh4CurrentFastLoop;
                var actionLoop = rhPtr.rhEvtProg.rh2ActionLoop;
                var actionLoopCount = rhPtr.rhEvtProg.rh2ActionLoopCount;
                var eventGroup = rhPtr.rhEvtProg.rhEventGroup;
                for (pLoop.index = 0; pLoop.index < number; pLoop.index++) {
                    rhPtr.rh4CurrentFastLoop = pLoop.name;
                    rhPtr.rhEvtProg.rh2ActionOn = false;
                    rhPtr.rhEvtProg.computeEventFastLoopList(infoLoop.pointers);
                    if ((pLoop.flags & CLoop.FLFLAG_STOP) != 0) {
                        break;
                    }
                    if (bInfinite) {
                        number = pLoop.index + 10;
                    }
                }
                rhPtr.rhEvtProg.rh2ActionLoopCount = actionLoopCount;
                rhPtr.rhEvtProg.rh2ActionLoop = actionLoop;
                rhPtr.rh4CurrentFastLoop = save;
                rhPtr.rhEvtProg.rh2ActionOn = true;

                //                rhPtr.rh4FastLoops.removeIndex(index);
                return;
            }
        }

        // Normal handling
        name = rhPtr.get_EventExpressionString(this.evtParams[0]);
        if (name.length == 0) {
            return;
        }
        number = Math.floor(rhPtr.get_EventExpressionInt(this.evtParams[1]));

        var index = rhPtr.addFastLoop(name);
        var pLoop = rhPtr.rh4FastLoops.get(index);
        pLoop = rhPtr.rh4FastLoops.get(index);
        pLoop.flags &= ~CLoop.FLFLAG_STOP;

        var bInfinite = false;
        if (number < 0) {
            bInfinite = true;
            number = 10;
        }
        var save = rhPtr.rh4CurrentFastLoop;
        var actionLoop = rhPtr.rhEvtProg.rh2ActionLoop;
        var actionLoopCount = rhPtr.rhEvtProg.rh2ActionLoopCount;
        var eventGroup = rhPtr.rhEvtProg.rhEventGroup;
        for (pLoop.index = 0; pLoop.index < number; pLoop.index++) {
            rhPtr.rh4CurrentFastLoop = pLoop.name;
            rhPtr.rhEvtProg.rh2ActionOn = false;
            rhPtr.rhEvtProg.handle_GlobalEvents(((-16 << 16) | 65535));
            if ((pLoop.flags & CLoop.FLFLAG_STOP) != 0) {
                break;
            }
            if (bInfinite) {
                number = pLoop.index + 10;
            }
        }
        //            rhPtr.rhEvtProg.rhEventGroup=eventGroup;
        rhPtr.rhEvtProg.rh2ActionLoopCount = actionLoopCount;
        rhPtr.rhEvtProg.rh2ActionLoop = actionLoop;
        rhPtr.rh4CurrentFastLoop = save;
        rhPtr.rhEvtProg.rh2ActionOn = true;

        //rhPtr.rh4FastLoops.removeIndex(index);
    }
}

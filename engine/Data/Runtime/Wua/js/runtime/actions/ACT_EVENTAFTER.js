//ACT_EVENTAFTER Object
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

function ACT_EVENTAFTER() {
}
ACT_EVENTAFTER.prototype = {
    execute: function (rhPtr) {
        var timer;
        if (this.evtParams[0].code == 22) {
            timer = rhPtr.get_EventExpressionInt(this.evtParams[0]);
        } else {
            timer = this.evtParams[0].timer;
        }
        var pName = rhPtr.get_EventExpressionString(this.evtParams[1]);

        var pLoop = rhPtr.rh4TimerEvents;
        var pPrevious = null;
        while (pLoop != null) {
            pPrevious = pLoop;
            pLoop = pLoop.next;
        }
        var pEvent = new CTimerEvents();
        if (pPrevious == null) {
            rhPtr.rh4TimerEvents = pEvent;
        } else {
            pPrevious.next = pEvent;
        }
        pEvent.type = CTimerEvents.TIMEREVENTTYPE_ONESHOT;
        pEvent.timer = rhPtr.rhTimer + timer;
        pEvent.name = pName;
        pEvent.next = null;
    }
}

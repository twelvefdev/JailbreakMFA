//CND_NOMORE Object
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

function CND_NOMORE() {
}
CND_NOMORE.prototype = {
    eva1: function (rhPtr, hoPtr) {
        return this.eva2(rhPtr);
    },
    eva2: function (rhPtr) {
        var pEvg = rhPtr.rhEvtProg.rhEventGroup;
        if ((pEvg.evgFlags & CEventGroup.EVGFLAGS_NOMORE) != 0) {
            return true;
        }
        if ((pEvg.evgFlags & (CEventGroup.EVGFLAGS_REPEAT | CEventGroup.EVGFLAGS_NOTALWAYS)) != 0) {
            return false;
        }

        if (this.evtParams[0].code == CParam.PARAM_EXPRESSIONNUM) {
            pEvg.evgInhibit = rhPtr.get_EventExpressionInt(this.evtParams[0]) / 10;
        } else {
            pEvg.evgInhibit = (this.evtParams[0].timer / 10);
        }
        pEvg.evgInhibitCpt = 0;
        pEvg.evgFlags |= CEventGroup.EVGFLAGS_NOMORE;
        return true;
    }
}

//CND_CHOOSEVALUE_OLD Object
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

function CND_CHOOSEVALUE_OLD() {
}
CND_CHOOSEVALUE_OLD.prototype = {
    eva1: function (rhPtr, hoPtr) {
        return this.eva2(rhPtr);
    },
    eva2: function (rhPtr) {
        var cpt = 0;

        var pHo = rhPtr.rhEvtProg.evt_FirstObjectFromType(COI.OBJ_SPR);
        while (pHo != null) {
            cpt++;

            var number;
            if (evtParams[0].code == 53) {
                number = rhPtr.get_EventExpressionInt(this.evtParams[0]);
            } else {
                number = this.evtParams[0].value;
            }
            var value2 = rhPtr.get_EventExpressionAny(this.evtParams[1]);

            if (pHo.rov != null) {
                var value = pHo.rov.getValue(number);
                var comp = this.evtParams[1].comparaison;
                if (CRun.compareTo(value, value2, comp) == false) {
                    rhPtr.rhEvtProg.evt_DeleteCurrentObject();
                    cpt--;
                }
            }
            pHo = rhPtr.rhEvtProg.evt_NextObjectFromType();
        }
        ;
        if (cpt != 0) {
            return true;
        }
        return false;
    }
}

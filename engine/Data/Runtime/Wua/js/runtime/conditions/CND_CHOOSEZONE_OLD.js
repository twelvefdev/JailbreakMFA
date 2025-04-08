//CND_CHOOSEZONE_OLD Object
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

function CND_CHOOSEZONE_OLD() {
}
CND_CHOOSEZONE_OLD.prototype = {
    eva1: function (rhPtr, hoPtr) {
        return this.eva2(rhPtr);
    },
    eva2: function (rhPtr) {
        var p = this.evtParams[0];
        rhPtr.rhEvtProg.count_ZoneTypeObjects(p, -1, COI.OBJ_SPR);
        if (rhPtr.rhEvtProg.evtNSelectedObjects == 0) {
            return false;
        }

        var rnd = rhPtr.random(rhPtr.rhEvtProg.evtNSelectedObjects);
        var pHo = rhPtr.rhEvtProg.count_ZoneTypeObjects(p, rnd, COI.OBJ_SPR);
        rhPtr.rhEvtProg.evt_DeleteCurrent();
        rhPtr.rhEvtProg.evt_AddCurrentObject(pHo);
        return true;
    }
}

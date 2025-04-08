//CND_EXTONLOOP Object
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

function CND_EXTONLOOP() {
}
CND_EXTONLOOP.prototype = {
    eva1: function (rhPtr, pHo) {
        var pName = rhPtr.get_EventExpressionString(this.evtParams[0]);
        if (rhPtr.rh4CurrentForEach != null) {
            if (CServices.compareStringsIgnoreCase(rhPtr.rh4CurrentForEach.name, pName)) {
                if (this.evtNParams > 1) {
                    var p = this.evtParams[1];  // PARAM_MULTIPLEVAR
                    if (p.evaluate(pHo) == false) {
                        return false;
                    }
                }
                rhPtr.rhEvtProg.evt_ForceOneObject(this.evtOiList, pHo);
                return true;
            }
        }
        if (rhPtr.rh4CurrentForEach2 != null) {
            if (CServices.compareStringsIgnoreCase(rhPtr.rh4CurrentForEach2.name, pName)) {
                if (this.evtNParams > 1) {
                    var p = this.evtParams[1];  // PARAM_MULTIPLEVAR
                    if (p.evaluate(pHo) == false) {
                        return false;
                    }
                }
                rhPtr.rhEvtProg.evt_ForceOneObject(this.evtOiList, pHo);
                return true;
            }
        }
        return false;
    },
    eva2: function (rhPtr) {
        var pHo2 = null;
        var pName = rhPtr.get_EventExpressionString(this.evtParams[0]);
        var pForEach = rhPtr.rh4CurrentForEach;
        if (pForEach != null) {
            if (CServices.compareStringsIgnoreCase(pForEach.name, pName)) {
                if (pForEach.oi == this.evtOiList) {
                    var index = pForEach.index % pForEach.number;
                    pHo2 = pForEach.objects[index];
                }
            }
        }
        pForEach = rhPtr.rh4CurrentForEach2;
        if (pForEach != null) {
            if (CServices.compareStringsIgnoreCase(pForEach.name, pName)) {
                if (pForEach.oi == this.evtOiList) {
                    var index = pForEach.index % pForEach.number;
                    pHo2 = pForEach.objects[index];
                }
            }
        }
        if (pHo2 != null) {
            if (this.evtNParams > 1) {
                var p = this.evtParams[1];  // PARAM_MULTIPLEVAR
                if (p.evaluate(pHo2) == false) {
                    return false;
                }
            }
            rhPtr.rhEvtProg.evt_ForceOneObject(this.evtOiList, pHo2);
            return true;
        }
        return false;
    }
}

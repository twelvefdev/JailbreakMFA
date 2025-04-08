//CND_EXTNOMOREOBJECT Object
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

function CND_EXTNOMOREOBJECT() {
}
CND_EXTNOMOREOBJECT.prototype = {
    eva1: function (rhPtr, hoPtr) {
        if (hoPtr == null) {
            return this.eva2(rhPtr);
        }
        if (this.evtOi >= 0) {
            if (hoPtr.hoOi != this.evtOi) {
                return false;
            }
            return true;
        }
        return this.evaNoMoreObject(rhPtr, 1);
    },
    eva2: function (rhPtr) {
        return this.evaNoMoreObject(rhPtr, 0);
    },
    evaNoMoreObject: function (rhPtr, sub) {
        var oil = this.evtOiList;

        var poil;
        if ((oil & 0x8000) == 0) {
            poil = rhPtr.rhOiList[oil];
            if (poil.oilNObjects == 0) {
                return true;
            }
            return false;
        }

        if ((oil & 0x7FFF) == 0x7FFF) {
            return false;
        }
        var pqoi = rhPtr.rhEvtProg.qualToOiList[oil & 0x7FFF];
        var count = 0;
        var qoi;
        for (qoi = 0; qoi < pqoi.qoiList.length; qoi += 2) {
            poil = rhPtr.rhOiList[pqoi.qoiList[qoi + 1]];
            count += poil.oilNObjects;
        }
        count -= sub;
        if (count == 0) {
            return true;
        }
        return false;
    }
}

//ACT_QASK Object
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

function ACT_QASK() {
}
ACT_QASK.prototype = {
    execute: function (rhPtr) {
        if ((this.evtOiList & 0x8000) == 0) {
            this.qstCreate(rhPtr, this.evtOi);
            return;
        }

        if ((this.evtOiList & 0x7FFF) != 0x7FFF) {
            var qoil = rhPtr.rhEvtProg.qualToOiList[this.evtOiList & 0x7FFF];
            var qoi;
            for (qoi = 0; qoi < qoil.qoiList.length; qoi += 2) {
                this.qstCreate(rhPtr, qoil.qoiList[qoi]);
            }
        }
    },
    qstCreate: function (rhPtr, oi) {
        var c = this.evtParams[0];
        var info = new CPositionInfo();

        if (c.read_Position(rhPtr, 0x10, info)) {
            rhPtr.f_CreateObject(c.cdpHFII, oi, info.x, info.y, info.dir, 0, rhPtr.rhFrame.nLayers - 1, -1);
        }
    }
}

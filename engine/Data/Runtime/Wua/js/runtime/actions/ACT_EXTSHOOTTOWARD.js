//ACT_EXTSHOOTTOWARD Object
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

function ACT_EXTSHOOTTOWARD() {
}
ACT_EXTSHOOTTOWARD.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        var pInfo = new CPositionInfo();
        if (this.evtParams[0].read_Position(rhPtr, 0x11, pInfo)) {
            var pInfoDest = new CPositionInfo();
            if (this.evtParams[1].read_Position(rhPtr, 0, pInfoDest)) {
                var x2 = pInfoDest.x;
                var y2 = pInfoDest.y;
                var dir = CRun.get_DirFromPente(x2 - pInfo.x, y2 - pInfo.y);

                pHo.shtCreate(this.evtParams[0], pInfo.x, pInfo.y, dir);
            }
        }
    }
}

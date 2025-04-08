//ACT_EXTLOOKAT Object
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

function ACT_EXTLOOKAT() {
}
ACT_EXTLOOKAT.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        var position = this.evtParams[0];
        var pInfo = new CPositionInfo();
        if (position.read_Position(rhPtr, 0, pInfo)) {
            var x = pInfo.x;
            var y = pInfo.y;
            x -= pHo.hoX;
            y -= pHo.hoY;
            var pMovement = rhPtr.GetMBase(pHo);
            if (pMovement == null) {
                var dir = CRun.get_DirFromPente(x, y);
                dir &= 31;
                if (rhPtr.getDir(pHo) != dir) {
                    pHo.roc.rcDir = dir;
                    pHo.roc.rcChanged = true;
                    pHo.rom.rmMovement.setDir(dir);
                }
            }
            else {
                var angle = Math.atan2(-y, x) * 180.0 / 3.141592653589;
                if (angle < 0) {
                    angle = 360 + angle;
                }
                pMovement.setAngle(angle);
            }
        }
    }
}

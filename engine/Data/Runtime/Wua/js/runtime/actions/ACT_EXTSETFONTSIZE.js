//ACT_EXTSETFONTSIZE Object
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

function ACT_EXTSETFONTSIZE() {
    this.rc = new CRect();
}
ACT_EXTSETFONTSIZE.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        var newSize = CServices.heightNormalToLF(rhPtr.get_EventExpressionInt(this.evtParams[0]));
        var bResize = rhPtr.get_EventExpressionInt(this.evtParams[1]);

        var lf = CRun.getObjectFont(pHo);

        var oldSize = lf.lfHeight;
        lf.lfHeight = newSize;

        if (bResize == 0) {
            CRun.setObjectFont(pHo, lf, null);
        } else {
            if (newSize != oldSize) {
                var coef = 1.0;
                if (oldSize != 0) {
                    coef = newSize / oldSize;
                }
                this.rc.right = Math.round(pHo.hoImgWidth * coef);
                this.rc.bottom = Math.round(pHo.hoImgHeight * coef);
                this.rc.left = 0;
                this.rc.top = 0;
                CRun.setObjectFont(pHo, lf, this.rc);
            }
        }
    }
}

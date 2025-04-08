//EXP_STRGETNUMBER Object
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

function EXP_STRGETNUMBER() {
}
EXP_STRGETNUMBER.prototype = {
    evaluate: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ExpressionObjects(this.oiList);
        rhPtr.rh4CurToken++;
        if (pHo == null) {
            rhPtr.rh4Results[rhPtr.rh4PosPile] = "";
            return;
        }
        var num = rhPtr.get_ExpressionInt();

        if (num < 0) {
            if (pHo.rsTextBuffer != null) {
                rhPtr.rh4Results[rhPtr.rh4PosPile] = pHo.rsTextBuffer;
            } else {
                rhPtr.rh4Results[rhPtr.rh4PosPile] = "";
            }
            return;
        }

        if (num >= pHo.rsMaxi) {
            num = pHo.rsMaxi - 1;
        }
        var txt = pHo.hoCommon.ocObject;
        rhPtr.rh4Results[rhPtr.rh4PosPile] = txt.otTexts[num].tsText;
    }
}

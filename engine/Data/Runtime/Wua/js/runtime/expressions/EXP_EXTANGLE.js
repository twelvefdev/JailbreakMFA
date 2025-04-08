//EXP_EXTANGLE Object
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

function EXP_EXTANGLE() {
}
EXP_EXTANGLE.prototype = {
    evaluate: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ExpressionObjects(this.oiList);
        rhPtr.rh4CurToken++;
        var x2 = rhPtr.getExpression();
        rhPtr.rh4CurToken++;
        var y2 = rhPtr.getExpression();
        if (pHo == null) {
            rhPtr.rh4Results[rhPtr.rh4PosPile] = 0;
            return;
        }
        var angle = Math.atan2(-(y2 - pHo.hoY), (x2 - pHo.hoX)) * 180.0 / 3.141592653589;
        if (angle < 0) {
            angle = 360 + angle;
        }
        rhPtr.rh4Results[rhPtr.rh4PosPile] = CServices.approximateInt(angle);
    }
}

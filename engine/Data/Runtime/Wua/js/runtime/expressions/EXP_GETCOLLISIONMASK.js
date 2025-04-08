//EXP_GETCOLLISIONMASK Object
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

function EXP_GETCOLLISIONMASK() {
}
EXP_GETCOLLISIONMASK.prototype = {
    evaluate: function (rhPtr) {
        var x, y;

        rhPtr.rh4CurToken++;
        x = rhPtr.get_ExpressionInt();
        rhPtr.rh4CurToken++;
        y = rhPtr.get_ExpressionInt();

        var result = 0;
        if (rhPtr.y_GetLadderAt(-1, x, y) != null) {
            result = 2;
        } else {
            if (rhPtr.colMask_Test_XY(x, y, -1, CRunFrame.CM_TEST_OBSTACLE)) {
                result = 1;
            }
        }
        rhPtr.rh4Results[rhPtr.rh4PosPile] = result;
    }
}

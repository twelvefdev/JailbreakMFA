//EXP_VAL Object
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

function EXP_VAL() {
}
EXP_VAL.prototype = {
    evaluate: function (rhPtr) {
        rhPtr.rh4CurToken++;

        var s = rhPtr.getExpression();

        var n = 0;
        while (n < s.length && s.charAt(n) == 32) {
            n++;
        }
        var result = 0;
        if (n < s.length) {
            s = s.substr(n);
            if (s.substr(0, 2) == '0b' || s.substr(n, 2) == '0B') {
                result = parseInt(s.substr(n + 2), 2);
            } else {
                var result1 = parseInt(s);
                result = parseFloat(s);
                if (!isNaN(result) && !isNaN(result1)) {
                    if (result == 0 && result1 != 0) {
                        result = result1;
                    }
                    var iValue = CServices.floatToInt(result);
                    if (iValue != result) {
                        rhPtr.flagFloat = true;
                    }
                }
            }
        }
        rhPtr.rh4Results[rhPtr.rh4PosPile] = result;
    }
}

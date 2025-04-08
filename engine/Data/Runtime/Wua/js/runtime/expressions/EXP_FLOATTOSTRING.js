//EXP_FLOATTOSTRING Object
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

function EXP_FLOATTOSTRING() {
}
EXP_FLOATTOSTRING.prototype = {
    evaluate: function (rhPtr) {
        rhPtr.rh4CurToken++;
        var value = rhPtr.getExpression();

        rhPtr.rh4CurToken++;
        var nDigits = rhPtr.get_ExpressionInt();
        if (nDigits < 1) {
            nDigits = 1;
        }

        rhPtr.rh4CurToken++;
        var nDecimals = rhPtr.get_ExpressionInt();

        var temp = value.toString();
        var result = new String();

        var point = temp.indexOf(".");

        var cpt;
        if (point >= 0) {
            for (cpt = point + 1; cpt < temp.length; cpt++) {
                if (temp.charAt(cpt) != "0") {
                    break;
                }
            }
            if (cpt == temp.length) {
                point = -1;
            }
        }

        var pos = 0;
        if (point >= 0) {
            if (value < 0.0) {
                result += "-";
                pos++;
            }

            while (pos < point) {
                result += temp.charAt(pos);
                pos++;
            }

            if (nDecimals > 0) {
                result += ".";
                pos++;

                for (cpt = 0; cpt < nDecimals && cpt + pos < temp.length; cpt++) {
                    result += temp.charAt(pos + cpt);
                }
            }
            else if (nDecimals < 0) {
                result += ".";
                pos++;
                while (pos < temp.length) {
                    result += temp.charAt(pos);
                    pos++;
                }
            }
        }
        else {
            while (pos < temp.length && temp.charAt(pos) != ".") {
                result += temp.charAt(pos);
                pos++;
            }
            if (nDecimals > 0) {
                result += ".";
                for (cpt = 0; cpt < nDecimals; cpt++) {
                    result += "0";
                }
            }
        }
        rhPtr.rh4Results[rhPtr.rh4PosPile] = result;
    }
}

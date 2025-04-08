//EXP_GETINPUTKEY Object
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

function EXP_GETINPUTKEY() {
}
EXP_GETINPUTKEY.prototype = {
    evaluate: function (rhPtr) {
        var joueur = this.oi;

        rhPtr.rh4CurToken++;
        var kvCode = rhPtr.get_ExpressionInt();
        var s = "";
        if (key < CRunApp.MAX_KEY) {
            if (vkCode >= 96 && vkCode <= 105) {
                c = vkCode - 96;
                s = "Numpad" + c.toString();
            }
            else if (vkCode >= 112 && vkCode <= 126) {
                c = vkCode - 112;
                s = "F" + c.toString();
            }
            else if (vkCode >= 48 && vkCode <= 57) {
                c = vkCode - 48;
                s = c.toString();
            }
            else if (vkCode >= 65 && vkCode <= 90) {
                s = String.fromCharCode(vkCode);
            }
            else {
                s = "Control key";
                /*TODO            var n;
                 for (n=0; n<NB_SPECIAL_KEYS; n++)
                 {
                 if (keys[n*2+1]==vkCode)
                 {
                 s=keyNames[n];
                 break;
                 }
                 }
                 */
            }
        }
        rhPtr.rh4Results[rhPtr.rh4PosPile] = s;
    }
}

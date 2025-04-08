//EXP_LOOPINDEX Object
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

function EXP_LOOPINDEX() {
}
EXP_LOOPINDEX.prototype = {
    evaluate: function (rhPtr) {
        rhPtr.rh4CurToken++;
        var token = rhPtr.rh4Tokens[rhPtr.rh4CurToken];
        var pLoop;

        // Simple expression?
        if (rhPtr.rh4Tokens[rhPtr.rh4CurToken + 1].code <= 0 || rhPtr.rh4Tokens[rhPtr.rh4CurToken + 1].code >= 0x00140000) {
            // Index?
            if (token.code == CExp.EXP_LONG) {
                pLoop = rhPtr.rh4FastLoops.get(token.value);
                rhPtr.rh4CurToken++;
                rhPtr.rh4Results[rhPtr.rh4PosPile] = pLoop.index;
                return;
            }

            // Name = simple string?
            if (token.code == CExp.EXP_STRING) {
                var curToken = rhPtr.rh4CurToken;
                var pName = token.string;    // rhPtr.getExpression();
                rhPtr.rh4CurToken++;

                var n;
                for (n = 0; n < rhPtr.rh4FastLoops.size(); n++) {
                    pLoop = rhPtr.rh4FastLoops.get(n);
                    if (CServices.compareStringsIgnoreCase(pLoop.name, pName)) {
                        rhPtr.rh4Tokens[curToken] = new EXP_LONG();
                        rhPtr.rh4Tokens[curToken].code = CExp.EXP_LONG;
                        rhPtr.rh4Tokens[curToken].value = n;

                        rhPtr.rh4Results[rhPtr.rh4PosPile] = pLoop.index;
                        return;
                    }
                }
                rhPtr.rh4Results[rhPtr.rh4PosPile] = 0;
                return;
            }
        }

        var pName = rhPtr.getExpression();

        var n;
        for (n = 0; n < rhPtr.rh4FastLoops.size(); n++) {
            pLoop = rhPtr.rh4FastLoops.get(n);
            if (CServices.compareStringsIgnoreCase(pLoop.name, pName)) {
                rhPtr.rh4Results[rhPtr.rh4PosPile] = pLoop.index;
                return;
            }
        }
        rhPtr.rh4Results[rhPtr.rh4PosPile] = 0;
    }
}

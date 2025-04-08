//ACT_SETLOOPINDEX Object
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

function ACT_SETLOOPINDEX() {
}
ACT_SETLOOPINDEX.prototype = {
    execute: function (rhPtr) {
        var expression = this.evtParams[0];
        if (expression.tokens[0].code == CExp.EXP_LONG && expression.tokens[1].code == 0) {
            var number = rhPtr.get_EventExpressionInt(this.evtParams[1]);
            var pLoop = rhPtr.rh4FastLoops.get(expression.tokens[0].value);
            pLoop.index = number;
        }
        else {
            var name = rhPtr.get_EventExpressionString(this.evtParams[0]);
            if (name.length == 0) {
                return;
            }
            var number = rhPtr.get_EventExpressionInt(this.evtParams[1]);

            var pLoop;
            var n;
            for (n = 0; n < rhPtr.rh4FastLoops.size(); n++) {
                pLoop = rhPtr.rh4FastLoops.get(n);
                if (CServices.compareStringsIgnoreCase(pLoop.name, name)) {
                    pLoop.index = number;
                    return;
                }
            }
        }
    }
}

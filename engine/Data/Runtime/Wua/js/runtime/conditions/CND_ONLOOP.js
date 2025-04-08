//CND_ONLOOP Object
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

function CND_ONLOOP() {
}
CND_ONLOOP.prototype = {
    eva1: function (rhPtr, hoPtr) {
        var pExp = this.evtParams[0];
        if (pExp.tokens.length == 2 && pExp.tokens[0].code == ((3 << 16) | 65535) && pExp.tokens[1].code == 0) {
            if (CServices.compareStringsIgnoreCase(rhPtr.rh4CurrentFastLoop, pExp.tokens[0].string)) {
                return true;
            }
            return false;
        }

        var pName = rhPtr.get_EventExpressionString(pExp);
        if (CServices.compareStringsIgnoreCase(rhPtr.rh4CurrentFastLoop, pName) == false) {
            return false;
        }
        rhPtr.rhEvtProg.rh2ActionOn = false;
        return true;
    },
    eva2: function (rhPtr) {
        return false;
    }
}

//ACT_SPRREPLACECOLOR Object
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

function ACT_SPRREPLACECOLOR() {
    this.replace = null;
}

ACT_SPRREPLACECOLOR.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        pHo.roa.animIn(0);

        //get old color
        var oldColor;
        if (this.evtParams[0].code == 24) {
            oldColor = this.evtParams[0].color;
        } else {
            oldColor = rhPtr.get_EventExpressionInt(this.evtParams[0]);
            oldColor = CServices.swapRGB(oldColor);
        }

        //get new color
        var newColor;
        if (this.evtParams[1].code == 24) {
            newColor = this.evtParams[1].color;
        } else {
            newColor = rhPtr.get_EventExpressionInt(this.evtParams[1]);
            newColor = CServices.swapRGB(newColor);
        }

        //perform the replace
        if (oldColor != newColor) {
            if (this.replace == null) {
                //create singleton instance for this
                this.replace = new CReplaceColor();
            }
            this.replace.replaceColor(rhPtr, pHo, newColor, oldColor);
        }
    }
}

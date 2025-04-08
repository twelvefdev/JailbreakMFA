//ACT_EXTSETEFFECT Object
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

function ACT_EXTSETEFFECT() {
}
ACT_EXTSETEFFECT.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        var effectName = this.evtParams[0].string;
        var effect = CRSpr.BOP_COPY;
        if (effectName != null && effectName.length != 0) {
            if (effectName == "Add") {
                effect = CRSpr.BOP_ADD;
            } else if (effectName == "Invert") {
                effect = CRSpr.BOP_INVERT;
            } else if (effectName == "Sub") {
                effect = CRSpr.BOP_SUB;
            } else if (effectName == "Mono") {
                effect = CRSpr.BOP_MONO;
            } else if (effectName == "Blend") {
                effect = CRSpr.BOP_BLEND;
            } else if (effectName == "XOR") {
                effect = CRSpr.BOP_XOR;
            } else if (effectName == "OR") {
                effect = CRSpr.BOP_OR;
            } else if (effectName == "AND") {
                effect = CRSpr.BOP_AND;
            }
        }
        pHo.ros.modifSpriteEffect(effect, pHo.ros.rsEffectParam);
    }
}

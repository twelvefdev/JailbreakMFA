//ACT_EXTSETRGBCOEF Object
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

function ACT_EXTSETRGBCOEF() {
}
ACT_EXTSETRGBCOEF.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        if (pHo.ros == null) {
            return;
        }

        var argb = rhPtr.get_EventExpressionInt(this.evtParams[0]);
        var wasSemi = ((pHo.ros.rsEffect & CRSpr.BOP_RGBAFILTER) == 0);
        pHo.ros.rsEffect = (pHo.ros.rsEffect & CRSpr.BOP_MASK) | CRSpr.BOP_RGBAFILTER;

        var rgbaCoeff = pHo.ros.rsEffectParam;
        var alphaPart;
        if (wasSemi) {
            if (pHo.ros.rsEffectParam == -1) {
                alphaPart = 0xFF000000;
            } else {
                alphaPart = (255 - (pHo.ros.rsEffectParam * 2)) << 24;
            }
        }
        else {
            alphaPart = rgbaCoeff & 0xFF000000;
        }

        var rgbPart = CServices.swapRGB(argb & 0x00FFFFFF);
        var filter = alphaPart | rgbPart;
        pHo.ros.rsEffectParam = filter;

        pHo.ros.modifSpriteEffect(pHo.ros.rsEffect, pHo.ros.rsEffectParam);
    }
}

//ACT_SPRSETANGLE Object
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

function ACT_SPRSETANGLE() {
}
ACT_SPRSETANGLE.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        var nAngle = rhPtr.get_EventExpressionInt(this.evtParams[0]);
        nAngle %= 360;
        if (nAngle < 0) {
            nAngle += 360;
        }

        // If physical movement
        var pMBase = rhPtr.GetMBase(pHo);
        if (pMBase) {
            pMBase.setAngle(nAngle);
            return;
        }

        var bAntiA = false;
        if (rhPtr.get_EventExpressionInt(this.evtParams[1]) != 0) {
            bAntiA = true;
        }

        var bOldAntiA = false;
        if ((pHo.ros.rsFlags & CRSpr.RSFLAG_ROTATE_ANTIA) != 0) {
            bOldAntiA = true;
        }
        if (pHo.roc.rcAngle != nAngle || bOldAntiA != bAntiA) {
            pHo.roc.rcAngle = nAngle;
            pHo.ros.rsFlags &= ~CRSpr.RSFLAG_ROTATE_ANTIA;
            if (bAntiA) {
                pHo.ros.rsFlags |= CRSpr.RSFLAG_ROTATE_ANTIA;
            }
            pHo.roc.rcChanged = true;

            //update the bounds of the image to reflect this angle
            var ifo = pHo.hoAdRunHeader.rhApp.imageBank.getImageInfoEx(pHo.roc.rcImage, pHo.roc.rcAngle, pHo.roc.rcScaleX, pHo.roc.rcScaleY);
            pHo.hoImgWidth = ifo.width;
            pHo.hoImgHeight = ifo.height;
            pHo.hoImgXSpot = ifo.xSpot;
            pHo.hoImgYSpot = ifo.ySpot;
        }
    }
}

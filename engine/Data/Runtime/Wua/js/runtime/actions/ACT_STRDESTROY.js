//ACT_STRDESTROY Object
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

function ACT_STRDESTROY() {
}
ACT_STRDESTROY.prototype = {
    execute: function (rhPtr) {
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo != null) {
            if ((pHo.rsHidden & CRun.COF_FIRSTTEXT) != 0) {
                pHo.ros.obHide();
                pHo.ros.rsFlags &= ~CRSpr.RSFLAG_VISIBLE;
                pHo.hoFlags |= CObject.HOF_NOCOLLISION;
            }
            else {
                pHo.hoFlags |= CObject.HOF_DESTROYED;
                rhPtr.addToDestroyList(pHo.hoNumber);
            }
        }
    }
}

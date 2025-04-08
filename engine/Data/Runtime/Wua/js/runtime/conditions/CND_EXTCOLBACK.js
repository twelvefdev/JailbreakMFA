﻿//CND_EXTCOLBACK Object
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

function CND_EXTCOLBACK() {
    CCnd.call(this);
}

CND_EXTCOLBACK.prototype = {
    eva1: function (rhPtr, hoPtr) {
        if (this.compute_NoRepeat(hoPtr)) {
            rhPtr.rhEvtProg.evt_AddCurrentObject(hoPtr);
            return true;
        }

        var pEvg = rhPtr.rhEvtProg.rhEventGroup;
        if ((pEvg.evgFlags & CEventGroup.EVGFLAGS_STOPINGROUP) == 0) {
            return false;
        }
        rhPtr.rhEvtProg.rh3DoStop = true;
        return true;
    },
    eva2: function (rhPtr) {
        return CCnd.negate(this, this.evaObject(rhPtr, this));
    },
    evaObjectRoutine: function (hoPtr) {
        return hoPtr.hoAdRunHeader.colMask_TestObject_IXY(hoPtr, hoPtr.roc.rcImage, hoPtr.roc.rcAngle, hoPtr.roc.rcScaleX, hoPtr.roc.rcScaleY, hoPtr.hoX, hoPtr.hoY, 0, CColMask.CM_TEST_PLATFORM);
    }
};

//setup inheritance using extend
CServices.extend(CCnd, CND_EXTCOLBACK);
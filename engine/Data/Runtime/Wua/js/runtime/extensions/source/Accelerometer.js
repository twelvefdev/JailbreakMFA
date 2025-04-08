//----------------------------------------------------------------------------------
//
// CRUNACCELEROMETER iPhone accelerometers
//
//----------------------------------------------------------------------------------
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
CRunAccelerometer.EXP_XDIRECT = 0;
CRunAccelerometer.EXP_YDIRECT = 1;
CRunAccelerometer.EXP_ZDIRECT = 2;
CRunAccelerometer.EXP_XGRAVITY = 3;
CRunAccelerometer.EXP_YGRAVITY = 4;
CRunAccelerometer.EXP_ZGRAVITY = 5;
CRunAccelerometer.EXP_XINSTANT = 6;
CRunAccelerometer.EXP_YINSTANT = 7;
CRunAccelerometer.EXP_ZINSTANT = 8;
CRunAccelerometer.EXP_ORIENTATION = 9;
CRunAccelerometer.CND_ORIENTATIONCHANGED = 0;
CRunAccelerometer.CND_LAST = 1;


function CRunAccelerometer() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.orientationCount = 0;
}

CRunAccelerometer.prototype = {
    //fusion
    getNumberOfConditions: function () {
        return CRunAccelerometer.CND_LAST;
    },

    createRunObject: function (file, cob, version) {
        this.orientationCount = -1;
        this.orientation = 0;
        Runtime.startAccelerometer();
        return true;
    },

    destroyRunObject: function (bFast) {
        Runtime.stopAccelerometer();
    },

    handleRunObject: function () {
        return 0;
    },

    condition: function (num, cnd) {
        switch (num) {
            case CRunAccelerometer.CND_ORIENTATIONCHANGED:
                return this.conditionOrientationChanged();
                break;
        }
        return false;
    },

    expression: function (num) {
        var ret = 0;

        switch (num) {
            case CRunAccelerometer.EXP_XDIRECT:
                ret = Runtime.accelerometerDirectX;
                break;
            case CRunAccelerometer.EXP_YDIRECT:
                ret = Runtime.accelerometerDirectY;
                break;
            case CRunAccelerometer.EXP_ZDIRECT:
                ret = Runtime.accelerometerDirectZ;
                break;
            case CRunAccelerometer.EXP_XGRAVITY:
                ret = Runtime.accelerometerGravityX;
                break;
            case CRunAccelerometer.EXP_YGRAVITY:
                ret = Runtime.accelerometerGravityY;
                break;
            case CRunAccelerometer.EXP_ZGRAVITY:
                ret = Runtime.accelerometerGravityZ;
                break;
            case CRunAccelerometer.EXP_XINSTANT:
                ret = Runtime.accelerometerInstantX;
                break;
            case CRunAccelerometer.EXP_YINSTANT:
                ret = Runtime.accelerometerInstantY;
                break;
            case CRunAccelerometer.EXP_ZINSTANT:
                ret = Runtime.accelerometerInstantZ;
                break;
            case CRunAccelerometer.EXP_ORIENTATION:
                return Runtime.deviceRotation;

        }
        return ret;
    },

    //conditions
    conditionOrientationChanged: function () {
        if ((ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 || ho.getEventCount() == this.orientationCount) {
            return true;
        }

        return false;
    },
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunAccelerometer);
//----------------------------------------------------------------------------------
//
// CRunJoystickControl : virtual joystick
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
CRunJoystickControl.ACT_STARTACCELEROMETER = 0;
CRunJoystickControl.ACT_STOPACCELEROMETER = 1;
CRunJoystickControl.ACT_STARTSTOPTOUCH = 2;
CRunJoystickControl.ACT_SETJOYPOSITION = 3;
CRunJoystickControl.ACT_SETFIRE1POSITION = 4;
CRunJoystickControl.ACT_SETFIRE2POSITION = 5;
CRunJoystickControl.ACT_SETXJOYSTICK = 6;
CRunJoystickControl.ACT_SETYJOYSTICK = 7;
CRunJoystickControl.ACT_SETXFIRE1 = 8;
CRunJoystickControl.ACT_SETYFIRE1 = 9;
CRunJoystickControl.ACT_SETXFIRE2 = 10;
CRunJoystickControl.ACT_SETYFIRE2 = 11;
CRunJoystickControl.ACT_SETJOYMASK = 12;
CRunJoystickControl.EXP_XJOYSTICK = 0;
CRunJoystickControl.EXP_YJOYSTICK = 1;
CRunJoystickControl.EXP_XFIRE1 = 2;
CRunJoystickControl.EXP_YFIRE1 = 3;
CRunJoystickControl.EXP_XFIRE2 = 4;
CRunJoystickControl.EXP_YFIRE2 = 5;
CRunJoystickControl.POS_NOTDEFINED = 0x80000000;

function CRunJoystickControl() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.accelerometer = false;
    this.touch = false;
    this.xJoystick = 0;
    this.yJoystick = 0;
    this.xFire1 = 0;
    this.yFire1 = 0;
    this.xFire2 = 0;
    this.yFire2 = 0;
}

CRunJoystickControl.prototype = {
    getNumberOfConditions: function () {
        return 0;
    },

    createRunObject: function (file, cob, version) {
        this.xJoystick = CRunJoystickControl.POS_NOTDEFINED;
        this.yJoystick = CRunJoystickControl.POS_NOTDEFINED;
        this.xFire1 = CRunJoystickControl.POS_NOTDEFINED;
        this.yFire1 = CRunJoystickControl.POS_NOTDEFINED;
        this.xFire2 = CRunJoystickControl.POS_NOTDEFINED;
        this.yFire2 = CRunJoystickControl.POS_NOTDEFINED;
        this.accelerometer = false;
        this.touch = false;

        return true;
    },

    destroyRunObject: function (fast) {
        var app = this.ho.hoAdRunHeader.rhApp;

        if (this.touch) {
            this.touch = false;
            app.stopVirtualJoystick(CVirtualJoystick.TYPE_TOUCH)
        }

        if (this.accelerometer) {
            this.accelerometer = false;
            app.stopVirtualJoystick(CVirtualJoystick.TYPE_ACCELEROMETER);
        }
    },

    action: function (num, act) {
        switch (num) {
            case CRunJoystickControl.ACT_STARTACCELEROMETER:
                this.startAccelerometer(act);
                break;
            case CRunJoystickControl.ACT_STOPACCELEROMETER:
                this.stopAccelerometer(act);
                break;
            case CRunJoystickControl.ACT_STARTSTOPTOUCH:
                this.startStopTouch(act);
                break;
            case CRunJoystickControl.ACT_SETJOYPOSITION:
                this.setJoyPosition(act);
                break;
            case CRunJoystickControl.ACT_SETFIRE1POSITION:
                this.setFire1Position(act);
                break;
            case CRunJoystickControl.ACT_SETFIRE2POSITION:
                this.setFire2Position(act);
                break;
            case CRunJoystickControl.ACT_SETXJOYSTICK:
                this.setXJoystick(act);
                break;
            case CRunJoystickControl.ACT_SETYJOYSTICK:
                this.setYJoystick(act);
                break;
            case CRunJoystickControl.ACT_SETXFIRE1:
                this.setXFire1(act);
                break;
            case CRunJoystickControl.ACT_SETYFIRE1:
                this.setYFire1(act);
                break;
            case CRunJoystickControl.ACT_SETXFIRE2:
                this.setXFire2(act);
                break;
            case CRunJoystickControl.ACT_SETYFIRE2:
                this.setYFire2(act);
                break;
            case CRunJoystickControl.ACT_SETJOYMASK:
                this.setJoyMask(act);
                break;
        }
    },

    startAccelerometer: function (act) {
        var app = this.ho.hoAdRunHeader.rhApp;

        //skip?
        if (app.parentApp != null || app.frame.virtualJoystickType != CVirtualJoystick.TYPE_EXT) {
            return;
        }

        //start accelerometer virtual joystick?
        if (this.accelerometer == false) {
            this.accelerometer = true;
            app.startVirtualJoystick(CVirtualJoystick.TYPE_ACCELEROMETER);
        }
    },

    stopAccelerometer: function (act) {
        var app = this.ho.hoAdRunHeader.rhApp;

        if (this.accelerometer == true) {
            this.accelerometer = false;
            app.stopVirtualJoystick(CVirtualJoystick.TYPE_ACCELEROMETER);
        }
    },

    startStopTouch: function (act) {
        var app = this.rh.rhApp;

        //skip?
        if (app.parentApp != null || app.frame.virtualJoystickType != CVirtualJoystick.TYPE_EXT) {
            return;
        }

        //get action params
        var joy = act.getParamExpression(this.rh, 0);
        var fire1 = act.getParamExpression(this.rh, 1);
        var fire2 = act.getParamExpression(this.rh, 2);
        var leftHanded = act.getParamExpression(this.rh, 3);

        //build flags
        var flags = 0;
        if (fire1 != 0) {
            flags = CVirtualJoystickTouch.JFLAG_FIRE1;
        }

        if (fire2 != 0) {
            flags |= CVirtualJoystickTouch.JFLAG_FIRE2;
        }

        if (joy != 0) {
            flags |= CVirtualJoystickTouch.JFLAG_JOYSTICK;
        }

        if (leftHanded != 0) {
            flags |= CVirtualJoystickTouch.JFLAG_LEFTHANDED;
        }

        if ((app.frame.html5Options & CRunFrame.HTML5FOPT_JOYSTICK_DPAD) != 0) {
            flags |= CJoystick.JFLAG_DPAD;
        }

        //are we starting or stopping?
        if ((flags & (CVirtualJoystickTouch.JFLAG_FIRE1 | CVirtualJoystickTouch.JFLAG_FIRE2 | CVirtualJoystickTouch.JFLAG_JOYSTICK)) != 0) {
            //start it
            app.startVirtualJoystick(CVirtualJoystick.TYPE_TOUCH, flags);

            if (this.xJoystick != CRunJoystickControl.POS_NOTDEFINED) {
                app.setVirtualJoystickObjectX(CVirtualJoystickTouch.JFLAG_JOYSTICK, this.xJoystick);
            } else {
                this.xJoystick = app.getVirtualJoystickObjectX(CVirtualJoystickTouch.KEY_JOYSTICK);
            }

            if (this.yJoystick != CRunJoystickControl.POS_NOTDEFINED) {
                app.setVirtualJoystickObjectY(CVirtualJoystickTouch.JFLAG_JOYSTICK, this.yJoystick);
            } else {
                this.yJoystick = app.getVirtualJoystickObjectY(CVirtualJoystickTouch.KEY_JOYSTICK);
            }

            if (this.xFire1 != CRunJoystickControl.POS_NOTDEFINED) {
                app.setVirtualJoystickObjectX(CVirtualJoystickTouch.JFLAG_FIRE1, this.xFire1);
            } else {
                this.xFire1 = app.getVirtualJoystickObjectX(CVirtualJoystickTouch.JFLAG_FIRE1);
            }

            if (this.yFire1 != CRunJoystickControl.POS_NOTDEFINED) {
                app.setVirtualJoystickObjectY(CVirtualJoystickTouch.JFLAG_FIRE1, this.yFire1);
            } else {
                this.yFire1 = app.getVirtualJoystickObjectY(CVirtualJoystickTouch.JFLAG_FIRE1);
            }

            if (this.xFire2 != CRunJoystickControl.POS_NOTDEFINED) {
                app.setVirtualJoystickObjectX(CVirtualJoystickTouch.JFLAG_FIRE2, this.xFire2);
            } else {
                this.xFire2 = app.getVirtualJoystickObjectX(CVirtualJoystickTouch.JFLAG_FIRE2);
            }

            if (this.yFire2 != CRunJoystickControl.POS_NOTDEFINED) {
                app.setVirtualJoystickObjectY(CVirtualJoystickTouch.JFLAG_FIRE2, this.yFire2);
            } else {
                this.yFire2 = app.getVirtualJoystickObjectY(CVirtualJoystickTouch.JFLAG_FIRE2);
            }
            this.touch = true;

        } else {
            //stop it
            app.stopVirtualJoystick(CVirtualJoystick.TYPE_TOUCH);
            this.touch = false;
        }
    },

    setJoyPosition: function (act) {
        var position = act.getParamPosition(this.rh, 0);
        this.xJoystick = position.x;
        this.yJoystick = position.y;
        if (this.touch && position.found) {
            this.rh.rhApp.virtualJoystick.setObjectX(CVirtualJoystickTouch.JFLAG_JOYSTICK, this.xJoystick);
            this.rh.rhApp.virtualJoystick.setObjectY(CVirtualJoystickTouch.JFLAG_JOYSTICK, this.yJoystick);
        }
    },

    setFire1Position: function (act) {
        var position = act.getParamPosition(this.rh, 0);
        this.xFire1 = position.x;
        this.yFire1 = position.y;
        if (this.touch && position.found) {
            this.rh.rhApp.virtualJoystick.setObjectX(CVirtualJoystickTouch.JFLAG_FIRE1, this.xFire1);
            this.rh.rhApp.virtualJoystick.setObjectY(CVirtualJoystickTouch.JFLAG_FIRE1, this.yFire1);
        }
    },

    setFire2Position: function (act) {
        var position = act.getParamPosition(this.rh, 0);
        this.xFire2 = position.x;
        this.yFire2 = position.y;
        if (this.touch && position.found) {
            this.rh.rhApp.virtualJoystick.setObjectX(CVirtualJoystickTouch.JFLAG_FIRE2, this.xFire2);
            this.rh.rhApp.virtualJoystick.setObjectY(CVirtualJoystickTouch.JFLAG_FIRE2, this.yFire2);
        }
    },

    setXJoystick: function (act) {
        this.xJoystick = act.getParamExpression(this.rh, 0);
        if (this.touch) {
            this.rh.rhApp.virtualJoystick.setObjectX(CVirtualJoystickTouch.JFLAG_JOYSTICK, this.xJoystick);
        }
    },

    setYJoystick: function (act) {
        this.yJoystick = act.getParamExpression(this.rh, 0);
        if (this.touch) {
            this.rh.rhApp.virtualJoystick.setObjectY(CVirtualJoystickTouch.JFLAG_JOYSTICK, this.yJoystick);
        }
    },

    setXFire1: function (act) {
        this.xFire1 = act.getParamExpression(this.rh, 0);
        if (this.touch) {
            this.rh.rhApp.virtualJoystick.setObjectX(CVirtualJoystickTouch.JFLAG_FIRE1, this.xFire1);
        }
    },

    setYFire1: function (act) {
        this.yFire1 = act.getParamExpression(this.rh, 0);
        if (this.touch) {
            this.rh.rhApp.virtualJoystick.setObjectY(CVirtualJoystickTouch.JFLAG_FIRE1, this.yFire1);
        }
    },

    setXFire2: function (act) {
        this.xFire2 = act.getParamExpression(this.rh, 0);
        if (this.touch) {
            this.rh.rhApp.virtualJoystick.setObjectX(CVirtualJoystickTouch.JFLAG_FIRE2, this.xFire2);
        }
    },

    setYFire2: function (act) {
        this.yFire2 = act.getParamExpression(this.rh, 0);
        if (this.touch) {
            this.rh.rhApp.virtualJoystick.setObjectX(CVirtualJoystickTouch.JFLAG_FIRE2, this.yFire2);
        }
    },

    setJoyMask: function (act) {
        ho.hoAdRunHeader.rhJoystickMask = act.getParamExpression(this.rh, 0);
    },

    expression: function (num) {
        switch (num) {
            case CRunJoystickControl.EXP_XJOYSTICK:
                return this.xJoystick;
            case CRunJoystickControl.EXP_YJOYSTICK:
                return this.yJoystick;
            case CRunJoystickControl.EXP_XFIRE1:
                return this.xFire1;
            case CRunJoystickControl.EXP_YFIRE1:
                return this.yFire1;
            case CRunJoystickControl.EXP_XFIRE2:
                return this.xFire2;
            case CRunJoystickControl.EXP_YFIRE2:
                return this.yFire2;
        }
        return 0;
    }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunJoystickControl);
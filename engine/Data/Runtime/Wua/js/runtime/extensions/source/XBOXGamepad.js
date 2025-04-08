//----------------------------------------------------------------------------------
//
// CRunXBOXGamepad: XBOXGamepad Object
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

CRunXBOXGamepad.CND_ISCONNECTED = 0;
CRunXBOXGamepad.CND_BUTTONA = 1;
CRunXBOXGamepad.CND_BUTTONB = 2;
CRunXBOXGamepad.CND_BUTTONX = 3;
CRunXBOXGamepad.CND_BUTTONY = 4;
CRunXBOXGamepad.CND_BUTTONBACK = 5;
CRunXBOXGamepad.CND_BUTTONBIGBUTTON = 6;
CRunXBOXGamepad.CND_BUTTONLEFTSHOULDER = 7;
CRunXBOXGamepad.CND_BUTTONLEFTSTICK = 8;
CRunXBOXGamepad.CND_BUTTONRIGHTSHOULDER = 9;
CRunXBOXGamepad.CND_BUTTONRIGHTSTICK = 10;
CRunXBOXGamepad.CND_BUTTONSTART = 11;
CRunXBOXGamepad.CND_DPADUP = 12;
CRunXBOXGamepad.CND_DPADDOWN = 13;
CRunXBOXGamepad.CND_DPADLEFT = 14;
CRunXBOXGamepad.CND_DPADRIGHT = 15;
CRunXBOXGamepad.CND_BUTTONS = 16;
CRunXBOXGamepad.CND_ANYBUTTON = 17;
CRunXBOXGamepad.CND_LAST = 18;

CRunXBOXGamepad.ACT_VIBRATE = 0;
CRunXBOXGamepad.ACT_LAST = 1;

CRunXBOXGamepad.EXP_STICKLEFTH = 0;
CRunXBOXGamepad.EXP_STICKLEFTV = 1;
CRunXBOXGamepad.EXP_STICKRIGHTH = 2;
CRunXBOXGamepad.EXP_STICKRIGHTV = 3;
CRunXBOXGamepad.EXP_TRIGGERLEFT = 4;
CRunXBOXGamepad.EXP_TRIGGERRIGHT = 5;
CRunXBOXGamepad.EXP_BUTTONA = 6;
CRunXBOXGamepad.EXP_BUTTONB = 7;
CRunXBOXGamepad.EXP_BUTTONX = 8;
CRunXBOXGamepad.EXP_BUTTONY = 9;
CRunXBOXGamepad.EXP_BUTTONBACK = 10;
CRunXBOXGamepad.EXP_BUTTONBIGBUTTON = 11;
CRunXBOXGamepad.EXP_BUTTONLEFTSHOULDER = 12;
CRunXBOXGamepad.EXP_BUTTONLEFTSTICK = 13;
CRunXBOXGamepad.EXP_BUTTONRIGHTSHOULDER = 14;
CRunXBOXGamepad.EXP_BUTTONRIGHTSTICK = 15;
CRunXBOXGamepad.EXP_BUTTONSTART = 16;
CRunXBOXGamepad.EXP_DPADUP = 17;
CRunXBOXGamepad.EXP_DPADDOWN = 18;
CRunXBOXGamepad.EXP_DPADLEFT = 19;
CRunXBOXGamepad.EXP_DPADRIGHT = 20;
CRunXBOXGamepad.EXP_BUTTONS = 21;
CRunXBOXGamepad.EXP_BUTTON = 22;
CRunXBOXGamepad.EXP_LAST = 23;

CRunXBOXGamepad.UNKNOWN = -1;
CRunXBOXGamepad.A = 0;
CRunXBOXGamepad.B = 1;
CRunXBOXGamepad.X = 2;
CRunXBOXGamepad.Y = 3;
CRunXBOXGamepad.SHOULDER_LEFT = 4;
CRunXBOXGamepad.SHOULDER_RIGHT = 5;
CRunXBOXGamepad.BACK = 6;
CRunXBOXGamepad.MENU = 7;
CRunXBOXGamepad.THUMB_LEFT = 8;
CRunXBOXGamepad.THUMB_RIGHT = 9;
CRunXBOXGamepad.UP = 10;
CRunXBOXGamepad.DOWN = 11;
CRunXBOXGamepad.LEFT = 12;
CRunXBOXGamepad.RIGHT = 13;
CRunXBOXGamepad.BUTTON_COUNT = 14;

function CRunXBOXGamepad() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.flags = 0;
    this.gamepadFlags = new Array(4);
    this.gamepadFlagsTotal = 0;
}

CRunXBOXGamepad.prototype = {
    //fusion
    getNumberOfConditions: function () {
        return CRunXBOXGamepad.CND_LAST;
    },

    createRunObject: function (file, cob, version) {
        this.ho.hoX = cob.cobX;
        this.ho.hoY = cob.cobY;
        this.flags = file.readAInt();
        return true;
    },

    destroyRunObject: function (bFast) {
    },

    handleRunObject: function () {
        return 0;
    },

    //internal
    _calculateGamepadFlags:function(gamepads) {
        this.gamepadFlagsTotal = 0;

        if ((gamepads & 8) != 0) {
            this.gamepadFlags[this.gamepadFlagsTotal++] = 3;
        }

        if ((gamepads & 4) != 0) {
            this.gamepadFlags[this.gamepadFlagsTotal++] = 2;
        }

        if ((gamepads & 2) != 0) {
            this.gamepadFlags[this.gamepadFlagsTotal++] = 1;
        }

        if ((gamepads & 1) != 0) {
            this.gamepadFlags[this.gamepadFlagsTotal++] = 0;
        }
    },

    _translateButtonId: function(id) {
        switch (id) {
            case CRunXBOXGamepad.A:
                return CGamepad.A;
            case CRunXBOXGamepad.B:
                return CGamepad.B;
            case CRunXBOXGamepad.X:
                return CGamepad.X;
            case CRunXBOXGamepad.Y:
                return CGamepad.Y;
            case CRunXBOXGamepad.SHOULDER_LEFT:
                return CGamepad.SHOULDER_LEFT;
            case CRunXBOXGamepad.SHOULDER_RIGHT:
                return CGamepad.SHOULDER_RIGHT;
            case CRunXBOXGamepad.BACK:
                return CGamepad.BACK;
            case CRunXBOXGamepad.MENU:
                return CGamepad.MENU;
            case CRunXBOXGamepad.THUMB_LEFT:
                return CGamepad.THUMB_LEFT;
            case CRunXBOXGamepad.THUMB_RIGHT:
                return CGamepad.THUMB_RIGHT;
            case CRunXBOXGamepad.UP:
                return CGamepad.UP;
            case CRunXBOXGamepad.DOWN:
                return CGamepad.DOWN;
            case CRunXBOXGamepad.LEFT:
                return CGamepad.LEFT;
            case CRunXBOXGamepad.RIGHT:
                return CGamepad.RIGHT;
        }

        return CRunXBOXGamepad.UNKNOWN;
    },

    _isConnected: function(gamepad) {
        if (gamepad < 0 || gamepad > 3) {
            return false;
        }
        var gamepad = this.rh.rhApp.getGamepad(gamepad);
        return gamepad != null && gamepad.connected;
    },

    _isButtonPressed: function (gamepads, button) {
        //check skip
        if (gamepads == 0 || button < 0 || button >= CGamepad.BUTTON_COUNT) {
            return false;
        }

        //get local values
        var app = this.rh.rhApp;

        //get the gamepads to test
        this._calculateGamepadFlags(gamepads);

        var gamepad;
        for (var index = 0; index < this.gamepadFlagsTotal; index++) {
            gamepad = app.getGamepad(this.gamepadFlags[index]);

            //check invalid gamepad
            if (gamepad == null || !gamepad.connected) {
                continue;
            }

            //test if button is pressed
            if (button === null) {
                //any button
                if (gamepad.anyButtonPressed()) {
                    return true;
                }
            } else {
                //specified button
                if (gamepad.buttonPressed(button)) {
                    return true;
                }
            }
        }

        //nope
        return false;
    },

    _getAxisValue: function(gamepads, axis) {
        //check skip
        if (gamepads == 0 || axis < 0 || axis >= CGamepad.AXIS_COUNT) {
            return false;
        }

        var app = this.rh.rhApp;

        //get the gamepads to test
        this._calculateGamepadFlags(gamepads);

        var gamepad;
        var value = 0.0;
        for (var index = 0; index < this.gamepadFlagsTotal; index++) {
            gamepad = app.getGamepad(this.gamepadFlags[index]);

            //check invalid gamepad
            if (gamepad == null || !gamepad.connected) {
                continue;
            }

            //check value of axis
            if (gamepad.axisStrength(axis) > Math.abs(value)) {
                value = gamepad.axisValue(axis);
            }
        }

        //convert value into range fusion understands
        switch (axis) {
            case CGamepad.THUMB_LEFT_X:
                return value * 100;
            case CGamepad.THUMB_LEFT_Y:
                return value * -100;
            case CGamepad.THUMB_RIGHT_X:
                return value * 100;
            case CGamepad.THUMB_RIGHT_Y:
                return value * -100;
            case CGamepad.TRIGGER_LEFT:
                return value * 100;
            case CGamepad.TRIGGER_RIGHT:
                return value * 100;
        }

        //nope
        return 0.0;
    },

    _getButtonPressed: function(gamepads) {
        //check skip
        if (gamepads == 0) {
            return CRunXBOXGamepad.UNKNOWN;
        }

        //get local values
        var app = this.rh.rhApp;

        //get the gamepads to test
        this._calculateGamepadFlags(gamepads);

        var gamepad;
        var buttonResult = CRunXBOXGamepad.UNKNOWN;
        var buttonIndex;
        for (var index = 0; index < this.gamepadFlagsTotal; index++) {
            gamepad = app.getGamepad(this.gamepadFlags[index]);

            //check invalid gamepad
            if (gamepad == null || !gamepad.connected) {
                continue;
            }

            //iterate over buttons in reverse order (apparently button A is the most important)
            for (buttonIndex = CRunXBOXGamepad.BUTTON_COUNT - 1; buttonIndex >= 0; buttonIndex--) {
                if (gamepad.buttonPressed(this._translateButtonId(buttonIndex))) {
                    buttonResult = buttonIndex;
                }
            }
        }

        //yup
        return buttonResult;
    },

    _vibrate: function(gamepads, left, right, duration) {
        //check skip
        if (gamepads == 0) {
            return;
        }

        //get local values
        var app = this.rh.rhApp;
        var windowsGamepads = Windows.Gaming.Input.Gamepad.gamepads;

        //get the gamepads to test
        this._calculateGamepadFlags(gamepads);

        var gamepad;
        for (var index = 0; index < this.gamepadFlagsTotal; index++) {
            gamepad = app.getGamepad(this.gamepadFlags[index]);

            //check invalid gamepad
            if (gamepad == null || !gamepad.connected) {
                continue;
            }

            //let the gamepad do the hard work
            gamepad.vibrate(left, right, duration);
        }
    },

    //conditions
    condition: function (num, cnd) {
        switch (num) {
            case CRunXBOXGamepad.CND_ISCONNECTED:
                return this._isConnected(cnd.getParamExpression(this.rh, 0));

            case CRunXBOXGamepad.CND_BUTTONA:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.A);

            case CRunXBOXGamepad.CND_BUTTONB:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.B);

            case CRunXBOXGamepad.CND_BUTTONX:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.X);

            case CRunXBOXGamepad.CND_BUTTONY:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.Y);

            case CRunXBOXGamepad.CND_BUTTONBACK:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.BACK);

            case CRunXBOXGamepad.CND_BUTTONBIGBUTTON:
                //generally cant press big button
                return false;

            case CRunXBOXGamepad.CND_BUTTONLEFTSHOULDER:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.SHOULDER_LEFT);

            case CRunXBOXGamepad.CND_BUTTONLEFTSTICK:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.THUMB_LEFT);

            case CRunXBOXGamepad.CND_BUTTONRIGHTSHOULDER:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.SHOULDER_RIGHT);

            case CRunXBOXGamepad.CND_BUTTONRIGHTSTICK:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.THUMB_RIGHT);

            case CRunXBOXGamepad.CND_BUTTONSTART:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.MENU);

            case CRunXBOXGamepad.CND_DPADUP:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.UP);

            case CRunXBOXGamepad.CND_DPADDOWN:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.DOWN);

            case CRunXBOXGamepad.CND_DPADLEFT:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.LEFT);

            case CRunXBOXGamepad.CND_DPADRIGHT:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), CGamepad.RIGHT);

            case CRunXBOXGamepad.CND_BUTTONS:
                return false;

            case CRunXBOXGamepad.CND_ANYBUTTON:
                return this._isButtonPressed(cnd.getParamExpression(this.rh, 0), null);
        }
    },

    //actions
    action: function (num, act) {
        switch (num) {
            case CRunXBOXGamepad.ACT_VIBRATE:
                this._vibrate(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1) / 100.0, act.getParamExpression(this.rh, 2) / 100.0, act.getParamExpression(this.rh, 3))
                break;
        }
    },

    //expressions
    expression: function (num) {
        switch (num) {
            case CRunXBOXGamepad.EXP_STICKLEFTH:
                return this._getAxisValue(this.ho.getExpParam(), CGamepad.THUMB_LEFT_X);

            case CRunXBOXGamepad.EXP_STICKLEFTV:
                return this._getAxisValue(this.ho.getExpParam(), CGamepad.THUMB_LEFT_Y);

            case CRunXBOXGamepad.EXP_STICKRIGHTH:
                return this._getAxisValue(this.ho.getExpParam(), CGamepad.THUMB_RIGHT_X);

            case CRunXBOXGamepad.EXP_STICKRIGHTV:
                return this._getAxisValue(this.ho.getExpParam(), CGamepad.THUMB_RIGHT_Y);

            case CRunXBOXGamepad.EXP_TRIGGERLEFT:
                return this._getAxisValue(this.ho.getExpParam(), CGamepad.TRIGGER_LEFT);

            case CRunXBOXGamepad.EXP_TRIGGERRIGHT:
                return this._getAxisValue(this.ho.getExpParam(), CGamepad.TRIGGER_RIGHT);

            case CRunXBOXGamepad.EXP_BUTTONA:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.A) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONB:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.B) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONX:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.X) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONY:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.Y) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONBACK:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.BACK) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONBIGBUTTON:
                //generally cant press big button
                return 0;

            case CRunXBOXGamepad.EXP_BUTTONLEFTSHOULDER:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.SHOULDER_LEFT) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONLEFTSTICK:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.THUMB_LEFT) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONRIGHTSHOULDER:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.SHOULDER_RIGHT) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONRIGHTSTICK:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.THUMB_RIGHT) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONSTART:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.MENU) ? 1 : 0;

            case CRunXBOXGamepad.EXP_DPADUP:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.UP) ? 1 : 0;

            case CRunXBOXGamepad.EXP_DPADDOWN:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.DOWN) ? 1 : 0;

            case CRunXBOXGamepad.EXP_DPADLEFT:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.LEFT) ? 1 : 0;

            case CRunXBOXGamepad.EXP_DPADRIGHT:
                return this._isButtonPressed(this.ho.getExpParam(), CGamepad.RIGHT) ? 1 : 0;

            case CRunXBOXGamepad.EXP_BUTTONS:
                return this._isButtonPressed(this.ho.getExpParam(), this._translateButtonId(this.ho.getExpParam())) ? 1 : 0

            case CRunXBOXGamepad.EXP_BUTTON:
                return this._getButtonPressed(this.ho.getExpParam());
        }
    },
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunXBOXGamepad);
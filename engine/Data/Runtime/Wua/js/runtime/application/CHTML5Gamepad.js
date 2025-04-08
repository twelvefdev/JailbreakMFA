// CHTML5Gamepad object
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

//constants
CHTML5Gamepad.AXIS_THRESHOLD = 0.5;//the amount the axis has to be pushed in order to trigger (must be in range of 0.0 -> 1.0)

CHTML5Gamepad.IDLE = 0;
CHTML5Gamepad.HIT = 1;
CHTML5Gamepad.HELD = 2;
CHTML5Gamepad.RELEASED = 3;

CHTML5Gamepad.UP = 0;
CHTML5Gamepad.DOWN = 1;
CHTML5Gamepad.LEFT = 2;
CHTML5Gamepad.RIGHT = 3;
CHTML5Gamepad.BUTTON_1 = 4;
CHTML5Gamepad.BUTTON_2 = 5;
CHTML5Gamepad.BUTTON_3 = 6;
CHTML5Gamepad.BUTTON_4 = 7;

//the layout is based on: https://w3c.github.io/gamepad/#remapping
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_1 = 0;
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_2 = 1;
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_3 = 2;
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_4 = 3;
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_UP = 12;
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_DOWN = 13;
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_LEFT = 14;
CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_RIGHT = 15;
CHTML5Gamepad.STANDARD_GAMEPAD_AXIS_LEFT_VERTICAL = 1;
CHTML5Gamepad.STANDARD_GAMEPAD_AXIS_LEFT_HORIZONTAL = 0;

//class
function CHTML5Gamepad() {
    this.connected = false;

    //create inputs (these will process html5 gamepad snapshot and then update individual state slots in the gamepad object)
    this.inputs = [
        //directions
        new CHTML5GamepadInputDirection(CHTML5Gamepad.UP, CHTML5Gamepad.STANDARD_GAMEPAD_AXIS_LEFT_VERTICAL, -1.0, -CHTML5Gamepad.AXIS_THRESHOLD, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_UP),
        new CHTML5GamepadInputDirection(CHTML5Gamepad.DOWN, CHTML5Gamepad.STANDARD_GAMEPAD_AXIS_LEFT_VERTICAL, CHTML5Gamepad.AXIS_THRESHOLD, 1.0, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_DOWN),
        new CHTML5GamepadInputDirection(CHTML5Gamepad.LEFT, CHTML5Gamepad.STANDARD_GAMEPAD_AXIS_LEFT_HORIZONTAL, -1.0, -CHTML5Gamepad.AXIS_THRESHOLD, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_LEFT),
        new CHTML5GamepadInputDirection(CHTML5Gamepad.RIGHT, CHTML5Gamepad.STANDARD_GAMEPAD_AXIS_LEFT_HORIZONTAL, CHTML5Gamepad.AXIS_THRESHOLD, 1.0, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_RIGHT),

        //buttons
        new CHTML5GamepadInputButton(CHTML5Gamepad.BUTTON_1, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_1),
        new CHTML5GamepadInputButton(CHTML5Gamepad.BUTTON_2, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_2),
        new CHTML5GamepadInputButton(CHTML5Gamepad.BUTTON_3, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_3),
        new CHTML5GamepadInputButton(CHTML5Gamepad.BUTTON_4, CHTML5Gamepad.STANDARD_GAMEPAD_BUTTON_4),
    ];

    //create states array
    this.states = new Array(8);
    for (var index = 0; index < this.states.length; index++) {
        this.states[index] = {
            owner: null,
            state: CHTML5Gamepad.IDLE,
        }
    }
}

//methods
CHTML5Gamepad.prototype = {
    //events
    onConnect: function () {
        //newly connected gamepad
        this.connected = true;

        //connect all inputs
        for (index = 0; index < this.inputs.length; index++) {
            this.inputs[index].onConnect(this);
        }
    },

    onDisconnect: function () {
        //gamepad is disconnecting
        this.connected = false;

        //clear all states
        var index
        for (index = 0; index < this.states.length; index++) {
            this.states[index] = CHTML5Gamepad.IDLE;
        }

        //disconnect all inputs
        for (index = 0; index < this.inputs.length; index++) {
            this.inputs[index].onDisconnect(this);
        }
    },

    onUpdate: function (snapshot) {
        //update the gamepad (this means it is still connected)
        var index;
        var state;
        var input;

        //release states
        for (index = 0; index < this.states.length; index++) {
            state = this.states[index];
            if (state.state == CHTML5Gamepad.RELEASED) {
                state.state = CHTML5Gamepad.IDLE;
            }
        }

        //update inputs
        for (index = 0; index < this.inputs.length; index++) {
            input = this.inputs[index];

            //let the input update its self
            input.onUpdate(this, snapshot);
        }
    },

    //internal
    setHit: function (owner, index) {
        //hit can always take ownership of the state
        var state = this.states[index];

        state.owner = owner;
        state.state = CHTML5Gamepad.HIT;
    },

    setHeld: function (owner, index) {
        //only owner can set held
        var state = this.states[index];

        if (owner == state.owner) {
            state.state = CHTML5Gamepad.HELD;
        }
    },

    setReleased: function (owner, index) {
        //only owner can set released
        var state = this.states[index];

        if (owner == state.owner) {
            state.owner = null;
            state.state = CHTML5Gamepad.RELEASED;
        }
    },
};
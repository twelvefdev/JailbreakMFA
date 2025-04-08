// CHTML5GamepadInputButton object
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

//class
function CHTML5GamepadInputButton(index, button) {
    this.index = index;
    this.button = button;
    this.state = CHTML5Gamepad.IDLE;
}

CHTML5GamepadInputButton.prototype = CServices.extend(new CHTML5GamepadInput(), {
    onDisconnect: function (gamepad) {
        this.state = CHTML5Gamepad.IDLE;
    },

    onUpdate: function (gamepad, snapshot) {
        //update
        var snapshotButton = snapshot.buttons[this.button];

        //release own state from previous update
        if (this.state == CHTML5Gamepad.RELEASED) {
            this.state = CHTML5Gamepad.IDLE;
        }

        //process more refined states
        if (this.state == CHTML5Gamepad.IDLE) {
            //look for hit
            if (snapshotButton.pressed) {
                //hit!
                this.state = CHTML5Gamepad.HIT;
                gamepad.setHit(this, this.index);
            }
        } else {
            //look for held or released
            if (snapshotButton.pressed) {
                //held
                this.state = CHTML5Gamepad.HELD;
                gamepad.setHeld(this, this.index);
            } else {
                //released
                this.state = CHTML5Gamepad.RELEASED;
                gamepad.setReleased(this, this.index);
            }
        }
    },
});
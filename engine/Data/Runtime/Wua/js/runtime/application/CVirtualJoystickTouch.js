﻿// CVirtualJoystickTouch object
// ----------------------------------------------------------
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

CVirtualJoystickTouch.KEY_JOYSTICK = 0;
CVirtualJoystickTouch.KEY_FIRE1 = 1;
CVirtualJoystickTouch.KEY_FIRE2 = 2;
CVirtualJoystickTouch.KEY_NONE = -1;
CVirtualJoystickTouch.MAX_TOUCHES = 3;
CVirtualJoystickTouch.JFLAG_JOYSTICK = 0x0001;
CVirtualJoystickTouch.JFLAG_FIRE1 = 0x0002;
CVirtualJoystickTouch.JFLAG_FIRE2 = 0x0004;
CVirtualJoystickTouch.JFLAG_LEFTHANDED = 0x0008;
CVirtualJoystickTouch.JFLAG_DPAD = 0x0010;
CVirtualJoystickTouch.JPOS_NOTDEFINED = 0x80000000;
CVirtualJoystickTouch.JOY_ANGLEGAP = 70;
CVirtualJoystickTouch.DEADZONE = 0.25;

function CVirtualJoystickTouch(app, flags) {
    //call chain
    CVirtualJoystick.call(this, app, flags);

    //call self
    this.joyBack = null;
    this.joyFront = null;
    this.joyUp = null;
    this.joyUpD = null;
    this.joyDown = null;
    this.joyDownD = null;
    this.joyLeft = null;
    this.joyLeftD = null;
    this.joyRight = null;
    this.joyRightD = null;
    this.fire1U = null;
    this.fire2U = null;
    this.fire1D = null;
    this.fire2D = null;
    this.imagesX = new Array(3);
    this.imagesY = new Array(3);
    this.joystickX = 0;
    this.joystickY = 0;
    this.state = 0;
    this.flags = flags;
    this.touches = new Array(3);
    this.loadedImages = false;
    this.loadedDpadImages = false;
    this.joydeadzone = 0;
    this.joyanglezone = 0;
    this.joyradsize = 0;

    //load images
    if (!this.loadedImages) {
        this.loadedImages = true;
        this.joyBack = CImage.createFromFile(this.app, "joyback.png");
        this.joyFront = CImage.createFromFile(this.app, "joyfront.png");
        this.fire1U = CImage.createFromFile(this.app, "fire1U.png");
        this.fire2U = CImage.createFromFile(this.app, "fire2U.png");
        this.fire1D = CImage.createFromFile(this.app, "fire1D.png");
        this.fire2D = CImage.createFromFile(this.app, "fire2D.png");
    }
    if (!this.loadedDpadImages && (this.app.frame.html5Options & CRunFrame.HTML5FOPT_JOYSTICK_DPAD) != 0) {
        this.loadedDpadImages = true;
        this.joyUp = CImage.createFromFile(this.app, "joyup.png");
        this.joyUpD = CImage.createFromFile(this.app, "joyupd.png");
        this.joyDown = CImage.createFromFile(this.app, "joydown.png");
        this.joyDownD = CImage.createFromFile(this.app, "joydownd.png");
        this.joyLeft = CImage.createFromFile(this.app, "joyleft.png");
        this.joyLeftD = CImage.createFromFile(this.app, "joyleftd.png");
        this.joyRight = CImage.createFromFile(this.app, "joyright.png");
        this.joyRightD = CImage.createFromFile(this.app, "joyrightd.png");
    }

    //do some setup
    this._setupJoystick();
}

CVirtualJoystickTouch.prototype = {
    //constructor/destructor
    free: function () {
        //call chain
        CVirtualJoystick.prototype.free.call(this);

        //call self
        if (this.joyBack == null) {
            this.joyBack.free();
            this.joyBack = null;
        }

        if (this.joyFront == null) {
            this.joyFront.free();
            this.joyFront = null;
        }

        if (this.joyUp == null) {
            this.joyUp.free();
            this.joyUp = null;
        }

        if (this.joyUpD == null) {
            this.joyUpD.free();
            this.joyUpD = null;
        }

        if (this.joyDown == null) {
            this.joyDown.free();
            this.joyDown = null;
        }

        if (this.joyDownD == null) {
            this.joyDownD.free();
            this.joyDownD = null;
        }

        if (this.joyLeft == null) {
            this.joyLeft.free();
            this.joyLeft = null;
        }

        if (this.joyLeftD == null) {
            this.joyLeftD.free();
            this.joyLeftD = null;
        }

        if (this.joyRight == null) {
            this.joyRight.free();
            this.joyRight = null;
        }

        if (this.joyRightD == null) {
            this.joyRightD.free();
            this.joyRightD = null;
        }

        if (this.fire1U == null) {
            this.fire1U.free();
            this.fire1U = null;
        }

        if (this.fire2U == null) {
            this.fire2U.free();
            this.fire2U = null;
        }

        if (this.fire1D == null) {
            this.fire1D.free();
            this.fire1D = null;
        }

        if (this.fire2D == null) {
            this.fire2D.free();
            this.fire2D = null;
        }
    },

    //events
    onStart: function () {
        //add touch delegate
        this.app.addTouchDelegate(this);
    },

    onStop: function () {
        //remove touch delegate
        this.app.removeTouchDelegate(this);
    },

    onReset: function (flags) {
        this.flags = flags;

        //update positions
        this.updateLayout();

        //configure joystick zones
        this._setupJoystick();
    },

    onRender: function (context) {
        //do we need to update the layout?
        var x, y, width, height;

        //joystick
        if ((this.flags & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
            if ((this.flags & CVirtualJoystickTouch.JFLAG_DPAD) != 0) {
                var img = (this.state & 1) ? this.joyUpD : this.joyUp;
                if (img != null) {
                    x = this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] - img.width / 2;
                    y = this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] - img.height;
                    context.renderImage(img, x, y, 0, 1, 1, 0, 0, null);
                }

                img = (this.state & 2) ? this.joyDownD : this.joyDown;
                if (img != null) {
                    x = this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] - img.width / 2;
                    y = this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK];
                    context.renderImage(img, x, y, 0, 1, 1, 0, 0, null);
                }

                img = (this.state & 4) ? this.joyLeftD : this.joyLeft;
                if (img != null) {
                    x = this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] - img.width;
                    y = this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] - img.height / 2;
                    context.renderImage(img, x, y, 0, 1, 1, 0, 0, null);
                }

                img = (this.state & 8) ? this.joyRightD : this.joyRight;
                if (img != null) {
                    x = this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK];
                    y = this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] - img.height / 2;
                    context.renderImage(img, x, y, 0, 1, 1, 0, 0, null);
                }
            }
            else {
                if (this.joyBack != null) {
                    x = this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] - this.joyBack.width / 2;
                    y = this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] - this.joyBack.height / 2;
                    context.renderImage(this.joyBack, x, y, 0, 1, 1, 0, 0, null);
                }

                if (this.joyFront != null) {
                    x = this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] + this.joystickX - this.joyFront.width / 2;
                    y = this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] + this.joystickY - this.joyFront.height / 2;
                    context.renderImage(this.joyFront, x, y, 0, 1, 1, 0, 0, null);
                }
            }
        }

        //fire1
        if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
            var tex = ((this.state & 0x10) == 0) ? this.fire1U : this.fire1D;

            if (tex != null) {
                x = this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] - tex.width / 2;
                y = this.imagesY[CVirtualJoystickTouch.KEY_FIRE1] - tex.height / 2;
                context.renderImage(tex, x, y, 0, 1, 1, 0, 0, null);
            }
        }

        //fire2
        if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
            var tex = ((this.state & 0x20) == 0) ? this.fire2U : this.fire2D;

            if (tex != null) {
                x = this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] - tex.width / 2;
                y = this.imagesY[CVirtualJoystickTouch.KEY_FIRE2] - tex.height / 2;
                context.renderImage(tex, x, y, 0, 1, 1, 0, 0, null);
            }
        }
    },

    onUpdateLayout: function () {
        var sx, sy;
        sx = this.app.gaCxWin;
        sy = this.app.gaCyWin;

        if ((this.flags & CVirtualJoystickTouch.JFLAG_DPAD) != 0) {
            this.joyradsize = Math.ceil(Math.sqrt(this.joyLeft.width * this.joyLeft.width + this.joyUp.height * this.joyUp.height));
        }
        else {
            this.joyradsize = Math.ceil(Math.sqrt(this.joyBack.width / 2 * this.joyBack.width / 2 + this.joyBack.height / 2 * this.joyBack.height / 2));
        }
        this.joydeadzone = CVirtualJoystickTouch.DEADZONE * this.joyradsize;

        if ((this.flags & CVirtualJoystickTouch.JFLAG_LEFTHANDED) == 0) {
            //right handed
            if ((this.flags & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
                if ((this.flags & CVirtualJoystickTouch.JFLAG_DPAD) != 0) {
                    this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] = 16 + this.joyLeft.width;
                    this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] = sy - 16 - this.joyDown.height;
                }
                else {
                    this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] = 16 + this.joyBack.width / 2;
                    this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] = sy - 16 - this.joyBack.height / 2;
                }
            }

            //what buttons
            if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE1) != 0 && (this.flags & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
                //fire1 + fire2
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] = sx - this.fire1U.width / 2 - 32;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE1] = sy - this.fire1U.height / 2 - 16;
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] = sx - this.fire2U.width / 2 - 16;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE2] = sy - this.fire2U.height / 2 - this.fire1U.height - 24;
            } else if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
                //fire1
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] = sx - this.fire1U.width / 2 - 16;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE1] = sy - this.fire1U.height / 2 - 16;
            } else if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
                //fire2
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] = sx - this.fire2U.width / 2 - 16;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE2] = sy - this.fire2U.height / 2 - 16;
            }
        } else {
            //left handed
            if ((this.flags & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
                if ((this.flags & CVirtualJoystickTouch.JFLAG_DPAD) != 0) {
                    this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] = sx - 16 - this.joyLeft.width;
                    this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] = sy - 16 - this.joyDown.height;
                }
                else {
                    this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] = sx - 16 - this.joyBack.width / 2;
                    this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] = sy - 16 - this.joyBack.height / 2;
                }
            }

            //what buttons
            if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE1) != 0 && (this.flags & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
                //fire1 + fire2
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] = this.fire1U.width / 2 + 16 + this.fire2U.width * 2 / 3;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE1] = sy - this.fire1U.height / 2 - 16;
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] = this.fire2U.width / 2 + 16;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE2] = sy - this.fire2U.height / 2 - this.fire1U.height - 24;
            } else if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
                //fire1
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] = this.fire1U.width / 2 + 16;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE1] = sy - this.fire1U.height / 2 - 16;
            } else if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
                //fire2
                this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] = this.fire2U.width / 2 + 16;
                this.imagesY[CVirtualJoystickTouch.KEY_FIRE2] = sy - this.fire2U.height / 2 - 16;
            }
        }
    },

    //delegate events
    onTouchStarted: function (touch) {
        var bFlag = false;
        var x = this.app.getTouchX(touch);
        var y = this.app.getTouchY(touch);

        var key = this._getKey(x, y);

        if (key != CVirtualJoystickTouch.KEY_NONE) {
            this.touches[key] = touch.pointerId;

            if (key == CVirtualJoystickTouch.KEY_JOYSTICK) {
                this.state &= 0xF0;
                bFlag = true;

                if ((this.flags & CVirtualJoystickTouch.JFLAG_DPAD) != 0) {
                    this._updateJoystickState(x, y);
                }
            }

            if (key == CVirtualJoystickTouch.KEY_FIRE1) {
                this.state |= 0x10;
                bFlag = true;
            } else if (key == CVirtualJoystickTouch.KEY_FIRE2) {
                this.state |= 0x20;
                bFlag = true;
            }
        }
        return bFlag;
    },

    _updateJoystickState: function (x, y) {
        this.joystickX = x - this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK];
        this.joystickY = y - this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK];

        if ((this.flags & CVirtualJoystickTouch.JFLAG_DPAD) == 0) {
            if (this.joystickX < -this.joyBack.width / 4) {
                this.joystickX = -this.joyBack.width / 4;
            }
            if (this.joystickX > this.joyBack.width / 4) {
                this.joystickX = this.joyBack.width / 4;
            }
            if (this.joystickY < -this.joyBack.height / 4) {
                this.joystickY = -this.joyBack.height / 4;
            }
            if (this.joystickY > this.joyBack.height / 4) {
                this.joystickY = this.joyBack.height / 4;
            }
        }

        var angle = (Math.PI * 2 - Math.atan2(this.joystickY, this.joystickX)) % (Math.PI * 2);
        this.state &= 0xF0;
        var h = Math.sqrt(this.joystickX * this.joystickX + this.joystickY * this.joystickY);

        // Is the radius vector above the deadzone and border of the joystick base
        if (h > this.joydeadzone && h <= this.joyradsize) {
            this.joystickX = Math.cos(angle) * this.joyradsize / 2;
            this.joystickY = Math.sin(angle) * -this.joyradsize / 2;

            var state = 0;

            // Checking in 45 degrees zone equal (PI/4); 1/4, 2/4, 3/4, 4/4, 5/4, 6/4, 7/4, 8/4
            // organized like 8/4, 2/4, 4/4, 6/4,  priority for right, up, left and down
            if (angle >= 0.0) {
                while (true) {
                    // Right
                    if (this._insideZone(angle, 0, this.joyanglezone) || this._insideZone(angle, (Math.PI) * 2, this.joyanglezone)) {
                        state = 8;
                        break;
                    }
                    // Up
                    if (this._insideZone(angle, Math.PI / 2, this.joyanglezone)) {
                        state = 1;
                        break;
                    }
                    // Left
                    if (this._insideZone(angle, (Math.PI), this.joyanglezone)) {
                        state = 4;
                        break;
                    }
                    // Down
                    if (this._insideZone(angle, (Math.PI / 4) * 6, this.joyanglezone)) {
                        state = 2;
                        break;
                    }
                    // Right/Up
                    if (this._insideZone(angle, Math.PI / 4, Math.PI / 2 - this.joyanglezone)) {
                        state = 9;
                        break;
                    }
                    // Left/Up
                    if (this._insideZone(angle, (Math.PI / 4) * 3, Math.PI / 2 - this.joyanglezone)) {
                        state = 5;
                        break;
                    }
                    // Left/Down
                    if (this._insideZone(angle, (Math.PI / 4) * 5, Math.PI / 2 - this.joyanglezone)) {
                        state = 6;
                        break;
                    }
                    // Right/Down
                    if (this._insideZone(angle, (Math.PI / 4) * 7, Math.PI / 2 - this.joyanglezone)) {
                        state = 10;
                        break;
                    }
                    break;
                }
            }
            this.state |= state;
        }
    },

    onTouchMoved: function (touch) {
        var x = this.app.getTouchX(touch);
        var y = this.app.getTouchY(touch);

        var key = this._getKey(x, y);
        if (key == CVirtualJoystickTouch.KEY_JOYSTICK) {
            this.touches[CVirtualJoystickTouch.KEY_JOYSTICK] = touch.pointerId;
        }
        if (this.touches[CVirtualJoystickTouch.KEY_JOYSTICK] == touch.pointerId) {
            this._updateJoystickState(x, y);
        }
    },

    onTouchEnded: function (touch) {
        var n;
        for (n = 0; n < CVirtualJoystickTouch.MAX_TOUCHES; n++) {
            if (this.touches[n] == touch.pointerId) {
                this.touches[n] = 0;
                switch (n) {
                    case CVirtualJoystickTouch.KEY_JOYSTICK:
                        this.joystickX = 0;
                        this.joystickY = 0;
                        this.state &= 0xF0;
                        break;
                    case CVirtualJoystickTouch.KEY_FIRE1:
                        this.state &= ~0x10;
                        break;
                    case CVirtualJoystickTouch.KEY_FIRE2:
                        this.state &= ~0x20;
                        break;
                }
                break;
            }
        }
    },

    //internal
    _setupJoystick: function () {
        this.joyanglezone = CVirtualJoystickTouch.JOY_ANGLEGAP * Math.PI / 180;
    },

    _getKey: function (x, y) {
        if ((this.flags & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
            if ((this.flags & CVirtualJoystickTouch.JFLAG_DPAD) != 0) {
                if (x >= this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] - this.joyLeft.width && x < this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] + this.joyRight.width) {
                    if (y > this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] - this.joyUp.height && y < this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] + this.joyDown.height) {
                        return CVirtualJoystickTouch.KEY_JOYSTICK;
                    }
                }
            }
            else
            {
                if (x >= this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] - this.joyBack.width / 2 && x < this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] + this.joyBack.width / 2) {
                    if (y > this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] - this.joyBack.height / 2 && y < this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK] + this.joyBack.height / 2) {
                        return CVirtualJoystickTouch.KEY_JOYSTICK;
                    }
                }
            }
        }

        if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
            if (x >= this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] - this.fire1U.width / 2 && x < this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] + this.fire1U.width / 2) {
                if (y > this.imagesY[CVirtualJoystickTouch.KEY_FIRE1] - this.fire1U.height / 2 && y < this.imagesY[CVirtualJoystickTouch.KEY_FIRE1] + this.fire1U.height / 2) {
                    return CVirtualJoystickTouch.KEY_FIRE1;
                }
            }
        }

        if ((this.flags & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
            if (x >= this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] - this.fire2U.width / 2 && x < this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] + this.fire2U.width / 2) {
                if (y > this.imagesY[CVirtualJoystickTouch.KEY_FIRE2] - this.fire2U.height / 2 && y < this.imagesY[CVirtualJoystickTouch.KEY_FIRE2] + this.fire2U.height / 2) {
                    return CVirtualJoystickTouch.KEY_FIRE2;
                }
            }
        }
        return CVirtualJoystickTouch.KEY_NONE;
    },

    _insideZone: function (angle, angle_ref, gap) {
        //check if the angle is in the range, could be ported using degrees instead.
        return (angle > (angle_ref - gap / 2) && angle < (angle_ref + gap / 2));
    },

    //api
    setObjectX: function (what, x) {
        if ((what & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
            this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] = x;
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
            this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] = x;
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
            this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] = x;
        }
    },

    setObjectY: function (what, y) {
        if ((what & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
            this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK] = y;
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
            this.imagesX[CVirtualJoystickTouch.KEY_FIRE1] = y;
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
            this.imagesX[CVirtualJoystickTouch.KEY_FIRE2] = y;
        }
    },

    getObjectX: function (what) {
        if ((what & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
            return this.imagesX[CVirtualJoystickTouch.KEY_JOYSTICK];
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
            return this.imagesX[CVirtualJoystickTouch.KEY_FIRE1];
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
            return this.imagesX[CVirtualJoystickTouch.KEY_FIRE2];
        }
    },

    getObjectY: function (what) {
        if ((what & CVirtualJoystickTouch.JFLAG_JOYSTICK) != 0) {
            return this.imagesY[CVirtualJoystickTouch.KEY_JOYSTICK];
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE1) != 0) {
            return this.imagesY[CVirtualJoystickTouch.KEY_FIRE1];
        } else if ((what & CVirtualJoystickTouch.JFLAG_FIRE2) != 0) {
            return this.imagesY[CVirtualJoystickTouch.KEY_FIRE2];
        }
    },

    //api
    getState: function () {
        return this.state;
    }
};

//setup inheritance using extend
CServices.extend(CVirtualJoystick, CVirtualJoystickTouch);
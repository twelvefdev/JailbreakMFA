//----------------------------------------------------------------------------------
//
// CRunMvtbox2dspring
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
 * Any other use of this source code is this.hohibited.
 *
 * THE SOFTWARE IS this.hoVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */
CRunMvtbox2dspring.SPFLAG_ACTIVE = 0x0001;
CRunMvtbox2dspring.SPFLAG_WORKING = 0x0002;
CRunMvtbox2dspring.SPFLAG_ROTATE = 0x0004;

function CRunMvtbox2dspring() {
    //call chain
    CRunMBase.call(this);

    //call self
    this.m_type = CRunBox2DBase.MTYPE_OBJECT;
    this.m_angle = 0;
    this.m_shape = 0;
    this.m_flags = 0;
    this.m_strength = 0;
    this.m_changed = 0;
    this.m_anim = 0;
    this.m_scaleX = 1.0;
    this.m_scaleY = 1.0;
    this.m_imgWidth = 0;
    this.m_imgHeight = 0;
    this.m_fixture = null;
    this.m_previousAngle = -1;
    this.m_currentObject = null;
    this.m_currentCounter = 0;
    this.m_started = false;
}

CRunMvtbox2dspring.prototype = {
        DirAtStart: function (dirAtStart) {
            var dir;

            // Compte le nombre de directions demandees
            var cpt = 0;
            var das = dirAtStart;
            var das2;
            for (var n = 0; n < 32; n++) {
                das2 = das;
                das >>= 1;
                if (das2 & 1) {
                    cpt++;
                }
            }

            // Une ou zero direction?
            if (cpt == 0) {
                dir = 0;
            }
            else {
                // Appelle le hasard pour trouver le bit
                cpt = this.rh.random(cpt);
                das = dirAtStart;
                for (dir = 0; ; dir++) {
                    das2 = das;
                    das >>= 1;
                    if (das2 & 1) {
                        cpt--;
                        if (cpt < 0) {
                            break;
                        }
                    }
                }
            }
            return dir;
        },

        initialize: function (file) {
            // Store pointer to edit data
            file.skipBytes(1);
            this.m_angle = this.DirAtStart(file.readAInt()) * 180.0 / 16.0;
            this.m_currentAngle = this.m_angle;
            this.m_strength = file.readAInt() / 100.0 * 10.0;
            this.m_flags = file.readAInt();
            this.m_shape = file.readAShort();
            this.m_identifier = file.readAInt();

            this.m_changed = false;
            this.m_anim = CAnim.ANIMID_STOP;
            this.m_started = false;

            this.m_base = this.GetBase();
            this.m_body = null;
            this.InitBase(this.ho, CRunMBase.MTYPE_OBJECT);
        },

        AddVelocity: function (vx, vy) {
        },

        SetVelocity: function (vx, vy) {
        },

        SetCollidingObject: function (object) {
            if ((this.m_flags & CRunMvtbox2dspring.SPFLAG_ACTIVE) != 0 && object != this) {
                if (this.m_currentObject != object) {
                    this.m_currentCounter = 10;
                    this.m_currentObject = object;
                    var velocity = object.m_body.GetLinearVelocity();
                    var v = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
                    this.m_base.rBodyAddLinearVelocity(object.m_body, this.m_strength + v, this.m_currentAngle);
                    this.m_flags |= CRunMvtbox2dspring.SPFLAG_WORKING;
                    this.m_anim = CAnim.ANIMID_WALK;
                    this.ho.roa.raAnimForced = this.m_anim + 1;
                    this.ho.roa.raAnimRepeat = 1;
                    this.ho.roc.rcSpeed = 50;
                    this.animations(this.m_anim);
                    this.ho.roc.rcSpeed = 0;
                }
            }
        },

        kill: function () {
            var pBase = this.GetBase();
            if (pBase != null) {
                pBase.rDestroyBody(this.m_body);
            }
        },

        GetBase: function () {
            var pOL = 0;
            var nObjects = 0;
            for (nObjects = 0; nObjects < this.rh.rhNObjects; pOL++, nObjects++) {
                while (this.rh.rhObjectList[pOL] == null) {
                    pOL++;
                }
                var pBase = this.rh.rhObjectList[pOL];
                if (pBase.hoType >= 32) {
                    if (pBase.hoCommon.ocIdentifier == CRun.BASEIDENTIFIER) {
                        if (pBase.ext.identifier == this.m_identifier) {
                            return pBase.ext;
                        }
                    }
                }
            }
            return null;
        },

        CreateBody: function () {
            if (this.m_body != null) {
                return true;
            }

            if (this.m_base == null) {
                this.m_base = this.GetBase();
                if (this.m_base == null) {
                    throw new Error("Physics Engine object not found in frame");
                }
            }

            if (this.m_base == null) {
                return false;
            }

            this.m_currentAngle = this.m_angle;
            var angle = this.m_angle;
            if ((this.m_flags & CRunMvtbox2dspring.SPFLAG_ROTATE) == 0) {
                angle = 0;
            }
            this.m_body = this.m_base.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, this.ho.hoX, this.ho.hoY, angle, 0, this, 0, 0);
            if (!this.ho.roa) {
                this.m_shape = 0;
                this.m_imgWidth = this.ho.hoImgWidth;
                this.m_imgHeight = this.ho.hoImgHeight;
            }
            else {
                if ((this.m_flags & CRunMvtbox2dspring.SPFLAG_ROTATE) == 0) {
                    this.ho.roc.rcDir = Math.floor(this.m_currentAngle / 11.25);
                    while (this.ho.roc.rcDir < 0) {
                        this.ho.roc.rcDir += 32;
                    }
                    while (this.ho.roc.rcDir >= 32) {
                        this.ho.roc.rcDir -= 32;
                    }
                    this.animations(CAnim.ANIMID_STOP);
                }
                this.m_image = this.ho.roc.rcImage;
                var img = this.rh.rhApp.imageBank.getImageFromHandle(this.m_image);
                this.m_imgWidth = img.width;
                this.m_imgHeight = img.height;
            }
            this.CreateFixture();

            return true;
        },

        CreateFixture: function () {
            if (this.m_fixture != null) {
                this.m_base.rBodyDestroyFixture(this.m_body, this.m_fixture);
            }
            this.m_scaleX = this.ho.roc.rcScaleX;
            this.m_scaleY = this.ho.roc.rcScaleY;
            switch (this.m_shape) {
                case 0:
                    this.m_fixture = this.m_base.rBodyCreateBoxFixture(this.m_body, this, this.ho.hoX, this.ho.hoY, this.m_imgWidth * this.m_scaleX, this.m_imgHeight * this.m_scaleY, this.m_density, this.m_friction, this.m_restitution);
                    break;
                case 1:
                    this.m_fixture = this.m_base.rBodyCreateCircleFixture(this.m_body, this, this.ho.hoX, this.ho.hoY, (this.ho.hoImgWidth + this.ho.hoImgHeight) / 4 * (this.m_scaleX + this.m_scaleY) / 2, this.m_density, this.m_friction, this.m_restitution);
                    break;
                case 2:
                    this.m_fixture = this.m_base.rBodyCreateShapeFixture(this.m_body, this, this.ho.hoX, this.ho.hoY, this.ho.roc.rcImage, this.m_density, this.m_friction, this.m_restitution, this.m_scaleX, this.m_scaleY);
                    break;
            }
        },

        move: function () {
            if (!this.CreateBody() || this.m_base.isPaused()) {
                return false;
            }

            // Scale changed?
            if (this.ho.roc.rcScaleX != this.m_scaleX || this.ho.roc.rcScaleY != this.m_scaleY) {
                this.CreateFixture();
            }

            this.ho.roc.rcDir = Math.floor(this.m_currentAngle / 11.25);
            this.ho.roc.rcSpeed = 0;

            if (this.m_currentCounter) {
                this.m_currentCounter--;
                if (this.m_currentCounter == 0) {
                    this.m_currentObject = null;
                }
            }

            var o = {};
            this.m_base.rGetBodyPosition(this.m_body, o);
            if (o.x != this.ho.hoX || o.y != this.ho.hoY) {
                this.ho.hoX = o.x;
                this.ho.hoY = o.y;
                this.m_started = true;
                this.ho.roc.rcChanged = true;
            }
            this.SetCurrentAngle(o.angle);

            if ((this.m_flags & CRunMvtbox2dspring.SPFLAG_WORKING) != 0 && (this.ho.hoOEFlags & CObjectCommon.OEFLAG_ANIMATIONS) != 0) {
                if (this.ho.roa.raAnimOn != CAnim.ANIMID_WALK || this.ho.roa.raAnimFrame >= this.ho.roa.raAnimNumberOfFrame) {
                    this.m_flags &= ~CRunMvtbox2dspring.SPFLAG_WORKING;
                    this.m_anim = CAnim.ANIMID_STOP;
                    this.ho.roa.raAnimForced = 0;
                    this.ho.roa.raAnimFrame = 0;
                }
            }
            this.ho.roc.rcSpeed = 50;
            this.animations(this.m_anim);
            this.ho.roc.rcSpeed = 0;

            this.ho.roc.rcChanged |= this.m_changed;
            this.m_changed = false;

            return this.ho.roc.rcChanged;
        },

        SetCurrentAngle: function (angle) {
            if (this.m_flags & CRunMvtbox2dspring.SPFLAG_ROTATE) {
                if (angle != this.m_previousAngle) {
                    this.m_currentAngle = angle;
                    this.m_previousAngle = this.m_currentAngle;
                    this.ho.roc.rcChanged = true;
                    this.ho.roc.rcAngle = this.m_currentAngle;
                    this.ho.roc.rcDir = 0;
                }
            }
        },
        setPosition: function (x, y) {
            if (x != this.ho.hoX || y != this.ho.hoY) {
                if (!this.m_started) {
                    this.ho.hoX = x;
                    this.ho.hoY = y;
                }
                this.m_base.rBodySetPosition(this.m_body, x, y);
            }
        },

        setXPosition: function (x) {
            if (x != this.ho.hoX) {
                if (!this.m_started) {
                    this.ho.hoX = x;
                }
                this.m_base.rBodySetPosition(this.m_body, x, CRunBox2DBase.POSDEFAULT);
            }
        },

        setYPosition: function (y) {
            if (y != this.ho.hoY) {
                if (!this.m_started) {
                    this.ho.hoY = y;
                }
                this.m_base.rBodySetPosition(this.m_body, CRunBox2DBase.POSDEFAULT, y);
            }
        },

        stop: function (bCurrent) {
            this.m_flags &= ~CRunMvtbox2dspring.SPFLAG_ACTIVE;
        },

        start: function () {
            this.m_flags |= CRunMvtbox2dspring.SPFLAG_ACTIVE;
        },

        setSpeed: function (speed) {
            this.m_strength = speed / 100.0 * 30.0;
        },

        setDir: function (dir) {
            this.m_currentAngle = dir * 11.25;
            this.m_base.rBodySetAngle(this.m_body, dir * 11.25);
            if ((this.m_flags & CRunMvtbox2dspring.SPFLAG_ROTATE) == 0) {
                this.ho.roc.rcDir = dir;
            }
        },

        getDir: function () {
            if (this.m_flags & CRunMvtbox2dspring.SPFLAG_ROTATE) {
                return Math.floor(this.m_currentAngle / 11.25);
            } else {
                return this.ho.roc.rcDir;
            }
        },

        getSpeed: function () {
            return this.m_strength * 100.0 / 30.0;
        },

        setAngle: function (angle) {
            this.m_currentAngle = angle;
            this.m_base.rBodySetAngle(this.m_body, angle);
            if ((this.m_flags & CRunMvtbox2dspring.SPFLAG_ROTATE) == 0) {
                this.ho.roc.rcDir = Math.floor(angle / 11.25);
            }
        },

        getAngle: function () {
            if (this.m_flags & CRunMvtbox2dspring.SPFLAG_ROTATE) {
                var angle = this.m_currentAngle;
                while (angle >= 360) {
                    angle -= 360;
                }
                while (angle < 0) {
                    angle += 360;
                }
                return angle;
            }
            return CRunMBase.ANGLE_MAGIC;
        }

};

//setup inheritance using extend
CServices.extend(CRunMBase, CRunMvtbox2dspring);
//----------------------------------------------------------------------------------
//
// CRUNBOX2DTREADMILL
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
CRunBox2DTreadmill.CND_ISACTIVE = 0;
CRunBox2DTreadmill.CND_LAST = 1;
CRunBox2DTreadmill.ACT_SETSTRENGTH = 0;
CRunBox2DTreadmill.ACT_SETANGLE = 1;
CRunBox2DTreadmill.ACT_SETWIDTH = 2;
CRunBox2DTreadmill.ACT_SETHEIGHT = 3;
CRunBox2DTreadmill.ACT_ONOFF = 4;
CRunBox2DTreadmill.EXP_STRENGTH = 0;
CRunBox2DTreadmill.EXP_ANGLE = 1;
CRunBox2DTreadmill.EXP_WIDTH = 2;
CRunBox2DTreadmill.EXP_HEIGHT = 3;
CRunBox2DTreadmill.TMFLAG_ON = 1;

function CRunBox2DTreadmill() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.base = null;
    this.objects = new CArrayList();
    this.flags = 0;
    this.strength = 0;
    this.strengthBase = 0;
    this.angle = 0;
    this.check = 0;
    this.identifier = 0;
}

CRunBox2DTreadmill.prototype = {
        rAddObject: function (movement) {
            if (movement.m_identifier == this.identifier) {
                this.objects.add(movement);
            }
        },

        rRemoveObject: function (movement) {
            this.objects.removeObject(movement);
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
                        if (pBase.ext.identifier == this.identifier) {
                            return pBase.ext;
                        }
                    }
                }
            }
            return null;
        },

        rStartObject: function () {
            if (this.base == null) {
                this.base = this.GetBase();
                if (this.base == null) {
                    throw new Error("Physics Engine object not found in frame");
                }
                return this.base != null;
            }
            return this.base.started;
        },

        getNumberOfConditions: function () {
            return CRunBox2DTreadmill.CND_LAST;
        },

        createRunObject: function (file, cob, version) {
            this.flags = file.readAInt();
            this.angle = file.readAInt() * Box2D.Common.b2Settings.b2_pi / 16.0;
            this.strengthBase = file.readAInt();
            this.strength = this.strengthBase / 100.0;    //*5.0;
            this.ho.hoImgWidth = file.readAInt();
            this.ho.hoImgHeight = file.readAInt();
            this.identifier = file.readAInt();

            this.base = null;
            this.check = true;

            return 0;
        },

        handleRunObject: function () {
            if (!this.rStartObject() || this.base.isPaused()) {
                return 0;
            }

            if (this.flags & CRunBox2DTreadmill.TMFLAG_ON) {
                var n;
                for (n = 0; n < this.objects.size(); n++) {
                    var pMovement = this.objects.get(n);
                    var pHo = pMovement.m_pHo;
                    var x, y;
                    if (pMovement.m_type == CRunMBase.MTYPE_PARTICULE || pMovement.m_type == CRunMBase.MTYPE_ELEMENT) {
                        x = pMovement.x;
                        y = pMovement.y;
                    }
                    else if (pMovement.m_type == CRunMBase.MTYPE_OBJECT) {
                        x = pHo.hoX;
                        y = pHo.hoY;
                    }
                    if (x >= this.ho.hoX && x < this.ho.hoX + this.ho.hoImgWidth && y >= this.ho.hoY && y < this.ho.hoY + this.ho.hoImgHeight) {
                        pMovement.SetVelocity(this.strength * Math.cos(this.angle), this.strength * Math.sin(this.angle));
                    }
                }
            }
            return 0;
        },

        // Conditions
        // -------------------------------------------------
        condition: function (num, cnd) {
            if (num == CRunBox2DTreadmill.CND_ISACTIVE) {
                return (this.flags & CRunBox2DTreadmill.TMFLAG_ON) != 0;
            }
            return false;
        },

        // Actions
        // -------------------------------------------------
        action: function (num, act) {
            switch (num) {
                case CRunBox2DTreadmill.ACT_SETSTRENGTH:
                    this.strengthBase = act.getParamExpression(this.rh, 0);
                    this.strength = this.strengthBase / 100.0;
                    break;
                case CRunBox2DTreadmill.ACT_SETANGLE:
                    this.angle = act.getParamExpression(this.rh, 0) * Box2D.Common.b2Settings.b2_pi / 180.0;
                    break;
                case CRunBox2DTreadmill.ACT_SETWIDTH:
                    var width = act.getParamExpression(this.rh, 0);
                    if (width > 0) {
                        this.ho.hoImgWidth = width;
                    }
                    break;
                case CRunBox2DTreadmill.ACT_SETHEIGHT:
                    var height = act.getParamExpression(this.rh, 0);
                    if (height > 0) {
                        this.ho.hoImgHeight = height;
                    }
                    break;
                case CRunBox2DTreadmill.ACT_ONOFF:
                    var on = act.getParamExpression(this.rh, 0);
                    if (on) {
                        this.flags |= CRunBox2DTreadmill.TMFLAG_ON;
                    } else {
                        this.flags &= ~CRunBox2DTreadmill.TMFLAG_ON;
                    }
                    break;
            }
        },


        // Expressions
        // --------------------------------------------
        expression: function (num) {
            switch (num) {
                case CRunBox2DTreadmill.EXP_STRENGTH:
                    return this.strengthBase;
                case CRunBox2DTreadmill.EXP_ANGLE:
                    return Math.floor(this.angle * 180 / Box2D.Common.b2Settings.b2_pi);
                case CRunBox2DTreadmill.EXP_WIDTH:
                    return this.ho.hoImgWidth;
                case CRunBox2DTreadmill.EXP_HEIGHT:
                    return this.ho.hoImgHeight;
            }
            return null;
        }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunBox2DTreadmill);
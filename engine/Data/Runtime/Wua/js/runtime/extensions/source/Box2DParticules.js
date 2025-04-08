//----------------------------------------------------------------------------------
//
// CRUNBOX2DFAN
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
CRunBox2DParticules.PATYPE_POINT = 0;
CRunBox2DParticules.PATYPE_ZONE = 1;
CRunBox2DParticules.PAFLAG_CREATEATSTART = 0x0001;
CRunBox2DParticules.PAFLAG_LOOP = 0x0002;
CRunBox2DParticules.PAFLAG_DESTROYANIM = 0x0004;
CRunBox2DParticules.ANGLENONE = 5666565;

CRunBox2DParticules.CND_ONEACH = 0;
CRunBox2DParticules.CND_PARTICULECOLLISION = 1;
CRunBox2DParticules.CND_PARTICULEOUTLEFT = 2;
CRunBox2DParticules.CND_PARTICULEOUTRIGHT = 3;
CRunBox2DParticules.CND_PARTICULEOUTTOP = 4;
CRunBox2DParticules.CND_PARTICULEOUTBOTTOM = 5;
CRunBox2DParticules.CND_PARTICULESCOLLISION = 6;
CRunBox2DParticules.CND_PARTICULECOLLISIONBACKDROP = 7;
CRunBox2DParticules.CND_LAST = 8;

CRunBox2DParticules.ACT_CREATEPARTICULES = 0;
CRunBox2DParticules.ACT_STOPPARTICULE = 1;
CRunBox2DParticules.ACT_FOREACH = 2;
CRunBox2DParticules.ACT_SETSPEED = 3;
CRunBox2DParticules.ACT_SETROTATION = 4;
CRunBox2DParticules.ACT_SETINTERVAL = 5;
CRunBox2DParticules.ACT_SETANGLE = 6;
CRunBox2DParticules.ACT_DESTROYPARTICULE = 7;
CRunBox2DParticules.ACT_DESTROYPARTICULES = 8;
CRunBox2DParticules.ACT_SETSPEEDINTERVAL = 9;
CRunBox2DParticules.ACT_SETCREATIONSPEED = 10;
CRunBox2DParticules.ACT_SETCREATIONON = 11;
CRunBox2DParticules.ACT_STOPLOOP = 12;
CRunBox2DParticules.ACT_SETAPPLYFORCE = 13;
CRunBox2DParticules.ACT_SETAPPLYTORQUE = 14;
CRunBox2DParticules.ACT_SETASPEED = 15;
CRunBox2DParticules.ACT_SETALOOP = 16;
CRunBox2DParticules.ACT_SETSCALE = 17;
CRunBox2DParticules.ACT_SETFRICTION = 18;
CRunBox2DParticules.ACT_SETELASTICITY = 19;
CRunBox2DParticules.ACT_SETDENSITY = 20;
CRunBox2DParticules.ACT_SETGRAVITY = 21;
CRunBox2DParticules.ACT_SETDESTROYDISTANCE = 22;
CRunBox2DParticules.ACT_SETDESTROYANIM = 23;

CRunBox2DParticules.EXP_PARTICULENUMBER = 0;
CRunBox2DParticules.EXP_GETPARTICULEX = 1;
CRunBox2DParticules.EXP_GETPARTICULEY = 2;
CRunBox2DParticules.EXP_GETPARTICULEANGLE = 3;
CRunBox2DParticules.EXP_GETSPEED = 4;
CRunBox2DParticules.EXP_GETSPEEDINTERVAL = 5;
CRunBox2DParticules.EXP_GETANGLE = 6;
CRunBox2DParticules.EXP_GETANGLEINTERVAL = 7;
CRunBox2DParticules.EXP_GETROTATION = 8;
CRunBox2DParticules.EXP_GETLOOPINDEX = 9;
CRunBox2DParticules.EXP_GETAPPLIEDFORCE = 10;
CRunBox2DParticules.EXP_GETAPPLIEDTORQUE = 11;

CRunBox2DParticules.APPLYFORCE_MULT = 5.0;
CRunBox2DParticules.APPLYTORQUE_MULT = 0.1;
CRunBox2DParticules.ROTATION_MULT = 20;

function CRunBox2DParticules() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.type = 0;
    this.flags = 0;
    this.number = 0;
    this.animationSpeed = 0;
    this.angleDWORD = 0;
    this.speed = 0;
    this.speedInterval = 0;
    this.friction = 0;
    this.restitution = 0;
    this.density = 0;
    this.angleInterval = 0;
    this.identifier = 0;
    this.gravity = 0;
    this.rotation = 0;
    this.nImages = 0;
    this.images = null;
    this.particules = null;
    this.toDestroy = null;
    this.creationSpeed = 0;
    this.creationSpeedCounter = 0;
    this.angle = CRunBox2DParticules.ANGLENONE;
    this.currentParticule1 = null;
    this.currentParticule2 = null;
    this.stopped = false;
    this.speedInterval = 0;
    this.stopLoop = false;
    this.loopIndex = 0;
    this.applyForce = 0;
    this.applyRotations = 0;
    this.scale = 0;
    this.destroyDistance = 0;
    this.loopName = 0;
    this.stopped = false;
    this.collidingHO = null;
}

CRunBox2DParticules.prototype = {
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
            return CRunBox2DParticules.CND_LAST;
        },

        createRunObject: function (file, cob, version) {
            this.ho.hoImgWidth = file.readAInt();
            this.ho.hoImgHeight = file.readAInt();
            this.type = file.readAShort();
            this.flags = file.readAInt();
            this.creationSpeed = file.readAInt();
            this.number = file.readAInt();
            this.animationSpeed = file.readAInt();
            this.angleDWORD = file.readAInt();
            this.speed = file.readAInt();
            this.speedInterval = file.readAInt();
            this.friction = file.readAInt() / 100.0;
            this.restitution = file.readAInt() / 100.0;
            this.density = file.readAInt() / 100.0;
            this.angleInterval = file.readAInt();
            this.identifier = file.readAInt();
            this.gravity = file.readAInt() / 100.0;
            this.rotation = file.readAInt() / 100.0 * CRunBox2DParticules.ROTATION_MULT;
            this.applyForce = file.readAInt() / 100 * CRunBox2DParticules.APPLYFORCE_MULT;
            this.applyTorque = file.readAInt() / 100 * CRunBox2DParticules.APPLYTORQUE_MULT;
            this.scaleSpeed = file.readAInt() / 400;
            this.destroyDistance = file.readAInt();
            this.nImages = file.readAShort();
            var n;
            this.images = new Array();
            for (n = 0; n < this.nImages; n++) {
                this.images.push(file.readAShort());
            }
            this.ho.loadImageList(this.images);
            this.particules = new CArrayList();
            this.toDestroy = new CArrayList();

            return 0;
        },

        destroyRunObject: function () {
            var pBase = this.GetBase();
            var n;
            for (n = 0; n < this.particules.size(); n++) {
                var particule = this.particules.get(n);
                particule.destroy(pBase);
            }
            return 0;
        },

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

        handleRunObject: function () {
            if (!this.rStartObject() || this.base.isPaused()) {
                return 0;
            }

            var n;
            var particule;
            if (this.flags & CRunBox2DParticules.PAFLAG_CREATEATSTART) {
                this.creationSpeedCounter += this.creationSpeed;
                if (this.creationSpeedCounter >= 100) {
                    this.creationSpeedCounter -= 100;
                    this.createParticules(this.number);
                }
            }

            for (n = 0; n < this.toDestroy.size(); n++) {
                particule = this.toDestroy.get(n);
                this.destroyParticule(particule);
                this.toDestroy.removeIndex(n);
                n--;
            }

            for (n = 0; n < this.particules.size(); n++) {
                particule = this.particules.get(n);
                var o = {};
                this.base.rGetBodyPosition(particule.m_body, o);
                if (o.x < this.rh.rh3XMinimumKill || o.x > this.rh.rh3XMaximumKill
                    || o.y < this.rh.rh3YMinimumKill || o.y > this.rh.rh3YMaximumKill) {
                    particule.bDestroyed = true;
                    this.toDestroy.add(particule);
                }
                else {
                    particule.setPosition(o.x, o.y, o.angle);
                    particule.animate();
                }
            }
            return 0;
        },

        createParticules: function (number) {
            if (this.base == null)
                this.base = this.GetBase();
            if (this.base == null)
                return;
            var n;
            var particule;
            for (n = 0; n < number; n++) {
                var x, y;
                if (this.type == CRunBox2DParticules.PATYPE_POINT) {
                    x = this.ho.hoX;
                    y = this.ho.hoY;
                }
                else {
                    x = this.ho.hoX + this.rh.random(this.ho.hoImgWidth);
                    y = this.ho.hoY + this.rh.random(this.ho.hoImgHeight);
                }

                var angle, interval;
                if (this.angle == CRunBox2DParticules.ANGLENONE) {
                    angle = this.DirAtStart(this.angleDWORD) * 11.25;
                } else {
                    angle = this.angle;
                }
                if (this.angleInterval > 0) {
                    interval = this.rh.random(this.angleInterval * 2);
                    angle += interval - this.angleInterval;
                }

                particule = new CParticule(this, x, y);
                particule.InitBase(this.ho, CRunMBase.MTYPE_PARTICULE);
                particule.setAnimation(this.images, this.nImages, this.animationSpeed, this.flags);
                particule.setScale(this.scaleSpeed);

                var image = this.rh.rhApp.imageBank.getImageFromHandle(this.images[0]);
                particule.m_body = this.base.rCreateBody(Box2D.Dynamics.b2Body.b2_dynamicBody, x, y, angle, this.gravity, particule, 0, 0);
                particule.fixture = this.base.rBodyCreateCircleFixture(particule.m_body, particule, x, y, (image.width + image.height) / 4, this.density, this.friction, this.restitution);

                var mass = particule.m_body.GetMass();
                interval = this.rh.random(this.speedInterval * 2);
                var speed = this.speed + interval - this.speedInterval;
                speed = Math.max(speed, 1);
                speed = speed / 100.0 * 20.0;
                this.base.rBodyApplyImpulse(particule.m_body, Math.max(1.0, speed * mass), angle);
                this.base.rBodyApplyAngularImpulse(particule.m_body, this.rotation)
                //                this.base.rBodyApplyForce(particule.m_body, this.applyForce, angle);
                //                this.base.rBodyApplyTorque(particule.m_body, this.applyTorque);

                this.particules.add(particule);
            }
        },

        destroyParticule: function (particule) {
            particule.destroy(this.base);
            this.particules.removeObject(particule);
        },

        // Conditions
        // -------------------------------------------------
        condition: function (num, cnd) {
            switch (num) {
                case CRunBox2DParticules.CND_ONEACH:
                    var name = cnd.getParamExpression(this.rh, 0);
                    return CServices.compareStringsIgnoreCase(name, this.loopName);
                case CRunBox2DParticules.CND_PARTICULECOLLISION:
                    var param = cnd.getParamObject(this.rh, 0);
                    if (param.oi == this.rh.rhEvtProg.rhCurParam0) {
                        this.rh.rhEvtProg.evt_AddCurrentObject(this.collidingHO);
                        return true;
                    }
                    else {
                        var oil = param.oiList;
                        if ((oil & 0x8000) != 0) {
                            var pq = this.rh.rhEvtProg.qualToOiList[oil & 0x7FFF];
                            numOi = 0;
                            while (numOi < pq.qoiList.length) {
                                if (pq.qoiList[numOi] == this.rh.rhEvtProg.rhCurParam0) {
                                    this.rh.rhEvtProg.evt_AddCurrentObject(this.collidingHO);
                                    return true;
                                }
                                numOi += 2;
                            }
                        }
                    }
                    break;
                case CRunBox2DParticules.CND_PARTICULECOLLISIONBACKDROP:
                case CRunBox2DParticules.CND_PARTICULEOUTLEFT:
                case CRunBox2DParticules.CND_PARTICULEOUTRIGHT:
                case CRunBox2DParticules.CND_PARTICULEOUTTOP:
                case CRunBox2DParticules.CND_PARTICULEOUTBOTTOM:
                case CRunBox2DParticules.CND_PARTICULESCOLLISION:
                    return true;
                default:
                    break;
            }
            return false;
        },

        // Actions
        // -------------------------------------------------
        action: function (num, act) {
            switch (num) {
                case CRunBox2DParticules.ACT_CREATEPARTICULES:
                    var number = act.getParamExpression(this.rh, 0);
                    this.createParticules(number);
                    break;
                case CRunBox2DParticules.ACT_STOPPARTICULE:
                    this.stopped = true;
                    break;
                case CRunBox2DParticules.ACT_FOREACH:
                    this.loopName = act.getParamExpression(this.rh, 0);
                    var n;
                    this.stopLoop = false;
                    for (n = 0; n < this.particules.size(); n++) {
                        if (this.stopLoop) {
                            break;
                        }
                        var particule = this.particules.get(n);
                        this.currentParticule1 = particule;
                        this.loopIndex = n;
                        this.ho.generateEvent(CRunBox2DParticules.CND_ONEACH, 0);
                    }
                    break;
                case CRunBox2DParticules.ACT_STOPLOOP:
                    this.stopLoop = true;
                    break;
                case CRunBox2DParticules.ACT_SETSPEED:
                    this.speed = Math.min(act.getParamExpression(this.rh, 0), 250);
                    this.speed = Math.max(this.speed, 0);
                    break;
                case CRunBox2DParticules.ACT_SETSPEEDINTERVAL:
                    this.speedInterval = Math.max(act.getParamExpression(this.rh, 0), 0);
                    break;
                case CRunBox2DParticules.ACT_SETANGLE:
                    this.angle = act.getParamExpression(this.rh, 0);
                    break;
                case CRunBox2DParticules.ACT_SETINTERVAL:
                    this.angleInterval = Math.min(act.getParamExpression(this.rh, 0), 360);
                    this.angleInterval = Math.max(this.angleInterval, 0);
                    break;
                case CRunBox2DParticules.ACT_SETROTATION:
                    this.rotation = Math.min(act.getParamExpression(this.rh, 0), 250);
                    this.rotation = Math.max(this.rotation, -250);
                    break;
                case CRunBox2DParticules.ACT_DESTROYPARTICULE:
                    if (this.currentParticule1) {
                        if (!this.currentParticule1.bDestroyed && this.particules.indexOf(this.currentParticule1) >= 0) {
                            this.toDestroy.add(this.currentParticule1);
                        }
                    }
                    break;
                case CRunBox2DParticules.ACT_DESTROYPARTICULES:
                    if (this.currentParticule1) {
                        if (!this.currentParticule1.bDestroyed && this.particules.indexOf(this.currentParticule1) >= 0) {
                            this.toDestroy.add(this.currentParticule1);
                        }
                    }
                    if (this.currentParticule2) {
                        if (!this.currentParticule2.bDestroyed && this.particules.indexOf(this.currentParticule2) >= 0) {
                            this.toDestroy.add(this.currentParticule2);
                        }
                    }
                    break;
                case CRunBox2DParticules.ACT_SETCREATIONSPEED:
                    this.creationSpeed = Math.min(act.getParamExpression(this.rh, 0), 100);
                    this.creationSpeed = Math.max(this.creationSpeed, 0);
                    break;
                case CRunBox2DParticules.ACT_SETCREATIONON:
                    if (act.getParamExpression(this.rh, 0)) {
                        this.flags |= CRunBox2DParticules.PAFLAG_CREATEATSTART;
                    } else {
                        this.flags &= ~CRunBox2DParticules.PAFLAG_CREATEATSTART;
                    }
                    break;
                case CRunBox2DParticules.ACT_SETAPPLYFORCE:
                    this.applyForce = act.getParamExpression(this.rh, 0) / 100 * CRunBox2DParticules.APPLYFORCE_MULT;
                    break;
                case CRunBox2DParticules.ACT_SETAPPLYTORQUE:
                    this.applyTorque = act.getParamExpression(this.rh, 0) / 100 * CRunBox2DParticules.APPLYTORQUE_MULT;
                    break;
                case CRunBox2DParticules.ACT_SETASPEED:
                    this.animationSpeed = act.getParamExpression(this.rh, 0);
                    break;
                case CRunBox2DParticules.ACT_SETALOOP:
                    this.flags &= ~CRunBox2DParticules.PAFLAG_LOOP;
                    if (act.getParamExpression(this.rh, 0)) {
                        this.flags |= CRunBox2DParticules.PAFLAG_LOOP;
                    }
                    break;
                case CRunBox2DParticules.ACT_SETSCALE:
                    this.scaleSpeed = act.getParamExpression(this.rh, 0) / 400;
                    break;
                case CRunBox2DParticules.ACT_SETFRICTION:
                    this.friction = act.getParamExpression(this.rh, 0) / 100;
                    break;
                case CRunBox2DParticules.ACT_SETELASTICITY:
                    this.restitution = act.getParamExpression(this.rh, 0) / 100;
                    break;
                case CRunBox2DParticules.ACT_SETDENSITY:
                    this.density = act.getParamExpression(this.rh, 0) / 100;
                    break;
                case CRunBox2DParticules.ACT_SETGRAVITY:
                    this.gravity = act.getParamExpression(this.rh, 0) / 100;
                    break;
                case CRunBox2DParticules.ACT_SETDESTROYDISTANCE:
                    this.destroyDistance = act.getParamExpression(this.rh, 0);
                    break;
                case CRunBox2DParticules.ACT_SETDESTROYANIM:
                    if (act.getParamExpression(this.rh, 0)) {
                        this.flags |= CRunBox2DParticules.PAFLAG_DESTROYANIM;
                    } else {
                        this.flags &= ~CRunBox2DParticules.PAFLAG_DESTROYANIM;
                    }
                    break;
            }
        },

        // Expressions
        // --------------------------------------------
        expression: function (num) {
            switch (num) {
                case CRunBox2DParticules.EXP_PARTICULENUMBER:
                    return this.particules.size();
                case CRunBox2DParticules.EXP_GETPARTICULEX:
                    if (this.currentParticule1) {
                        return this.currentParticule1.x;
                    }
                    return 0;
                case CRunBox2DParticules.EXP_GETPARTICULEY:
                    if (this.currentParticule1) {
                        return this.currentParticule1.y;
                    }
                    return 0;
                case CRunBox2DParticules.EXP_GETPARTICULEANGLE:
                    if (this.currentParticule1) {
                        return this.currentParticule1.angle;
                    }
                    return 0;
                case CRunBox2DParticules.EXP_GETSPEED:
                    return this.speed;
                case CRunBox2DParticules.EXP_GETSPEEDINTERVAL:
                    return this.speedInterval;
                case CRunBox2DParticules.EXP_GETANGLE:
                    return this.angle;
                case CRunBox2DParticules.EXP_GETANGLEINTERVAL:
                    return this.angleInterval;
                case CRunBox2DParticules.EXP_GETROTATION:
                    return this.rotation;
                case CRunBox2DParticules.EXP_GETLOOPINDEX:
                    return this.loopIndex;
                case CRunBox2DParticules.EXP_GETAPPLIEDFORCE:
                    return this.applyForce * 100 / CRunBox2DParticules.APPLYFORCE_MULT;
                case CRunBox2DParticules.EXP_GETAPPLIEDTORQUE:
                    return this.applyTorque * 100 / CRunBox2DParticules.APPLYTORQUE_MULT;
                default:
                    break;
            }
            return 0;
        }

};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunBox2DParticules);

// PARTICULE OBJECT
////////////////////////////////////////////////////////////////////////
function CParticule(oParent, x, y) {
    //call chain
    CRunMBase.call(this, oParent, x, y);

    //call self
    this.m_type = CRunBox2DBase.MTYPE_PARTICULE;
    this.oParent = oParent;
    this.nLayer = oParent.ho.ros.rsLayer;
    this.pLayer = oParent.rh.rhFrame.layers[this.nLayer];
    this.pLayer.planeSprites.addChild(this);
    this.initialX = x;
    this.initialY = y;
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.nImages = 0;
    this.images = null;
    this.image = 0;
    this.animationSpeed = 0;
    this.animationSpeedCounter = 0;
    this.bDestroyed = false;
    this.m_addVFlag = 0;
    this.m_addVX = 0;
    this.m_addVY = 0;
    this.oldWidth = 0;
    this.oldHeight = 0;
    this.fixture = null;
    this.scaleSpeed = 0;
    this.scale = 0;
    this.rc = new CRect();
}

CParticule.prototype = {
        destroy: function (pBase) {
            this.pLayer.planeSprites.removeChild(this);
            if (pBase != null) {
                pBase.rDestroyBody(this.m_body);
            }
        },
        setAnimation: function (images, nImages, animationSpeed, flags) {
            this.images = images;
            this.nImages = nImages;
            this.animationSpeed = animationSpeed;
            this.animationSpeedCounter = 0;
            this.flags = flags;
            this.stopped = false;

            var image = this.oParent.rh.rhApp.imageBank.getImageFromHandle(this.images[0]);
            this.oldWidth = image.width * this.scale;
            this.oldHeight = image.height * this.scale;
        },
        setScale: function (scaleSpeed) {
            this.scaleSpeed = scaleSpeed;
            this.scale = 1;
        },
        animate: function () {
            if (!this.stopped) {
                this.animationSpeedCounter += this.animationSpeed * this.oParent.rh.rh4MvtTimerCoef;
                while (this.animationSpeedCounter >= 100) {
                    this.animationSpeedCounter -= 100;
                    this.image++;
                    if (this.image >= this.nImages) {
                        if (this.flags & CRunBox2DParticules.PAFLAG_LOOP) {
                            this.image = 0;
                        }
                        else {
                            this.image--;
                            this.stopped = true;
                            if (this.flags & CRunBox2DParticules.PAFLAG_DESTROYANIM) {
                                if (!this.bDestroyed) {
                                    this.bDestroyed = true;
                                    this.oParent.toDestroy.add(this);
                                }
                            }
                        }
                    }
                }
            }
            var oldScale = this.scale;
            this.scale += this.scaleSpeed;

            var image = this.oParent.rh.rhApp.imageBank.getImageFromHandle(this.images[this.image]);
            if (!image) {
                return;
            }
            var width = image.width * this.scale;
            var height = image.height * this.scale;
            if (width < 1 || height < 1) {
                if (!this.bDestroyed) {
                    this.oParent.toDestroy.add(this);
                    this.bDestroyed = true;
                }
                this.scale = oldScale;
            }
            else {
                if (width != this.oldWidth || height != this.oldHeight) {
                    this.oldWidth = width;
                    this.oldHeight = height;
                    this.m_body.DestroyFixture(this.fixture);
                    this.fixture = this.oParent.base.rBodyCreateCircleFixture(this.m_body, this, this.x, this.y, (width + height) / 4, this.oParent.density, this.oParent.friction, this.oParent.restitution);
                }
            }

            this.oParent.base.rBodyAddVelocity(this.m_body, this.m_addVX, this.m_addVY);
            if (this.m_addVFlag) {
                this.m_addVFlag = false;
            } else {
                this.m_addVX = 0;
                this.m_addVY = 0;
            }
        },
        AddVelocity: function (vx, vy) {
            this.m_addVX = vx;
            this.m_addVY = vy;
            this.m_addVFlag = true;
        },
        SetVelocity: function (vx, vy) {
            var angle = this.m_body.GetAngle();
            var position = this.m_body.GetPosition();
            position.x += vx / 2.56;
            position.y += vy / 2.56;
            this.oParent.base.rBodySetTransform(this.m_body, position, angle);
        },
        setPosition: function (x, y, angle) {
            this.x = x;
            this.y = y;
            this.angle = angle;
            var dx = this.x - this.initialX;
            var dy = this.y - this.initialY;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance > this.oParent.destroyDistance) {
                if (!this.bDestroyed) {
                    this.bDestroyed = true;
                    this.oParent.toDestroy.add(this);
                }
            }
        },
        draw: function (context, xx, yy) {
            if (this.oParent.ho.ros.rsFlags & CRSpr.RSFLAG_VISIBLE) {
                var image = this.oParent.rh.rhApp.imageBank.getImageFromHandle(this.images[this.image]);
                if (image) {
                    image.xSpot = image.width / 2;
                    image.ySpot = image.height / 2;

                    var renderX = xx + this.x - this.oParent.rh.rhWindowX + this.pLayer.x;
                    var renderY = yy + this.y - this.oParent.rh.rhWindowY + this.pLayer.y;

                    context.renderImage(image, renderX, renderY, this.angle, this.scale, this.scale, 0, 0, this);
                }
            }
        }
    };

//setup inheritance using extend
CServices.extend(CRunMBase, CParticule);
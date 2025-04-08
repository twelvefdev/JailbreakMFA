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
CRunBox2DRopeAndChain.MAX_IMAGES = 8;
CRunBox2DRopeAndChain.RCFLAG_ATTACHED = 0x0001;

CRunBox2DRopeAndChain.CND_ONEACH = 0;
CRunBox2DRopeAndChain.CND_ELEMENTCOLLISION = 1;
CRunBox2DRopeAndChain.CND_ELEMENTOUTLEFT = 2;
CRunBox2DRopeAndChain.CND_ELEMENTOUTRIGHT = 3;
CRunBox2DRopeAndChain.CND_ELEMENTOUTTOP = 4;
CRunBox2DRopeAndChain.CND_ELEMENTOUTBOTTOM = 5;
CRunBox2DRopeAndChain.CND_ELEMENTCOLLISIONBACKDROP = 7;
CRunBox2DRopeAndChain.CND_LAST = 8;

CRunBox2DRopeAndChain.ACT_FOREACH = 0;
CRunBox2DRopeAndChain.ACT_STOP = 1;
CRunBox2DRopeAndChain.ACT_CLIMBUP = 2;
CRunBox2DRopeAndChain.ACT_CLIMBDOWN = 3;
CRunBox2DRopeAndChain.ACT_ATTACH = 4;
CRunBox2DRopeAndChain.ACT_RELEASE = 5;
CRunBox2DRopeAndChain.ACT_STOPLOOP = 6;
CRunBox2DRopeAndChain.ACT_CUT = 7;
CRunBox2DRopeAndChain.ACT_ATTACHNUMBER = 8;

CRunBox2DRopeAndChain.EXP_LOOPINDEX = 0;
CRunBox2DRopeAndChain.EXP_GETX1 = 1;
CRunBox2DRopeAndChain.EXP_GETY1 = 2;
CRunBox2DRopeAndChain.EXP_GETX2 = 3;
CRunBox2DRopeAndChain.EXP_GETY2 = 4;
CRunBox2DRopeAndChain.EXP_GETXMIDDLE = 5;
CRunBox2DRopeAndChain.EXP_GETYMIDDLE = 6;
CRunBox2DRopeAndChain.EXP_GETANGLE = 7;
CRunBox2DRopeAndChain.EXP_GETELEMENT = 8;

function CRunBox2DRopeAndChain() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.flags = 0;
    this.number = 0;
    this.angle = 0;
    this.friction = 0;
    this.restitution = 0;
    this.density = 0;
    this.gravity = 0;
    this.identifier = 0;
    this.nImages = 0;
    this.imageStart = null;
    this.images = null;
    this.imageEnd = null;
    this.elements = null;
    this.bodyStart = null;
    this.bodyEnd = null;
    this.stopped = false;
    this.stopLoop = false;
    this.currentElement = null;
    this.currentObject = null;
    this.joints = null;
    this.loopName = null;
    this.collidingHO = null;
    this.ropeJoints = null;
}

CRunBox2DRopeAndChain.prototype = {
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

        rRemoveObject: function (movement) {
            if (movement) {
                var n;
                for (n = 0; n < this.joints.size() ; n++) {
                    var cjoint = this.joints.get(n);
                    if (cjoint.object == movement && cjoint.joint != null) {
                        this.base.world.DestroyJoint(cjoint.joint);
                        cjoint.joint = null;
                        cjoint.counter = 200;
                        break;
                    }
                }
            }
        },

        getNumberOfConditions: function () {
            return CRunBox2DRopeAndChain.CND_LAST;
        },

        createRunObject: function (file, cob, version) {
            this.ho.hoImgWidth = file.readAInt();
            this.ho.hoImgHeight = file.readAInt();
            this.flags = file.readAInt();
            this.angle = file.readAInt() * 11.25;
            this.number = file.readAInt();
            this.friction = file.readAInt() / 100.0;
            this.restitution = file.readAInt() / 100.0;
            this.density = file.readAInt() / 100.0;
            this.gravity = file.readAInt() / 100.0;
            this.identifier = file.readAInt();
            this.nImages = file.readAShort();
            this.imageStart = new Array();
            this.imageStart.push(file.readAShort());
            this.ho.loadImageList(this.imageStart);
            this.images = new Array();
            var n;
            for (n = 0; n < this.nImages; n++) {
                this.images.push(file.readAShort());
            }
            file.skipBytes((CRunBox2DRopeAndChain.MAX_IMAGES - n) * 2);
            this.ho.loadImageList(this.images);
            this.imageEnd = new Array();
            this.imageEnd.push(file.readAShort());
            this.ho.loadImageList(this.imageEnd);

            this.elements = new CArrayList();
            this.joints = new CArrayList();
            this.ropeJoints = new CArrayList();
            this.oldX = this.ho.hoX;
            this.oldY = this.ho.hoY;

            return 0;
        },

        destroyRunObject: function () {
            var base = this.GetBase();
            var n;
            for (n = 0; n < this.elements.size(); n++) {
                var element = this.elements.get(n);
                element.destroy(base);
            }
            return 0;
        },

        handleRunObject: function () {
            if (!this.rStartObject() || this.base.isPaused()) {
                return 0;
            }

            var element;
            if (this.elements.size() == 0) {
                var x, y;
                x = this.oldX;
                y = this.oldY;
                /*
                 if (this.angle >= 0 && this.angle < 90)
                 {
                 x = this.ho.hoX;
                 y = this.ho.hoY + this.ho.hoImgHeight;
                 }
                 else if (this.angle >= 90 && this.angle < 180)
                 {
                 x = this.ho.hoX + this.ho.hoImgWidth;
                 y = this.ho.hoY + this.ho.hoImgHeight;
                 }
                 else if (this.angle >= 180 && this.angle < 240)
                 {
                 x = this.ho.hoX + this.ho.hoImgWidth;
                 y = this.ho.hoY;
                 }
                 else
                 {
                 x = this.ho.hoX;
                 y = this.ho.hoY;
                 }
                 */
                this.bodyStart = this.base.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, x, y, 0, 0, null, 0, 0);
                this.base.rBodyCreateBoxFixture(this.bodyStart, null, x, y, 16, 16, 0, 0, 0);
                var previousBody = this.bodyStart;

                var angle = -this.angle / 180 * Box2D.Common.b2Settings.b2_pi;

                element = new CElement(this, this.imageStart[0], 0);
                element.InitBase(this.ho, CRunMBase.MTYPE_ELEMENT);
                var image = this.rh.rhApp.imageBank.getImageFromHandle(this.imageStart[0]);
                element.m_body = this.base.rCreateBody(Box2D.Dynamics.b2Body.b2_dynamicBody, x, y, this.angle, this.gravity, element, 0, 0);
                this.base.rBodyCreateBoxFixture(element.m_body, element, x, y, image.width, image.height, this.density, this.friction, this.restitution);

                var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                JointDef.collideConnected = false;
                JointDef.enableMotor = false;

                JointDef.Initialize(element.m_body, previousBody, element.m_body.GetPosition());
                var joint = this.base.world.CreateJoint(JointDef);
                this.ropeJoints.add(joint);
                previousBody = element.m_body;

                var deltaX = image.xAP - image.xSpot;
                var deltaY = image.yAP - image.ySpot;
                var plusX = Math.floor(deltaX * Math.cos(angle) - deltaY * Math.sin(angle));
                var plusY = Math.floor(deltaX * Math.sin(angle) + deltaY * Math.cos(angle));
                x += plusX;
                y += plusY;

                this.elements.add(element);

                var n;
                var nImage = 0;
                for (n = 1; n < this.number - 1; n++) {
                    element = new CElement(this, this.images[nImage], n);
                    element.InitBase(this.ho, CRunMBase.MTYPE_ELEMENT);
                    image = this.rh.rhApp.imageBank.getImageFromHandle(this.images[nImage]);
                    element.m_body = this.base.rCreateBody(Box2D.Dynamics.b2Body.b2_dynamicBody, x, y, this.angle, this.gravity, element, 0, 0);
                    this.base.rBodyCreateBoxFixture(element.m_body, element, x, y, image.width, image.height, this.density, this.friction, this.restitution);

                    JointDef.Initialize(element.m_body, previousBody, element.m_body.GetPosition());
                    joint = this.base.world.CreateJoint(JointDef);
                    this.ropeJoints.add(joint);
                    previousBody = element.m_body;

                    deltaX = image.xAP - image.xSpot;
                    deltaY = image.yAP - image.ySpot;
                    plusX = Math.floor(deltaX * Math.cos(angle) - deltaY * Math.sin(angle));
                    plusY = Math.floor(deltaX * Math.sin(angle) + deltaY * Math.cos(angle));
                    x += plusX;
                    y += plusY;
                    nImage++;
                    if (nImage >= this.nImages) {
                        nImage = 0;
                    }
                    this.elements.add(element);
                }
                element = new CElement(this, this.imageEnd[0], n);
                element.InitBase(this.ho, CRunMBase.MTYPE_ELEMENT);
                image = this.rh.rhApp.imageBank.getImageFromHandle(this.imageEnd[0]);
                element.m_body = this.base.rCreateBody(Box2D.Dynamics.b2Body.b2_dynamicBody, x, y, this.angle, this.gravity, element, 0, 0);
                this.base.rBodyCreateBoxFixture(element.m_body, element, x, y, image.width, image.height, this.density, this.friction, this.restitution);

                JointDef.Initialize(element.m_body, previousBody, element.m_body.GetPosition());
                joint = this.base.world.CreateJoint(JointDef);
                this.ropeJoints.add(joint);
                this.elements.add(element);
                previousBody = element.m_body;

                if (this.flags & CRunBox2DRopeAndChain.RCFLAG_ATTACHED) {
                    deltaX = image.xAP - image.xSpot;
                    deltaY = image.yAP - image.ySpot;
                    plusX = Math.floor(deltaX * Math.cos(angle) - deltaY * Math.sin(angle));
                    plusY = Math.floor(deltaX * Math.sin(angle) + deltaY * Math.cos(angle));
                    x += plusX;
                    y += plusY;

                    this.bodyEnd = this.base.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, x, y, 0, 0, null, 0, 0);
                    this.base.rBodyCreateBoxFixture(this.bodyEnd, null, x, y, 16, 16, 0, 0, 0);
                    JointDef.Initialize(this.bodyEnd, previousBody, this.bodyEnd.GetPosition());
                    joint = this.base.world.CreateJoint(JointDef);
                    this.ropeJoints.add(joint);
                }
            }

            if (this.ho.hoX != this.oldX || this.ho.hoY != this.oldY) {
                var deltaX = (this.ho.hoX - this.oldX) / this.base.factor;
                var deltaY = -(this.ho.hoY - this.oldY) / this.base.factor;
                this.oldX = this.ho.hoX;
                this.oldY = this.ho.hoY;

                var pos = this.bodyStart.GetPosition();
                var angle = this.bodyStart.GetAngle();
                pos.x += deltaX;
                pos.y += deltaY;
                this.bodyStart.SetPositionAndAngle(pos, angle);

                var n;
                for (n = 0; n < this.elements.size(); n++) {
                    var element = this.elements.get(n);
                    pos = element.m_body.GetPosition();
                    var angle = element.m_body.GetAngle();
                    pos.x += deltaX;
                    pos.y += deltaY;
                    element.m_body.SetPositionAndAngle(pos, angle);
                }

                if (this.bodyEnd) {
                    pos = this.bodyEnd.GetPosition();
                    angle = this.bodyEnd.GetAngle();
                    pos.x += deltaX;
                    pos.y += deltaY;
                    this.bodyEnd.SetPositionAndAngle(pos, angle);
                }
            }

            for (n = 0; n < this.elements.size(); n++) {
                element = this.elements.get(n);
                var o = {};
                this.base.rGetBodyPosition(element.m_body, o);
                element.setPosition(o.x, o.y, o.angle);
            }

            if (this.elements.size() >= 2 && this.bodyEnd == null) {
                var position = this.elements.get(this.elements.size() - 1).m_body.GetPosition();
                var angle = this.elements.get(this.elements.size() - 2).m_body.GetAngle();
                this.elements.get(this.elements.size() - 1).m_body.SetPositionAndAngle(position, angle);
            }

            for (n = 0; n < this.joints.size(); n++) {
                var cjoint = this.joints.get(n);
                if (cjoint.counter > 0) {
                    cjoint.counter--;
                    if (cjoint.counter == 0) {
                        this.joints.removeIndex(n);
                        n--;
                    }
                }
            }

            return 0;
        },

        // Conditions
        // -------------------------------------------------
        condition: function (num, cnd) {
            switch (num) {
                case CRunBox2DRopeAndChain.CND_ELEMENTCOLLISION:
                    var param = cnd.getParamObject(this.rh, 0);
                    if (this.collidingHO == null)
                        break;
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
                case CRunBox2DRopeAndChain.CND_ONEACH:
                    var name = cnd.getParamExpression(this.rh, 0);
                    return CServices.compareStringsIgnoreCase(name, this.loopName);
                case CRunBox2DRopeAndChain.CND_ELEMENTOUTLEFT:
                case CRunBox2DRopeAndChain.CND_ELEMENTOUTRIGHT:
                case CRunBox2DRopeAndChain.CND_ELEMENTOUTTOP:
                case CRunBox2DRopeAndChain.CND_ELEMENTOUTBOTTOM:
                case CRunBox2DRopeAndChain.CND_ELEMENTCOLLISIONBACKDROP:
                    return true;
            }
            return false;
        },

        // Actions
        // -------------------------------------------------
        action: function (num, act) {
            switch (num) {
                case CRunBox2DRopeAndChain.ACT_FOREACH:
                    this.loopName = act.getParamExpression(this.rh, 0);
                    var n;
                    this.stopLoop = false;
                    for (n = 0; n < this.elements.size(); n++) {
                        if (this.stopLoop) {
                            break;
                        }
                        var element = this.elements.get(n);
                        this.currentElement = element;
                        this.loopIndex = n;
                        this.ho.generateEvent(CRunBox2DRopeAndChain.CND_ONEACH, 0);
                    }
                    break;
                case CRunBox2DRopeAndChain.ACT_SETPOSITION:
                    var position = act.getParamPosition(this.rh, 0);
                    if (position.found) {
                        if (this.base == null)
                            this.base = this.GetBase();
                        this.base.rBodySetPosition(this.bodyStart, position.x, position.y);
                    }
                    break;
                case CRunBox2DRopeAndChain.ACT_SETX:
                    var x = act.getParamExpression(this.rh, 0);
                    if (this.base == null)
                        this.base = this.GetBase();
                    this.base.rBodySetPosition(this.bodyStart, x, CRunBox2DBase.POSDEFAULT);
                    break;
                case CRunBox2DRopeAndChain.ACT_SETY:
                    var y = act.getParamExpression(this.rh, 0);
                    if (this.base == null)
                        this.base = this.GetBase();
                    this.base.rBodySetPosition(this.bodyStart, CRunBox2DBase.POSDEFAULT, y);
                    break;
                case CRunBox2DRopeAndChain.ACT_STOP:
                    this.stopped = true;
                    break;
                case CRunBox2DRopeAndChain.ACT_CLIMBUP:
                    var pHo = act.getParamObject(this.rh, 0);
                    if (this.base == null)
                        this.base = this.GetBase();
                    var object = this.base.GetMBase(pHo);
                    if (object) {
                        var n;
                        for (n = 0; n < this.joints.size(); n++) {
                            var cjoint = this.joints.get(n);
                            if (cjoint.object == object && cjoint.joint != null) {
                                var n = cjoint.element.number;
                                if (n > 0) {
                                    this.base.world.DestroyJoint(cjoint.joint);

                                    var pos1 = cjoint.element.m_body.GetPosition();
                                    var nextElement = this.elements.get(n - 1);
                                    var pos2 = nextElement.m_body.GetPosition();
                                    var angle = cjoint.object.m_body.GetAngle();
                                    var pos3 = cjoint.object.m_body.GetPosition();
                                    pos3.x += pos2.x - pos1.x;
                                    pos3.y += pos2.y - pos1.y;
                                    cjoint.object.m_body.SetPositionAndAngle(pos3, angle);

                                    var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                                    JointDef.collideConnected = false;
                                    JointDef.enableMotor = true;
                                    JointDef.maxMotorTorque = 100000;
                                    JointDef.motorSpeed = 0;
                                    JointDef.Initialize(cjoint.object.m_body, nextElement.m_body, nextElement.m_body.GetPosition());
                                    var joint = this.base.world.CreateJoint(JointDef);

                                    cjoint.element = nextElement;
                                    cjoint.joint = joint;
                                }
                                break;
                            }
                        }
                    }
                    break;
                case CRunBox2DRopeAndChain.ACT_CLIMBDOWN:
                    var pHo = act.getParamObject(this.rh, 0);
                    if (this.base == null)
                        this.base = this.GetBase();
                    var object = this.base.GetMBase(pHo);
                    if (object) {
                        var n;
                        for (n = 0; n < this.joints.size(); n++) {
                            var cjoint = this.joints.get(n);
                            if (cjoint.object == object && cjoint.joint != null) {
                                var n = cjoint.element.number;
                                if (n < this.elements.size() - 1) {
                                    this.base.world.DestroyJoint(cjoint.joint);

                                    var pos1 = cjoint.element.m_body.GetPosition();
                                    var nextElement = this.elements.get(n + 1);
                                    var pos2 = nextElement.m_body.GetPosition();
                                    var angle = cjoint.object.m_body.GetAngle();
                                    var pos3 = cjoint.object.m_body.GetPosition();
                                    pos3.x += pos2.x - pos1.x;
                                    pos3.y += pos2.y - pos1.y;
                                    cjoint.object.m_body.SetPositionAndAngle(pos3, angle);

                                    var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                                    JointDef.collideConnected = false;
                                    JointDef.enableMotor = true;
                                    JointDef.maxMotorTorque = 100000;
                                    JointDef.motorSpeed = 0;
                                    JointDef.Initialize(cjoint.object.m_body, nextElement.m_body, nextElement.m_body.GetPosition());
                                    var joint = this.base.world.CreateJoint(JointDef);

                                    cjoint.element = nextElement;
                                    cjoint.joint = joint;
                                }
                                break;
                            }
                        }
                    }
                    break;
                case CRunBox2DRopeAndChain.ACT_ATTACH:
                    if (this.currentElement == null) {
                        break;
                    }
                    var pHo = act.getParamObject(this.rh, 0);
                    if (this.base == null)
                        this.base = this.GetBase();
                    var object = this.base.GetMBase(pHo);
                    if (object) {
                        var n;
                        for (n = 0; n < this.joints.size(); n++) {
                            var cjoint = this.joints.get(n);
                            if (cjoint.object == object && cjoint.joint != null) {
                                break;
                            }
                        }
                        if (n == this.joints.size()) {
                            var angle = object.m_body.GetAngle();
                            var posObject = object.m_body.GetPosition();
                            var distance = act.getParamExpression(this.rh, 1);
                            var position = this.currentElement.m_body.GetPosition();
                            if (posObject.x > position.x) {
                                posObject.x = position.x + distance / this.base.factor;
                            } else {
                                posObject.x = position.x - distance / this.base.factor;
                            }
                            object.m_body.SetPositionAndAngle(posObject, angle);
                            var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                            JointDef.collideConnected = false;
                            JointDef.enableMotor = true;
                            JointDef.maxMotorTorque = 100000;
                            JointDef.motorSpeed = 0;
                            JointDef.Initialize(object.m_body, this.currentElement.m_body, position);
                            var joint = this.base.world.CreateJoint(JointDef);
                            this.joints.add(new CJointRC(object, this.currentElement, joint));
                        }
                    }
                    break;
                case CRunBox2DRopeAndChain.ACT_CUT:
                    var number = act.getParamExpression(this.rh, 0);
                    if (number >= 0 && number < this.ropeJoints.size()) {
                        var joint = this.ropeJoints.get(number);
                        if (this.base == null)
                            this.base = this.GetBase();
                        this.base.rDestroyJoint(joint);
                        this.ropeJoints.removeIndex(number);
                    }
                    this.stopLoop = true;
                    break;
                case CRunBox2DRopeAndChain.ACT_ATTACHNUMBER:
                    var pHo = act.getParamObject(this.rh, 0);
                    if (this.base == null)
                        this.base = this.GetBase();
                    var object = this.base.GetMBase(pHo);
                    if (object) {
                        var n;
                        for (n = 0; n < this.joints.size(); n++) {
                            var cjoint = this.joints.get(n);
                            if (cjoint.object == object && cjoint.joint != null) {
                                break;
                            }
                        }
                        if (n == this.joints.size()) {
                            var angle = object.m_body.GetAngle();
                            var posObject = object.m_body.GetPosition();
                            var number = act.getParamExpression(this.rh, 1);
                            if (number >= 0 && number < this.elements.size()) {
                                var element = this.elements.get(number);
                                var position = element.m_body.GetPosition();
                                var o = {};
                                this.base.rGetBodyPosition(element.m_body, o);
                                var image = this.rh.rhApp.imageBank.getImageFromHandle(pHo.roc.rcImage);
                                o.x -= (image.xAP - image.xSpot);
                                o.y -= (image.yAP - image.ySpot);
                                this.base.rBodySetPosition(object.m_body, o.x, o.y);
                                var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                                JointDef.collideConnected = false;
                                JointDef.enableMotor = true;
                                JointDef.maxMotorTorque = 10000;
                                JointDef.motorSpeed = 0;
                                JointDef.Initialize(object.m_body, element.m_body, position);
                                var joint = this.base.world.CreateJoint(JointDef);
                                this.joints.add(new CJoint(object, element, joint));
                            }
                        }
                    }
                    break;
                case CRunBox2DRopeAndChain.ACT_RELEASE:
                    var pHo = act.getParamObject(this.rh, 0);
                    if (this.base == null)
                        this.base = this.GetBase();
                    var object = this.base.GetMBase(pHo);
                    if (object) {
                        var n;
                        for (n = 0; n < this.joints.size(); n++) {
                            var cjoint = this.joints.get(n);
                            if (cjoint.object == object && cjoint.joint != null) {
                                this.base.world.DestroyJoint(cjoint.joint);
                                cjoint.joint = null;
                                cjoint.counter = 200;
                                break;
                            }
                        }
                    }
                    break;
                case CRunBox2DRopeAndChain.ACT_STOPLOOP:
                    this.stopLoop = true;
                    break;
            }
        },

        // Expressions
        // --------------------------------------------
        getElement: function (index) {
            if (index >= 0 && index < this.elements.size()) {
                return this.elements.get(index);
            }
            return null;
        },
        getX2: function (element) {
            var o = {};
            if (this.base == null)
                this.base = this.GetBase();
            this.base.rGetBodyPosition(element.m_body, o);
            var angle = -o.angle / 180 * Box2D.Common.b2Settings.b2_pi;
            var image = this.rh.rhApp.imageBank.getImageFromHandle(element.image);
            var deltaX = image.xAP - image.xSpot;
            var deltaY = image.yAP - image.ySpot;
            var plusX = Math.floor(deltaX * Math.cos(angle) - deltaY * Math.sin(angle));
            var plusY = Math.floor(deltaX * Math.sin(angle) + deltaY * Math.cos(angle));
            return o.x + plusX;
        },
        getY2: function (element) {
            var o = {};
            if (this.base == null)
                this.base = this.GetBase();
            this.base.rGetBodyPosition(element.m_body, o);
            var angle = -o.angle / 180 * Box2D.Common.b2Settings.b2_pi;
            var image = this.rh.rhApp.imageBank.getImageFromHandle(element.image);
            var deltaX = image.xAP - image.xSpot;
            var deltaY = image.yAP - image.ySpot;
            var plusX = Math.floor(deltaX * Math.cos(angle) - deltaY * Math.sin(angle));
            var plusY = Math.floor(deltaX * Math.sin(angle) + deltaY * Math.cos(angle));
            return o.y + plusY;
        },
        expression: function (num) {
            var element;
            switch (num) {
                case CRunBox2DRopeAndChain.EXP_GETELEMENT:
                    if (this.currentElement) {
                        return this.currentElement.number;
                    }
                    return 0;
                case CRunBox2DRopeAndChain.EXP_LOOPINDEX:
                    return this.loopIndex;
                case CRunBox2DRopeAndChain.EXP_GETX1:
                    element = this.getElement(this.ho.getExpParam());
                    if (element) {
                        var o = {};
                        if (this.base == null)
                            this.base = this.GetBase();
                        this.base.rGetBodyPosition(element.m_body, o);
                        return o.x;
                    }
                    return 0;
                case CRunBox2DRopeAndChain.EXP_GETY1:
                    element = this.getElement(this.ho.getExpParam());
                    if (element) {
                        var o = {};
                        if (this.base == null)
                            this.base = this.GetBase();
                        this.base.rGetBodyPosition(element.m_body, o);
                        return o.y;
                    }
                    return 0;
                case CRunBox2DRopeAndChain.EXP_GETX2:
                    element = this.getElement(this.ho.getExpParam());
                    if (element) {
                        return CServices.floatToInt(this.getX2(element));
                    }
                    return 0;
                case CRunBox2DRopeAndChain.EXP_GETY2:
                    element = this.getElement(this.ho.getExpParam());
                    if (element) {
                        return CServices.floatToInt(this.getY2(element));
                    }
                    return 0;
                case CRunBox2DRopeAndChain.EXP_GETXMIDDLE:
                    element = this.getElement(this.ho.getExpParam());
                    if (element) {
                        var o = {};
                        if (this.base == null)
                            this.base = this.GetBase();
                        this.base.rGetBodyPosition(element.m_body, o);
                        var x2 = this.getX2(element);
                        return CServices.floatToInt((o.x + x2) / 2);
                    }
                    return 0;
                case CRunBox2DRopeAndChain.EXP_GETYMIDDLE:
                    element = this.getElement(this.ho.getExpParam());
                    if (element) {
                        var o = {};
                        if (this.base == null)
                            this.base = this.GetBase();
                        this.base.rGetBodyPosition(element.m_body, o);
                        var y2 = this.getY2(element);
                        return CServices.floatToInt((o.y + y2) / 2);
                    }
                    return 0;
                case CRunBox2DRopeAndChain.EXP_GETANGLE:
                    element = this.getElement(this.ho.getExpParam());
                    if (element) {
                        var angle = element.m_body.GetAngle() * 180 / Box2D.Common.b2Settings.b2_pi;
                        return CServices.floatToInt(angle);
                    }
                    return 0;
            }
            return 0;
        }

};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunBox2DRopeAndChain);

// JOINT OBJECT
////////////////////////////////////////////////////////////////////////
function CJointRC(object, element, joint) {
    this.element = element;
    this.joint = joint;
    this.object = object;
    this.counter = 0;
}

// ELEMENT OBJECT
////////////////////////////////////////////////////////////////////////
function CElement(racParent, image, number) {
    //call chain
    CRunMBase.call(this, racParent, image, number);

    //call self
    this.m_type = CRunBox2DBase.MTYPE_ELEMENT;
    this.number = number;
    this.racParent = racParent;
    this.nLayer = racParent.ho.ros.rsLayer;
    this.pLayer = racParent.rh.rhFrame.layers[this.nLayer];
    this.pLayer.planeSprites.addChild(this);
    this.x = 0;
    this.y = 0;
    this.angle = 0;
    this.destroyed = false;
    this.m_addVFlag = 0;
    this.m_addVX = 0;
    this.m_addVY = 0;
    this.image = image;
}

CElement.prototype = {
        destroy: function (base) {
            if (!this.destroyed) {
                this.destroyed = true;
                this.pLayer.planeSprites.removeChild(this);
                if (base != null) {
                    base.rDestroyBody(this.m_body);
                }
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
            this.racParent.base.rBodySetTransform(this.m_body, position, angle);
        },
        setPosition: function (x, y, angle) {
            this.x = x;
            this.y = y;
            this.angle = angle;

            this.racParent.base.rBodyAddVelocity(this.m_body, this.m_addVX, this.m_addVY);
            if (this.m_addVFlag) {
                this.m_addVFlag = false;
            } else {
                this.m_addVX = 0;
                this.m_addVY = 0;
            }

            if (this.nLayer != this.racParent.ho.ros.rsLayer) {
                this.pLayer.planeSprites.removeChild(this);
                this.nLayer = this.racParent.ho.ros.rsLayer;
                this.pLayer = this.racParent.rh.rhFrame.layers[this.nLayer];
                this.pLayer.planeSprites.addChild(this);
            }
        },
        draw: function (context, xx, yy) {
            if (this.racParent.ho.ros.rsFlags & CRSpr.RSFLAG_VISIBLE) {
                var image = this.racParent.rh.rhApp.imageBank.getImageFromHandle(this.image);
                if (image) {
                    context.renderImage(image, xx + this.x - this.racParent.rh.rhWindowX + this.pLayer.x, yy + this.y - this.racParent.rh.rhWindowY + this.pLayer.y, this.angle, 1.0, 1.0, 0, 0, this);
                }
            }
        }
    };

//setup inheritance using extend
CServices.extend(CRunMBase, CElement);
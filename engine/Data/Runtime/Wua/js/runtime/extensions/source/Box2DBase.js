// CRunBox2DBase : objet Physics - Engine
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

CRunBox2DBase.FANIDENTIFIER = 0x42324641;
CRunBox2DBase.TREADMILLIDENTIFIER = 0x4232544D;
CRunBox2DBase.MAGNETIDENTIFIER = 0x42369856;
CRunBox2DBase.GROUNDIDENTIFIER = 0x42324E4F;
CRunBox2DBase.ROPEANDCHAINIDENTIFIER = 0x4232EFFA;
CRunBox2DBase.CBFLAG_FIXEDROTATION = 0x0001;
CRunBox2DBase.CBFLAG_BULLET = 0x0002;
CRunBox2DBase.CBFLAG_DAMPING = 0x0004;
CRunBox2DBase.POSDEFAULT = 0x56586532;
CRunBox2DBase.DIRECTION_LEFTTORIGHT = 0;
CRunBox2DBase.DIRECTION_RIGHTTOLEFT = 1;
CRunBox2DBase.DIRECTION_TOPTOBOTTOM = 2;
CRunBox2DBase.DIRECTION_BOTTOMTOTOP = 3;
CRunBox2DBase.OBSTACLE_OBSTACLE = 0;
CRunBox2DBase.OBSTACLE_PLATFORM = 1;
CRunBox2DBase.B2FLAG_ADDBACKDROPS = 0x0001;
CRunBox2DBase.B2FLAG_BULLETCREATE = 0x0002;
CRunBox2DBase.B2FLAG_ADDOBJECTS = 0x0004;
CRunBox2DBase.TYPE_ALL = 0;
CRunBox2DBase.TYPE_DISTANCE = 1;
CRunBox2DBase.TYPE_REVOLUTE = 2;
CRunBox2DBase.TYPE_PRISMATIC = 3;
CRunBox2DBase.TYPE_PULLEY = 4;
CRunBox2DBase.TYPE_GEAR = 5;
CRunBox2DBase.TYPE_MOUSE = 6;
CRunBox2DBase.TYPE_WHEEL = 7;
CRunBox2DBase.RMOTORTORQUEMULT = 20.0;
CRunBox2DBase.RMOTORSPEEDMULT = 10.0;
CRunBox2DBase.PJOINTMOTORFORCEMULT = 20.0;
CRunBox2DBase.PJOINTMOTORSPEEDMULT = 10.0;
CRunBox2DBase.APPLYIMPULSE_MULT = 19.0;
CRunBox2DBase.APPLYANGULARIMPULSE_MULT = 0.1;
CRunBox2DBase.APPLYFORCE_MULT = 5.0;
CRunBox2DBase.APPLYTORQUE_MULT = 1.0;
CRunBox2DBase.SETVELOCITY_MULT = 20.5;
CRunBox2DBase.SETANGULARVELOCITY_MULT = 15.0;
CRunBox2DBase.JTYPE_NONE = 0;
CRunBox2DBase.JTYPE_REVOLUTE = 1;
CRunBox2DBase.JTYPE_DISTANCE = 2;
CRunBox2DBase.JTYPE_PRISMATIC = 3;
CRunBox2DBase.JANCHOR_HOTSPOT = 0;
CRunBox2DBase.JANCHOR_ACTIONPOINT = 1;
CRunBox2DBase.MAX_JOINTNAME = 24;
CRunBox2DBase.MAX_JOINTOBJECT = 24;

CRunBox2DBase.ACTION_SETGRAVITYFORCE = 0;
CRunBox2DBase.ACTION_SETGRAVITYANGLE = 1;
//null  2
//null  3
//null  4
//null  5
//null  6
//null  7
CRunBox2DBase.ACTION_DJOINTHOTSPOT = 8;
CRunBox2DBase.ACTION_DJOINTACTIONPOINT = 9;
CRunBox2DBase.ACTION_DJOINTPOSITION = 10;
CRunBox2DBase.ACTION_RJOINTHOTSPOT = 11;
CRunBox2DBase.ACTION_RJOINTACTIONPOINT = 12;
CRunBox2DBase.ACTION_RJOINTPOSITION = 13;
CRunBox2DBase.ACTION_PJOINTHOTSPOT = 14;
CRunBox2DBase.ACTION_PJOINTACTIONPOINT = 15;
CRunBox2DBase.ACTION_PJOINTPOSITION = 16;
// ACTION_GJOINTHOTSPOT        17
// ACTION_GJOINTACTIONPOINT    18
// ACTION_GJOINTPOSITION        19
// ACTION_WJOINTHOTSPOT        20
// ACTION_WJOINTACTIONPOINT    21
// ACTION_WJOINTPOSITION        22
CRunBox2DBase.ACTION_ADDOBJECT = 23;
CRunBox2DBase.ACTION_SUBOBJECT = 24;
CRunBox2DBase.ACTION_SETDENSITY = 25;
CRunBox2DBase.ACTION_SETFRICTION = 26;
CRunBox2DBase.ACTION_SETELASTICITY = 27;
CRunBox2DBase.ACTION_SETGRAVITY = 28;
CRunBox2DBase.ACTION_DJOINTSETELASTICITY = 29;
CRunBox2DBase.ACTION_RJOINTSETLIMITS = 30;
CRunBox2DBase.ACTION_RJOINTSETMOTOR = 31;
CRunBox2DBase.ACTION_PJOINTSETLIMITS = 32;
CRunBox2DBase.ACTION_PJOINTSETMOTOR = 33;
CRunBox2DBase.ACTION_PUJOINTHOTSPOT = 34;
CRunBox2DBase.ACTION_PUJOINTACTIONPOINT = 35;
// ACTION_WJOINTSETMOTOR        36
// ACTION_WJOINTSETELASTICITY    37
CRunBox2DBase.ACTION_DESTROYJOINT = 38;
CRunBox2DBase.ACTION_SETITERATIONS = 39;
CRunBox2DBase.ACTION_PAUSE = 40;
CRunBox2DBase.ACTION_RESUME = 41;

CRunBox2DBase.EXPRESSION_GRAVITYSTRENGTH = 0;
CRunBox2DBase.EXPRESSION_GRAVITYANGLE = 1;
CRunBox2DBase.EXPRESSION_VELOCITYITERATIONS = 2;
CRunBox2DBase.EXPRESSION_POSITIONITERATIONS = 3;
CRunBox2DBase.EXPRESSION_ELASTICITYFREQUENCY = 4;
CRunBox2DBase.EXPRESSION_ELASTICITYDAMPING = 5;
CRunBox2DBase.EXPRESSION_LOWERANGLELIMIT = 6;
CRunBox2DBase.EXPRESSION_UPPERANGLELIMIT = 7;
CRunBox2DBase.EXPRESSION_MOTORSTRENGTH = 8;
CRunBox2DBase.EXPRESSION_MOTORSPEED = 9;
CRunBox2DBase.EXPRESSION_LOWERTRANSLATION = 10;
CRunBox2DBase.EXPRESSION_UPPERTRANSLATION = 11;
CRunBox2DBase.EXPRESSION_PMOTORSTRENGTH = 12;
CRunBox2DBase.EXPRESSION_PMOTORSPEED = 13;

function CRunBox2DBase() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.flags = 0;
    this.world = null;
    this.gravity = 0;
    this.factor = 0;
    this.angle = 0;
    this.angleBase = 0;
    this.xBase = 0;
    this.yBase = 0;
    this.velocityIterations = 0;
    this.positionIterations = 0;
    this.friction = 0;
    this.restitution = 0;
    this.contactListener = null;
    this.started = false;
    this.fans = new CArrayList();
    this.treadmills = new CArrayList();
    this.magnets = new CArrayList();
    this.ropes = new CArrayList();
    this.bulletGravity = 0;
    this.bulletDensity = 0;
    this.bulletRestitution = 0;
    this.bulletFriction = 0;
    this.objects = new CArrayList();
    this.objectIDs = new CArrayList();
    this.joints = new CArrayList();
    this.npDensity = 0;
    this.npFriction = 0;
    this.bodiesToDestroy = new CArrayList();
    this.bListener = false;
    this.bPaused = false;
}

CRunBox2DBase.prototype = {
    GetObjects: function () {
        var rhPtr = this.ho.hoAdRunHeader;
        var pOL = 0;
        var nObjects;
        for (nObjects = 0; nObjects < rhPtr.rhNObjects; pOL++, nObjects++) {
            while (rhPtr.rhObjectList[pOL] == 0) {
                pOL++;
            }
            var pObject = rhPtr.rhObjectList[pOL];
            if (pObject.hoType >= 32) {
                if (pObject.hoCommon.ocIdentifier == CRunBox2DBase.FANIDENTIFIER) {
                    if (pObject.ext.identifier == this.identifier) {
                        this.fans.add(pObject.ext);
                    }
                }
                if (pObject.hoCommon.ocIdentifier == CRunBox2DBase.MAGNETIDENTIFIER) {
                    if (pObject.ext.identifier == this.identifier) {
                        this.magnets.add(pObject.ext);
                    }
                }
                if (pObject.hoCommon.ocIdentifier == CRunBox2DBase.TREADMILLIDENTIFIER) {
                    if (pObject.ext.identifier == this.identifier) {
                        this.treadmills.add(pObject.ext);
                    }
                }
                if (pObject.hoCommon.ocIdentifier == CRunBox2DBase.ROPEANDCHAINIDENTIFIER) {
                    if (pObject.ext.identifier == this.identifier) {
                        this.ropes.add(pObject.ext);
                    }
                }
            }
        }
        return null;
    },

    rWorldToFrame: function (pVec) {
        pVec.x = (pVec.x * this.factor) - this.xBase;
        pVec.y = this.yBase - (pVec.y * this.factor);
    },

    rFrameToWorld: function (pVec) {
        pVec.x = (this.xBase + pVec.x) / this.factor;
        pVec.y = (this.yBase - pVec.y) / this.factor;
    },

    rRJointSetLimits: function (pJoint, angle1, angle2) {
        var lAngle = angle1 * Box2D.Common.b2Settings.b2_pi / 180.0;
        var uAngle = angle2 * Box2D.Common.b2Settings.b2_pi / 180.0;
        if (lAngle > uAngle) {
            pJoint.EnableLimit(false);
        }
        else {
            pJoint.EnableLimit(true);
            pJoint.SetLimits(lAngle, uAngle);
        }
    },

    rRJointSetMotor: function (pJoint, t, s) {
        var torque = t / 100.0 * CRunBox2DBase.RMOTORTORQUEMULT;
        var speed = s / 100.0 * CRunBox2DBase.RMOTORSPEEDMULT;
        var flag = true;
        if (torque == 0 && speed == 0) {
            flag = false;
        }
        pJoint.EnableMotor(flag);
        pJoint.SetMaxMotorTorque(torque);
        pJoint.SetMotorSpeed(speed);
    },

    rWorldCreateRevoluteJoint: function (jointDef, body1, body2, position) {
        jointDef.Initialize(body1, body2, position);
        return this.world.CreateJoint(jointDef);
    },

    rJointCreate: function (pMBase1, jointType, jointAnchor, jointName, jointObject, param1, param2) {
        if (jointType == CRunBox2DBase.JTYPE_NONE) {
            return null;
        }

        var pOL = 0;
        var nObjects = 0;
        var pMBase2 = null;
        var distance = 10000000;
        for (nObjects = 0; nObjects < this.rh.rhNObjects; pOL++, nObjects++) {
            while (this.rh.rhObjectList[pOL] == null) {
                pOL++;
            }
            var pObject = this.rh.rhObjectList[pOL];
            if (CServices.compareStringsIgnoreCase(pObject.hoOiList.oilName, jointObject)) {
                var pMBaseObject = this.GetMBase(pObject);
                if (pMBaseObject != null) {
                    var deltaX = pMBaseObject.m_pHo.hoX - pMBase1.m_pHo.hoX;
                    var deltaY = pMBaseObject.m_pHo.hoY - pMBase1.m_pHo.hoY;
                    var d = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                    if (d <= distance) {
                        distance = d;
                        pMBase2 = pMBaseObject;
                    }
                }
            }
        }
        if (pMBase2 != null) {
            var pJoint = this.CreateJoint(jointName);
            if (pJoint != null) {
                switch (jointType) {
                    case CRunBox2DBase.JTYPE_REVOLUTE:
                    {
                        var jointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
                        jointDef.collideConnected = true;
                        if (param1 > param2) {
                            jointDef.enableLimit = false;
                        } else {
                            jointDef.enableLimit = true;
                            jointDef.lowerAngle = param1;
                            jointDef.upperAngle = param2;
                        }
                        var position;
                        switch (jointAnchor) {
                            case CRunBox2DBase.JANCHOR_HOTSPOT:
                                position = pMBase1.m_body.GetPosition();
                                break;
                            case CRunBox2DBase.JANCHOR_ACTIONPOINT:
                                position = this.GetActionPointPosition(pMBase1);
                                break;
                        }
                        jointDef.Initialize(pMBase1.m_body, pMBase2.m_body, position);
                        pJoint.SetJoint(CRunBox2DBase.TYPE_REVOLUTE, this.world.CreateJoint(jointDef));
                        return pJoint.m_joint;
                    }
                    case CRunBox2DBase.JTYPE_DISTANCE:
                    {
                        var jointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
                        jointDef.collideConnected = true;
                        jointDef.frequencyHz = param1;
                        jointDef.dampingRatio = param2;
                        var position1, position2;
                        switch (jointAnchor) {
                            case CRunBox2DBase.JANCHOR_HOTSPOT:
                                position1 = pMBase1.m_body.GetPosition();
                                position2 = pMBase2.m_body.GetPosition();
                                break;
                            case CRunBox2DBase.JANCHOR_ACTIONPOINT:
                                position1 = this.GetActionPointPosition(pMBase1);
                                position2 = this.GetActionPointPosition(pMBase2);
                                break;
                        }
                        jointDef.Initialize(pMBase1.m_body, pMBase2.m_body, position1, position2);
                        pJoint.SetJoint(CRunBox2DBase.TYPE_DISTANCE, this.world.CreateJoint(jointDef));
                        return pJoint.m_joint;
                    }
                        break;
                    case CRunBox2DBase.JTYPE_PRISMATIC:
                    {
                        var jointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
                        jointDef.collideConnected = true;
                        if (param1 > param2) {
                            jointDef.enableLimit = false;
                        } else {
                            jointDef.enableLimit = true;
                            jointDef.lowerTranslation = param1 / this.factor;
                            jointDef.upperTranslation = param2 / this.factor;
                        }
                        var position1, position2;
                        switch (jointAnchor) {
                            case CRunBox2DBase.JANCHOR_HOTSPOT:
                                position1 = pMBase1.m_body.GetPosition();
                                position2 = pMBase2.m_body.GetPosition();
                                break;
                            case CRunBox2DBase.JANCHOR_ACTIONPOINT:
                                position1 = this.GetActionPointPosition(pMBase1);
                                position2 = this.GetActionPointPosition(pMBase2);
                                break;
                        }
                        var axis = new Box2D.Common.Math.b2Vec2(position2.x - position1.x, position2.y - position1.y);
                        jointDef.Initialize(pMBase1.m_body, pMBase2.m_body, position1, axis);
                        pJoint.SetJoint(CRunBox2DBase.TYPE_PRISMATIC, this.world.CreateJoint(jointDef));
                        return pJoint.m_joint;
                    }
                        break;
                }
            }
        }
        return null;
    },

    rCreateBody: function (type, x, y, angle, gravity, pMBase, flags, deceleration) {
        if (pMBase != null && type != Box2D.Dynamics.b2Body.b2_staticBody && pMBase.m_type != CRunMBase.MTYPE_PLATFORM && pMBase.m_type != CRunMBase.MTYPE_OBSTACLE) {
            var n;
            for (n = 0; n < this.fans.size(); n++) {
                this.fans.get(n).rAddObject(pMBase);
            }
            for (n = 0; n < this.magnets.size(); n++) {
                this.magnets.get(n).rAddObject(pMBase);
            }
            for (n = 0; n < this.treadmills.size(); n++) {
                this.treadmills.get(n).rAddObject(pMBase);
            }
        }
        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.type = type;
        bodyDef.position.Set((this.xBase + x) / this.factor, (this.yBase - y) / this.factor);
        bodyDef.angle = ((angle * Box2D.Common.b2Settings.b2_pi) / 180.0);
        bodyDef.gravityScale = gravity;
        bodyDef.userData = pMBase;
        if (flags & CRunBox2DBase.CBFLAG_FIXEDROTATION) {
            bodyDef.fixedRotation = true;
        }
        if (flags & CRunBox2DBase.CBFLAG_BULLET) {
            bodyDef.bullet = true;
        }
        if (flags & CRunBox2DBase.CBFLAG_DAMPING) {
            bodyDef.linearDamping = deceleration;
        }
        var pBody = this.world.CreateBody(bodyDef);
        return pBody;
    },

    rDestroyBody: function (pBody) {
        if (!this.bListener) {
            this.world.SetContactListener(this.contactListener);
        }
        if (this.contactListener.bWorking) {
            this.bodiesToDestroy.add(pBody);
            return;
        }

        var pMBase = pBody.GetUserData();
        if (pMBase != null) {
            if (pMBase.m_type != CRunMBase.MTYPE_PLATFORM && pMBase.m_type != CRunMBase.MTYPE_OBSTACLE) {
                var n;
                for (n = 0; n < this.fans.size() ; n++) {
                    this.fans.get(n).rRemoveObject(pMBase);
                }
                for (n = 0; n < this.magnets.size() ; n++) {
                    this.magnets.get(n).rRemoveObject(pMBase);
                }
                for (n = 0; n < this.treadmills.size() ; n++) {
                    this.treadmills.get(n).rRemoveObject(pMBase);
                }
                for (n = 0; n < this.ropes.size() ; n++) {
                    this.ropes.get(n).rRemoveObject(pMBase);
                }
            }
            pBody.SetUserData(null);
        }
        this.destroyJointWithBody(pBody);
        this.world.DestroyBody(pBody);
        if (!this.bListener) {
            this.world.SetContactListener(null);
        }
    },

    rBodyDestroyFixture: function (body, fixture) {
        body.DestroyFixture(fixture);
    },

    rBodyCreateBoxFixture: function (pBody, pMBase, x, y, sx, sy, density, friction, restitution) {
        sx -= 1;
        sy -= 1;
        if (pMBase != null) {
            pMBase.rc.left = -sx / 2;
            pMBase.rc.right = sx / 2;
            pMBase.rc.top = -sy / 2;
            pMBase.rc.bottom = sy / 2;
        }

        var box = new Box2D.Collision.Shapes.b2PolygonShape();
        var vect = new Box2D.Common.Math.b2Vec2((this.xBase + x) / this.factor, (this.yBase - (y)) / this.factor);
        box.SetAsBox(sx / 2.0 / this.factor, sy / 2.0 / this.factor, pBody.GetLocalPoint(vect), 0);

        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.shape = box;
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;
        fixtureDef.userData = this;
        return pBody.CreateFixture(fixtureDef);
    },

    rBodyCreateCircleFixture: function (pBody, pMBase, x, y, radius, density, friction, restitution) {
        if (pMBase != null) {
            pMBase.rc.left = -radius;
            pMBase.rc.right = radius;
            pMBase.rc.top = -radius;
            pMBase.rc.bottom = radius;
        }

        var circle = new Box2D.Collision.Shapes.b2CircleShape();
        circle.m_radius = radius / this.factor;
        var vect = new Box2D.Common.Math.b2Vec2((this.xBase + x) / this.factor, (this.yBase - y) / this.factor);
        var local = pBody.GetLocalPoint(vect);
        circle.m_p.Set(local.x, local.y);

        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.shape = circle;
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;
        fixtureDef.userData = this;
        return pBody.CreateFixture(fixtureDef);
    },

    rCreateDistanceJoint: function (pBody1, pBody2, dampingRatio, frequency, x, y) {
        var position1 = new Box2D.Common.Math.b2Vec2(pBody1.GetPosition().x, pBody1.GetPosition().y);
        position1.x += x / this.factor;
        position1.y += y / this.factor;
        var position2 = new Box2D.Common.Math.b2Vec2(pBody2.GetPosition().x, pBody2.GetPosition().y);
        var JointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
        JointDef.collideConnected = false;
        JointDef.frequencyHz = frequency;
        JointDef.dampingRatio = dampingRatio;
        JointDef.Initialize(pBody1, pBody2, position1, position2);
        this.world.CreateJoint(JointDef);
    },

    rBodyApplyForce: function (pBody, force, angle) {
        var position = new Box2D.Common.Math.b2Vec2(pBody.GetPosition().x, pBody.GetPosition().y);
        var f = new Box2D.Common.Math.b2Vec2(force * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0), force * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0));
        pBody.ApplyForce(f, position);
    },

    rBodyStopForce: function (pBody) {
        pBody.ResetForce();
    },

    rBodyApplyAngularImpulse: function (pBody, torque) {
        pBody.ApplyTorque(torque);
        //pBody.SetAngularVelocity(torque * 100);
    },

    rBodyApplyTorque: function (pBody, torque) {
        pBody.ApplyTorque(torque);
    },

    rBodyStopTorque: function (pBody) {
        pBody.ResetTorque();
    },

    rBodySetAngularVelocity: function (pBody, torque) {
        pBody.SetAngularVelocity(torque);
    },

    rBodyAddVelocity: function (pBody, vx, vy) {
        var velocity = pBody.GetLinearVelocity();
        velocity.x += vx;
        velocity.y += vy;
        pBody.SetLinearVelocity(velocity);
    },

    rBodyApplyMMFImpulse: function (pBody, force, angle) {
        var velocity = pBody.GetLinearVelocity();
        if (angle > 360) {
            angle -= 360;
        }
        var f = new Box2D.Common.Math.b2Vec2(force * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0), force * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0));
        velocity.x += f.x / pBody.GetMass();
        velocity.y += f.y / pBody.GetMass();
        pBody.SetLinearVelocity(velocity);
    },

    rBodyApplyImpulse: function (pBody, force, angle) {
        var position = new Box2D.Common.Math.b2Vec2(pBody.GetPosition().x, pBody.GetPosition().y);
        var f = new Box2D.Common.Math.b2Vec2(force * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0), force * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0));
        pBody.ApplyImpulse(f, position);
    },

    rBodyGetAngle: function (body) {
        return body.GetAngle() * 180.0 / Box2D.Common.b2Settings.b2_pi;
    },

    rBodySetPosition: function (pBody, x, y) {
        var angle = pBody.GetAngle();
        var position = new Box2D.Common.Math.b2Vec2(pBody.GetPosition().x, pBody.GetPosition().y);
        if (x != CRunBox2DBase.POSDEFAULT) {
            position.x = (this.xBase + x) / this.factor;
        }
        if (y != CRunBox2DBase.POSDEFAULT) {
            position.y = (this.yBase - y) / this.factor;
        }
        pBody.SetPositionAndAngle(position, angle);
    },

    rBodySetAngle: function (pBody, angle) {
        var position = new Box2D.Common.Math.b2Vec2(pBody.GetPosition().x, pBody.GetPosition().y);
        pBody.SetPositionAndAngle(position, angle * Box2D.Common.b2Settings.b2_pi / 180.0);
    },

    rBodySetLinearVelocity: function (pBody, force, angle) {
        var f = new Box2D.Common.Math.b2Vec2(force * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0), force * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0));
        pBody.SetLinearVelocity(f);
    },

    rBodyAddLinearVelocity: function (pBody, speed, angle) {
        var v = new Box2D.Common.Math.b2Vec2(speed * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0), speed * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0));
        var velocity = pBody.GetLinearVelocity();
        velocity.x += v.x;
        velocity.y += v.y;
        pBody.SetLinearVelocity(velocity);
    },

    rBodySetLinearVelocityAdd: function (pBody, force, angle, vx, vy) {
        var f = new Box2D.Common.Math.b2Vec2(force * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0) + vx, force * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0) + vy);
        pBody.SetLinearVelocity(f);
    },

    isPoint: function (pMask, x, y) {
        var offset = (y * pMask.lineWidth) + Math.floor(x / 16);
        var m = (0x8000) >>> (x & 15);
        return (pMask.mask[offset] & m) != 0;
    },

    PointOK: function (xNew, yNew, xOld, yOld, angle) {
        var deltaX = xNew - xOld;
        var deltaY = yNew - yOld;
        var a = angle.angle;
        angle.angle = (Math.atan2(deltaY, deltaX) * 57.2957795);
        if (a == angle.angle) {
            return false;
        }
        return true;
    },

    rBodyCreateShapeFixture: function (pBody, pMBase, xp, yp, img, density, friction, restitution, scaleX, scaleY) {
        var box = new Box2D.Collision.Shapes.b2PolygonShape();
        var image = this.rh.rhApp.imageBank.getImageFromHandle(img);
        var pMask = image.getMask(0, 0, 1.0, 1.0);
        var width = pMask.width;
        var height = pMask.height;
        var x, y, xPrevious, yPrevious;
        var xArray = new Array();
        var yArray = new Array();
        var xPos, yPos;
        var angle;
        var count = 0;
        var scaleError = 1.0;       // (height - 2.0) / height;

        if (pMBase != null) {
            pMBase.rc.left = -width / 2 * scaleX;
            pMBase.rc.right = width / 2 * scaleX;
            pMBase.rc.top = -height / 2 * scaleY;
            pMBase.rc.bottom = height / 2 * scaleY;
        }

        var bBackground = false;
        if (density < 0) {
            bBackground = true;
            density = 0;
        }

        // Right - bottom
        for (y = height - 1, xPos = -1; y >= 0; y--) {
            for (x = width - 1; x >= 0; x--) {
                if (this.isPoint(pMask, x, y)) {
                    if (x > xPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        if (xPos < 0) {
            return this.rBodyCreateBoxFixture(pBody, pMBase, xp, yp, pMask.width, pMask.height, density, friction, restitution);
        }
        xPrevious = xArray[count] = xPos;
        yPrevious = yArray[count] = yPos;
        count++;

        // Right - top
        for (y = 0, xPos = -1; y < height; y++) {
            for (x = width - 1; x >= 0; x--) {
                if (this.isPoint(pMask, x, y)) {
                    if (x > xPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        angle = {};
        angle.angle = 1000;
        var c;
        if (this.PointOK(xPos, yPos, xPrevious, yPrevious, angle)) {
            for (c = 0; c < count; c++) {
                if (xArray[c] == xPos && yArray[c] == yPos) {
                    break;
                }
            }
            if (c == count) {
                xPrevious = xArray[count] = xPos;
                yPrevious = yArray[count++] = yPos;
            }
        }

        // Top - right
        for (x = width - 1, yPos = 10000; x >= 0; x--) {
            for (y = 0; y < height; y++) {
                if (this.isPoint(pMask, x, y)) {
                    if (y < yPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        for (c = 0; c < count; c++) {
            if (xArray[c] == xPos && yArray[c] == yPos) {
                break;
            }
        }
        if (c == count) {
            if (!this.PointOK(xPos, yPos, xPrevious, yPrevious, angle)) {
                count--;
            }
            xPrevious = xArray[count] = xPos;
            yPrevious = yArray[count++] = yPos;
        }

        // Top - left
        for (x = 0, yPos = 10000; x < width; x++) {
            for (y = 0; y < height; y++) {
                if (this.isPoint(pMask, x, y)) {
                    if (y < yPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        for (c = 0; c < count; c++) {
            if (xArray[c] == xPos && yArray[c] == yPos) {
                break;
            }
        }
        if (c == count) {
            if (!this.PointOK(xPos, yPos, xPrevious, yPrevious, angle)) {
                count--;
            }
            xPrevious = xArray[count] = xPos;
            yPrevious = yArray[count++] = yPos;
        }

        // Left - top
        for (y = 0, xPos = 10000; y < height; y++) {
            for (x = 0; x < width; x++) {
                if (this.isPoint(pMask, x, y)) {
                    if (x < xPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        for (c = 0; c < count; c++) {
            if (xArray[c] == xPos && yArray[c] == yPos) {
                break;
            }
        }
        if (c == count) {
            if (!this.PointOK(xPos, yPos, xPrevious, yPrevious, angle)) {
                count--;
            }
            xPrevious = xArray[count] = xPos;
            yPrevious = yArray[count++] = yPos;
        }

        // Left - bottom
        for (y = height - 1, xPos = 10000; y >= 0; y--) {
            for (x = 0; x < width; x++) {
                if (this.isPoint(pMask, x, y)) {
                    if (x < xPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        for (c = 0; c < count; c++) {
            if (xArray[c] == xPos && yArray[c] == yPos) {
                break;
            }
        }
        if (c == count) {
            if (!this.PointOK(xPos, yPos, xPrevious, yPrevious, angle)) {
                count--;
            }
            xPrevious = xArray[count] = xPos;
            yPrevious = yArray[count++] = yPos;
        }

        // Bottom - left
        for (x = 0, yPos = -1; x < width; x++) {
            for (y = height - 1; y >= 0; y--) {
                if (this.isPoint(pMask, x, y)) {
                    if (y > yPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        for (c = 0; c < count; c++) {
            if (xArray[c] == xPos && yArray[c] == yPos) {
                break;
            }
        }
        if (c == count) {
            if (!this.PointOK(xPos, yPos, xPrevious, yPrevious, angle)) {
                count--;
            }
            xPrevious = xArray[count] = xPos;
            yPrevious = yArray[count++] = yPos;
        }

        // Bottom - right
        for (x = width - 1, yPos = -1; x >= 0; x--) {
            for (y = height - 1; y >= 0; y--) {
                if (this.isPoint(pMask, x, y)) {
                    if (y > yPos) {
                        xPos = x;
                        yPos = y;
                    }
                    break;
                }
            }
        }
        for (c = 0; c < count; c++) {
            if (xArray[c] == xPos && yArray[c] == yPos) {
                break;
            }
        }
        if (c == count) {
            if (!this.PointOK(xPos, yPos, xPrevious, yPrevious, angle)) {
                count--;
            }
            xArray[count] = xPos;
            yArray[count++] = yPos;
        }

        if (count <= 1) {
            return this.rBodyCreateBoxFixture(pBody, pMBase, xp, yp, pMask.width, pMask.height, density, friction, restitution);
        }

        if (count == 2) {
            var xTemp = new Array();
            var yTemp = new Array();
            if (xArray[0] != xArray[1]) {
                xTemp[0] = xArray[0];
                yTemp[0] = yArray[0] + 1;
                xTemp[1] = xArray[0];
                yTemp[1] = yArray[0];
                xTemp[2] = xArray[1];
                yTemp[2] = yArray[1];
                xTemp[3] = xArray[1];
                yTemp[3] = yArray[1] + 1;
            }
            else {
                xTemp[0] = xArray[0];
                yTemp[0] = yArray[0];
                xTemp[1] = xArray[1];
                yTemp[1] = yArray[1];
                xTemp[2] = xArray[1] - 1;
                yTemp[2] = yArray[1];
                xTemp[3] = xArray[0] - 1;
                yTemp[3] = yArray[0];
            }
            xArray = xTemp;
            yArray = yTemp;
            count = 4;
        }

        var xMiddle = 0;
        var yMiddle = 0;
        if (!bBackground) {
            var n;
            for (n = 0; n < count; n++) {
                xMiddle += xArray[n];
                yMiddle += yArray[n];
            }
            xMiddle /= count;
            yMiddle /= count;
        }
        else {
            xMiddle = width / 2;
            yMiddle = height / 2;
        }

        var vertices = new Array();
        for (n = 0; n < count; n++) {
            vertices[n] = new Box2D.Common.Math.b2Vec2(0, 0);
            var fx = ((xArray[n] - xMiddle) / this.factor * scaleX * scaleError);
            var fy = ((yMiddle - yArray[n]) / this.factor * scaleY * scaleError);
            vertices[n].Set(fx, fy);
        }

        var polygon;
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        polygon = new Box2D.Collision.Shapes.b2PolygonShape();
        polygon.SetAsArray(vertices, count);

        fixtureDef.shape = polygon;
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;
        fixtureDef.userData = this;
        return pBody.CreateFixture(fixtureDef);
    },

    rCreateBullet: function (angle, speed, pMBase) {
        if ((this.flags & CRunBox2DBase.B2FLAG_BULLETCREATE) == 0) {
            return null;
        }

        var hoPtr = pMBase.m_pHo;

        var bodyDef = new Box2D.Dynamics.b2BodyDef();
        bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.position.Set((this.xBase + hoPtr.hoX) / this.factor, (this.yBase - hoPtr.hoY) / this.factor);
        bodyDef.angle = ((angle * Box2D.Common.b2Settings.b2_pi) / 180.0);
        bodyDef.gravityScale = this.bulletGravity;
        bodyDef.userData = pMBase;
        pBody = this.world.CreateBody(bodyDef);

        this.rBodyCreateShapeFixture(pBody, pMBase, hoPtr.hoX, hoPtr.hoY, hoPtr.roc.rcImage, this.bulletDensity, this.bulletFriction, this.bulletRestitution, hoPtr.roc.rcScaleX, hoPtr.roc.rcScaleY);

        var velocity = new Box2D.Common.Math.b2Vec2(speed * Math.cos(angle * Box2D.Common.b2Settings.b2_pi / 180.0), speed * Math.sin(angle * Box2D.Common.b2Settings.b2_pi / 180.0));
        pBody.SetLinearVelocity(velocity);

        return pBody;
    },

    rBodyResetMassData: function (pBody) {
        pBody.ResetMassData();
    },

    rBodySetTransform: function (pBody, position, angle) {
        pBody.SetPositionAndAngle(position, angle);
    },

    rGetBodyPosition: function (pBody, o) {
        var vect = pBody.GetPosition();
        var position = new Box2D.Common.Math.b2Vec2(vect.x, vect.y);
        this.rWorldToFrame(position);
        o.x = CServices.floatToInt(position.x);
        o.y = CServices.floatToInt(position.y);
        o.angle = CServices.floatToInt(((pBody.GetAngle() * 180) / Box2D.Common.b2Settings.b2_pi));
    },

    rGetImageDimensions: function (img, o) {
        var image = this.rh.rhApp.imageBank.getImageFromHandle(img);
        var pMask = image.getMask(0, 0, 1.0, 1.0);

        var xx, yy, previousX = -1, previousY = -1;
        var count = 1;
        o.y1 = 0, o.y2 = pMask.height - 1;
        var quit = false;
        for (yy = 0, quit = false; yy < pMask.height; yy++) {
            for (xx = 0; xx < pMask.width; xx++) {
                if (this.isPoint(pMask, xx, yy)) {
                    o.y1 = yy;
                    quit = true;
                    break;
                }
            }
            if (quit) {
                break;
            }
        }
        for (yy = pMask.height - 1, quit = false; yy >= 0; yy--) {
            for (xx = 0; xx < pMask.width; xx++) {
                if (this.isPoint(pMask, xx, yy)) {
                    o.y2 = yy;
                    quit = true;
                    break;
                }
            }
            if (quit) {
                break;
            }
        }
        o.x1 = 0, o.x2 = pMask.width - 1;
        for (xx = 0, quit = false; xx < pMask.width; xx++) {
            for (yy = 0; yy < pMask.height; yy++) {
                if (this.isPoint(pMask, xx, yy)) {
                    o.x1 = xx;
                    quit = true;
                    break;
                }
            }
            if (quit) {
                break;
            }
        }
        for (xx = pMask.width - 1, quit = false; xx >= 0; xx--) {
            for (yy = pMask.height - 1; yy >= 0; yy--) {
                if (this.isPoint(pMask, xx, yy)) {
                    o.x2 = xx;
                    quit = true;
                    break;
                }
            }
            if (quit) {
                break;
            }
        }
    },

    rBodyCreatePlatformFixture: function (pBody, pMBase, img, vertical, dummy, density, friction, restitution, o, scaleX, scaleY, maskWidth) {
        var dims = {};
        this.rGetImageDimensions(img, dims);
        dims.x1 *= scaleX;
        dims.x2 *= scaleX;
        dims.y1 *= scaleY;
        dims.y2 *= scaleY;
        maskWidth = Math.max(maskWidth, 0.1);
        var image = this.rh.rhApp.imageBank.getImageFromHandle(img);
        var pMask = image.getMask(0, 0, 1.0, 1.0);
        var xx, yy;

        var vertices = new Array();
        var n;
        for (n = 0; n < 6; n++) {
            vertices[n] = new Box2D.Common.Math.b2Vec2(0, 0);
        }

        var sx = dims.x2 - dims.x1;
        var middleX = (dims.x1 + dims.x2) / 2;
        var middleY = 0;    //(y1+y2)/2; // 0
        var sy = (dims.y1 + dims.y2) / 2;

        xx = -sx / 4 * maskWidth;
        yy = middleY;
        vertices[0].Set(xx / this.factor, yy / this.factor);
        xx = sx / 4 * maskWidth;
        vertices[1].Set(xx / this.factor, yy / this.factor);

        xx = sx / 2 * maskWidth;
        yy = middleY + sy / 8;
        vertices[2].Set(xx / this.factor, yy / this.factor);

        xx = sx / 2 * maskWidth;
        yy = middleY + sy * 2;
        vertices[3].Set(xx / this.factor, yy / this.factor);
        xx = -sx / 2 * maskWidth;
        vertices[4].Set(xx / this.factor, yy / this.factor);

        xx = -sx / 2 * maskWidth;
        yy = middleY + sy / 8;
        vertices[5].Set(xx / this.factor, yy / this.factor);

        o.offsetX = sx;
        o.offsetY = sy;
        pMBase.rc.left = -middleX * maskWidth;
        pMBase.rc.right = middleX * maskWidth;
        pMBase.rc.top = -sy;
        pMBase.rc.bottom = sy;

        var polygon = new Box2D.Collision.Shapes.b2PolygonShape();
        polygon.SetAsArray(vertices, 6);
        var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
        fixtureDef.shape = polygon;
        fixtureDef.density = density;
        fixtureDef.friction = friction;
        fixtureDef.restitution = restitution;
        fixtureDef.userData = this;
        o.pFixture = pBody.CreateFixture(fixtureDef);
    },

    computeGroundObjects: function () {
        var rhPtr = this.ho.hoAdRunHeader;
        var pOL = 0;
        var ocGrounds = new CArrayList();
        var ocGround;
        for (var nObjects = 0; nObjects < rhPtr.rhNObjects; nObjects++) {
            while (rhPtr.rhObjectList[pOL] == 0) {
                pOL++;
            }
            var pHo = rhPtr.rhObjectList[pOL];
            pOL++;
            if (pHo.hoType >= 32) {
                if (pHo.hoCommon.ocIdentifier == CRunBox2DBase.GROUNDIDENTIFIER) {
                    var pGround = pHo.ext;
                    if (pGround.identifier == this.identifier) {
                        var n;
                        for (n = 0; n < ocGrounds.size(); n++) {
                            if (ocGrounds.get(n) == pHo.hoCommon) {
                                break;
                            }
                        }
                        if (n == ocGrounds.size()) {
                            ocGrounds.add(pHo.hoCommon);
                            ocGround = pHo.hoCommon;
                            var obstacle = pGround.obstacle;
                            var direction = pGround.direction;
                            var pOL2 = pOL;
                            var list = new CArrayList();
                            list.add(pGround);
                            for (var nObjects2 = nObjects + 1; nObjects2 < rhPtr.rhNObjects; nObjects2++) {
                                while (rhPtr.rhObjectList[pOL2] == 0) {
                                    pOL2++;
                                }
                                pHo = rhPtr.rhObjectList[pOL2];
                                pOL2++;

                                if (pHo.hoType >= 32) {
                                    if (pHo.hoCommon.ocIdentifier == CRunBox2DBase.GROUNDIDENTIFIER && pHo.hoCommon == ocGround) {
                                        var pGround2 = pHo.ext;
                                        if (pGround2.identifier == this.identifier && pGround2.obstacle == obstacle && pGround2.direction == direction) {
                                            list.add(pGround2);
                                        }
                                    }
                                }
                            }
                            if (list.size() > 1) {
                                var pos;
                                var flag;
                                do {
                                    flag = false;
                                    pos = 0;
                                    do {
                                        var pSort1 = list.get(pos);
                                        var pSort2 = list.get(pos + 1);
                                        var temp;
                                        var x1 = pSort1.ho.hoX + 8;
                                        var x2 = pSort2.ho.hoX + 8;
                                        var y1 = pSort1.ho.hoY + 8;
                                        var y2 = pSort2.ho.hoY + 8;
                                        switch (direction) {
                                            case CRunBox2DBase.DIRECTION_LEFTTORIGHT:
                                                if (x2 < x1) {
                                                    temp = pSort1;
                                                    list.set(pos, pSort2);
                                                    list.set(pos + 1, temp);
                                                    flag = true;
                                                }
                                                break;
                                            case CRunBox2DBase.DIRECTION_RIGHTTOLEFT:
                                                if (x2 > x1) {
                                                    temp = pSort1;
                                                    list.set(pos, pSort2);
                                                    list.set(pos + 1, temp);
                                                    flag = true;
                                                }
                                                break;
                                            case CRunBox2DBase.DIRECTION_TOPTOBOTTOM:
                                                if (y2 < y1) {
                                                    temp = pSort1;
                                                    list.set(pos, pSort2);
                                                    list.set(pos + 1, temp);
                                                    flag = true;
                                                }
                                                break;
                                            case CRunBox2DBase.DIRECTION_BOTTOMTOTOP:
                                                if (y2 > y1) {
                                                    temp = pSort1;
                                                    list.set(pos, pSort2);
                                                    list.set(pos + 1, temp);
                                                    flag = true;
                                                }
                                                break;
                                        }
                                        pos++;
                                    } while (pos < list.size() - 1);
                                } while (flag);

                                for (pos = 0; pos < list.size() - 1; pos++) {
                                    var pSort1 = list.get(pos);
                                    var pSort2 = list.get(pos + 1);
                                    var x1 = pSort1.ho.hoX + 8;
                                    var x2 = pSort2.ho.hoX + 8;
                                    var y1 = pSort1.ho.hoY + 8;
                                    var y2 = pSort2.ho.hoY + 8;

                                    var width = x2 - x1;
                                    var height = Math.abs(y2 - y1);
                                    var middleX = (x1 + x2) / 2;
                                    var middleY = (y1 + y2) / 2;

                                    var pBase = new CRunMBase();
                                    pBase.InitBase(null, (obstacle == CRunBox2DBase.OBSTACLE_OBSTACLE) ? CRunMBase.MTYPE_OBSTACLE : CRunMBase.MTYPE_PLATFORM);
                                    pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, middleX, middleY, 0, 0, pBase, 0);

                                    pBase.rc.left = -width;
                                    pBase.rc.right = width;
                                    pBase.rc.top = -height;
                                    pBase.rc.bottom = height;

                                    var vertices = new Array();
                                    var n;
                                    for (n = 0; n < 4; n++) {
                                        vertices[n] = new Box2D.Common.Math.b2Vec2(0, 0);
                                    }

                                    vertices[0].Set((x1 - middleX) / this.factor, (middleY - y1) / this.factor);
                                    vertices[1].Set((x1 - middleX) / this.factor, (middleY - y1 - 8) / this.factor);
                                    vertices[2].Set((x2 - middleX) / this.factor, (middleY - y2 - 8) / this.factor);
                                    vertices[3].Set((x2 - middleX) / this.factor, (middleY - y2) / this.factor);

                                    var polygon = new Box2D.Collision.Shapes.b2PolygonShape();
                                    polygon.SetAsArray(vertices, 4);
                                    var fixtureDef = new Box2D.Dynamics.b2FixtureDef();
                                    fixtureDef.shape = polygon;
                                    fixtureDef.density = 1.0;
                                    fixtureDef.friction = pGround.friction;
                                    fixtureDef.restitution = pGround.restitution;
                                    fixtureDef.userData = this;
                                    pBase.m_body.CreateFixture(fixtureDef);
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    createBorders: function () {
        var pBase = new CRunMBase();
        pBase.InitBase(null, CRunMBase.MTYPE_BORDERBOTTOM);
        pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, this.rh.rhLevelSx / 2, this.rh.rhLevelSy + 8, 0, 0, pBase, 0, 0);
        this.rBodyCreateBoxFixture(pBase.m_body, pBase, this.rh.rhLevelSx / 2, this.rh.rhLevelSy + 8, this.rh.rhLevelSx, 16, 0, 1, 0);

        pBase = new CRunMBase();
        pBase.InitBase(null, CRunMBase.MTYPE_BORDERLEFT);
        pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, -8, this.rh.rhLevelSy / 2, 0, 0, pBase, 0, 0);
        this.rBodyCreateBoxFixture(pBase.m_body, pBase, -8, this.rh.rhLevelSy / 2, 16, this.rh.rhLevelSy, 0, 1, 0);

        pBase = new CRunMBase();
        pBase.InitBase(null, CRunMBase.MTYPE_BORDERRIGHT);
        pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, this.rh.rhLevelSx + 8, this.rh.rhLevelSy / 2, 0, 0, pBase, 0, 0);
        this.rBodyCreateBoxFixture(pBase.m_body, pBase, this.rh.rhLevelSx + 8, this.rh.rhLevelSy / 2, 16, this.rh.rhLevelSy, 0, 1, 0);

        pBase = new CRunMBase();
        pBase.InitBase(null, CRunMBase.MTYPE_BORDERTOP);
        pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, this.rh.rhLevelSx / 2, -8, 0, 0, pBase, 0, 0);
        this.rBodyCreateBoxFixture(pBase.m_body, pBase, this.rh.rhLevelSx / 2, -8, this.rh.rhLevelSx, 16, 0, 1, 0);
    },

    Find_HeaderObject: function (hlo, rhPtr) {
        var pOL = 0;
        for (var nObjects = 0; nObjects < rhPtr.rhNObjects; nObjects++) {
            while (rhPtr.rhObjectList[pOL] == 0) {
                pOL++;
            }
            var pHo = rhPtr.rhObjectList[pOL];
            if (hlo == pHo.hoHFII) {
                return pHo;
            }
            pOL++;
        }
        return null;
    },

    computeBackdropObjects: function () {
        var rhPtr = this.rh;
        var pCurFrame = rhPtr.rhFrame;
        var pCurApp = rhPtr.rhApp;

        var nLayer, i;
        var plo;
        var hoPtr;
        var poi;
        var poc;

        for (nLayer = 0; nLayer < pCurFrame.layers.length; nLayer++) {
            var pLayer = pCurFrame.layers[nLayer];

            // Invisible layer? continue
            if ((pLayer.dwOptions & CLayer.FLOPT_VISIBLE) == 0) {
                continue;
            }

            var cpt;
            for (i = pLayer.nFirstLOIndex, cpt = 0; cpt < pLayer.nBkdLOs; i++, cpt++) {
                var plo = this.rh.rhFrame.LOList.list[i];
                var x, y;
                var typeObj = plo.loType;
                var width, height, obstacle;
                var box;

                if (typeObj >= COI.OBJ_SPR) {
                    continue;
                }

                x = plo.loX;
                y = plo.loY;
                poi = pCurApp.OIList.getOIFromHandle(plo.loOiHandle);
                if (poi == null || poi.oiOC == null) {
                    continue;
                }
                poc = poi.oiOC;

                width = poc.ocCx;
                height = poc.ocCy;
                obstacle = poc.ocObstacleType;
                box = poc.ocColMode;

                if (obstacle == COC.OBSTACLE_SOLID || obstacle == COC.OBSTACLE_PLATFORM) {
                    var pBase = new CRunMBase();
                    pBase.InitBase(null, ((obstacle == COC.OBSTACLE_SOLID) ? CRunMBase.MTYPE_OBSTACLE : CRunMBase.MTYPE_PLATFORM));
                    pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, x + width / 2, y + height / 2, 0, 0, pBase, 0, 0);
                    if (typeObj == COI.OBJ_BOX) {
                        this.rBodyCreateBoxFixture(pBase.m_body, pBase, x + width / 2, y + height / 2, width, height, 0.0, this.friction, this.restitution);
                    } else {
                        var img = poc.ocImage;
                        this.rBodyCreateShapeFixture(pBase.m_body, pBase, x + width / 2, y + height / 2, img, -1, this.friction, this.restitution, 1.0, 1.0);
                    }
                }
            }
        }
    },

    getNumberOfConditions: function () {
        return 0;
    },

    CheckOtherEngines: function () {
        var pOL = 0;
        var nObjects = 0;
        for (nObjects = 0; nObjects < this.rh.rhNObjects; pOL++, nObjects++) {
            while (this.rh.rhObjectList[pOL] == null) {
                pOL++;
            }
            var pBase = this.rh.rhObjectList[pOL];
            if (pBase.hoType >= 32) {
                if (pBase.hoCommon.ocIdentifier == CRun.BASEIDENTIFIER && pBase != this.ho) {
                    if (pBase.ext.identifier == this.identifier) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    isPaused: function () {
        return this.bPaused;
    },

    rStartObject: function () {
        if (this.started == false) {
            this.started = true;

            this.GetObjects();
            this.computeGroundObjects();
            if (this.flags & CRunBox2DBase.B2FLAG_ADDBACKDROPS) {
                this.computeBackdropObjects(this);
            }
        }
        return false;
    },

    createRunObject: function (file, cob, version) {
        this.xBase = 0;
        this.yBase = this.rh.rhApp.gaCyWin;

        this.flags = file.readAInt();
        this.velocityIterations = file.readAInt();
        this.positionIterations = file.readAInt();
        file.skipBytes(4);
        this.angle = file.readAInt() * Box2D.Common.b2Settings.b2_pi / 16.0;
        this.factor = file.readAInt();
        this.friction = file.readAInt() / 100.0;
        this.restitution = file.readAInt() / 100.0;
        this.bulletFriction = file.readAInt() / 100.0;
        this.bulletRestitution = file.readAInt() / 100.0;
        this.bulletGravity = file.readAInt() / 100.0;
        this.bulletDensity = file.readAInt() / 100.0;
        this.gravity = file.readAFloat();
        this.identifier = file.readAInt();
        this.npDensity = file.readAInt() / 100.0;
        this.npFriction = file.readAInt() / 100.0;

        var gravity = new Box2D.Common.Math.b2Vec2(this.gravity * Math.cos(this.angle), this.gravity * Math.sin(this.angle));
        this.world = new Box2D.Dynamics.b2World(gravity, false);
        this.contactListener = new CContactListener();
        this.world.SetContactListener(this.contactListener);
        this.started = false;
        this.bListener = true;
        this.bPaused = false;

        // If another engine exists with the same identifier -> set identifier to random value
        if (this.CheckOtherEngines()) {
            this.identifier = 1000 + this.ho.hoNumber;
        }

        this.createBorders();

        // No errors
        return 0;
    },

    destroyRunObject: function (fast) {
        this.world = null;
    },

    GetHO: function (fixedValue) {
        var hoPtr = this.rh.rhObjectList[fixedValue & 0xFFFF];
        if (hoPtr != null && hoPtr.hoCreationId == fixedValue >> 16) {
            return hoPtr;
        }
        return null;
    },

    getAnimDir: function (pHo, dir) {
        var raPtr = pHo.roa;

        var adPtr = raPtr.raAnimOffset.anDirs[dir];
        if (adPtr != null) {
            return dir;
        }

        if ((raPtr.raAnimOffset.anAntiTrigo[dir] & 0x40) != 0) {
            dir = raPtr.raAnimOffset.anAntiTrigo[dir] & 0x3F;
        } else if ((raPtr.raAnimOffset.anTrigo[dir] & 0x40) != 0) {
            dir = raPtr.raAnimOffset.anTrigo[dir] & 0x3F;
        } else {
            var offset = dir;
            if (raPtr.raAnimPreviousDir < 0) {
                dir = raPtr.raAnimOffset.anTrigo[dir] & 0x3F;
            } else {
                dir -= raPtr.raAnimPreviousDir;
                dir &= 31;
                if (dir > 15) {
                    dir = raPtr.raAnimOffset.anTrigo[offset] & 0x3F;
                } else {
                    dir = raPtr.raAnimOffset.anAntiTrigo[offset] & 0x3F;
                }
            }
        }
        return dir;
    },

    handleRunObject: function () {
        this.rStartObject(this);

        if (this.bPaused) {
            if (this.bListener)
                this.world.SetContactListener(null); // this will set contact listener to null, then no more collision detect
            this.bListener = false;
            return 0;
        }
        else {
            if (!this.bListener)
                this.world.SetContactListener(this.contactListener); // restore the listener to continue detect collisions
            this.bListener = true;
        }

        var i;
        for (i = 0; i < this.objectIDs.size(); i++) {
            var value = this.objectIDs.get(i);
            var pHo = this.GetHO(value);
            var pBase = this.objects.get(i);
            if (pHo != null && pBase.m_pHo != pHo) {
                pHo = null;
            }
            if (pHo == null) {
                this.rDestroyBody(pBase.m_body);
                this.objectIDs.removeIndex(i);
                this.objects.removeIndex(i);
                i--;
            }
            else {
                var position = new Box2D.Common.Math.b2Vec2((this.xBase + pHo.hoX) / this.factor, (this.yBase - pHo.hoY) / this.factor);
                var angle = this.getAnimDir(pHo, pHo.roc.rcDir) * Box2D.Common.b2Settings.b2_pi / 16.0;
                pBase.m_body.SetPositionAndAngle(position, angle);
            }
        }
        if (this.world != null) {
            var timeStep = 1.0 / this.rh.rhApp.gaFrameRate;
            this.world.Step(timeStep, this.velocityIterations, this.positionIterations);
        }
        var n;
        if (this.bodiesToDestroy.size() > 0) {
            for (n = 0; n < this.bodiesToDestroy.size(); n++) {
                this.rDestroyBody(this.bodiesToDestroy.get(n));
            }
            this.bodiesToDestroy.clear();
        }
        return 0;
    },

    // Actions
    // -------------------------------------------------

    GetMBase: function (pHo) {
        if (pHo == null) {
            return null;
        }
        if (pHo.rom == null || (pHo.hoFlags & CObject.HOF_DESTROYED) != 0) {
            return null;
        }
        if (pHo.roc.rcMovementType == CMoveDef.MVTYPE_EXT) {
            var mvPtr = (pHo.hoCommon.ocMovements.moveList[pHo.rom.rmMvtNum]);
            if (CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2d8directions')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2dspring')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2dspaceship')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2dstatic')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2dracecar')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2daxial')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2dplatform')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2dbouncingball')
                || CServices.compareStringsIgnoreCase(mvPtr.moduleName, 'box2dbackground')
            ) {
                var pBase = pHo.rom.rmMovement.movement;
                if (pBase.m_identifier == this.identifier) {
                    return pBase;
                }
            }
        }
        return null;
    },

    RACTION_SETDENSITY: function (act) {
        var pHo = act.getParamObject(this.rh, 0);
        var pmBase = this.GetMBase(pHo);
        if (pmBase != null) {
            var value = act.getParamExpression(this.rh, 1);
            pmBase.SetDensity(value);
        }
    },
    RACTION_SETFRICTION: function (act) {
        var pHo = act.getParamObject(this.rh, 0);
        var pmBase = this.GetMBase(pHo);
        if (pmBase != null) {
            var value = act.getParamExpression(this.rh, 1);
            pmBase.SetFriction(value);
        }
    },
    RACTION_SETELASTICITY: function (act) {
        var pHo = act.getParamObject(this.rh, 0);
        var pmBase = this.GetMBase(pHo);
        if (pmBase != null) {
            var value = act.getParamExpression(this.rh, 1);
            pmBase.SetRestitution(value);
        }
    },
    RACTION_SETGRAVITY: function (act) {
        var pHo = act.getParamObject(this.rh, 0);
        var pmBase = this.GetMBase(pHo);
        if (pmBase != null) {
            var value = act.getParamExpression(this.rh, 1);
            pmBase.SetGravity(value);
        }
    },

    RACTION_PAUSE: function (act) {
        this.bPaused = true;
    },
    RACTION_RESUME: function (act) {
        this.bPaused = false;
    },
    RACTION_SETITERATIONS: function (act) {
        this.velocityIterations = act.getParamExpression(this.rh, 0);
        this.positionIterations = act.getParamExpression(this.rh, 1);
    },
    RACTION_SETGRAVITYFORCE: function (act) {
        this.gravity = act.getParamExpDouble(this.rh, 0);
        var gravity = new Box2D.Common.Math.b2Vec2(this.gravity * Math.cos(this.angle), this.gravity * Math.sin(this.angle));
        this.world.SetGravity(gravity);
    },
    RACTION_SETGRAVITYANGLE: function (act) {
        this.angleBase = act.getParamExpression(this.rh, 0);
        this.angle = this.angleBase * Box2D.Common.b2Settings.b2_pi / 180.0;
        var gravity = new Box2D.Common.Math.b2Vec2(this.gravity * Math.cos(this.angle), this.gravity * Math.sin(this.angle));
        this.world.SetGravity(gravity);
    },
    CreateJoint: function (name) {
        var n;
        var pJoint = new CJoint(this, name);
        this.joints.add(pJoint);
        return pJoint;
    },
    GetJoint: function (sJoint, name, type) {
        var n;
        var pJoint;
        var index = 0;
        if (sJoint != null) {
            index = this.joints.indexOf(sJoint);
            if (index < 0) {
                return null;
            }
            index++;
        }
        for (n = index; n < this.joints.size(); n++) {
            pJoint = this.joints.get(n);
            if (CServices.compareStringsIgnoreCase(pJoint.m_name, name)) {
                break;
            }
        }
        if (n < this.joints.size()) {
            if (type == CRunBox2DBase.TYPE_ALL || type == pJoint.m_type) {
                return pJoint;
            }
        }
        return null;
    },
    GetActionPointPosition: function (pBase) {
        var pHo = pBase.m_pHo;
        var rhPtr = this.rh;
        var x = pHo.hoX;
        var y = pHo.hoY;
        if (pBase.m_image != -1) {
            var angle = pHo.roc.rcAngle;
            var image = this.rh.rhApp.imageBank.getImageFromHandle(pBase.m_image);
            angle *= Box2D.Common.b2Settings.b2_pi / 180.0;
            var deltaX = image.xAP - image.xSpot;
            var deltaY = image.yAP - image.ySpot;
            x += (deltaX * Math.cos(angle) - deltaY * Math.sin(angle));
            y += (deltaX * Math.sin(angle) + deltaY * Math.cos(angle));
        }
        return new Box2D.Common.Math.b2Vec2((this.xBase + x) / this.factor, (this.yBase - y) / this.factor);
    },

    RACTION_DJOINTHOTSPOT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
            JointDef.collideConnected = true;
            var position1 = new Box2D.Common.Math.b2Vec2(pBase1.m_body.GetPosition().x, pBase1.m_body.GetPosition().y);
            var position2 = new Box2D.Common.Math.b2Vec2(pBase2.m_body.GetPosition().x, pBase2.m_body.GetPosition().y);
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position1, position2);
            pJoint.SetJoint(CRunBox2DBase.TYPE_DISTANCE, this.world.CreateJoint(JointDef));
        }
        return true;
    },
    RACTION_DJOINTACTIONPOINT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
            JointDef.collideConnected = true;
            JointDef.frequencyHz = 0;
            JointDef.dampingRatio = 0;
            var position1 = this.GetActionPointPosition(pBase1);
            var position2 = this.GetActionPointPosition(pBase2);
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position1, position2);
            pJoint.SetJoint(CRunBox2DBase.TYPE_DISTANCE, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_DJOINTSETELASTICITY: function (act) {
        var pName = act.getParamExpString(this.rh, 0);
        var frequency = act.getParamExpDouble(this.rh, 1);
        var damping = act.getParamExpression(this.rh, 2) / 100.0;
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_DISTANCE);
        while (pJoint != null) {
            var pdJoint = pJoint.m_joint;
            pdJoint.SetFrequency(frequency);
            pdJoint.SetDampingRatio(damping);
            pJoint = this.GetJoint(pJoint, pName, CRunBox2DBase.TYPE_DISTANCE);
        }
    },
    GetImagePosition: function (pBase, x1, y1) {
        var position = pBase.m_body.GetPosition();
        position.x += x1 / this.factor;
        position.y -= y1 / this.factor;
        return position;
    },
    RACTION_DJOINTPOSITION: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var x1 = act.getParamExpression(this.rh, 2);
        var y1 = act.getParamExpression(this.rh, 3);
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 4));
        var x2 = act.getParamExpression(this.rh, 5);
        var y2 = act.getParamExpression(this.rh, 6);
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var position1 = this.GetImagePosition(pBase1, x1, y1);
            var position2 = this.GetImagePosition(pBase2, x2, y2);
            var JointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
            JointDef.collideConnected = true;
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position1, position2);
            pJoint.SetJoint(CRunBox2DBase.TYPE_DISTANCE, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_RJOINTHOTSPOT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            JointDef.collideConnected = true;
            var position = pBase1.m_body.GetPosition();
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position);
            pJoint.SetJoint(CRunBox2DBase.TYPE_REVOLUTE, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_RJOINTACTIONPOINT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            JointDef.collideConnected = true;
            var position = this.GetActionPointPosition(pBase1);
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position);
            pJoint.SetJoint(CRunBox2DBase.TYPE_REVOLUTE, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_RJOINTPOSITION: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var x1 = act.getParamExpression(this.rh, 2);
        var y1 = act.getParamExpression(this.rh, 3);
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 4));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
            JointDef.collideConnected = true;
            var position = this.GetImagePosition(pBase1, x1, y1);
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position);
            pJoint.SetJoint(CRunBox2DBase.TYPE_REVOLUTE, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_RJOINTSETLIMITS: function (act) {
        var pName = act.getParamExpString(this.rh, 0);
        var lAngle = act.getParamExpression(this.rh, 1) * Box2D.Common.b2Settings.b2_pi / 180.0;
        var uAngle = act.getParamExpression(this.rh, 2) * Box2D.Common.b2Settings.b2_pi / 180.0;
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_REVOLUTE);
        while (pJoint != null) {
            var prJoint = pJoint.m_joint;
            var flag = true;
            if (lAngle > uAngle) {
                prJoint.EnableLimit(false);
            } else {
                prJoint.EnableLimit(true);
                prJoint.SetLimits(lAngle, uAngle);
            }
            pJoint = this.GetJoint(pJoint, pName, CRunBox2DBase.TYPE_REVOLUTE);
        }
    },
    RACTION_RJOINTSETMOTOR: function (act) {
        var pName = act.getParamExpString(this.rh, 0);
        var torque = act.getParamExpression(this.rh, 1) / 100.0 * CRunBox2DBase.RMOTORTORQUEMULT;
        var speed = act.getParamExpression(this.rh, 2) / 100.0 * CRunBox2DBase.RMOTORSPEEDMULT;
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_REVOLUTE);
        while (pJoint != null) {
            var prJoint = pJoint.m_joint;
            var flag = true;
            if (torque == 0 && speed == 0) {
                flag = false;
            }
            prJoint.EnableMotor(flag);
            prJoint.SetMaxMotorTorque(torque);
            prJoint.SetMotorSpeed(-speed);
            pJoint = this.GetJoint(pJoint, pName, CRunBox2DBase.TYPE_REVOLUTE);
        }
    },
    RACTION_PJOINTHOTSPOT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
            JointDef.collideConnected = true;
            var position1 = pBase1.m_body.GetPosition();
            var position2 = pBase2.m_body.GetPosition();
            var axis = new Box2D.Common.Math.b2Vec2(position2.x - position1.x, position2.y - position1.y);
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position1, axis);
            pJoint.SetJoint(CRunBox2DBase.TYPE_PRISMATIC, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_PJOINTACTIONPOINT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
            JointDef.collideConnected = true;
            var position1 = this.GetActionPointPosition(pBase1);
            var position2 = this.GetActionPointPosition(pBase2);
            var axis = new Box2D.Common.Math.b2Vec2(position2.x - position1.x, position2.y - position1.y);
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position1, axis);
            pJoint.SetJoint(CRunBox2DBase.TYPE_PRISMATIC, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_PJOINTPOSITION: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var x1 = act.getParamExpression(this.rh, 2);
        var y1 = act.getParamExpression(this.rh, 3);
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 4));
        var x2 = act.getParamExpression(this.rh, 5);
        var y2 = act.getParamExpression(this.rh, 6);
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
            JointDef.collideConnected = true;
            var position1 = this.GetImagePosition(pBase1, x1, y1);
            var position2 = this.GetImagePosition(pBase1, x2, y2);
            var axis = new Box2D.Common.Math.b2Vec2(position2.x - position1.x, position2.y - position1.y);
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, position1, axis);
            pJoint.SetJoint(CRunBox2DBase.TYPE_PRISMATIC, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_PJOINTSETLIMITS: function (act) {
        var pName = act.getParamExpString(this.rh, 0);
        var lLimit = act.getParamExpression(this.rh, 1) / this.factor;
        var uLimit = act.getParamExpression(this.rh, 2) / this.factor;
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_PRISMATIC);
        while (pJoint != null) {
            var prJoint = pJoint.m_joint;
            var flag = true;
            if (lLimit > uLimit) {
                flag = false;
            }
            prJoint.EnableLimit(flag);
            prJoint.SetLimits(lLimit, uLimit);
            pJoint = this.GetJoint(pJoint, pName, CRunBox2DBase.TYPE_PRISMATIC);
        }
    },
    RACTION_PJOINTSETMOTOR: function (act) {
        var pName = act.getParamExpString(this.rh, 0);
        var force = act.getParamExpression(this.rh, 1) / 100.0 * CRunBox2DBase.PJOINTMOTORFORCEMULT;
        var speed = act.getParamExpression(this.rh, 2) / 100.0 * CRunBox2DBase.PJOINTMOTORSPEEDMULT;
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_PRISMATIC);
        while (pJoint != null) {
            var prJoint = pJoint.m_joint;
            var flag = true;
            if (force == 0 && speed == 0) {
                flag = false;
            }
            prJoint.EnableMotor(flag);
            prJoint.SetMaxMotorForce(force);
            prJoint.SetMotorSpeed(speed);
            pJoint = this.GetJoint(pJoint, pName, CRunBox2DBase.TYPE_PRISMATIC);
        }
    },
    RACTION_PUJOINTHOTSPOT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2PulleyJointDef();
            JointDef.collideConnected = true;
            var position1 = pBase1.m_body.GetPosition();
            var position2 = pBase2.m_body.GetPosition();
            var length1 = act.getParamExpression(this.rh, 3) / this.factor;
            var angle1 = act.getParamExpression(this.rh, 4) * Box2D.Common.b2Settings.b2_pi / 180.0;
            var length2 = act.getParamExpression(this.rh, 5) / this.factor;
            var angle2 = act.getParamExpression(this.rh, 6) * Box2D.Common.b2Settings.b2_pi / 180.0;
            var ratio = act.getParamExpression(this.rh, 7) / 100.0;
            var rope1 = new Box2D.Common.Math.b2Vec2(position1.x + length1 * Math.cos(angle1), position1.y + length1 * Math.sin(angle1));
            var rope2 = new Box2D.Common.Math.b2Vec2(position2.x + length2 * Math.cos(angle2), position2.y + length2 * Math.sin(angle2));
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, rope1, rope2, position1, position2, ratio);
            pJoint.SetJoint(CRunBox2DBase.TYPE_PULLEY, this.world.CreateJoint(JointDef));
        }
    },
    RACTION_PUJOINTACTIONPOINT: function (act) {
        var name = act.getParamExpString(this.rh, 0);
        var pBase1 = this.GetMBase(act.getParamObject(this.rh, 1));
        var pBase2 = this.GetMBase(act.getParamObject(this.rh, 2));
        if (pBase1 != null && pBase2 != null) {
            var pJoint = this.CreateJoint(name);
            var JointDef = new Box2D.Dynamics.Joints.b2PulleyJointDef();
            JointDef.collideConnected = true;
            var position1 = this.GetActionPointPosition(pBase1);
            var position2 = this.GetActionPointPosition(pBase2);
            var length1 = act.getParamExpression(this.rh, 3) / this.factor;
            var angle1 = act.getParamExpression(this.rh, 4) * Box2D.Common.b2Settings.b2_pi / 180.0;
            var length2 = act.getParamExpression(this.rh, 5) / this.factor;
            var angle2 = act.getParamExpression(this.rh, 6) * Box2D.Common.b2Settings.b2_pi / 180.0;
            var ratio = act.getParamExpression(this.rh, 7) / 100.0;
            var rope1 = new Box2D.Common.Math.b2Vec2(position1.x + length1 * Math.cos(angle1), position1.y + length1 * Math.sin(angle1));
            var rope2 = new Box2D.Common.Math.b2Vec2(position2.x + length2 * Math.cos(angle2), position2.y + length2 * Math.sin(angle2));
            JointDef.Initialize(pBase1.m_body, pBase2.m_body, rope1, rope2, position1, position2, ratio);
            pJoint.SetJoint(CRunBox2DBase.TYPE_PULLEY, this.world.CreateJoint(JointDef));
        }
    },

    RACTION_DESTROYJOINT: function (act) {
        var n;
        var name = act.getParamExpString(this.rh, 0);
        for (n = 0; n < this.joints.size(); n++) {
            var pJoint = this.joints.get(n);
            if (CServices.compareStringsIgnoreCase(pJoint.m_name, name)) {
                this.world.DestroyJoint(pJoint.m_joint);
                this.joints.removeIndex(n);
                n--;
            }
        }
    },

    destroyJointWithBody: function (body) {
        var n;
        for (n = 0; n < this.joints.size(); n++) {
            var pJoint = this.joints.get(n);
            if (pJoint.m_joint.GetBodyA() == body || pJoint.m_joint.GetBodyB() == body) {
                this.joints.removeIndex(n);
                n--;
            }
        }
    },

    rDestroyJoint: function (joint) {
        this.world.DestroyJoint(joint);
    },

    rAddNormalObject: function (pHo) {
        if (this.flags & CRunBox2DBase.B2FLAG_ADDOBJECTS) {
            if (this.objects.indexOf(pHo) < 0) {
                if (pHo.hoType == 2 && this.GetMBase(pHo) == null) {
                    var pBase = new CRunMBase();
                    pBase.InitBase(pHo, CRunMBase.MTYPE_FAKEOBJECT);
                    var angle = this.getAnimDir(pHo, pHo.roc.rcDir) * 11.25;
                    pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, pHo.hoX, pHo.hoY, angle, 0, pBase, 0, 0);
                    this.rBodyCreateShapeFixture(pBase.m_body, pBase, pHo.hoX, pHo.hoY, pHo.roc.rcImage, this.npDensity, this.npFriction, 0, pHo.roc.rcScaleX, pHo.roc.rcScaleY);
                    this.objects.add(pBase);
                    this.objectIDs.add((pHo.hoCreationId << 16) | (pHo.hoNumber & 0xFFFF));
                }
            }
        }
    },

    rAddABackdrop: function (x, y, img, obstacle) {
        if (this.flags & CRunBox2DBase.B2FLAG_ADDBACKDROPS) {
            var image = this.rh.rhApp.imageBank.getImageFromHandle(img);
            var pBase = new CRunMBase();
            pBase.InitBase(null, ((obstacle == COC.OBSTACLE_SOLID) ? CRunMBase.MTYPE_OBSTACLE : CRunMBase.MTYPE_PLATFORM));
            pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, x + image.width / 2, y + image.height / 2, 0, 0, pBase, 0, 0);
            this.rBodyCreateShapeFixture(pBase.m_body, pBase, x + image.width / 2, y + image.height / 2, img, -1, this.friction, this.restitution, 1.0, 1.0);
            return pBase.m_body;
        }
        return null;
    },

    rSubABackdrop: function (body) {
        this.world.DestroyBody(body);
    },

    RACTION_ADDOBJECT: function (act) {
        var pHo = act.getParamObject(this.rh, 0);
        if (this.objects.indexOf(pHo) < 0) {
            if (pHo.rom != null && pHo.roa != null && this.GetMBase(pHo) == null) {
                var pBase = new CRunMBase();
                pBase.InitBase(pHo, CRunMBase.MTYPE_FAKEOBJECT);
                var angle = this.getAnimDir(pHo, pHo.roc.rcDir) * 11.25;
                var density = act.getParamExpression(this.rh, 1) / 100.0;
                var friction = act.getParamExpression(this.rh, 2) / 100.0;
                var shape = act.getParamExpression(this.rh, 3);
                ;
                pBase.m_body = this.rCreateBody(Box2D.Dynamics.b2Body.b2_staticBody, pHo.hoX, pHo.hoY, angle, 0, pBase, 0, 0);
                switch (shape) {
                    case 0:
                        this.rBodyCreateBoxFixture(pBase.m_body, pBase, pHo.hoX, pHo.hoY, pHo.hoImgWidth, pHo.hoImgHeight, density, friction, 0);
                        break;
                    case 1:
                        this.rBodyCreateCircleFixture(pBase.m_body, pBase, pHo.hoX, pHo.hoY, pHo.hoImgWidth / 4, density, friction, 0);
                        break;
                    default:
                        this.rBodyCreateShapeFixture(pBase.m_body, pBase, pHo.hoX, pHo.hoY, pHo.roc.rcImage, density, friction, 0, pHo.roc.rcScaleX, pHo.roc.rcScaleY);
                        break;
                }
                this.objects.add(pBase);
                this.objectIDs.add((pHo.hoCreationId << 16) | (pHo.hoNumber & 0xFFFF));
            }
        }
    },
    RACTION_SUBOBJECT: function (act) {
        var pHo = act.getParamObject(this.rh, 0);
        var n = this.objects.indexOf(pHo);
        if (n >= 0) {
            var mBase = this.objects.get(n);
            this.rDestroyBody(mBase.m_body);
            this.objects.removeIndex(n);
            this.objectIDs.removeIndex(n);
        }
    },

    action: function (num, act) {
        switch (num) {
            case CRunBox2DBase.ACTION_SETGRAVITYFORCE:
                this.RACTION_SETGRAVITYFORCE(act);
                break;
            case CRunBox2DBase.ACTION_SETGRAVITYANGLE:
                this.RACTION_SETGRAVITYANGLE(act);
                break;
            case CRunBox2DBase.ACTION_DJOINTHOTSPOT:
                this.RACTION_DJOINTHOTSPOT(act);
                break;
            case CRunBox2DBase.ACTION_DJOINTACTIONPOINT:
                this.RACTION_DJOINTACTIONPOINT(act);
                break;
            case CRunBox2DBase.ACTION_DJOINTPOSITION:
                this.RACTION_DJOINTPOSITION(act);
                break;
            case CRunBox2DBase.ACTION_RJOINTHOTSPOT:
                this.RACTION_RJOINTHOTSPOT(act);
                break;
            case CRunBox2DBase.ACTION_RJOINTACTIONPOINT:
                this.RACTION_RJOINTACTIONPOINT(act);
                break;
            case CRunBox2DBase.ACTION_RJOINTPOSITION:
                this.RACTION_RJOINTPOSITION(act);
                break;
            case CRunBox2DBase.ACTION_PJOINTHOTSPOT:
                this.RACTION_PJOINTHOTSPOT(act);
                break;
            case CRunBox2DBase.ACTION_PJOINTACTIONPOINT:
                this.RACTION_PJOINTACTIONPOINT(act);
                break;
            case CRunBox2DBase.ACTION_PJOINTPOSITION:
                this.RACTION_PJOINTPOSITION(act);
                break;
            case CRunBox2DBase.ACTION_ADDOBJECT:
                this.RACTION_ADDOBJECT(act);
                break;
            case CRunBox2DBase.ACTION_SUBOBJECT:
                this.RACTION_SUBOBJECT(act);
                break;
            case CRunBox2DBase.ACTION_DJOINTSETELASTICITY:
                this.RACTION_DJOINTSETELASTICITY(act);
                break;
            case CRunBox2DBase.ACTION_RJOINTSETLIMITS:
                this.RACTION_RJOINTSETLIMITS(act);
                break;
            case CRunBox2DBase.ACTION_RJOINTSETMOTOR:
                this.RACTION_RJOINTSETMOTOR(act);
                break;
            case CRunBox2DBase.ACTION_PJOINTSETLIMITS:
                this.RACTION_PJOINTSETLIMITS(act);
                break;
            case CRunBox2DBase.ACTION_PJOINTSETMOTOR:
                this.RACTION_PJOINTSETMOTOR(act);
                break;
            case CRunBox2DBase.ACTION_PUJOINTHOTSPOT:
                this.RACTION_PUJOINTHOTSPOT(act);
                break;
            case CRunBox2DBase.ACTION_PUJOINTACTIONPOINT:
                this.RACTION_PUJOINTACTIONPOINT(act);
                break;
            case CRunBox2DBase.ACTION_DESTROYJOINT:
                this.RACTION_DESTROYJOINT(act);
                break;
            case CRunBox2DBase.ACTION_SETITERATIONS:
                this.RACTION_SETITERATIONS(act);
                break;
            case CRunBox2DBase.ACTION_SETDENSITY:
                this.RACTION_SETDENSITY(act);
                break;
            case CRunBox2DBase.ACTION_SETFRICTION:
                this.RACTION_SETFRICTION(act);
                break;
            case CRunBox2DBase.ACTION_SETELASTICITY:
                this.RACTION_SETELASTICITY(act);
                break;
            case CRunBox2DBase.ACTION_SETGRAVITY:
                this.RACTION_SETGRAVITY(act);
                break;
            case CRunBox2DBase.ACTION_PAUSE:
                this.RACTION_PAUSE(act);
                break;
            case CRunBox2DBase.ACTION_RESUME:
                this.RACTION_RESUME(act);
                break;
        }
    },

    // Expressions
    // -------------------------------------------
    REXPRESSION_GRAVITYSTRENGTH: function () {
        return this.gravity;
    },
    REXPRESSION_GRAVITYANGLE: function () {
        return this.angleBase;
    },
    REXPRESSION_VELOCITYITERATIONS: function () {
        return this.velocityIterations;
    },
    REXPRESSION_POSITIONITERATIONS: function () {
        return this.positionIterations;
    },
    REXPRESSION_ELASTICITYFREQUENCY: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_DISTANCE);
        if (pJoint != null) {
            return pJoint.m_joint.GetFrequency();
        }
        return 0;
    },
    REXPRESSION_ELASTICITYDAMPING: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_DISTANCE);
        if (pJoint != null) {
            return pJoint.m_joint.GetDampingRatio() * 100;
        }
        return 0;
    },
    REXPRESSION_LOWERANGLELIMIT: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_REVOLUTE);
        if (pJoint != null) {
            return pJoint.m_joint.GetLowerLimit() * 180 / Box2D.Common.b2Settings.b2_pi;
        }
    },
    REXPRESSION_UPPERANGLELIMIT: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_REVOLUTE);
        if (pJoint != null) {
            return pJoint.m_joint.GetUpperLimit() * 180 / Box2D.Common.b2Settings.b2_pi;
        }
        return 0;
    },
    REXPRESSION_MOTORSTRENGTH: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_REVOLUTE);
        if (pJoint != null) {
            return pJoint.m_joint.GetMaxMotorTorque() * 100 / CRunBox2DBase.RMOTORTORQUEMULT;
        }
        return 0;
    },
    REXPRESSION_MOTORSPEED: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_REVOLUTE);
        if (pJoint != null) {
            return pJoint.m_joint.GetMotorSpeed() * 100 / CRunBox2DBase.RMOTORSPEEDMULT;
        }
        return 0;
    },
    REXPRESSION_LOWERTRANSLATION: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_PRISMATIC);
        if (pJoint != null) {
            return pJoint.m_joint.GetLowerLimit() * this.factor;
        }
        return 0;
    },
    REXPRESSION_UPPERTRANSLATION: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_PRISMATIC);
        if (pJoint != null) {
            return pJoint.m_joint.GetUpperLimit() * this.factor;
        }
        return 0;
    },
    REXPRESSION_PMOTORSTRENGTH: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_PRISMATIC);
        if (pJoint != null) {
            return pJoint.m_joint.GetMaxMotorForce() * 100 / CRunBox2DBase.PJOINTMOTORFORCEMULT;
        }
        return 0;
    },
    REXPRESSION_PMOTORSPEED: function () {
        var pName = this.ho.getExpParam();
        var pJoint = this.GetJoint(null, pName, CRunBox2DBase.TYPE_PRISMATIC);
        if (pJoint != null) {
            return pJoint.m_joint.GetMotorSpeed() * 100 / CRunBox2DBase.PJOINTMOTORSPEEDMULT;
        }
        return 0;
    },

    expression: function (num) {
        switch (num) {
            case CRunBox2DBase.EXPRESSION_GRAVITYSTRENGTH:
                return this.REXPRESSION_GRAVITYSTRENGTH();
            case CRunBox2DBase.EXPRESSION_GRAVITYANGLE:
                return this.REXPRESSION_GRAVITYANGLE();
            case CRunBox2DBase.EXPRESSION_VELOCITYITERATIONS:
                return this.REXPRESSION_VELOCITYITERATIONS();
            case CRunBox2DBase.EXPRESSION_POSITIONITERATIONS:
                return this.REXPRESSION_POSITIONITERATIONS();
            case CRunBox2DBase.EXPRESSION_ELASTICITYFREQUENCY:
                return this.REXPRESSION_ELASTICITYFREQUENCY();
            case CRunBox2DBase.EXPRESSION_ELASTICITYDAMPING:
                return this.REXPRESSION_ELASTICITYDAMPING();
            case CRunBox2DBase.EXPRESSION_LOWERANGLELIMIT:
                return this.REXPRESSION_LOWERANGLELIMIT();
            case CRunBox2DBase.EXPRESSION_UPPERANGLELIMIT:
                return this.REXPRESSION_UPPERANGLELIMIT();
            case CRunBox2DBase.EXPRESSION_MOTORSTRENGTH:
                return this.REXPRESSION_MOTORSTRENGTH();
            case CRunBox2DBase.EXPRESSION_MOTORSPEED:
                return this.REXPRESSION_MOTORSPEED();
            case CRunBox2DBase.EXPRESSION_LOWERTRANSLATION:
                return this.REXPRESSION_LOWERTRANSLATION();
            case CRunBox2DBase.EXPRESSION_UPPERTRANSLATION:
                return this.REXPRESSION_UPPERTRANSLATION();
            case CRunBox2DBase.EXPRESSION_PMOTORSTRENGTH:
                return this.REXPRESSION_PMOTORSTRENGTH();
            case CRunBox2DBase.EXPRESSION_PMOTORSPEED:
                return this.REXPRESSION_PMOTORSPEED();
        }
        return 0;
    }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunBox2DBase);

//----------------------------------------------------------------------------------
//
// CRunScreenZoom
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
CRunScreenZoom.CND_SCANGLEOVER = 0;
CRunScreenZoom.CND_SCSCALEOVER = 1;
CRunScreenZoom.CND_LAANGLEOVER = 2;
CRunScreenZoom.CND_LASCALEOVER = 3;
CRunScreenZoom.CND_SCSHAKEOVER = 4;
CRunScreenZoom.CND_LASHAKEOVER = 5;
CRunScreenZoom.CND_LAST = 6;

CRunScreenZoom.ACT_SCANGLE = 0;
CRunScreenZoom.ACT_SCSCALE = 1;
CRunScreenZoom.ACT_SCXSCALE = 2;
CRunScreenZoom.ACT_SCYSCALE = 3;
CRunScreenZoom.ACT_SCSMANGLE = 4;
CRunScreenZoom.ACT_SCSMSCALE = 5;
CRunScreenZoom.ACT_SCSMXSCALE = 6;
CRunScreenZoom.ACT_SCSMYSCALE = 7;
CRunScreenZoom.ACT_SCELANGLE = 8;
CRunScreenZoom.ACT_SCELSCALE = 9;
CRunScreenZoom.ACT_SCELXSCALE = 10;
CRunScreenZoom.ACT_SCELYSCALE = 11;
CRunScreenZoom.ACT_SCPIVOT = 12;
CRunScreenZoom.ACT_SCXPIVOT = 13;
CRunScreenZoom.ACT_SCYPIVOT = 14;
CRunScreenZoom.ACT_SCLIANGLE = 15;
CRunScreenZoom.ACT_SCLISCALE = 16;
CRunScreenZoom.ACT_SCLIXSCALE = 17;
CRunScreenZoom.ACT_SCLIYSCALE = 18;
CRunScreenZoom.ACT_LAANGLE = 19;
CRunScreenZoom.ACT_LASCALE = 20;
CRunScreenZoom.ACT_LAXSCALE = 21;
CRunScreenZoom.ACT_LAYSCALE = 22;
CRunScreenZoom.ACT_LASMANGLE = 23;
CRunScreenZoom.ACT_LASMSCALE = 24;
CRunScreenZoom.ACT_LASMXSCALE = 25;
CRunScreenZoom.ACT_LASMYSCALE = 26;
CRunScreenZoom.ACT_LAELANGLE = 27;
CRunScreenZoom.ACT_LAELSCALE = 28;
CRunScreenZoom.ACT_LAELXSCALE = 29;
CRunScreenZoom.ACT_LAELYSCALE = 30;
CRunScreenZoom.ACT_LAPIVOT = 31;
CRunScreenZoom.ACT_LAXPIVOT = 32;
CRunScreenZoom.ACT_LAYPIVOT = 33;
CRunScreenZoom.ACT_LALIANGLE = 34;
CRunScreenZoom.ACT_LALISCALE = 35;
CRunScreenZoom.ACT_LALIXSCALE = 36;
CRunScreenZoom.ACT_LALIYSCALE = 37;
CRunScreenZoom.ACT_SCDEST = 38;
CRunScreenZoom.ACT_SCXDEST = 39;
CRunScreenZoom.ACT_SCYDEST = 40;
CRunScreenZoom.ACT_LADEST = 41;
CRunScreenZoom.ACT_LAXDEST = 42;
CRunScreenZoom.ACT_LAYDEST = 43;
CRunScreenZoom.ACT_SCSHAKEX = 44;
CRunScreenZoom.ACT_SCSHAKEY = 45;
CRunScreenZoom.ACT_LASHAKEX = 46;
CRunScreenZoom.ACT_LASHAKEY = 47;
CRunScreenZoom.EXP_SCANGLE = 0;
CRunScreenZoom.EXP_SCXSCALE = 1;
CRunScreenZoom.EXP_SCYSCALE = 2;
CRunScreenZoom.EXP_SCXPIVOT = 3;
CRunScreenZoom.EXP_SCYPIVOT = 4;
CRunScreenZoom.EXP_SCSCALE = 5;
CRunScreenZoom.EXP_SCXDEST = 6;
CRunScreenZoom.EXP_SCYDEST = 7;
CRunScreenZoom.EXP_LAANGLE = 8;
CRunScreenZoom.EXP_LAXSCALE = 9;
CRunScreenZoom.EXP_LAYSCALE = 10;
CRunScreenZoom.EXP_LAXPIVOT = 11;
CRunScreenZoom.EXP_LAYPIVOT = 12;
CRunScreenZoom.EXP_LASCALE = 13;
CRunScreenZoom.EXP_LAXDEST = 14;
CRunScreenZoom.EXP_LAYDEST = 15;

function CRunScreenZoom() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.scAngleAnim = null;
    this.scScaleAnim = null;
    this.scScaleXAnim = null;
    this.scScaleYAnim = null;
    this.scShakeXAnim = null;
    this.scShakeYAnim = null;
    this.laAngleAnim = new CArrayList();
    this.laScaleAnim = new CArrayList();
    this.laScaleXAnim = new CArrayList();
    this.laScaleYAnim = new CArrayList();
    this.laShakeXAnim = new CArrayList();
    this.laShakeYAnim = new CArrayList();
}

CRunScreenZoom.prototype = {
        getNumberOfConditions: function () {
            return CRunScreenZoom.CND_LAST;
        },

        createRunObject: function (file, cob, version) {
            var zoom = false;
            file.skipBytes(8 * 2);
            this.rh.rhApp.scScaleX = file.readAFloat();
            this.rh.rhApp.scScaleY = file.readAFloat();
            if (this.rh.rhApp.scScaleX != 1.0 || this.rh.rhApp.scScaleY != 1.0) {
                zoom = true;
            }
            this.rh.rhApp.scScale = (this.rh.rhApp.scScaleX + this.rh.rhApp.scScaleY) / 2.0;
            file.skipBytes(8);
            this.rh.rhApp.scAngle = file.readAFloat();
            if (this.rh.rhApp.scAngle != 0) {
                zoom = true;
            }

            var temp;
            temp = file.readAInt();
            if (temp == 0x07654321) {
                temp = this.rh.rhApp.gaCxWin / 2;
            } else {
                zoom = true;
            }
            this.rh.rhApp.scXSpot = temp;

            temp = file.readAInt();
            if (temp == 0x07654321) {
                temp = this.rh.rhApp.gaCyWin / 2;
            } else {
                zoom = true;
            }
            this.rh.rhApp.scYSpot = temp;

            temp = file.readAInt();
            if (temp == 0x07654321) {
                temp = this.rh.rhApp.gaCxWin / 2;
            } else {
                zoom = true;
            }
            this.rh.rhApp.scXDest = temp;

            temp = file.readAInt();
            if (temp == 0x07654321) {
                temp = this.rh.rhApp.gaCyWin / 2;
            } else {
                zoom = true;
            }
            this.rh.rhApp.scYDest = temp;

            this.rh.rhApp.zoom = zoom;

            return false;
        },

        handleRunObject: function () {
            if (this.scAngleAnim) {
                this.rh.rhApp.scAngle = this.scAngleAnim.animate();
                this.rh.rhApp.zoom = true;
                if (this.scAngleAnim.completed) {
                    this.scAngleAnim = null;
                    this.ho.generateEvent(CRunScreenZoom.CND_SCANGLEOVER, 0);
                }
            }
            if (this.scScaleAnim) {
                this.rh.rhApp.scScale = this.scScaleAnim.animate();
                this.rh.rhApp.scScaleX = this.rh.rhApp.scScale;
                this.rh.rhApp.scScaleY = this.rh.rhApp.scScale;
                this.rh.rhApp.zoom = true;
                if (this.scScaleAnim.completed) {
                    this.scScaleAnim = null;
                    this.ho.generateEvent(CRunScreenZoom.CND_SCSCALEOVER, 0);
                }
            }
            if (this.scScaleXAnim) {
                this.rh.rhApp.scScaleX = this.scScaleXAnim.animate();
                this.rh.rhApp.zoom = true;
                if (this.scScaleXAnim.completed) {
                    this.scScaleXAnim = null;
                    this.ho.generateEvent(CRunScreenZoom.CND_SCSCALEOVER, 0);
                }
            }
            if (this.scScaleYAnim) {
                this.rh.rhApp.scScaleY = this.scScaleYAnim.animate();
                this.rh.rhApp.zoom = true;
                if (this.scScaleYAnim.completed) {
                    this.scScaleYAnim = null;
                    this.ho.generateEvent(CRunScreenZoom.CND_SCSCALEOVER, 0);
                }
            }
            if (this.scShakeXAnim) {
                this.rh.rhApp.scXDest = this.scShakeXAnim.animate();
                this.rh.rhApp.zoom = true;
                if (this.scShakeXAnim.completed) {
                    this.scShakeXAnim = null;
                    this.ho.generateEvent(CRunScreenZoom.CND_SCSHAKEOVER, 0);
                }
            }
            if (this.scShakeYAnim) {
                this.rh.rhApp.scYDest = this.scShakeYAnim.animate();
                this.rh.rhApp.zoom = true;
                if (this.scShakeYAnim.completed) {
                    this.scShakeYAnim = null;
                    this.ho.generateEvent(CRunScreenZoom.CND_SCSHAKEOVER, 0);
                }
            }

            var n, anim;
            for (n = 0; n < this.laAngleAnim.size(); n++) {
                anim = this.laAngleAnim.get(n);
                anim.layer.setAngle(anim.animate());
                anim.layer.setZoom(true);
                if (anim.completed) {
                    this.laAngleAnim.removeIndex(n);
                    this.currentLayer = anim.layer;
                    this.ho.generateEvent(CRunScreenZoom.CND_LAANGLEOVER, 0);
                    n--;
                }
            }
            for (n = 0; n < this.laScaleAnim.size(); n++) {
                anim = this.laScaleAnim.get(n);
                anim.layer.scale = anim.animate();
                anim.layer.setScaleX(anim.layer.scale);
                anim.layer.setScaleY(anim.layer.scale);
                anim.layer.setZoom(true);
                if (anim.completed) {
                    this.laScaleAnim.removeIndex(n);
                    this.currentLayer = anim.layer;
                    this.ho.generateEvent(CRunScreenZoom.CND_LASCALEOVER, 0);
                    n--;
                }
            }
            for (n = 0; n < this.laScaleXAnim.size(); n++) {
                anim = this.laScaleXAnim.get(n);
                anim.layer.setScaleX(anim.animate());
                anim.layer.setZoom(true);
                if (anim.completed) {
                    this.laScaleXAnim.removeIndex(n);
                    this.currentLayer = anim.layer;
                    this.ho.generateEvent(CRunScreenZoom.CND_LASCALEOVER, 0);
                    n--;
                }
            }
            for (n = 0; n < this.laScaleYAnim.size(); n++) {
                anim = this.laScaleYAnim.get(n);
                anim.layer.setScaleY(anim.animate());
                anim.layer.setZoom(true);
                if (anim.completed) {
                    this.laScaleYAnim.removeIndex(n);
                    this.currentLayer = anim.layer;
                    this.ho.generateEvent(CRunScreenZoom.CND_LASCALEOVER, 0);
                    n--;
                }
            }
            for (n = 0; n < this.laShakeXAnim.size(); n++) {
                anim = this.laShakeXAnim.get(n);
                anim.layer.setXDest(anim.animate());
                anim.layer.setZoom(true);
                if (anim.completed) {
                    this.laShakeXAnim.removeIndex(n);
                    this.currentLayer = anim.layer;
                    this.ho.generateEvent(CRunScreenZoom.CND_LASHAKEOVER, 0);
                    n--;
                }
            }
            for (n = 0; n < this.laShakeYAnim.size(); n++) {
                anim = this.laShakeYAnim.get(n);
                anim.layer.setYDest(anim.animate());
                anim.layer.setZoom(true);
                if (anim.completed) {
                    this.laShakeYAnim.removeIndex(n);
                    this.currentLayer = anim.layer;
                    this.ho.generateEvent(CRunScreenZoom.CND_LASHAKEOVER, 0);
                    n--;
                }
            }
            return 0;
        },

        condition: function (num, cnd) {
            switch (num) {
                case CRunScreenZoom.CND_SCANGLEOVER:
                case CRunScreenZoom.CND_SCSCALEOVER:
                case CRunScreenZoom.CND_SCSHAKEOVER:
                    return true;
                case CRunScreenZoom.CND_LAANGLEOVER:
                case CRunScreenZoom.CND_LASCALEOVER:
                case CRunScreenZoom.CND_LASHAKEOVER:
                    var name = cnd.getParamExpString(this.rh, 0);
                    if (CServices.compareStringsIgnoreCase(name, this.currentLayer.pName)) {
                        return true;
                    }
                    break;
            }
            return false;
        },

        action: function (num, act) {
            var layer, anim;
            switch (num) {
                case CRunScreenZoom.ACT_SCANGLE:
                    this.rh.rhApp.scAngle = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCSCALE:
                    this.rh.rhApp.scScale = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.scScaleX = this.rh.rhApp.scScale;
                    this.rh.rhApp.scScaleY = this.rh.rhApp.scScale;
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCXSCALE:
                    this.rh.rhApp.scScaleX = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCYSCALE:
                    this.rh.rhApp.scScaleY = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCPIVOT:
                    var position = act.getParamPosition(this.rh, 0);
                    if (position.found) {
                        this.rh.rhApp.scXSpot = position.x;
                        this.rh.rhApp.scYSpot = position.y;
                        this.rh.rhApp.zoom = true;
                    }
                    break;
                case CRunScreenZoom.ACT_SCXPIVOT:
                    this.rh.rhApp.scXSpot = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCYPIVOT:
                    this.rh.rhApp.scYSpot = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCDEST:
                    var position = act.getParamPosition(this.rh, 0);
                    if (position.found) {
                        this.rh.rhApp.scXDest = position.x;
                        this.rh.rhApp.scYDest = position.y;
                        this.rh.rhApp.zoom = true;
                    }
                    break;
                case CRunScreenZoom.ACT_SCXDEST:
                    this.rh.rhApp.scYDest = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCYDEST:
                    this.rh.rhApp.scYDest = act.getParamExpression(this.rh, 0);
                    this.rh.rhApp.zoom = true;
                    break;
                case CRunScreenZoom.ACT_SCLIANGLE:
                    this.scAngleAnim = new CSZLinear(this.rh.rhApp.scAngle, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCLISCALE:
                    this.scScaleAnim = new CSZLinear(this.rh.rhApp.scScale, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCLIXSCALE:
                    this.scScaleXAnim = new CSZLinear(this.rh.rhApp.scScaleX, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCLIYSCALE:
                    this.scScaleYAnim = new CSZLinear(this.rh.rhApp.scScaleY, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCSMANGLE:
                    this.scAngleAnim = new CSZSmooth(this.rh.rhApp.scAngle, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCSMSCALE:
                    this.scScaleAnim = new CSZSmooth(this.rh.rhApp.scScale, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCSMXSCALE:
                    this.scScaleXAnim = new CSZSmooth(this.rh.rhApp.scScaleX, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCSMYSCALE:
                    this.scScaleYAnim = new CSZSmooth(this.rh.rhApp.scScaleY, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunScreenZoom.ACT_SCELANGLE:
                    this.scAngleAnim = new CSZElastic(this.rh.rhApp.scAngle, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunScreenZoom.ACT_SCELSCALE:
                    this.scScaleAnim = new CSZElastic(this.rh.rhApp.scScale, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunScreenZoom.ACT_SCELXSCALE:
                    this.scScaleXAnim = new CSZElastic(this.rh.rhApp.scScaleX, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunScreenZoom.ACT_SCELYSCALE:
                    this.scScaleXAnim = new CSZElastic(this.rh.rhApp.scScaleY, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunScreenZoom.ACT_SCSHAKEX:
                    this.scShakeXAnim = new CSZShake(this.rh.rhApp.scXDest, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunScreenZoom.ACT_SCSHAKEY:
                    this.scShakeYAnim = new CSZShake(this.rh.rhApp.scYDest, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;


                case CRunScreenZoom.ACT_LAANGLE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.setAngle(act.getParamExpression(this.rh, 1));
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LASCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.scale = act.getParamExpression(this.rh, 1);
                        layer.setScaleX(layer.scale);
                        layer.setScaleY(layer.scale);
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LAXSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.setScaleX(act.getParamExpression(this.rh, 1));
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LAYSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.setScaleY(act.getParamExpression(this.rh, 1));
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LAPIVOT:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        var position = act.getParamPosition(this.rh, 1);
                        if (position.found) {
                            layer.setXSpot(position.x);
                            layer.setYSpot(position.y);
                            layer.setZoom(true);
                        }
                    }
                    break;
                case CRunScreenZoom.ACT_LAXPIVOT:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.setXSpot(act.getParamExpression(this.rh, 1));
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LAYPIVOT:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.setYSpot(act.getParamExpression(this.rh, 1));
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LADEST:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        var position = act.getParamPosition(this.rh, 1);
                        if (position.found) {
                            layer.setXDest(position.x);
                            layer.setYDest(position.y);
                            layer.setZoom(true);
                        }
                    }
                    break;
                case CRunScreenZoom.ACT_LAXDEST:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.setXDest(act.getParamExpression(this.rh, 1));
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LAYDEST:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        layer.setYDest(act.getParamExpression(this.rh, 1));
                        layer.setZoom(true);
                    }
                    break;
                case CRunScreenZoom.ACT_LALIANGLE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZLinear(layer.angle, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laAngleAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LALISCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZLinear(layer.scale, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laScaleAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LALIXSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZLinear(layer.scaleX, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laScaleXAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LALIYSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZLinear(layer.scaleY, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laScaleYAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LASMANGLE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZSmooth(layer.angle, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laAngleAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LASMSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZSmooth(layer.scale, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laScaleAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LASMXSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZSmooth(layer.scaleX, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laScaleXAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LASMYSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZSmooth(layer.scaleY, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                        anim.layer = layer;
                        this.laScaleYAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LAELANGLE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZElastic(layer.angle, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                        anim.layer = layer;
                        this.laAngleAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LAELSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZElastic(layer.scale, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                        anim.layer = layer;
                        this.laScaleAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LAELXSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZElastic(layer.scaleX, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                        anim.layer = layer;
                        this.laScaleXAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LAELYSCALE:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZElastic(layer.scaleY, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                        anim.layer = layer;
                        this.laScaleYAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LASHAKEX:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZShake(layer.xDest, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                        anim.layer = layer;
                        this.laShakeXAnim.add(anim);
                    }
                    break;
                case CRunScreenZoom.ACT_LASHAKEY:
                    layer = this.getLayer(act.getParamExpression(this.rh, 0));
                    if (layer) {
                        anim = new CSZShake(layer.yDest, act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                        anim.layer = layer;
                        this.laShakeYAnim.add(anim);
                    }
                    break;
            }
        },

        getLayer: function (pName) {
            var nLayer;
            for (nLayer = 0; nLayer < this.ho.hoAdRunHeader.rhFrame.nLayers; nLayer++) {
                var pLayer = this.ho.hoAdRunHeader.rhFrame.layers[nLayer];
                if (CServices.compareStringsIgnoreCase(pName, pLayer.pName)) {
                    return pLayer;
                }
            }
            return null;
        },

        expression: function (num) {
            switch (num) {
                case CRunScreenZoom.EXP_SCANGLE:
                    return this.rh.rhApp.scAngle;
                case CRunScreenZoom.EXP_SCXSCALE:
                    return this.rh.rhApp.scScaleX;
                case CRunScreenZoom.EXP_SCYSCALE:
                    return this.rh.rhApp.scScaleY;
                case CRunScreenZoom.EXP_SCXPIVOT:
                    return this.rh.rhApp.scXSpot;
                case CRunScreenZoom.EXP_SCYPIVOT:
                    return this.rh.rhApp.scYSpot;
                case CRunScreenZoom.EXP_SCSCALE:
                    return this.rh.rhApp.scScale;
                case CRunScreenZoom.EXP_SCXDEST:
                    return this.rh.rhApp.scYDest;
                case CRunScreenZoom.EXP_SCYDEST:
                    return this.rh.rhApp.scYDest;

                case CRunScreenZoom.EXP_LAANGLE:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.angle;
                    }
                    return 0;
                case CRunScreenZoom.EXP_LAXSCALE:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.scaleX;
                    }
                    return 0;
                case CRunScreenZoom.EXP_LAYSCALE:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.scaleY;
                    }
                    return 0;
                case CRunScreenZoom.EXP_LAXPIVOT:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.xSpot;
                    }
                    return 0;
                case CRunScreenZoom.EXP_LAYPIVOT:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.ySpot;
                    }
                    return 0;
                case CRunScreenZoom.EXP_LASCALE:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.scale;
                    }
                    return 0;
                case CRunScreenZoom.EXP_LAXDEST:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.xDest;
                    }
                    return 0;
                case CRunScreenZoom.EXP_LAYDEST:
                    layer = this.getLayer(this.ho.getExpParam());
                    if (layer) {
                        return layer.yDest;
                    }
                    return 0;
            }
            return 0;
        }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunScreenZoom);

function CSZLinear(initial, end, duration) {
    this.initial = initial;
    this.end = end;
    this.duration = duration;
    this.current = initial;
    this.initialTime = Date.now();
    this.completed = false;
}
CSZLinear.prototype =
{
    animate: function () {
        var delta = Date.now() - this.initialTime;
        if (delta >= this.duration) {
            this.completed = true;
            this.current = this.end;
        }
        else {
            this.current = this.initial + ((this.end - this.initial) * delta) / this.duration;
        }
        return this.current;
    }
}
function CSZSmooth(initial, end, duration) {
    this.middle = (end + initial) / 2;
    this.length = (end - initial) / 2;
    this.end = end;
    this.duration = duration;
    this.current = initial;
    this.initialTime = Date.now();
    this.completed = false;
}
CSZSmooth.prototype =
{
    animate: function () {
        var delta = Date.now() - this.initialTime;
        if (delta >= this.duration) {
            this.completed = true;
            this.current = this.end;
        }
        else {
            var angle = (delta / this.duration) * Math.PI;
            this.current = this.middle + this.length * (-Math.cos(angle));
        }
        return this.current;
    }
}

function CSZElastic(initial, end, duration, factor) {
    this.middle = (initial + end) / 2;
    this.end = end;
    this.duration = duration;
    this.length = end - initial;
    this.factor = 1 / Math.max(factor, 1.0);
    this.initialTime = Date.now();
    this.completed = false;
    this.position = 0;
}
CSZElastic.prototype =
{
    animate: function () {
        var delta = Date.now() - this.initialTime;
        var angle = (delta / this.duration) * Math.PI / 2;

        if (angle >= Math.PI / 2) {
            if (this.position == 0 || this.position == 2) {
                this.length *= this.factor;
                this.duration *= this.factor;
                if (this.duration < 10) {
                    this.completed = true;
                    this.current = this.end;
                    return this.current;
                }
            }
            this.position = (this.position + 1) % 4;
            this.initialTime = Date.now();
            angle = 0;
        }
        this.current = this.end - this.length * Math.cos(angle + this.position * Math.PI / 2);
        return this.current;
    }
}

function CSZShake(middle, length, duration, total) {
    this.middle = middle;
    this.length = length;
    this.duration = duration;
    this.total = total;
    this.initialTime = Date.now();
    this.completed = false;
}
CSZShake.prototype =
{
    animate: function () {
        var delta = Date.now() - this.initialTime;
        var angle = (delta / this.duration) * Math.PI * 2;

        if (Date.now() > this.initialTime + this.total) {
            this.completed = true;
            this.current = this.middle;
            return this.current;
        }
        this.current = this.middle + this.length * Math.sin(angle);
        return this.current;
    }
}



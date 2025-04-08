//----------------------------------------------------------------------------------
//
// CRunCreateByName
//    
// @author Anders Riggelsen
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
CRunCreateByName.ACT_CREATEOBJ_AT_POS = 0;
CRunCreateByName.ACT_CREATEOBJ_AT_XY = 1;
CRunCreateByName.ACT_CREATEBKD_AT_POS = 2;
CRunCreateByName.ACT_CREATEBKD_AT_XY = 3;
CRunCreateByName.EXP_GETNAMEFROMFIXED = 0;

function CRunCreateByName() {
    //call chain
    CRunExtension.call(this);

    //call self
}

CRunCreateByName.prototype = {
        getNumberOfConditions: function () {
            return 0;
        },

        action: function (num, act) {
            var name, x, y, layer, type, position;
            switch (num) {
                case CRunCreateByName.ACT_CREATEOBJ_AT_POS:
                {
                    name = act.getParamExpString(this.rh, 0);
                    position = act.getParamPosition(this.rh, 1);
                    layer = act.getParamExpression(this.rh, 2);
                    if (position.found) {
                        this.createObject(name, position.x, position.y, layer);
                    }
                    break;
                }
                case CRunCreateByName.ACT_CREATEOBJ_AT_XY:
                {
                    name = act.getParamExpString(this.rh, 0);
                    x = act.getParamExpression(this.rh, 1);
                    y = act.getParamExpression(this.rh, 2);
                    layer = act.getParamExpression(this.rh, 3);
                    this.createObject(name, x, y, layer);
                    break;
                }
                case CRunCreateByName.ACT_CREATEBKD_AT_POS:
                {
                    name = act.getParamExpString(this.rh, 0);
                    position = act.getParamPosition(this.rh, 1);
                    type = act.getParamExpression(this.rh, 2);
                    layer = act.getParamExpression(this.rh, 3);
                    if (position.found) {
                        this.createBackdrop(name, position.x, position.y, type, layer);
                    }
                    break;
                }
                case CRunCreateByName.ACT_CREATEBKD_AT_XY:
                {
                    name = act.getParamExpString(this.rh, 0);
                    x = act.getParamExpression(this.rh, 1);
                    y = act.getParamExpression(this.rh, 2);
                    type = act.getParamExpression(this.rh, 3);
                    layer = act.getParamExpression(this.rh, 4);
                    this.createBackdrop(name, x, y, type, layer);
                    break;
                }
            }
        },

        // Expressions
        // -------------------------------------------------
        expression: function (num) {
            var ret;
            if (num == CRunCreateByName.EXP_GETNAMEFROMFIXED) {
                var fixed = this.ho.getExpParam();
                var obj = this.ho.getObjectFromFixed(fixed);
                if (obj != null) {
                    ret = obj.hoOiList.oilName;
                    return ret;
                }
            }
            return "";
        },

        createObject: function (objName, x, y, layer) {
            var creationOi = -1;
            for (var i = 0; i < this.rh.rhMaxOI; ++i) {
                var info = this.rh.rhOiList[i];
                if (info.oilName == objName) {
                    creationOi = info.oilOi;
                    break;
                }
            }
            if (creationOi == -1) {
                return;
            }

            if (layer >= this.rh.rhFrame.nLayers) {
                layer = this.rh.rhFrame.nLayers - 1;
            }
            if (layer < -1) {
                layer = -1;
            }

            var number = this.rh.f_CreateObject(this.rh.rhMaxOI, creationOi, x, y, 0, 0, layer, -1);
            if (number >= 0) {
                var pHo = this.rh.rhObjectList[number];
                this.rh.rhEvtProg.evt_AddCurrentObject(pHo);
            }
        },

        createBackdrop: function (objName, x, y, type, layer) {
            var frame = this.rh.rhFrame;

            // Find backdrop
            for (var i = 0; i < frame.nLayers; ++i) {
                var clayer = frame.layers[i];
                for (var j = 0; j < clayer.nBkdLOs; ++j) {
                    var plo = frame.LOList.getLOFromIndex(clayer.nFirstLOIndex + j);
                    var info = this.rh.rhApp.OIList.getOIFromHandle(plo.loOiHandle);
                    if (info.oiName == objName) {
                        var backdrop = info.oiOC;
                        var imageHandle = backdrop.ocImage;
                        var image = this.rh.rhApp.imageBank.getImageFromHandle(imageHandle);
                        this.rh.addBackdrop(image, x, y, layer, type);
                    }
                }
            }
        }
    };
    
//setup inheritance using extend
CServices.extend(CRunExtension, CRunCreateByName);
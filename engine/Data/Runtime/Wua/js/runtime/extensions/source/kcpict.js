//----------------------------------------------------------------------------------
//
// CRunkcpict: Picture Object
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
CRunkcpict.ACT_LOADPICTURE = 0;
CRunkcpict.ACT_LOADPICTUREREQ = 1;
CRunkcpict.ACT_SHOW = 2;
CRunkcpict.ACT_HIDE = 3;
CRunkcpict.ACT_IMAGERESIZEON = 4;
CRunkcpict.ACT_IMAGERESIZEOFF = 5;
CRunkcpict.ACT_LOADPICTURENAM = 6;
CRunkcpict.CND_PICTURELOADED = 0;
CRunkcpict.CND_VISIBLE = 1;
CRunkcpict.EXP_GETPICTURENAME = 0;
CRunkcpict.EXP_GETPICTUREXSIZE = 1;
CRunkcpict.EXP_GETPICTUREYSIZE = 2;
CRunkcpict.EXP_GETSCREENXSIZE = 3;
CRunkcpict.EXP_GETSCREENYSIZE = 4;
CRunkcpict.EXP_GETXPOS = 5;
CRunkcpict.EXP_GETYPOS = 6;
CRunkcpict.PICTURE_RESIZE = 0x0001;
CRunkcpict.PICTURE_HIDEONSTART = 0x0002;
CRunkcpict.PICTURE_TRANSP_FIRSTPIXEL = 0x0010;

function CRunkcpict() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.resizeImageToObject = false;
    this.pictureWidth = 0;
    this.pictureHeight = 0;
    this.src = '';
    this.image = null;
};

CRunkcpict.prototype = {
    //fusion
    getNumberOfConditions: function () {
        return 9;
    },

    createRunObject: function (file, cob, version) {
        this.ho.hoX = cob.cobX;
        this.ho.hoY = cob.cobY;
        this.pictureWidth = file.readAShort();
        this.pictureHeight = file.readAShort();
        this.ho.hoImgWidth = this.pictureWidth;
        this.ho.hoImgHeight = this.pictureHeight;
        this.flags = file.readAShort();
        this.visible = !(this.flags & CRunkcpict.PICTURE_HIDEONSTART);
        this.resizeImageToObject = (this.flags & CRunkcpict.PICTURE_RESIZE);

        //start the load
        this._load(file.readAString(260));
        return true;
    },

    destroyRunObject: function (bFast) {
        if (this.image != null) {
            this.image.free();
            this.iamge = null;
        }
    },

    handleRunObject: function () {
        return CRunExtension.REFLAG_ONESHOT;
    },

    displayRunObject: function (context, xx, yy) {
        if (this.loaded && this.visible && this.image != null) {
            context.renderSimpleImage(this.image, this.ho.hoX - this.rh.rhWindowX + xx, this.ho.hoY - this.rh.rhWindowY + yy, this.ho.hoImgWidth, this.ho.hoImgHeight, this.ho.hoOi.oiInkEffect, this.ho.hoOi.inkEffectParam);
        }
    },

    condition: function (num, cnd) {
        switch (num) {
            case 0:
                return this.loaded;
            case 1:
                return this.visible;
        }
        return false;
    },

    action: function (num, act) {
        switch (num) {
            case 0:
                this._load(act.getParamFilename(this.rh, 0));
                break;
            case 1:
                break;
            case 2:
                this.visible = true;
                break;
            case 3:
                this.visible = false;
                break;
            case 4:
                this.resizeImageToObject = true;
                break;
            case 5:
                this.ho.hoImgWidth = this.pictureWidth;
                this.ho.hoImgHeight = this.pictureHeight;
                this.resizeImageToObject = false;
                break;
            case 6:
                this._load(act.getParamFilename(this.rh, 0));
                break;
        }
    },

    expression: function (num) {
        switch (num) {
            case 0:
                return this.src;
            case 1:
                return this.pictureWidth;
            case 2:
                return this.pictureHeight;
            case 3:
                return this.ho.hoImgWidth;
            case 4:
                return this.ho.hoImgHeight;
            case 5:
                return this.ho.hoX;
            case 6:
                return this.ho.hoY;
        }
        return 0;
    },

    //internal
    _processImageLoad: function (src, success) {
        this.loaded = true;

        if (!success) {
            //failed to load
            if (this.image) {
                this.image.free();
            }
            this.image = null;

        } else {
            //success :D
            this.pictureWidth = this.image.width;
            this.pictureHeight = this.image.height;

            //do we need to resize the image to match loaded image?
            if (!this.resizeImageToObject) {
                //no, so we do this by resizing the object
                this.ho.hoImgWidth = this.pictureWidth;
                this.ho.hoImgHeight = this.pictureHeight;
            }
        }
    },

    _load: function (src) {
        var app = this.rh.rhApp;

        //clean up old
        if (this.image != null) {
            this.image.free();
            this.image = null;
        }

        //set src path
        this.src = app.findFileSrc(src);

        //load the new image
        this.loaded = false;
        this.image = new CImage(app);
        this.image.loadNow(this.src, this._processImageLoad.bind(this));
    },
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunkcpict);
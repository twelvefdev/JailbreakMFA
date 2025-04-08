//----------------------------------------------------------------------------------
//
// MOBILE FONT OBJECT
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

CRunMobileFont.ACT_SETCOLOR = 0;
CRunMobileFont.ACT_SETINTERLINE = 1;
CRunMobileFont.ACT_SETINTERCHAR = 2;
CRunMobileFont.ACT_SETPRIORITY = 3;
CRunMobileFont.EXP_GETINTERLINE = 0;
CRunMobileFont.EXP_GETINTERCHAR = 1;
CRunMobileFont.EXP_GETPRIORITY = 2;

function CRunMobileFont() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.gFont = null;
}

CRunMobileFont.prototype = {
    getNumberOfConditions: function () {
        return 0;
    },

    createRunObject: function (file, cob, version) {
        this.gFont = new CGraphicFont();
        this.gFont.width = file.readAShort();
        this.gFont.height = file.readAShort();
        this.gFont.color = file.readAColor();

        var images = new Array(1);
        images[0] = file.readAShort();
        this.ho.loadImageList(images);

        this.gFont.image = this.ho.getImage(images[0]);
        this.gFont.flags = file.readAInt();
        this.gFont.fontName = file.readAString(32);

        file.skipBytes(2);

        this.gFont.fontHeight = file.readAShort();
        this.gFont.fontFlags = file.readAInt();
        this.gFont.interline = file.readShort();
        this.gFont.interchar = file.readShort();
        this.gFont.nChars = file.readAShort();
        this.gFont.characters = file.readAString();

        return true;
    },

    destroyRunObject: function (bFast) {
        this.rh.rhApp.graphicFonts.removeObject(this.gFont);
    },

    createFont: function () {
        //we need to wait for the image to load before processing

        // Release old font if it's already created
        if (this.rh.rhApp.graphicFonts != null && this.rh.rhApp.graphicFonts.indexOf(this.gFont) >= 0) {
            this.rh.rhApp.graphicFonts.removeObject(this.gFont);
            this.refreshObjects();
        }

        //this will try to call ready delegate, or queue it for when the image is ready
        this.gFont.image.tryReadyDelegate(this);

        return CRunExtension.REFLAG_ONESHOT;
    },

    refreshObjects: function() {

        var nObject;
        var hoPtr;
        var count;

        for (nObject = 0, count = 0; nObject < this.rh.rhApp.run.rhNObjects; nObject++) {
            while (this.rh.rhApp.run.rhObjectList[count] == null) {
                count++;
            }

            hoPtr = this.rh.rhApp.run.rhObjectList[count];
            count++;
            hoPtr.onGraphicFontChange();
        }
    },

    //delegate events
    onImageReady: function (image) {
        if (image.success && image == this.gFont.image) {
            // Calculates the width of the characters
            var width = image.width;
            var height = image.height;
            var imageData = image.getData();

            var nChars = this.gFont.characters.length;
            this.gFont.charWidths = new Array(nChars);

            var n, m, line, col, x, y, cBase;

            for (n = 0; n < nChars; n++) {
                line = Math.floor(n / this.gFont.nChars);
                y = this.gFont.height + line * (this.gFont.height + 1);
                col = n - (line * this.gFont.nChars);
                x = col * (this.gFont.width + 1);

                // Fix: on devices the image can be modified when it's loaded, i.e. pixels can be antialiased (wtf)
                // To fix the issues this is causing with character width detection, we check if the difference between 2 pixels is less than 16
                // (and we only check the green component as border colors are always red and yellow)
                var dxp = (y * width + x) * 4;
                var g = imageData[dxp + 1];

                for (m = 1; m < this.gFont.width; m++) {
                    if (Math.abs(imageData[dxp + m * 4 + 1] - g) > 16) {
                        break;
                    }
                }

                this.gFont.charWidths[n] = m;
            }

            // Adds to font list
            if (!this.rh.rhApp.graphicFonts) {
                this.rh.rhApp.graphicFonts = new CArrayList();
            }
            this.rh.rhApp.graphicFonts.add(this.gFont);
            this.refreshObjects();
        }
    },

    // Actions
    action: function (num, act) {
        switch (num) {
            case CRunMobileFont.ACT_SETCOLOR:
                this.actSetColor(act);
                break;
            case CRunMobileFont.ACT_SETINTERLINE:
                this.actSetInterline(act);
                break;
            case CRunMobileFont.ACT_SETINTERCHAR:
                this.actSetInterchar(act);
                break;
            case CRunMobileFont.ACT_SETPRIORITY:
                this.actSetPriority(act);
                break;
        }
    },

    actSetColor: function (act) {
        var newColor = act.getParamColour(this.rh, 0) & 0xFFFFFF;
        var image = this.gFont.image;
        var width = image.width;
        var height = image.height;

        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        var context = canvas.getContext("2d");
        if (image.mosaicId == 0) {
            context.drawImage(image.img, 0, 0);
        } else {
            context.drawImage(this.rh.rhApp.imageBank.mosaics[image.mosaicId].image.img,
                image.mosaicX, image.mosaicY,
                width, height, 0, 0,
                width, height);
        }
        var imageData = context.getImageData(0, 0, width, height);

        var x, y;
        var newR = (newColor >> 16) & 0xFF;
        var newG = (newColor >> 8) & 0xFF;
        var newB = (newColor) & 0xFF;
        var offsetLine, adLine;
        for (y = 0; y < height; y++) {
            offsetLine = y * width;
            for (x = 0; x < width; x++) {
                adLine = (offsetLine + x) * 4;
                if (imageData.data[adLine + 3] != 0) {
                    imageData.data[adLine] = newR;
                    imageData.data[adLine + 1] = newG;
                    imageData.data[adLine + 2] = newB;
                }
            }
        }
        context.putImageData(imageData, 0, 0);

        //create new image with this data
        //Note: copied from ReplaceColor code
        var newImage = new CImage(this.rh.rhApp);
        newImage.width = width;
        newImage.height = height;
        newImage.xSpot = image.xSpot;
        newImage.ySpot = image.ySpot;
        newImage.xAP = image.xAP;
        newImage.yAP = image.yAP;
        newImage.useCount = 0;
        newImage.img = canvas;
        newImage.maskNormal = image.maskNormal;
        newImage.maskPlatform = image.maskPlatform;
        newImage.maskRotation = image.maskRotation;
        this.rh.rhApp.renderer.updateImage(newImage, canvas, true, width, height);
        //
        this.gFont.image = newImage;

        this.gFont.image.mosaicId = 0;
        this.gFont.color = newColor;
    },

    actSetInterline: function (act) {
        this.gFont.interline = act.getParamExpression(this.rh, 0);
    },

    actSetInterchar: function (act) {
        this.gFont.interchar = act.getParamExpression(this.rh, 0);
    },

    actSetPriority: function (act) {
        var priority = act.getParamExpression(this.rh, 0);
        if (priority == 0) {
            this.gFont.flags &= ~CGraphicFont.FLAG_PRIORITY;
        } else {
            this.gFont.flags |= CGraphicFont.FLAG_PRIORITY;
        }
    },

    // Expressions
    expression: function (num) {
        switch (num) {
            case CRunMobileFont.EXP_GETINTERLINE:
                return this.gFont.interline;
            case CRunMobileFont.EXP_GETINTERCHAR:
                return this.gFont.interchar;
            case CRunMobileFont.EXP_GETPRIORITY:
                if ((this.gFont.flags & CGraphicFont.FLAG_PRIORITY) != 0) {
                    return 1;
                }
                break;
        }
        return 0;
    }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunMobileFont);
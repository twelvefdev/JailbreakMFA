//ACT_SPRLOADFRAME Object
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

function ACT_SPRLOADFRAME() {
    this.replace = null;
}

ACT_SPRLOADFRAME.prototype = {
    execute: function (rhPtr) {
        var app = rhPtr.rhApp;
        var evtParams = this.evtParams;
        var pHo = rhPtr.rhEvtProg.get_ActionObjects(this);
        if (pHo == null) {
            return;
        }

        pHo.roa.animIn(0);

        //filename
        var filename;
        if (evtParams[0].code == 40) {
            filename = evtParams[0].string;
        } else {
            filename = rhPtr.get_EventExpressionString(evtParams[0]);
        }
        filename = CServices.stripLeadingPath(filename, app.appEditorRootPath);

        //animation
        var animation;
        if (evtParams[1].code == 10) {
            animation = this.evtParams[1].value;
        } else {
            animation = rhPtr.get_EventExpressionInt(evtParams[1]);
        }

        //direction
        var direction;
        if (evtParams[2].code == 29) {
            direction = rhPtr.get_Direction(evtParams[2].value);
        } else {
            direction = rhPtr.get_EventExpressionInt(evtParams[2]);
        }
        direction &= 31;

        //frame
        var frame = rhPtr.get_EventExpressionInt(evtParams[3]);

        //hotspot
        var hotSpotX = rhPtr.get_EventExpressionInt(evtParams[4]);
        var hotSpotY = rhPtr.get_EventExpressionInt(evtParams[5]);

        //action point
        var actionPointX = rhPtr.get_EventExpressionInt(evtParams[6]);
        var actionPointY = rhPtr.get_EventExpressionInt(evtParams[7]);

        //transparent color
        var transparentColor;
        if (evtParams[8].code == 24) {
            transparentColor = evtParams[8].color;
        } else {
            transparentColor = rhPtr.get_EventExpressionInt(evtParams[8]);
        }

        //validate
        if (filename.length == 0 || direction < 0 || direction >= 32 || frame < 0) {
            return;
        }

        // Load the object if necessary
        var poi = app.OIList.getOIFromHandle(pHo.hoOi);

        // Point to animation
        var ocPtr = pHo.hoCommon;		// Calcule l'adresse de l'anim
        var ahPtr = ocPtr.ocAnimations;		// Pointe AnimHeader
        if (animation >= ahPtr.ahAnimMax) {
            return;
        }
        if (ahPtr.ahAnimExists[animation] == 0) {
            return;
        }
        var anPtr = ahPtr.ahAnims[animation];

        // Point to direction
        if (anPtr.anDirs[direction] == null) {
            return;
        }
        var adPtr = anPtr.anDirs[direction];

        // Point to frame
        if (frame >= adPtr.adNumberOfFrame) {
            return;
        }

        // Finds the old image
        var oldImageHandle = adPtr.adFrames[frame];

        // OK, frame exists, open file
        var img;
        var file = app.openFile(filename, true);
        if (file != null) {
            try {
                var mime = CServices.getMIMEType(filename);
                var uri = file.readDataURI(mime);

                //start the image loading
                var image = new CImage(app);
                image.loadNow(uri, function (src, success) {
                    //check success
                    if (!success) {
                        image.free();
                        return;
                    }

                    var width = image.width;
                    var height = image.height;
                    if (width <= 0 || height <= 0) {
                        return;
                    }

                    //fix hot/action points
                    if (hotSpotX == 100000) {
                        hotSpotX = width / 2;
                    }
                    if (hotSpotX == 110000) {
                        hotSpotX = width - 1;
                    }
                    if (hotSpotY == 100000) {
                        hotSpotY = height / 2;
                    }
                    if (hotSpotY == 110000) {
                        hotSpotY = height - 1;
                    }

                    if (actionPointX == 100000) {
                        actionPointX = width / 2;
                    }
                    if (actionPointX == 110000) {
                        actionPointX = width - 1;
                    }
                    if (actionPointY == 100000) {
                        actionPointY = height / 2;
                    }
                    if (actionPointY == 110000) {
                        actionPointY = height - 1;
                    }

                    //add to image bank
                    var newImageHandle = app.imageBank.addImage(image, hotSpotX, hotSpotY, actionPointX, actionPointY);

                    //replace frame
                    adPtr.adFrames[frame] = newImageHandle;

                    //mark OI to reload
                    poi.oiLoadFlags |= COI.OILF_TORELOAD;

                    //changes all the objects of same OI
                    var numObject = pHo.hoOiList.oilObject;
                    var pHoObject;
                    while ((numObject & 0x80000000) == 0) {
                        pHoObject = rhPtr.rhObjectList[numObject];

                        if (pHoObject.roc.rcImage == oldImageHandle) {
                            pHoObject.roc.rcImage = newImageHandle;
                            pHoObject.roc.rcChanged = true;
                        }

                        numObject = pHoObject.hoNumNext;
                    }
                });
            } catch (error) {
                return;
            }
        }
    }
}

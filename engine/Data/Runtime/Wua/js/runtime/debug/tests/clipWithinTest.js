// CDebugTestClipWithinTest object
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

//define custom test
class CDebugTestClipWithinTest extends CDebugTest {
    constructor() {
        super();

        this.x = 0;
        this.y = 0;
        this.width = 40;
        this.height = 20;
        this.centerX = 20;
        this.centerY = 10;
        this.angle = 0.0;
        this.scaleX = 1.0;
        this.scaleY = 1.0;

        this.bounding = new Float32Array(4);
        this.boundingColor = CServices.RGBFlash(0, 0, 255);

        this.boundingCache = false;
        this.boundingCacheResult = new Float32Array(4);
        this.boundingCacheLastAngle = 0.0;
        this.boundingCacheLastScaleX = 1.0;
        this.boundingCacheLastScaleY = 1.0;
        this.boundingCacheLastWidth = 0.0;
        this.boundingCacheLastHeight = 0.0;

        this.oldClipX = 0;
        this.oldClipY = 0;
        this.oldClipWidth = 0;
        this.oldClipHeight = 0;
        this.clipX = 150;
        this.clipY = 150;
        this.clipWidth = this.displayWidth() - 300;
        this.clipHeight = this.displayHeight() - 300;
        this.clipColor = CServices.RGBFlash(128, 128, 128);


        this.withinClip = false;
    }

    onUpdate(app) {
        this.x = this.mouseX();
        this.y = this.mouseY();

        //rotate
        if (this.mouseLeftHeld()) {
            this.angle += 2.7;
        }

        //scale
        if (this.mouseRightHit()) {
            if (this.scaleX < 3.0) {
                this.scaleX += 1.0;
                this.scaleY = this.scaleX;
            } else {
                this.scaleX = 1.0;
                this.scaleY = 1.0;
            }
        }

        //update bounding
        CServices.calculateBounding(this.width, this.height, this.centerX, this.centerY, this.angle, this.scaleX, this.scaleY, this.bounding);

        //change renderer clip, test and then restore
        this.oldClipX = app.renderer.clipWorldX;
        this.oldClipY = app.renderer.clipWorldY;
        this.oldClipWidth = app.renderer.clipWidth;
        this.oldClipHeight = app.renderer.clipHeight;
        app.renderer.clipWorldX = this.clipX;
        app.renderer.clipWorldY = this.clipY;
        app.renderer.clipWidth = this.clipWidth;
        app.renderer.clipHeight = this.clipHeight;

        this.withinClip = app.renderer.withinClip(this.x, this.y, this.width, this.height, this.centerX, this.centerY, this.angle, this.scaleX, this.scaleY,null);//, this);

        app.renderer.clipWorldX = this.oldClipX;
        app.renderer.clipWorldY = this.oldClipY;
        app.renderer.clipWidth = this.oldClipWidth;
        app.renderer.clipHeight = this.oldClipHeight;
    }

    onRender(app, renderer) {
        //rect
        var color;
        if (this.withinClip) {
            color = CServices.RGBFlash(0, 255, 0);
        } else {
            color = CServices.RGBFlash(255, 0, 0);
        }
        renderer.renderRotatedRect(this.x, this.y, this.width, this.height, this.centerX, this.centerY, this.angle, this.scaleX, this.scaleY, color, 0, 0, null);

        //bounding
        renderer.renderOutlineRect(this.x + this.bounding[0]-1, this.y + this.bounding[1]-1, this.bounding[2]+2, this.bounding[3]+2, this.boundingColor, 2);

        //clip
        renderer.renderOutlineRect(this.clipX, this.clipY, this.clipWidth, this.clipHeight, this.clipColor, 1);
    }
}

//register factory
CDebug.addTestFactory('CDebugTestClipWithinTest', CDebugTestClipWithinTest);
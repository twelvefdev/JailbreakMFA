// CDebugTest object
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

class CDebugTest {
    constructor() {
        this.mouseState = [0,0,0];
        this.mouseCode = [CRunApp.VK_LBUTTON, CRunApp.VK_RBUTTON, CRunApp.VK_MBUTTON];
    }

    //events
    onStart(app, callback) {
        //default callback instantly
        callback();
    }

    onFinish(app, callback) {
        //default callback instantly
        callback();
    }

    onUpdate(app) {

    }

    onRender(app, renderer) {

    }

    //test api
    start(callback) {
        //call internal event
        this.onStart(Runtime.application, callback);
    }

    finish(callback) {
        //call internal event
        this.onFinish(Runtime.application, callback);
    }

    update() {
        var app = Runtime.application;

        //update mouse states
        for (var index = 0; index < this.mouseState.length; index++) {
            //release
            if (this.mouseState[index] == -1) {
                this.mouseState[index] = 0;
            }

            //hit or held
            if (this.mouseState[index] == 0) {
                //hit
                if (app.keyBuffer[this.mouseCode[index]] == true) {
                    //yup
                    this.mouseState[index] = 1;
                }
            } else {
                if (app.keyBuffer[this.mouseCode[index]] == true) {
                    //held
                    this.mouseState[index] = 2;
                } else {
                    //up
                    this.mouseState[index] = -1;
                }
            }
        }

        //call internal event
        this.onUpdate(app);
    }

    render() {
        var app = Runtime.application;

        //call internal event
        this.onRender(app, app.renderer);
    }

    next(name) {
        //shortcut
        CDebug.loadTest(name);
    }

    //renderer api
    displayWidth() {
        return Runtime.application.renderer.width;
    }

    displayHeight() {
        return Runtime.application.renderer.height;
    }

    //mouse api
    mouseX() {
        return Runtime.application.mouseX;
    }

    mouseY() {
        return Runtime.application.mouseY;
    }

    mouseLeftHeld() {
        return this.mouseState[0] > 0;
    }

    mouseRightHeld() {
        return this.mouseState[1] > 0;
    }

    mouseMiddleHeld() {
        return this.mouseState[2] > 0;
    }

    mouseLeftHit() {
        return this.mouseState[0] == 1;
    }

    mouseRightHit() {
        return this.mouseState[1] == 1;
    }

    mouseMiddleHit() {
        return this.mouseState[2] == 1;
    }
}
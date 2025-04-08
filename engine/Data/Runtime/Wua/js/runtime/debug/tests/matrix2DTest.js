// CDebugTestMatrix2DTest object
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
class CDebugTestMatrix2DTest extends CDebugTest {
    constructor() {
        super();

        this.angle = 0.0;
    }

    onUpdate() {
        this.angle += 0.3
    }

    onRender(app, renderer) {
        var x = 100;
        var y = 100;
        renderer.pushMatrix();
        renderer.translateMatrix(x, y);
        renderer.rotateMatrix(this.angle * ToRadians);
        renderer.renderFilledRect(0, 0, 64, 64, CServices.RGBFlash(255, 0, 0));
        renderer.popMatrix();
    }
}

//register factory
CDebug.addTestFactory('CDebugTestMatrix2DTest', CDebugTestMatrix2DTest);
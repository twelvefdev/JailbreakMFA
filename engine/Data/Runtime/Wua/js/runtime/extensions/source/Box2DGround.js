//----------------------------------------------------------------------------------
//
// CRUNBOX2DGROUND
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
function CRunBox2DGround() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.obstacle = 0;
    this.direction = 0;
    this.friction = 0;
    this.restitution = 0;
    this.identifier = 0;
}

CRunBox2DGround.prototype = {
        getNumberOfConditions: function () {
            return 0;
        },

        createRunObject: function (file, cob, version) {
            this.obstacle = file.readAShort();
            this.direction = file.readAShort();
            this.friction = file.readAInt() / 100.0;
            this.restitution = file.readAInt() / 100.0;
            this.identifier = file.readAInt();

            return 0;
        },

        handleRunObject: function () {
            return CRunExtension.REFLAG_ONESHOT;
        }
    };

//setup inheritance using extend
CServices.extend(CRunExtension, CRunBox2DGround);
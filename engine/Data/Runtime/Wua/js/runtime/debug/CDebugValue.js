// CDebugValue object
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

function CDebugValue(options) {
    this.title = options && options.title ? options.title : '';
    this.value = options && options.value ? options.value : '';
    this.padding = 2;

    //get parent
    var parent = options && options.parent ? options.parent : document.body;

    //create teh canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = CDebug.debugPanelWidth;
    this.canvas.style.height = CDebug.debugPanelValueHeight;
    this.canvas.width = CDebug.debugPanelWidth;
    this.canvas.height = CDebug.debugPanelValueHeight;
    parent.appendChild(this.canvas);
}

CDebugValue.prototype = {
    render: function () {
        //update graph
        var history = this.history;
        var canvas = this.canvas;
        var context = canvas.getContext('2d');

        //background
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);


        //calculate font size
        var fontName = 'Arial';
        var fontSize;
        var textWidth;
        var textSpacing = true;
        var boundsWidth = canvas.width - this.padding - this.padding;
        for (fontSize = 10; fontSize > 7; fontSize = fontSize - 0.2) {
            textWidth = 0;

            context.font = fontSize + 'px ' + fontName;

            //add title
            if (this.title.length) {
                textWidth += context.measureText(this.title).width;
            }

            //add spacing
            if (textSpacing) {
                textWidth += fontSize;
            }

            //add value
            textWidth += context.measureText(this.value).width;

            //is it good?
            if (textWidth <= boundsWidth) {
                break;
            }
        }

        //prepare font
        context.textBaseline = 'top';
        context.font = fontSize + 'px ' + fontName;

        //title
        if (this.title.length) {
            context.textAlign = 'left';
            context.fillStyle = 'rgb(0,0,0)';
            context.fillText(this.title, this.padding + 2, this.padding + 2);
            context.fillStyle = 'rgb(255,200,0)';
            context.fillText(this.title, this.padding, this.padding);
        }

        //value
        context.textAlign = 'right';
        context.fillStyle = 'rgb(0,0,0)';
        context.fillText(this.value, canvas.width - this.padding + 1, this.padding + 1);
        context.fillStyle = 'rgb(255,200,0)';
        context.fillText(this.value, canvas.width - this.padding, this.padding);
    },

    set: function (value) {
        if (value != this.value) {
            this.value = value;

            //update
            this.render();
        }
    },
};
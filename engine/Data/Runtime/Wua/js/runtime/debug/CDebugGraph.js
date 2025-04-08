// CDebugGraph object
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

function CDebugGraph(options) {
    this.title = options && options.title ? options.title : '';
    this.canvas = null;
    this.count = 0;
    this.history = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.historyCount = 0;
    this.calculate = 0;
    this.timestamp = Date.now();
    this.targetValue = options && options.targetValue ? options.targetValue : 60;
    this.maxValue = options && options.maxValue ? options.maxValue : 60;
    this.maxFpsPadding = options && options.fpsPadding ? options.fpsPadding : 30;
    this.padding = 5;

    //get parent
    var parent = options && options.parent ? options.parent : document.body;

    //create teh canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.width = CDebug.debugPanelWidth;
    this.canvas.style.height = CDebug.debugPanelGraphHeight;
    this.canvas.width = CDebug.debugPanelWidth;
    this.canvas.height = CDebug.debugPanelGraphHeight;
    parent.appendChild(this.canvas);
}

CDebugGraph.prototype = {
    reset: function () {
        this.historyCount = 0;
        this.timestamp = Date.now();
        this.maxValue = this.targetValue + this.maxFpsPadding;

        for (var index = 0; index < history.length; index++) {
            this.history[index] = 0;
        }

        //update graph
        this.render();
    },

    setTarget: function (targetValue) {
        this.targetValue = targetValue;
        this.maxValue = Math.max(this.maxValue, this.targetValue + this.padding);
    },

    fps: function () {
        return history[0];
    },

    render: function () {
        //update graph
        var history = this.history;
        var canvas = this.canvas;
        var context = canvas.getContext('2d');

        //background
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = '#000000';
        context.fillRect(0, 0, canvas.width, canvas.height);

        //bars
        var pointX = canvas.width;
        var pointY = canvas.height;
        var pointValue = 0;
        var step = canvas.width / history.length;
        var r = 0;
        var g = 255;
        var b = 0;

        for (index = 0; index < this.historyCount; index++) {
            pointValue = history[index];
            pointX -= step;
            pointY = (canvas.height / this.maxValue) * pointValue;

            g = Math.min(255, Math.round((255.0 / this.maxValue) * pointValue));
            r = 255 - Math.min(255, Math.round((255.0 / this.maxValue) * pointValue));

            context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            context.fillRect(pointX, (canvas.height - pointY), step, pointY);
        }

        //targetValue line
        context.beginPath();
        context.strokeStyle = '#ff0000';
        pointY = canvas.height - ((canvas.height / this.maxValue) * this.targetValue);
        context.moveTo(0, pointY);
        context.lineTo(canvas.width, pointY);
        context.stroke();

        //title
        if (this.title.length) {
            context.textBaseline = 'top';
            context.font = "10px Arial";
            context.textAlign = 'left';
            context.fillStyle = 'rgb(0,0,0)';
            context.fillText(this.title, this.padding + 2, this.padding + 2);
            context.fillStyle = 'rgb(255,200,0)';
            context.fillText(this.title, this.padding, this.padding);
        }

        //value
        var currentValue = history[0];
        context.textBaseline = 'top';
        context.font = "10px Arial";
        context.textAlign = 'right';
        context.fillStyle = 'rgb(0,0,0)';
        context.fillText(currentValue, canvas.width - this.padding + 1, this.padding + 1);
        context.fillStyle = 'rgb(255,200,0)';
        context.fillText(currentValue, canvas.width - this.padding, this.padding);
    },

    setValue: function (amount) {
        var history = this.history;

        if (amount != history[0]) {

            //shift history along
            for (index = history.length - 1; index > 0; index--) {
                history[index] = history[index - 1];
            }

            //add new history
            history[0] = amount;

            //increase hsitory count
            if (this.historyCount < history.length) {
                this.historyCount++;
            }

            //calculate max
            this.maxValue = 0;
            for (index = 0; index < this.historyCount; index++) {
                this.maxValue = Math.max(this.maxValue, this.history[index]);
            }

            //update graph
            this.render();
        }
    },

    updateValue: function () {
        //update fps
        var ms = Date.now();
        var history = this.history;
        var index;

        this.count += 1

        if (ms >= this.timestamp + 1000) {
            //shift history along
            for (index = history.length - 1; index > 0; index--) {
                history[index] = history[index - 1];
            }

            //add new history
            history[0] = this.count;

            //increase max
            this.maxValue = Math.max(history[0] + this.maxFpsPadding, this.maxValue);

            //increase hsitory count
            if (this.historyCount < history.length) {
                this.historyCount++;
            }

            //reset
            this.count = 0;
            this.timestamp = ms;

            //update graph
            this.render();
        }
    },
};
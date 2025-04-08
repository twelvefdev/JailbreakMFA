// CalcRect object
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
CRunCalcRect.ACT_SetFont = 0;
CRunCalcRect.ACT_SetText = 1;
CRunCalcRect.ACT_SetMaxWidth = 2;
CRunCalcRect.ACT_CalcRect = 3;
CRunCalcRect.EXP_GetWidth = 0;
CRunCalcRect.EXP_GetHeight = 1;

function CRunCalcRect() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.font = null;
    this.width = 10000;
    this.height = 10000;
    this.textContainer = null;
    this.textBufferCalculate = {
        width: 0,
        height: 0,
    };
}

CRunCalcRect.prototype = {
    getNumberOfConditions: function () {
        return 0;
    },

    createRunObject: function (file, cob, version) {
        //we should create a canvas here as we can no longer rely on the main app _context. It might be using webgl...
        var app = this.ho.hoAdRunHeader.rhApp;

        this.font = new CFontInfo();

        //create text buffer and set defaults
        this.textContainer = app.createTextContainer();
        this.textContainer.setSize(this.width, this.height);
        this.textContainer.setFont(this.font);
        this.textContainer.setFlags(CRendererTextContainer.LEFT | CRendererTextContainer.TOP | CRendererTextContainer.LINEBREAKS | CRendererTextContainer.WORDWRAP);

        return true;
    },

    destroyRunObject: function (bFast) {
        //remove the canvas we created!
        if (this.textContainer != null) {
            this.textContainer.free();
            this.textContainer = null;
        }
    },

    action: function (num, act) {
        switch (num) {
            case CRunCalcRect.ACT_SetFont:
                this._changeFont(act.getParamExpString(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                break;

            case CRunCalcRect.ACT_SetText:
                this.textContainer.setText(act.getParamExpString(this.rh, 0));
                break;

            case CRunCalcRect.ACT_SetMaxWidth:
                var width = act.getParamExpression(this.rh, 0);
                this.width = width <= 0 ? 10000 : width;
                this.textContainer.setSize(this.width, this.height);
                break;

            case CRunCalcRect.ACT_CalcRect:
                this._calculate();
                break;
        }
    },

    expression: function (num) {
        var ret;
        switch (num) {
            case CRunCalcRect.EXP_GetWidth:
                return this.textBufferCalculate.width;

            case CRunCalcRect.EXP_GetHeight:
                return this.textBufferCalculate.height;
        }
        return 0;//won't be used
    },

    //internal
    _calculate: function () {
        this.textContainer.measure(this.textBufferCalculate);
    },

    _changeFont: function (name, height, style) {
        var font = this.font;

        //get new fontinfo details
        name = name != null && name.length ? name : 'Arial';
        height = CServices.heightNormalToLF(height);
        var weight = (style & 1) == 1 ? 700 : 400;
        var italic = (style & 2) == 2 ? 1 : 0;

        //has it changed?
        if (font == null || name != font.lfFaceName || height != font.lfHeight || weight != font.lfWeight || italic != font.lfItalic) {
            //create new font
            this.font = new CFontInfo();
            font = this.font;
            font.lfFaceName = name;
            font.lfHeight = height;
            font.lfWeight = weight;
            font.lfItalic = italic;

            //apply to textbuffer
            this.textContainer.setFont(font);
        }
    },
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunCalcRect);
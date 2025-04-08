//----------------------------------------------------------------------------------
//
// CRUNCALCRECT
//
//----------------------------------------------------------------------------------
/* Copyright (c) 1996-2012 Clickteam
 *
 * This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
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
CRunCalcRect.MAX_HEIGHTS = 40;

function CRunCalcRect()
{
	this.text = "";
	this.fontName = "";
	this.fontHeight = 10;
	this.fontBold = false;
	this.fontItalic = false;
	this.fontUnderline = false;
	this.maxWidth = 10000;
	this.calcWidth = 0;
	this.calcHeight = 0;
}
CRunCalcRect.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 0;
		},

		createRunObject: function (file, cob, version)
		{
			return true;
		},

		action: function (num, act)
		{
			switch (num)
			{
				case CRunCalcRect.ACT_SetFont:
					this.SetFont(act.getParamExpString(this.rh, 0),
						act.getParamExpression(this.rh, 1),
						act.getParamExpression(this.rh, 2));
					break;

				case CRunCalcRect.ACT_SetText:
					this.SetText(act.getParamExpString(this.rh, 0));
					break;

				case CRunCalcRect.ACT_SetMaxWidth:
					this.SetMaxWidth(act.getParamExpression(this.rh, 0));
					break;

				case CRunCalcRect.ACT_CalcRect:
					this.CalcRect();
					break;
			}
		},

		expression: function (num)
		{
			var ret;
			switch (num)
			{
				case CRunCalcRect.EXP_GetWidth:
					return this.GetWidth();

				case CRunCalcRect.EXP_GetHeight:
					return this.GetHeight();
			}
			return (0);//won't be used
		},

		CalcRect: function ()
		{
		    var font = new CFontInfo();
		    if (this.fontName != null && this.fontName != "")
			    font.lfFaceName = this.fontName;
			font.lfHeight = this.fontHeight;
			font.lfWeight = this.fontBold ? 700 : 400;
			font.lfItalic = this.fontItalic ? 1 : 0;
			var rc = new CRect();
			rc.right = this.maxWidth;
			rc.bottom = 10000;
			this.calcHeight = CServices.drawText(this.rh.rhApp.context._context, this.text, CServices.DT_CALCRECT | CServices.DT_LEFT, rc, font, null);
			this.calcWidth = rc.right;
		},

		GetHeight: function ()
		{
			return Math.round(this.calcHeight);
		},

		GetWidth: function ()
		{
			return Math.round(this.calcWidth);
		},

		SetFont: function (name, height, style)
		{
			this.fontName = name;
			this.fontHeight = CServices.heightNormalToLF(height);
			this.fontBold = (style & 1) == 1;
			this.fontItalic = (style & 2) == 2;
			this.fontUnderline = (style & 4) == 4;
		},

		SetMaxWidth: function (width)
		{
			if (width <= 0)
				this.maxWidth = 10000;
			else
				this.maxWidth = width;
		},

		SetText: function (text)
		{
			this.text = text;
		}
	});


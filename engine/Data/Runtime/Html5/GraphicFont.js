//----------------------------------------------------------------------------------
//
// GRAPHIC FONT OBJECT
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
CRunGraphicFont.ACT_SETCOLOR = 0;
CRunGraphicFont.ACT_SETINTERLINE = 1;
CRunGraphicFont.ACT_SETINTERCHAR = 2;
CRunGraphicFont.ACT_SETPRIORITY = 3;
CRunGraphicFont.EXP_GETINTERLINE = 0;
CRunGraphicFont.EXP_GETINTERCHAR = 1;
CRunGraphicFont.EXP_GETPRIORITY = 2;

function CRunGraphicFont()
{
	this.gFont = null;
}
CRunGraphicFont.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 0;
		},

		createRunObject:  function (file, cob, version)
		{
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
			this.gFont.interline = file.readAShort();
			this.gFont.interchar = file.readAShort();
			this.gFont.nChars = file.readAShort();
			this.gFont.characters = file.readAString();

			return true;
		},
		destroyRunObject: function (bFast)
		{
			this.rh.rhApp.graphicFonts.removeObject(this.gFont);
		},
		createFont:       function ()
		{
			// Calculates the width of the characters
			var image = this.gFont.image;
			var width = image.width;
			var height = image.height;
			var canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			var context = canvas.getContext("2d");
			if (image.mosaic == 0)
				context.drawImage(image.img, 0, 0);
			else
			{
				context.drawImage(this.rh.rhApp.imageBank.mosaics[image.mosaic],
					image.mosaicX, image.mosaicY,
					width, height, 0, 0,
					width, height);
			}
			var imageData = context.getImageData(0, 0, width, height);
			var nChars = this.gFont.characters.length;
			this.gFont.charWidths = new Array(nChars);
			var n, m, line, col, x, y, cBase;
			for (n = 0; n < nChars; n++)
			{
				line = Math.floor(n / this.gFont.nChars);
				y = line * (this.gFont.height + 1);
				col = n - (line * this.gFont.nChars);
				x = col * (this.gFont.width + 1);
				var r = imageData.data[(y * width + x) * 4];
				var g = imageData.data[(y * width + x) * 4 + 1];
				var b = imageData.data[(y * width + x) * 4 + 2];
				for (m = 1; m < this.gFont.width; m++)
				{
					if (imageData.data[(y * width + x + m) * 4] != r
						|| imageData.data[(y * width + x + m) * 4 + 1] != g
						|| imageData.data[(y * width + x + m) * 4 + 2] != b)
					{
						break;
					}
				}
				this.gFont.charWidths[n] = m;
			}
/*
			for (n = 0; n < nChars; n++)
			{
				line = Math.floor(n / this.gFont.nChars);
				y = this.gFont.height + line * (this.gFont.height + 1);
				col = n - (line * this.gFont.nChars);
				x = col * (this.gFont.width + 1);
				var r = imageData.data[(y * width + x) * 4];
				var g = imageData.data[(y * width + x) * 4 + 1];
				var b = imageData.data[(y * width + x) * 4 + 2];
				for (m = 1; m < this.gFont.width; m++)
				{
					if (imageData.data[(y * width + x + m) * 4] != r
						|| imageData.data[(y * width + x + m) * 4 + 1] != g
						|| imageData.data[(y * width + x + m) * 4 + 2] != b)
					{
						break;
					}
				}
				this.gFont.charWidths[n] = m;
 			}
 */

			// Adds to font list
			if (!this.rh.rhApp.graphicFonts)
			{
				this.rh.rhApp.graphicFonts = new CArrayList();
			}
			this.rh.rhApp.graphicFonts.add(this.gFont);

			return CRunExtension.REFLAG_ONESHOT;
		},

		// Actions
		// -------------------------------------------------
		action:           function (num, act)
		{
			switch (num)
			{
				case CRunGraphicsFont.ACT_SETCOLOR:
					this.actSetColor(act);
					break;
				case CRunGraphicsFont.ACT_SETINTERLINE:
					this.actSetInterline(act);
					break;
				case CRunGraphicsFont.ACT_SETINTERCHAR:
					this.actSetInterchar(act);
					break;
				case CRunGraphicsFont.ACT_SETPRIORITY:
					this.actSetPriority(act);
					break;
			}
		},
		actSetColor:      function (act)
		{
			var newColor = act.getParamColour(this.rh, 0) & 0xFFFFFF;
			var image = this.gFont.image;
			var width = image.width;
			var height = image.height;

			var canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			var context = canvas.getContext("2d");
			if (image.mosaic == 0)
				context.drawImage(image.img, 0, 0);
			else
			{
				context.drawImage(this.rh.rhApp.imageBank.mosaics[image.mosaic],
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
			for (y = 0; y < height; y++)
			{
				offsetLine = y * width;
				for (x = 0; x < width; x++)
				{
					adLine = (offsetLine + x) * 4;
					if (imageData.data[adLine + 3] != 0)
					{
						imageData.data[adLine] = newR;
						imageData.data[adLine + 1] = newG;
						imageData.data[adLine + 2] = newB;
					}
				}
			}
			context.putImageData(imageData, 0, 0);
			image.img = canvas;
			image.mosaic = 0;
			this.gFont.color = newColor;
		},

		actSetInterline: function (act)
		{
			this.gFont.interline = act.getParamExpression(this.rh, 0);
		},

		actSetInterchar: function (act)
		{
			this.gFont.interchar = act.getParamExpression(this.rh, 0);
		},

		actSetPriority: function (act)
		{
			var priority = act.getParamExpression(this.rh, 0);
			if (priority == 0)
				this.gFont.flags &= ~CGraphicFont.FLAG_PRIORITY;
			else
				this.gFont.flags |= CGraphicFont.FLAG_PRIORITY;
		},

		// Expressions
		// --------------------------------------------
		expression:     function (num)
		{
			switch (num)
			{
				case CRunGraphicFont.EXP_GETINTERLINE:
					return this.gFont.interline;
				case CRunGraphicFont.EXP_GETINTERCHAR:
					return this.gFont.interchar;
				case CRunGraphicFOnt.EXP_GETPRIORITY:
					if ((this.gFont.flags & CGraphicFont.FLAG_PRIORITY) != 0)
					{
						return 1;
					}
					break;
			}
			return 0;
		}

	});


//----------------------------------------------------------------------------------
//
// CRunkcpict: Picture Object
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
CRunkcpict.ACT_LOADPICTURE = 0;
CRunkcpict.ACT_LOADPICTUREREQ = 1;
CRunkcpict.ACT_SHOW = 2;
CRunkcpict.ACT_HIDE = 3;
CRunkcpict.ACT_IMAGERESIZEON = 4;
CRunkcpict.ACT_IMAGERESIZEOFF = 5;
CRunkcpict.ACT_LOADPICTURENAM = 6;
CRunkcpict.CND_PICTURELOADED = 0;
CRunkcpict.CND_VISIBLE = 1;
CRunkcpict.EXP_GETPICTURENAME = 0;
CRunkcpict.EXP_GETPICTUREXSIZE = 1;
CRunkcpict.EXP_GETPICTUREYSIZE = 2;
CRunkcpict.EXP_GETSCREENXSIZE = 3;
CRunkcpict.EXP_GETSCREENYSIZE = 4;
CRunkcpict.EXP_GETXPOS = 5;
CRunkcpict.EXP_GETYPOS = 6;
CRunkcpict.PICTURE_RESIZE = 0x0001;
CRunkcpict.PICTURE_HIDEONSTART = 0x0002;
CRunkcpict.PICTURE_TRANSP_FIRSTPIXEL = 0x0010;

function CRunkcpict()
{
	this.sImageResize = false;
	this.sImageShow = false;
	this.szImageName = null;
	this.nPictureWidth = 0;
	this.nPictureHeight = 0;
};

CRunkcpict.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 9;
		},

		createRunObject: function (file, cob, version)
		{
			this.ho.hoX = cob.cobX;
			this.ho.hoY = cob.cobY;
			this.width = file.readAShort();
			this.height = file.readAShort();
			this.ho.hoImgWidth = this.width;
			this.ho.hoImgHeight = this.height;
			this.flags = file.readAShort();
			this.bVisible = !(this.flags & CRunkcpict.PICTURE_HIDEONSTART);
			this.bImageResize = (this.flags & CRunkcpict.PICTURE_RESIZE);
			this.imageName = CServices.subtractFilename(file.readAString(260), this.rh.rhApp.appEditorFilename);

			this.image = new Image();
			var that = this;
			this.image.onload = function ()
			{
				that.bImageLoaded = true;
				if (!that.bImageResize)
				{
					that.ho.hoImgWidth = that.image.width;
					that.ho.hoImgHeight = that.image.height;
				}
			}
			this.image.src = this.imageName;
			return true;
		},

		handleRunObject: function ()
		{
			return CRunExtension.REFLAG_ONESHOT;
		},

		displayRunObject: function (context, xDraw, yDraw)
		{
			if (this.bImageLoaded && this.bVisible)
			{
				context.renderSimpleImage(this.image, this.ho.hoX - this.rh.rhWindowX, this.ho.hoY - this.rh.rhWindowY,
					this.ho.hoImgWidth, this.ho.hoImgHeight, this.ho.hoOi.oiInkEffect, this.ho.hoOi.inkEffectParam);
			}
		},

		condition: function (num, cnd)
		{
			switch (num)
			{
				case 0:
					return this.bImageLoaded;
				case 1:
					return this.bVisible;
			}
			return false;
		},

		action: function (num, act)
		{
			switch (num)
			{
				case 0:
					this.actLoadPicture(act);
					break;
				case 1:
					break;
				case 2:
					this.bVisible = true;
					break;
				case 3:
					this.bVisible = false;
					break;
				case 4:
					this.ho.hoImgWidth = this.width;
					this.ho.hoImgHeight = this.height;
					this.bImageResize = true;
					break;
				case 5:
					this.ho.hoImgWidth = this.image.width;
					this.ho.hoImgHeight = this.image.height;
					this.bImageResize = false;
					break;
				case 6:
					this.actLoadPicture(act);
					break;
			}
		},

		actLoadPicture: function (act)
		{
			this.bImageLoaded = false;
			var that = this;
			this.image.onload = function ()
			{
				that.bImageLoaded = true;
				if (!that.bImageResize)
				{
					that.ho.hoImgWidth = that.image.width;
					that.ho.hoImgHeight = that.image.height;
				}
			}
			this.image.src = act.getParamFilename(this.rh, 0);
		},

		expression: function (num)
		{
			switch (num)
			{
				case 0:
					return this.image.src;
				case 1:
					return this.image.width;
				case 2:
					return this.image.height;
				case 3:
					return this.ho.hoImgWidth;
				case 4:
					return this.ho.hoImgHeight;
				case 5:
					return this.ho.hoX;
				case 6:
					return this.ho.hoY;
			}
			return 0;
		}

	});

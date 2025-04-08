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
CRunkcpica.CND_PICTURELOADED = 0;
CRunkcpica.CND_ISFLIPPED_HORZ = 1;
CRunkcpica.CND_ISFLIPPED_VERT = 2;
CRunkcpica.CND_ISWRAPMODE_ON = 3;
CRunkcpica.CND_LAST = 4;
CRunkcpica.ACT_LOADPICTURE = 0;
CRunkcpica.ACT_LOADPICTUREREQ = 1;
CRunkcpica.ACT_SETHOTSPOT = 2;
CRunkcpica.ACT_SETSIZEPIXELS = 3;
CRunkcpica.ACT_SETANGLE = 4;
CRunkcpica.ACT_SETSEMITRANSPRATIO = 5;
CRunkcpica.ACT_SETHOTSPOT_TOPLEFT = 6;
CRunkcpica.ACT_SETHOTSPOT_TOPCENTER = 7;
CRunkcpica.ACT_SETHOTSPOT_TOPRIGHT = 8;
CRunkcpica.ACT_SETHOTSPOT_CENTERLEFT = 9;
CRunkcpica.ACT_SETHOTSPOT_CENTER = 10;
CRunkcpica.ACT_SETHOTSPOT_CENTERRIGHT = 11;
CRunkcpica.ACT_SETHOTSPOT_BOTTOMLEFT = 12;
CRunkcpica.ACT_SETHOTSPOT_BOTTOMCENTER = 13;
CRunkcpica.ACT_SETHOTSPOT_BOTTOMRIGHT = 14;
CRunkcpica.ACT_FLIPH = 15;
CRunkcpica.ACT_FLIPV = 16;
CRunkcpica.ACT_LINKDIR = 17;
CRunkcpica.ACT_UNLINKDIR = 18;
CRunkcpica.ACT_LOOKAT = 19;
CRunkcpica.ACT_SETOFFSETX = 20;
CRunkcpica.ACT_SETOFFSETY = 21;
CRunkcpica.ACT_SETRESIZE_FAST = 22;
CRunkcpica.ACT_SETRESIZE_RESAMPLE = 23;
CRunkcpica.ACT_SETWRAPMODE_ON = 24;
CRunkcpica.ACT_SETWRAPMODE_OFF = 25;
CRunkcpica.ACT_ADDBACKDROP = 26;
CRunkcpica.ACT_SETAUTORESIZE_ON = 27;
CRunkcpica.ACT_SETAUTORESIZE_OFF = 28;
CRunkcpica.ACT_ZOOMPERCENT = 29;
CRunkcpica.ACT_ZOOMWIDTH = 30;
CRunkcpica.ACT_ZOOMHEIGHT = 31;
CRunkcpica.ACT_ZOOMRECT = 32;
CRunkcpica.EXP_GETPICTURENAME = 0;
CRunkcpica.EXP_GETPICTUREXSIZE = 1;
CRunkcpica.EXP_GETPICTUREYSIZE = 2;
CRunkcpica.EXP_GETRESIZEDXSIZE = 3;
CRunkcpica.EXP_GETRESIZEDYSIZE = 4;
CRunkcpica.EXP_GETDISPLAYXSIZE = 5;
CRunkcpica.EXP_GETDISPLAYYSIZE = 6;
CRunkcpica.EXP_GETHOTSPOTX = 7;
CRunkcpica.EXP_GETHOTSPOTY = 8;
CRunkcpica.EXP_GETANGLE = 9;
CRunkcpica.EXP_GETSEMITRANSPRATIO = 10;
CRunkcpica.EXP_GETOFFSETX = 11;
CRunkcpica.EXP_GETOFFSETY = 12;
CRunkcpica.EXP_GETZOOMFACTORX = 13;
CRunkcpica.EXP_GETZOOMFACTORY = 14;
CRunkcpica.PICTURE_RESIZE = 0x0001;
CRunkcpica.PICTURE_HIDEONSTART = 0x0002;
CRunkcpica.OLD_PICTURE_TRANSPARENT = 0x0004;		// nolonger used
CRunkcpica.OLD_PICTURE_TRANSP_BLACK = 0x0008;
CRunkcpica.PICTURE_TRANSP_FIRSTPIXEL = 0x0010;
CRunkcpica.PICTURE_FLIPPED_HORZ = 0x0020;
CRunkcpica.PICTURE_FLIPPED_VERT = 0x0040;
CRunkcpica.PICTURE_RESAMPLE = 0x0080;
CRunkcpica.WRAPMODE_OFF = 0x0100;
CRunkcpica.PICTURE_SOFTWAREMODE = 0x0200;
CRunkcpica.PICTURE_LINKDIR = 0x00010000;


function CRunkcpica()
{
	this.szImageName = null;
	this.dwImageFlags = 0;
	this.dwScreenWidth = 0;
	this.dwScreenHeight = 0;
	this.dwEditorWidth = 0;
	this.dwEditorHeight = 0;

	this.fAngle = 0;
	this.nOffsetX = 0;
	this.nOffsetY = 0;
	this.bAlpha = 0;
	this.cImage = null;
	this.image = null;
}

CRunkcpica.prototype = CServices.extend(new CRunExtension(),
	{

		getNumberOfConditions: function ()
		{
			return CRunkcpica.CND_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			this.ho.hoX = cob.cobX;
			this.ho.hoY = cob.cobY;
			this.dwEditorWidth = file.readAInt();
			this.dwEditorHeight = file.readAInt();
			this.dwScreenWidth = this.dwEditorWidth;
			this.dwScreenHeight = this.dwEditorHeight;
			this.ho.hoImgWidth = this.dwEditorWidth;
			this.ho.hoImgHeight = this.dwEditorHeight;
			this.dwImageFlags = file.readAInt();
			this.dwTranspColor = file.readAInt();
			this.imageName = file.readAString(260);
			this.imageName = CServices.subtractFilename(this.imageName, this.rh.rhApp.appEditorFilename);
			this.szImageName = window.location.href + "/" + this.imageName.replace("\\","/");

			this.nOffsetX = 0;
			this.nOffsetY = 0;
			this.fAngle = 0;

			this.image = new Image();
			var that = this;
			this.bImageLoaded = false;
			this.cImage = new CImage();
			this.image.onload = function ()
			{
				that.bImageLoaded = true;
				if (!(that.dwImageFlags & CRunkcpica.PICTURE_RESIZE))
				{
					that.ho.hoImgWidth = that.image.width;
					that.ho.hoImgHeight = that.image.height;
					that.dwScreenWidth = that.image.width;
					that.dwScreenHeight = that.image.height;
				}
				that.cImage.width = that.image.width;
				that.cImage.height = that.image.height;
				that.cImage.img = this;
				that.onChange();
			}
			this.image.src = this.imageName;
			return true;
		},

		handleRunObject: function ()
		{
		    if (this.dwImageFlags & CRunkcpica.PICTURE_LINKDIR)
		    {
		        var angle = (this.rh.getDir(this.ho) * 360) / 32;
		        while (angle < 0)
		            angle += 360;
		        while (angle >= 360)
		            angle -= 360;
		        if (this.fAngle != angle) {
		            this.fAngle = angle;
		            this.onChange();
		        }
		    }
		    return 0;
		},

		displayRunObject: function (context, xDraw, yDraw)
		{
			if (this.bImageLoaded)
			{
			    var scaleX = this.dwScreenWidth / this.cImage.width;
			    var scaleY = this.dwScreenHeight / this.cImage.height;
				var x = xDraw + this.ho.hoX - this.rh.rhWindowX + this.ho.pLayer.x;
				var y = yDraw + this.ho.hoY - this.rh.rhWindowY + this.ho.pLayer.y;
				var angle = this.fAngle;
				var effect = this.ho.ros.rsEffect;
				if ((this.dwScreenWidth != this.cImage.width || this.dwScreenHeight != this.cImage.height) && (this.dwImageFlags & CRunkcpica.PICTURE_RESAMPLE))
					effect |= CRSpr.BOP_SMOOTHING;
				context.renderImage(this.cImage, x, y, angle, scaleX, scaleY, effect, this.ho.ros.rsEffectParam);
			}
		},

		condition: function(num, cnd)
		{
			switch (num)
			{
				case CRunkcpica.CND_PICTURELOADED:
					return this.bImageLoaded;
				case CRunkcpica.CND_ISFLIPPED_HORZ:
				case CRunkcpica.CND_ISFLIPPED_VERT:
				case CRunkcpica.CND_ISWRAPMODE_ON:
					return false;
			}
		},
		action: function (num, act)
		{
			switch (num)
			{
				case CRunkcpica.ACT_LOADPICTURE:
				    this.actLoadPicture(act);
				    this.onChange();
				    break;
				case CRunkcpica.ACT_LOADPICTUREREQ:
					break;
			    case CRunkcpica.ACT_SETHOTSPOT:
			        this.setHotSpot(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
					break;
				case CRunkcpica.ACT_SETSIZEPIXELS:
				    this.dwScreenWidth = Math.max(act.getParamExpression(this.rh, 0), 0);
				    this.dwScreenHeight = Math.max(act.getParamExpression(this.rh, 1), 10);
					this.onChange();
					break;
				case CRunkcpica.ACT_SETANGLE:
					var angle = act.getParamExpression(this.rh, 0);
					while (angle < 0)
						angle += 360;
					while (angle >= 360)
					    angle -= 360;
					if (this.fAngle != angle) {
					    this.fAngle = angle;
					    this.onChange();
					}
					break;
				case CRunkcpica.ACT_SETSEMITRANSPRATIO:
					break;
			    case CRunkcpica.ACT_SETHOTSPOT_TOPLEFT:
			        this.setHotSpot(0, 0);
					break;
				case CRunkcpica.ACT_SETHOTSPOT_TOPCENTER:
				    this.setHotSpot(this.cImage.width / 2, 0);
					break;
				case CRunkcpica.ACT_SETHOTSPOT_TOPRIGHT:
				    this.setHotSpot(this.cImage.width, 0);
					break;
			    case CRunkcpica.ACT_SETHOTSPOT_CENTERLEFT:
			        this.setHotSpot(0, this.cImage.height / 2);
					break;
				case CRunkcpica.ACT_SETHOTSPOT_CENTER:
				    this.setHotSpot(this.cImage.width / 2, this.cImage.height / 2);
					break;
				case CRunkcpica.ACT_SETHOTSPOT_CENTERRIGHT:
				    this.setHotSpot(this.cImage.width, this.cImage.height / 2);
					break;
				case CRunkcpica.ACT_SETHOTSPOT_BOTTOMLEFT:
				    this.setHotSpot(0, this.cImage.height);
					break;
				case CRunkcpica.ACT_SETHOTSPOT_BOTTOMCENTER:
				    this.setHotSpot(this.cImage.width / 2, this.cImage.height);
					break;
				case CRunkcpica.ACT_SETHOTSPOT_BOTTOMRIGHT:
				    this.setHotSpot(this.cImage.width, this.cImage.height);
					break;
				case CRunkcpica.ACT_FLIPH:
					break;
				case CRunkcpica.ACT_FLIPV:
					break;
				case CRunkcpica.ACT_LINKDIR:
				    this.dwImageFlags |= CRunkcpica.PICTURE_LINKDIR;
					break;
				case CRunkcpica.ACT_UNLINKDIR:
				    this.dwImageFlags &= ~CRunkcpica.PICTURE_LINKDIR;
				    break;
				case CRunkcpica.ACT_LOOKAT:
					this.actLookAt(act);
					break;
				case CRunkcpica.ACT_SETOFFSETX:
					this.offsetX = act.getParamExpression(this.rh, 0);
					break;
				case CRunkcpica.ACT_SETOFFSETY:
					this.offsetY = act.getParamExpression(this.rh, 1);
					break;
			    case CRunkcpica.ACT_SETRESIZE_FAST:
			        this.dwImageFlags &= ~CRunkcpica.PICTURE_RESAMPLE;
			        break;
				case CRunkcpica.ACT_SETRESIZE_RESAMPLE:
				    this.dwImageFlags |= CRunkcpica.PICTURE_RESAMPLE;
				    break;
				case CRunkcpica.ACT_SETWRAPMODE_ON:
					break;
				case CRunkcpica.ACT_SETWRAPMODE_OFF:
					break;
				case CRunkcpica.ACT_ADDBACKDROP:
					break;
			    case CRunkcpica.ACT_SETAUTORESIZE_ON:
			        this.dwImageFlags |= CRunkcpica.PICTURE_RESIZE;
			        this.dwScreenWidth = this.dwEditorWidth;
			        this.dwScreenHeight = this.dwEditorHeight;
			        this.ho.hoImgWidth = this.dwScreenWidth;
			        this.ho.hoImgHeight = this.dwScreenHeight;
				    this.onChange();
					break;
				case CRunkcpica.ACT_SETAUTORESIZE_OFF:
				    this.dwImageFlags &= ~CRunkcpica.PICTURE_RESIZE;
				    if ( this.cImage.width != 0 )
				    {
				        this.dwScreenWidth = this.cImage.width;
				        this.dwScreenHeight = this.cImage.height;
				    }
				    else
				    {
				        this.dwScreenWidth = this.dwEditorWidth;
				        this.dwScreenHeight = this.dwEditorHeight;
				    }
				    this.ho.hoImgWidth = this.dwScreenWidth;
				    this.ho.hoImgHeight = this.dwScreenHeight;
				    this.onChange();
				    break;
				case CRunkcpica.ACT_ZOOMPERCENT:
					var percent = act.getParamExpression(this.rh, 0);
					this.dwScreenWidth = this.cImage.width * percent;
					this.dwScreenHeight = this.cImage.height * percent;
					this.onChange();
					break;
				case CRunkcpica.ACT_ZOOMWIDTH:
				    this.dwScreenWidth = act.getParamExpression(this.rh, 0);
				    if ( this.cImage.width != 0 )
				        this.dwScreenHeight = (this.cImage.height * this.dwScreenWidth) / this.cImage.width;
					this.onChange();
					break;
				case CRunkcpica.ACT_ZOOMHEIGHT:
				    this.dwScreenHeight = act.getParamExpression(this.rh, 0);
				    if (this.cImage.height != 0)
				        this.dwScreenWidth = (this.cImage.width * this.dwScreenHeight) / this.cImage.height;
					this.onChange();
					break;
				case CRunkcpica.ACT_ZOOMRECT:
				    var w = act.getParamExpression(this.rh, 0);
				    var h = act.getParamExpression(this.rh, 1);
				    var bResizeEvenIfSmaller = act.getParamExpression(this.rh, 2);
				    var iw = this.cImage.width;
				    var ih = this.cImage.height;
				    var nw = 0;
				    var nh = 0;
				    if ( w != 0 && h != 0 )
				    {
				        if ( bResizeEvenIfSmaller || iw > w || ih > h )
				        {
				            if ( iw/w > ih/h )
				            {
				                nw = w;
				                if ( iw != 0 )
				                    nh = Math.round((ih * w) / iw);
				            }
				            else
				            {
				                nh = h;
				                if ( ih != 0 )
				                    nw = Math.round((iw * h) / ih);
				            }
				        }
				        else
				        {
				            nw = iw;
				            nh = ih;
				        }
				    }
				    this.dwScreenWidth = nw;
				    this.dwScreenHeight = nh;
				    this.onChange();
					break;
			}
		},

		updateImgSpot: function () {

		    var xs = this.cImage.xSpot;
		    var ys = this.cImage.ySpot;

            // Scaling
		    if (this.dwScreenWidth != this.cImage.width && this.cImage.width != 0)
		        xs = ((xs * this.dwScreenWidth) / this.cImage.width);
		    if (this.dwScreenHeight != this.cImage.height && this.cImage.height != 0)
		        ys = ((ys * this.dwScreenHeight) / this.cImage.height);

            // Rotation
		    if (this.fAngle != 0) {
		        var cosa;
		        var sina;
		        if (this.fAngle == 90) {
		            cosa = 0.0;
		            sina = 1.0;
		        }
		        else if (this.fAngle == 270) {
		            cosa = 0.0;
		            sina = -1.0;
		        }
		        else {
		            cosa = Math.cos(this.fAngle * Math.PI / 180);
		            sina = Math.sin(this.fAngle * Math.PI / 180);
		        }

		        // Rotation / center
		        var xaxis = this.dwScreenWidth / 2;
		        var yaxis = this.dwScreenHeight / 2;

		        var x2 = ((xs - xaxis) * cosa + (ys - yaxis) * sina);
		        var y2 = ((ys - yaxis) * cosa - (xs - xaxis) * sina);

		        // Translation
		        xs = x2 + this.ho.hoImgWidth / 2;
		        ys = y2 + this.ho.hoImgHeight / 2;
		    }

		    this.ho.hoImgXSpot = Math.round(xs);
		    this.ho.hoImgYSpot = Math.round(ys);
		},

		setHotSpot: function (xs, ys)
		{
		    if (this.cImage.xSpot != xs || this.cImage.ySpot != ys) {
		        this.ho.hoX -= this.ho.hoImgXSpot;
		        this.ho.hoY -= this.ho.hoImgYSpot;
		        this.cImage.xSpot = xs;
		        this.cImage.ySpot = ys;
		        this.updateImgSpot();
		        this.ho.hoX += this.ho.hoImgXSpot;
		        this.ho.hoY += this.ho.hoImgYSpot;
		    }
		},

		rotateRect: function (fAngle)
		{
		    var x, y;
		    var cosa, sina;

		    if (fAngle == 90.0)
		    {
		        cosa = 0.0;
		        sina = 1.0;
		    }
		    else if (fAngle == 180.0)
		    {
		        cosa = -1.0;
		        sina = 0.0;
		    }
		    else if (fAngle == 270.0)
		    {
		        cosa = 0.0;
		        sina = -1.0;
		    }
		    else
		    {
		        var arad = fAngle * Math.PI / 180.0;
		        cosa = Math.cos(arad);
		        sina = Math.sin(arad);
		    }

		    var nhxcos;
		    var nhxsin;
		    var nhycos;
		    var nhysin;
		    nhxcos = nhxsin = nhycos = nhysin = 0.0;
		    CMask.topLeft.x = CMask.topLeft.y = 0;

		    x = this.ho.hoImgWidth;
		    nhxcos = x * cosa;
		    nhxsin = x * sina;
		    CMask.topRight.x = Math.floor(nhxcos + nhysin);
		    CMask.topRight.y = Math.floor(nhycos - nhxsin);

		    y = this.ho.hoImgHeight;
		    nhycos = y * cosa;
		    nhysin = y * sina;
		    CMask.bottomRight.x = Math.floor(nhxcos + nhysin);
		    CMask.bottomRight.y = Math.floor(nhycos - nhxsin);

		    CMask.bottomLeft.x = CMask.topLeft.x + CMask.bottomRight.x - CMask.topRight.x;
		    CMask.bottomLeft.y = CMask.topLeft.y + CMask.bottomRight.y - CMask.topRight.y;

		    var xmin = Math.min(CMask.topLeft.x, Math.min(CMask.topRight.x, Math.min(CMask.bottomRight.x, CMask.bottomLeft.x)));
		    var ymin = Math.min(CMask.topLeft.y, Math.min(CMask.topRight.y, Math.min(CMask.bottomRight.y, CMask.bottomLeft.y)));
		    var xmax = Math.max(CMask.topLeft.x, Math.max(CMask.topRight.x, Math.max(CMask.bottomRight.x, CMask.bottomLeft.x)));
		    var ymax = Math.max(CMask.topLeft.y, Math.max(CMask.topRight.y, Math.max(CMask.bottomRight.y, CMask.bottomLeft.y)));

		    this.ho.hoImgWidth = Math.round(xmax - xmin);
		    this.ho.hoImgHeight = Math.round(ymax - ymin);
		},


		onChange: function ()
		{
		    this.ho.hoImgWidth = this.dwScreenWidth;
		    this.ho.hoImgHeight = this.dwScreenHeight;
		    if ( this.fAngle != 0.0 )
		        this.rotateRect(this.fAngle);
		    this.updateImgSpot();
		},

		actLoadPicture: function (act)
		{
		    this.imageName = CServices.subtractFilename(act.getParamFilename(this.rh, 0), this.rh.rhApp.appEditorFilename);
			this.image = new Image();
			var that = this;
			this.bImageLoaded = false;
			this.cImage = new CImage();
			this.image.onload = function ()
			{
				that.bImageLoaded = true;
				if (!(that.dwImageFlags & CRunkcpica.PICTURE_RESIZE)) {
				    that.ho.hoImgWidth = that.image.width;
				    that.ho.hoImgHeight = that.image.height;
				    that.dwScreenWidth = that.image.width;
				    that.dwScreenHeight = that.image.height;
				}
				that.cImage.width = that.image.width;
				that.cImage.height = that.image.height;
				that.cImage.img = this;
				that.onChange();
			}
			this.image.src = this.imageName;
			this.szImageName = window.location.href + "/" + this.imageName.replace("\\","/");
		},

		actLookAt: function (act)
		{
			var tgtx = act.getParamExpression(this.rh, 0);
			var tgty = act.getParamExpression(this.rh, 1);

			var srcx = this.ho.hoX - this.ho.hoImgXSpot + this.ho.hoImgWidth / 2;
			var srcy = this.ho.hoY - this.ho.hoImgYSpot + this.ho.hoImgHeight / 2;

			var angle;
			if (srcx == tgtx)
			{
				if (tgty < srcy)
					angle = 90;
				else
					angle = 270;
			}
			else
			{
				angle = (Math.atan2(Math.abs(tgty - srcy), Math.abs(tgtx - srcx)) * 180 / 3.141592653589);

				// Trouver le bon cadran
				if (tgtx > srcx)
				{
					if (tgty > srcy)
						angle = 360 - angle;
				}
				else
				{
					if (tgty > srcy)
						angle = 180 + angle;
					else
						angle = 180 - angle;
				}
			}
			if (this.fAngle != angle) {
			    this.fAngle = angle;
			    this.onChange();
			}
		},

		expression: function(num)
		{
			switch(num)
			{
				case CRunkcpica.EXP_GETPICTURENAME:
					return this.szImageName;
				case CRunkcpica.EXP_GETPICTUREXSIZE:
					return this.cImage.width;
				case CRunkcpica.EXP_GETPICTUREYSIZE:
					return this.cImage.height;
				case CRunkcpica.EXP_GETRESIZEDXSIZE:
				    return this.dwScreenWidth;
				case CRunkcpica.EXP_GETRESIZEDYSIZE:
				    return this.dwScreenHeight;
				case CRunkcpica.EXP_GETDISPLAYXSIZE:
				    return this.ho.hoImgWidth;
				case CRunkcpica.EXP_GETDISPLAYYSIZE:
				    return this.ho.hoImgHeight;
				case CRunkcpica.EXP_GETHOTSPOTX:
					return this.cImage.xSpot;
				case CRunkcpica.EXP_GETHOTSPOTY:
					return this.cImage.ySpot;
				case CRunkcpica.EXP_GETANGLE:
					return this.fAngle;
				case CRunkcpica.EXP_GETSEMITRANSPRATIO:
					var alpha = 1.0;
					if ((this.ho.ros.rsEffect & CRSpr.BOP_RGBAFILTER) != 0)
						alpha = (((this.ho.ros.rsEffectParam >>> 24) & 0xFF) / 255.0);
					else if ((this.ho.ros.rsEffect & CRSpr.BOP_MASK ) == CRSpr.BOP_BLEND)
						return Math.round((this.ho.ros.rsEffectParam * 100) / 128);
					return Math.round( (1 - alpha) * 255 );
				case CRunkcpica.EXP_GETOFFSETX:
					return this.nOffsetX;
				case CRunkcpica.EXP_GETOFFSETY:
					return this.nOffsetY;
				case CRunkcpica.EXP_GETZOOMFACTORX:
				    if (this.cImage.width == 0)
						return 0;
					return (this.dwScreenWidth * 100) / this.cImage.width;
				case CRunkcpica.EXP_GETZOOMFACTORY:
				    if (this.cImage.height == 0)
						return 0;
				    return (this.dwScreenHeight * 100) / this.cImage.height;
			}
		}
	});


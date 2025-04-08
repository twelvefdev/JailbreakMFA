//----------------------------------------------------------------------------------
//
// CRunfglobject : implementation of the fgl advertisement library
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
CRunfglobject.CND_ISPREMIUM = 0;
CRunfglobject.CND_CROSSPROMOTION = 1;
CRunfglobject.CND_UNLOCKENABLED = 2;
CRunfglobject.CND_BRANDINGENABLED = 3;
CRunfglobject.CND_LAST = 4;
CRunfglobject.ACT_SHOWADVERT = 0;
CRunfglobject.ACT_SHOWMOREGAMES = 1;
CRunfglobject.ACT_UNLOCK = 2;
CRunfglobject.ACT_HANDLEBRANDINGCLICK = 3;
CRunfglobject.ACT_SUBMITSCORE = 4;
CRunfglobject.ACT_DISPLAYLEADERBOARD = 5;
CRunfglobject.ACT_DISPLAYSPONSOR = 6;
CRunfglobject.ACT_LAST = 7;
CRunfglobject.EXP_GETBRANDINGLOGO = 0;
CRunfglobject.EXP_LAST = 1;
CRunfglobject.FLAG_PREMIUM = 0x0001;
CRunfglobject.FLAG_UNLOCK = 0x0002;
CRunfglobject.FLAG_CROSSPROMOTION = 0x0004;
CRunfglobject.FLAG_BRANDING = 0x0008;
CRunfglobject.FLAG_SHOWLOGO = 0x0010;
CRunfglobject.LOGO_WIDTH = 250;
CRunfglobject.LOGO_HEIGHT = 100;

function CRunfglobject()
{
	this.sponsorLoaded = false;
	this.sponsorLoad = false;
	this.premium = false;
}

CRunfglobject.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return CRunfglobject.CND_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			this.flags = file.readAInt();

			this.sponsorLoaded = false;
			this.sponsorLoad = false;
			this.sponsorVisible = false;
			if (window["fgl"]["brandingEnabled"])
			{
				if (!this.rh.rhApp.fglBrandingLogo)
				{
					this.rh.rhApp.fglBrandingLogo = window["fgl"]["getBrandingLogo"]();
					this.sponsorLoad = true;
				}
			}
			if (!this.rh.rhApp.fglSponsor)
			{
				this.rh.rhApp.fglSponsor = new Image();
			}
			else
			{
				if (this.rh.rhApp.fglSponsor.width != 0 && this.rh.rhApp.fglSponsor.height != 0)
					this.sponsorLoaded = true;
			}
			if (this.flags & CRunfglobject.FLAG_SHOWLOGO)
			{
				this.sponsorVisible = true;
			}
			this.premium = window["fgl"]["isPremium"]();
			return true;
		},

		handleRunObject: function ()
		{
			this.premium = window["fgl"]["isPremium"]();
			if (this.sponsorLoad && window["fgl"]["brandingEnabled"])
			{
				this.sponsorLoad = false;

				var brandingLogo = window["fgl"]["getBrandingLogo"]();
				if (brandingLogo != this.rh.rhApp.fglBrandingLogo)
				{
					this.rh.rhApp.fglBrandingLogo = brandingLogo;
					this.sponsorLoaded = false;
				}

				if (!this.sponsorLoaded)
				{
					var that = this;
					this.rh.rhApp.fglSponsor.onload = function ()
					{
						that.sponsorLoaded = true;
					}
					this.rh.rhApp.fglSponsor.onerror = function ()
					{
						that.sponsorLoaded = false;
					}
					this.rh.rhApp.fglSponsor.src = this.rh.rhApp.fglBrandingLogo;
				}
			}
			if (this.sponsorVisible && this.sponsorLoaded)
			{
				if (this.rh.rhApp.keyBuffer[CRunApp.VK_LBUTTON])
				{
					if (this.mouseDown == false)
					{
						this.mouseDown = true;
						if (this.sponsorRc)
						{
						    if (this.sponsorRc.ptInRect(this.rh.rhApp.mouseX - this.rh.rhApp.xOffset, this.rh.rhApp.mouseY - this.rh.rhApp.yOffset))
							{
								this.rh.rhApp.resetKeyBuffer();
								window["fgl"]["handleBrandingClick"]();
							}
						}
					}
				}
				else
				{
					this.mouseDown = false;
				}
				return CRunExtension.REFLAG_DISPLAY;
			}
			return 0;
		},

		displayRunObject: function (context, xDraw, yDraw)
		{
			if (this.sponsorLoaded && this.sponsorVisible)
			{
				if (!this.sponsorRc)
					this.sponsorRc = new CRect();
				this.sponsorRc.left = xDraw + this.ho.hoX - this.rh.rhWindowX + this.ho.pLayer.x;
				this.sponsorRc.top = yDraw + this.ho.hoY - this.rh.rhWindowY + this.ho.pLayer.y;
				this.sponsorRc.right = this.sponsorRc.left + this.rh.rhApp.fglSponsor.width;
				this.sponsorRc.bottom = this.sponsorRc.top + this.rh.rhApp.fglSponsor.height;
				context.renderSimpleImage(this.rh.rhApp.fglSponsor, this.sponsorRc.left, this.sponsorRc.top, this.rh.rhApp.fglSponsor.width, this.rh.rhApp.fglSponsor.height, 0, 0);
			}
		},

		getZoneInfos: function ()
		{
			this.ho.hoImgWidth = 0;
			this.ho.hoImgHeight = 0;
			if (this.display == CRunfglobject.DISPLAY_SPONSOR)
			{
				if (this.sponsorLoaded && this.sponsorVisible)
				{
					this.ho.hoImgWidth = this.rh.rhApp.fglSponsor.width;
					this.ho.hoImgHeight = this.rh.rhApp.fglSponsor.height;
				}
			}
		},

		condition: function (num, cnd)
		{
			switch (num)
			{
				case CRunfglobject.CND_ISPREMIUM:
					return window["fgl"]["isPremium"]();
				case CRunfglobject.CND_CROSSPROMOTION:
					return window["fgl"]["crossPromotionEnabled"];
				case CRunfglobject.CND_UNLOCKENABLED:
					return window["fgl"]["unlockEnabled"];
				case CRunfglobject.CND_BRANDINGENABLED:
					return window["fgl"]["brandingEnabled"];
			}
			return false;
		},

		action:     function (num, act)
		{
			switch (num)
			{
				case CRunfglobject.ACT_SHOWADVERT:
					this.rh.rhApp.resetKeyBuffer();
					window["fgl"]["showAd"]()
					break;
				case CRunfglobject.ACT_SHOWMOREGAMES:
					if (window["fgl"]["crossPromotionEnabled"])
					{
						this.rh.rhApp.resetKeyBuffer();
						window["fgl"]["showMoreGames"]();
					}
					break;
				case CRunfglobject.ACT_UNLOCK:
					if (window["fgl"]["unlockEnabled"])
					{
						this.rh.rhApp.resetKeyBuffer();
						var that = this;
						window["fgl"]["inApp"]["initiateUnlockFunction"](function ()
						{
							that.premium = true;
						}, function ()
						{
							that.premium = false;
						});
					}
					break;
				case CRunfglobject.ACT_HANDLEBRANDINGCLICK:
					if (window["fgl"]["brandingEnabled"])
					{
						this.rh.rhApp.resetKeyBuffer();
						window["fgl"]["handleBrandingClick"]()
					}
					break;
				case CRunfglobject.ACT_SUBMITSCORE:
					var score = act.getParamExpression(this.rh, 0);
					this.rh.rhApp.resetKeyBuffer();
					window["fgl"]["submitScore"](score);
					;
					break;
				case CRunfglobject.ACT_DISPLAYLEADERBOARD:
					this.rh.rhApp.resetKeyBuffer();
					window["fgl"]["displayScoreboard"]();
					break;
				case CRunfglobject.ACT_DISPLAYSPONSOR:
					if (act.getParamExpression(this.rh, 0))
						this.sponsorVisible = true;
					else
						this.sponsorVisible = false;
					break;
			}
		},
		expression: function (num)
		{
			switch (num)
			{
				case CRunfglobject.EXP_GETBRANDINGLOGO:
					if (window["fgl"]["brandingEnabled"])
					{
						return this.rh.rhApp.fglBrandingLogo;
					}
					return "";
			}
		}
	});




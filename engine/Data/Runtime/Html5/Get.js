/* Get object (James) */
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
// Removed user-agent, charset and Content-length, declared unsafe in new Chrome browser, 12/05/2016

CRunGet.GETCP_FROMWEBPAGE = 0x0000;
CRunGet.GETCP_FROMAPP     = 0x0001;
CRunGet.GETCP_UTF8        = 0x0002;
CRunGet.GETFLAG_MASK = 0x0003;

this.Get = CRunGet;

function CRunGet()
{
	this.postData = {};
	this.response = '';
	this.respStatus = 0;
	this.pending = false;

	this.useragent = '';
	this.headers = '';
	this.user = '';
	this.password = '';
	this.timeout = 0;
	this.flag = -1;
	this.completeEvent = -1;
	this.charset = '';
}

CRunGet.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return 3;
		},

		createRunObject: function (file, cob, version)
		{
			try {
				this.flag = file.readAInt();
			}
			catch (err) {
				this.flag = 0;
			}

		},

		allowCrossDomain: function(request, url) {
			request.setRequestHeader("Access-Control-Allow-Origin", "*");
			request.setRequestHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
			request.setRequestHeader("Access-Control-Allow-Credentials", "true");
			request.setRequestHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,ORIGIN");
			request.setRequestHeader("Access-Control-Max-Age", "846000");
		},
		
		action: function (num, act)
		{
			switch (num)
			{
				case 0: /* Request URL */

					if (this.pending)
						return;

					var url = act.getParamExpString(this.rh, 0);
					request = new XMLHttpRequest();

					var that = this;

					var data = '';

					for (var key in this.postData)
					{
						if (data.length)
							data += '&';

						data += key + '=' + encodeURI(this.postData[key]);
					}

					this.postData = {};

					if (data.length)
					{
						if ("withCredentials" in request) {
							// request for Chrome/Firefox/Opera/Safari.
							request.open("POST", url, true);
						} else if (typeof XDomainRequest != "undefined") {
							// XDomainRequest for IE.
							request = new XDomainRequest();
							request.open("POST", url);
						} else {
							// CORS not supported.
							alert('CORS not supported');
							break;
						}
						// this must be filled according your setting in server
						this.fillheaders(request);
						//this.allowCrossDomain(request);
						
						request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

						request.onreadystatechange = function ()
						{
							/*
							0: request not initialized 
							1: server connection established
							2: request received 
							3: processing request 
							4: request finished and response is ready 
							*/

							if (request.readyState == 4) {

								that.pending = false;
								that.respStatus = request.status != 0 ? request.status : 522;	// No server connection
								that.response = request.status !== 200 ? '' : request.responseText;

								that.completeEvent = that.ho.getEventCount();
								if (request.status !== 408 && that.respStatus !== 522 ) {
									that.ho.generateEvent(0, 0);
								}
								else {
									that.ho.pushEvent(2, 0);
								}
							}
						}

						request.ontimeout = function () {
							that.respStatus = 408;
							that.completeEvent = that.ho.getEventCount();
							that.ho.generateEvent(2,  0);
						}

						request.onerror = function () {
							that.response = '';
							that.respStatus = request.status != 0 ? request.status : 522;
							that.completeEvent = that.ho.getEventCount();
							if(that.respStatus !== 522 && that.respStatus !== 408)
								that.ho.pushEvent(2,  0);
						}
					
						request.send(data);
					}
					else
					{
						if (url.indexOf("forceLoad") > 0)
							url += ((/\?/).test(url) ? "&" : "?") + (new Date()).getTime();

						if ("withCredentials" in request) {
							// request for Chrome/Firefox/Opera/Safari.
							request.open("GET", url, true);
						 } else if (typeof XDomainRequest != "undefined") {
							// XDomainRequest for IE.
							request = new XDomainRequest();
							request.open("GET", url);
						 } else {
							// CORS not supported.
							alert('CORS not supported');
							break;
						 }
						// this must be filled according your setting in server
						this.fillheaders(request);
						//this.allowCrossDomain(request);
						 
						request.onreadystatechange = function ()
						{
							/*
							0: request not initialized 
							1: server connection established
							2: request received 
							3: processing request 
							4: request finished and response is ready 
							*/

							if (request.readyState == 4) {

								that.pending = false;
								that.respStatus = request.status != 0 ? request.status : 522;	// No server connection
								that.response = request.status !== 200 ? '' : request.responseText;

								that.completeEvent = that.ho.getEventCount();
								if (request.status !== 408 && that.respStatus !== 522 ) {
									that.ho.generateEvent(0, 0);
								}
								else {
									that.ho.pushEvent(2, 0);
								}
							}
						}

						request.ontimeout = function () {
							that.respStatus = 408;
							that.completeEvent = that.ho.getEventCount();
							that.ho.generateEvent(2,  0);
						}

						request.onerror = function () {
							that.response = '';
							that.respStatus = request.status != 0 ? request.status : 522;
							that.completeEvent = that.ho.getEventCount();
							if(that.respStatus !== 522 && that.respStatus !== 408)
								that.ho.pushEvent(2,  0);
						}

						
					
						request.send(null);
					}

					this.pending = true;

					break;

				case 1: /* Add POST data */

					var key = act.getParamExpString(this.rh, 0),
						value = act.getParamExpString(this.rh, 1);

					this.postData[key] = value;

					break;
			    case 2: /* Add Custom Header */

			        this.headers = act.getParamExpString(this.rh, 0);

			        break;
			    case 3: /* Set User */

			        this.user = act.getParamExpString(this.rh, 0);

			        break;
			    case 4: /* Set Password */

			        this.password = act.getParamExpString(this.rh, 0);

			        break;
			    case 5: /* Set Timeout */

			        this.timeout = act.getParamExpression(this.rh, 0);

			        break;
			    case 6: /* Set User-Agent */

			        this.useragent = act.getParamExpString(this.rh, 0);

			        break;
			}
			;
		},

		condition: function (num, cnd)
		{
			switch (num)
			{
				case 0: /* On request complete */

					return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 ||
						(this.ho.getEventCount() == this.completeEvent);

				case 1: /* Request pending? */

				    return this.pending;

			    case 2: /* On request timeout */

			        return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 ||
						(this.ho.getEventCount() == this.completeEvent);
			}
			;

			return false;
		},

		expression: function (num)
		{
			switch (num)
			{
				case 0: /* Response$ */
					return this.response;

				case 1: /* URLEncode$ */
				    return encodeURI('' + this.ho.getExpParam());

			    case 2: /* ResponseStatus$ */
			        return this.respStatus;
			}
			;
		},

		fillheaders: function (request) {

		    if (this.headers) {
		        var lines = this.headers.split("[\\r\\n]+");
		        for (i = 0; i < lines.length; i++) {
		            var fields = lines[i].split(":");
		            request.setRequestHeader(fields[0], fields[1]);
		        }

		    }

		    if (this.user && this.password) {
		        request.setRequestHeader("Authorization", "Basic " +this.user + ":" + this.password);
		    }

		    if (this.timeout > 0) {
		    request.timeout = this.timeout * 1000;
		    }

		    var charset = "iso-8559-1";

		    if(this.flag == CRunGet.GETCP_FROMWEBPAGE)
		    {
		        var line = request.getResponseHeader("Content-Type");
		        if (line) {
		            var fields = line.split(";");
		            if (fields && fields[0].indexOf("charset") >= 0) {
		                var field = fields[0].split("=");
		                charset = field[1];
		            }
		        }
		    }
		    else if(this.flag == CRunGet.GETCP_FROMAPP)
		    {
		        charset = ReverseCharset(this.ho.hoAdRunHeader.rhApp.codePage);
		    }
		    else if(this.flag == CRunGet.GETCP_UTF8)
		    {
		        charset = "utf-8";
		    }

	        return;
		},

		encode_utf8:function (s) {
            return unescape(encodeURIComponent(s));
        },

        decode_utf8:function (s) {
            return decodeURIComponent(escape(s));
        },

        ReverseCharSet: function (uCodePage) {
            var sCharSet;

            if (uCodePage == 28591) {
                sCharSet = "iso-8859-1";       // iso-8859-1 translation
            }
            else if (uCodePage == 28592) {
                sCharSet = "iso-8859-2";       // iso-8859-2 translation
            }
            else if (uCodePage == 28593) {
                sCharSet = "iso-8859-3";       // iso-8859-3 translation
            }
            else if (uCodePage == 28594) {
                sCharSet = "iso-8859-4";       // iso-8859-4 translation
            }
            else if (uCodePage == 28595) {
                sCharSet = "iso-8859-5";       // iso-8859-5 translation
            }
            else if (uCodePage == 28596) {
                sCharSet = "iso-8859-6";       // iso-8859-6 translation
            }
            else if (uCodePage == 28597) {
                sCharSet = "iso-8859-7";       // iso-8859-7 translation
            }
            else if (uCodePage == 28598) {
                sCharSet = "iso-8859-8";       // iso-8859-8 translation
            }
            else if (uCodePage == 1251) {
                sCharSet = "windows-1251";       // windows-1251 translation
            }
            else if (uCodePage == 1252) {
                sCharSet = "windows-1252";       // windows-1252 translation
            }
            else if (uCodePage == 1253) {
                sCharSet = "windows-1253";       // windows-1253 translation
            }
            else if (uCodePage == 1254) {
                sCharSet = "windows-1254";       // windows-1254 translation
            }
            else if (uCodePage == 1255) {
                sCharSet = "windows-1255";       // windows-1255 translation
            }
            else if (uCodePage == 20936) {
                sCharSet = "gb2312";       // gbk2312 translation
            }
            else if (uCodePage == 936) {
                sCharSet = "gbk";       // gbk translation
            }
            else if (uCodePage == 950) {
                sCharSet = "big5";       // big5 translation
            }
            else if (uCodePage == 20866) {
                sCharSet = "koi8-r";	// koi8-r translation
            }
            else if (uCodePage == 51932) {
                sCharSet = "euc-jp";       // euc-jp translation
            }
            else if (uCodePage == 51949) {
                sCharSet = "euc-kr";       // euc-kr translation
            }
            else if (uCodePage == 51936) {
                sCharSet = "euc-cn";       // euc-cn translation
            }
            else if (uCodePage == 50222) {
                sCharSet = "iso-2022-jp";       // iso-2022-jp translation
            }
            else if (uCodePage == 50225) {
                sCharSet = "iso-2022-kr";       // iso-2022-kr translation
            }
            else if (uCodePage == 65001) {
                sCharSet = "utf-8";       // UTF-8 translation
            }
            else if (uCodePage == 0) {
                sCharSet = "utf-8";       // UTF-8 translation, language neutral
            }
            else {
                sCharSet = null;       // No Page
            }
            return sCharSet;
        }
	});


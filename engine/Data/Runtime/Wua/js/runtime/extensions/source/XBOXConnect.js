/* Copyright (c) 1996-2018 Clickteam
* 
* This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
*
* Permission is hereby granted to any person obtaining a legal copy
* of Clickteam Multimedia Fusion 2 to use or modify this source code for
* debugging, optimizing, or customizing applications created with
* Clickteam Multimedia Fusion 2.
* Any other use of this source code is prohibited.
*
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

CRunXBOXConnect.CNDONERROR = 0;
CRunXBOXConnect.CNDISXBOX = 1;
CRunXBOXConnect.CNDLOGINOK = 2;
CRunXBOXConnect.CNDLOGINFAILED = 3;
CRunXBOXConnect.CNDSLOGINOK = 4;
CRunXBOXConnect.CNDSLOGINFAILED = 5;
CRunXBOXConnect.CNDISGAMEROK = 6;
CRunXBOXConnect.CNDONGAMER = 7;
CRunXBOXConnect.CND_LAST = 8;

CRunXBOXConnect.ACTDOLOGIN = 0;
CRunXBOXConnect.ACTDOSILOGIN = 1;
CRunXBOXConnect.ACTREADPROFILE = 2;

CRunXBOXConnect.EXPERROR = 0;
CRunXBOXConnect.EXPERRORSTR = 1;
CRunXBOXConnect.EXPPLAYERID = 2;
CRunXBOXConnect.EXPPLAYERNAME = 3;
CRunXBOXConnect.EXPPLAYERSCORE = 4;
CRunXBOXConnect.EXPPLAYERIMAGE = 5;


// </editor-fold>

function CRunXBOXConnect() {
    //call chain
    CRunExtension.call(this);

    this.m_xblContext = null;
    this.nError = 0,
    this.szError = null,
    this.isXBOX = false;

    this.XBOXGamer = {
        isAutheticated: false,
        playerId: null,
        playerName: null,
        playerScore: 0,
        playerImage: null
    };
}


CRunXBOXConnect.prototype = {
        // methods
        getNumberOfConditions: function () {
            return CRunXBOXConnect.CND_LAST;
        },
        createRunObject: function (file, cob, version) {

            if (/Xbox One/.test(navigator.userAgent)) {
                this.isXBOX = true;
            }
            else {
                this.isXBOX = false;
            }
            this.nError = 0;
            this.szError = "";
            return true;
        },

        handleRunObject: function () {
            return 0;
        },

        // Conditions
        // -------------------------------------------------
        condition: function (num, cnd) {
            switch (num) {
                case CRunXBOXConnect.CNDONERROR:
                    return this.cndOnError(cnd);
                case CRunXBOXConnect.CNDISXBOX:
                    return this.cndIsxbox(cnd);
                case CRunXBOXConnect.CNDLOGINOK:
                    return this.cndLoginOK(cnd);
                case CRunXBOXConnect.CNDLOGINFAILED:
                    return this.cndLoginFailed(cnd);
                case CRunXBOXConnect.CNDSLOGINOK:
                    return this.cndSLoginOK(cnd);
                case CRunXBOXConnect.CNDSLOGINFAILED:
                    return this.cndSLoginFailed(cnd);
                case CRunXBOXConnect.CNDISGAMEROK:
                    return this.cndIsGamerOK(cnd);
                case CRunXBOXConnect.CNDONGAMER:
                    return this.cndOnGamer(cnd);            }
            return false;
        },

        // Actions
        // -------------------------------------------------
        action: function (num, act) {
            switch (num) {
                case CRunXBOXConnect.ACTDOLOGIN:
                    this.actDoLogin(act);
                    break;
                case CRunXBOXConnect.ACTDOSILOGIN:
                    this.actDoSiLogin(act);
                    break;
                case CRunXBOXConnect.ACTREADPROFILE:
                    this.actReadProfile(act);
                    break;
            }
        },

        // Expressions
        // -------------------------------------------------
        expression: function (num) {
            switch (num) {
                case CRunXBOXConnect.EXPERROR:
                    return this.expError();
                case CRunXBOXConnect.EXPERRORSTR:
                    return this.expErrorStr();
                case CRunXBOXConnect.EXPPLAYERID:
                    return this.expPlayerID();
                case CRunXBOXConnect.EXPPLAYERNAME:
                    return this.expPlayerName();
                case CRunXBOXConnect.EXPPLAYERSCORE:
                    return this.expPlayerScore();
                case CRunXBOXConnect.EXPPLAYERIMAGE:
                    return this.expPlayerImage();
            }
            return 0;
        },

        // Conditions
        // -------------------------------------------------
        cndOnError: function (cnd) {
            return true;
        },

        cndIsxbox: function (cnd) {
            return this.isXBOX;
        },

        cndLoginOK: function (cnd) {
            return true;
        },

        cndLoginFailed: function (cnd) {
            return true;
        },

        cndSLoginOK: function (cnd) {
            return true;
        },

        cndSLoginFailed: function (cnd) {
            return true;
        },

        cndIsGamerOK: function (cnd) {
            return this.XBOXGamer.isAutheticated;
        },

        cndOnGamer: function (cnd) {
            return true;
        },

        // Actions
        // -------------------------------------------------
        actDoLogin: function (act) {

            var that = this;

            try {
                m_user.signInAsync(null)
                     .then(function (e) {
                        that.nError = 0;
                        that.szError = "";
                        if (e.status === Microsoft.Xbox.Services.System.SignInStatus.success) {
                            that.m_xblContext = new Microsoft.Xbox.Services.XboxLiveContext(m_user);
                             that.XBOXGamer.isAutheticated = true;
                            that.ho.pushEvent(CRunXBOXConnect.CNDLOGINOK, 0);
                        }
                        else if (e.status === Microsoft.Xbox.Services.System.SignInStatus.userCancel) {
                            that.nError = 1005;      // user Cancel
                            that.szError = "User cancel";
                            that.ho.pushEvent(CRunXBOXConnect.CNDLOGINFAILED, 0);
                            that.XBOXGamer.isAutheticated = false;
                        }
                     }, function (err) {
                        that.nError = 1006;      // Signin Failed
                        that.szError = err;
                        that.ho.pushEvent(CRunXBOXConnect.CNDONERROR, 0);
                        that.XBOXGamer.isAutheticated = false;
                   });
            } catch (err) {
                that.nError = 1006;      // Signin Failed
                that.szError = err;
                that.ho.pushEvent(CRunXBOXConnect.CNDONERROR, 0);
                that.XBOXGamer.isAutheticated = false;
            }

        },

        actDoSiLogin: function (act) {

            var that = this;

            try {
                m_user.signInSilentlyAsync(null)
                    .then(function (e) {
                        that.nError = 0;
                        that.szError = "";
                        if (e.status === Microsoft.Xbox.Services.System.SignInStatus.success) {
                            that.m_xblContext = new Microsoft.Xbox.Services.XboxLiveContext(m_user);
                             that.XBOXGamer.isAutheticated = true;
                            that.ho.pushEvent(CRunXBOXConnect.CNDSLOGINOK, 0);
                        }
                        else if (e.status === Microsoft.Xbox.Services.System.SignInStatus.userCancel) {
                            that.nError = 1005;      // user Cancel
                            that.szError = "User Cancel";
                            that.ho.generateEvent(CRunXBOXConnect.CNDSLOGINFAILED, 0);
                            that.XBOXGamer.isAutheticated = false;
                        }
                   }, function (err) {
                        that.nError = 1006;      // Signin Failed
                        that.szError = err;
                        that.ho.pushEvent(CRunXBOXConnect.CNDONERROR, 0);
                        that.XBOXGamer.isAutheticated = false;
                    });
            } catch (err) {
                that.nError = 1006;      // Signin Failed
                that.szError = err;
                that.ho.pushEvent(CRunXBOXConnect.CNDONERROR, 0);
            }
         },

        actReadProfile: function (act) {
            var that = this;

            try {
                if (typeof xbox !== "undefined" && typeof m_user !== "undefined" && m_user.isSignedIn) {
                    that.nError = 0;
                    that.szError = "";
                    if (!that.m_xblContext) {
                        that.m_xblContext = new xbox.XboxLiveContext(m_user);
                     }
                    try {
                        that.m_xblContext.profileService.getUserProfileAsync(m_user.xboxUserId)
                            .then(function (profile) {
                                 that.XBOXGamer = {
                                    playerId: m_user.xboxUserId,
                                    playerName: m_user.gamertag,
                                    playerScore: m_user.gamerscore,
                                    playerImage: profile.gameDisplayPictureResizeUri.rawUri
                                };
                                that.ho.pushEvent(CRunXBOXConnect.CNDONGAMER, 0);
                       });
                    }
                    catch (err) {
                        that.nError = 1009;      // Error reading profile
                        that.szError = err;
                        that.ho.pushEvent(CRunXBOXConnect.CNDONERROR, 0);
                    }
                }
                else {
                    that.nError = 1010;      // Error gamer is not signin
                    that.szError = "Gamer is not signin";
                    that.ho.pushEvent(CRunXBOXConnect.CNDONERROR, 0);

                }

            }
            catch (err) {
                that.nError = 1010;      // Error gamer is not signin
                that.szError = err;
                that.ho.pushEvent(CRunXBOXConnect.CNDONERROR, 0);
            }
        },

        // Expressions
        // -------------------------------------------------
        expError: function () {
            return this.nError;
        },

        expErrorStr: function () {
            return this.szError;
        },

        expPlayerID: function () {
            if (this.XBOXGamer.playerId !== null)
                return this.XBOXGamer.playerId;

            return "";
        },

        expPlayerName: function () {
            if (this.XBOXGamer.playerName !== null)
                return this.XBOXGamer.playerName;

            return "";
        },

        expPlayerScore: function () {
            return this.XBOXGamer.playerScore;
        },

        expPlayerImage: function () {
            if (this.XBOXGamer.playerImage !== null)
                return this.XBOXGamer.playerImage;

            return "";
        }

    };

//setup inheritance using extend
CServices.extend(CRunExtension, CRunXBOXConnect);
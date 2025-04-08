//----------------------------------------------------------------------------------
//
// CRUNKCWCTRL Objet Window Control
//
//----------------------------------------------------------------------------------
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
CRunkcwctrl.CND_ISICONIC = 0;
CRunkcwctrl.CND_ISMAXIMIZED = 1;
CRunkcwctrl.CND_ISVISIBLE = 2;
CRunkcwctrl.CND_ISAPPACTIVE = 3;
CRunkcwctrl.CND_HASFOCUS = 4;
CRunkcwctrl.CND_ISATTACHEDTODESKTOP = 5;
CRunkcwctrl.CND_LAST = 6;

CRunkcwctrl.ACT_SETXPOSITION = 0;
CRunkcwctrl.ACT_SETYPOSITION = 1;
CRunkcwctrl.ACT_SETPOSITION = 2;
CRunkcwctrl.ACT_SETXSIZE = 3;
CRunkcwctrl.ACT_SETYSIZE = 4;
CRunkcwctrl.ACT_BRINGTOTOP = 5;
CRunkcwctrl.ACT_BRINGTOBOTTOM = 6;
CRunkcwctrl.ACT_TOPMOST = 7;
CRunkcwctrl.ACT_NONTOPMOST = 8;
CRunkcwctrl.ACT_SHOW = 9;
CRunkcwctrl.ACT_HIDE = 10;
CRunkcwctrl.ACT_SETICONIC = 11;
CRunkcwctrl.ACT_SETMAXIMIZED = 12;
CRunkcwctrl.ACT_SETNORMAL = 13;
CRunkcwctrl.ACT_EXITWINDOWS = 14;
CRunkcwctrl.ACT_RESTARTWINDOWS = 15;
CRunkcwctrl.ACT_REBOOTSYSTEM = 16;
CRunkcwctrl.ACT_MOVE = 17;
CRunkcwctrl.ACT_SETTITLE = 18;
CRunkcwctrl.ACT_SAVEFOCUS = 19;
CRunkcwctrl.ACT_RESTOREFOCUS = 20;
CRunkcwctrl.ACT_SETFOCUS = 21;
CRunkcwctrl.ACT_FLASH = 22;
CRunkcwctrl.ACT_SETBACKCOLOR = 23;
CRunkcwctrl.ACT_ATTACHTODESKTOP = 24;
CRunkcwctrl.ACT_DETACHFROMDESKTOP = 25;
CRunkcwctrl.ACT_SETXFRAME = 26;
CRunkcwctrl.ACT_SETYFRAME = 27;
CRunkcwctrl.ACT_SETWFRAME = 28;
CRunkcwctrl.ACT_SETHFRAME = 29;
CRunkcwctrl.ACT_LAST = 30;

CRunkcwctrl.EXP_GETXPOSITION = 0;
CRunkcwctrl.EXP_GETYPOSITION = 1;
CRunkcwctrl.EXP_GETXSIZE = 2;
CRunkcwctrl.EXP_GETYSIZE = 3;
CRunkcwctrl.EXP_GETSCREENXSIZE = 4;
CRunkcwctrl.EXP_GETSCREENYSIZE = 5;
CRunkcwctrl.EXP_GETSCREENDEPTH = 6;
CRunkcwctrl.EXP_GETCLIENTXSIZE = 7;
CRunkcwctrl.EXP_GETCLIENTYSIZE = 8;
CRunkcwctrl.EXP_GETTITLE = 9;
CRunkcwctrl.EXP_GETBACKCOLOR = 10;
CRunkcwctrl.EXP_GETXFRAME = 11;
CRunkcwctrl.EXP_GETYFRAME = 12;
CRunkcwctrl.EXP_GETWFRAME = 13;
CRunkcwctrl.EXP_GETHFRAME = 14;

//see https://msdn.microsoft.com/en-us/library/windows/apps/windows.ui.xaml.window.activate for possible javascript versions of API

function CRunkcwctrl() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.subApp = false;
    this.popupSubApp = false;
    this.MDIChildWindow = false;
    this.changeWidth = false;
    this.changeHeight = false;
    this.changeX = false;
    this.changeY = false;
    this.attachedToDesktop = false;
}

CRunkcwctrl.prototype = {
    getNumberOfConditions: function () {
        return CRunkcwctrl.CND_LAST;
    },

    createRunObject: function (file, cob, version) {
        var rhPtr = this.ho.hoAdRunHeader;
        var app = rhPtr.rhApp;

        if (app != null) {
            if (app.parentApp != null) {
                this.subApp = true;

                /*
                if (app.odOptions & CCCA.CCAF_POPUP) {
                    this.popupSubApp = true;
                } else {
                    this.MDIChildWindow = ((WinGetFlags(rhPtr.rhIdEditWin) & WF_MDICHILD) != 0);
                }
                */
            }
        }
    },

    //fusion
    condition: function (num, cnd) {
        switch (num) {
            case CRunkcwctrl.CND_ISICONIC:
                return false;
            case CRunkcwctrl.CND_ISMAXIMIZED:
                return false;
            case CRunkcwctrl.CND_ISVISIBLE:
                return true;
            case CRunkcwctrl.CND_ISAPPACTIVE:
                return true;
            case CRunkcwctrl.CND_HASFOCUS:
                return this.rh.rhApp.bActivated;
            case CRunkcwctrl.CND_ISATTACHEDTODESKTOP:
                return false;
        }
        return false;
    },

    action: function(num, act) {
        switch (num) {
            case CRunkcwctrl.ACT_SETXPOSITION:
                return this.actionSetXPosition(act);
            case CRunkcwctrl.ACT_SETYPOSITION:
                return this.actionSetYPosition(act);
            case CRunkcwctrl.ACT_SETPOSITION:
                return this.actionSetPosition(act);
            case CRunkcwctrl.ACT_SETXSIZE:
                return this.actionSetXSize(act);
            case CRunkcwctrl.ACT_SETYSIZE:
                return this.actionSetYSize(act);
            case CRunkcwctrl.ACT_BRINGTOTOP:
                return this.actionBringToTop(act);
            case CRunkcwctrl.ACT_BRINGTOBOTTOM:
                return this.actionBringToBottom(act);
            case CRunkcwctrl.ACT_TOPMOST:
                return this.actionTopMost(act);
            case CRunkcwctrl.ACT_NONTOPMOST:
                return this.actionNonTopMost(act);
            case CRunkcwctrl.ACT_SHOW:
                return this.actionShow(act);
            case CRunkcwctrl.ACT_HIDE:
                return this.actionHide(act);
            case CRunkcwctrl.ACT_SETICONIC:
                return this.actionSetIconIC(act);
            case CRunkcwctrl.ACT_SETMAXIMIZED:
                return this.actionSetMaximized(act);
            case CRunkcwctrl.ACT_SETNORMAL:
                return this.actionSetNormal(act);
            case CRunkcwctrl.ACT_EXITWINDOWS:
                return this.actionExitWindows(act);
            case CRunkcwctrl.ACT_RESTARTWINDOWS:
                return this.actionRestartWindows(act);
            case CRunkcwctrl.ACT_REBOOTSYSTEM:
                return this.actionRebootSystem(act);
            case CRunkcwctrl.ACT_MOVE:
                return this.actionMove(act);
            case CRunkcwctrl.ACT_SETTITLE:
                return this.actionSetTitle(act);
            case CRunkcwctrl.ACT_SAVEFOCUS:
                return this.actionSaveFocus(act);
            case CRunkcwctrl.ACT_RESTOREFOCUS:
                return this.actionRestoreFocus(act);
            case CRunkcwctrl.ACT_SETFOCUS:
                return this.actionSetFocus(act);
            case CRunkcwctrl.ACT_FLASH:
                return this.actionFlash(act);
            case CRunkcwctrl.ACT_SETBACKCOLOR:
                return this.actionSetBackColor(act);
            case CRunkcwctrl.ACT_ATTACHTODESKTOP:
                return this.actionAttachToDesktop(act);
            case CRunkcwctrl.ACT_DETACHFROMDESKTOP:
                return this.actionDetachFromDesktop(act);
            case CRunkcwctrl.ACT_SETXFRAME:
                return this.actionSetXFrame(act);
            case CRunkcwctrl.ACT_SETYFRAME:
                return this.actionSetYFrame(act);
            case CRunkcwctrl.ACT_SETWFRAME:
                return this.actionSetWFrame(act);
            case CRunkcwctrl.ACT_SETHFRAME:
                return this.actionSetHFrame(act);
        }
    },

    expression: function (num) {
        switch (num) {
            case CRunkcwctrl.EXP_GETXPOSITION:
                return 0;

            case CRunkcwctrl.EXP_GETYPOSITION:
                return 0;

            case CRunkcwctrl.EXP_GETXSIZE:
                return Runtime.getWindowWidth();

            case CRunkcwctrl.EXP_GETYSIZE:
                return Runtime.getWindowHeight();

            case CRunkcwctrl.EXP_GETSCREENXSIZE:
                return this.getScreenWidth();

            case CRunkcwctrl.EXP_GETSCREENYSIZE:
                return this.getScreenHeight();

            case CRunkcwctrl.EXP_GETSCREENDEPTH:
                return Runtime.getDeviceColorDepth();

            case CRunkcwctrl.EXP_GETCLIENTXSIZE:
                return Runtime.getWindowClientWidth();

            case CRunkcwctrl.EXP_GETCLIENTYSIZE:
                return Runtime.getWindowClientHeight();

            case CRunkcwctrl.EXP_GETTITLE:
                return Runtime.getWindowTitle();

            case CRunkcwctrl.EXP_GETBACKCOLOR:
                return this.rh.rhApp.gaBorderColour;

            case CRunkcwctrl.EXP_GETXFRAME:
                return this.rh.rhApp.getContainerOverrideX();

            case CRunkcwctrl.EXP_GETYFRAME:
                return this.rh.rhApp.getContainerOverrideY();

            case CRunkcwctrl.EXP_GETWFRAME:
                return this.rh.rhApp.containerWidth;

            case CRunkcwctrl.EXP_GETHFRAME:
                return this.rh.rhApp.containerHeight;
        }
        return 0;
    },

    //internal
    _changeFrame: function (newWidth, newHeight, resizeFrame) {
        var rhPtr = this.ho.hoAdRunHeader;
        var app = rhPtr.rhApp;
        var frame = rhPtr.rhFrame;

        //skip
        if (app == null || frame == null || app.viewMode != CRunApp.DISPLAY_CENTER) {
            return;
        }

        // Get current dimensions
        var editRc;
        //GetClientRect(rhPtr.rhHEditWin, &editRc);
        var currentWidth = app.containerWidth;
        var currentHeight = app.containerHeight;

        var changeWidth = (newWidth != -1);
        var changeHeight = (newHeight != -1);

        // Limit to playfield size
        if ( changeWidth && !resizeFrame && newWidth > frame.leWidth ) {
            newWidth = frame.leWidth;
        }

        if ( changeHeight && !resizeFrame && newHeight > frame.leHeight ) {
            newHeight = frame.leHeight;
        }

        // Adjust scroll pos
        var x = rhPtr.rh3DisplayX;
        var y = rhPtr.rh3DisplayY;
        if ( changeWidth ) {
            var virtualWidth = rhPtr.rhLevelSx;
            if ( resizeFrame && frame.leWidth == frame.leVirtualRect.right ) {
                virtualWidth = newWidth;
            }

            if ( x + newWidth > virtualWidth ) {
                x = virtualWidth - newWidth;
                if ( x < 0 ) {
                    x = 0;
                    newWidth = virtualWidth;
                }
            }
        }

        if ( changeHeight ) {
            var virtualHeight = rhPtr.rhLevelSy;
            if ( resizeFrame && frame.leHeight == frame.leVirtualRect.bottom ) {
                virtualHeight = newHeight;
            }

            if ( y + newHeight > virtualHeight ) {
                y = virtualHeight - newHeight;

                if ( y < 0 ) {
                    y = 0;
                    newHeight = virtualHeight;
                }
            }
        }

        if ( newWidth == -1 ) {
            newWidth = currentWidth;
        }

        if ( newHeight == -1 ) {
            newHeight = currentHeight;
        }

        // Change ?
        changeWidth = (newWidth != currentWidth);
        changeHeight = (newHeight != currentHeight);

        if ( !changeWidth && !changeHeight ) {
            return;
        }

        // Update variables
        if ( changeWidth ) {
            frame.m_leEditWinWidth = newWidth;
            rhPtr.rh3WindowSx = newWidth;
            rhPtr.rh3DisplayX = x;

            // Change playfield width?
            if ( resizeFrame ) {
                var nOldPeWidth = frame.leWidth;
                frame.leWidth = newWidth;

                // Automatically update virtual size if identical to playfield size
                if ( nOldPeWidth == frame.leVirtualRect.right ) {
                    frame.leVirtualRect.right = rhPtr.rhLevelSx = newWidth;
                }
            }
        }

        if ( changeHeight ) {
            frame.m_leEditWinHeight = newHeight;
            rhPtr.rh3WindowSy = newHeight;
            rhPtr.rh3DisplayY = y;

            // Change playfield height?
            if ( resizeFrame ) {
                var nOldPeHeight = frame.leHeight;
                frame.leHeight = newHeight;

                // Automatically update virtual size if identical to playfield size
                if ( nOldPeHeight == frame.leVirtualRect.bottom ) {
                    frame.leVirtualRect.bottom = rhPtr.rhLevelSy = newHeight;
                }
            }
        }

        //resize window
        app.resizeApplication();

        if (this.subApp) {
            //resize sub app window
            if (changeWidth) {
                this.ho.hoImgWidth = newWidth;
                this.changeWidth = true;
            }

            if (changeHeight) {
                this.ho.hoImgHeight = newHeight;
                this.changeHeight = true;
            }
        }
    },

    //actions
    actionSetXPosition: function (act) {
    },

    actionSetYPosition: function (act) {
    },

    actionSetPosition: function (act) {
        Runtime.setWindowSize(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
    },

    actionSetXSize: function (act) {
        Runtime.setWindowSize(act.getParamExpression(this.rh, 0),Runtime.getWindowHeight());
    },

    actionSetYSize: function (act) {
        Runtime.setWindowSize(Runtime.getWindowWidth(), act.getParamExpression(this.rh, 0));
    },

    actionBringToTop: function (act) {
    },

    actionBringToBottom: function (act) {
    },

    actionTopMost: function (act) {
    },

    actionNonTopMost: function (act) {
    },

    actionShow: function (act) {
    },

    actionHide: function (act) {
    },

    actionSetIconIC: function (act) {
    },

    actionSetMaximized: function (act) {
        Runtime.setWindowMaximized();
    },

    actionSetNormal: function (act) {
    },

    actionExitWindows: function (act) {
    },

    actionRestartWindows: function (act) {
    },

    actionRebootSystem: function (act) {
    },

    actionMove: function (act) {
    },

    actionSetTitle: function (act) {
        return Runtime.setWindowTitle(act.getParamExpString(this.rh, 0));
    },

    actionSaveFocus: function (act) {
    },

    actionRestoreFocus: function (act) {
    },

    actionSetFocus: function (act) {
    },

    actionFlash: function (act) {
    },

    actionSetBackColor: function (act) {
        this.ho.hoAdRunHeader.rhApp.setWindowBackgroundColor(act.getParamColour(this.rh, 0));
    },

    actionAttachToDesktop: function (act) {
    },

    actionDetachFromDesktop: function (act) {
    },

    actionSetXFrame: function (act) {
        this.ho.hoAdRunHeader.rhApp.setContainerOverrideX(act.getParamExpression(this.rh, 0));
    },

    actionSetYFrame: function (act) {
        this.ho.hoAdRunHeader.rhApp.setContainerOverrideY(act.getParamExpression(this.rh, 0));
    },

    actionSetWFrame: function (act) {
        this._changeFrame(act.getParamExpression(this.rh, 0), -1, act.getParamExpression(this.rh, 1) == 1);
    },

    actionSetHFrame: function (act) {
        this._changeFrame(-1, act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1) == 1);
    },

    //api
    getScreenWidth: function () {
        return screen.width;
    },

    getScreenHeight: function () {
        return screen.height;
    },

    getWindowWidth: function () {
        var winW = 630;
        if (document.body && document.body.offsetWidth) {
            winW = document.body.offsetWidth;
        }
        if (document.compatMode == 'CSS1Compat' &&
            document.documentElement &&
            document.documentElement.offsetWidth) {
            winW = document.documentElement.offsetWidth;
        }
        if (window.innerWidth && window.innerHeight) {
            winW = window.innerWidth;
        }
        return winW;
    },

    getWindowHeight: function () {
        return winH;
    },
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunkcwctrl);
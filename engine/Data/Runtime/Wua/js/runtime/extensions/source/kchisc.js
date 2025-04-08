//----------------------------------------------------------------------------------
//
// CRunkchisc: high score object
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
CRunkchisc.SCR_HIDEONSTART = 0x0001;
CRunkchisc.SCR_NAMEFIRST = 0x0002;
CRunkchisc.SCR_CHECKONSTART = 0x0004;
CRunkchisc.SCR_DONTDISPLAYSCORES = 0x0008;
CRunkchisc.SCR_FULLPATH = 0x0010;

CRunkchisc.CND_ISPLAYER = 0;
CRunkchisc.CND_VISIBLE = 1;

CRunkchisc.ACT_ASKNAME = 0;
CRunkchisc.ACT_HIDE = 1;
CRunkchisc.ACT_SHOW = 2;
CRunkchisc.ACT_RESET = 3;
CRunkchisc.ACT_CHANGENAME = 4;
CRunkchisc.ACT_CHANGESCORE = 5;
CRunkchisc.ACT_SETPOSITION = 6;
CRunkchisc.ACT_SETXPOSITION = 7;
CRunkchisc.ACT_SETYPOSITION = 8;
CRunkchisc.ACT_INSERTNEWSCORE = 9;
CRunkchisc.ACT_SETCURRENTFILE = 10;

CRunkchisc.EXP_VALUE = 0;
CRunkchisc.EXP_NAME = 1;
CRunkchisc.EXP_GETXPOSITION = 2;
CRunkchisc.EXP_GETYPOSITION = 3;

function CRunkchisc() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.NbScores = 0;
    this.NameSize = 0;
    this.Flags = 0;
    this.Logfont = null;
    this.Colorref = 0;
    this.Names = null;
    this.Scores = null;
    this.originalNames = null;
    this.originalScores = null;
    this.scrPlayer = null;
    this.iniName = null;
    this.started = 0;
    this.newScore = 0;
    this.askForScore = null;
    this.oldReturnKey;

    this.nameTextBuffers = null;
    this.scoreTextBuffers = null;

    this.dialog = null;
}

CRunkchisc.prototype = {
    //fusion
    getNumberOfConditions: function () {
        return 2;
    },

    createRunObject: function (file, cob, version) {
        this.ho.setX(cob.cobX);
        this.ho.setY(cob.cobY);
        //this.xSave = this.ho.hoX;
        //this.ySave = this.ho.hoY;

        this.NbScores = file.readAShort();
        this.NameSize = file.readAShort();
        this.Flags = file.readAShort();
        if (this.ho.hoAdRunHeader.rhApp.unicode == false) {
            this.Logfont = file.readLogFont16();
        }
        else {
            this.Logfont = file.readLogFont();
        }
        this.Colorref = file.readAColor();
        file.readAString(40);
        var i;

        this.Names = new Array(20);
        this.Scores = new Array(20);
        this.originalNames = new Array(20);
        this.originalScores = new Array(20);

        //get names added to frame editor
        for (i = 0; i < 20; i++) {
            this.Names[i] = file.readAString(41);
            this.originalNames[i] = this.Names[i];
        }

        //get scores added to frame editor
        for (i = 0; i < 20; i++) {
            this.Scores[i] = file.readAInt();
            this.originalScores[i] = this.Scores[i];
        }

        this.ho.setWidth(file.readAShort());
        this.ho.setHeight(file.readAShort());
        this.ho.bShown = true;
        this.visibleAtStartTested = false;
        if ((cob.cobFlags & CRun.COF_HIDDEN) != 0) {
            this.ho.bShown = false;
        }

        this.iniName = file.readAString(260);
        this.iniName = this.iniName;
        if (this.iniName.length == 0) {
            this.iniName = "Game.ini";
        }
        this.ini = new CIni(this.rh.rhApp);
        this.loadScores();

        this.scrPlayer = new Array(4);
        for (i = 0; i < 4; i++) {
            this.scrPlayer[i] = 0;
        }

        this.askForScore = new CArrayList();
        this.oldReturnKey = false;

        return true;
    },

    loadScores: function () {
        var a, score;

        for (a = 0; a < 20; a++) {
            //name (use original details as default)
            this.Names[a] = this.ini.getPrivateProfileString(this.rh.rhApp.appName, "N" + a.toString(), this.originalNames[a], this.iniName);

            //score (use original details as default)
            var score = this.ini.getPrivateProfileString(this.rh.rhApp.appName, "S" + a.toString(), this.originalScores[a].toString(), this.iniName);
            if (score == "") {
                score = 0;
            } else {
                score = parseInt(score);

                if (isNaN(score)) {
                    score = 0;
                }
            }

            this.Scores[a] = score;
        }
    },

    saveScores: function () {
        var a;
        for (a = 0; a < this.NbScores; a++) {
            this.ini.writePrivateProfileString(this.rh.rhApp.appName, "N" + a.toString(), this.Names[a], this.iniName);
            this.ini.writePrivateProfileString(this.rh.rhApp.appName, "S" + a.toString(), this.Scores[a].toString(), this.iniName);
        }
        this.ini.saveIni();
    },

    destroyRunObject: function (bFast) {
        this.saveScores(this.iniName);

        //cleanup text buffers
        if (this.nameTextBuffers != null) {
            for (var index = 0; index < this.nameTextBuffers.length; index++) {
                this.nameTextBuffers[index].free();
            }

            this.nameTextBuffers = null;
        }

        if (this.scoreTextBuffers != null) {
            for (var index = 0; index < this.scoreTextBuffers.length; index++) {
                this.scoreTextBuffers[index].free();
            }

            this.scoreTextBuffers = null;
        }

        //cleanup dialog
        if (this.dialog) {
            this.dialog.free();
            this.dialog = null;
        }
    },

    handleRunObject: function () {
        this.ho.hoOEFlags |= CObjectCommon.OEFLAG_NEVERSLEEP;

        if (!this.visibleAtStartTested) {
            this.visibleAtStartTested = true;
            if ((this.Flags & CRunkchisc.SCR_HIDEONSTART) != 0) {
                this.ho.hideSprite();
            }
        }

        var a, b;
        var players = new Array(4);
        var TriOk = false;
        var rhPtr = this.ho.hoAdRunHeader;
        var score1, score2;
        if ((this.Flags & CRunkchisc.SCR_CHECKONSTART) != 0) {
            // Init player order
            for (a = 0; a < 4; a++) {
                players[a] = a;
            }
            // Sort player order (bigger score asked first)
            do
            {
                TriOk = true;
                for (a = 1; a < 4; a++) {
                    score1 = rhPtr.rhApp.getScores()[players[a]];
                    score2 = rhPtr.rhApp.getScores()[players[a - 1]];
                    if (score1 > score2) {
                        b = players[a - 1];
                        players[a - 1] = players[a];
                        players[a] = b;
                        TriOk = false;
                    }
                }
            } while (false == TriOk);

            this.started++;
            var shown = 0;
            // Check for hi-scores
            for (a = 0; a < rhPtr.rhNPlayers; a++) {
                if (this.CheckScore(players[a]) == true) //popup shown
                {
                    shown++;
                }
            }
            if (shown > 0) {
                return CRunExtension.REFLAG_ONESHOT + CRunExtension.REFLAG_DISPLAY;
            }
            if (this.started > 1) {
                return CRunExtension.REFLAG_ONESHOT + CRunExtension.REFLAG_DISPLAY;
            }
            return CRunExtension.REFLAG_DISPLAY; //keep handlerunobject running.
        }
        else {
            return CRunExtension.REFLAG_ONESHOT + CRunExtension.REFLAG_DISPLAY;
        }
        return 0;
    },

    displayRunObject: function (context, xDraw, yDraw) {
        var x = this.ho.hoX - this.rh.rhWindowX + this.ho.pLayer.x + xDraw;
        var y = this.ho.hoY - this.rh.rhWindowY + this.ho.pLayer.y + yDraw;

        var index, drawX, drawY;

        //update name text buffers
        this._updateNameTextBuffers();

        //render the various text buffers
        if ((this.Flags & CRunkchisc.SCR_DONTDISPLAYSCORES) != 0) {
            //only draw names
            drawX = x;
            drawY = y;

            for (index = 0; index < this.NbScores; index++) {
                this.nameTextBuffers[index].draw(context, drawX, drawY, 0, 0);
                drawY += this.ho.hoImgHeight / this.NbScores;
            }
        } else {
            //draw names and scores

            //update score text buffers
            this._updateScoreTextBuffers();

            if ((this.Flags & CRunkchisc.SCR_NAMEFIRST) != 0) {

                // Compute coordinates
                drawX = x;
                drawY = y;

                //draw names
                for (index = 0; index < this.NbScores; index++) {
                    this.nameTextBuffers[index].draw(context, drawX, drawY, 0, 0);
                    drawY += this.ho.hoImgHeight / this.NbScores;
                }

                // draw scores
                drawX = x + ((this.ho.hoImgWidth * 3) / 4);
                drawY = y;

                for (index = 0; index < this.NbScores; index++) {
                    this.scoreTextBuffers[index].draw(context, drawX, drawY, 0, 0);
                    drawY += this.ho.hoImgHeight / this.NbScores;
                }
            } else {
                //draw scores
                drawX = x;
                drawY = y;

                for (index = 0; index < this.NbScores; index++) {
                    this.scoreTextBuffers[index].draw(context, drawX, drawY, 0, 0);
                    drawY += this.ho.hoImgHeight / this.NbScores;
                }

                //draw names
                drawX = x + (this.ho.hoImgWidth / 4);
                drawY = y;

                for (index = 0; index < this.NbScores; index++) {
                    this.nameTextBuffers[index].draw(context, drawX, drawY, 0, 0);
                    drawY += this.ho.hoImgHeight / this.NbScores;
                }
            }
        }
    },

    //internal
    _requireTextBuffersCapcity: function (array, capacity) {
        var app = this.rh.rhApp;

        //make sure we have teh correct number of buffers
        if (array == null) {
            //create new
            array = new Array(capacity);

            for (var index = 0; index < capacity; index++) {
                array[index] = app.createTextContainer();
            }
        } else {
            //resize
            var difference = capacity - array.length;

            if (difference > 0) {
                //add more
                for (var index = 0; index < difference; index++) {
                    array.push(app.createTextContainer());
                }
            } else if (difference < 0) {
                //free old ones
                for (var index = capacity; index < array.length; index++) {
                    array[index].free();
                }

                //slice the array
                array = array.slice(0, this.NbScores);
            }
        }

        return array;
    },

    _updateNameTextBuffers: function () {
        var app = this.rh.rhApp;

        //make sure we have teh correct number of buffers
        this.nameTextBuffers = this._requireTextBuffersCapcity(this.nameTextBuffers, this.NbScores);

        //update the textbuffers
        var flags = ((this.Flags & (CRunkchisc.SCR_NAMEFIRST | CRunkchisc.SCR_DONTDISPLAYSCORES)) == 0) ? CRendererTextContainer.RIGHT | CRendererTextContainer.TOP : CRendererTextContainer.LEFT | CRendererTextContainer.TOP;
        var width = ((this.Flags & CRunkchisc.SCR_DONTDISPLAYSCORES) != 0) ? this.ho.hoImgWidth : (this.ho.hoImgWidth * 3) / 4;
        var height = this.ho.hoImgHeight / this.NbScores;
        var name;

        for (var index = 0; index < this.NbScores; index++) {
            //truncate name (TODO: string manipulation.. YUCK! this was copied over from old code...)
            name = this.Names[index].length > this.NameSize ? this.Names[index].substring(0, this.NameSize) : this.Names[index];

            //set the buffer
            this.nameTextBuffers[index].set(name, this.Logfont, this.Colorref, flags, width, height);
        }
    },

    _updateScoreTextBuffers: function () {
        var app = this.rh.rhApp;

        //make sure we have teh correct number of buffers
        this.scoreTextBuffers = this._requireTextBuffersCapcity(this.scoreTextBuffers, this.NbScores);

        //update the textbuffers
        var flags = ((this.Flags & CRunkchisc.SCR_NAMEFIRST) == 0) ? CRendererTextContainer.LEFT | CRendererTextContainer.TOP : CRendererTextContainer.RIGHT | CRendererTextContainer.TOP;
        var width = this.ho.hoImgWidth / 4;
        var height = this.ho.hoImgHeight / this.NbScores;
        var score;

        for (var index = 0; index < this.NbScores; index++) {
            //truncate name (TODO: string manipulation.. YUCK! this was copied over from old code...)
            score = this.Scores[index].toString();

            //set the buffer
            this.scoreTextBuffers[index].set(score, this.Logfont, this.Colorref, flags, width, height);
        }
    },

    // Conditions
    condition: function (num, cnd) {
        switch (num) {
            case CRunkchisc.CND_ISPLAYER:
                return this.IsPlayerHiScore(cnd.getParamPlayer(this.rh, 0));
            case CRunkchisc.CND_VISIBLE:
                return this.IsVisible();
        }
        return false;
    },

    IsPlayerHiScore: function (player) {
        var rhPtr = this.ho.hoAdRunHeader;
        var score = rhPtr.rhApp.scores[player];
        if ((score > this.Scores[this.NbScores - 1]) && (score != this.scrPlayer[player])) {
            this.scrPlayer[player] = score;
            return true;
        }
        return false;
    },

    IsVisible: function () {
        return this.ho.bShown;
    },

    // Actions
    action: function (num, act) {
        switch (num) {
            case CRunkchisc.ACT_ASKNAME:
                this.CheckScore(act.getParamPlayer(this.rh, 0));
                break;
            case CRunkchisc.ACT_HIDE:
                this.ho.hideSprite();
                break;
            case CRunkchisc.ACT_SHOW:
                this.ho.showSprite();
                break;
            case CRunkchisc.ACT_RESET:
                this.Reset();
                break;
            case CRunkchisc.ACT_CHANGENAME:
                this.ChangeName(act.getParamExpression(this.rh, 0), act.getParamExpString(this.rh, 1));
                break;
            case CRunkchisc.ACT_CHANGESCORE:
                this.ChangeScore(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                break;
            case CRunkchisc.ACT_SETPOSITION:
                this.SetPosition(act);
                break;
            case CRunkchisc.ACT_SETXPOSITION:
                this.SetXPosition(act.getParamExpression(this.rh, 0));
                break;
            case CRunkchisc.ACT_SETYPOSITION:
                this.SetYPosition(act.getParamExpression(this.rh, 0));
                break;
            case CRunkchisc.ACT_INSERTNEWSCORE:
                this.InsertNewScore(act.getParamExpression(this.rh, 0), act.getParamExpString(this.rh, 1));
                break;
            case CRunkchisc.ACT_SETCURRENTFILE:
                this.SetCurrentFile(act.getParamExpString(this.rh, 0));
                break;
        }
    },

    CheckScore: function (player) {
        var rhPtr = this.ho.hoAdRunHeader;

        if (player < rhPtr.rhNPlayers) {
            var that = this;
            this.newScore = rhPtr.rhApp.scores[player];

            if (this.newScore > this.Scores[this.NbScores - 1]) {
                //create dialog
                this.dialog = Runtime.createInputDialog({
                    title: 'Hi-score',
                    message: 'Please enter your name',
                });

                //open the dialogue
                this.dialog.open(function (success, result, params) {
                    //callback indicates teh dialog has completed
                    if (success) {
                        that.InsertNewScore(that.newScore, result);
                    }

                    //cleanup dialog
                    if (this.dialog) {
                        this.dialog.free();
                        this.dialog = null;
                    }
                });

                return true;
            }
        }
        return false;
    },

    Reset: function () {
        var a;
        for (a = 0; a < 20; a++) {
            this.Names[a] = this.originalNames[a];
            this.Scores[a] = this.originalScores[a];
        }
        this.ho.redraw();
    },

    ChangeName: function (i, name) {
        if ((i > 0) && (i <= this.NbScores)) {
            this.Names[i - 1] = name;
            this.ho.redraw();
        }
    },

    ChangeScore: function (i, score) {
        if ((i > 0) && (i <= this.NbScores)) {
            this.Scores[i - 1] = score;
            this.ho.redraw();
        }
    },

    SetPosition: function (act) {
        var p = act.getParamPosition(this.rh, 0);
        if (p.found) {
            this.ho.setX(p.x);
            this.ho.setY(p.y);
        }
    },

    SetXPosition: function (x) {
        this.ho.setX(x);
    },

    SetYPosition: function (y) {
        this.ho.setY(y);
    },

    InsertNewScore: function (pScore, pName) {
        if (pScore > this.Scores[this.NbScores - 1]) {
            this.Scores[19] = pScore;
            this.Names[19] = pName;
            var b;
            var TriOk;
            var score;
            var name;
            // Sort the hi-score table ws_visible
            do
            {
                TriOk = true;
                for (b = 1; b < 20; b++) {
                    if (this.Scores[b] > this.Scores[b - 1]) {
                        score = this.Scores[b - 1];
                        name = this.Names[b - 1];
                        this.Scores[b - 1] = this.Scores[b];
                        this.Names[b - 1] = this.Names[b];
                        this.Scores[b] = score;
                        this.Names[b] = name;
                        TriOk = false;
                    }
                }
            } while (false == TriOk);
            this.saveScores();
        }
    },

    SetCurrentFile: function (fileName) {
        this.ini.currentFileName = fileName;
        this.loadScores();
    },

    // EXPRESSIONS
    expression: function (num) {
        switch (num) {
            case CRunkchisc.EXP_VALUE:
                return this.GetValue(this.ho.getExpParam());
            case CRunkchisc.EXP_NAME:
                return this.GetName(this.ho.getExpParam());
            case CRunkchisc.EXP_GETXPOSITION:
                return this.GetXPosition();
            case CRunkchisc.EXP_GETYPOSITION:
                return this.GetYPosition();
        }
        return 0;
    },

    GetValue: function (i) {
        if ((i > 0) && (i <= this.NbScores)) {
            return (this.Scores[i - 1]);
        }
        return 0;
    },

    GetName: function (i) {
        if ((i > 0) && (i <= this.NbScores)) {
            return this.Names[i - 1];
        }
        return "";
    },

    GetXPosition: function () {
        return (this.ho.hoX);
    },

    GetYPosition: function () {
        return (this.ho.hoY);
    }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunkchisc);
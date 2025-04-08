/* Copyright (c) 1996-2018 Clickteam
* 
* This source code is part of the HTML5 exporter for Clickteam Multimedia Fusion 2.
*
* Permission is hereby granted to any person obtaining a legal copy
* of Clickteam Fusion 2.5 to use or modify this source code for
* debugging, optimizing, or customizing applications created with
* Clickteam Fusion 2.5 .
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

CRunXBOXLeaderboard.CNDONERROR = 0;
CRunXBOXLeaderboard.CNDONLBREAD = 1;
CRunXBOXLeaderboard.CNDONSUBMITSCORE = 2;
CRunXBOXLeaderboard.CNDONPROFILEIMAGE = 3;
CRunXBOXLeaderboard.CND_LAST = 4;

CRunXBOXLeaderboard.ACTSETLB_ID = 0;
CRunXBOXLeaderboard.ACTREADLB = 1;
CRunXBOXLeaderboard.ACTSUBMITSCORE = 2;
CRunXBOXLeaderboard.ACTPROFILEIMAGE = 3;

CRunXBOXLeaderboard.EXPERROR = 0;
CRunXBOXLeaderboard.EXPSCORESQTY = 1;
CRunXBOXLeaderboard.EXPPLAYERID = 2;
CRunXBOXLeaderboard.EXPPLAYERNAME = 3;
CRunXBOXLeaderboard.EXPPLAYERRANK = 4;
CRunXBOXLeaderboard.EXPPLAYERSCORE = 5;
CRunXBOXLeaderboard.EXPPLAYERIMAGE = 6;

// </editor-fold>

function CRunXBOXLeaderboard() {
    //call chain
    CRunExtension.call(this);

    this.m_xblContext = null;
    this.nError = 0;
    this.leaderboardID = null;
    this.maxItems = 10;
    this.scoresQty = 0;
    this.profileImage = null;

    this.XBOXlbResults = {
        playerId: null,
        playerName: null,
        playerScore: 0,
        playerRank: null,
        playerImage: null
    };
}


CRunXBOXLeaderboard.prototype = {
    // methods
    getNumberOfConditions: function () {
        return CRunXBOXLeaderboard.CND_LAST;
    },

    createRunObject: function (file, cob, version) {
        if (typeof xbox !== "undefined" && typeof m_user !== "undefined") {
            try {
                this.m_xblContext = new Microsoft.Xbox.Services.XboxLiveContext(m_user);
                statusManager = xbox.Statistics.Manager.StatisticManager.singletonInstance;
                statusManager.addLocalUser(m_user); //add actual user
            } catch (e) {
                Debug.writeln("Error:" + e);
            }
        }
        this.nError = 0;
        return true;
    },

    handleRunObject: function () {
        return 0;
    },

    // Specific functions
    // -------------------------------------------------
    getLeaderboardScores: function () {
        try {
            var query = new xbox.Leaderboard.LeaderboardQuery();
            var that = this;
            query.maxItems = this.maxItems;
            query.order = 1;
            this.XBOXlbResults = [];
            this.scoresQty = 0;
            statusManager.getLeaderboard(m_user, this.leaderboardID, query);
            return new Promise(function (resolve, reject) {
                try {
                    var events = statusManager.doWork();
                    for (var a = 0; a < events.length; a++) {
                        if (events[a].eventType === xbox.Statistics.Manager.StatisticEventType.getLeaderboardComplete) {
                            var result = events[a].eventArgs.result;
                            if (result) {
                                resolve(that.processLeaderboardResult(result));
                            } else {
                                resolve([]);
                            }
                            return;
                        }
                    }
                } catch (e) {
                    reject();
                }

                //poll again after 100ms
                setTimeout(function () {
                    this;
                }, 100);
            });
        } catch (e) {
            this.nError = 1007;      // Error making request
            this.ho.pushEvent(CRunXBOXLeaderboard.CNDONERROR, 0);
        }
    },

    processLeaderboardResult: function (result) {
        for (var a = 0, l = result.rows.length; a < l; a++) {
            var row = result.rows[a],
                value = row.values[0];

            this.XBOXlbResults.push({
                playerId: row.xboxUserId,
                playerName: row.gamertag,
                rank: row.rank,
                //assumes score is an integer value
                score: !isNaN(value) ? value : parseInt(value, 10)
            });
        }
        return this.XBOXlbResults;
    },

    getImageFromPlayerID: function (playerID) {
        var that = this;
        this.profileImage = null;
        try {
            this.m_xblContext.profileService.getUserProfileAsync(playerID).then(function (profile) {
                that.profileImage = profile.gameDisplayPictureResizeUri.rawUri;
                if (typeof that.profileImage != "null")
                    that.ho.generateEvent(CRunXBOXLeaderboard.CNDONPROFILEIMAGE, 0);
            });
        }
        catch (err) {
            that.nError = 1005;      // Error reading profile
            that.ho.pushEvent(CRunXBOXLeaderboard.CNDONERROR, 0);
        }
    },

    // Conditions
    // -------------------------------------------------
    condition: function (num, cnd) {
        switch (num) {
            case CRunXBOXLeaderboard.CNDONERROR:
                return this.cndOnError(cnd);
            case CRunXBOXLeaderboard.CNDONLBREAD:
                return this.cndOnLBRead(cnd);
            case CRunXBOXLeaderboard.CNDONSUBMITSCORE:
                return this.cndOnSubmitScore(cnd);
            case CRunXBOXLeaderboard.CNDONPROFILEIMAGE:
                return this.cndOnProfileImage(cnd);
        }
        return false;
    },

    // Actions
    // -------------------------------------------------
    action: function (num, act) {
        switch (num) {
            case CRunXBOXLeaderboard.ACTSETLB_ID:
                this.actSetLB_ID(act);
                break;
            case CRunXBOXLeaderboard.ACTREADLB:
                this.actReadLB(act);
                break;
            case CRunXBOXLeaderboard.ACTSUBMITSCORE:
                this.actSubmitScore(act);
                break;
            case CRunXBOXLeaderboard.ACTPROFILEIMAGE:
                this.actProfileImage(act);
                break;
        }
    },

    // Expressions
    // -------------------------------------------------
    expression: function (num) {
        switch (num) {
            case CRunXBOXLeaderboard.EXPERROR:
                return this.expError();
            case CRunXBOXLeaderboard.EXPSCORESQTY:
                return this.expScoresQty();
            case CRunXBOXLeaderboard.EXPPLAYERID:
                return this.expPlayerID();
            case CRunXBOXLeaderboard.EXPPLAYERNAME:
                return this.expPlayerName();
            case CRunXBOXLeaderboard.EXPPLAYERRANK:
                return this.expPlayerRank();
            case CRunXBOXLeaderboard.EXPPLAYERSCORE:
                return this.expPlayerScore();
            case CRunXBOXLeaderboard.EXPPLAYERIMAGE:
                return this.expPlayerImage();
        }
        return 0;
    },

    // Conditions
    // -------------------------------------------------
    cndOnError: function (cnd) {
        return true;
    },

    cndOnLBRead: function (cnd) {
        return true;
    },

    cndOnSubmitScore: function (cnd) {
        return true;
    },

    cndOnProfileImage: function (cnd) {
        return true;
    },

    // Actions
    // -------------------------------------------------
    actSetLB_ID: function (act) {
        var strID = act.getParamExpString(this.rh, 0);
        if (strID.length > 0)
            this.leaderboardID = strID;
        else {
            this.nError = 1001;
            this.ho.pushEvent(CRunXBOXLeaderboard.CNDONERROR, 0);
        }

    },

    actReadLB: function (act) {
        var nItem = act.getParamExpression(this.rh, 0);
        try {
            var that = this;

            if (nItem > 0)
                this.maxItems = nItem;

            this.getLeaderboardScores().then(function (entries) {
                that.scoresQty += entries.length;
                if (that.scoresQty > 0)
                    that.ho.pushEvent(CRunXBOXLeaderboard.CNDONLBREAD, 0);
            });
        }
        catch (err) {
            this.nError = 1007;      // Error reading leaderboard
            this.ho.pushEvent(CRunXBOXLeaderboard.CNDONERROR, 0);
        }

    },

    actSubmitScore: function (act) {
        var value = act.getParamExpression(this.rh, 0);
        this.nError = 0;
        if (statusManager !== "null" && m_user && this.leaderboardID) {
            statusManager.setStatisticIntegerData(m_user, this.leaderboardID, value);
            statusManager.requestFlushToService(m_user);
            this.ho.pushEvent(CRunXBOXLeaderboard.CNDONSUBMITSCORE, 0);
        }
        else {
            this.nError = 1003;
            this.ho.pushEvent(CRunXBOXLeaderboard.CNDONERROR, 0);
        }

    },

    actProfileImage: function (act) {
        var strID = act.getParamExpString(this.rh, 0);
        if (strID.length > 0)
            this.getImageFromPlayerID(strID);
        else {
            this.nError = 1008;
            this.ho.pushEvent(CRunXBOXLeaderboard.CNDONERROR, 0);
        }

    },

    // Expressions
    // -------------------------------------------------
    expError: function () {
        return this.nError;
    },

    expScoresQty: function () {
        return this.scoresQty;
    },

    expPlayerID: function () {
        var param0 = this.ho.getExpParam();
        if (typeof this.XBOXlbResults !== "null" && this.XBOXlbResults.length > param0)
            return this.XBOXlbResults[param0].playerId;

        return "";
    },

    expPlayerName: function () {
        var param0 = this.ho.getExpParam();
        if (typeof this.XBOXlbResults !== "null" && this.XBOXlbResults.length > param0)
            return this.XBOXlbResults[param0].playerName;

        return "";
    },

    expPlayerRank: function () {
        var param0 = this.ho.getExpParam();
        if (typeof this.XBOXlbResults !== "null" && this.XBOXlbResults.length > param0)
            return this.XBOXlbResults[param0].rank;

        return "";
    },

    expPlayerScore: function () {
        var param0 = this.ho.getExpParam();
        if (typeof this.XBOXlbResults !== "null" && this.XBOXlbResults.length > param0)
            return parseInt(this.XBOXlbResults[param0].score, 10);

        return 0;
    },

    expPlayerImage: function () {
        if (typeof this.profileImage != "null") {
            return this.profileImage;
        }
        return "";
    }

};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunXBOXLeaderboard);
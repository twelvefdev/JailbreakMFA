//----------------------------------------------------------------------------------
//
// CRunparser : stringparser
//
//----------------------------------------------------------------------------------
this.parser = CRunparser;

CRunparser.CASE_INSENSITIVE = 0;
CRunparser.SEARCH_LITERAL = 0;

CRunparser.CND_ISURLSAFE = 0;
CRunparser.ACT_SETSTRING = 0;
CRunparser.ACT_SAVETOFILE = 1;
CRunparser.ACT_LOADFROMFILE = 2;
CRunparser.ACT_APPENDTOFILE = 3;
CRunparser.ACT_APPENDFROMFILE = 4;
CRunparser.ACT_RESETDELIMS = 5;
CRunparser.ACT_ADDDELIM = 6;
CRunparser.ACT_SETDELIM = 7;
CRunparser.ACT_DELETEDELIMINDEX = 8;
CRunparser.ACT_DELETEDELIM = 9;
CRunparser.ACT_SETDEFDELIMINDEX = 10;
CRunparser.ACT_SETDEFDELIM = 11;
CRunparser.ACT_SAVEASCSV = 12;
CRunparser.ACT_LOADFROMCSV = 13;
CRunparser.ACT_SAVEASMMFARRAY = 14;
CRunparser.ACT_LOADFROMMMFARRAY = 15;
CRunparser.ACT_SAVEASDYNAMICARRAY = 16;
CRunparser.ACT_LOADFROMDYNAMICARRAY = 17;
CRunparser.ACT_CASEINSENSITIVE = 18;
CRunparser.ACT_CASESENSITIVE = 19;
CRunparser.ACT_SEARCHLITERAL = 20;
CRunparser.ACT_SEARCHWILDCARDS = 21;
CRunparser.ACT_SAVEASINI = 22;
CRunparser.ACT_LOADFROMINI = 23;
CRunparser.EXP_GETSTRING = 0;
CRunparser.EXP_GETLENGTH = 1;
CRunparser.EXP_LEFT = 2;
CRunparser.EXP_RIGHT = 3;
CRunparser.EXP_MIDDLE = 4;
CRunparser.EXP_NUMBEROFSUBS = 5;
CRunparser.EXP_INDEXOFSUB = 6;
CRunparser.EXP_INDEXOFFIRSTSUB = 7;
CRunparser.EXP_INDEXOFLASTSUB = 8;
CRunparser.EXP_REMOVE = 9;
CRunparser.EXP_REPLACE = 10;
CRunparser.EXP_INSERT = 11;
CRunparser.EXP_REVERSE = 12;
CRunparser.EXP_UPPERCASE = 13;
CRunparser.EXP_LOWERCASE = 14;
CRunparser.EXP_URLENCODE = 15;
CRunparser.EXP_CHR = 16;
CRunparser.EXP_ASC = 17;
CRunparser.EXP_ASCLIST = 18;
CRunparser.EXP_NUMBEROFDELIMS = 19;
CRunparser.EXP_GETDELIM = 20;
CRunparser.EXP_GETDELIMINDEX = 21;
CRunparser.EXP_GETDEFDELIM = 22;
CRunparser.EXP_GETDEFDELIMINDEX = 23;
CRunparser.EXP_LISTCOUNT = 24;
CRunparser.EXP_LISTSETAT = 25;
CRunparser.EXP_LISTINSERTAT = 26;
CRunparser.EXP_LISTAPPEND = 27;
CRunparser.EXP_LISTPREPEND = 28;
CRunparser.EXP_LISTGETAT = 29;
CRunparser.EXP_LISTFIRST = 30;
CRunparser.EXP_LISTLAST = 31;
CRunparser.EXP_LISTFIND = 32;
CRunparser.EXP_LISTCONTAINS = 33;
CRunparser.EXP_LISTDELETEAT = 34;
CRunparser.EXP_LISTSWAP = 35;
CRunparser.EXP_LISTSORTASC = 36;
CRunparser.EXP_LISTSORTDESC = 37;
CRunparser.EXP_LISTCHANGEDELIMS = 38;
CRunparser.EXP_SETSTRING = 39;
CRunparser.EXP_SETVALUE = 40;
CRunparser.EXP_GETMD5 = 41;

function CRunparser() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.source = "";
    this.caseSensitive = false;
    this.wildcards = false;
    this.delims = new CArrayList(); //Strings
    this.defaultDelim = "";
    this.tokensE = new CArrayList(); //parserElement
}

CRunparser.prototype = {
    getNumberOfConditions: function () {
        return 1;
    },

    fixString: function (input) {
        var i;
        for (i = 0; i < input.length; i++) {
            if (input.charCodeAt(i) < 10) {
                return input.substring(0, i);
            }
        }
        return input;
    },

    createRunObject: function (file, cob, version) {
        file.setUnicode(false);
        file.skipBytes(4);
        this.source = this.fixString(file.readAString(1025));
        var nComparison = file.readAShort();
        if (nComparison == CRunparser.CASE_INSENSITIVE) {
            this.caseSensitive = false;
        }
        else {
            this.caseSensitive = true;
        }
        var nSearchMode = file.readAShort();
        if (nSearchMode == CRunparser.SEARCH_LITERAL) {
            this.wildcards = false;
        }
        else {
            this.wildcards = true;
        }
        return true;
    },

    redoTokens: function () {
        this.tokensE.clear();
        var sourceToTest = this.source;
        var i;
        if (!sourceToTest == "") {
            var lastTokenLocation = 0;
            var work = true;
            while (work) {
                var aTokenE = new CArrayList(); //parserElement
                var aDelim = new CArrayList(); //String
                var j;
                for (j = 0; j < this.delims.size(); j++) {
                    var delim = String(this.delims.get(j));
                    var index = this.getSubstringIndex(sourceToTest, delim, 0);
                    if (index != -1) {
                        aTokenE.add(new CRunparserElement(sourceToTest.substring(0, index), lastTokenLocation));
                        aDelim.add(delim);
                    }
                }
                //pick smallest token
                var smallestC = 1000000;
                var smallest = -1;
                for (j = 0; j < aTokenE.size(); j++) {
                    if (aTokenE.get(j).text.length < smallestC) {
                        smallestC = aTokenE.get(j).text.length;
                        smallest = j;
                    }
                }
                if (smallest != -1) {
                    this.tokensE.add(aTokenE.get(smallest));
                    sourceToTest = sourceToTest.substring(
                        ((aTokenE.get(smallest))).text.length +
                        ( (aDelim.get(smallest))).length);
                    lastTokenLocation += ( (aTokenE.get(smallest))).text.length +
                        ( (aDelim.get(smallest))).length;
                }
                else {
                    //if at end of search, add remainder
                    this.tokensE.add(new CRunparserElement(sourceToTest, lastTokenLocation));
                    work = false;
                }
            }
            for (i = 0; i < this.tokensE.size(); i++) {
                //remove ""
                var e = this.tokensE.get(i);
                if (e.text == "") {
                    this.tokensE.removeIndex(i);
                    i--;
                }
            }
        }
    },

    getSubstringIndex: function (sourceLocal, find, occurance) { //occurance is 0-based
        var theSource = sourceLocal;
        if (theSource.length == 0) {
            return -1;
        }
        if (!this.caseSensitive) {
            theSource = theSource.toLowerCase();
            find = find.toLowerCase();
        }
        var i, j;
        if (this.wildcards) {
            var st = new CTokeniser(find, "*");
            var ct = st.countTokens();
            var asteriskless = new Array(ct);
            for (i = 0; i < ct; i++) {
                asteriskless[i] = st.nextToken();
            }
            var lastOccurance = -1;
            var occ;
            for (occ = 0; occ <= occurance; occ++) {
                var asterisklessLocation = new Array(ct);
                var asterisk;
                for (asterisk = 0; asterisk < ct; asterisk++) {
                    for (i = 0; i < theSource.length; i++) {
                        var findThis = asteriskless[asterisk];
                        //replace "?" occurances with chars from sourceLocal
                        for (j = 0; j < findThis.length; j++) {
                            if (findThis.substring(j, j + 1) == "?") {
                                if (i + j < theSource.length) {
                                    findThis = findThis.substring(0, j) + theSource.substring(i + j, i + j + 1) + findThis.substring(j + 1);
                                }
                            }
                        }
                        if ((asterisk == 0) || (asterisklessLocation[asterisk - 1] == -1)) {
                            asterisklessLocation[asterisk] = theSource.indexOf(findThis, lastOccurance + 1);
                        } else {
                            asterisklessLocation[asterisk] = theSource.indexOf(findThis, asterisklessLocation[asterisk - 1]);
                        }
                        if (asterisklessLocation[asterisk] != -1) {
                            i = theSource.length; //stop
                        }
                    }
                }
                //now each int in asterisklessLocation should be in an acsending order (lowest first)
                //if they are not, then the string wasn't found in the sourceLocal
                var last = -1;
                for (i = 0; i < ct; i++) {
                    if (asterisklessLocation[i] > last) {
                        last = asterisklessLocation[i];
                    }
                    else {
                        lastOccurance = -1;
                        i = ct; //stop
                    }
                }
                if ((occ == 0) || (lastOccurance != -1)) {
                    if (asterisklessLocation.length > 0) {
                        lastOccurance = asterisklessLocation[0];
                    }
                    else {
                        lastOccurance = -1;
                    }
                }
            }
            return lastOccurance;
        }
        else { //no this.wildcards
            var lastIndex = -1;
            for (i = 0; i <= occurance; i++) {
                lastIndex = theSource.indexOf(find, lastIndex + 1);
            }
            return lastIndex;
        }
    },

    substringMatches: function (sourceLocal, find) {
        var theSource = sourceLocal;
        if (!this.caseSensitive) {
            theSource = theSource.toLowerCase();
            find = find.toLowerCase();
        }
        var i, j;
        if (this.wildcards) {
            var st = new CTokeniser(find, "*");
            var ct = st.countTokens();
            var asteriskless = new Array(ct);
            for (i = 0; i < ct; i++) {
                asteriskless[i] = st.nextToken();
            }
            var asterisklessLocation = new Array(ct);
            var asterisk;
            for (asterisk = 0; asterisk < ct; asterisk++) {
                for (i = 0; i < theSource.length; i++) {
                    var findThis = asteriskless[asterisk];
                    //replace "?" occurances with chars from sourceLocal
                    for (j = 0; j < findThis.length; j++) {
                        if (findThis.substring(j, j + 1) == "?") {
                            if (i + j < theSource.length) {
                                findThis = findThis.substring(0, j) +
                                    theSource.substring(i + j, i + j + 1) +
                                    findThis.substring(j + 1);
                            }
                        }
                    }
                    if ((asterisk == 0) || (asterisklessLocation[asterisk - 1] == -1)) {
                        asterisklessLocation[asterisk] = theSource.indexOf(findThis);
                    }
                    else {
                        asterisklessLocation[asterisk] = theSource.indexOf(findThis, asterisklessLocation[asterisk - 1]);
                    }
                    if (asterisklessLocation[asterisk] != -1) {
                        i = theSource.length; //stop
                    }
                }
            }
            //now each int in asterisklessLocation should be in an acsending order (lowest first)
            //if they are not, then the string wasn't found in the sourceLocal
            var last = -1;
            var ok = true;
            for (i = 0; i < ct; i++) {
                if (asterisklessLocation[i] > last) {
                    last = asterisklessLocation[i];
                }
                else {
                    i = ct; //stop
                    ok = false;
                }
            }
            if ((ok) && (find.length > 0) && (asterisklessLocation.length > 0)) {
                if (this.getSubstringIndex(theSource, find, 1) == -1) { //no other occurances
                    if (find.substring(0, 1) == "*") {
                        if (find.substring(find.length - 1) == "*") {
                            //if it starts with a * and ends with a *
                            return true;
                        }
                        else {
                            //if last element is at the end of the sourceLocal
                            if (asterisklessLocation[ct - 1] + asteriskless[ct - 1].length == theSource.length) {
                                return true;
                            }
                        }
                    }
                    else {
                        if (asterisklessLocation[0] == 0) {
                            if (find.substring(find.length - 1) == "*") {
                                //if it starts with a * and ends with a *
                                return true;
                            }
                            else {
                                //if last element is at the end of the sourceLocal
                                if (asterisklessLocation[ct - 1] + asteriskless[ct - 1].length == theSource.length) {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        else { //no this.wildcards
            if ((theSource.length == find.length) && (theSource.indexOf(find, 0) == 0)) {
                return true;
            }
        }
        return false;
    },

    condition: function (num, cnd) {
        if (num == CRunparser.CND_ISURLSAFE) {
            var index;
            for (index = 0; index < this.source.length; index++) {
                while (!this.isLetterOrDigit(this.source.charCodeAt(index))) {
                    if (this.source.charCodeAt(index) == 43) {
                        break;
                    }
                    else if (this.source.charCodeAt(index) == 37) {
                        if (this.source.length > index + 2) {
                            if (this.isLetterOrDigit(this.source.charCodeAt(index + 1)) &&
                                this.isLetterOrDigit(this.source.charCodeAt(index + 2))) {
                                index = index + 2;
                            }
                            else {
                                return false;
                            }
                            break;
                        }
                        else {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
            return true;
        }
        return false;
    },

    action: function (num, act) {
        switch (num) {
            case CRunparser.ACT_SETSTRING:
                this.source = act.getParamExpString(this.rh, 0);
                this.redoTokens();
                break;
            case CRunparser.ACT_SAVETOFILE:
                var filename = act.getParamExpString(this.rh, 0);
                this.rh.rhApp.saveFile(filename, this.source);
                break;
            case CRunparser.ACT_LOADFROMFILE:
                var filename = act.getParamExpString(this.rh, 0);
                this.source = this.rh.rhApp.loadFile(filename, "", false);
                this.redoTokens();

                break;
            case CRunparser.ACT_APPENDTOFILE:
                var filename = act.getParamExpString(this.rh, 0);
                var oldFile = this.rh.rhApp.appendFile(filename, this.source, true);
                break;

            case CRunparser.ACT_APPENDFROMFILE:
                var filename = act.getParamExpString(this.rh, 0);
                this.source += this.rh.rhApp.loadFile(filename, "", false);
                this.redoTokens();
                break;

            case CRunparser.ACT_RESETDELIMS:
                this.delims.clear();
                break;
            case CRunparser.ACT_ADDDELIM:
                this.SP_addDelim(act.getParamExpString(this.rh, 0));
                break;
            case CRunparser.ACT_SETDELIM:
                this.SP_setDelim(act.getParamExpString(this.rh, 0), act.getParamExpression(this.rh, 1));
                break;
            case CRunparser.ACT_DELETEDELIMINDEX:
                this.SP_deleteDelimIndex(act.getParamExpression(this.rh, 0));
            case CRunparser.ACT_DELETEDELIM:
                this.SP_deleteDelim(act.getParamExpString(this.rh, 0));
                break;
            case CRunparser.ACT_SETDEFDELIMINDEX:
                this.SP_setDefDelimIndex(act.getParamExpression(this.rh, 0));
                break;
            case CRunparser.ACT_SETDEFDELIM:
                this.SP_setDefDelim(act.getParamExpString(this.rh, 0));
                break;
            case CRunparser.ACT_SAVEASCSV:
                break;
            case CRunparser.ACT_LOADFROMCSV:
                break;
            case CRunparser.ACT_SAVEASMMFARRAY:
                break;
            case CRunparser.ACT_LOADFROMMMFARRAY:
                break;
            case CRunparser.ACT_SAVEASDYNAMICARRAY:
                break;
            case CRunparser.ACT_LOADFROMDYNAMICARRAY:
                break;
            case CRunparser.ACT_CASEINSENSITIVE:
                this.caseSensitive = false;
                this.redoTokens();
                break;
            case CRunparser.ACT_CASESENSITIVE:
                this.caseSensitive = true;
                this.redoTokens();
                break;
            case CRunparser.ACT_SEARCHLITERAL:
                this.wildcards = false;
                this.redoTokens();
                break;
            case CRunparser.ACT_SEARCHWILDCARDS:
                this.wildcards = true;
                this.redoTokens();
                break;
            case CRunparser.ACT_SAVEASINI:
                break;
            case ACT_LOADFROMINI:
                break;
        }
    },

    SP_addDelim: function (delim) {
        if (!delim == "") {
            var exists = false;
            var i;
            for (i = 0; i < this.delims.size(); i++) {
                var thisDelim = (this.delims.get(i));
                if (this.getSubstringIndex(thisDelim, delim, 0) >= 0) {
                    exists = true;
                }
            }
            if (exists == false) {
                this.delims.add(delim);
                this.redoTokens();
                this.defaultDelim = delim;
            }
        }
    },

    SP_setDelim: function (delim, index) {
        if (index == this.delims.size()) {
            this.delims.add(delim);
            this.defaultDelim = delim;
            this.redoTokens();
        }
        else if ((index >= 0) && (index < this.delims.size())) {
            this.delims.set(index, delim);
            this.defaultDelim = delim;
            this.redoTokens();
        }
    },

    SP_deleteDelimIndex: function (index) {
        if ((index >= 0) && (index < this.delims.size())) {
            this.delims.removeIndex(index);
            if (index < this.delims.size()) {
                this.defaultDelim = (this.delims.get(index));
            }
            else {
                this.defaultDelim = null;
            }
            this.redoTokens();
        }
    },

    SP_deleteDelim: function (delim) {
        var i;
        for (i = 0; i < this.delims.size(); i++) {
            if (( (this.delims.get(i))) == delim) {
                this.delims.removeIndex(i);
                if (i < this.delims.size()) {
                    this.defaultDelim = (this.delims.get(i));
                }
                else {
                    this.defaultDelim = null;
                }
                this.redoTokens();
                return;
            }
        }
    },

    SP_setDefDelimIndex: function (index) {
        if ((index >= 0) && (index < this.delims.size())) {
            this.defaultDelim = (this.delims.get(index));
        }
    },

    SP_setDefDelim: function (delim) {
        var i;
        for (i = 0; i < this.delims.size(); i++) {
            if (( (this.delims.get(i))) == delim) {
                this.defaultDelim = (this.delims.get(i));
                return;
            }
        }

        // If the delimiter doesn't exist, add it
        this.delims.add(delim);
        this.defaultDelim = delim;
        this.redoTokens();
    },

    // Expressions
    // ----------------------------------------------------------------------------
    expression: function (num) {
        var ret;
        switch (num) {
            case CRunparser.EXP_GETSTRING:
                return this.source;
            case CRunparser.EXP_GETLENGTH:
                return (this.source.length);
            case CRunparser.EXP_LEFT:
                return this.SP_left(this.ho.getExpParam());
            case CRunparser.EXP_RIGHT:
                return this.SP_right(this.ho.getExpParam());
            case CRunparser.EXP_MIDDLE:
                return this.SP_middle(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_NUMBEROFSUBS:
                return this.SP_numberOfSubs(this.ho.getExpParam());
            case CRunparser.EXP_INDEXOFSUB:
                return this.SP_indexOfSub(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_INDEXOFFIRSTSUB:
                return this.SP_indexOfFirstSub(this.ho.getExpParam());
            case CRunparser.EXP_INDEXOFLASTSUB:
                return this.SP_indexOfLastSub(this.ho.getExpParam());
            case CRunparser.EXP_REMOVE:
                return this.SP_remove(this.ho.getExpParam());
            case CRunparser.EXP_REPLACE:
                return this.SP_replace(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_INSERT:
                return this.SP_insert(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_REVERSE:
                return this.SP_reverse();
            case CRunparser.EXP_UPPERCASE:
                return this.source.toUpperCase();
            case CRunparser.EXP_LOWERCASE:
                return this.source.toLowerCase();
            case CRunparser.EXP_URLENCODE:
                return this.SP_urlEncode();
            case CRunparser.EXP_CHR:
                return this.SP_chr(this.ho.getExpParam());
            case CRunparser.EXP_ASC:
                return this.SP_asc(this.ho.getExpParam());
            case CRunparser.EXP_ASCLIST:
                return this.SP_ascList(this.ho.getExpParam());
            case CRunparser.EXP_NUMBEROFDELIMS:
                return (this.delims.size());
            case CRunparser.EXP_GETDELIM:
                return this.SP_getDelim(this.ho.getExpParam());
            case CRunparser.EXP_GETDELIMINDEX:
                return this.SP_getDelimIndex(this.ho.getExpParam());
            case CRunparser.EXP_GETDEFDELIM:
                return this.SP_getDefDelim();
            case CRunparser.EXP_GETDEFDELIMINDEX:
                return this.SP_getDefDelimIndex();
            case CRunparser.EXP_LISTCOUNT:
                return (this.tokensE.size());
            case CRunparser.EXP_LISTSETAT:
                return this.SP_listSetAt(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_LISTINSERTAT:
                return this.SP_listInsertAt(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_LISTAPPEND:
                return (this.source + ((this.delims.size() > 0 && this.source.length > 0) ? this.delims.get(0) : "") + this.ho.getExpParam());
            case CRunparser.EXP_LISTPREPEND:
                return (this.ho.getExpParam() + ((this.delims.size() > 0 && this.source.length > 0) ? this.delims.get(0) : "") + this.source);
            case CRunparser.EXP_LISTGETAT:
                return this.SP_listGetAt(this.ho.getExpParam());
            case CRunparser.EXP_LISTFIRST:
                return this.SP_listFirst();
            case CRunparser.EXP_LISTLAST:
                return this.SP_listLast();
            case CRunparser.EXP_LISTFIND: //matching
                return this.SP_listFind(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.XP_LISTCONTAINS:
                return this.SP_listContains(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_LISTDELETEAT:
                return this.SP_listDeleteAt(this.ho.getExpParam());
            case CRunparser.EXP_LISTSWAP:
                return this.SP_listSwap(this.ho.getExpParam(), this.ho.getExpParam());
            case CRunparser.EXP_LISTSORTASC:
                return this.SP_listSortAsc();
            case CRunparser.EXP_LISTSORTDESC:
                return this.SP_listSortDesc();
            case CRunparser.EXP_LISTCHANGEDELIMS:
                return this.SP_listChangeDelims(this.ho.getExpParam());
            case CRunparser.EXP_SETSTRING:
                return this.SP_setStringEXP(this.ho.getExpParam());
            case CRunparser.EXP_SETVALUE:
                return this.SP_setValueEXP(this.ho.getExpParam());
            case CRunparser.EXP_GETMD5:
                return this.SP_getMD5();
        }
        return 0;//won't be used
    },

    SP_left: function (i) {
        var ret = "";
        if ((i >= 0) && (i <= this.source.length)) {
            ret = (this.source.substring(0, i));
        }
        return ret;
    },

    SP_right: function (i) {
        var ret = "";
        var i;
        if ((i >= 0) && (i <= this.source.length)) {
            ret = (this.source.substring(this.source.length - i));
        }
        return ret;
    },

    SP_middle: function (i, length) {
        var ret = "";
        length = Math.max(0, length);
        var i;
        if ((i >= 0) && (i + length <= this.source.length)) {
            ret = (this.source.substring(i, i + length));
        }
        return ret;
    },

    SP_numberOfSubs: function (sub) {
        var count = 0;
        while (this.getSubstringIndex(this.source, sub, count) != -1) {
            count++;
        }
        return (count);
    },

    SP_indexOfSub: function (sub, occurance) { //1-based
        occurance = Math.max(1, occurance);
        return (this.getSubstringIndex(this.source, sub, occurance - 1));
    },

    SP_indexOfFirstSub: function (sub) {
        return (this.getSubstringIndex(this.source, sub, 0));
    },

    SP_indexOfLastSub: function (sub) {
        var n = Math.max(1, SP_numberOfSubs(sub));
        return (this.getSubstringIndex(this.source, sub, n - 1));
    },

    SP_remove: function (sub) {
        var ret = "";
        var count = 0;
        var parts = new CArrayList(); //Integer
        var index = this.getSubstringIndex(this.source, sub, count);
        while (index != -1) {
            parts.add(index);
            count++;
            index = this.getSubstringIndex(this.source, sub, count);
        }
        if (parts.size() == 0) {
            ret = (this.source);
            return ret;
        }
        var last = 0;
        var r = "";
        var i;
        for (i = 0; i < parts.size(); i++) {
            r += this.source.substring(last, (parts.get(i)));
            last = ( (parts.get(i)) ) + sub.length;
            if (i == parts.size() - 1) {
                r += this.source.substring(last);
            }
        }
        ret = r;
        return ret;
    },

    SP_replace: function (old, newString) {
        var ret = "";

        var count = 0;
        var parts = new CArrayList(); //Integer
        var index = this.getSubstringIndex(this.source, old, count);
        while (index != -1) {
            parts.add(index);
            count++;
            index = this.getSubstringIndex(this.source, old, count);
        }
        if (parts.size() == 0) {
            ret = (this.source);
            return ret;
        }
        var last = 0;
        var r = "";
        var i;
        for (i = 0; i < parts.size(); i++) {
            r += this.source.substring(last, (parts.get(i))) + newString;
            last = (parts.get(i)) + old.length;
            if (i == parts.size() - 1) {
                r += this.source.substring(last);
            }
        }
        ret = (r);
        return ret;
    },

    SP_insert: function (insert, index) {
        var ret = "";
        if ((index >= 1) && (index <= this.source.length)) {
            ret = (this.source.substring(0, index - 1) + insert + this.source.substring(index - 1));
        }
        return ret;
    },

    SP_reverse: function () {
        var ret = "";
        var r = "";
        var i;
        for (i = this.source.length - 1; i >= 0; i--) {
            r += this.source.substring(i, i + 1);
        }
        ret = (r);
        return ret;
    },

    SP_urlEncode: function () {
        var r = "";
        var i;
        for (i = 0; i < this.source.length; i++) {
            if (this.isLetterOrDigit(this.source.charCodeAt(i))) {
                r += this.source.substring(i, i + 1);
            }
            else {
                if (this.isSpaceChar(this.source.charCodeAt(i))) {
                    r += "+";
                }
                else if (this.source.charCodeAt(i) == 13) {
                    r += "+";
                    i++;
                }
                else {
                    r += "%";
                    r += (this.source.charCodeAt(i) >> 4).toString(16);
                    r += (this.source.charCodeAt(i) % 16).toString(16);
                }
            }
        }
        return r;
    },

    SP_chr: function (value) {
        return String.fromCharCode(value);
    },

    SP_asc: function (value) {
        if (value.length > 0) {
            var r = value.charCodeAt(0);
            return (r);
        }
        return 0;
    },

    SP_ascList: function (delim) {
        var r = "";
        var i;
        for (i = 0; i < this.source.length; i++) {
            r += (this.source.charCodeAt(i)).toString();
            if (i < this.source.length - 1) {
                r += delim;
            }
        }
        return r;
    },

    SP_getDelim: function (i) { //0-based, silly 3ee
        var ret = "";
        if ((i >= 0) && (i < this.delims.size())) {
            ret = ( String(this.delims.get(i)) );
        }
        return ret;
    },

    SP_getDelimIndex: function (delim) {
        var i;
        for (i = 0; i < this.delims.size(); i++) {
            var thisDelim = String(this.delims.get(i));
            if (this.getSubstringIndex(thisDelim, delim, 0) >= 0) {
                return (i);
            }
        }
        return (-1);
    },

    SP_getDefDelim: function () {
        var ret = "";
        if (this.defaultDelim != null) {
            ret = (this.defaultDelim);
        }
        return ret;
    },

    SP_getDefDelimIndex: function () {
        if (this.defaultDelim != null) {
            var i;
            for (i = 0; i < this.delims.size(); i++) {
                var thisDelim = String(this.delims.get(i));
                if (this.getSubstringIndex(thisDelim, this.defaultDelim, 0) >= 0) {
                    return (i);
                }
            }
        }
        return (-1);
    },

    SP_listSetAt: function (replace, index) { //1-based
        var ret = "";
        if ((index >= 1) && (index <= this.tokensE.size())) {
            var e = (this.tokensE.get(index - 1));
            var r = this.source.substring(0, e.index) + replace + this.source.substring(e.endIndex);
            ret = (r);
        }
        return ret;
    },

    SP_listInsertAt: function (insert, index) { //1-based
        var ret = (0);
        ret = "";
        if ((index >= 1) && (index <= this.tokensE.size())) {
            var e = (this.tokensE.get(index - 1));
            var r = this.source.substring(0, e.index) + insert + this.source.substring(e.index);
            ret = (r);
        }
        return ret;
    },

    SP_listGetAt: function (index) { //1-based
        var ret = "";
        if ((index >= 1) && (index <= this.tokensE.size())) {
            var e = (this.tokensE.get(index - 1));
            ret = (e.text);
        }
        return ret;
    },

    SP_listFirst: function () {
        var ret = "";
        if (this.tokensE.size() > 0) {
            var e = (this.tokensE.get(0));
            ret = (e.text);
        }
        return ret;
    },

    SP_listLast: function () {
        var ret = "";
        if (this.tokensE.size() > 0) {
            var e = (this.tokensE.get(this.tokensE.size() - 1));
            ret = (e.text);
        }
        return ret;
    },

    SP_listFind: function (find, occurance) { //matching //1-based
        if ((occurance > 0) && (find.length > 0)) {
            var occuranceCount = 0;
            var i;
            for (i = 0; i < this.tokensE.size(); i++) {
                var e = (this.tokensE.get(i));
                if (this.substringMatches(e.text, find)) {
                    occuranceCount++;
                }
                if (occuranceCount == occurance) {
                    return (i + 1);
                }
            }
        }
        return 0;
    },

    SP_listContains: function (find, occurance) { //matching //1-based
        if ((occurance > 0) && (find.length > 0)) {
            var occuranceCount = 0;
            var i;
            for (i = 0; i < this.tokensE.size(); i++) {
                var e = (this.tokensE.get(i));
                if (this.getSubstringIndex(e.text, find, 0) != -1) {
                    occuranceCount++;
                }
                if (occuranceCount == occurance) {
                    return (i + 1);
                }
            }
        }
        return 0;
    },

    SP_listDeleteAt: function (index) { //1-based
        var ret = (0);
        ret = "";
        if ((index >= 1) && (index <= this.tokensE.size())) {
            var e = (this.tokensE.get(index - 1));
            var r = this.source.substring(0, e.index) + this.source.substring(e.endIndex);
            ret = (r);
        }
        return ret;
    },

    SP_listSwap: function (i1, i2) { //1-based
        var ret = (0);
        ret = "";
        if ((i1 >= 1) && (i2 >= 1) && (i1 <= this.tokensE.size()) && (i2 <= this.tokensE.size())) {
            if (i1 == i2) {
                ret = (this.source);
                return ret;
            }
            var e1 = (this.tokensE.get(i1 - 1));
            var e2 = (this.tokensE.get(i2 - 1));
            var r = "";
            if (i1 > i2) {
                //e2 comes sooner
                r += this.source.substring(0, e2.index); //string leading up to e2
                r += this.source.substring(e1.index, e1.endIndex); //e1
                r += this.source.substring(e2.endIndex, e1.index); //string between e2 and e1
                r += this.source.substring(e2.index, e2.endIndex); //e2
                r += this.source.substring(e1.endIndex); //string from end of e1 to end
            }
            else { //i1 < i2
                //e1 comes sooner
                r += this.source.substring(0, e1.index); //string leading up to e1
                r += this.source.substring(e2.index, e2.endIndex); //e2
                r += this.source.substring(e1.endIndex, e2.index); //string between e1 and e2
                r += this.source.substring(e1.index, e1.endIndex); //e1
                r += this.source.substring(e2.endIndex); //string from end of e2 to end
            }
            ret = (r);
        }
        return ret;
    },

    SP_listSortAsc: function () {
        var e;
        var sorted = new CArrayList(); //parserElement
        var i;
        for (i = 0; i < this.tokensE.size(); i++) {
            e = (this.tokensE.get(i));
            if (sorted.size() == 0) {
                sorted.add(e);
            }
            else {
                var index = 0;
                var j;
                for (j = 0; j < sorted.size(); j++) {
                    var element = (sorted.get(j));
                    if (this.caseSensitive) {
                        if (this.compareStrings(e.text, element.text) >= 0) {
                            index = j;
                        }
                    }
                    else {
                        if (CServices.compareStringsIgnoreCase(e.text, element.text)) {
                            index = j;
                        }
                    }
                }
                sorted.insert(index, e);
            }
        }
        var r = "";
        for (i = 0; i < sorted.size(); i++) {
            e = (sorted.get(i));
            var oe = (this.tokensE.get(i));
            if (i == 0) {
                r += this.source.substring(0, oe.index);
            }
            else {
                var lastOrigE = (this.tokensE.get(i - 1));
                r += this.source.substring(lastOrigE.endIndex, oe.index);
            }
            r += this.source.substring(e.index, e.endIndex);
            if (i == sorted.size() - 1) {
                r += this.source.substring(oe.endIndex);
            }
        }
        return r;
    },

    SP_listSortDesc: function () {
        var sorted = new CArrayList(); //parserElement
        var i;
        var e;
        for (i = 0; i < this.tokensE.size(); i++) {
            e = (this.tokensE.get(i));
            if (sorted.size() == 0) {
                sorted.add(e);
            }
            else {
                var index = sorted.size();
                var j;
                for (j = sorted.size() - 1; j >= 0; j--) {
                    var element = (sorted.get(j));
                    if (this.caseSensitive) {
                        if (this.compareStrings(e.text, element.text) >= 0) {
                            index = j;
                        }
                    }
                    else {
                        if (CServices.compareStringsIgnoreCase(e.text, element.text)) {
                            index = j;
                        }
                    }
                }
                sorted.insert(index, e);
            }
        }
        var r = "";
        for (i = 0; i < sorted.size(); i++) {
            e = (sorted.get(i));
            var oe = (this.tokensE.get(i));
            if (i == 0) {
                r += this.source.substring(0, oe.index);
            }
            else {
                var lastOrigE = (this.tokensE.get(i - 1));
                r += this.source.substring(lastOrigE.endIndex, oe.index);
            }
            r += this.source.substring(e.index, e.endIndex);
            if (i == sorted.size() - 1) {
                r += this.source.substring(oe.endIndex);
            }
        }
        return r;
    },

    SP_listChangeDelims: function (changeDelim) {
        var ret = "";
        if (this.defaultDelim != null) {
            var r = "";
            var i;
            for (i = 0; i < this.tokensE.size(); i++) {
                var e = (this.tokensE.get(i));
                var here = e.index - this.defaultDelim.length;
                if ((here >= 0) && this.source.substring(here, e.index) == this.defaultDelim) {
                    r += changeDelim;
                }
                else {
                    if (i == 0) {
                        r += this.source.substring(0, e.index);
                    }
                    else {
                        var lastOrigE = (this.tokensE.get(i - 1));
                        r += this.source.substring(lastOrigE.endIndex, e.index);
                    }
                }
                r += this.source.substring(e.index, e.endIndex);
                if (i == this.tokensE.size() - 1) {
                    if (this.source.substring(e.endIndex) == this.defaultDelim) {
                        r += changeDelim;
                    }
                    else {
                        r += this.source.substring(e.endIndex);
                    }
                }
            }
            ret = (r);
        }
        return ret;
    },

    SP_setStringEXP: function (newSource) {
        this.source = newSource;
        this.redoTokens();
        return "";
    },

    SP_setValueEXP: function (newSource) {
        this.source = newSource;
        this.redoTokens();
        return 0;
    },

    SP_getMD5: function () {
        return this.MD5(this.source);
    },

    MD5: function (string) {

        function RotateLeft(lValue, iShiftBits) {
            return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
        }

        function AddUnsigned(lX, lY) {
            var lX4, lY4, lX8, lY8, lResult;
            lX8 = (lX & 0x80000000);
            lY8 = (lY & 0x80000000);
            lX4 = (lX & 0x40000000);
            lY4 = (lY & 0x40000000);
            lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
            if (lX4 & lY4) {
                return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
            }
            if (lX4 | lY4) {
                if (lResult & 0x40000000) {
                    return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
                }
                else {
                    return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
                }
            }
            else {
                return (lResult ^ lX8 ^ lY8);
            }
        }

        function F(x, y, z) {
            return (x & y) | ((~x) & z);
        }

        function G(x, y, z) {
            return (x & z) | (y & (~z));
        }

        function H(x, y, z) {
            return (x ^ y ^ z);
        }

        function I(x, y, z) {
            return (y ^ (x | (~z)));
        }

        function FF(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function GG(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function HH(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function II(a, b, c, d, x, s, ac) {
            a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
            return AddUnsigned(RotateLeft(a, s), b);
        }

        function ConvertToWordArray(string) {
            var lWordCount;
            var lMessageLength = string.length;
            var lNumberOfWords_temp1 = lMessageLength + 8;
            var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
            var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
            var lWordArray = new Array(lNumberOfWords - 1);
            var lBytePosition = 0;
            var lByteCount = 0;
            while (lByteCount < lMessageLength) {
                lWordCount = (lByteCount - (lByteCount % 4)) / 4;
                lBytePosition = (lByteCount % 4) * 8;
                lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
                lByteCount++;
            }
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
            lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
            lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
            return lWordArray;
        }

        function WordToHex(lValue) {
            var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
            for (lCount = 0; lCount <= 3; lCount++) {
                lByte = (lValue >>> (lCount * 8)) & 255;
                WordToHexValue_temp = "0" + lByte.toString(16);
                WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
            }
            return WordToHexValue;
        }

        function Utf8Encode(string) {

            var utftext = "";

            for (var n = 0; n < string.length; n++) {

                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                }
                else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
                else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }

            }

            return utftext;
        }

        var x;
        var k, AA, BB, CC, DD, a, b, c, d;
        var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
        var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
        var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
        var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

        string = Utf8Encode(string);

        x = ConvertToWordArray(string);

        a = 0x67452301;
        b = 0xEFCDAB89;
        c = 0x98BADCFE;
        d = 0x10325476;

        for (k = 0; k < x.length; k += 16) {
            AA = a;
            BB = b;
            CC = c;
            DD = d;
            a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
            d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
            c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
            b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
            a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
            d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
            c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
            b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
            a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
            d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
            c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
            b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
            a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
            d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
            c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
            b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
            a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
            d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
            c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
            b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
            a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
            d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
            c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
            b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
            a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
            d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
            c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
            b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
            a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
            d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
            c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
            b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
            a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
            d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
            c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
            b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
            a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
            d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
            c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
            b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
            a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
            d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
            c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
            b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
            a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
            d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
            c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
            b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
            a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
            d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
            c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
            b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
            a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
            d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
            c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
            b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
            a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
            d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
            c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
            b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
            a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
            d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
            c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
            b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
            a = AddUnsigned(a, AA);
            b = AddUnsigned(b, BB);
            c = AddUnsigned(c, CC);
            d = AddUnsigned(d, DD);
        }

        var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
        return temp.toLowerCase();
    },

    isLetterOrDigit: function (c) {
        if (c >= 48 && c <= 57) {
            return true;
        }
        if (c >= 61 && c <= 122) {
            return true;
        }
        if (c >= 65 && c <= 90) {
            return true;
        }
        return false;
    },

    isSpaceChar: function (c) {
        return c == 32;
    },

    compareStrings: function (s1, s2) {
        var nCommon = Math.min(s1.length, s2.length);
        var n;
        var c1, c2;
        for (n = 0; n < nCommon; n++) {
            c1 = s1.charCodeAt(n);
            c2 = s2.charCodeAt(n);
            if (c1 < c2) {
                return -1;
            }
            if (c1 > c2) {
                return 1;
            }
        }
        if (s1.length < s2.length) {
            return -1;
        }
        if (s1.length > s2.length) {
            return 1;
        }
        return 0;
    }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunparser);

function CRunparserElement(t, i) {
    this.text = t;
    this.index = i;
    this.endIndex = this.index + this.text.length;
}

    

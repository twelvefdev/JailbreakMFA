//----------------------------------------------------------------------------------
//
// CRunKcArray: array object
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
CRunKcArray.ARRAY_GLOBAL = 0x0008;
CRunKcArray.ARRAY_TYPENUM = 0x0001;
CRunKcArray.ARRAY_TYPETXT = 0x0002;
CRunKcArray.INDEX_BASE1 = 0x0004;

CRunKcArray.ACT_SETINDEXA = 0;
CRunKcArray.ACT_SETINDEXB = 1;
CRunKcArray.ACT_SETINDEXC = 2;
CRunKcArray.ACT_ADDINDEXA = 3;
CRunKcArray.ACT_ADDINDEXB = 4;
CRunKcArray.ACT_ADDINDEXC = 5;
CRunKcArray.ACT_WRITEVALUE = 6;
CRunKcArray.ACT_WRITESTRING = 7;
CRunKcArray.ACT_CLEARARRAY = 8;
CRunKcArray.ACT_LOAD = 9;
CRunKcArray.ACT_LOADSELECTOR = 10;
CRunKcArray.ACT_SAVE = 11;
CRunKcArray.ACT_SAVESELECTOR = 12;
CRunKcArray.ACT_WRITEVALUEX = 13;
CRunKcArray.ACT_WRITEVALUEXY = 14;
CRunKcArray.ACT_WRITEVALUEXYZ = 15;
CRunKcArray.ACT_WRITESTRINGX = 16;
CRunKcArray.ACT_WRITESTRINGXY = 17;
CRunKcArray.ACT_WRITESTRINGXYZ = 18;

CRunKcArray.CND_INDEXAEND = 0;
CRunKcArray.CND_INDEXBEND = 1;
CRunKcArray.CND_INDEXCEND = 2;

CRunKcArray.EXP_INDEXA = 0;
CRunKcArray.EXP_INDEXB = 1;
CRunKcArray.EXP_INDEXC = 2;
CRunKcArray.EXP_READVALUE = 3;
CRunKcArray.EXP_READSTRING = 4;
CRunKcArray.EXP_READVALUEX = 5;
CRunKcArray.EXP_READVALUEXY = 6;
CRunKcArray.EXP_READVALUEXYZ = 7;
CRunKcArray.EXP_READSTRINGX = 8;
CRunKcArray.EXP_READSTRINGXY = 9;
CRunKcArray.EXP_READSTRINGXYZ = 10;
CRunKcArray.EXP_DIMX = 11;
CRunKcArray.EXP_DIMY = 12;
CRunKcArray.EXP_DIMZ = 13;

function CRunKcArray() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.pArray = null;
}

CRunKcArray.prototype = {
    //fusion
    getNumberOfConditions: function () {
        return 3;
    },

    createRunObject: function (file, cob, version) {
        var rhPtr = this.ho.hoAdRunHeader;

        var lDimensionX = file.readAInt();
        var lDimensionY = file.readAInt();
        var lDimensionZ = file.readAInt();
        var lFlags = file.readAInt();

        //build the data
        var pData = null;
        if ((lFlags & CRunKcArray.ARRAY_GLOBAL) != 0) {
            //global array
            var pExtData = rhPtr.getStorage(this.ho.hoIdentifier);

            //do we have existing storage (globally) for this array
            if (pExtData == null) {
                //first global object of this type
                this.pArray = new CRunKcArrayData(lFlags, lDimensionX, lDimensionY, lDimensionZ);
                pData = new CRunKcArrayCGlobalDataList();
                pData.AddObject(this);
                rhPtr.addStorage(pData, this.ho.hoIdentifier);
            } else {
                pData = pExtData;

                //check for shared data
                var found = pData.FindObject(this.ho.hoOiList.oilName);
                if (found != null) {
                    //found array object of same name
                    this.pArray = found; //share data
                } else {
                    this.pArray = new CRunKcArrayData(lFlags, lDimensionX, lDimensionY, lDimensionZ);
                    pData.AddObject(this);
                }
            }
        } else {
            //local array
            this.pArray = new CRunKcArrayData(lFlags, lDimensionX, lDimensionY, lDimensionZ);
        }
        return true;
    },

    condition: function (num, cnd) {
        switch (num) {
            case CRunKcArray.CND_INDEXAEND:
                return this.conditionEndIndexA();
            case CRunKcArray.CND_INDEXBEND:
                return this.conditionEndIndexB();
            case CRunKcArray.CND_INDEXCEND:
                return this.conditionEndIndexC();
        }
        return false;
    },

    action: function (num, act) {
        switch (num) {
            case CRunKcArray.ACT_SETINDEXA:
                this.actionSetIndexA(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_SETINDEXB:
                this.actionSetIndexB(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_SETINDEXC:
                this.actionSetIndexC(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_ADDINDEXA:
                this.actionIncIndexA();
                break;
            case CRunKcArray.ACT_ADDINDEXB:
                this.actionIncIndexB();
                break;
            case CRunKcArray.ACT_ADDINDEXC:
                this.actionIncIndexC();
                break;
            case CRunKcArray.ACT_WRITEVALUE:
                this.actionWriteValue(act.getParamExpression(this.rh, 0));
                break;
            case CRunKcArray.ACT_WRITESTRING:
                this.actionWriteString(act.getParamExpString(this.rh, 0));
                break;
            case CRunKcArray.ACT_CLEARARRAY:
                this.actionClearArray();
                break;
            case CRunKcArray.ACT_LOAD:
                this.actionLoad(act.getParamFilename(this.rh, 0));
                break;
            case CRunKcArray.ACT_LOADSELECTOR:
                break;
            case CRunKcArray.ACT_SAVE:
                this.actionSave(act.getParamFilename(this.rh, 0));
                break;
            case CRunKcArray.ACT_SAVESELECTOR:
                break;
            case CRunKcArray.ACT_WRITEVALUEX:
                this.actionWriteValueX(act.getParamExpression(this.rh, 0),
                    act.getParamExpression(this.rh, 1));
                break;
            case CRunKcArray.ACT_WRITEVALUEXY:
                this.actionWriteValueXY(act.getParamExpression(this.rh, 0),
                    act.getParamExpression(this.rh, 1),
                    act.getParamExpression(this.rh, 2));
                break;
            case CRunKcArray.ACT_WRITEVALUEXYZ:
                this.actionWriteValueXYZ(act.getParamExpression(this.rh, 0),
                    act.getParamExpression(this.rh, 1),
                    act.getParamExpression(this.rh, 2),
                    act.getParamExpression(this.rh, 3));
                break;
            case CRunKcArray.ACT_WRITESTRINGX:
                this.actionWriteStringX(act.getParamExpString(this.rh, 0),
                    act.getParamExpression(this.rh, 1));
                break;
            case CRunKcArray.ACT_WRITESTRINGXY:
                this.actionWriteStringXY(act.getParamExpString(this.rh, 0),
                    act.getParamExpression(this.rh, 1),
                    act.getParamExpression(this.rh, 2));
                break;
            case CRunKcArray.ACT_WRITESTRINGXYZ:
                this.actionWriteStringXYZ(act.getParamExpString(this.rh, 0),
                    act.getParamExpression(this.rh, 1),
                    act.getParamExpression(this.rh, 2),
                    act.getParamExpression(this.rh, 3));
                break;
        }
    },

    expression: function (num) {
        switch (num) {
            case CRunKcArray.EXP_INDEXA:
                return this.expressionIndexA();
            case CRunKcArray.EXP_INDEXB:
                return this.expressionIndexB();
            case CRunKcArray.EXP_INDEXC:
                return this.expressionIndexC();
            case CRunKcArray.EXP_READVALUE:
                return this.expressionReadValue();
            case CRunKcArray.EXP_READSTRING:
                return this.expressionReadString();
            case CRunKcArray.EXP_READVALUEX:
                return this.expressionReadValueX(this.ho.getExpParam());
            case CRunKcArray.EXP_READVALUEXY:
                return this.expressionReadValueXY(this.ho.getExpParam(),
                    this.ho.getExpParam());
            case CRunKcArray.EXP_READVALUEXYZ:
                return this.expressionReadValueXYZ(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
            case CRunKcArray.EXP_READSTRINGX:
                return this.expressionReadStringX(this.ho.getExpParam());
            case CRunKcArray.EXP_READSTRINGXY:
                return this.expressionReadStringXY(this.ho.getExpParam(),
                    this.ho.getExpParam());
            case CRunKcArray.EXP_READSTRINGXYZ:
                return this.expressionReadStringXYZ(this.ho.getExpParam(),
                    this.ho.getExpParam(),
                    this.ho.getExpParam());
            case CRunKcArray.EXP_DIMX:
                return this.expressionDimX();
            case CRunKcArray.EXP_DIMY:
                return this.expressionDimY();
            case CRunKcArray.EXP_DIMZ:
                return this.expressionDimZ();
        }
        return 0;
    },

    //internal
    _readValue: function (x, y, z) {
        var result = 0;

        //x y z should be fixed for 1-based, if so
        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPENUM) != 0 && x >= 0 && y >= 0 && z >= 0 && x < this.pArray.lDimensionX && y < this.pArray.lDimensionY && z < this.pArray.lDimensionZ) {
            var position = z * this.pArray.lDimensionY * this.pArray.lDimensionX + y * this.pArray.lDimensionX + x;
            result = this.pArray.numberArray[position];
        }

        return result;
    },

    _readString: function (x, y, z) {
        var result = 0;

        //x y z should be fixed for 1-based, if so
        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPETXT) != 0 && x >= 0 && y >= 0 && z >= 0 && x < this.pArray.lDimensionX && y < this.pArray.lDimensionY && z < this.pArray.lDimensionZ) {
            var position = z * this.pArray.lDimensionY * this.pArray.lDimensionX + y * this.pArray.lDimensionX + x;
            result = this.pArray.stringArray[position];
        }

        //fix null string value
        if (result == null) {
            return "";
        } else {
            return result;
        }
    },

    _writeValue: function (value, x, y, z) {
        //x,y,z should be fixed for 1-based index if used before this function
        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPENUM) != 0 && x >= 0 && y >= 0 && z >= 0) {
            //expand the array if we need
            if (x >= this.pArray.lDimensionX || y >= this.pArray.lDimensionY || z >= this.pArray.lDimensionZ) {
                this.pArray.expand(Math.max(this.pArray.lDimensionX, x + 1), Math.max(this.pArray.lDimensionY, y + 1), Math.max(this.pArray.lDimensionZ, z + 1));
            }

            //write
            this.pArray.lIndexA = x;
            this.pArray.lIndexB = y;
            this.pArray.lIndexC = z;
            this.pArray.numberArray[z * this.pArray.lDimensionY * this.pArray.lDimensionX + y * this.pArray.lDimensionX + x] = value;
        }
    },

    _writeString: function (value, x, y, z) {
        //x,y,z should be fixed for 1-based index if used before this function
        if ((this.pArray.lFlags & CRunKcArray.ARRAY_TYPETXT) != 0 && x >= 0 && y >= 0 && z >= 0) {
            //expand the array if we need
            if (x >= this.pArray.lDimensionX || y >= this.pArray.lDimensionY || z >= this.pArray.lDimensionZ) {
                this.pArray.expand(Math.max(this.pArray.lDimensionX, x + 1), Math.max(this.pArray.lDimensionY, y + 1), Math.max(this.pArray.lDimensionZ, z + 1));
            }

            //write
            this.pArray.lIndexA = x;
            this.pArray.lIndexB = y;
            this.pArray.lIndexC = z;
            this.pArray.stringArray[z * this.pArray.lDimensionY * this.pArray.lDimensionX + y * this.pArray.lDimensionX + x] = value;
        }
    },

    //conditions
    conditionEndIndexA: function () {
        if (this.pArray.lIndexA >= this.pArray.lDimensionX - 1) {
            return true;
        }
        return false;
    },

    conditionEndIndexB: function () {
        if (this.pArray.lIndexB >= this.pArray.lDimensionY - 1) {
            return true;
        }
        return false;
    },

    conditionEndIndexC: function () {
        if (this.pArray.lIndexC >= this.pArray.lDimensionZ - 1) {
            return true;
        }
        return false;
    },

    //actions
    actionSetIndexA: function (i) {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0) {
            this.pArray.lIndexA = i - 1;
        }
        else {
            this.pArray.lIndexA = i;
        }
    },

    actionSetIndexB: function (i) {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0) {
            this.pArray.lIndexB = i - 1;
        }
        else {
            this.pArray.lIndexB = i;
        }
    },

    actionSetIndexC: function (i) {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0) {
            this.pArray.lIndexC = i - 1;
        }
        else {
            this.pArray.lIndexC = i;
        }
    },

    actionIncIndexA: function () {
        this.pArray.lIndexA++;
    },

    actionIncIndexB: function () {
        this.pArray.lIndexB++;
    },

    actionIncIndexC: function () {
        this.pArray.lIndexC++;
    },

    actionWriteValue: function (value) {
        this._writeValue(value, this.pArray.lIndexA, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    actionWriteString: function (value) {
        this._writeString(value, this.pArray.lIndexA, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    actionClearArray: function () {
        this.pArray.clean(false);
    },

    actionWriteValueX: function (value, x) {
        x -= this.pArray.oneBased();
        this._writeValue(value, x, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    actionWriteValueXY: function (value, x, y) {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        this._writeValue(value, x, y, this.pArray.lIndexC);
    },

    actionWriteValueXYZ: function (value, x, y, z) {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        z -= this.pArray.oneBased();
        this._writeValue(value, x, y, z);
    },

    actionWriteStringX: function (value, x) {
        x -= this.pArray.oneBased();
        this._writeString(value, x, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    actionWriteStringXY: function (value, x, y) {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        this._writeString(value, x, y, this.pArray.lIndexC);
    },

    actionWriteStringXYZ: function (value, x, y, z) {
        x -= this.pArray.oneBased();
        y -= this.pArray.oneBased();
        z -= this.pArray.oneBased();
        this._writeString(value, x, y, z);
    },

    actionSave: function (name) {
        var dimX = this.pArray.lDimensionX;
        var dimY = this.pArray.lDimensionY;
        var dimZ = this.pArray.lDimensionZ;
        var flags = this.pArray.lFlags;

        var text = "UWP ARRAY";
        text += flags.toString() + CIni.separator;
        text += dimX.toString() + CIni.separator;
        text += dimY.toString() + CIni.separator;
        text += dimZ.toString() + CIni.separator;

        var z, y, x;
        if (flags & CRunKcArray.ARRAY_TYPENUM) {
            for (z = 0; z < dimZ; z++) {
                for (y = 0; y < dimY; y++) {
                    for (x = 0; x < dimX; x++) {
                        text += this.pArray.numberArray[z * dimY * dimX + y * dimX + x].toString() + CIni.separator;
                    }
                }
            }
        } else if (CRunKcArray.ARRAY_TYPETXT) {
            for (z = 0; z < dimZ; z++) {
                for (y = 0; y < dimY; y++) {
                    for (x = 0; x < dimX; x++) {
                        text += this.pArray.stringArray[z * dimY * dimX + y * dimX + x] + CIni.separator;
                    }
                }
            }
        }

        //let app save it
        this.rh.rhApp.saveFile(name, text);
    },

    actionLoad: function (name) {
        //open file for reading
        var file = this.rh.rhApp.openFile(name, false);

        var x, y, z;
        if (file != null) {
            //lets see if we are loading string format or binary format
            var header = file.readAString(9);

            //what type of file are we reading?
            switch (header) {
                case "UWP ARRAY":
                    var text = file.readAString(null, true);

                    var flags, begin = 0, end;
                    var dimX, dimY, dimZ;

                    end = text.indexOf(CIni.separator, 0);
                    flags = parseInt(text.substring(begin, end));
                    begin = end + CIni.separator.length;

                    end = text.indexOf(CIni.separator, begin);
                    dimX = parseInt(text.substring(begin, end));
                    begin = end + CIni.separator.length;

                    end = text.indexOf(CIni.separator, begin);
                    dimY = parseInt(text.substring(begin, end));
                    begin = end + CIni.separator.length;

                    end = text.indexOf(CIni.separator, begin);
                    dimZ = parseInt(text.substring(begin, end));
                    begin = end + CIni.separator.length;

                    var z, y, x, newArray;
                    if (flags & CRunKcArray.ARRAY_TYPENUM) {
                        newArray = new Array(dimZ * dimY * dimX);
                        for (z = 0; z < dimZ; z++) {
                            for (y = 0; y < dimY; y++) {
                                for (x = 0; x < dimX; x++) {
                                    end = text.indexOf(CIni.separator, begin);
                                    newArray[z * dimY * dimX + y * dimX + x] = parseInt(text.substring(begin, end));
                                    begin = end + CIni.separator.length;
                                }
                            }
                        }
                        //if no try error thus far
                        if (flags != this.pArray.lFlags || dimX != this.pArray.lDimensionX || dimY != this.pArray.lDimensionY || dimZ != this.pArray.lDimensionZ) {
                            this.pArray.lFlags = flags;
                            this.pArray.lDimensionX = dimX;
                            this.pArray.lDimensionY = dimY;
                            this.pArray.lDimensionZ = dimZ;
                            this.pArray.lIndexA = 0;
                            this.pArray.lIndexB = 0;
                            this.pArray.lIndexC = 0;
                        }

                        this.pArray.numberArray = newArray;
                    } else if (CRunKcArray.ARRAY_TYPETXT) {
                        newArray = new Array(dimZ * dimY * dimX);
                        for (z = 0; z < dimZ; z++) {
                            for (y = 0; y < dimY; y++) {
                                for (x = 0; x < dimX; x++) {
                                    end = text.indexOf(CIni.separator, begin);
                                    newArray[z * dimY * dimX + y * dimX + x] = text.substring(begin, end);
                                    begin = end + CIni.separator.length;
                                }
                            }
                        }
                        //if no try error thus far
                        if (flags != this.pArray.lFlags || dimX != this.pArray.lDimensionX || dimY != this.pArray.lDimensionY || dimZ != this.pArray.lDimensionZ) {
                            this.pArray.lFlags = flags;
                            this.pArray.lDimensionX = dimX;
                            this.pArray.lDimensionY = dimY;
                            this.pArray.lDimensionZ = dimZ;
                            this.pArray.lIndexA = 0;
                            this.pArray.lIndexB = 0;
                            this.pArray.lIndexC = 0;
                        }
                        this.pArray.stringArray = newArray;
                    }
                    break;

                case "CNC ARRAY":
                case "MFU ARRAY":
                    file.setUnicode(true);
                    var newArray;
                    file.skipBytes(1);

                    var version = file.readAShort();
                    var revision = file.readAShort();
                    if (((version == 1) || (version == 2)) && (revision == 0)) {
                        var dimX = file.readAInt();
                        var dimY = file.readAInt();
                        var dimZ = file.readAInt();
                        var flags = file.readAInt();
                        //header read
                        if ((dimX >= 0) && (dimY >= 0) && (dimZ >= 0)) {
                            if ((flags & CRunKcArray.ARRAY_TYPENUM) != 0) {
                                newArray = new Array(dimZ * dimY * dimX);

                                for (z = 0; z < dimZ; z++) {
                                    for (y = 0; y < dimY; y++) {
                                        for (x = 0; x < dimX; x++) {
                                            newArray[z * dimY * dimX + y * dimX + x] = file.readAInt();
                                        }
                                    }
                                }

                                //if no try error thus far
                                if (flags != this.pArray.lFlags || dimX != this.pArray.lDimensionX || dimY != this.pArray.lDimensionY || dimZ != this.pArray.lDimensionZ) {
                                    this.pArray.lFlags = flags;
                                    this.pArray.lDimensionX = dimX;
                                    this.pArray.lDimensionY = dimY;
                                    this.pArray.lDimensionZ = dimZ;
                                    this.pArray.lIndexA = 0;
                                    this.pArray.lIndexB = 0;
                                    this.pArray.lIndexC = 0;
                                }
                                this.pArray.numberArray = newArray;
                                //fin
                            }
                            else if ((flags & CRunKcArray.ARRAY_TYPETXT) != 0) {
                                newArray = new Array(dimZ * dimY * dimX);
                                for (z = 0; z < dimZ; z++) {
                                    for (y = 0; y < dimY; y++) {
                                        for (x = 0; x < dimX; x++) {
                                            var length = file.readAInt();
                                            if (length > 0) {
                                                newArray[z * dimY * dimX + y * dimX + x] = file.readAString(length);
                                            }
                                        }
                                    }
                                }
                                //if no try error thus far
                                if (flags != this.pArray.lFlags || dimX != this.pArray.lDimensionX || dimY != this.pArray.lDimensionY || dimZ != this.pArray.lDimensionZ) {
                                    this.pArray.lFlags = flags;
                                    this.pArray.lDimensionX = dimX;
                                    this.pArray.lDimensionY = dimY;
                                    this.pArray.lDimensionZ = dimZ;
                                    this.pArray.lIndexA = 0;
                                    this.pArray.lIndexB = 0;
                                    this.pArray.lIndexC = 0;
                                }
                                this.pArray.stringArray = newArray;
                                //fin
                            }
                        }
                    }
                    break;
            }
        }
    },

    //expressions
    expressionIndexA: function () {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0) {
            return (this.pArray.lIndexA + 1);
        }
        else {
            return (this.pArray.lIndexA);
        }
    },

    expressionIndexB: function () {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0) {
            return (this.pArray.lIndexB + 1);
        }
        else {
            return (this.pArray.lIndexB);
        }
    },

    expressionIndexC: function () {
        if ((this.pArray.lFlags & CRunKcArray.INDEX_BASE1) != 0) {
            return (this.pArray.lIndexC + 1);
        }
        else {
            return (this.pArray.lIndexC);
        }
    },

    expressionReadValue: function () {
        return this._readValue(this.pArray.lIndexA, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    expressionReadString: function () {
        return this._readString(this.pArray.lIndexA, this.pArray.lIndexB, this.pArray.lIndexC);
    },

    expressionReadValueX: function (x) {
        return this._readValue(x - this.pArray.oneBased(), this.pArray.lIndexB, this.pArray.lIndexC);
    },

    expressionReadValueXY: function (x, y) {
        return this._readValue(x - this.pArray.oneBased(), y - this.pArray.oneBased(), this.pArray.lIndexC);
    },

    expressionReadValueXYZ: function (x, y, z) {
        return this._readValue(x - this.pArray.oneBased(), y - this.pArray.oneBased(), z - this.pArray.oneBased());
    },

    expressionReadStringX: function (x) {
        return this._readString(x - this.pArray.oneBased(), this.pArray.lIndexB, this.pArray.lIndexC);
    },

    expressionReadStringXY: function (x, y) {
        return this._readString(x - this.pArray.oneBased(), y - this.pArray.oneBased(), this.pArray.lIndexC);
    },

    expressionReadStringXYZ: function (x, y, z) {
        return this._readString(x - this.pArray.oneBased(), y - this.pArray.oneBased(), z - this.pArray.oneBased());
    },

    expressionDimX: function () {
        return (this.pArray.lDimensionX);
    },

    expressionDimY: function () {
        return (this.pArray.lDimensionY);
    },

    expressionDimZ: function () {
        return (this.pArray.lDimensionZ);
    }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunKcArray);

//helper global data
function CRunKcArrayCGlobalDataList() {
    this.dataList = new CArrayList();
    this.names = new CArrayList();
}

CRunKcArrayCGlobalDataList.prototype = {
    FindObject: function (objectName) {
        var i;
        for (i = 0; i < this.names.size() ; i++) {
            var s = this.names.get(i);
            if (s == objectName) {
                return this.dataList.get(i);
            }
        }
        return null;
    },

    AddObject: function (o) {
        this.dataList.add(o.pArray);
        this.names.add(o.ho.hoOiList.oilName);
    }
}

//helper array container
function CRunKcArrayData(flags, dimX, dimY, dimZ) {
    this.lIndexA = 0;
    this.lIndexB = 0;
    this.lIndexC = 0;
    dimX = Math.max(1, dimX);
    dimY = Math.max(1, dimY);
    dimZ = Math.max(1, dimZ);

    this.lFlags = flags;
    this.lDimensionX = dimX;
    this.lDimensionY = dimY;
    this.lDimensionZ = dimZ;
    var n;

    //prepare arrays for first time
    this.clean(true);
}

CRunKcArrayData.prototype = {
    oneBased: function () {
        if ((this.lFlags & 0x0004) != 0)     // INDEX_BASE1
        {
            return 1;
        }
        return 0;
    },

    expand: function (newX, newY, newZ) {
        //inputs should always be equal or larger than current dimensions
        var oldX = this.lDimensionX;
        var oldY = this.lDimensionY;
        var oldZ = this.lDimensionZ;
        var oldTotal = oldX * oldY * oldZ;
        var newTotal = newX * newY * newZ;
        var x, y, z;

        //get array pointers
        var oldArray;
        var nullValue;

        if ((this.lFlags & 0x0001) != 0) {
            //ARRAY_TYPENUM
            oldArray = this.numberArray;
            nullValue = 0;
        } else {
            //ARRAY_TYPETXT
            oldArray = this.stringArray;
            nullValue = null;
        }

        var newArray = new Array(newTotal).fill(nullValue);

        //copy old data
        for (z = 0; z < oldZ; z++) {
            for (y = 0; y < oldY; y++) {
                for (x = 0; x < oldX; x++) {
                    newArray[z * newY * newX + y * newX + x] = oldArray[z * oldY * oldX + y * oldX + x];
                }
            }
        }

        //update array pointers
        if ((this.lFlags & 0x0001) != 0) {
            //ARRAY_TYPENUM
            this.numberArray = newArray;
        } else {
            //ARRAY_TYPETXT
            this.stringArray = newArray;
        }

        //update dimensions
        this.lDimensionX = newX;
        this.lDimensionY = newY;
        this.lDimensionZ = newZ;
    },

    clean: function (nullString) {
        var total = this.lDimensionX * this.lDimensionY * this.lDimensionZ;

        if ((this.lFlags & 0x0001) != 0) {
            //ARRAY_TYPENUM
            if (this.numberArray == null) {
                this.numberArray = new Array(total);
            }

            for (index = 0; index < total; index++) {
                this.numberArray[index] = 0;
            }

        } else if ((this.lFlags & 0x0002) != 0) {
            //ARRAY_TYPETXT
            if (this.stringArray == null) {
                this.stringArray = new Array(total);
            }

            //check what format string should have
            if (nullString) {
                //null
                for (index = 0; index < total; index++) {
                    this.stringArray[index] = null;
                }
            } else {
                //empty string
                for (index = 0; index < total; index++) {
                    this.stringArray[index] = "";
                }
            }
        }
    }
}


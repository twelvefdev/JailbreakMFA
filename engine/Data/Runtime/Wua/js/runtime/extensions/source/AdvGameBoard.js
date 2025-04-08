//----------------------------------------------------------------------------------
//
// CRunAdvGameBoard : Advanced Game Board object
//
//----------------------------------------------------------------------------------
CRunAdvGameBoard.MOORECEPIENT_CHANNEL = -1;

CRunAdvGameBoard.CID_conOnFoundConnected = 0;
CRunAdvGameBoard.CID_conOnFoundBrick = 1;
CRunAdvGameBoard.CID_conOnFoundLooped = 2;
CRunAdvGameBoard.CID_conOnNoFoundConnected = 3;
CRunAdvGameBoard.CID_conBrickCanFallUp = 4;
CRunAdvGameBoard.CID_conBrickCanFallDown = 5;
CRunAdvGameBoard.CID_conBrickCanFallLeft = 6;
CRunAdvGameBoard.CID_conBrickCanFallRight = 7;
CRunAdvGameBoard.CID_conOnBrickMoved = 8;
CRunAdvGameBoard.CID_conOnBrickDeleted = 9;
CRunAdvGameBoard.CID_conIsEmpty = 10;

CRunAdvGameBoard.AID_actSetBrick = 0;
CRunAdvGameBoard.AID_actClear = 1;
CRunAdvGameBoard.AID_actSetBoadSize = 2;
CRunAdvGameBoard.AID_actSetMinConnected = 3;
CRunAdvGameBoard.AID_actSearchHorizontal = 4;
CRunAdvGameBoard.AID_actSearchVertical = 5;
CRunAdvGameBoard.AID_actSearchDiagonalsLR = 6;
CRunAdvGameBoard.AID_actSearchConnected = 7;
CRunAdvGameBoard.AID_actDeleteHorizonal = 8;
CRunAdvGameBoard.AID_actDeleteVertical = 9;
CRunAdvGameBoard.AID_actSwap = 10;
CRunAdvGameBoard.AID_actDropX = 11;
CRunAdvGameBoard.AID_actDropOne = 12;
CRunAdvGameBoard.AID_actMarkUsed = 13;
CRunAdvGameBoard.AID_actDeleteMarked = 14;
CRunAdvGameBoard.AID_actUndoSwap = 15;
CRunAdvGameBoard.AID_actSearchDiagonalsRL = 16;
CRunAdvGameBoard.AID_actLoopFoundBricks = 17;
CRunAdvGameBoard.AID_actSetFixedOfBrick = 18;
CRunAdvGameBoard.AID_actImportActives = 19;
CRunAdvGameBoard.AID_actMarkCurrentSystem = 20;
CRunAdvGameBoard.AID_actMarkCurrentBrick = 21;
CRunAdvGameBoard.AID_actLoopEntireBoard = 22;
CRunAdvGameBoard.AID_actLoopBoardOfType = 23;
CRunAdvGameBoard.AID_actLoopSorrounding = 24;
CRunAdvGameBoard.AID_actLoopHozLine = 25;
CRunAdvGameBoard.AID_actLoopVerLine = 26;
CRunAdvGameBoard.AID_actClearWithType = 27;
CRunAdvGameBoard.AID_actInsertBrick = 28;
CRunAdvGameBoard.AID_actSetOrigin = 29;
CRunAdvGameBoard.AID_actSetCellDimensions = 30;
CRunAdvGameBoard.AID_actMoveFixedON = 31;
CRunAdvGameBoard.AID_actMoveFixedOFF = 32;
CRunAdvGameBoard.AID_actMoveBrick = 33;
CRunAdvGameBoard.AID_actDropOneUp = 34;
CRunAdvGameBoard.AID_actDropOneLeft = 35;
CRunAdvGameBoard.AID_actDropOneRight = 36;
CRunAdvGameBoard.AID_actDropXUp = 37;
CRunAdvGameBoard.AID_actDropXLeft = 38;
CRunAdvGameBoard.AID_actDropXRight = 39;
CRunAdvGameBoard.AID_actSetCellValue = 40;
CRunAdvGameBoard.AID_actDeleteBrick = 41;
CRunAdvGameBoard.AID_actShiftHosLine = 42;
CRunAdvGameBoard.AID_actShiftVerLine = 43;
CRunAdvGameBoard.AID_actPositionBricks = 44;

CRunAdvGameBoard.EID_expGetBrickAt = 0;
CRunAdvGameBoard.EID_expGetXSize = 1;
CRunAdvGameBoard.EID_expGetYSize = 2;
CRunAdvGameBoard.EID_expGetNumBricksInSystem = 3;
CRunAdvGameBoard.EID_expGetXofBrick = 4;
CRunAdvGameBoard.EID_expGetYofBrick = 5;
CRunAdvGameBoard.EID_expGetFoundBrickType = 6;
CRunAdvGameBoard.EID_expGetNumBricksInHozLine = 7;
CRunAdvGameBoard.EID_expGetNumBricksInVerLine = 8;
CRunAdvGameBoard.EID_expCountSorrounding = 9;
CRunAdvGameBoard.EID_expCountTotal = 10;
CRunAdvGameBoard.EID_expGetFoundBrickFixed = 11;
CRunAdvGameBoard.EID_expGetFoundXofBrick = 12;
CRunAdvGameBoard.EID_expGetFoundYofBrick = 13;
CRunAdvGameBoard.EID_expGetTypeofBrick = 14;
CRunAdvGameBoard.EID_expGetFixedOfBrick = 15;
CRunAdvGameBoard.EID_expGetFixedAt = 16;
CRunAdvGameBoard.EID_expLoopIndex = 17;
CRunAdvGameBoard.EID_expFindXfromFixed = 18;
CRunAdvGameBoard.EID_expFindYfromFixed = 19;
CRunAdvGameBoard.EID_expFindBrickfromFixed = 20;
CRunAdvGameBoard.EID_expGetLoopFoundXofBrick = 21;
CRunAdvGameBoard.EID_expGetLoopFoundYofBrick = 22;
CRunAdvGameBoard.EID_expGetLoopTypeofBrick = 23;
CRunAdvGameBoard.EID_expGetLoopFoundBrickFixed = 24;
CRunAdvGameBoard.EID_expLoopIndex = 25;
CRunAdvGameBoard.EID_expGetXbrickFromX = 26;
CRunAdvGameBoard.EID_expGetYBrickFromY = 27;
CRunAdvGameBoard.EID_expSnapXtoGrid = 28;
CRunAdvGameBoard.EID_expSnapYtoGrid = 29;
CRunAdvGameBoard.EID_expGetOriginX = 30;
CRunAdvGameBoard.EID_expGetOriginY = 31;
CRunAdvGameBoard.EID_expGetCellWidth = 32;
CRunAdvGameBoard.EID_expGetCellHeight = 33;
CRunAdvGameBoard.EID_expGetCellValue = 34;
CRunAdvGameBoard.EID_expGetXofCell = 35;
CRunAdvGameBoard.EID_expGetYofCell = 36;
CRunAdvGameBoard.EID_expMovedFixed = 37;
CRunAdvGameBoard.EID_expMovedNewX = 38;
CRunAdvGameBoard.EID_expMovedNewY = 39;
CRunAdvGameBoard.EID_expMovedOldX = 40;
CRunAdvGameBoard.EID_expMovedOldY = 41;
CRunAdvGameBoard.EID_expDeletedFixed = 42;
CRunAdvGameBoard.EID_expDeletedX = 43;
CRunAdvGameBoard.EID_expDeletedY = 44;

this.AdvGameBoard = CRunAdvGameBoard;

function CRunAdvGameBoard() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.BSizeX = 0;
    this.BSizeY = 0;
    this.MinConnected = 0;
    this.SwapBrick1 = 0;
    this.SwapBrick2 = 0;
    this.LoopIndex = 0;
    this.LoopedIndex = 0;
    this.OriginX = 0;
    this.OriginY = 0;
    this.CellWidth = 0;
    this.CellHeight = 0;
    this.Board = null;
    this.StateBoard = null;
    this.FixedBoard = null;
    this.CellValues = null;
    this.MoveFixed = false;
    this.TriggerMoved = false;
    this.TriggerDeleted = false;
    this.DeletedFixed = 0;
    this.DeletedX = 0;
    this.DeletedY = 0;
    this.MovedFixed = 0;
    this.MovedNewX = 0;
    this.MovedNewY = 0;
    this.MovedOldX = 0;
    this.MovedOldY = 0;
    this.AddIncrement = 0;
    this.SearchBrickType = 0;
    this.Bricks = new CArrayList();
    this.Looped = new CArrayList();
}

CRunAdvGameBoard.prototype = {
        getNumberOfConditions: function () {
            return 11;
        },

        createRunObject: function (file, cob, version) {
            file.skipBytes(8);
            this.BSizeX = file.readAInt();
            this.BSizeY = file.readAInt();
            this.MinConnected = file.readAInt();
            this.SwapBrick1 = 0;
            this.SwapBrick2 = 0;
            this.LoopIndex = 0;
            this.LoopedIndex = 0;

            var size = this.BSizeX * this.BSizeY;
            this.Board = new Array(size);
            this.StateBoard = new Array(size);
            this.FixedBoard = new Array(size);
            this.CellValues = new Array(size);
            var i;
            for (i = 0; i < size; i++) {
                this.Board[i] = 0;
                this.StateBoard[i] = 0;
                this.FixedBoard[i] = 0;
                this.CellValues[i] = 0;
            }

            this.OriginX = file.readAInt();
            this.OriginY = file.readAInt();
            this.CellWidth = file.readAInt();
            this.CellHeight = file.readAInt();
            this.MoveFixed = (file.readAByte() != 0) ? true : false;
            this.TriggerMoved = (file.readAByte() != 0) ? true : false;
            this.TriggerDeleted = (file.readAByte() != 0) ? true : false;

            this.DeletedFixed = -1;
            this.DeletedX = -1;
            this.DeletedY = -1;

            this.MovedFixed = -1;
            this.MovedNewX = -1;
            this.MovedNewY = -1;

            this.MovedOldX = -1;
            this.MovedOldY = -1;

            return true;
        },

        getBrick: function (x, y) {
            if ((x < this.BSizeX) && (x >= 0) && (y < this.BSizeY) && (y >= 0)) {
                return this.Board[this.BSizeX * y + x];
            }
            else {
                return -1;
            }
        },

        getBrickAtPos: function (pos) {
            if (this.CHECKPOS(pos)) {
                return this.Board[pos];
            }
            return 0;
        },

        CHECKPOS: function (nPos) {
            if (nPos >= 0 && nPos < this.BSizeX * this.BSizeY) {
                return true;
            }
            return false;
        },

        getPos: function (x, y) {
            if ((x < this.BSizeX) && (x >= 0) && (y < this.BSizeY) && (y >= 0)) {
                return this.BSizeX * y + x;
            }
            else {
                return -1;
            }
        },

        getXbrick: function (pos) {
            return CServices.floatToInt(pos % this.BSizeX);
        },

        getYbrick: function (pos) {
            return CServices.floatToInt(pos / this.BSizeX);
        },

        setBrick: function (x, y, value) {
            if (this.CHECKPOS(this.getPos(x, y))) {
                this.Board[this.getPos(x, y)] = value;
            }
        },

        getFixed: function (x, y) {
            if ((x < this.BSizeX) && (x >= 0) && (y < this.BSizeY) && (y >= 0)) {
                return this.FixedBoard[this.BSizeX * y + x];
            }
            else {
                return -1;
            }
        },

        setFixed: function (x, y, value) {
            if (this.CHECKPOS(this.getPos(x, y))) {
                this.FixedBoard[this.getPos(x, y)] = value;
            }
        },

        wrapX: function (shift) {
            return (shift >= 0) ? (shift % this.BSizeX) : this.BSizeX + (shift % this.BSizeX);
        },

        wrapY: function (shift) {
            return (shift >= 0) ? (shift % this.BSizeY) : this.BSizeY + (shift % this.BSizeY);
        },

        MoveBrick: function (sourceX, sourceY, destX, destY) {
            if ((this.getPos(destX, destY) != -1) && (this.getPos(sourceX, sourceY) != -1)) {
                var triggerdeletedflag = false;
                var triggermovedflag = false;

                if (this.TriggerMoved) {
                    this.MovedFixed = this.getFixed(sourceX, sourceY);
                    this.MovedNewX = destX;
                    this.MovedNewY = destY;
                    this.MovedOldX = sourceX;
                    this.MovedOldY = sourceY;
                    triggermovedflag = true;
                }

                if (this.TriggerDeleted && this.getBrick(destX, destY) != 0) {
                    this.DeletedFixed = this.getFixed(destX, destY);
                    this.DeletedX = destX;
                    this.DeletedY = destY;
                    triggerdeletedflag = true;
                }

                // Move the brick
                if (this.CHECKPOS(this.getPos(destX, destY)) && this.CHECKPOS(this.getPos(sourceX, sourceY))) {
                    this.Board[this.getPos(destX, destY)] = this.Board[this.getPos(sourceX, sourceY)];
                    this.Board[this.getPos(sourceX, sourceY)] = 0;

                    if (this.MoveFixed) {
                        this.FixedBoard[this.getPos(destX, destY)] = this.FixedBoard[this.getPos(sourceX, sourceY)];
                        this.FixedBoard[this.getPos(sourceX, sourceY)] = 0;
                    }
                }
                if (triggermovedflag) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickMoved, this.ho.getEventParam());
                }
                if (triggerdeletedflag) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickDeleted, this.ho.getEventParam());
                }
            }
        },

        fall: function () {
            var x, y;
            for (x = 0; x < this.BSizeX; x++) {
                for (y = this.BSizeY - 2; y >= 0; y--) {
                    if (this.getBrick(x, y + 1) == 0) {
                        this.MoveBrick(x, y, x, y + 1);
                    }
                }
            }
        },

        fallUP: function () {
            var x, y;
            for (x = 0; x < this.BSizeX; x++) {
                for (y = 1; y <= this.BSizeY - 1; y++) {
                    if (this.getBrick(x, y - 1) == 0) {
                        this.MoveBrick(x, y, x, y - 1);
                    }
                }
            }
        },

        fallLEFT: function () {
            var x, y;
            for (y = 0; y <= this.BSizeY; y++) {
                for (x = 1; x < this.BSizeX; x++) {
                    if (this.getBrick(x - 1, y) == 0) {
                        this.MoveBrick(x, y, x - 1, y);
                    }
                }
            }
        },

        fallRIGHT: function () {
            var x, y;
            for (y = 0; y <= this.BSizeY; y++) {
                for (x = this.BSizeX - 2; x >= 0; x--) {
                    if (this.getBrick(x + 1, y) == 0) {
                        this.MoveBrick(x, y, x + 1, y);
                    }
                }
            }
        },

        handleRunObject: function () {
            this.AddIncrement = 0;
            return 0;
        },

        condition: function (num, cnd) {
            switch (num) {
                case CRunAdvGameBoard.CID_conOnFoundConnected:
                    return true;
                case CRunAdvGameBoard.CID_conOnFoundBrick:
                    return true;
                case CRunAdvGameBoard.CID_conOnFoundLooped:
                    return true;
                case CRunAdvGameBoard.CID_conOnNoFoundConnected:
                    return true;
                case CRunAdvGameBoard.CID_conBrickCanFallUp:
                    return this.conBrickCanFallUp(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1));
                case CRunAdvGameBoard.CID_conBrickCanFallDown:
                    return this.conBrickCanFallDown(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1));
                case CRunAdvGameBoard.CID_conBrickCanFallLeft:
                    return this.conBrickCanFallLeft(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1));
                case CRunAdvGameBoard.CID_conBrickCanFallRight:
                    return this.conBrickCanFallRight(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1));
                case CRunAdvGameBoard.CID_conOnBrickMoved:
                    return true;
                case CRunAdvGameBoard.CID_conOnBrickDeleted:
                    return true;
                case CRunAdvGameBoard.CID_conIsEmpty:
                    return this.conIsEmpty(cnd.getParamExpression(this.rh, 0), cnd.getParamExpression(this.rh, 1));
            }
            return false;
        },

        conBrickCanFallUp: function (x, y) {
            var tempbrick = 0;
            var currentbrick = this.getBrick(x, y);
            var belowbrick = this.getBrick(x, y + 1);

            if (belowbrick == -1 || currentbrick == 0 || currentbrick == -1) {
                return false;
            }

            var i;
            for (i = y; i >= 0; i--) {
                tempbrick = this.getBrick(x, i);

                if (tempbrick == 0) {
                    return true;
                }
            }
            return false;
        },

        conBrickCanFallDown: function (x, y) {
            var tempbrick = 0;
            var currentbrick = this.getBrick(x, y);
            var belowbrick = this.getBrick(x, y + 1);

            if (belowbrick == -1 || currentbrick == 0 || currentbrick == -1) {
                return false;
            }

            var i;
            for (i = y; i <= this.BSizeY - 1; i++) {
                tempbrick = this.getBrick(x, i);

                if (tempbrick == 0) {
                    return true;
                }
            }
            return false;
        },

        conBrickCanFallLeft: function (x, y) {
            var tempbrick = 0;
            var currentbrick = this.getBrick(x, y);
            var belowbrick = this.getBrick(x - 1, y);

            if (belowbrick == -1 || currentbrick == 0 || currentbrick == -1) {
                return false;
            }

            var i;
            for (i = x; i >= 0; i--) {
                tempbrick = this.getBrick(i, y);

                if (tempbrick == 0) {
                    return true;
                }
            }
            return false;
        },

        conBrickCanFallRight: function (x, y) {
            var tempbrick = 0;
            var currentbrick = this.getBrick(x, y);
            var belowbrick = this.getBrick(x + 1, y);

            if (belowbrick == -1 || currentbrick == 0 || currentbrick == -1) {
                return false;
            }

            var i;
            for (i = x; i <= this.BSizeX - 1; i++) {
                tempbrick = this.getBrick(i, y);

                if (tempbrick == 0) {
                    return true;
                }
            }
            return false;
        },

        conIsEmpty: function (x, y) {
            if (this.getBrick(x, y) == 0) {
                return true;
            }
            else {
                return false;
            }
        },


        action: function (num, act) {
            switch (num) {
                case CRunAdvGameBoard.AID_actSetBrick:
                    this.actSetBrick(act.getParamExpression(this.rh, 0),
                        act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2));
                    break;
                case CRunAdvGameBoard.AID_actClear:
                    this.actClear();
                    break;
                case CRunAdvGameBoard.AID_actSetBoadSize:
                    this.actSetBoadSize(act.getParamExpression(this.rh, 0),
                        act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actSetMinConnected:
                    this.MinConnected = act.getParamExpression(this.rh, 0);
                    break;
                case CRunAdvGameBoard.AID_actSearchHorizontal:
                    this.actSearchHorizontal(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actSearchVertical:
                    this.actSearchVertical(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actSearchDiagonalsLR:
                    this.actSearchDiagonalsLR(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actSearchConnected:
                    this.actSearchConnected(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actDeleteHorizonal:
                    this.actDeleteHorizonal(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actDeleteVertical:
                    this.actDeleteVertical(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actSwap:
                    this.actSwap(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                    break;
                case CRunAdvGameBoard.AID_actDropX:
                    this.actDropX(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actDropOne:
                    this.fall();
                    break;
                case CRunAdvGameBoard.AID_actMarkUsed:
                    this.actMarkUsed(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actDeleteMarked:
                    this.actDeleteMarked();
                    break;
                case CRunAdvGameBoard.AID_actUndoSwap:
                    this.actUndoSwap();
                    break;
                case CRunAdvGameBoard.AID_actSearchDiagonalsRL:
                    this.actSearchDiagonalsRL(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actLoopFoundBricks:
                    this.actLoopFoundBricks();
                    break;
                case CRunAdvGameBoard.AID_actSetFixedOfBrick:
                    this.actSetFixedOfBrick(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunAdvGameBoard.AID_actImportActives:
                    this.actImportActives(act.getParamObject(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actMarkCurrentSystem:
                    this.actMarkCurrentSystem();
                    break;
                case CRunAdvGameBoard.AID_actMarkCurrentBrick:
                    this.actMarkCurrentBrick();
                    break;
                case CRunAdvGameBoard.AID_actLoopEntireBoard:
                    this.actLoopEntireBoard();
                    break;
                case CRunAdvGameBoard.AID_actLoopBoardOfType:
                    this.actLoopBoardOfType(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actLoopSorrounding:
                    this.actLoopSorrounding(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actLoopHozLine:
                    this.actLoopHozLine(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actLoopVerLine:
                    this.actLoopVerLine(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actClearWithType:
                    this.actClearWithType(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actInsertBrick:
                    this.actInsertBrick(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunAdvGameBoard.AID_actSetOrigin:
                    this.OriginX = act.getParamExpression(this.rh, 0);
                    this.OriginY = act.getParamExpression(this.rh, 1);
                    break;
                case CRunAdvGameBoard.AID_actSetCellDimensions:
                    this.actSetCellDimensions(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actMoveFixedON:
                    this.MoveFixed = true;
                    break;
                case CRunAdvGameBoard.AID_actMoveFixedOFF:
                    this.MoveFixed = false;
                    break;
                case CRunAdvGameBoard.AID_actMoveBrick:
                    this.MoveBrick(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1),
                        act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                    break;
                case CRunAdvGameBoard.AID_actDropOneUp:
                    this.fallUP();
                    break;
                case CRunAdvGameBoard.AID_actDropOneLeft:
                    this.fallLEFT();
                    break;
                case CRunAdvGameBoard.AID_actDropOneRight:
                    this.fallRIGHT();
                    break;
                case CRunAdvGameBoard.AID_actDropXUp:
                    this.actDropXUp(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actDropXLeft:
                    this.actDropXLeft(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actDropXRight:
                    this.actDropXRight(act.getParamExpression(this.rh, 0));
                    break;
                case CRunAdvGameBoard.AID_actSetCellValue:
                    this.actSetCellValue(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2));
                    break;
                case CRunAdvGameBoard.ID_actDeleteBrick:
                    this.actDeleteBrick(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actShiftHosLine:
                    this.actShiftHosLine(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actShiftVerLine:
                    this.actShiftVerLine(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
                    break;
                case CRunAdvGameBoard.AID_actPositionBricks:
                    this.actPositionBricks();
                    break;
            }
        },

        actSetBrick: function (x, y, brickType) {
            this.setBrick(x, y, brickType);
        },

        actClear: function () {
            var size = this.BSizeX * this.BSizeY;
            var i;
            for (i = 0; i < size; i++) {
                this.Board[i] = 0;
            }
        },

        actSetBoadSize: function (x, y) {
            this.BSizeX = x; //Update size
            this.BSizeY = y;
            var size = this.BSizeX * this.BSizeY;
            this.Board = new Array(size);  //Create new array
            this.StateBoard = new Array(size);
            this.FixedBoard = new Array(size);
            this.CellValues = new Array(size);
            var i;
            for (i = 0; i < size; i++) {
                this.Board[i] = 0;
                this.StateBoard[i] = 0;
                this.FixedBoard[i] = 0;
                this.CellValues[i] = 0;
            }
        },

        actSearchHorizontal: function (brickType) {
            var MinConnectedLocal = this.MinConnected;
            this.SearchBrickType = brickType;
            var SizeX = this.BSizeX;
            var SizeY = this.BSizeY;
            var Found = 0;
            this.Bricks.clear();
            var FoundTotal = 0;

            var y;
            for (y = 0; y < SizeY; y++) {
                Found = 0;
                this.Bricks.clear();

                var x;
                for (x = 0; x < SizeX; x++) {
                    if (this.getBrick(x, y) == brickType) {
                        Found++;
                        if (this.CHECKPOS(this.getPos(x, y))) {
                            if (this.StateBoard[this.getPos(x, y)] == 0) {
                                this.Bricks.add(this.getPos(x, y));
                            }
                        }
                    }
                    else {
                        if (Found >= MinConnectedLocal) {
                            this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                            FoundTotal++;
                        }
                        Found = 0;
                        this.Bricks.clear();
                    }

                }
                if (Found >= MinConnectedLocal) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                    FoundTotal++;
                }
                Found = 0;
                this.Bricks.clear();
            }

            if (FoundTotal == 0) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnNoFoundConnected, this.ho.getEventParam());
            }
        },

        actSearchVertical: function (brickType) {
            this.SearchBrickType = brickType;
            var SizeX = this.BSizeX;
            var SizeY = this.BSizeY;
            var Found = 0;
            this.Bricks.clear();
            var FoundTotal = 0;

            var x;
            for (x = 0; x < SizeX; x++) {
                Found = 0;
                this.Bricks.clear();

                var y;
                for (y = 0; y < SizeY; y++) {
                    if (this.getBrick(x, y) == brickType) {
                        Found++;
                        if (this.CHECKPOS(this.getPos(x, y))) {
                            if (this.StateBoard[this.getPos(x, y)] == 0) {
                                this.Bricks.add(this.getPos(x, y));
                            }
                        }
                    }
                    else {    //Trigger condition
                        if (Found >= this.MinConnected) {
                            this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                            FoundTotal++;
                        }
                        Found = 0;
                        this.Bricks.clear();
                    }

                } // Trigger condition
                if (Found >= this.MinConnected) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                    FoundTotal++;
                }
                Found = 0;
                this.Bricks.clear();
            }
            if (FoundTotal == 0) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnNoFoundConnected, this.ho.getEventParam());
            }
        },

        actSearchDiagonalsLR: function (brickType) {
            var around = this.BSizeY + this.BSizeX + 2;
            var startoffX = 0;
            var startoffY = this.BSizeY;
            var loopindex = 0;
            var foundtotal = 0;
            var foundbricks = 0;

            var i;
            for (i = 0; i < around; i++) {
                if (startoffY == 0) {
                    startoffX++;
                }

                if (startoffY > 0) {
                    startoffY--;
                }

                loopindex = 0;
                this.Bricks.clear();
                foundbricks = 0;

                while ((this.getPos(startoffX + loopindex, startoffY + loopindex) != -1)) {
                    if (this.getBrick(startoffX + loopindex, startoffY + loopindex) == brickType) {
                        foundbricks++;

                        if (this.CHECKPOS(this.getPos(startoffX + loopindex, startoffY + loopindex))) {
                            if (this.StateBoard[this.getPos(startoffX + loopindex, startoffY + loopindex)] == 0) {
                                this.Bricks.add(this.getPos(startoffX + loopindex, startoffY + loopindex));
                            }
                        }
                    }
                    else {

                        if (foundbricks >= this.MinConnected) {
                            this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                            foundtotal++;
                        }

                        this.Bricks.clear();
                        foundbricks = 0;
                    }
                    loopindex++;
                }

                if (foundbricks >= this.MinConnected) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                    foundtotal++;
                }
            }
            if (foundtotal == 0) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnNoFoundConnected, this.ho.getEventParam());
            }
        },
        actSearchConnected: function (startX, startY) {
            var FindBrick = this.getBrick(startX, startY);
            var size = this.BSizeX * this.BSizeY;
            var FoundTotal = 0;

            var Used = new Array(size);
            var n;
            for (n = 0; n < size; n++) {
                Used[n] = 0;
            }

            var BrickList = new CArrayList(); //<Integer>
            BrickList.add(this.getPos(startX, startY));

            if (this.CHECKPOS(this.getPos(startX, startY))) {
                Used[this.getPos(startX, startY)] = 1;
            }

            this.Bricks.clear();
            this.Bricks.add(this.getPos(startX, startY));

            var currentbrick = 0;
            var currentX = 0;
            var currentY = 0;

            var offsetX =
                [
                    0, -1, 1, 0
                ];
            var offsetY =
                [
                    -1, 0, 0, 1
                ];

            //char * temp ="";

            while (BrickList.size() > 0) {
                currentX = this.getXbrick((BrickList.get(0)));
                currentY = this.getYbrick((BrickList.get(0)));
                var dir;
                for (dir = 0; dir < 4; dir++) //Loop around brick
                {
                    currentbrick = this.getPos(currentX + offsetX[dir], currentY + offsetY[dir]);
                    if (this.CHECKPOS(currentbrick)) {
                        if ((this.Board[currentbrick] == FindBrick) && (Used[currentbrick] == 0) && (currentbrick != -1)) {
                            BrickList.add(currentbrick);
                            this.Bricks.add(currentbrick);
                            Used[currentbrick] = 1;
                        }
                    }
                }
                BrickList.removeIndex(0);
            }
            if (this.Bricks.size() >= this.MinConnected) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                FoundTotal++;
            }

            BrickList.clear();

            if (FoundTotal == 0) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnNoFoundConnected, this.ho.getEventParam());
            }

        },

        actDeleteHorizonal: function (y, mode) {
            var del;
            for (del = 0; del < this.BSizeX; del++) {
                if (this.CHECKPOS(this.getPos(del, y))) {
                    var triggerdeletedflag = false;
                    if (this.TriggerDeleted) {
                        this.DeletedFixed = this.FixedBoard[this.getPos(del, y)];
                        this.DeletedX = del;
                        this.DeletedY = y;
                        triggerdeletedflag = true;
                    }

                    this.Board[this.getPos(del, y)] = 0;
                    if (this.MoveFixed) {
                        this.FixedBoard[this.getPos(del, y)] = 0;
                    }

                    if (triggerdeletedflag) {
                        this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickDeleted, this.ho.getEventParam());
                    }
                }
            }

            var udX, udY;
            if (mode == 1) //MOVE ABOVE DOWNWARDS
            {
                for (udX = 0; udX < this.BSizeX; udX++) {
                    for (udY = y - 1; udY >= 0; udY--) {
                        this.MoveBrick(udX, udY, udX, udY + 1);
                    }
                }
            }

            if (mode == 2) //MOVE BELOW UPWARDS
            {
                for (udX = 0; udX < this.BSizeX; udX++) {
                    for (udY = y + 1; udY < this.BSizeY; udY++) {
                        this.MoveBrick(udX, udY, udX, udY - 1);
                    }
                }
            }
        },

        actDeleteVertical: function (x, mode) {
            var del;
            for (del = 0; del < this.BSizeY; del++) {
                if (this.CHECKPOS(this.getPos(x, del))) {
                    var triggerdeletedflag = false;
                    if (this.TriggerDeleted) {
                        this.DeletedFixed = this.FixedBoard[this.getPos(x, del)];
                        this.DeletedX = x;
                        this.DeletedY = del;
                        triggerdeletedflag = true;
                    }

                    this.Board[this.getPos(x, del)] = 0;
                    if (this.MoveFixed) {
                        this.FixedBoard[this.getPos(x, del)] = 0;
                    }

                    if (triggerdeletedflag) {
                        this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickDeleted, this.ho.getEventParam());
                    }
                }
            }

            var lrY, lrX;
            if (mode == 1) //MOVE LEFT TO RIGHT ->-> ||
            {
                for (lrY = 0; lrY < this.BSizeY; lrY++) {
                    for (lrX = x - 1; lrX >= 0; lrX--) {
                        this.MoveBrick(lrX, lrY, lrX + 1, lrY);
                    }
                }
            }
            if (mode == 2) //MOVE RIGHT TO LEFT   || <-<-
            {
                for (lrY = 0; lrY < this.BSizeY; lrY++) {
                    for (lrX = x + 1; lrX < this.BSizeX; lrX++) {
                        this.MoveBrick(lrX, lrY, lrX - 1, lrY);
                    }
                }
            }
        },

        actSwap: function (x1, y1, x2, y2) {
            this.SwapBrick1 = this.getPos(x1, y1);  //Brick 1
            this.SwapBrick2 = this.getPos(x2, y2);  //Brick 2

            if (this.CHECKPOS(this.SwapBrick1) && this.CHECKPOS(this.SwapBrick2)) {
                var temp = this.Board[this.SwapBrick1];
                var tempfixed = this.FixedBoard[this.SwapBrick1];

                this.Board[this.SwapBrick1] = this.Board[this.SwapBrick2];
                this.Board[this.SwapBrick2] = temp;

                if (this.MoveFixed) {
                    this.FixedBoard[this.SwapBrick1] = this.FixedBoard[this.SwapBrick2];
                    this.FixedBoard[this.SwapBrick2] = tempfixed;
                }

                if (this.TriggerMoved) {
                    this.MovedFixed = this.FixedBoard[this.SwapBrick1];
                    this.MovedNewX = x1;
                    this.MovedNewY = y1;
                    this.MovedOldX = x2;
                    this.MovedOldY = y2;
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickMoved, this.ho.getEventParam());

                    this.MovedFixed = this.FixedBoard[this.SwapBrick2];
                    this.MovedNewX = x2;
                    this.MovedNewY = y2;
                    this.MovedOldX = x1;
                    this.MovedOldY = y1;
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickMoved, this.ho.getEventParam());
                }
            }
        },

        actDropX: function (n) {
            var i;
            for (i = 0; i < n; i++) {
                this.fall();
            }
        },

        actMarkUsed: function (x, y) {
            if (this.CHECKPOS(this.getPos(x, y))) {
                this.StateBoard[this.getPos(x, y)] = 1;
            }
        },

        actDeleteMarked: function () {
            var size = this.BSizeX * this.BSizeY;
            var triggerdeleteflag = false;

            var i;
            for (i = 0; i < size; i++) {
                triggerdeleteflag = false;
                if (this.StateBoard[i] == 1) {
                    if (this.TriggerDeleted) {
                        this.DeletedFixed = this.FixedBoard[i];
                        this.DeletedX = this.getXbrick(i);
                        this.DeletedY = this.getYbrick(i);
                        triggerdeleteflag = true;
                    }

                    this.Board[i] = 0;
                    this.StateBoard[i] = 0;

                    if (this.MoveFixed) {
                        this.FixedBoard[i] = 0;
                    }

                    if (triggerdeleteflag) {
                        this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickDeleted, this.ho.getEventParam());
                    }
                }
            }
        },

        actUndoSwap: function () {
            if (this.CHECKPOS(this.SwapBrick1) && this.CHECKPOS(this.SwapBrick2)) {
                var temp = this.Board[this.SwapBrick1];
                var tempfixed = this.FixedBoard[this.SwapBrick1];

                this.Board[this.SwapBrick1] = this.Board[this.SwapBrick2];
                this.Board[this.SwapBrick2] = temp;

                if (this.MoveFixed) {
                    this.FixedBoard[this.SwapBrick1] = this.FixedBoard[this.SwapBrick2];
                    this.FixedBoard[this.SwapBrick2] = tempfixed;
                }

                if (this.TriggerMoved) {
                    this.MovedFixed = this.FixedBoard[this.SwapBrick1];
                    this.MovedNewX = this.getXbrick(this.SwapBrick1);
                    this.MovedNewY = this.getYbrick(this.SwapBrick1);
                    this.MovedOldX = this.getXbrick(this.SwapBrick2);
                    this.MovedOldY = this.getYbrick(this.SwapBrick2);
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickMoved, this.ho.getEventParam());

                    this.MovedFixed = this.FixedBoard[this.SwapBrick2];
                    this.MovedNewX = this.getXbrick(this.SwapBrick2);
                    this.MovedNewY = this.getYbrick(this.SwapBrick2);
                    this.MovedOldX = this.getXbrick(this.SwapBrick1);
                    this.MovedOldY = this.getYbrick(this.SwapBrick1);
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickMoved, this.ho.getEventParam());
                }
            }
        },

        actSearchDiagonalsRL: function (brickType) {

            var around = this.BSizeY + this.BSizeX + 2;
            var startoffX = this.BSizeX - 1;
            var startoffY = this.BSizeY;
            var loopindex = 0;
            var foundtotal = 0;
            var foundbricks = 0;

            var i;
            for (i = 0; i < around; i++) {
                if (startoffY == 0) {
                    startoffX--;
                }

                if (startoffY > 0) {
                    startoffY--;
                }

                loopindex = 0;
                foundbricks = 0;
                this.Bricks.clear();

                while ((this.getPos(startoffX - loopindex, startoffY + loopindex) != -1)) {
                    if (this.getBrick(startoffX - loopindex, startoffY + loopindex) == brickType) {
                        foundbricks++;

                        if (this.CHECKPOS(this.getPos(startoffX - loopindex, startoffY + loopindex))) {
                            if (this.StateBoard[this.getPos(startoffX - loopindex, startoffY + loopindex)] == 0) {
                                this.Bricks.add(this.getPos(startoffX - loopindex, startoffY + loopindex));
                            }
                        }
                    }
                    else {

                        if (foundbricks >= this.MinConnected) {
                            this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                            foundtotal++;
                        }

                        this.Bricks.clear();
                        foundbricks = 0;
                    }

                    loopindex++;
                }

                if (foundbricks >= this.MinConnected) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundConnected, this.ho.getEventParam());
                    foundtotal++;
                }

            }
            if (foundtotal == 0) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnNoFoundConnected, this.ho.getEventParam());
            }
        },

        actLoopFoundBricks: function () {
            var loop;
            for (loop = 0; loop < this.Bricks.size(); loop++) {
                this.LoopIndex = loop;
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundBrick, this.ho.getEventParam());
            }
        },

        actSetFixedOfBrick: function (x, y, fv) {
            if (this.CHECKPOS(this.getPos(x, y))) {
                this.FixedBoard[this.getPos(x, y)] = fv;
            }
        },

        actImportActives: function (selected) {
            var size = this.BSizeX * this.BSizeY;
            if (this.CHECKPOS(size - this.AddIncrement - 1)) {
                this.FixedBoard[size - this.AddIncrement - 1] = (selected.hoCreationId << 16) + selected.hoNumber;
            }
            this.AddIncrement++;
        },

        actMarkCurrentSystem: function () {
            var i;
            for (i = 0; i < this.Bricks.size(); i++) {
                if (this.CHECKPOS((this.Bricks.get(i)))) {
                    this.StateBoard[(this.Bricks.get(i))] = 1;
                }
                //MessageBox(NULL, "Brick marked in system" , "Brick marked", MB_ICONEXCLAMATION);
            }
        },

        actMarkCurrentBrick: function () {
            if (this.CHECKPOS((this.Bricks.get(this.LoopIndex)))) {
                this.StateBoard[(this.Bricks.get(this.LoopIndex))] = 1;
            }
            //MessageBox(NULL, "Brick marked" , "Brick marked", MB_ICONEXCLAMATION);
        },

        actLoopEntireBoard: function () {
            var size = this.BSizeX * this.BSizeY;
            this.Looped.clear();

            var i, u;
            for (i = 0; i < size; i++) {
                this.Looped.add(i);
            }

            for (u = 0; u < this.Looped.size(); u++) {
                this.LoopedIndex = u;
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundLooped, this.ho.getEventParam());
            }
        },

        actLoopBoardOfType: function (brickType) {
            var size = this.BSizeX * this.BSizeY;
            this.Looped.clear();

            var i, u;
            for (i = 0; i < size; i++) {
                if (this.Board[i] == brickType) {
                    this.Looped.add(i);
                }
            }
            for (u = 0; u < this.Looped.size(); u++) {
                this.LoopedIndex = u;
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundLooped, this.ho.getEventParam());
            }
        },

        actLoopSorrounding: function (x, y) {
            this.Looped.clear();

            var offsetX =
                [
                    -1, 0, 1, -1, 1, -1, 0, 1
                ];
            var offsetY =
                [
                    -1, -1, -1, 0, 0, 1, 1, 1
                ];

            var i, u;
            for (i = 0; i < 8; i++) {
                if (this.getBrick(x + offsetX[i], y + offsetY[i]) != -1) {
                    this.Looped.add(this.getPos(x + offsetX[i], y + offsetY[i]));
                }
            }

            for (u = 0; u < this.Looped.size(); u++) {
                this.LoopedIndex = u;
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundLooped, this.ho.getEventParam());
            }
        },

        actLoopHozLine: function (y) {
            this.Looped.clear();
            var i, u;
            for (i = 0; i < this.BSizeX; i++) {
                this.Looped.add(this.getPos(i, y));
            }

            for (u = 0; u < this.Looped.size(); u++) {
                this.LoopedIndex = u;
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundLooped, this.ho.getEventParam());
            }
        },

        actLoopVerLine: function (x) {
            this.Looped.clear();
            var i, u;
            for (i = 0; i < this.BSizeY; i++) {
                this.Looped.add(this.getPos(x, i));
            }

            for (u = 0; u < this.Looped.size(); u++) {
                this.LoopedIndex = u;
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnFoundLooped, this.ho.getEventParam());
            }
        },

        actClearWithType: function (brickType) {
            var size = this.BSizeX * this.BSizeY;
            var i;
            for (i = 0; i < size; i++) {
                this.Board[i] = brickType;
            }
        },

        actInsertBrick: function (x, y, brickType) {
            var size = this.BSizeX * this.BSizeY;
            var triggerdeletedflag = false;

            if (this.TriggerDeleted && this.Board[size - 1] != 0) {
                this.DeletedFixed = this.FixedBoard[size - 1];
                this.DeletedX = this.getXbrick(size - 1);
                this.DeletedY = this.getYbrick(size - 1);
                triggerdeletedflag = true;
            }

            var i;
            for (i = size - 2; i > this.getPos(x, y); i--) {
                this.MoveBrick(this.getXbrick(i), this.getYbrick(i), this.getXbrick(i) + 1, this.getYbrick(i));
            }

            if (this.CHECKPOS(this.getPos(x, y))) {
                this.Board[this.getPos(x, y)] = brickType;

                if (this.MoveFixed) {
                    this.FixedBoard[this.getPos(x, y)] = 0;
                }
            }

            if (triggerdeletedflag && this.TriggerDeleted) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickDeleted, this.ho.getEventParam());
            }
        },

        actSetCellDimensions: function (x, y) {
            this.CellWidth = x;
            this.CellHeight = y;
            if (this.CellWidth == 0) {
                this.CellWidth = 1;
            }
            if (this.CellHeight == 0) {
                this.CellHeight = 1;
            }
        },

        actDropXUp: function (n) {
            var i;
            for (i = 0; i < n; i++) {
                this.fallUP();
            }
        },

        actDropXLeft: function (n) {
            var i;
            for (i = 0; i < n; i++) {
                this.fallLEFT();
            }
        },

        actDropXRight: function (n) {
            var i;
            for (i = 0; i < n; i++) {
                this.fallRIGHT();
            }
        },

        actSetCellValue: function (x, y, value) {
            if (this.getPos(x, y) != -1) {
                this.CellValues[this.getPos(x, y)] = value;
            }
        },

        actDeleteBrick: function (x, y) {
            if (this.TriggerDeleted) {
                this.DeletedFixed = this.getFixed(x, y);
                this.DeletedX = x;
                this.DeletedY = y;
            }

            this.setBrick(x, y, 0);

            if (this.TriggerDeleted) {
                this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickDeleted, this.ho.getEventParam());
            }
        },

        actShiftHosLine: function (yline, shift) {
            var templine = new Array(this.BSizeX);
            var tempfixed = new Array(this.BSizeX);

            //write to templine
            var i, j;
            for (i = 0; i < this.BSizeX; i++) {
                templine[i] = this.getBrick(this.wrapX(i - shift), yline);
                tempfixed[i] = this.getFixed(this.wrapX(i - shift), yline);
            }

            for (j = 0; j < this.BSizeX; j++) {
                if (this.TriggerMoved) {
                    this.MovedOldX = j;
                    this.MovedOldY = yline;
                    this.MovedNewX = this.wrapX(j + shift);
                    this.MovedNewY = yline;
                    this.MovedFixed = this.getFixed(j, yline);
                }

                this.setBrick(j, yline, templine[j]);

                if (this.MoveFixed) {
                    this.setFixed(j, yline, tempfixed[j]);
                }

                if (this.TriggerMoved) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickMoved, this.ho.getEventParam());
                }
            }
        },

        actShiftVerLine: function (xline, shift) {
            var templine = new Array(this.BSizeY);
            var tempfixed = new Array(this.BSizeY);

            //write to templine*
            var i, j;
            for (i = 0; i < this.BSizeY; i++) {
                templine[i] = this.getBrick(xline, this.wrapY(i - shift));
                tempfixed[i] = this.getFixed(xline, this.wrapY(i - shift));
            }

            for (j = 0; j < this.BSizeY; j++) {
                if (this.TriggerMoved) {
                    this.MovedOldX = xline;
                    this.MovedOldY = j;
                    this.MovedNewX = xline;
                    this.MovedNewY = this.wrapY(j + shift);
                    this.MovedFixed = this.getFixed(xline, j);
                }

                this.setBrick(xline, j, templine[j]);

                if (this.MoveFixed) {
                    this.setFixed(xline, j, tempfixed[j]);
                }

                if (this.TriggerMoved) {
                    this.ho.generateEvent(CRunAdvGameBoard.CID_conOnBrickMoved, this.ho.getEventParam());
                }
            }
        },

        CObjectFromFixed: function (fixed) {
            var list = this.ho.hoAdRunHeader.rhObjectList;
            var i;
            for (i = 0; i < list.length; i++) {
                if (list[i] != null) {
                    if (((list[i].hoCreationId << 16) + list[i].hoNumber) == fixed) {
                        return list[i];
                    }
                }
            }
            return null;
        },

        actPositionBricks: function () {
            var size = this.BSizeX * this.BSizeY;
            var fixed = 0;
            var active;
            var posX = 0;
            var posY = 0;

            var i;
            for (i = 0; i < size; i++) {
                fixed = this.FixedBoard[i];
                active = this.CObjectFromFixed(fixed);
                posX = this.getXbrick(i);
                posY = this.getYbrick(i);

                if (active != null && fixed > 0) {
                    active.hoX = this.CellWidth * posX + this.OriginX;
                    active.hoY = this.CellHeight * posY + this.OriginY;
                    active.roc.rcChanged = true;
                }

            }
        },

        expression: function (num) {
            var ret;
            switch (num) {
                case CRunAdvGameBoard.EID_expGetBrickAt:
                    return (this.getBrick(this.ho.getExpParam(), this.ho.getExpParam()));
                case CRunAdvGameBoard.EID_expGetXSize:
                    return (this.BSizeX);
                case CRunAdvGameBoard.EID_expGetYSize:
                    return (this.BSizeY);
                case CRunAdvGameBoard.EID_expGetNumBricksInSystem:
                    return (this.Bricks.size());
                case CRunAdvGameBoard.EID_expGetXofBrick:
                    return this.expGetXofBrick(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetYofBrick:
                    return this.expGetYofBrick(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetFoundBrickType:
                    return (this.SearchBrickType);
                case CRunAdvGameBoard.EID_expGetNumBricksInHozLine:
                    return this.expGetNumBricksInHozLine(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetNumBricksInVerLine:
                    return this.expGetNumBricksInVerLine(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expCountSorrounding:
                    return this.expCountSorrounding(this.ho.getExpParam(), this.ho.getExpParam(), this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expCountTotal:
                    return this.expCountTotal();
                case CRunAdvGameBoard.EID_expGetFoundBrickFixed:
                    return this.expGetFoundBrickFixed(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetFoundXofBrick:
                    return (this.getXbrick((this.Bricks.get(this.LoopIndex))));
                case CRunAdvGameBoard.EID_expGetFoundYofBrick:
                    return (this.getYbrick((this.Bricks.get(this.LoopIndex))));
                case CRunAdvGameBoard.EID_expGetTypeofBrick:
                    return (this.SearchBrickType);
                case CRunAdvGameBoard.EID_expGetFixedOfBrick:
                    return this.expGetFixedOfBrick();
                case CRunAdvGameBoard.EID_expGetFixedAt:
                    return this.expGetFixedAt(this.ho.getExpParam(), this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expLoopIndex:
                    return (this.LoopIndex);
                case CRunAdvGameBoard.EID_expFindXfromFixed:
                    return this.expFindXfromFixed(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expFindYfromFixed:
                    return this.expFindYfromFixed(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expFindBrickfromFixed:
                    return this.expFindBrickfromFixed(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetLoopFoundXofBrick:
                    return (this.getXbrick((this.Looped.get(this.LoopedIndex))));
                case CRunAdvGameBoard.EID_expGetLoopFoundYofBrick:
                    return (this.getYbrick((this.Looped.get(this.LoopedIndex))));
                case CRunAdvGameBoard.EID_expGetLoopTypeofBrick:
                    return (this.getBrickAtPos((this.Looped.get(this.LoopedIndex))));
                case CRunAdvGameBoard.EID_expGetLoopFoundBrickFixed:
                    return this.expGetLoopFoundBrickFixed();
                case CRunAdvGameBoard.EID_expLoop:
                    return (this.LoopIndex);
                case CRunAdvGameBoard.EID_expGetXbrickFromX:
                    return this.expGetXbrickFromX(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetYBrickFromY:
                    return this.expGetYBrickFromY(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expSnapXtoGrid:
                    return this.expSnapXtoGrid(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expSnapYtoGrid:
                    return this.expSnapYtoGrid(this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetOriginX:
                    return (this.OriginX);
                case CRunAdvGameBoard.EID_expGetOriginY:
                    return (this.OriginY);
                case CRunAdvGameBoard.EID_expGetCellWidth:
                    return (this.CellWidth);
                case CRunAdvGameBoard.EID_expGetCellHeight:
                    return (this.CellHeight);
                case CRunAdvGameBoard.EID_expGetCellValue:
                    return this.expGetCellValue(this.ho.getExpParam(), this.ho.getExpParam());
                case CRunAdvGameBoard.EID_expGetXofCell:
                    return (this.CellWidth * this.ho.getExpParam() + this.OriginX);
                case CRunAdvGameBoard.EID_expGetYofCell:
                    return (this.CellHeight * this.ho.getExpParam() + this.OriginY);
                case CRunAdvGameBoard.EID_expMovedFixed:
                    return (this.MovedFixed);
                case CRunAdvGameBoard.EID_expMovedNewX:
                    return (this.MovedNewX);
                case CRunAdvGameBoard.EID_expMovedNewY:
                    return (this.MovedNewY);
                case CRunAdvGameBoard.EID_expMovedOldX:
                    return (this.MovedOldX);
                case CRunAdvGameBoard.EID_expMovedOldY:
                    return (this.MovedOldY);
                case CRunAdvGameBoard.EID_expDeletedFixed:
                    return (this.DeletedFixed);
                case CRunAdvGameBoard.EID_expDeletedX:
                    return (this.DeletedX);
                case CRunAdvGameBoard.EID_expDeletedY:
                    return (this.DeletedY);
            }
            return 0;//won't be used
        },

        expGetXofBrick: function (i) {
            if (i < this.Bricks.size()) {
                return (this.getXbrick((this.Bricks.get(i))));
            }
            else {
                return (-1);
            }
        },

        expGetYofBrick: function (i) {
            if (i < this.Bricks.size()) {
                return (this.getYbrick((this.Bricks.get(i))));
            }
            else {
                return (-1);
            }
        },

        expGetNumBricksInHozLine: function (y) {
            var count = 0;
            var i;
            for (i = 0; i < this.BSizeX; i++) {
                if (this.getBrick(i, y) != 0) {
                    count++;
                }
            }
            return (count);
        },

        expGetNumBricksInVerLine: function (x) {
            var count = 0;
            var i;

            for (i = 0; i < this.BSizeY; i++) {
                if (this.getBrick(x, i) != 0) {
                    count++;
                }
            }
            return (count);
        },

        expCountSorrounding: function (x, y, value) {
            var offsetX =
                [
                    -1, 0, 1, -1, 1, -1, 0, 1
                ];
            var offsetY =
                [
                    -1, -1, -1, 0, 0, 1, 1, 1
                ];

            var count = 0;
            var i;
            for (i = 0; i < 8; i++) {
                if (this.getBrick(x + offsetX[i], y + offsetY[i]) == value) {
                    count++;
                }
            }

            return (count);
        },

        expCountTotal: function () {
            var count = 0;
            var i;
            for (i = 0; i < this.BSizeX * this.BSizeY; i++) {
                if (this.Board[i] != 0) {
                    count++;
                }
            }
            return (count);
        },

        expGetFoundBrickFixed: function (i) {
            if (i < this.Looped.size()) {
                if (this.CHECKPOS(this.LoopIndex)) {
                    return (this.FixedBoard[this.LoopIndex]);
                }
            }
            return (-1);
        },

        expGetFixedOfBrick: function () {
            if (this.LoopIndex < this.Bricks.size()) {
                if (this.CHECKPOS((this.Bricks.get(this.LoopIndex)))) {
                    return (this.FixedBoard[(this.Bricks.get(this.LoopIndex))]);
                }
            }
            return (-1);
        },

        expGetFixedAt: function (x, y) {
            if (this.getPos(x, y) != -1) {
                return (this.FixedBoard[this.getPos(x, y)]);
            }
            return (-1);
        },

        expFindXfromFixed: function (fixed) {
            var size = this.BSizeX * this.BSizeY;
            var i;
            for (i = 0; i < size; i++) {
                if (this.FixedBoard[i] == fixed) {
                    return (this.getXbrick(i));
                }
            }
            return (-1);
        },

        expFindYfromFixed: function (fixed) {
            var size = this.BSizeX * this.BSizeY;
            var i;
            for (i = 0; i < size; i++) {
                if (this.FixedBoard[i] == fixed) {
                    return (this.getYbrick(i));
                }
            }
            return (-1);
        },

        expFindBrickfromFixed: function (fixed) {
            var size = this.BSizeX * this.BSizeY;
            var i;
            for (i = 0; i < size; i++) {
                if (this.FixedBoard[i] == fixed) {
                    return (this.Board[i]);
                }
            }
            return (-1);
        },

        expGetLoopFoundBrickFixed: function () {
            if (this.LoopedIndex < this.Looped.size()) {
                if (this.CHECKPOS((this.Looped.get(this.LoopedIndex)))) {
                    return (this.FixedBoard[(this.Looped.get(this.LoopedIndex))]);
                }
            }
            return (-1);
        },

        expGetXbrickFromX: function (x) {
            return ( Math.round((x - this.OriginX) / this.CellWidth) );
        },

        expGetYBrickFromY: function (y) {
            return ( Math.round((y - this.OriginY) / this.CellHeight) );
        },

        expSnapXtoGrid: function (x) {
            return ( Math.round((x - this.OriginX) / this.CellWidth) * this.CellWidth + this.OriginX );
        },

        expSnapYtoGrid: function (y) {
            return ( Math.round((y - this.OriginY) / this.CellHeight) * this.CellHeight + this.OriginY );
        },

        expGetCellValue: function (x, y) {
            if (this.CHECKPOS(this.getPos(x, y))) {
                return (this.CellValues[this.getPos(x, y)]);
            }
            return (-1);
        }

    };

//setup inheritance using extend
CServices.extend(CRunExtension, CRunAdvGameBoard);
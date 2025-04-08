//----------------------------------------------------------------------------------
//
// CRUNINVENTORY
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
CRunInventory.CND_NAMEDITEMSELECTED = 0;
CRunInventory.CND_NAMEDCOMPARENITEMS = 1;
CRunInventory.CND_ITEMSELECTED = 2;
CRunInventory.CND_COMPARENITEMS = 3;
CRunInventory.CND_NAMEDITEMPRESENT = 4;
CRunInventory.CND_ITEMPRESENT = 5;
CRunInventory.CND_NAMEDHILIGHTED = 6;
CRunInventory.CND_HILIGHTED = 7;
CRunInventory.CND_CANADD = 8;
CRunInventory.CND_NAMEDCANADD = 9;
CRunInventory.CND_LAST = 10;
CRunInventory.ACT_NAMEDADDITEM = 0;
CRunInventory.ACT_NAMEDADDNITEMS = 1;
CRunInventory.ACT_NAMEDDELITEM = 2;
CRunInventory.ACT_NAMEDDELNITEMS = 3;
CRunInventory.ACT_NAMEDHIDEITEM = 4;
CRunInventory.ACT_NAMEDSHOWITEM = 5;
CRunInventory.ACT_ADDITEM = 6;
CRunInventory.ACT_ADDNITEMS = 7;
CRunInventory.ACT_DELITEM = 8;
CRunInventory.ACT_DELNITEMS = 9;
CRunInventory.ACT_HIDEITEM = 10;
CRunInventory.ACT_SHOWITEM = 11;
CRunInventory.ACT_LEFT = 12;
CRunInventory.ACT_RIGHT = 13;
CRunInventory.ACT_UP = 14;
CRunInventory.ACT_DOWN = 15;
CRunInventory.ACT_SELECT = 16;
CRunInventory.ACT_CURSOR = 17;
CRunInventory.ACT_NAMEDSETSTRING = 18;
CRunInventory.ACT_SETSTRING = 19;
CRunInventory.ACT_ACTIVATE = 20;
CRunInventory.ACT_NAMEDSETMAXIMUM = 21;
CRunInventory.ACT_SETMAXIMUM = 22;
CRunInventory.ACT_SETPOSITION = 23;
CRunInventory.ACT_SETPAGE = 24;
CRunInventory.ACT_ADDPROPERTY = 25;
CRunInventory.ACT_NAMEDSETPROPMINMAX = 26;
CRunInventory.ACT_SETPROPMINMAX = 27;
CRunInventory.ACT_NAMEDADDPROPERTY = 28;
CRunInventory.ACT_ADDGRIDITEM = 29;
CRunInventory.ACT_ADDGRIDNITEMS = 30;
CRunInventory.ACT_NAMEDADDGRIDITEM = 31;
CRunInventory.ACT_NAMEDADDGRIDNITEMS = 32;
CRunInventory.ACT_HILIGHTDROP = 33;
CRunInventory.ACT_NAMEDHILIGHTDROP = 34;
CRunInventory.ACT_SAVE = 35;
CRunInventory.ACT_LOAD = 36;
CRunInventory.ACT_ADDLISTITEM = 37;
CRunInventory.ACT_ADDLISTNITEMS = 38;
CRunInventory.ACT_NAMEDADDLISTITEM = 39;
CRunInventory.ACT_NAMEDADDLISTNITEMS = 40;
CRunInventory.EXP_NITEM = 0;
CRunInventory.EXP_NAMEOFHILIGHTED = 1;
CRunInventory.EXP_NAMEOFSELECTED = 2;
CRunInventory.EXP_POSITION = 3;
CRunInventory.EXP_PAGE = 4;
CRunInventory.EXP_TOTAL = 5;
CRunInventory.EXP_DISPLAYED = 6;
CRunInventory.EXP_NUMOFSELECTED = 7;
CRunInventory.EXP_NUMOFHILIGHTED = 8;
CRunInventory.EXP_NAMEOFNUM = 9;
CRunInventory.EXP_MAXITEM = 10;
CRunInventory.EXP_NUMBERMAXITEM = 11;
CRunInventory.EXP_NUMBERNITEM = 12;
CRunInventory.EXP_GETPROPERTY = 13;
CRunInventory.EXP_NUMBERGETPROPERTY = 14;

CRunInventory.IFLAG_CURSOR = 0x0001;
CRunInventory.IFLAG_HSCROLL = 0x0002;
CRunInventory.IFLAG_VSCROLL = 0x0004;
CRunInventory.IFLAG_SORT = 0x0010;
CRunInventory.IFLAG_MOUSE = 0x0020;
CRunInventory.IFLAG_FORCECURSOR = 0x0040;
CRunInventory.IFLAG_CURSORBYACTION = 0x0080;
CRunInventory.IFLAG_DISPLAYGRID = 0x0100;
CRunInventory.INVTYPE_LIST = 0;
CRunInventory.INVTYPE_GRID = 1;

CRunInventory.VK_LEFT = 1;
CRunInventory.VK_RIGHT = 2;
CRunInventory.VK_UP = 3;
CRunInventory.VK_DOWN = 4;
CRunInventory.VK_RETURN = 5;
CRunInventory.SX_SEPARATION = 8;
CRunInventory.SY_SEPARATION = 8;

function CRunInventory() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.type = 0;
    this.number = 0;
    this.itemSx = 0;
    this.itemSy = 0;
    this.flags = 0;
    this.textAlignment = 0;
    this.logFont = null;
    this.fontColor = 0;
    this.scrollColor = 0;
    this.scrollColor2 = 0;
    this.cursorColor = 0;
    this.gridColor = 0;
    this.cursorType = 0;
    this.pDisplayString = null;

    this.displayList = new CArrayList();
    this.objectList = new CArrayList();
    this.slider = null;
    this.nColumns = 0;
    this.nLines = 0;
    this.position = 0;
    this.xCursor = 0;
    this.yCursor = 0;
    this.bUpdateList = false;
    this.bRedraw = false;
    this.displayQuantity = 0;
    this.showQuantity = 0;
    this.oldKey = 0;
    this.selectedCount = 0;
    this.oldBMouse = false;
    this.bActivated = false;
    this.pNameSelected = null;
    this.pNameHilighted = null;
    this.maximum = 0;
    this.numSelected = 0;
    this.numHilighted = 0;
    this.pGrid = null;
    this.rcDrop = new CRect();
    this.bDropItem = false;
    this.scrollX = 0;
    this.scrollY = 0;
    this.scrollPosition = 0;
    this.oldBHidden = false;
    this.font = null;
    this.conditionString = null;
    this.textContainer = null;
    this.textContainerInfo = null;
}

CRunInventory.prototype = {
    getNumberOfConditions: function () {
        return CRunInventory.CND_LAST;
    },

    createRunObject: function (file, cob, version) {
        this.ho.hoImgWidth = file.readAInt();
        this.ho.hoImgHeight = file.readAInt();
        this.number = file.readAShort();
        this.itemSx = file.readAShort();
        this.itemSy = file.readAShort();
        this.flags = file.readAInt();
        this.textAlignment = file.readAInt();
        this.logFont = file.readLogFont();
        this.fontColor = file.readAColor();
        this.scrollColor = file.readAColor();
        this.displayQuantity = file.readAInt();
        this.showQuantity = file.readAInt();
        this.scrollColor2 = file.readAColor();
        this.maximum = file.readAInt();
        this.cursorColor = file.readAColor();
        this.cursorType = file.readAInt();
        this.type = file.readAShort();
        this.gridColor = file.readAColor();
        this.pDisplayString = file.readAString();
        this.nColumns = Math.floor(Math.max(this.ho.hoImgWidth / this.itemSx, 1));
        this.nLines = Math.floor(Math.max(this.ho.hoImgHeight / this.itemSy, 1));
        this.selectedCount = -1;
        this.numSelected = -1;
        this.numHilighted = -1;
        this.position = 0;
        this.bDropItem = false;
        this.oldBHidden = false;
        this.bUpdateList = true;
        this.textContainer = new Array();
        this.textContainerInfo = new Array();

        this.inventory = this.rh.getStorage(this.ho.hoIdentifier);
        if (this.inventory === null) {
            this.inventory = new CRunInventoryList();
            this.rh.addStorage(this.inventory, this.ho.hoIdentifier);
        }

        if (this.type == CRunInventory.INVTYPE_LIST) {
            this.slider = new CRunInventoryScrollBar();
        }
        this.UpdateDisplayList();
        return true;
    },

    destroyRunObject: function () {
        //call chain
        CRunControl.prototype.destroyRunObject();

        //call self
        if (this.textContainer != null) {
            for (var i = 0; i < this.textContainer.length; i++) {
                this.textContainer[i].free();
            }
            this.textContainer = null;
        }
    },

    SetSlider: function () {
        var x, y;
        if ((this.flags & CRunInventory.IFLAG_HSCROLL) != 0) {
            x = this.ho.hoX - this.rh.rhWindowX + this.ho.pLayer.x;
            y = this.ho.hoY - this.rh.rhWindowY + this.ho.pLayer.y + this.ho.hoImgHeight - CRunInventoryScrollBar.SY_SLIDER;
            this.slider.Initialise(this.rh, x, y, this.ho.hoImgWidth, CRunInventoryScrollBar.SY_SLIDER, this.scrollColor, this.scrollColor2, this);
        }
        else if ((this.flags & CRunInventory.IFLAG_VSCROLL) != 0) {
            x = this.ho.hoX - this.rh.rhWindowX + this.ho.pLayer.x + this.ho.hoImgWidth - CRunInventoryScrollBar.SX_SLIDER;
            y = this.ho.hoY - this.rh.rhWindowY + this.ho.pLayer.y;
            this.slider.Initialise(this.rh, x, y, CRunInventoryScrollBar.SX_SLIDER, this.ho.hoImgHeight, this.scrollColor, this.scrollColor2, this);
        }
    },

    obHide: function (hoPtr) {
        hoPtr.ros.obHide();
    },

    obShow: function (hoPtr) {
        hoPtr.ros.obShow();
    },

    GetFixedValue: function (pHo) {
        return (pHo.hoCreationId << 16) | (pHo.hoNumber & 0xFFFF);
    },

    GetHO: function (fixedValue) {
        var hoPtr = this.rh.rhObjectList[fixedValue & 0xFFFF];
        if (hoPtr != null && hoPtr.hoCreationId == fixedValue >> 16) {
            return hoPtr;
        }
        return null;
    },

    showHide: function (bHidden) {
        var n;
        var hoPtr;
        if (!bHidden) {
            for (n = 0; n < this.objectList.size(); n++) {
                hoPtr = this.GetHO((this.objectList.get(n)));
                if (hoPtr != null) {
                    this.obShow(hoPtr);
                }
            }
        }
        else {
            for (n = 0; n < this.objectList.size(); n++) {
                hoPtr = this.GetHO((this.objectList.get(n)));
                if (hoPtr != null) {
                    this.obHide(hoPtr);
                }
            }
        }
    },

    CenterDisplay: function (pos) {
        var size = this.nColumns * this.nLines;
        if (pos < this.position) {
            this.position = pos;
        }
        else if (pos >= this.position + size) {
            this.position = Math.max(0, pos - size + 1);
        }
    },

    UpdateDisplayList: function () {
        this.displayList.clear();
        this.objectList.clear();
        var n;
        if (this.type == CRunInventory.INVTYPE_GRID) {
            if (this.pGrid == null) {
                this.pGrid = new Array(this.nColumns * this.nLines);
            }
            for (n = this.nColumns * this.nLines - 1; n >= 0; n--) {
                this.pGrid[n] = 0;
            }
        }

        var pItem;
        for (pItem = this.inventory.FirstItem(this.number); pItem != null; pItem = this.inventory.NextItem(this.number)) {
            var pName = pItem.GetName();
            var objectNum = 0;
            for (var nObject = 0; nObject < this.rh.rhNObjects; objectNum++, nObject++) {
                while (this.rh.rhObjectList[objectNum] == null) {
                    objectNum++;
                }
                var hoPtr = this.rh.rhObjectList[objectNum];
                if (hoPtr.hoType == 2) {
                    var pOiList = hoPtr.hoOiList;
                    if (pOiList.oilName == pName) {
                        if (pItem.GetQuantity() >= this.showQuantity) {
                            if ((pItem.GetFlags() & CRunInventoryItem.FLAG_VISIBLE) != 0) {
                                this.displayList.add(pItem);
                                var fix = this.GetFixedValue(hoPtr);
                                this.objectList.add(fix);
                                if (this.type == CRunInventory.INVTYPE_GRID) {
                                    var sx = Math.floor((hoPtr.hoImgWidth + this.itemSx - 1) / this.itemSx);
                                    var sy = Math.floor((hoPtr.hoImgHeight + this.itemSy - 1) / this.itemSy);
                                    var x, y;
                                    for (y = 0; y < sy; y++) {
                                        for (x = 0; x < sx; x++) {
                                            this.pGrid[(pItem.y + y) * this.nColumns + pItem.x + x] = fix;
                                        }
                                    }

                                    hoPtr.bringToFront();
                                }
                            }
                            else {
                                this.obHide(hoPtr);
                            }
                            break;
                        }
                        else {
                            this.obHide(hoPtr);
                        }
                    }
                }
            }
        }
        if (this.type == CRunInventory.INVTYPE_LIST && this.displayList.size() > 2 && (this.flags & CRunInventory.IFLAG_SORT) != 0) {
            var bFlag = true;
            while (bFlag == true) {
                bFlag = false;
                for (n = 0; n < this.displayList.size() - 1; n++) {
                    var pItem1 = (this.displayList.get(n));
                    var pItem2 = (this.displayList.get(n + 1));
                    var pName1 = pItem1.GetName();
                    var pName2 = pItem2.GetName();
                    if (pName1 == pName2) {
                        this.displayList.swap(n, n + 1);
                        this.objectList.swap(n, n + 1);
                        bFlag = true;
                    }
                }
            }
        }
        this.bUpdateList = true;
        this.bRedraw = true;
    },

    SetPosition: function (pHo, x, y) {
        pHo.hoX = x + pHo.hoImgXSpot;
        pHo.hoY = y + pHo.hoImgYSpot;
        pHo.rom.rmMoveFlag = true;
        pHo.roc.rcChanged = true;
        pHo.roc.rcCheckCollides = true;

        //bring to front
        pHo.bringToFront();
    },

    CheckDisplayList: function () {
        var bRet = false;
        var o;
        for (o = 0; o < this.displayList.size(); o++) {
            var pItem = (this.displayList.get(o));
            var fixedValue = (this.objectList.get(o));
            var hoPtr = this.GetHO(fixedValue);
            if (hoPtr == null) {
                this.displayList.removeObject(o);
                this.objectList.removeObject(o);
                o--;
                bRet = true;
            }
        }
        return bRet;
    },

    Scroll: function (tpe, slide) {
        var pos = this.position;
        if (this.slider.bHorizontal == false) {
            switch (tpe) {
                case CRunInventoryScrollBar.SCROLL_UP:
                    pos--;
                    break;
                case CRunInventoryScrollBar.SCROLL_PAGEUP:
                    pos -= this.nColumns;
                    break;
                case CRunInventoryScrollBar.SCROLL_PAGEDOWN:
                    pos += this.nColumns;
                    break;
                case CRunInventoryScrollBar.SCROLL_DOWN:
                    pos++;
                    break;
                case CRunInventoryScrollBar.SCROLL_SLIDE:
                    pos = slide;
                    break;
            }
        }
        else {
            switch (tpe) {
                case CRunInventoryScrollBar.SCROLL_UP:
                    pos--;
                    break;
                case CRunInventoryScrollBar.SCROLL_PAGEUP:
                    pos -= this.nLines;
                    break;
                case CRunInventoryScrollBar.SCROLL_PAGEDOWN:
                    pos += this.nLines;
                    break;
                case CRunInventoryScrollBar.SCROLL_DOWN:
                    pos++;
                    break;
                case CRunInventoryScrollBar.SCROLL_SLIDE:
                    pos = slide;
                    break;
            }
        }
        if (pos < 0) {
            pos = 0;
        }
        if (pos > this.displayList.size() - this.nColumns * this.nLines) {
            pos = this.displayList.size() - this.nColumns * this.nLines;
        }
        if (pos != this.position) {
            this.position = pos;
            this.slider.SetPosition(this.position, Math.min(this.displayList.size() - this.position, this.nLines * this.nColumns), this.displayList.size());
            this.bRedraw = true;
            this.bUpdateList = true;
        }
    },

    CleanList: function () {
        var n;
        for (n = 0; n < this.objectList.size(); n++) {
            var fixed = (this.objectList.get(n));
            if (this.GetHO(fixed) == null) {
                var pItem = (this.displayList.get(n));
                this.inventory.list.removeObject(pItem);
            }
        }
    },

    GetGridRect: function (x, y, pRc) {
        var fix = this.pGrid[y * this.nColumns + x];
        if (fix != 0) {
            var xx, yy;
            for (xx = 0; xx < x; xx++) {
                if (this.pGrid[y * this.nColumns + xx] == fix) {
                    break;
                }
            }
            pRc.left = xx * this.itemSx;
            for (xx = x; xx < this.nColumns; xx++) {
                if (this.pGrid[y * this.nColumns + xx] != fix) {
                    break;
                }
            }
            pRc.right = xx * this.itemSx;
            for (yy = 0; yy < y; yy++) {
                if (this.pGrid[yy * this.nColumns + x] == fix) {
                    break;
                }
            }
            pRc.top = yy * this.itemSy;
            for (yy = y; yy < this.nLines; yy++) {
                if (this.pGrid[yy * this.nColumns + x] != fix) {
                    break;
                }
            }
            pRc.bottom = yy * this.itemSy;
        }
        else {
            pRc.left = x * this.itemSx;
            pRc.right = pRc.left + this.itemSx;
            pRc.top = y * this.itemSy;
            pRc.bottom = pRc.top + this.itemSy;
        }
        return fix;
    },

    getKeys: function () {
        var key = 0;

        if (this.rh.rhApp.getKeyState(38)) {
            key = CRunInventory.VK_UP;
        }
        if (this.rh.rhApp.getKeyState(40)) {
            key = CRunInventory.VK_DOWN;
        }
        if (this.rh.rhApp.getKeyState(37)) {
            key = CRunInventory.VK_LEFT;
        }
        if (this.rh.rhApp.getKeyState(39)) {
            key = CRunInventory.VK_RIGHT;
        }
        if (this.rh.rhApp.getKeyState(13)) {
            key = CRunInventory.VK_RETURN;
        }

        return key;
    },

    handleRunObject: function () {
        var ret = 0;
        var bUpdate = false;

        this.CleanList();
        if (this.bUpdateList) {
            this.UpdateDisplayList();
            ret = CRunExtension.REFLAG_DISPLAY;
        }
        else {
            if (this.CheckDisplayList()) {
                ret = CRunExtension.REFLAG_DISPLAY;
            }
        }
        if (this.bRedraw) {
            ret = CRunExtension.REFLAG_DISPLAY;
            this.bRedraw = false;
        }

        var bHidden = (this.ho.ros.rsFlags & CRSpr.RSFLAG_HIDDEN) != 0;
        if (bHidden != this.oldBHidden) {
            this.oldBHidden = bHidden;
            this.showHide(bHidden);
        }
        if (bHidden) {
            return ret;
        }

        var fix;
        var x, y, xx, yy;
        var bFlag;
        var pItem;
        var hoPtr;
        var bMouse;
        var key;

        if ((this.flags & CRunInventory.IFLAG_MOUSE) !== 0 && !((this.flags & CRunInventory.IFLAG_CURSOR) !== 0)) {
            this.numHilighted = -1;
            this.pNameHilighted = "";
        }

        if (this.type == CRunInventory.INVTYPE_LIST) {
            if (this.position > 0 && this.position > Math.max(0, this.displayList.size() - this.nLines * this.nColumns)) {
                this.position = Math.max(this.displayList.size() - this.nLines * this.nColumns, 0);
                bUpdate = true;
            }

            if (this.position + this.yCursor * this.nColumns + this.xCursor >= this.displayList.size()) {
                this.xCursor = 0;
                this.yCursor = 0;
                bUpdate = true;
            }

            if (this.displayList.size() > 0) {
                xx = this.rh.rh2MouseX - this.ho.hoX;
                yy = this.rh.rh2MouseY - this.ho.hoY;
                x = xx;
                y = yy;
                bFlag = false;
                if ((this.flags & CRunInventory.IFLAG_MOUSE) != 0) {
                    if (x >= 0 && y >= 0 && x < this.ho.hoImgWidth && y < this.ho.hoImgHeight) {
                        if (this.slider.IsMouseInBar(xx + this.ho.hoX, yy + this.ho.hoY) == false) {
                            x = Math.floor(x / this.itemSx);
                            y = Math.floor(y / this.itemSy);
                            if (x < this.nColumns && y < this.nLines) {
                                var o = this.position + y * this.nColumns + x;
                                if (o < this.position + this.displayList.size()) {
                                    bFlag = true;
                                    if (this.xCursor != x || this.yCursor != y) {
                                        this.xCursor = x;
                                        this.yCursor = y;
                                        bUpdate = true;
                                    }
                                    pItem = (this.displayList.get(o));
                                    this.pNameHilighted = pItem.GetName();
                                    this.numHilighted = o;
                                }
                            }
                        }
                    }
                }

                //check mouse press state
                bMouse = this.rh.rhApp.getKeyState(CRunApp.VK_LBUTTON);

                //has it changed?
                if (bMouse != this.oldBMouse) {
                    this.oldBMouse = bMouse;

                    if (bMouse == true && (this.flags & CRunInventory.IFLAG_MOUSE) != 0) {
                        this.scrollX = x * this.itemSx;
                        this.scrollY = y * this.itemSy;
                        this.scrollPosition = this.position;
                        this.pNameSelected = this.pNameHilighted;
                        this.numSelected = this.position + this.yCursor * this.nColumns + this.xCursor;
                        this.selectedCount = this.rh.rh4EventCount;
                        pItem = (this.displayList.get(this.position + this.yCursor * this.nColumns + this.xCursor));
                        hoPtr = this.GetHO((this.objectList.get(this.position + this.yCursor * this.nColumns + this.xCursor)));
                        this.conditionString = pItem.GetName();
                        this.ho.generateEvent(CRunInventory.CND_NAMEDITEMSELECTED, 0);
                        this.ho.generateEvent(CRunInventory.CND_ITEMSELECTED, hoPtr.hoOi);
                    }

                    if ((this.flags & CRunInventory.IFLAG_CURSOR) != 0 && x >= 0 && y >= 0 && x < this.ho.hoImgWidth && y < this.ho.hoImgHeight) {
                        this.bActivated = true;
                        this.xCursor = Math.floor(x / this.itemSx);
                        this.yCursor = Math.floor(y / this.itemSy);
                        bUpdate = true;
                    } else {
                        this.bActivated = false;
                        bUpdate = true;
                    }
                }

                //is mouse held?
                if (bMouse) {
                    if (this.slider.IsDragging() == false && this.slider.IsMouseInBar(xx + this.ho.hoX, yy + this.ho.hoY) == false) {
                        //what type of scroll?
                        if ((this.flags & CRunInventory.IFLAG_VSCROLL) != 0) {
                            //vertical
                            if (yy < this.scrollY) {
                                this.position = this.scrollPosition - Math.floor(((yy - this.scrollY - this.itemSy) / this.itemSy) * this.nColumns);
                            } else {
                                this.position = this.scrollPosition - Math.floor(((yy - this.scrollY) / this.itemSy) * this.nColumns);
                            }

                            if (this.position < 0) {
                                this.position = 0;
                            }

                            if (this.position > Math.max(0, this.displayList.size() - this.nLines * this.nColumns)) {
                                this.position = Math.max(this.displayList.size() - this.nLines * this.nColumns, 0);
                            }
                            bUpdate = true;

                        } else if ((this.flags & CRunInventory.IFLAG_HSCROLL) != 0) {
                            //horizontal
                            if (xx < this.scrollX) {
                                this.position = this.scrollPosition - Math.floor(((xx - this.scrollX - this.itemSx) / this.itemSx) * this.nLines);
                            } else {
                                this.position = this.scrollPosition - Math.floor(((xx - this.scrollX) / this.itemSx) * this.nLines);
                            }

                            if (this.position < 0) {
                                this.position = 0;
                            }

                            if (this.position > Math.max(0, this.displayList.size() - this.nLines * this.nColumns)) {
                                this.position = Math.max(this.displayList.size() - this.nLines * this.nColumns, 0);
                            }
                            bUpdate = true;
                        }
                    }
                }

                if (this.bActivated) {
                    bFlag = true;
                }

                key = this.getKeys();
                if (this.bActivated && (this.flags & CRunInventory.IFLAG_CURSOR) != 0) {
                    if (key != this.oldKey) {
                        this.oldKey = key;
                        switch (key) {
                            case CRunInventory.VK_UP:
                                this.yCursor--;
                                if (this.yCursor < 0) {
                                    this.yCursor++;
                                    this.position = Math.max(this.position - this.nColumns, 0);
                                }
                                break;
                            case CRunInventory.VK_DOWN:
                                this.yCursor++;
                                if (this.yCursor >= this.nLines) {
                                    this.yCursor--;
                                    this.position = Math.min(this.position + this.nColumns, this.displayList.size() - this.nColumns * this.nLines);
                                    this.position = Math.max(this.position, 0);
                                }
                                break;
                            case CRunInventory.VK_RIGHT:
                                this.xCursor++;
                                if (this.xCursor >= this.nColumns) {
                                    this.xCursor--;
                                    this.position = Math.min(this.position + 1, this.displayList.size() - this.nColumns * this.nLines);
                                    this.position = Math.max(this.position, 0);
                                }
                                break;
                            case CRunInventory.VK_LEFT:
                                this.xCursor--;
                                if (this.xCursor < 0) {
                                    this.xCursor++;
                                    this.position = Math.max(this.position - 1, 0);
                                }
                                break;
                            case CRunInventory.VK_RETURN:
                                var o = this.position + this.yCursor * this.nColumns + this.xCursor;
                                if (o < this.position + this.displayList.size()) {
                                    pItem = (this.displayList.get(o));
                                    this.pNameHilighted = pItem.GetName();
                                    this.numHilighted = o;
                                }

                                this.pNameSelected = this.pNameHilighted;
                                this.selectedCount = this.rh.rh4EventCount;
                                this.numSelected = this.position + this.yCursor * this.nColumns + this.xCursor;
                                pItem = (this.displayList.get(this.position + this.yCursor * this.nColumns + this.xCursor));
                                hoPtr = this.GetHO((this.objectList.get(this.position + this.yCursor * this.nColumns + this.xCursor)));
                                this.conditionString = pItem.GetName();
                                this.ho.generateEvent(CRunInventory.CND_NAMEDITEMSELECTED, 0);
                                this.ho.generateEvent(CRunInventory.CND_ITEMSELECTED, hoPtr.hoOi);
                                break;
                        }

                        var o = this.position + this.yCursor * this.nColumns + this.xCursor;
                        if (o < this.position + this.displayList.size()) {
                            pItem = (this.displayList.get(o));
                            this.pNameHilighted = pItem.GetName();
                            this.numHilighted = o;
                        }

                        bUpdate = true;
                    }
                }
                if ((this.flags & CRunInventory.IFLAG_CURSORBYACTION) == 0) {
                    if (bFlag) {
                        if ((this.flags & CRunInventory.IFLAG_FORCECURSOR) == 0) {
                            this.flags |= CRunInventory.IFLAG_FORCECURSOR;
                            bUpdate = true;
                        }
                    }
                    else {
                        if ((this.flags & CRunInventory.IFLAG_FORCECURSOR) != 0) {
                            this.flags &= ~CRunInventory.IFLAG_FORCECURSOR;
                            bUpdate = true;
                        }
                    }
                }
            }

            if (bUpdate) {
                if (this.slider.bInitialised) {
                    this.slider.SetPosition(this.position, Math.min(this.displayList.size() - this.position, this.nLines * this.nColumns), this.displayList.size());
                }
            }
            if (this.slider.bInitialised) {
                this.slider.Handle(xx + this.ho.hoX, yy + this.ho.hoY);
            }
        }
        else {
            // Grid display
            x = this.rh.rh2MouseX - this.ho.hoX;
            y = this.rh.rh2MouseY - this.ho.hoY;
            bFlag = false;
            if ((this.flags & CRunInventory.IFLAG_MOUSE) != 0) {
                if (x >= 0 && y >= 0 && x < this.ho.hoImgWidth && y < this.ho.hoImgHeight) {
                    x = Math.floor(x / this.itemSx);
                    y = Math.floor(y / this.itemSy);
                    if (x < this.nColumns && y < this.nLines) {
                        bFlag = true;
                        if (this.xCursor != x || this.yCursor != y) {
                            this.xCursor = x;
                            this.yCursor = y;
                            ret = CRunExtension.REFLAG_DISPLAY;
                        }
                        o = y * this.nColumns + x;
                        var fixed = this.pGrid[o];
                        if (fixed != 0) {
                            var n;
                            for (n = 0; n < this.objectList.size(); n++) {
                                if (fixed == (this.objectList.get(n))) {
                                    break;
                                }
                            }
                            if (n < this.objectList.size()) {
                                pItem = (this.displayList.get(n));
                                this.pNameHilighted = pItem.GetName();
                                this.numHilighted = o;
                            }
                        }
                    }
                }
            }
            bMouse = this.rh.rhApp.getKeyState(CRunApp.VK_LBUTTON);
            if (bMouse != this.oldBMouse) {
                this.oldBMouse = bMouse;
                if (bMouse && (this.flags & CRunInventory.IFLAG_MOUSE) != 0) {
                    fix = this.pGrid[this.yCursor * this.nColumns + this.xCursor];
                    if (fix != 0) {
                        this.pNameSelected = this.pNameHilighted;
                        this.numSelected = this.yCursor * this.nColumns + this.xCursor;
                        this.selectedCount = this.rh.rh4EventCount;
                        hoPtr = this.GetHO(fix);
                        this.conditionString = hoPtr.hoOiList.oilName;
                        this.ho.generateEvent(CRunInventory.CND_NAMEDITEMSELECTED, 0);
                        this.ho.generateEvent(CRunInventory.CND_ITEMSELECTED, hoPtr.hoOi);
                    }
                }
                if ((this.flags & CRunInventory.IFLAG_CURSOR) != 0 && x >= 0 && y >= 0 && x < this.ho.hoImgWidth && y < this.ho.hoImgHeight) {
                    this.bActivated = true;
                    this.xCursor = Math.floor(x / this.itemSx);
                    this.yCursor = Math.floor(y / this.itemSy);
                    ret = CRunExtension.REFLAG_DISPLAY;
                }
                else {
                    this.bActivated = false;
                    ret = CRunExtension.REFLAG_DISPLAY;
                }
            }
            if (this.bActivated) {
                bFlag = true;
            }
            key = this.getKeys();
            if (this.bActivated && (this.flags & CRunInventory.IFLAG_CURSOR) != 0) {
                if (key != this.oldKey) {
                    this.oldKey = key;
                    switch (key) {
                        case CRunInventory.VK_UP:
                            if (this.yCursor > 0) {
                                y = this.yCursor - 1;
                                fix = this.pGrid[y * this.nColumns + this.xCursor];
                                if (fix != 0) {
                                    while (y > 0) {
                                        if (this.pGrid[(y - 1) * this.nColumns + this.xCursor] != fix) {
                                            break;
                                        }
                                        y--;
                                    }
                                }
                                this.yCursor = y;
                            }
                            break;
                        case CRunInventory.VK_DOWN:
                            if (this.yCursor < this.nLines - 1) {
                                fix = this.pGrid[this.yCursor * this.nColumns + this.xCursor];
                                y = this.yCursor + 1;
                                if (fix != 0) {
                                    while (this.pGrid[y * this.nColumns + this.xCursor] == fix && y < this.nLines - 1) {
                                        y++;
                                    }
                                }
                                this.yCursor = y;
                            }
                            break;
                        case CRunInventory.VK_RIGHT:
                            if (this.xCursor < this.nColumns - 1) {
                                fix = this.pGrid[this.yCursor * this.nColumns + this.xCursor];
                                x = this.xCursor + 1;
                                if (fix != 0) {
                                    while (this.pGrid[this.yCursor * this.nColumns + x] == fix && x > 0) {
                                        x++;
                                    }
                                }
                                this.xCursor = x;
                            }
                            break;
                        case CRunInventory.VK_LEFT:
                            if (this.xCursor > 0) {
                                x = this.xCursor - 1;
                                fix = this.pGrid[this.yCursor * this.nColumns + x];
                                if (fix != 0) {
                                    while (x > 0) {
                                        if (this.pGrid[this.yCursor * this.nColumns + x - 1] != fix) {
                                            break;
                                        }
                                        x--;
                                    }
                                }
                                this.xCursor = x;
                            }
                            break;
                        case CRunInventory.VK_RETURN:
                            this.pNameSelected = this.pNameHilighted;
                            this.selectedCount = this.rh.rh4EventCount;
                            this.numSelected = this.position + this.yCursor * this.nColumns + this.xCursor;
                            pItem = (this.displayList.get(this.position + this.yCursor * this.nColumns + this.xCursor));
                            if (pItem != null) {
                                hoPtr = this.GetHO((this.objectList.get(this.position + this.yCursor * this.nColumns + this.xCursor)));
                                this.conditionString = pItem.GetName();
                                this.ho.generateEvent(CRunInventory.CND_NAMEDITEMSELECTED, 0);
                                this.ho.generateEvent(CRunInventory.CND_ITEMSELECTED, hoPtr.hoOi);
                            }
                            break;
                    }
                    ret = CRunExtension.REFLAG_DISPLAY;
                }
            }
            if ((this.flags & CRunInventory.IFLAG_CURSORBYACTION) == 0) {
                if (bFlag) {
                    if ((this.flags & CRunInventory.IFLAG_FORCECURSOR) == 0) {
                        this.flags |= CRunInventory.IFLAG_FORCECURSOR;
                        ret = CRunExtension.REFLAG_DISPLAY;
                    }
                }
                else {
                    if ((this.flags & CRunInventory.IFLAG_FORCECURSOR) != 0) {
                        this.flags &= ~CRunInventory.IFLAG_FORCECURSOR;
                        ret = CRunExtension.REFLAG_DISPLAY;
                    }
                }
            }
        }
        if (bUpdate) {
            this.bUpdateList = true;
            ret = CRunExtension.REFLAG_DISPLAY;
        }
        return ret;
    },

    displayRunObject: function (context, xDraw, yDraw) {
        var rh = this.rh;
        var app = rh.rhApp;
        var ho = this.ho;

        var spriteX = ho.hoX - rh.rhWindowX + ho.pLayer.x;
        var spriteY = ho.hoY - rh.rhWindowY + ho.pLayer.y;

        var x, y;
        var o;
        var xObject;
        var yObject;
        var sx;
        var sy;
        var flags = 0;

        if (this.type == CRunInventory.INVTYPE_LIST) {
            if (this.displayList.size() == 0) {
                return;
            }

            var count = 0;
            var rc = new CRect();
            for (o = 0; o < this.displayList.size(); o++) {
                var hoPtr = this.GetHO((this.objectList.get(o)));
                if (hoPtr != null) {
                    if (o >= this.position && o < this.position + this.nLines * this.nColumns) {
                        var pItem = (this.displayList.get(o));
                        this.obShow(hoPtr);

                        var line = Math.floor((o - this.position) / this.nColumns);
                        var column = Math.floor((o - this.position) - line * this.nColumns);
                        xObject = Math.floor(column * this.itemSx + this.itemSx / 2 - hoPtr.hoImgWidth / 2);
                        yObject = Math.floor(line * this.itemSy + this.itemSy / 2 - hoPtr.hoImgHeight / 2);

                        rc.left = spriteX + column * this.itemSx;
                        rc.top = spriteY + line * this.itemSy;
                        rc.right = spriteX + rc.left + this.itemSx - 1;
                        rc.bottom = spriteY + rc.top + this.itemSy - 1;
                        if (o == this.position + this.xCursor + this.yCursor * this.nColumns) {

                            rc.left = spriteX + column * this.itemSx;
                            rc.top = spriteY + line * this.itemSy;
                            rc.right = rc.left + this.itemSx - 1;
                            rc.bottom = rc.top + this.itemSy - 1;

                            if ((this.flags & CRunInventory.IFLAG_FORCECURSOR) != 0 && this.cursorType > 0) {
                                if (this.cursorType == 1) {
                                    context.renderOutlineRect(rc.left, rc.top, rc.right - rc.left, rc.bottom - rc.top, this.cursorColor, 1, 0, 0);
                                }
                                else {
                                    context.renderFilledRect(rc.left, rc.top, rc.right - rc.left, rc.bottom - rc.top, this.cursorColor, 0, 0);
                                }
                            }
                        }

                        if (this.bUpdateList) {
                            if (this.maximum > 1) {
                                flags = CRendererTextContainer.TOP;
                                var text = pItem.GetDisplayString();
                                var temp = null;
                                var pos = text.indexOf("%q");
                                if (pos >= 0) {
                                    temp = text.substring(0, pos);
                                    temp += pItem.GetQuantity().toString();
                                    temp += text.substring(pos + 2);
                                    text = temp;
                                }
                                pos = text.indexOf("%m");
                                if (pos >= 0) {
                                    temp = text.substring(0, pos);
                                    temp += pItem.GetMaximum().toString();
                                    temp += text.substring(pos + 2);
                                }
                                text = temp;

                                if (this.textContainer[count] == null) {
                                    this.textContainer[count] = app.createTextContainer();
                                    this.textContainerInfo[count] = new CRunInventoryTextInfo();
                                }

                                var sxText = this.textContainer[count].getTextWidth(text, this.logFont);
                                var syText = this.logFont.getHeight();

                                if ((this.textAlignment & 0x00000001) != 0) {
                                    // TEXT_ALIGN_LEFT)
                                    flags = CRendererTextContainer.LEFT;
                                    this.textContainerInfo[count].x = column * this.itemSx;
                                    xObject = (column + 1) * this.itemSx - hoPtr.hoImgWidth;

                                } else if ((this.textAlignment & 0x00000002) != 0) {
                                    //TEXT_ALIGN_HCENTER)
                                    flags = CRendererTextContainer.CENTER;
                                    this.textContainerInfo[count].x = column * this.itemSx;

                                } else {
                                    // (this.textAlignment&TEXT_ALIGN_RIGHT)
                                    xObject = column * this.itemSx;
                                    flags = CRendererTextContainer.LEFT;
                                    this.textContainerInfo[count].x = xObject + hoPtr.hoImgWidth + CRunInventory.SX_SEPARATION;
                                }

                                if ((this.textAlignment & 0x00000008) != 0) {
                                    //TEXT_ALIGN_TOP)
                                    sy = ho.hoImgHeight + CRunInventory.SY_SEPARATION + syText;
                                    this.textContainerInfo[count].y = line * this.itemSy + Math.floor(this.itemSy / 2) - Math.floor(sy / 2);
                                    yObject = this.textContainerInfo[count].y + syText + CRunInventory.SY_SEPARATION;

                                } else if ((this.textAlignment & 0x00000010) != 0) {
                                    //TEXT_ALIGN_VCENTER)
                                    this.textContainerInfo[count].y = line * this.itemSy + Math.floor(this.itemSy / 2) - Math.floor(syText / 2) - Math.floor(syText / 6);
                                    yObject = line * this.itemSy + Math.floor(this.itemSy / 2) - Math.floor(hoPtr.hoImgHeight / 2);

                                } else {
                                    // (this.textAlignment&TEXT_ALIGN_BOTTOM)
                                    sy = ho.hoImgHeight + CRunInventory.SY_SEPARATION + syText;
                                    yObject = line * this.itemSy + Math.floor(this.itemSy / 2) - Math.floor(sy / 2);
                                    this.textContainerInfo[count].y = yObject + hoPtr.hoImgHeight + CRunInventory.SY_SEPARATION;
                                }

                                this.textContainer[count].set(text, this.logFont, this.fontColor, flags, this.itemSx, this.itemSy);

                                this.textContainerInfo[count].visible = (pItem.GetQuantity() >= this.displayQuantity);

                                this.SetPosition(hoPtr, ho.hoX + xObject, ho.hoY + yObject);
                            }
                        }

                        if (this.textContainer[count] != null && this.textContainerInfo[count].visible) {
                            this.textContainer[count].draw(context, this.textContainerInfo[count].x + spriteX, this.textContainerInfo[count].y + spriteY);
                        }
                    } else {
                        this.obHide(hoPtr);
                    }
                }
                count++;
            }

            this.SetSlider();
            this.slider.DrawBar(context);

        } else {
            if ((this.flags & CRunInventory.IFLAG_DISPLAYGRID) != 0) {
                rc = new CRect();
                for (y = 0; y < this.nLines; y++) {
                    for (x = 0; x < this.nColumns; x++) {
                        this.GetGridRect(x, y, rc);
                        context.renderOutlineRect(rc.left + spriteX, rc.top + spriteY, rc.right - rc.left, rc.bottom - rc.top, this.gridColor, 1, 0, 0);
                    }
                }

                if (this.bDropItem == false) {
                    this.GetGridRect(this.xCursor, this.yCursor, rc);
                } else {
                    rc.copyRect(this.rcDrop);
                }

                if (this.bDropItem || ((this.flags & CRunInventory.IFLAG_FORCECURSOR) != 0 && this.cursorType > 0)) {
                    context.renderFilledRect(rc.left + spriteX, rc.top + spriteY, rc.right - rc.left, rc.bottom - rc.top, this.cursorColor, 0, 0);
                }
            }

            if (this.bUpdateList) {
                for (o = 0; o < this.displayList.size(); o++) {
                    hoPtr = this.GetHO((this.objectList.get(o)));
                    if (hoPtr != null) {
                        pItem = (this.displayList.get(o));
                        this.obShow(hoPtr);

                        sx = Math.floor((hoPtr.hoImgWidth + this.itemSx - 1) / this.itemSx);
                        sy = Math.floor((hoPtr.hoImgHeight + this.itemSy - 1) / this.itemSy);
                        rc = new CRect();
                        this.GetGridRect(pItem.x, pItem.y, rc);
                        xObject = Math.floor(ho.hoX + (rc.left + rc.right) / 2 - sx + rh.rhWindowX - hoPtr.hoImgWidth / 2);
                        yObject = Math.floor(ho.hoY + (rc.top + rc.bottom) / 2 - sy + rh.rhWindowY - hoPtr.hoImgHeight / 2);
                        this.SetPosition(hoPtr, xObject, yObject);
                    }
                }
            }
        }
        this.bUpdateList = false;
        this.bDropItem = false;
    },

    getRunObjectFont: function () {
        return this.logFont;
    },

    setRunObjectFont: function (fi, rc) {
        this.logFont = fi;
        var n;
        for (n = 0; n < this.nLines * this.nColumns; n++) {
            this.computeTextFormat(this.textFormats[n]);
        }
        if (rc != null) {
            this.ho.hoImgWidth = rc.right - rc.left;
            this.ho.hoImgHeight = rc.bottom - rc.top;
        }
    },

    getRunObjectTextColor: function () {
        return this.fontColor;
    },

    setRunObjectTextColor: function (rgb) {
        this.fontColor = rgb;
        var n;
        for (n = 0; n < this.nLines * this.nColumns; n++) {
            this.computeTextFormat(this.textFormats[n]);
        }
        this.ho.redraw();
    },

    condition: function (num, cnd) {
        switch (num) {
            case CRunInventory.CND_NAMEDITEMSELECTED:
                return this.RCND_NAMEDITEMSELECTED(cnd);
            case CRunInventory.CND_NAMEDCOMPARENITEMS:
                return this.RCND_NAMEDCOMPARENITEMS(cnd);
            case CRunInventory.CND_ITEMSELECTED:
                return this.RCND_ITEMSELECTED(cnd);
            case CRunInventory.CND_COMPARENITEMS:
                return this.RCND_COMPARENITEMS(cnd);
            case CRunInventory.CND_NAMEDITEMPRESENT:
                return this.RCND_NAMEDITEMPRESENT(cnd);
            case CRunInventory.CND_ITEMPRESENT:
                return this.RCND_ITEMPRESENT(cnd);
            case CRunInventory.CND_NAMEDHILIGHTED:
                return this.RCND_NAMEDHILIGHTED(cnd);
            case CRunInventory.CND_HILIGHTED:
                return this.RCND_HILIGHTED(cnd);
            case CRunInventory.CND_CANADD:
                return this.RCND_CANADD(cnd);
            case CRunInventory.CND_NAMEDCANADD:
                return this.RCND_NAMEDCANADD(cnd);
        }
        return false;
    },

    RCND_NAMEDITEMSELECTED: function (cnd) {
        var pName = cnd.getParamExpString(this.rh, 0);
        if (pName == this.conditionString) {
            if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
                return true;
            }

            if (this.rh.rh4EventCount == this.selectedCount) {
                return true;
            }
        }
        return false;
    },

    RCND_NAMEDCOMPARENITEMS: function (cnd) {
        var pItem = this.inventory.GetItem(this.number, cnd.getParamExpString(this.rh, 0));
        if (pItem != null) {
            var value = (pItem.GetQuantity());
            return cnd.compareValues(this.rh, 0, value);
        }
        return false;
    },

    RCND_ITEMSELECTED: function (cnd) {
        var oi = cnd.getParamObject(this.rh, 0).oi;

        if (oi == this.rh.rhEvtProg.rhCurParam0) {
            if ((this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0) {
                return true;
            }

            if (this.rh.rh4EventCount == this.selectedCount) {
                return true;
            }
        }
        return false;
    },

    RCND_COMPARENITEMS: function (cnd) {
        var oi = cnd.getParamObject(this.rh, 0).oi;

        var n;
        for (n = 0; n < this.objectList.size(); n++) {
            var hoPtr = this.GetHO((this.objectList.get(n)));
            if (hoPtr.hoOi == oi) {
                var pItem = (this.displayList.get(n));
                var value = (pItem.GetQuantity());
                return cnd.compareValues(this.rh, 1, value);
            }
        }
        return false;
    },

    RCND_NAMEDITEMPRESENT: function (cnd) {
        var pItem = this.inventory.GetItem(this.number, cnd.getParamExpString(this.rh, 0));
        if (pItem != null) {
            if (pItem.GetQuantity() > 0) {
                return true;
            }
        }
        return false;
    },

    RCND_ITEMPRESENT: function (cnd) {
        var oi = cnd.getParamObject(this.rh, 0).oi;

        var n;
        for (n = 0; n < this.objectList.size(); n++) {
            var hoPtr = this.GetHO((this.objectList.get(n)));
            if (hoPtr.hoOi == oi) {
                var pItem = (this.displayList.get(n));
                if (pItem.GetQuantity() > 0) {
                    return true;
                }
            }
        }
        return false;
    },

    RCND_NAMEDHILIGHTED: function (cnd) {
        var pName = cnd.getParamExpString(this.rh, 0);
        if (this.pNameHilighted != null) {
            if (pName == this.pNameHilighted) {
                return true;
            }
        }
        return false;
    },

    RCND_HILIGHTED: function (cnd) {
        var oiList = cnd.getParamObject(this.rh, 0).oiList;
        var pOiList = this.rh.rhOiList[oiList];
        if (this.pNameHilighted != null) {
            if (pOiList.oilName == this.pNameHilighted) {
                return true;
            }
        }
        return false;
    },

    RCND_CANADD: function (cnd) {
        if (this.type != CRunInventory.INVTYPE_GRID) {
            return false;
        }

        var xx = cnd.getParamExpression(this.rh, 1);
        var yy = cnd.getParamExpression(this.rh, 2);

        if (xx < 0 || xx >= this.nColumns || yy < 0 || yy >= this.nLines) {
            return false;
        }

        var hoPtr;
        var pOiList = this.rh.rhOiList[cnd.getParamObject(this.rh, 0).oiList];
        number = pOiList.oilObject;
        if (number >= 0) {
            hoPtr = this.rh.rhObjectList[number];
            var sx = Math.floor((hoPtr.hoImgWidth + this.itemSx - 1) / this.itemSx);
            var sy = Math.floor((hoPtr.hoImgHeight + this.itemSy - 1) / this.itemSy);
            if (xx + sx > this.nColumns || yy + sy > this.nLines) {
                return false;
            }
            var x, y;
            for (y = 0; y < sy; y++) {
                for (x = 0; x < sx; x++) {
                    if (this.pGrid[(yy + y) * this.nColumns + xx + x] != 0) {
                        return false;
                    }
                }
            }
            this.rcDrop.left = xx * this.itemSx;
            this.rcDrop.right = this.rcDrop.left + this.itemSx;
            this.rcDrop.top = yy * this.itemSy;
            this.rcDrop.bottom = this.rcDrop.top + this.itemSy;
            this.bDropItem = true;
            return true;
        }
        return false;
    },

    GridCanAdd: function (pName, xx, yy, bDrop) {
        if (this.type != CRunInventory.INVTYPE_GRID) {
            return false;
        }
        if (xx < 0 || xx >= this.nColumns || yy < 0 || yy >= this.nLines) {
            return false;
        }

        var hoPtr;
        var n;
        for (n = 0; n < this.rh.rhOiList.length; n++) {
            if (this.rh.rhOiList[n].oilName == pName) {
                var number = this.rh.rhOiList[n].oilObject;
                if (number >= 0) {
                    hoPtr = this.rh.rhObjectList[number];
                    var sx = Math.floor((hoPtr.hoImgWidth + this.itemSx - 1) / this.itemSx);
                    var sy = Math.floor((hoPtr.hoImgHeight + this.itemSy - 1) / this.itemSy);
                    if (xx + sx > this.nColumns || yy + sy > this.nLines) {
                        return false;
                    }
                    var x, y;
                    for (y = 0; y < sy; y++) {
                        for (x = 0; x < sx; x++) {
                            if (this.pGrid[(yy + y) * this.nColumns + xx + x] != 0) {
                                return false;
                            }
                        }
                    }
                    if (bDrop) {
                        this.rcDrop.left = xx * this.itemSx;
                        this.rcDrop.right = this.rcDrop.left + this.itemSx;
                        this.rcDrop.top = yy * this.itemSy;
                        this.rcDrop.bottom = this.rcDrop.top + this.itemSy;
                        this.bDropItem = true;
                    }
                    return true;
                }
            }
        }
        return false;
    },

    RCND_NAMEDCANADD: function (cnd) {
        if (this.type == CRunInventory.INVTYPE_GRID) {
            var name = cnd.getParamExpString(this.rh, 0);
            var xx = cnd.getParamExpression(this.rh, 1);
            var yy = cnd.getParamExpression(this.rh, 2);
            return GridCanAdd(name, xx, yy, true);
        }
        return false;
    },

    action: function (num, act) {
        switch (num) {
            case CRunInventory.ACT_NAMEDADDITEM:
                this.RACT_NAMEDADDITEM(act);
                break;
            case CRunInventory.ACT_NAMEDADDNITEMS:
                this.RACT_NAMEDADDNITEMS(act);
                break;
            case CRunInventory.ACT_NAMEDDELITEM:
                this.RACT_NAMEDDELITEM(act);
                break;
            case CRunInventory.ACT_NAMEDDELNITEMS:
                this.RACT_NAMEDDELNITEMS(act);
                break;
            case CRunInventory.ACT_NAMEDHIDEITEM:
                this.RACT_NAMEDHIDEITEM(act);
                break;
            case CRunInventory.ACT_NAMEDSHOWITEM:
                this.RACT_NAMEDSHOWITEM(act);
                break;
            case CRunInventory.ACT_ADDITEM:
                this.RACT_ADDITEM(act);
                break;
            case CRunInventory.ACT_ADDNITEMS:
                this.RACT_ADDNITEMS(act);
                break;
            case CRunInventory.ACT_DELITEM:
                this.RACT_DELITEM(act);
                break;
            case CRunInventory.ACT_DELNITEMS:
                this.RACT_DELNITEMS(act);
                break;
            case CRunInventory.ACT_HIDEITEM:
                this.RACT_HIDEITEM(act);
                break;
            case CRunInventory.ACT_SHOWITEM:
                this.RACT_SHOWITEM(act);
                break;
            case CRunInventory.ACT_LEFT:
                this.RACT_LEFT(act);
                break;
            case CRunInventory.ACT_RIGHT:
                this.RACT_RIGHT(act);
                break;
            case CRunInventory.ACT_UP:
                this.RACT_UP(act);
                break;
            case CRunInventory.ACT_DOWN:
                this.RACT_DOWN(act);
                break;
            case CRunInventory.ACT_SELECT:
                this.RACT_SELECT(act);
                break;
            case CRunInventory.ACT_CURSOR:
                this.RACT_CURSOR(act);
                break;
            case CRunInventory.ACT_NAMEDSETSTRING:
                this.RACT_NAMEDSETSTRING(act);
                break;
            case CRunInventory.ACT_SETSTRING:
                this.RACT_SETSTRING(act);
                break;
            case CRunInventory.ACT_ACTIVATE:
                this.RACT_ACTIVATE(act);
                break;
            case CRunInventory.ACT_NAMEDSETMAXIMUM:
                this.RACT_NAMEDSETMAXIMUM(act);
                break;
            case CRunInventory.ACT_SETMAXIMUM:
                this.RACT_SETMAXIMUM(act);
                break;
            case CRunInventory.ACT_SETPOSITION:
                this.RACT_SETPOSITION(act);
                break;
            case CRunInventory.ACT_SETPAGE:
                this.RACT_SETPAGE(act);
                break;
            case CRunInventory.ACT_ADDPROPERTY:
                this.RACT_ADDPROPERTY(act);
                break;
            case CRunInventory.ACT_NAMEDSETPROPMINMAX:
                this.RACT_NAMEDSETPROPMINMAX(act);
                break;
            case CRunInventory.ACT_SETPROPMINMAX:
                this.RACT_SETPROPMINMAX(act);
                break;
            case CRunInventory.ACT_NAMEDADDPROPERTY:
                this.RACT_NAMEDADDPROPERTY(act);
                break;
            case CRunInventory.ACT_ADDGRIDITEM:
                this.RACT_ADDGRIDITEM(act);
                break;
            case CRunInventory.ACT_ADDGRIDNITEMS:
                this.RACT_ADDGRIDNITEMS(act);
                break;
            case CRunInventory.ACT_NAMEDADDGRIDITEM:
                this.RACT_NAMEDADDGRIDITEM(act);
                break;
            case CRunInventory.ACT_NAMEDADDGRIDNITEMS:
                this.RACT_NAMEDADDGRIDNITEMS(act);
                break;
            case CRunInventory.ACT_HILIGHTDROP:
                this.RACT_HILIGHTDROP(act);
                break;
            case CRunInventory.ACT_NAMEDHILIGHTDROP:
                this.RACT_NAMEDHILIGHTDROP(act);
                break;
            case CRunInventory.ACT_SAVE:
                this.RACT_SAVE(act);
                break;
            case CRunInventory.ACT_LOAD:
                this.RACT_LOAD(act);
                break;
            case CRunInventory.ACT_ADDLISTITEM:
                this.RACT_ADDLISTITEM(act);
                break;
            case CRunInventory.ACT_ADDLISTNITEMS:
                this.RACT_ADDLISTNITEMS(act);
                break;
            case CRunInventory.ACT_NAMEDADDLISTITEM:
                this.RACT_NAMEDADDLISTITEM(act);
                break;
            case CRunInventory.ACT_NAMEDADDLISTNITEMS:
                this.RACT_NAMEDADDLISTNITEMS(act);
                break;
        }
    },

    FindItem: function (pName) {
        var n;
        var hoPtr;
        for (n = 0; n < this.objectList.size(); n++) {
            hoPtr = this.GetHO((this.objectList.get(n)));
            if (pName == hoPtr.hoOiList.oilName) {
                return (this.displayList.get(n));
            }
        }
        return null;
    },

    FindHO: function (pName) {
        var n;
        var hoPtr;
        for (n = 0; n < this.objectList.size(); n++) {
            hoPtr = this.GetHO((this.objectList.get(n)));
            if (pName == hoPtr.hoOiList.oilName) {
                return hoPtr;
            }
        }
        return null;
    },

    RACT_NAMEDADDPROPERTY: function (act) {
        var pItem = act.getParamExpString(this.rh, 0);
        var pProperty = act.getParamExpString(this.rh, 1);
        var value = act.getParamExpression(this.rh, 2);
        this.inventory.AddProperty(this.number, pItem, pProperty, value);
        return;
    },

    RACT_NAMEDSETPROPMINMAX: function (act) {
        var pItem = act.getParamExpString(this.rh, 0);
        var pProperty = act.getParamExpString(this.rh, 1);
        var min = act.getParamExpression(this.rh, 2);
        var max = act.getParamExpression(this.rh, 3);
        this.inventory.SetPropertyMinimum(this.number, pItem, pProperty, min);
        this.inventory.SetPropertyMaximum(this.number, pItem, pProperty, max);
        return;
    },

    RACT_NAMEDADDLISTITEM: function (act) {
        if (this.type == CRunInventory.INVTYPE_LIST) {
            var pName = act.getParamExpString(this.rh, 0);
            var pos = act.getParamExpression(this.rh, 1);
            var namePos = "";
            var pItem;
            if (pos >= 0 && pos < this.displayList.size()) {
                pItem = (this.displayList.get(pos));
                namePos = pItem.pName;
            }
            pItem = this.inventory.AddItemToPosition(this.number, namePos, pName, 1, this.maximum, this.pDisplayString);
            var bAbsent = true;
            var n;
            for (n = 0; n < this.displayList.size(); n++) {
                if (pItem == (this.displayList.get(n))) {
                    bAbsent = false;
                    break;
                }
            }
            this.UpdateDisplayList();
            if (bAbsent) {
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        this.CenterDisplay(n);
                        break;
                    }
                }
            }
        }
        return;
    },

    RACT_NAMEDADDLISTNITEMS: function (act) {
        if (this.type == CRunInventory.INVTYPE_LIST) {
            var pName = act.getParamExpString(this.rh, 0);
            var pos = act.getParamExpression(this.rh, 1);
            var number = act.getParamExpression(this.rh, 2);
            var namePos = "";
            var pItem;
            if (pos >= 0 && pos < this.displayList.size()) {
                pItem = (this.displayList.get(pos));
                namePos = pItem.pName;
            }
            pItem = this.inventory.AddItemToPosition(number, namePos, pName, this.number, this.maximum, this.pDisplayString);
            var bAbsent = true;
            var n;
            for (n = 0; n < this.displayList.size(); n++) {
                if (pItem == (this.displayList.get(n))) {
                    bAbsent = false;
                    break;
                }
            }
            this.UpdateDisplayList();
            if (bAbsent) {
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        this.CenterDisplay(n);
                        break;
                    }
                }
            }
        }
        return;
    },

    RACT_NAMEDADDITEM: function (act) {
        var pItem;
        var param1 = act.getParamExpString(this.rh, 0);
        if (this.type == CRunInventory.INVTYPE_LIST) {
            pItem = this.inventory.AddItem(this.number, param1, 1, this.maximum, this.pDisplayString);
            var bAbsent = true;
            var n;
            for (n = 0; n < this.displayList.size(); n++) {
                if (pItem == (this.displayList.get(n))) {
                    bAbsent = false;
                    break;
                }
            }
            this.UpdateDisplayList();
            if (bAbsent) {
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        this.CenterDisplay(n);
                        break;
                    }
                }
            }
        }
        else {
            var x, y;
            for (y = 0; y < this.nLines; y++) {
                for (x = 0; x < this.nColumns; x++) {
                    if (this.GridCanAdd(param1, x, y, false)) {
                        pItem = this.inventory.AddItem(this.number, param1, 1, this.maximum, this.pDisplayString);
                        pItem.x = x;
                        pItem.y = y;
                        this.UpdateDisplayList();
                        return;
                    }
                }
            }
        }
        return;
    },

    RACT_NAMEDADDNITEMS: function (act) {
        var param1 = act.getParamExpString(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (param2 >= 0) {
            var pItem;
            if (this.type == CRunInventory.INVTYPE_LIST) {
                pItem = this.inventory.AddItem(this.number, param1, param2, this.maximum, this.pDisplayString);
                var bAbsent = true;
                var n;
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        bAbsent = false;
                        break;
                    }
                }
                this.UpdateDisplayList();
                if (bAbsent) {
                    for (n = 0; n < this.displayList.size(); n++) {
                        if (pItem == (this.displayList.get(n))) {
                            this.CenterDisplay(n);
                            break;
                        }
                    }
                }
            }
            else {
                var x, y;
                for (y = 0; y < this.nLines; y++) {
                    for (x = 0; x < this.nColumns; x++) {
                        if (this.GridCanAdd(param1, x, y, false)) {
                            pItem = this.inventory.AddItem(this.number, param1, param2, this.maximum, this.pDisplayString);
                            pItem.x = x;
                            pItem.y = y;
                            this.UpdateDisplayList();
                            return;
                        }
                    }
                }
            }
        }
        return;
    },

    RACT_NAMEDSETMAXIMUM: function (act) {
        var param1 = act.getParamExpString(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (param2 >= 0) {
            this.inventory.SetMaximum(this.number, param1, param2);
            this.UpdateDisplayList();
        }
        return;
    },

    RACT_NAMEDDELITEM: function (act) {
        var param1 = act.getParamExpString(this.rh, 0);
        var hoPtr = this.FindHO(param1);
        if (this.inventory.SubQuantity(this.number, param1, 1)) {
            if (hoPtr != null) {
                this.obHide(hoPtr);
            }
        }
        this.UpdateDisplayList();
        return;
    },

    RACT_NAMEDDELNITEMS: function (act) {
        var param1 = act.getParamExpString(this.rh, 0);
        var param2 = act.getParamExpression(this.rh, 1);
        if (param2 >= 0) {
            var hoPtr = this.FindHO(param1);
            if (this.inventory.SubQuantity(this.number, param1, param2)) {
                if (hoPtr != null) {
                    this.obHide(hoPtr);
                }
            }
            this.UpdateDisplayList();
        }
        return;
    },

    RACT_NAMEDHIDEITEM: function (act) {
        var param1 = act.getParamExpString(this.rh, 0);
        this.inventory.SetFlags(this.number, param1, ~CRunInventoryItem.FLAG_VISIBLE, 0);
        this.UpdateDisplayList();
        return;
    },

    RACT_NAMEDSHOWITEM: function (act) {
        var param1 = act.getParamExpString(this.rh, 0);
        this.inventory.SetFlags(this.number, param1, -1, CRunInventoryItem.FLAG_VISIBLE);
        this.UpdateDisplayList();
        return;
    },

    RACT_ADDLISTITEM: function (act) {
        if (this.type == CRunInventory.INVTYPE_LIST) {
            var hoPtr = act.getParamObject(this.rh, 0);
            ;
            var pName = hoPtr.hoOiList.oilName;

            var pos = act.getParamExpression(this.rh, 1);
            var namePos = "";
            var pItem;
            if (pos >= 0 && pos < this.displayList.size()) {
                pItem = (this.displayList.get(pos));
                namePos = pItem.pName;
            }
            pItem = this.inventory.AddItemToPosition(this.number, namePos, pName, 1, this.maximum, this.pDisplayString);
            var bAbsent = true;
            var n;
            for (n = 0; n < this.displayList.size(); n++) {
                if (pItem == (this.displayList.get(n))) {
                    bAbsent = false;
                    break;
                }
            }
            this.UpdateDisplayList();
            if (bAbsent) {
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        this.CenterDisplay(n);
                        break;
                    }
                }
            }
        }
        return;
    },

    RACT_ADDLISTNITEMS: function (act) {
        if (this.type == CRunInventory.INVTYPE_LIST) {
            var hoPtr = act.getParamObject(this.rh, 0);
            var pName = hoPtr.hoOiList.oilName;
            var pos = act.getParamExpression(this.rh, 1);
            var number = act.getParamExpression(this.rh, 2);
            var namePos = "";
            var pItem;
            if (pos >= 0 && pos < this.displayList.size()) {
                pItem = (this.displayList.get(pos));
                namePos = pItem.pName;
            }
            pItem = this.inventory.AddItemToPosition(number, namePos, pName, number, this.maximum, this.pDisplayString);
            var bAbsent = true;
            var n;
            for (n = 0; n < this.displayList.size(); n++) {
                if (pItem == (this.displayList.get(n))) {
                    bAbsent = false;
                    break;
                }
            }
            this.UpdateDisplayList();
            if (bAbsent) {
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        this.CenterDisplay(n);
                        break;
                    }
                }
            }
        }
        return;
    },

    RACT_ADDITEM: function (act) {
        var hoPtr = act.getParamObject(this.rh, 0);
        var pOiList = hoPtr.hoOiList;
        var pItem;
        if (this.type == CRunInventory.INVTYPE_LIST) {
            pItem = this.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
            var bAbsent = true;
            var n;
            for (n = 0; n < this.displayList.size(); n++) {
                if (pItem == (this.displayList.get(n))) {
                    bAbsent = false;
                    break;
                }
            }
            this.UpdateDisplayList();
            if (bAbsent) {
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        this.CenterDisplay(n);
                        break;
                    }
                }
            }
        }
        else {
            var x, y;
            for (y = 0; y < this.nLines; y++) {
                for (x = 0; x < this.nColumns; x++) {
                    if (this.GridCanAdd(pOiList.oilName, x, y, false)) {
                        pItem = this.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
                        pItem.x = x;
                        pItem.y = y;
                        this.UpdateDisplayList();
                        return;
                    }
                }
            }
        }
        return;
    },

    RACT_ADDPROPERTY: function (act) {
        var hoPtr = act.getParamObject(this.rh, 0);
        var pProperty = act.getParamExpString(this.rh, 1);
        var value = act.getParamExpression(this.rh, 2);

        var pOiList = hoPtr.hoOiList;
        this.inventory.AddProperty(this.number, pOiList.oilName, pProperty, value);
        return;
    },

    RACT_SETPROPMINMAX: function (act) {
        var hoPtr = act.getParamObject(this.rh, 0);
        var pProperty = act.getParamExpString(this.rh, 1);
        var min = act.getParamExpression(this.rh, 2);
        var max = act.getParamExpression(this.rh, 3);

        var pOiList = hoPtr.hoOiList;
        this.inventory.SetPropertyMinimum(this.number, pOiList.oilName, pProperty, min);
        this.inventory.SetPropertyMaximum(this.number, pOiList.oilName, pProperty, max);
        return;
    },

    RACT_ADDNITEMS: function (act) {
        var param2 = act.getParamExpression(this.rh, 1);
        if (param2 >= 0) {
            var hoPtr = act.getParamObject(this.rh, 0);
            var pOiList = hoPtr.hoOiList;
            var pItem;
            if (this.type == CRunInventory.INVTYPE_LIST) {
                pItem = this.inventory.AddItem(this.number, pOiList.oilName, param2, this.maximum, this.pDisplayString);
                var bAbsent = true;
                var n;
                for (n = 0; n < this.displayList.size(); n++) {
                    if (pItem == (this.displayList.get(n))) {
                        bAbsent = false;
                        break;
                    }
                }
                this.UpdateDisplayList();
                if (bAbsent) {
                    for (n = 0; n < this.displayList.size(); n++) {
                        if (pItem == (this.displayList.get(n))) {
                            this.CenterDisplay(n);
                            break;
                        }
                    }
                }
            }
            else {
                var x, y;
                for (y = 0; y < this.nLines; y++) {
                    for (x = 0; x < this.nColumns; x++) {
                        if (GridCanAdd(pOiList.oilName, x, y, false)) {
                            pItem = this.inventory.AddItem(this.number, pOiList.oilName, param2, this.maximum, this.pDisplayString);
                            pItem.x = x;
                            pItem.y = y;
                            this.UpdateDisplayList();
                            return;
                        }
                    }
                }
            }
        }
        return;
    },

    RACT_SETMAXIMUM: function (act) {
        var param2 = act.getParamExpression(this.rh, 1);
        if (param2 >= 0) {
            var hoPtr = act.getParamObject(this.rh, 0);
            var pOiList = hoPtr.hoOiList;
            this.inventory.SetMaximum(this.number, pOiList.oilName, param2);
            this.UpdateDisplayList();
        }
        return;
    },

    RACT_DELITEM: function (act) {
        var hoPtr = act.getParamObject(this.rh, 0);
        var pOiList = hoPtr.hoOiList;
        hoPtr = this.FindHO(pOiList.oilName);
        if (this.inventory.SubQuantity(this.number, pOiList.oilName, 1)) {
            if (hoPtr != null) {
                this.obHide(hoPtr);
            }
        }
        this.UpdateDisplayList();
        return;
    },

    RACT_DELNITEMS: function (act) {
        var param2 = act.getParamExpression(this.rh, 1);
        if (param2 >= 0) {
            var hoPtr = act.getParamObject(this.rh, 0);
            var pOiList = hoPtr.hoOiList;
            hoPtr = this.FindHO(pOiList.oilName);
            if (this.inventory.SubQuantity(this.number, pOiList.oilName, param2)) {
                if (hoPtr != null) {
                    this.obHide(hoPtr);
                }
            }
            this.UpdateDisplayList();
        }
        return;
    },

    RACT_HIDEITEM: function (act) {
        var hoPtr = act.getParamObject(this.rh, 0);
        var pOiList = hoPtr.hoOiList;
        this.inventory.SetFlags(this.number, pOiList.oilName, ~CRunInventoryItem.FLAG_VISIBLE, 0);
        this.UpdateDisplayList();
        return;
    },

    RACT_SHOWITEM: function (act) {
        var hoPtr = act.getParamObject(this.rh, 0);
        var pOiList = hoPtr.hoOiList;
        this.inventory.SetFlags(this.number, pOiList.oilName, -1, CRunInventoryItem.FLAG_VISIBLE);
        this.UpdateDisplayList();
        return;
    },

    RACT_LEFT: function (act) {
        if (this.displayList.size() > 0) {
            this.xCursor--;
            if (this.xCursor < 0) {
                this.xCursor++;
                this.position = Math.max(this.position - 1, 0);
            }
            this.bRedraw = true;
        }
        return;
    },

    RACT_RIGHT: function (act) {
        if (this.displayList.size() > 0) {
            this.xCursor++;
            if (this.xCursor >= this.nColumns) {
                this.xCursor--;
                this.position = Math.min(this.position + 1, this.displayList.size() - this.nColumns * this.nLines);
            }
            this.bRedraw = true;
        }
        return;
    },

    RACT_UP: function (act) {
        if (this.displayList.size() > 0) {
            this.yCursor--;
            if (this.yCursor < 0) {
                this.yCursor++;
                this.position = Math.max(this.position - this.nColumns, 0);
            }
            this.bRedraw = true;
        }
        return;
    },

    RACT_DOWN: function (act) {
        if (this.displayList.size() > 0) {
            this.yCursor++;
            if (this.yCursor >= this.nLines) {
                this.yCursor--;
                this.position = Math.min(this.position + this.nColumns, this.displayList.size() - this.nColumns * this.nLines);
            }
            this.bRedraw = true;
        }
        return;
    },

    RACT_SELECT: function (act) {
        if (this.displayList.size() > 0) {
            this.selectedCount = this.rh.rh4EventCount;
            var pItem = (this.displayList.get(this.position + this.yCursor * this.nColumns + this.xCursor));
            var hoPtr = this.GetHO((this.objectList.get(this.position + this.yCursor * this.nColumns + this.xCursor)));
            this.conditionString = pItem.GetName();
            this.ho.generateEvent(CRunInventory.CND_NAMEDITEMSELECTED, 0);
            this.ho.generateEvent(CRunInventory.CND_ITEMSELECTED, hoPtr.hoOi);
            this.bRedraw = true;
        }
        return;
    },

    RACT_CURSOR: function (act) {
        var param1 = act.getParamExpression(this.rh, 0);
        if (param1 == 0) {
            this.flags &= ~(CRunInventory.IFLAG_FORCECURSOR | CRunInventory.IFLAG_CURSORBYACTION);
        }
        else {
            this.flags |= CRunInventory.IFLAG_FORCECURSOR | CRunInventory.IFLAG_CURSORBYACTION;
        }
        this.bRedraw = true;
        return;
    },

    RACT_ACTIVATE: function (act) {
        var param1 = act.getParamExpression(this.rh, 0);
        if (param1 != 0) {
            this.bActivated = true;
            this.flags |= CRunInventory.IFLAG_CURSOR | CRunInventory.IFLAG_FORCECURSOR;
        }
        else {
            this.bActivated = false;
            this.flags &= ~(CRunInventory.IFLAG_CURSOR | CRunInventory.IFLAG_FORCECURSOR);
        }
        this.bRedraw = true;
        return;
    },

    RACT_NAMEDSETSTRING: function (act) {
        this.inventory.SetDisplayString(this.number, act.getParamExpString(this.rh, 0), act.getParamExpString(this.rh, 1));
        this.UpdateDisplayList();
        return;
    },

    RACT_SETSTRING: function (act) {
        var hoPtr = act.getParamObject(this.rh, 0);
        var pOiList = hoPtr.hoOiList;
        this.inventory.SetDisplayString(this.number, pOiList.oilName, act.getParamExpString(this.rh, 1));
        this.UpdateDisplayList();
        return;
    },

    RACT_SETPOSITION: function (act) {
        var param1 = act.getParamExpression(this.rh, 1);
        if (this.type == CRunInventory.INVTYPE_LIST) {
            if (param1 < 0) {
                param1 = 0;
            }
            var last = Math.max(this.displayList.size() - this.nLines * this.nColumns, 0);
            if (param1 > last) {
                param1 = last;
            }
            this.position = last;
            this.bRedraw = true;
        }
        return;
    },

    RACT_SETPAGE: function (act) {
        var param1 = act.getParamExpression(this.rh, 1);
        if (this.type == CRunInventory.INVTYPE_LIST) {
            param1 = this.nLines * this.nColumns;
            if (param1 < 0) {
                param1 = 0;
            }
            var last = Math.max(this.displayList.size() - this.nLines * this.nColumns, 0);
            if (param1 > last) {
                param1 = last;
            }
            this.position = last;
            this.bRedraw = true;
        }
        return;
    },

    RACT_ADDGRIDITEM: function (act) {
        if (this.type == CRunInventory.INVTYPE_GRID) {
            var hoPtr = act.getParamObject(this.rh, 0);
            var x = act.getParamExpression(this.rh, 1);
            var y = act.getParamExpression(this.rh, 2);
            var pOiList = hoPtr.hoOiList;
            if (this.GridCanAdd(pOiList.oilName, x, y, false)) {
                var pItem = this.FindItem(pOiList.oilName);
                if (pItem == null) {
                    pItem = this.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
                }
                else if (pItem.x == x && pItem.y == y) {
                    this.inventory.AddItem(this.number, pOiList.oilName, 1, this.maximum, this.pDisplayString);
                }
                pItem.x = x;
                pItem.y = y;
                this.UpdateDisplayList();
            }
        }
        return;
    },

    RACT_ADDGRIDNITEMS: function (act) {
        if (this.type == CRunInventory.INVTYPE_GRID) {
            var hoPtr = act.getParamObject(this.rh, 0);
            var number = act.getParamExpression(this.rh, 1);
            var x = act.getParamExpression(this.rh, 2);
            var y = act.getParamExpression(this.rh, 3);
            var pOiList = hoPtr.hoOiList;
            if (this.GridCanAdd(pOiList.oilName, x, y, false)) {
                var pItem = FindItem(pOiList.oilName);
                if (pItem == null) {
                    pItem = this.inventory.AddItem(number, pOiList.oilName, number, this.maximum, this.pDisplayString);
                }
                else if (pItem.x == x && pItem.y == y) {
                    this.inventory.AddItem(number, pOiList.oilName, number, this.maximum, this.pDisplayString);
                }
                pItem.x = x;
                pItem.y = y;
                this.UpdateDisplayList();
            }
        }
        return;
    },

    RACT_NAMEDADDGRIDITEM: function (act) {
        if (this.type == CRunInventory.INVTYPE_GRID) {
            var pName = act.getParamExpString(this.rh, 0);
            var x = act.getParamExpression(this.rh, 1);
            var y = act.getParamExpression(this.rh, 2);
            if (this.GridCanAdd(pName, x, y, false)) {
                var pItem = this.FindItem(pName);
                if (pItem == null) {
                    pItem = this.inventory.AddItem(number, pName, 1, this.maximum, this.pDisplayString);
                }
                else if (pItem.x == x && pItem.y == y) {
                    this.inventory.AddItem(number, pName, 1, this.maximum, this.pDisplayString);
                }
                pItem.x = x;
                pItem.y = y;
                this.UpdateDisplayList();
            }
        }
        return;
    },

    RACT_NAMEDADDGRIDNITEMS: function (act) {
        if (this.type == CRunInventory.INVTYPE_GRID) {
            var pName = act.getParamExpString(this.rh, 0);
            var number = act.getParamExpression(this.rh, 1);
            var x = act.getParamExpression(this.rh, 2);
            var y = act.getParamExpression(this.rh, 3);
            if (GridCanAdd(pName, x, y, false)) {
                var pItem = FindItem(pName);
                if (pItem == null) {
                    pItem = this.inventory.AddItem(number, pName, number, this.maximum, this.pDisplayString);
                }
                else if (pItem.x == x && pItem.y == y) {
                    this.inventory.AddItem(number, pName, number, this.maximum, this.pDisplayString);
                }
                pItem.x = x;
                pItem.y = y;
                this.UpdateDisplayList();
            }
        }
        return;
    },

    HilightDrop: function (pName, xx, yy) {
        if (xx < 0 || xx >= this.nColumns || yy < 0 || yy >= this.nLines) {
            return;
        }

        var hoPtr;
        var n;
        for (n = 0; n < this.rh.rhOiList.length; n++) {
            if (this.rh.rhOiList[n].oilName == pName) {
                var number = this.rh.rhOiList[n].oilObject;
                if (number >= 0) {
                    hoPtr = this.rh.rhObjectList[number];
                    var sx = Math.floor((hoPtr.hoImgWidth + this.itemSx - 1) / this.itemSx);
                    var sy = Math.floor((hoPtr.hoImgHeight + this.itemSy - 1) / this.itemSy);
                    if (xx + sx <= this.nColumns && yy + sy <= this.nLines) {
                        this.rcDrop.left = xx * this.itemSx;
                        this.rcDrop.right = this.rcDrop.left + this.itemSx * sx;
                        this.rcDrop.top = yy * this.itemSy;
                        this.rcDrop.bottom = this.rcDrop.top + this.itemSy * sy;
                        this.bDropItem = true;
                        this.xCursor = xx;
                        this.yCursor = yy;
                        this.ho.redraw();
                    }
                }
            }
        }
    },

    RACT_HILIGHTDROP: function (act) {
        if (this.type == CRunInventory.INVTYPE_GRID) {
            var hoPtr = act.getParamObject(this.rh, 0);
            var x = act.getParamExpression(this.rh, 1);
            var y = act.getParamExpression(this.rh, 2);
            var pOiList = hoPtr.hoOiList;
            this.HilightDrop(pOiList.oilName, x, y);
        }
        return;
    },

    RACT_NAMEDHILIGHTDROP: function (act) {
        if (this.type == CRunInventory.INVTYPE_GRID) {
            var pName = act.getParamExpString(this.rh, 0);
            var x = act.getParamExpression(this.rh, 1);
            var y = act.getParamExpression(this.rh, 2);
            this.HilightDrop(pName, x, y);
        }
        return;
    },

    WriteAString: function (text) {
        return (text + CIni.separator);
    },

    WriteAByte: function (value) {
        return (value.toString() + CIni.separator);
    },

    WriteAShort: function (value) {
        return (value.toString() + CIni.separator);
    },

    WriteAnInt: function (value) {
        return (value.toString() + CIni.separator);
    },

    ReadAString: function (ptr, start, flg) {
        var end = ptr.indexOf(CIni.separator, start);
        var text = ptr.substring(start, end);
        var begin = end + CIni.separator.length;
        if (flg === 0) {
            return text;
        }
        else {
            return begin;
        }
    },

    ReadAByte: function (ptr, start, flg) {
        var end = ptr.indexOf(CIni.separator, start);
        var text = ptr.substring(start, end) & 0xFF;
        var begin = end + CIni.separator.length;
        if (flg === 0) {
            return text;
        }
        else {
            return begin;
        }
    },

    ReadAShort: function (ptr, start, flg) {
        var end = ptr.indexOf(CIni.separator, start);
        var value = parseInt(ptr.substring(start, end));
        var begin = end + CIni.separator.length;
        if (flg === 0) {
            return value;
        }
        else {
            return begin;
        }
    },

    ReadAInt: function (ptr, start, flg) {
        var end = ptr.indexOf(CIni.separator, start);
        var value = parseInt(ptr.substring(start, end));
        var begin = end + CIni.separator.length;
        if (flg === 0) {
            return value;
        }
        else {
            return begin;
        }
    },

    RACT_SAVE: function (act) {
        var filename = act.getParamExpString(this.rh, 0);
        if (filename.length > 0) {
            this.rh.rhApp.saveFile(filename, this.inventory.Save(this));
        }
        return;
    },

    RACT_LOAD: function (act) {
        var filename = act.getParamExpString(this.rh, 0);
        var buffer = this.rh.rhApp.loadFile(filename, "", true);

        if (buffer.length != 0) {
            this.inventory.Load(this, buffer);
            position = 0;
            xCursor = 0;
            yCursor = 0;
            this.UpdateDisplayList();
        }

        return;
    },

    expression: function (num) {
        switch (num) {
            case CRunInventory.EXP_NITEM:
                return this.REXP_NITEM();
            case CRunInventory.EXP_NAMEOFHILIGHTED:
                return this.REXP_NAMEOFHILIGHTED();
            case CRunInventory.EXP_NAMEOFSELECTED:
                return this.REXP_NAMEOFSELECTED();
            case CRunInventory.EXP_POSITION:
                return this.REXP_POSITION();
            case CRunInventory.EXP_PAGE:
                return this.REXP_PAGE();
            case CRunInventory.EXP_TOTAL:
                return this.REXP_TOTAL();
            case CRunInventory.EXP_DISPLAYED:
                return this.REXP_DISPLAYED();
            case CRunInventory.EXP_NUMOFSELECTED:
                return this.REXP_NUMOFSELECTED();
            case CRunInventory.EXP_NUMOFHILIGHTED:
                return this.REXP_NUMOFHILIGHTED();
            case CRunInventory.EXP_NAMEOFNUM:
                return this.REXP_NAMEOFNUM();
            case CRunInventory.EXP_MAXITEM:
                return this.REXP_MAXITEM();
            case CRunInventory.EXP_NUMBERMAXITEM:
                return this.REXP_NUMBERMAXITEM();
            case CRunInventory.EXP_NUMBERNITEM:
                return this.REXP_NUMBERNITEM();
            case CRunInventory.EXP_GETPROPERTY:
                return this.REXP_GETPROPERTY();
            case CRunInventory.EXP_NUMBERGETPROPERTY:
                return this.REXP_NUMBERGETPROPERTY();
        }
        return 0;
    },

    REXP_NITEM: function () {
        var pName = this.ho.getExpParam();
        var pItem = this.inventory.GetItem(this.number, pName);
        if (pItem != null) {
            return (pItem.GetQuantity());
        }
        return 0;
    },

    REXP_GETPROPERTY: function () {
        var pName = this.ho.getExpParam();
        var pProperty = this.ho.getExpParam();
        var pItem = this.inventory.GetItem(this.number, pName);
        if (pItem != null) {
            return (pItem.GetProperty(pProperty));
        }
        return 0;
    },

    REXP_MAXITEM: function () {
        var pName = this.ho.getExpParam();
        var pItem = this.inventory.GetItem(this.number, pName);
        if (pItem != null) {
            return (pItem.GetMaximum());
        }
        return 0;
    },

    REXP_NUMBERNITEM: function () {
        var num = this.ho.getExpParam();
        if (num >= 0 && num < this.displayList.size()) {
            var pItem = (this.displayList.get(num));
            if (pItem != null) {
                return (pItem.GetQuantity());
            }
        }
        return 0;
    },

    REXP_NUMBERGETPROPERTY: function () {
        var num = this.ho.getExpParam();
        var pProperty = this.ho.getExpParam();
        if (num >= 0 && num < this.displayList.size()) {
            var pItem = (this.displayList.get(num));
            if (pItem != null) {
                return (pItem.GetProperty(pProperty));
            }
        }
        return 0;
    },

    REXP_NUMBERMAXITEM: function () {
        var num = this.ho.getExpParam();
        if (num >= 0 && num < this.displayList.size()) {
            var pItem = (this.displayList.get(num));
            if (pItem != null) {
                return (pItem.GetMaximum());
            }
        }
        return 0;
    },

    REXP_NAMEOFHILIGHTED: function () {
        var ret;
        if (this.pNameHilighted != null) {
            ret = this.pNameHilighted;
        } else {
            ret = "";
        }
        return ret;
    },

    REXP_NAMEOFSELECTED: function () {
        var ret;
        if (this.pNameSelected != null) {
            ret = this.pNameSelected;
        } else {
            ret = "";
        }
        return ret;
    },

    REXP_POSITION: function () {
        return (this.position);
    },

    REXP_PAGE: function () {
        return Math.floor(this.position / (this.nLines * this.nColumns));
    },

    REXP_TOTAL: function () {
        return (this.displayList.size());
    },

    REXP_DISPLAYED: function () {
        return (Math.min(this.displayList.size() - this.position, this.nLines * this.nColumns));
    },

    REXP_NUMOFSELECTED: function () {
        return (this.numSelected);
    },

    REXP_NUMOFHILIGHTED: function () {
        return (this.numHilighted);
    },

    REXP_NAMEOFNUM: function () {
        var ret = "";
        var num = this.ho.getExpParam();
        if (num >= 0 && num < this.displayList.size()) {
            var pItem = (this.displayList.get(num));
            ret = pItem.GetName();
        }
        return ret;
    }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunInventory);

function CRunInventoryTextInfo() {
    this.visible = true;
    this.x = 0;
    this.y = 0;
}

function CRunInventoryList() {
    this.list = new CArrayList();
    this.position = 0;
}

CRunInventoryList.prototype = {
    Reset: function () {
        this.list.clear();
        this.position = 0;
    },

    GetItem: function (number, pName) {
        var n;
        for (n = 0; n < this.list.size(); n++) {
            var pItem = this.list.get(n);
            if (pItem.GetNumber() == number) {
                if (pItem.GetName() == pName) {
                    return pItem;
                }
            }
        }
        return null;
    },

    GetItemIndex: function (number, pName) {
        var n;
        for (n = 0; n < this.list.size(); n++) {
            var pItem = this.list.get(n);
            if (pItem.GetNumber() == number) {
                if (pItem.GetName() == pName) {
                    return n;
                }
            }
        }
        return 0;
    },

    FirstItem: function (number) {
        for (this.position = 0; this.position < this.list.size(); this.position++) {
            var pItem = this.list.get(this.position);
            if (pItem.GetNumber() == number) {
                this.position++;
                return pItem;
            }
        }
        return null;
    },

    NextItem: function (number) {
        for (; this.position < this.list.size(); this.position++) {
            var pItem = this.list.get(this.position);
            if (pItem.GetNumber() == number) {
                this.position++;
                return pItem;
            }
        }
        return null;
    },

    Save: function (inventory) {
        var writer = "";
        var nsize = this.list.size();
        writer += inventory.WriteAnInt(nsize);
        for (var n = 0; n < nsize; n++) {
            var pItem = this.list.get(n);
            writer += pItem.Save(inventory);
        }
        return writer;
    },

    Load: function (inventory, buffer) {
        var start = 0;
        this.Reset();
        var size = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        for (var n = 0; n < size; n++) {
            var pItem = new CRunInventoryItem(0, "", 0, 1, "");
            start = pItem.Load(inventory, buffer, start);
            this.list.add(pItem);
        }
    },

    AddItem: function (number, pName, quantity, maximum, pDisplayString) {
        var pItem = this.GetItem(number, pName);
        if (pItem == null) {
            pItem = new CRunInventoryItem(number, pName, quantity, maximum, pDisplayString);
            this.list.add(pItem);
        }
        else {
            pItem.AddQuantity(quantity);
            if (pItem.quantity == 0) {
                this.list.removeObject(pItem);
            }
        }
        return pItem;
    },

    AddItemToPosition: function (number, insert, pName, quantity, maximum, pDisplayString) {
        var n;
        var pItem2 = null;
        for (n = 0; n < this.list.size(); n++) {
            pItem2 = this.list.get(n);
            if (insert == pItem2.pName) {
                break;
            }
        }
        var pItem = this.GetItem(number, pName);
        if (pItem == null) {
            pItem = new CRunInventoryItem(number, pName, quantity, maximum, pDisplayString);
            this.list.insert(n, pItem);
        }
        else {
            this.list.swap(pItem, pItem2);
        }
        return pItem;
    },

    SubQuantity: function (number, pName, quantity) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            pItem.SubQuantity(quantity);
            if (pItem.quantity == 0) {
                this.list.removeObject(pItem);
                return true;
            }
        }
        return false;
    },

    SetMaximum: function (number, pName, max) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            pItem.SetMaximum(max);
        }
    },

    GetQuantity: function (number, pName) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            return pItem.GetQuantity();
        }
        return -1;
    },

    GetMaximum: function (number, pName) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            return pItem.GetMaximum();
        }
        return -1;
    },

    DelItem: function (number, pName) {
        var index = this.GetItemIndex(number, pName);
        if (index >= 0) {
            this.list.removeIndex(index);
        }
    },

    SetFlags: function (number, pName, mask, flag) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            pItem.SetFlags(mask, flag);
        }
    },

    GetFlags: function (number, pName) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            return pItem.GetFlags();
        }
        return 0;
    },

    SetDisplayString: function (number, pName, pDisplayString) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            pItem.SetDisplayString(pDisplayString);
        }
    },

    GetDisplayString: function (number, pName) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            return pItem.GetDisplayString();
        }
        return null;
    },

    AddProperty: function (number, pName, propName, value) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            pItem.AddProperty(propName, value);
        }
    },

    SetPropertyMinimum: function (number, pName, propName, value) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            pItem.SetPropertyMinimum(propName, value);
        }
    },

    SetPropertyMaximum: function (number, pName, propName, value) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            pItem.SetPropertyMinimum(propName, value);
        }
    },

    GetProperty: function (number, pName, propName) {
        var pItem = this.GetItem(number, pName);
        if (pItem != null) {
            return pItem.GetProperty(propName);
        }
        return 0;
    }
}

CRunInventoryItem.FLAG_VISIBLE = 0x0001;

function CRunInventoryItem(n, ptr, q, max, displayString) {
    this.number = n;
    this.pName = ptr;
    this.pDisplayString = displayString;
    this.maximum = Math.max(max, 1);
    this.quantity = Math.min(q, this.maximum);
    this.quantity = Math.max(this.quantity, 0);
    this.flags = CRunInventoryItem.FLAG_VISIBLE;
    this.properties = new CArrayList();
    this.x = 0;
    this.y = 0;
}

CRunInventoryItem.prototype = {
    Reset: function () {
        this.properties.clear();
    },

    SetFlags: function (mask, flag) {
        this.flags = (this.flags & mask) | flag;
    },

    GetName: function () {
        return this.pName;
    },

    GetDisplayString: function () {
        return this.pDisplayString;
    },

    GetQuantity: function () {
        return this.quantity;
    },

    GetMaximum: function () {
        return this.maximum;
    },

    GetNumber: function () {
        return this.number;
    },

    GetFlags: function () {
        return this.flags;
    },

    SetDisplayString: function (displayString) {
        this.pDisplayString = displayString;
    },

    SetQuantity: function (q) {
        q = Math.max(q, 0);
        q = Math.min(q, this.maximum);
        this.quantity = q;
    },

    AddQuantity: function (q) {
        q = Math.max(q + this.quantity, 0);
        q = Math.min(q, this.maximum);
        this.quantity = q;
    },

    SubQuantity: function (q) {
        q = Math.max(this.quantity - q, 0);
        q = Math.min(q, this.maximum);
        this.quantity = q;
    },

    SetMaximum: function (m) {
        this.maximum = Math.max(m, 1);
        this.quantity = Math.min(this.quantity, this.maximum);
    },

    FindProperty: function (pName) {
        var n;
        for (n = 0; n < this.properties.size(); n++) {
            var pProperty = this.properties.get(n);
            if (pName == this.pProperty.pName) {
                return pProperty;
            }
        }
        return null;
    },

    AddProperty: function (pName, value) {
        var pProperty = this.FindProperty(pName);
        if (pProperty != null) {
            pProperty.AddValue(value);
        }
        else {
            pProperty = new CRunInventoryProperty(pName, value, 0x80000000, 0x7FFFFFFF);
            this.properties.add(pProperty);
        }
    },

    SetPropertyMinimum: function (pName, min) {
        var pProperty = this.FindProperty(pName);
        if (pProperty != null) {
            pProperty.SetMinimum(min);
        }
        else {
            pProperty = new CRunInventoryProperty(pName, 0, min, 0x7FFFFFFF);
            this.properties.add(pProperty);
        }
    },

    SetPropertyMaximum: function (pName, max) {
        var pProperty = this.FindProperty(pName);
        if (pProperty != null) {
            pProperty.SetMaximum(max);
        }
        else {
            pProperty = new CRunInventoryProperty(pName, 0, 0x80000000, max);
            this.properties.add(pProperty);
        }
    },

    GetProperty: function (pName) {
        var pProperty = this.FindProperty(pName);
        if (pProperty != null) {
            return pProperty.GetValue();
        }
        return 0;
    },

    Save: function Save(inventory) {
        var writer = ""
        writer += inventory.WriteAnInt(this.number);
        writer += inventory.WriteAnInt(this.flags);
        writer += inventory.WriteAnInt(this.quantity);
        writer += inventory.WriteAnInt(this.maximum);
        writer += inventory.WriteAnInt(this.x);
        writer += inventory.WriteAnInt(this.y);

        writer += inventory.WriteAString(this.pName);
        inventory
        writer += inventory.WriteAString(this.pDisplayString);

        var l = this.properties.size();
        writer += inventory.WriteAnInt(l);
        for (var n = 0; n < l; n++) {
            var pProperty = this.properties.get(n);
            writer += pProperty.Save(inventory);
        }
        return writer;
    },

    Load: function (inventory, buffer, start) {
        this.Reset();

        this.number = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        this.flags = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        this.quantity = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        this.maximum = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        this.x = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        this.y = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);

        this.pName = inventory.ReadAString(buffer, start, 0);
        start = inventory.ReadAString(buffer, start, 1);
        this.pDisplayString = inventory.ReadAString(buffer, start, 0);
        start = inventory.ReadAString(buffer, start, 1);

        var l;
        l = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        for (var n = 0; n < l; n++) {
            var pProperty = new CRunInventoryProperty("", 0, 0, 0);
            start = pProperty.Load(inventory, buffer, start);
            this.properties.add(pProperty);
        }
        return start;
    },
}

function CRunInventoryProperty(name, v, min, max) {
    this.pName = name;
    this.value = v;
    this.minimum = min;
    this.maximum = max;
}

CRunInventoryProperty.prototype = {
    AddValue: function (v) {
        this.value = Math.max(Math.min(this.value + v, this.maximum), this.minimum);
    },

    Save: function (inventory) {
        var writer = "";
        writer += inventory.WriteAString(this.pName);
        writer += inventory.WriteAnInt(this.value);
        writer += inventory.WriteAnInt(this.minimum);
        writer += inventory.WriteAnInt(this.maximum);
        return writer;
    },

    Load: function (inventory, buffer, start) {
        this.pName = inventory.ReadAString(buffer, start, 0);
        start = inventory.ReadAString(buffer, start, 1);
        this.value = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        this.minimum = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        this.maximum = inventory.ReadAInt(buffer, start, 0);
        start = inventory.ReadAInt(buffer, start, 1);
        return start;
    },

    SetMinimum: function (m) {
        this.minimum = m;
        this.value = Math.max(Math.min(this.value, this.maximum), this.minimum);
    },

    SetMaximum: function (m) {
        this.maximum = m;
        this.value = Math.max(Math.min(this.value, this.maximum), this.minimum);
    },

    GetValue: function () {
        return this.value;
    }
}

CRunInventoryScrollBar.SX_SLIDER = 13;
CRunInventoryScrollBar.SY_SLIDER = 13;
CRunInventoryScrollBar.ZONE_NONE = 0;
CRunInventoryScrollBar.ZONE_TOPARROW = 1;
CRunInventoryScrollBar.ZONE_TOPCENTER = 2;
CRunInventoryScrollBar.ZONE_SLIDER = 3;
CRunInventoryScrollBar.ZONE_BOTTOMCENTER = 4;
CRunInventoryScrollBar.ZONE_BOTTOMARROW = 5;
CRunInventoryScrollBar.SCROLL_UP = 0;
CRunInventoryScrollBar.SCROLL_PAGEUP = 1;
CRunInventoryScrollBar.SCROLL_SLIDE = 2;
CRunInventoryScrollBar.SCROLL_PAGEDOWN = 3;
CRunInventoryScrollBar.SCROLL_DOWN = 4;

function CRunInventoryScrollBar() {
    this.position = 0;
    this.length = 0;
    this.total = 0;
    this.color = 0;
    this.colorHilight = 0;
    this.rhPtr = 0;
    this.data = 0;
    this.topArrow = new CRect();
    this.slider = new CRect();
    this.center = new CRect();
    this.bottomArrow = new CRect();
    this.surface = new CRect();
    this.zone = 0;
    this.oldBDown = false;
    this.xStart = 0;
    this.yStart = 0;
    this.bDragging = false;
    this.bInitialised = false;
    this.bHorizontal = false;
}

CRunInventoryScrollBar.prototype = {
    Initialise: function (rh, x, y, sx, sy, c, ch, dInventory) {
        this.rhPtr = rh;
        this.data = dInventory;
        this.color = c;
        this.colorHilight = ch;

        this.surface.left = x;
        this.surface.top = y;
        this.surface.right = x + sx;
        this.surface.bottom = y + sy;
        if (sx > sy) {
            this.bHorizontal = true;
            this.topArrow.left = x;
            this.topArrow.top = y;
            this.topArrow.right = x + CRunInventoryScrollBar.SX_SLIDER - 1;
            this.topArrow.bottom = y + sy;

            this.center.left = x + CRunInventoryScrollBar.SX_SLIDER + 1;
            this.center.top = y;
            this.center.right = x + sx - CRunInventoryScrollBar.SX_SLIDER - 1;
            this.center.bottom = y + sy;

            this.bottomArrow.left = x + sx - CRunInventoryScrollBar.SX_SLIDER + 1;
            this.bottomArrow.top = y;
            this.bottomArrow.right = x + sx - 1;
            this.bottomArrow.bottom = y + sy;
        }
        else {
            this.bHorizontal = false;
            this.topArrow.left = x;
            this.topArrow.top = y;
            this.topArrow.right = x + sx - 1;
            this.topArrow.bottom = y + CRunInventoryScrollBar.SY_SLIDER - 1;

            this.center.left = x;
            this.center.top = y + CRunInventoryScrollBar.SY_SLIDER + 1;
            this.center.right = x + sx - 1;
            this.center.bottom = y + sy - CRunInventoryScrollBar.SY_SLIDER - 1;

            this.bottomArrow.left = x;
            this.bottomArrow.top = y + sy - CRunInventoryScrollBar.SY_SLIDER + 1;
            this.bottomArrow.right = x + sx - 1;
            this.bottomArrow.bottom = y + sy - 1;
        }
        this.SetPosition(this.position, this.length, this.total);
        this.bInitialised = true;
    },

    SetPosition: function (p, l, t) {
        this.position = p;
        this.length = l;
        this.total = t;

        if (this.total > 0) {
            if (this.bHorizontal) {
                this.slider.left = Math.floor(Math.min(this.center.left + (this.position * (this.center.right - this.center.left)) / this.total, this.center.right))
                this.slider.right = Math.floor(Math.min(this.slider.left + (this.length * (this.center.right - this.center.left)) / this.total, this.center.right))+1;
                this.slider.top = this.center.top;
                this.slider.bottom = this.center.bottom;
            } else {
                this.slider.top = Math.floor(Math.min(this.center.top + (this.position * (this.center.bottom - this.center.top)) / this.total, this.center.bottom));
                this.slider.bottom = Math.floor(Math.min(this.slider.top + (this.length * (this.center.bottom - this.center.top)) / this.total, this.center.bottom))+1;
                this.slider.left = this.center.left;
                this.slider.right = this.center.right;
            }
        }
    },

    IsMouseInBar: function (xx, yy) {
        if (this.bInitialised) {
            return this.surface.ptInRect(xx, yy);
        }
        return false;
    },

    IsDragging: function () {
        return this.bDragging;
    },

    GetZone: function (xx, yy) {
        if (this.bDragging) {
            return CRunInventoryScrollBar.ZONE_SLIDER;
        }
        if (this.topArrow.ptInRect(xx, yy)) {
            return CRunInventoryScrollBar.ZONE_TOPARROW;
        }
        if (this.bottomArrow.ptInRect(xx, yy)) {
            return CRunInventoryScrollBar.ZONE_BOTTOMARROW;
        }
        if (this.center.ptInRect(xx, yy)) {
            if (this.slider.ptInRect(xx, yy)) {
                return CRunInventoryScrollBar.ZONE_SLIDER;
            }
            if (this.bHorizontal) {
                if (xx < this.slider.left) {
                    return CRunInventoryScrollBar.ZONE_TOPCENTER;
                }
                else {
                    return CRunInventoryScrollBar.ZONE_BOTTOMCENTER;
                }
            }
            else {
                if (yy < this.slider.top) {
                    return CRunInventoryScrollBar.ZONE_TOPCENTER;
                }
                else {
                    return CRunInventoryScrollBar.ZONE_BOTTOMCENTER;
                }
            }
        }
        return CRunInventoryScrollBar.ZONE_NONE;
    },

    Handle: function (xx, yy) {
        var delta;
        var pos;
        if (this.bInitialised && this.length < this.total) {
            this.zone = this.GetZone(xx, yy);

            var bDown = this.rhPtr.rhApp.getKeyState(CRunApp.VK_LBUTTON);
            if (bDown != this.oldBDown) {
                this.oldBDown = bDown;
                if (bDown) {
                    switch (this.zone) {
                        case CRunInventoryScrollBar.ZONE_TOPARROW:
                            this.data.Scroll(CRunInventoryScrollBar.SCROLL_UP, 0);
                            break;
                        case CRunInventoryScrollBar.ZONE_TOPCENTER:
                            this.data.Scroll(CRunInventoryScrollBar.SCROLL_PAGEUP, 0);
                            break;
                        case CRunInventoryScrollBar.ZONE_BOTTOMCENTER:
                            this.data.Scroll(CRunInventoryScrollBar.SCROLL_PAGEDOWN, 0);
                            break;
                        case CRunInventoryScrollBar.ZONE_BOTTOMARROW:
                            this.data.Scroll(CRunInventoryScrollBar.SCROLL_DOWN, 0);
                            break;
                        case CRunInventoryScrollBar.ZONE_SLIDER:
                            this.xStart = xx;
                            this.yStart = yy;
                            this.bDragging = true;
                            break;
                    }
                }
                else {
                    this.bDragging = false;
                }
            }
            else {
                if (this.bDragging) {
                    if (this.bHorizontal) {
                        delta = xx - this.xStart;
                        delta = Math.floor((delta * this.total) / (this.center.right - this.center.left));
                        if (delta != 0) {
                            pos = this.position + delta;
                            pos = Math.max(pos, 0);
                            pos = Math.min(pos, this.total - this.length);
                            this.data.Scroll(CRunInventoryScrollBar.SCROLL_SLIDE, pos);
                            this.xStart = xx;
                        }
                    }
                    else {
                        delta = yy - this.yStart;
                        delta = Math.floor((delta * this.total) / (this.center.bottom - this.center.top));
                        if (delta != 0) {
                            pos = this.position + delta;
                            pos = Math.max(pos, 0);
                            pos = Math.min(pos, this.total - this.length);
                            this.data.Scroll(CRunInventoryScrollBar.SCROLL_SLIDE, pos);
                            this.yStart = yy;
                        }
                    }
                }
            }
        }
    },

    DrawBar: function (context) {
        if (this.bInitialised === true && this.length < this.total) {
            //outline
            context.renderOutlineRect(this.center.left, this.center.top, this.center.right - this.center.left, this.center.bottom - this.center.top, this.color, 1, 0, 0);

            //slider
            var color;
            var sliderGripColor;
            if (this.zone == CRunInventoryScrollBar.ZONE_SLIDER) {
                color = this.colorHilight;
                sliderGripColor = this.color;
            } else {
                color = this.color;
                sliderGripColor = this.colorHilight;
            }
            var sliderX = this.slider.left;
            var sliderY = this.slider.top;
            var sliderWidth = this.slider.right - this.slider.left;
            var sliderHeight = this.slider.bottom - this.slider.top
            var sliderGripX1 = 0;
            var sliderGripY1 = 0;
            var sliderGripX2 = 0;
            var sliderGripY2 = 0;
            var sliderGripSpace = 4;
            var sliderGripPadding = 2;

            context.renderFilledRect(sliderX, sliderY, sliderWidth, sliderHeight, color, 0, 0);
            context.renderOutlineRect(sliderX, sliderY, sliderWidth, sliderHeight, this.color, 1, 0, 0);

            //slider grips
            if (this.bHorizontal) {
                if (sliderWidth > sliderGripSpace + sliderGripSpace + 4) {
                    sliderGripX1 = sliderX + (sliderWidth / 2);
                    sliderGripY1 = sliderY + sliderGripPadding;
                    sliderGripX2 = sliderGripX1;
                    sliderGripY2 = sliderY + sliderHeight - sliderGripPadding;

                    context.renderLine(sliderGripX1, sliderGripY1, sliderGripX2, sliderGripY2, sliderGripColor, 1);
                    context.renderLine(sliderGripX1 - sliderGripSpace, sliderGripY1, sliderGripX2 - sliderGripSpace, sliderGripY2, sliderGripColor, 1);
                    context.renderLine(sliderGripX1 + sliderGripSpace, sliderGripY1, sliderGripX2 + sliderGripSpace, sliderGripY2, sliderGripColor, 1);
                }
            } else {
                if (sliderHeight > sliderGripSpace + sliderGripSpace + 4) {
                    sliderGripX1 = sliderX + sliderGripPadding;
                    sliderGripY1 = sliderY + (sliderHeight / 2);
                    sliderGripX2 = sliderX + sliderWidth - sliderGripPadding;
                    sliderGripY2 = sliderGripY1

                    context.renderLine(sliderGripX1, sliderGripY1, sliderGripX2, sliderGripY2, sliderGripColor, 1);
                    context.renderLine(sliderGripX1, sliderGripY1 - sliderGripSpace, sliderGripX2, sliderGripY2 - sliderGripSpace, sliderGripColor, 1);
                    context.renderLine(sliderGripX1, sliderGripY1 + sliderGripSpace, sliderGripX2, sliderGripY2 + sliderGripSpace, sliderGripColor, 1);
                }
            }

            var currentColor, y;
            if (this.bHorizontal) {
                //left arrow
                if (this.zone == CRunInventoryScrollBar.ZONE_TOPARROW) {
                    color = this.colorHilight;
                } else {
                    color = this.color;
                }
                context.renderFilledLeftArrow(this.topArrow.left, this.topArrow.top, this.topArrow.right - this.topArrow.left, this.topArrow.bottom - this.topArrow.top, color);

                //right arrow
                if (this.zone == CRunInventoryScrollBar.ZONE_BOTTOMARROW) {
                    color = this.colorHilight;
                } else {
                    color = this.color;
                }
                context.renderFilledRightArrow(this.bottomArrow.left, this.bottomArrow.top, this.bottomArrow.right - this.bottomArrow.left, this.bottomArrow.bottom - this.bottomArrow.top, color);

            } else {
                //up arrow
                if (this.zone == CRunInventoryScrollBar.ZONE_TOPARROW) {
                    color = this.colorHilight;
                } else {
                    color = this.color;
                }
                context.renderFilledUpArrow(this.topArrow.left, this.topArrow.top, this.topArrow.right - this.topArrow.left, this.topArrow.bottom - this.topArrow.top, color);

                //down arrow
                if (this.zone == CRunInventoryScrollBar.ZONE_BOTTOMARROW) {
                    color = this.colorHilight;
                } else {
                    color = this.color;
                }
                context.renderFilledDownArrow(this.bottomArrow.left, this.bottomArrow.top, this.bottomArrow.right - this.bottomArrow.left, this.bottomArrow.bottom - this.bottomArrow.top, color);
            }
        }
    },
}

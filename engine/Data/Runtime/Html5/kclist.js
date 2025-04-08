/* List object (James) */
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
CRunkclist.LIST_FREEFLAG = 0x0001,
	CRunkclist.LIST_VSCROLLBAR = 0x0002,
	CRunkclist.LIST_SORT = 0x0004,
	CRunkclist.LIST_BORDER = 0x0008,
	CRunkclist.LIST_HIDEONSTART = 0x0010,
	CRunkclist.LIST_SYSCOLOR = 0x0020,
	CRunkclist.LIST_3DLOOK = 0x0040,
	CRunkclist.LIST_SCROLLTONEWLINE = 0x0080;

this.kclist = CRunkclist;

function CRunkclist()
{
	this.list =
	{
		doubleClickEvent:      -1,
		selectionChangedEvent: -1,
		oneBased:              true,
		background:            null,
		foreground:            null,
		flags:                 0
    };

    this.listCreated = false;
    this.listFontInfo = '';
    this.listFocused = false;
    this.listDisabled = false;
    this.listSelectedIndex = -1;
    this.listRows = new CArrayList();
};

CRunkclist.prototype = CServices.extend(new CRunControl(),
	{
		_getIndex: function (act, index, verify)
		{
			index = (act ? act.getParamExpression(this.rh, index) : this.ho.getExpParam()) - (this.list.oneBased ? 1 : 0);

            if (verify && (index < 0 || index >= this.countRows()))
				throw new Error("Bad index: " + index);

			return index;
		},

		_fixIndex: function (index)
		{
			return index + (this.list.oneBased ? 1 : 0);
		},

        _indexInBounds: function (index) {
            if (index < 0) {
                return 0;
            }

            var total = this.countRows();
            if (index >= total) {
                return total - 1;
            }

            return index;
        },

		_updateColor: function (e)
		{
            if (this.listCreated) {
                if (this.list.flags & CRunkclist.LIST_SYSCOLOR) {
                    return;
                }

                this.element.style.backgroundColor = CServices.getColorString(this.list.background);
                this.element.style.color = CServices.getColorString(this.list.foreground);
            }
		},

        _updateListRowIndexes: function (start) {
            var total = this.countRows();
            var row;
            for (var index = start; index < total; index++) {
                row = this.listRows.get(index);
                row.index = index;
            }
        },

        _createList: function () {
            if (!this.listCreated) {
                var total = this.countRows();
                var list = this.list;
                this.listCreated = true;

                //create the element
                var element = document.createElement('select');
                element.className = 'fusionRunControlKcList';
                element.size = 10;
                element.style['overflow-y'] = 'auto';     // automatic scrollbar (not in ua)

                //apply theme
                //Runtime.onThemeElement(element, CRuntime.THEME_ELEMENT_LIST);

                //setup "look" of the list
                if (list.flags & CRunkclist.LIST_3DLOOK) {
                    element.style.borderStyle = 'inset';
                    element.style.borderWidth = '2px';
                } else {
                    element.style.borderStyle = 'solid';

                    if (list.flags & CRunkclist.LIST_BORDER) {
                        element.style.borderWidth = '1px';
                        element.style.borderColor = '#000000';
                    } else {
                        element.style.borderWidth = '0px';
                    }
                }

                //add events
                var that = this;
                element.ondblclick = function () {
                    that.list.doubleClickEvent = that.ho.getEventCount();
                    that.ho.generateEvent(2, 0);
                };

                element.onchange = function () {
                    that.listSelectedIndex = that.element.selectedIndex;
                    that.list.selectionChangedEvent = that.ho.getEventCount();
                    that.ho.generateEvent(3, 0);
                };

                element.onfocus = function () {
                    that.listFocused = true;
                };

                element.onblur = function () {
                    that.listFocused = false;
                };

                //update the extension runtime
                this.setElement(element, (list.flags & CRunkclist.LIST_HIDEONSTART) == 0);

                //add data into the list
                var row;
                for (var index = 0; index < total; index++) {
                    row = this.listRows.get(index);
                    this.addRow(row.value);

                    if (row.data != null) {
                        this.setRowData(index, row.data);
                    }
                }

                //dont need row array anymore
                this.listRows = null;

                //apply our previous states
                this.selectRow(this.listSelectedIndex);

                if (this.listDisabled) {
                    this.disableList();
                } else {
                    this.enableList();
                }

                if (this.listFocused) {
                    this.focusList();
                } else {
                    this.blurList();
                }

                //set font of list
                this.setFont(this.listFontInfo);

                //update colors
                this._updateColor();
            }
        },

		getNumberOfConditions: function ()
		{
			return 5;
		},

		createRunObject: function (file, cob, version)
		{
            //helpful pointers
            var list = this.list;

            //dimensions
            this.ho.hoImgWidth = file.readAShort();
            this.ho.hoImgHeight = file.readAShort();

            //get font info
            this.listFontInfo = this.ho.hoAdRunHeader.rhApp.bUnicode ? file.readLogFont() : file.readLogFont16();

            //foreground color
            list.foreground = file.readAColor();

            //skip text style and custom colors
            file.skipBytes(40 * 2 + 16 * 4);

            //background color
            list.background = file.readAColor();

            //flags
            list.flags = file.readAInt();

            //number of lines to read
            var lineCount = file.readShort();

            //is it 1 based indexing?
            list.oneBased = file.readAInt() == 1;

            //skip secure
            file.skipBytes(4 * 3);

            //make sure teh list is created if set to at start
            if ((list.flags & CRunkclist.LIST_HIDEONSTART) == 0) {
                this._createList();
            }

            //add starting data to the list, without sorting
            while ((lineCount--) > 0) {
                this.addRow(file.readAString(), false);
            }

            //now sort
            this.sortRows();
        },

		/*
		 handleRunObject:function()
		 {
		 if (!this.rh.rhApp.loading && this.visible)
		 this.element.style.visibility = 'visible';

		 return CRunExtension.REFLAG_DISPLAY;
		 },

		 displayRunObject:function(context, xx, yy)
		 {
		 this.setPosition(this.ho.hoX, this.ho.hoY);
		 return 0;
		 },
		 */
		condition:       function (num, cnd)
		{
			switch (num)
			{
				case 0: /* Is visible? */
                    return this.listVisible;

				case 1: /* Is enabled? */
                    return !this.listDisabled;

				case 2: /* Double clicked */

                    return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 || (this.ho.getEventCount() == this.list.doubleClickEvent);

				case 3: /* Selection changed */

                    return (this.ho.hoFlags & CObject.HOF_TRUEEVENT) != 0 || (this.ho.getEventCount() == this.list.selectionChangedEvent);

				case 4: /* Has focus */
                    return this.listFocused;
			}
			;
		},

		action: function (num, act)
		{
			try
			{
				switch (num)
				{
                    case 0: /* Load list */

                        this.clearRows();

						var filename = CServices.parseName(act.getParamFilename(this.rh, 0));
						var text = localStorage.getItem(filename);
						var end, begin = 0;
						if (text)
						{
							while (begin < text.length)
							{
								end = text.indexOf(CIni.separator, begin);
                                this.addRow(text.substring(begin, end), false);
								begin = end + CIni.separator.length;
							}
                            this.sortRows();
							break;
						}

						try
						{
							var file, efile = this.rh.rhApp.getEmbeddedFile(filename);

							if (efile)
								file = efile.open();

							if (!file)
							{
								file = new CFile();
								file.openFile(filename);
							}

							if (!file)
							    break;

							file.detectUnicode();

							var i = 0;
							while (!file.isEOF()) {
                                this.addRow(file.readAStringEOL(), false);
							}

                            this.sortRows();
						}
						catch (e)
						{
							if (document.debug)
								throw e;

                            this.clearRows();
						}

						break;

					case 1: /* Load drives list */
						break;

					case 2: /* Load directory list */
						break;

					case 3: /* Load files list */
						break;

					case 4: /* Save list */
						var name = CServices.parseName(act.getParamFilename(this.rh, 0));
                        localStorage.setItem(name, this.implodeRows(CIni.separator));
						break;

					case 5: /* Reset */
                        this.clearRows();
						break;

					case 6: /* Add line */
                        this.addRow(act.getParamExpString(this.rh, 0), true);
						break;

					case 7: /* Insert line */
					    var position = this._getIndex(act, 0, false);
						var line = act.getParamExpString(this.rh, 1);

                        if (position < 0 || position >= this.countRows()) {
                            this.addRow(line, true);
                        } else {
                            this.insertRow(line, position, true);
                        }
						break;

					case 8: /* Delete line */
                        this.removeRow(this._getIndex(act, 0, true));
						break;

					case 9: /* Set current line */
                        this.selectRow(this._getIndex(act, 0, false));
						break;

					case 10: /* Show */
						this.ho.bShown = true;
                        this.showList();
						break;

					case 11: /* Hide */
                        this.ho.bShown = false;
                        this.hideList();
						break;

					case 12: /* Activate */
                        this.focusList();
						break;

					case 13: /* Enable */
                        this.enableList();
						break;

					case 14: /* Disable */
                        this.disableList();
						break;

					case 15: /* Set position */
						var position = act.getParamPosition(this.rh, 0);
                        if (position.found) {
                            this.setPosition(position.x, position.y);
                        }
						break;

					case 16: /* Set X position */
						this.setX(act.getParamExpression(this.rh, 0));
						break;

					case 17: /* Set Y position */
						this.setY(act.getParamExpression(this.rh, 0));
						break;

					case 18: /* Set size */
						this.setSize(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1));
						break;

					case 19: /* Set width */
						this.setWidth(act.getParamExpression(this.rh, 0));
						break;

					case 20: /* Set height */
						this.setHeight(act.getParamExpression(this.rh, 0));
						break;

					case 21: /* Deactivate */
                        this.blurList();
						break;

					case 22: /* Scroll to top */
                        this.scrollListTo(0);
						break;

					case 23: /* Scroll to line */
                        this.scrollListTo(this._getIndex(act, 0, true));
						break;

					case 24: /* Scroll to end */
                        this.scrollListTo(this.countRows() - 1);
						break;

					case 25: /* Set color */
                        this.list.foreground = act.getParamColour(this.rh, 0);
                        this._updateColor();
						break;

					case 26: /* Set background color */
                        this.list.background = act.getParamColour(this.rh, 0);
                        this._updateColor();
						break;

					case 27: /* Load font list */
						break;

					case 28: /* Load font size list */
						break;

					case 29: /* Set line data */
                        var index = this._getIndex(act, 0, true);
                        var data = act.getParamExpression(this.rh, 1);
                        this.setRowData(index, data);
						break;

					case 30: /* Change line */
                        var index = this._getIndex(act, 0, true);
                        var text = act.getParamExpString(this.rh, 1);

                        this.setRow(index, text);
						break;
				}
			}
			catch (e)
			{
			}
		},

		expression: function (num)
		{
			switch (num)
			{
				case 0: /* Get selection index */
                    return this._fixIndex(this.getSelectedRowIndex());

				case 1: /* Get selection text */
                    return this.getSelectedRow();

				case 2: /* Get selection directory */
					return '';

				case 3: /* Get selection drive */
					return '';

                case 4: /* Get line text */
                    return this.getRow(this._getIndex(null, 0, false));

				case 5: /* Get line directory */
					this.ho.getExpParam();
					return '';

				case 6: /* Get line drive */
					this.ho.getExpParam();
					return '';

				case 7: /* Get number of lines */
                    return this.countRows();

				case 8: /* Get X */
					return this.ho.hoX;

				case 9: /* Get Y */
					return this.ho.hoY;

				case 10: /* Get width */
					return this.ho.hoImgWidth;

				case 11: /* Get height */
					return this.ho.hoImgHeight;

				case 12: /* Get color */
					return this.list.foreground;

				case 13: /* Get background color */
					return this.list.background;

				case 14: /* Find string */
                    var what = this.ho.getExpParam().toLowerCase();
                    var startIndex = this._getIndex(null, 0, false);
                    var result = this.findRow(what, startIndex, false);

                    //check for not found
                    if (result == -1) {
                        return result;
                    }

                    //make sure the index is correct for return
                    return this._fixIndex(result);

				case 15: /* Find string exact */
                    var what = this.ho.getExpParam().toLowerCase();
                    var startIndex = this._getIndex(null, 0, false);
                    var result = this.findRow(what, startIndex, true);

                    //check for not found
                    if (result == -1) {
                        return result;
                    }

                    //make sure the index is correct for return
                    return this._fixIndex(result);

				case 16: /* Get last index */
                    return this.countRows() - (this.list.oneBased ? 0 : 1);

                case 17: /* Get line data */
                    return this.getRowData(this._getIndex(null, 0, false));
			}
		},

        getRunObjectTextColor: function () {
            return this.list.foreground;
        },

        setRunObjectTextColor: function (rgb) {
            this.list.foreground = rgb;
            this._updateColor();
        },

        //list api
        showList: function () {
            //make sure the list is created
            this._createList();

            if (this.listCreated) {
                this.element.style.visibility = 'visible';
            }
        },

        hideList: function () {
            if (this.listCreated) {
                this.element.style.visibility = 'hidden';
            }
        },

        focusList: function () {
            this.listFocused = true;

            if (this.listCreated) {
                this.element.focus();
            }
        },

        blurList: function () {
            this.listFocused = false;

            if (this.listCreated) {
                this.element.blur();
            }
        },

        enableList: function () {
            this.listDisabled = false;

            if (this.listCreated) {
                this.element.disabled = false;
            }
        },

        disableList: function () {
            this.listDisabled = true;

            if (this.listCreated) {
                this.element.disabled = true;
            }
        },

        scrollListTo: function (index) {
            //fix bounds of index
            index = this._indexInBounds(index);

            this.listSelectedIndex = index;
            if (this.listCreated) {
                this.element.selectedIndex = index;
            }
        },

        //row api
        getRow: function (index) {
            if (index < 0 || index >= this.countRows()) {
                return "";
            }

            //where is the data stored?
            if (this.listCreated) {
                //list
                return this.element.options[index].textContent;
            } else {
                //array
                return this.listRows.get(index).value;
            }
        },

        getRowData: function (index) {
            //check out of bounds
            if (index < 0 || index >= this.countRows()) {
                return "";
            }

            //where is the data stored?
            var result = null;
            if (this.listCreated) {
                //list

                //get data and check it existed!
                result = Number(this.element.options[index].getAttribute('data-mmf'));

            } else {
                //array
                result = this.listRows.get(index).data;
            }

            //check result
            if (result == null) {
                return "";
            }

            return result;
        },

        addRow: function (value, sort) {
            //add row

            //where is the data stored?
            if (this.listCreated) {
                //list
                this.element.add(new Option(value));
            } else {
                //array
                this.listRows.add({
                    index: this.countRows(),
                    value: value,
                    data: null,
                });
            }

            //do we need to sort?
            if (sort) {
                this.sortRows();
            }
        },

        insertRow: function (value, index, sort) {
            //insert row

            //where is the data stored?
            if (this.listCreated) {
                //list
                this.element.add(new Option(value), index);
            } else {
                //array
                this.listRows.insert({
                    index: 0,
                    value: value,
                    data: null,
                }, index);

                //update all indexes
                this._updateListRowIndexes(index + 1);
            }

            //do we need to sort?
            if (sort) {
                this.sortRows();
            }
        },

        setRow: function (index, value) {
            if (index < 0 || index >= this.countRows()) {
                return;
            }

            //where is the data stored?
            if (this.listCreated) {
                //list
                this.element.options[index].textContent = value;
            } else {
                //array
                var row = this.listRows.get(index);
                row.value = value;
            }
        },

        setRowData: function (index, data) {
            if (index < 0 || index >= this.countRows()) {
                return;
            }

            //where is the data stored?
            if (this.listCreated) {
                //list
                this.element.options[index].setAttribute('data-mmf', data);
            } else {
                //array
                var row = this.listRows.get(index);
                row.data = data;
            }

        },

        findRow: function (what, start, exact) {
            //fix start index
            var total = this.countRows();
            if (start >= total) {
                return -1;
            }

            if (start < 0) {
                start = 0;
            }

            //do teh search
            if (exact) {
                //row must match exactly

                //where is the data stored?
                if (this.listCreated) {
                    //from list
                    for (var index = start; index < total; ++index) {
                        //TODO: should this really be tolowercase...?
                        if (this.element.options[index].textContent.toLowerCase() == what) {
                            return index;
                        }
                    }
                } else {
                    //from array
                    for (var index = start; index < total; ++index) {
                        //TODO: should this really be tolowercase...?
                        if (this.listRows.get(index).value.toLowerCase() == what) {
                            return index;
                        }
                    }
                }
            } else {
                //row can contain string

                //where is the data stored?
                if (this.listCreated) {
                    //list
                    for (var index = start; index < total; ++index) {
                        if (this.element.options[index].textContent.toLowerCase().indexOf(what) !== -1) {
                            return index;
                        }
                    }
                } else {
                    //array
                    for (var index = start; index < total; ++index) {
                        if (this.listRows.get(index).value.toLowerCase().indexOf(what) !== -1) {
                            return index;
                        }
                    }
                }
            }

            return -1;
        },

        sortRows: function () {
            //only sort if the list is specified to sort
            if (this.list.flags & CRunkclist.LIST_SORT) {
                //where is the data stored?
                if (this.listCreated) {
                    //list
                    Array.prototype.sort.call(this.element.options, function (a, b) {
                        return (a.text == b.text) ? 0 : (a.text > b.text) ? 1 : -1;
                    });
                } else {
                    //array
                    this.listRows.sort(function (a, b) {
                        return (a.value == b.value) ? 0 : (a.value > b.value) ? 1 : -1;
                    });

                    //update all indexes
                    this._updateListRowIndexes(0);
                }
            }
        },

        removeRow: function (index) {
            //remove row at index
            if (index < 0 || index >= this.countRows()) {
                return;
            }

            //where is the data stored?
            if (this.listCreated) {
                //list
                this.element.remove(index);
            } else {
                //array
                this.listRows.removeIndex(index);

                //update all indexes
                this._updateListRowIndexes(index);
            }

            //move selected index
            if (this.listSelectedIndex != -1) {
                this.listSelectedIndex -= 1;
                if (this.listSelectedIndex < 0) {
                    this.listSelectedIndex = 0;
                }
            }
        },

        clearRows: function () {
            //where is the data stored?
            this.listSelectedIndex = -1;

            if (this.listCreated) {
                //list
                this.element.options.length = 0;
            } else {
                //array
                this.listRows.clear();
            }
        },

        countRows: function () {
            //get number of rows

            //where is the data stored?
            if (this.listCreated) {
                //list
                return this.element.options.length;
            } else {
                //array
                return this.listRows.size();
            }
        },

        implodeRows: function (separator) {
            //convert data into string
            var total = this.countRows();
            var build = "";
            for (var index = 0; index < total; index++) {
                build += this.getRow(index) + separator;
            }
            return build;
        },

        //selection api
        selectRow: function (index) {
            this.listSelectedIndex = index;

            if (this.listCreated) {
                this.element.selectedIndex = index;
            }
        },

        getSelectedRow: function () {
            if (this.getSelectedRowIndex == -1) {
                return "";
            }

            //where is the data stored?
            if (this.listCreated) {
                //list
                return this.element.options[this.listSelectedIndex].textContent;
            } else {
                //array
                return this.listRows.get(this.listSelectedIndex).value;
            }
        },

        getSelectedRowIndex: function () {
            return this.listSelectedIndex;
        }
 
	});



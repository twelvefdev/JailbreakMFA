7
/* Edit object (James) */
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
CRunkcedit.EDIT_HSCROLLBAR = 0x0001;
CRunkcedit.EDIT_HSCROLLAUTOSCROLL = 0x0002;
CRunkcedit.EDIT_VSCROLLBAR = 0x0004;
CRunkcedit.EDIT_VSCROLLAUTOSCROLL = 0x0008;
CRunkcedit.EDIT_READONLY = 0x0010;
CRunkcedit.EDIT_MULTILINE = 0x0020;
CRunkcedit.EDIT_PASSWORD = 0x0040;
CRunkcedit.EDIT_BORDER = 0x0080;
CRunkcedit.EDIT_HIDEONSTART = 0x0100;
CRunkcedit.EDIT_UPPERCASE = 0x0200;
CRunkcedit.EDIT_LOWERCASE = 0x0400;
CRunkcedit.EDIT_TABSTOP = 0x0800;
CRunkcedit.EDIT_SYSCOLOR = 0x1000;
CRunkcedit.EDIT_3DLOOK = 0x2000;
CRunkcedit.EDIT_TRANSP = 0x4000;
CRunkcedit.EDIT_ALIGN_HCENTER = 0x00010000;
CRunkcedit.EDIT_ALIGN_RIGHT = 0x00020000;

this.kcedit = CRunkcedit;

function CRunkcedit() {
    //call chain
    CRunControl.call(this);

    //call self
    this.edit =
    {
        doubleClickEvent: -1,
        changedEvent: 	false,
        background: 	null,
        foreground: 	null,
		flags:            0,
		caretPosition:	  0
    };
};

CRunkcedit.prototype = {
        updateColor: function (e) {
            if (e === undefined) {
                e = this.element;
            }

            if (this.edit.flags & CRunkcedit.EDIT_SYSCOLOR) {
                return;
            }

            if (this.edit.flags & CRunkcedit.EDIT_TRANSP) {
                e.style.backgroundColor = 'transparent';
            } else {
                e.style.backgroundColor = CServices.getColorString(this.edit.background);
            }

            e.style.color = CServices.getColorString(this.edit.foreground);
        },

        getNumberOfConditions: function () {
            return 7;
        },

        createRunObject: function (file, cob, version) {
            this.ho.hoImgWidth = file.readAShort();
            this.ho.hoImgHeight = file.readAShort();

            var edit = this.edit;

            var fontInfo = this.ho.hoAdRunHeader.rhApp.unicode ? file.readLogFont() : file.readLogFont16();

            file.skipBytes(4 * 16);

            edit.foreground = file.readAColor();
            edit.background = file.readAColor();

            file.skipBytes(40 * 2);
            /* text style */

            edit.flags = file.readAInt();

            if (edit.flags & CRunkcedit.EDIT_MULTILINE) {
                var e = document.createElement('textarea');
            } else {
                var e = document.createElement('input');
                if (!(edit.flags & CRunkcedit.EDIT_PASSWORD)) {
                    e.type = 'text';
                } else {
                    e.type = 'password';
                }
            }

            //contineu setting up
            if (edit.flags & CRunkcedit.EDIT_ALIGN_HCENTER) {
                e.style.textAlign = "center";
            }

            if (edit.flags & CRunkcedit.EDIT_ALIGN_RIGHT) {
                e.style.textAlign = "right";
            }

            if (edit.flags & CRunkcedit.EDIT_READONLY) {
                e.readOnly = true;
            }

            e.className = 'fusionRunControlKcEdit';

            //apply theme
            Runtime.onThemeElement(e, CRuntime.THEME_ELEMENT_TEXTBOX);

            this.updateColor(e);

            if (edit.flags & CRunkcedit.EDIT_3DLOOK) {
                e.style.borderStyle = 'inset';
                e.style.borderWidth = '2px';
            	this.ho.hoImgWidth -= 4;
            	this.ho.hoImgHeight -= 4;
            }
            else {
                e.style.borderStyle = 'solid';

                if (edit.flags & CRunkcedit.EDIT_BORDER) {
                    e.style.borderWidth = '1px';
                    e.style.borderColor = '#000000';
            	    this.ho.hoImgWidth -= 2;
            	    this.ho.hoImgHeight -= 2;
                }
                else {
                    e.style.borderWidth = '0px';
                }
            }
            if (edit.flags & CRunkcedit.EDIT_UPPERCASE) {
                e.style.textTransform = "uppercase";
            }
            if (edit.flags & CRunkcedit.EDIT_LOWERCASE) {
                e.style.textTransform = "lowercase";
            }

            this.setFont(fontInfo);
            if (fontInfo.lfUnderline) {
                e.style.textDecoration = "underline";
            }
            if (fontInfo.lfStrikeOut) {
                e.style.textDecoration = "line-through";
            }

            this.setElement(e, (edit.flags & CRunkcedit.EDIT_HIDEONSTART) == 0);
            this.oldText = "";

            var that = this;


			e.ondblclick = function ()
			{
				that.edit.caretPosition = that.element.selectionStart;
				that.edit.doubleClickEvent = that.ho.getEventCount();
				that.ho.generateEvent(2, 0);
			};

			e.onchange = function ()
			{
				that.edit.caretPosition = that.element.selectionStart;
			};

			e.onclick = function ()
			{
				that.edit.caretPosition = that.element.selectionStart;
			};

			e.onkeyup = function ()
			{
				that.edit.caretPosition = that.element.selectionStart;
			};
        },

        handleRunObject: function () {
            if (this.element.value != this.oldText) {
                this.edit.changedEvent = true;
                this.oldText = this.element.value;
            }
            CRunControl.prototype.handleRunObject.call(this);
        },

        condition: function (num, cnd) {
            switch (num) {
                case 0: /* Is visible? */
                    return this.element.style.visibility != 'hidden';

                case 1: /* Is enabled? */
                    return !this.element.disabled;

                case 2: /* Can undo? */
                    return false;

                case 3: /* Just been modified? */
                    return this.edit.changedEvent;

                case 4: /* Has focus */
                    return document.activeElement == this.element;

                case 5: /* Is number? */
                    return !isNaN(parseInt(this.element.value, 10));

                case 6: /* Is selected? */
                    return (this.element.selectionEnd
                        - this.element.selectionStart) > 0;
            }
            ;
        },

        action: function (num, act) {
            switch (num) {
                case 0: /* Load text */

                    var filename = act.getParamFilename(this.rh, 0);
                    this.element.value = '';

                    try {
                        //open file for reading
                        var file = this.rh.rhApp.openFile(filename, false);
                        if (file == null) {
                            break;
                        }

                        this.element.value = file.readAString();
                    } catch (e) {
                        if (document.debug) {
                            throw e;
                        }
                    }

                    break;

                case 1: /* Load text with selector */
                    break;

                case 2: /* Save text */
                    var name = act.getParamFilename(this.rh, 0);
                    this.rh.rhApp.saveFile(name, this.element.value);
                    break;

                case 3: /* Save text with selector */
                    break;

                case 4: /* Set text */

                    this.element.value = act.getParamExpString(this.rh, 0);
                    break;

                case 5: /* Replace selection */

                    this.element.value =
                        [
                            this.element.value.substring(0, this.element.selectionStart),
                            act.getParamExpString(this.rh, 0),
                            this.element.value.substring(this.element.selectionEnd)

                        ].join('');

                    break;

                case 6: /* Cut */
                    break;

                case 7: /* Copy */
                    break;

                case 8: /* Paste */
                    break;

                case 9: /* Clear */

                    this.element.value = '';
                    break;

                case 10: /* Undo */
                    break;

                case 11: /* Clear undo buffer */
                    break;

                case 12: /* Show */
                    this.ho.bShown = true;
                    this.element.style.visibility = 'visible';
                    break;

                case 13: /* Hide */
                    this.ho.bShown = false;
                    this.element.style.visibility = 'hidden';
                    break;

                case 14: /* Set font from selector */
                    break;

                case 15: /* Set color from selector */
                    break;

                case 16: /* Activate */

                    this.element.focus();
                    break;

                case 17: /* Enable */

                    this.element.disabled = false;
                    break;

                case 18: /* Disable */

                    this.element.disabled = true;
                    break;

                case 19: /* Read-only on */

                    this.element.readOnly = true;
                    break;

                case 20: /* Read-only off */

                    this.element.readOnly = false;
                    break;

                case 21: /* Text modified */
                    this.edit.changedEvent = true;
                    break;

                case 22: /* Text not modified */
                    this.edit.changedEvent = false;
                    break;

                case 23: /* Limit text length */

                    this.element.setAttribute
                    ('maxlength', act.getParamExpression(this.rh, 0));

                    break;

                case 24: /* Set position */

                    var position = act.getParamPosition(this.rh, 0);
                    if (position.found) {
                        this.setPosition(position.x, position.y);
                    }

                    break;

                case 25: /* Set X position */

                    this.setX(act.getParamExpression(this.rh, 0));
                    break;

                case 26: /* Set Y position */

                    this.setY(act.getParamExpression(this.rh, 0));
                    break;

                case 27: /* Set size */

                    this.setSize(act.getParamExpression(this.rh, 0),
                        act.getParamExpression(this.rh, 1));

                    break;

                case 28: /* Set width */

                    this.setWidth(act.getParamExpression(this.rh, 0));
                    break;

                case 29: /* Set height */

                    this.setHeight(act.getParamExpression(this.rh, 0));
                    break;

                case 30: /* Deactivate */

                    this.element.blur();
                    break;

                case 31: /* Scroll to top */

                    this.element.scrollTop = 0;
                    break;

                case 32: /* Scroll to line */
                    break;

                case 33: /* Scroll to end */

                    this.element.scrollTop = 99999;
                    break;

                case 34: /* Set color */

                    this.edit.foreground = act.getParamColour(this.rh, 0);
                    this.updateColor();

                    break;

                case 35: /* Set background color */

                    this.edit.background = act.getParamColour(this.rh, 0);
                    this.updateColor();

                    break;
                    
 				case 36: /* insert Text at caret position */

					var textAdd = act.getParamExpString(this.rh, 0);
					var pos = act.getParamExpression(this.rh, 1);
					this.element.value =
						[
							this.element.value.substring(0, pos),
							textAdd,
							this.element.value.substring(pos, this.element.value.length)
						].join('');
					break;
				case 37: /* Set caret position		*/
					var posx = act.getParamExpression(this.rh, 0);
					this.element.setSelectionRange(posx, posx);
					this.element.onchange();
					break;
           }
            ;
        },

        expression: function (num) {
            switch (num) {
                case 0: /* Get text */
                    if (this.edit.flags & CRunkcedit.EDIT_UPPERCASE)
                        return this.element.value.toUpperCase();
                    else if (this.edit.flags & CRunkcedit.EDIT_LOWERCASE)
                        return this.element.value.toLowerCase();
                    return this.element.value;

                case 1: /* Get selection text */
                    return this.element.value.substring
                    (this.element.selectionStart, this.element.selectionEnd);

                case 2: /* Get X */
                    return this.ho.hoX;

                case 3: /* Get Y */
                    return this.ho.hoY;

                case 4: /* Get width */
                    return this.ho.hoImgWidth;

                case 5: /* Get height */
                    return this.ho.hoImgHeight;

                case 6: /* Get value */

                    var v = parseInt(this.element.value, 10);

                    return isNaN(v) ? 0 : v;

                case 7: /* Get first line */

                    var i = Math.min(this.element.value.indexOf('\r'),
                        this.element.value.indexOf('\n'));

                    return i == -1 ? '' : this.element.substring(0, i);

                case 8: /* Get line count */
                    return this.element.value.split('\n').length;

                case 9: /* Get color */
                    return this.edit.foreground;

                case 10: /* Get background color */
                    return this.edit.background;
					
				case 11: /* Get Caret Position */
					return this.edit.caretPosition;
            }
            ;
        },

        getRunObjectTextColor: function () {
            return this.edit.foreground;
        },

        setRunObjectTextColor: function (rgb) {
            this.edit.foreground = rgb;
            this.updateColor();
        }
};

//setup inheritance using extend
CServices.extend(CRunControl, CRunkcedit);
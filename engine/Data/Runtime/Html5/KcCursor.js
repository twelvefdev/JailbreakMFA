//----------------------------------------------------------------------------------
//
// CRUNKCCURSOR - Implementation of the Fusion Cursor object
//
//----------------------------------------------------------------------------------
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
CRunKcCursor.CND_LAST = 0;
CRunKcCursor.ACT_ACTION_SETSHAPE_APPSTARTING = 0;	// Standard arrow and small hourglass
CRunKcCursor.ACT_ACTION_SETSHAPE_ARROW = 1;	// Standard arrow
CRunKcCursor.ACT_ACTION_SETSHAPE_CROSS = 2;	// Crosshair
CRunKcCursor.ACT_ACTION_SETSHAPE_IBEAM = 3;	// Text I-beam
CRunKcCursor.ACT_ACTION_SETSHAPE_NO = 4;	// Slashed circle
CRunKcCursor.ACT_ACTION_SETSHAPE_SIZEALL = 5;	// Windows NT only: Four-pointed arrow
CRunKcCursor.ACT_ACTION_SETSHAPE_SIZENESW = 6;	// Double-pointed arrow pointing northeast and southwest
CRunKcCursor.ACT_ACTION_SETSHAPE_SIZENS = 7;	// Double-pointed arrow pointing north and south
CRunKcCursor.ACT_ACTION_SETSHAPE_SIZENWSE = 8;	// Double-pointed arrow pointing northwest and southeast
CRunKcCursor.ACT_ACTION_SETSHAPE_SIZEWE = 9;	// Double-pointed arrow pointing west and east
CRunKcCursor.ACT_ACTION_SETSHAPE_UPARROW = 10;	// Vertical arrow
CRunKcCursor.ACT_ACTION_SETSHAPE_WAIT = 11;	// Hourglass
CRunKcCursor.ACT_ACTION_SETSHAPE_HELP = 12;	// Hourglass
CRunKcCursor.ACT_ACTION_SETSHAPE_IMAGE_BYNUMBER = 13;	// Custom image (by number)
CRunKcCursor.ACT_ACTION_SETSHAPE_IMAGE_BYNAME = 14; // Custom image (by name)
CRunKcCursor.ACT_ACTION_SETSHAPE_HAND = 15;	// Hand
CRunKcCursor.ACT_ACTION_SETSHAPE_ZOOM = 16;	// Magnifying Glass
CRunKcCursor.ACT_ACTION_SETSHAPE_PICK = 17;	// Color Picker
CRunKcCursor.ACT_ACTION_SETSHAPE_FILL = 18;	// Fill
CRunKcCursor.ACT_ACTION_SETSHAPE_HSPLIT = 19;	// Horizontal Split
CRunKcCursor.ACT_ACTION_SETSHAPE_VSPLIT = 20;	// Vertical Split
CRunKcCursor.ACT_ACTION_SETSHAPE_DRAG_COPY = 21;	// Drag (Copy)
CRunKcCursor.ACT_ACTION_SETSHAPE_DRAG_MOVE = 22;	// Drag (Move)
CRunKcCursor.ACT_ACTION_SETSHAPE_DRAG_SHORTCUT = 23;	// Drag (Shortcut)
CRunKcCursor.ACT_ACTION_SETSHAPE_OBJECT = 24;	// Track active object
CRunKcCursor.EXP_LAST = 0;

function CRunKcCursor()
{
	this.cursor = 'auto';
}

CRunKcCursor.prototype = CServices.extend(new CRunExtension(),
	{
		getNumberOfConditions: function ()
		{
			return CRunKcCursor.CND_LAST;
		},

		createRunObject: function (file, cob, version)
		{
			this.cursor = 'auto';
			this.rh.rhApp.cursor = this.cursor;
			return true;
		},

		action: function (num, act)
		{
			switch (num)
			{
				case CRunKcCursor.ACT_ACTION_SETSHAPE_APPSTARTING:
					this.cursor = 'alias';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_ARROW:
					this.cursor = 'auto';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_CROSS:
					this.cursor = 'crosshair';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_IBEAM:
					this.cursor = 'text';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_NO:
					this.cursor = 'not-allowed';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_SIZEALL:
					this.cursor = 'all-scroll';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_SIZENESW:
					this.cursor = 'nesw-resize';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_SIZENS:
					this.cursor = 'ns-resize';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_SIZENWSE:
					this.cursor = 'nwse-resize';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_SIZEWE:
					this.cursor = 'ew-resize';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_UPARROW:
					this.cursor = 'pointer';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_WAIT:
					this.cursor = 'wait';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_HELP:
					this.cursor = 'help';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_IMAGE_BYNUMBER:
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_IMAGE_BYNAME:
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_HAND:
				    this.cursor = 'pointer';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_ZOOM:
					this.cursor = 'zoom-in';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_PICK:
					this.cursor = 'auto';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_FILL:
					this.cursor = 'auto';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_HSPLIT:
					this.cursor = 'col-resize';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_VSPLIT:
					this.cursor = 'row_resize';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_DRAG_COPY:
					this.cursor = 'copy';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_DRAG_MOVE:
					this.cursor = 'move';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_DRAG_SHORTCUT:
					this.cursor = 'context-menu';
					break;
				case CRunKcCursor.ACT_ACTION_SETSHAPE_OBJECT:
					break;
			}
			this.rh.rhApp.cursor = this.cursor;
			this.rh.showMouse();
		}
	});

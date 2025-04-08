//CND_STARTCHILDEVENT Object
// -----------------------------------------------------------------
/* Copyright (c) 1996-2019 Clickteam
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

function CND_STARTCHILDEVENT() {
}
CND_STARTCHILDEVENT.prototype =
{
    eva1: function (rhPtr, hoPtr) {
        return this.eva2(rhPtr);
    },
    eva2: function (rhPtr) {
        var childEventParam = this.evtParams[0];    // PARAM_CHILDEVENT

        // Restore object selection
        if (childEventParam.ois.length != 0 && rhPtr.rhEvtProg.childEventSelectionStack.length != 0) {
            var selectedObjects = rhPtr.rhEvtProg.childEventSelectionStack[rhPtr.rhEvtProg.childEventSelectionStack.length - 1];
            rhPtr.rhEvtProg.evt_RestoreSelectedObjects(childEventParam.ois, selectedObjects);
        }
        return CCnd.negaTRUE(this);
    }
}


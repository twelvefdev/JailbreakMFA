// CDebugTrackedObject object
// -----------------------------------------------------------------
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

function CDebugTrackedObject(type, name, obj, onCreate, onUpdate, onRender, onDestroy) {
    this.type = type
    this.name = name;
    this.obj = obj;
    this.onCreate = onCreate;
    this.onUpdate = onUpdate;
    this.onRender = onRender;
    this.onDestroy = onDestroy;
}

CDebugTrackedObject.prototype = {
    getValue: function (index) {
        return this.obj.rov.getValue(index);
    },

    getString: function (index) {
        return this.obj.rov.getString(index);
    },

    getFlag: function (index) {
        index &= 31;
        if (this.obj.rov != null && ((1 << index) & this.obj.rov.rvValueFlags) != 0) {
            return true;
        }
        return false;
    },

    getX: function () {
        return this.obj.hoX;
    },

    getY: function () {
        return this.obj.hoY;
    },
};
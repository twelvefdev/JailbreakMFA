// PARAM_MULTIPLEVAR object
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

function multiVar(app, _global, _double) {
    this.index = app.file.readAInt();
    this.op = app.file.readAInt();
    this.global = _global;
    if (_double) {
        this.val = app.file.readADouble();
    } else {
        this.val = app.file.readAInt();
        app.file.skipBytes(4);
    }
}

function PARAM_MULTIPLEVAR(app) {
    this.flags = app.file.readAInt();
    this.flagMasks = app.file.readAInt();
    this.flagValues = app.file.readAInt();
    this.values = new Array();
    var mask = 1;
    var maskGlobal = 2;
    var maskDouble = 4;
    for (var i = 0; i < 4; i++) {
        if ((this.flags & mask) == 0)
            break;
        var value = new multiVar(app, (this.flags & maskGlobal) != 0, (this.flags & maskDouble) != 0);
        mask <<= 4;
        maskGlobal <<= 4;
        maskDouble <<= 4;
        this.values.push(value);
    }
}
PARAM_MULTIPLEVAR.prototype =
{
    evaluate: function (pHo) {

        if (pHo.rov == null)
            return false;

        // Test multiple flags
        if (this.flagMasks != 0) {
            if ((pHo.rov.rvValueFlags & this.flagMasks) != this.flagValues)
                return false;
        }

        // Test values
        for (var i = 0; i < this.values.length; i++) {
            var value = this.values[i];
            var v;
            if (value.global) {
                v = pHo.hoAdRunHeader.rhApp.getGlobalValueAt(value.index);
            }
            else {
                v = pHo.rov.getValue(value.index);
            }
            if (!CRun.compareTo(v, value.val, value.op))
                return false;
        }
        return true;
    },

    evaluateNoGlobal: function (pHo) {

        if (pHo.rov == null)
            return false;

        // Test multiple flags
        if (this.flagMasks != 0) {
            if ((pHo.rov.rvValueFlags & this.flagMasks) != this.flagValues)
                return false;
        }

        // Test values
        for (var i = 0; i < this.values.length; i++) {
            var value = this.values[i];
            var v = pHo.rov.getValue(value.index);
            if (!CRun.compareTo(v, value.val, value.op))
                return false;
        }
        return true;
    }
}
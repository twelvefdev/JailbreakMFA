//CND_EXTISIN Object
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

function CND_EXTISIN() {
    CCnd.call(this);
}

CND_EXTISIN.prototype = {
    eva1: function (rhPtr, hoPtr) {
        return this.evaObject(rhPtr, this);
    },
    eva2: function (rhPtr) {
        return this.evaObject(rhPtr, this);
    },
    evaObjectRoutine: function (pHo) {
        var x1 = pHo.hoX - pHo.hoImgXSpot;
        var x2 = x1 + pHo.hoImgWidth;
        var y1 = pHo.hoY - pHo.hoImgYSpot;
        var y2 = y1 + pHo.hoImgHeight;
        if (pHo.hoAdRunHeader.quadran_In(x1, y1, x2, y2) != 0) {
            return CCnd.negaFALSE(this);
        }
        return CCnd.negaTRUE(this);
    }
};

//setup inheritance using extend
CServices.extend(CCnd, CND_EXTISIN);
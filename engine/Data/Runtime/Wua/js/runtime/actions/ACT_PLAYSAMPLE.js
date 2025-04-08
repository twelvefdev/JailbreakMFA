//ACT_PLAYSAMPLE Object
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

function ACT_PLAYSAMPLE() {
}
ACT_PLAYSAMPLE.prototype = {
    execute: function (rhPtr) {
        var p = this.evtParams[0];
        var bPrio = false;
        var nSound = -1;
        // PARAM_EXPSTRING?
        if (p.code == 45) {
            var name = rhPtr.get_EventExpressionString(p);
            nSound = rhPtr.rhApp.soundBank.getSoundHandleFromName(name);
        }
        else {
            bPrio = (p.sndFlags & PARAM_SAMPLE.PSOUNDFLAG_UNINTERRUPTABLE) != 0;
            nSound = p.sndHandle;
        }
        if (nSound >= 0)
            rhPtr.rhApp.soundPlayer.play(nSound, 1, -1, bPrio);
    }
}

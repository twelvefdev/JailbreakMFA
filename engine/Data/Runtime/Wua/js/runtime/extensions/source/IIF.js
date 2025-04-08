//----------------------------------------------------------------------------------
//
// CRUNIIF
//
//----------------------------------------------------------------------------------
this.IIF = CRunIIF;

CRunIIF.EXP_INT_INT = 0;
CRunIIF.EXP_INT_STRING = 1;
CRunIIF.EXP_INT_FLOAT = 2;
CRunIIF.EXP_STRING_INT = 3;
CRunIIF.EXP_STRING_STRING = 4;
CRunIIF.EXP_STRING_FLOAT = 5;
CRunIIF.EXP_FLOAT_INT = 6;
CRunIIF.EXP_FLOAT_STRING = 7;
CRunIIF.EXP_FLOAT_FLOAT = 8;
CRunIIF.EXP_INT_BOOL = 9;
CRunIIF.EXP_STRING_BOOL = 10;
CRunIIF.EXP_FLOAT_BOOL = 11;
CRunIIF.EXP_BOOL_INT = 12;
CRunIIF.EXP_BOOL_STRING = 13;
CRunIIF.EXP_BOOL_FLOAT = 14;
CRunIIF.EXP_LAST_COMP = 15;

function CRunIIF() {
    //call chain
    CRunExtension.call(this);

    //call self
    this.Last = false;
}

CRunIIF.prototype = {
        getNumberOfConditions: function () {
            return 0;
        },

        createRunObject: function (file, cob, version) {
            this.Last = false;
            return false;
        },

        // Expressions
        // --------------------------------------------
        expression: function (num) {
            switch (num) {
                case CRunIIF.EXP_INT_INT:
                    return this.IntInt();
                case CRunIIF.EXP_INT_STRING:
                    return this.IntString();
                case CRunIIF.EXP_INT_FLOAT:
                    return this.IntFloat();
                case CRunIIF.EXP_STRING_INT:
                    return this.StringInt();
                case CRunIIF.EXP_STRING_STRING:
                    return this.StringString();
                case CRunIIF.EXP_STRING_FLOAT:
                    return this.StringFloat();
                case CRunIIF.EXP_FLOAT_INT:
                    return this.FloatInt();
                case CRunIIF.EXP_FLOAT_STRING:
                    return this.FloatString();
                case CRunIIF.EXP_FLOAT_FLOAT:
                    return this.FloatFloat();
                case CRunIIF.EXP_INT_BOOL:
                    return this.IntBool();
                case CRunIIF.EXP_STRING_BOOL:
                    return this.StringBool();
                case CRunIIF.EXP_FLOAT_BOOL:
                    return this.FloatBool();
                case CRunIIF.EXP_BOOL_INT:
                    return this.BoolInt();
                case CRunIIF.EXP_BOOL_STRING:
                    return this.BoolString();
                case CRunIIF.EXP_BOOL_FLOAT:
                    return this.BoolFloat();
                case CRunIIF.EXP_LAST_COMP:
                    return this.LastComp();
            }
            return 0;
        },

        IntInt: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareInts(p1, comp, p2);
            if (this.Last) {
                return (r1);
            } else {
                return (r2);
            }
        },

        IntString: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareStrings(p1, comp, p2);
            if (this.Last) {
                return (r1);
            } else {
                return (r2);
            }
        },

        IntFloat: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareFloats(p1, comp, p2);
            if (this.Last) {
                return (r1);
            } else {
                return (r2);
            }
        },

        StringInt: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareInts(p1, comp, p2);
            var ret;
            if (this.Last) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        StringString: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareStrings(p1, comp, p2);
            var ret = (0);
            if (this.Last) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        StringFloat: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareFloats(p1, comp, p2);
            var ret = (0);
            if (this.Last) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        FloatInt: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareInts(p1, comp, p2);
            var ret = (0);
            if (this.Last) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        FloatString: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareStrings(p1, comp, p2);
            var ret = (0);
            if (this.Last) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        FloatFloat: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            this.Last = this.CompareFloats(p1, comp, p2);
            var ret;
            if (this.Last) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        IntBool: function () {
            //get parameters
            var p1 = this.ho.getExpParam() != 0;
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            if (p1) {
                return (r1);
            } else {
                return (r2);
            }
        },

        StringBool: function () {
            //get parameters
            var p1 = this.ho.getExpParam() != 0;
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            var ret = (0);
            if (p1) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        FloatBool: function () {
            //get parameters
            var p1 = this.ho.getExpParam() != 0;
            var r1 = this.ho.getExpParam();
            var r2 = this.ho.getExpParam();

            var ret = 0;
            if (p1) {
                ret = r1;
            } else {
                ret = r2;
            }
            return ret;
        },

        BoolInt: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();

            this.Last = this.CompareInts(p1, comp, p2);
            if (this.Last) {
                return 1;
            } else {
                return 0;
            }
        },

        BoolString: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();

            this.Last = this.CompareStrings(p1, comp, p2);
            if (this.Last) {
                return 1;
            } else {
                return 0;
            }
        },

        BoolFloat: function () {
            //get parameters
            var p1 = this.ho.getExpParam();
            var comp = this.ho.getExpParam();
            var p2 = this.ho.getExpParam();

            this.Last = this.CompareFloats(p1, comp, p2);
            if (this.Last) {
                return 1;
            } else {
                return 0;
            }
        },

        LastComp: function () {
            if (this.Last) {
                return 1;
            } else {
                return 0;
            }
        },

        // ============================================================================
        //
        // MATT'S FUNCTIONS
        //
        // ============================================================================
        CompareInts: function (p1, comp, p2) {
            //catch NULL
            if (comp == null) {
                return p1 == p2;
            }

            if ((comp.charAt(0) == "=") || (comp.charAt(0) == "\0")) {
                return p1 == p2;
            }
            if (comp.charAt(0) == "!") {
                return p1 != p2;
            }

            if (comp.charAt(0) == ">") {
                if (comp.length > 1 && comp.charAt(1) == "=") {
                    return p1 >= p2;
                }
                return p1 > p2;
            }

            if (comp.charAt(0) == "<") {
                if (comp.length > 1 && comp.charAt(1) == "=") {
                    return p1 <= p2;
                }
                if (comp.length > 1 && comp.charAt(1) == ">") {
                    return p1 != p2;
                }
                return p1 < p2;
            }

            //default
            return p1 == p2;
        },

        CompareStrings: function (p1, comp, p2) {
            //catch NULLs
            var NullStr = "";
            if (p1 == null) {
                p1 = NullStr;
            }
            if (p2 == null) {
                p2 = NullStr;
            }

            if (comp == null) {
                return p1 == p2;
            }

            if ((comp.charAt(0) == "=") || (comp.charAt(0) == "\0")) {
                return p1 == p2;
            }
            if (comp.charAt(0) == "!") {
                return p1 != p2;
            }

            if (comp.charAt(0) == ">") {
                if (comp.length > 1 && comp.charAt(1) == "=") {
                    return p1 >= p2;
                }
                return p1 > p2;
            }

            if (comp.charAt(0) == "<") {
                if (comp.length > 1 && comp.charAt(1) == "=") {
                    return p1 <= p2;
                }
                if (comp.length > 1 && comp.charAt(1) == ">") {
                    return p1 != p2;
                }
                return p1 < p2;
            }

            return p1 == p2;
        },

        CompareFloats: function (p1, comp, p2) {
            //catch NULL
            if (comp == null) {
                return p1 == p2;
            }

            if ((comp.charAt(0) == "=") || (comp.charAt(0) == "\0")) {
                return p1 == p2;
            }
            if (comp.charAt(0) == "!") {
                return p1 != p2;
            }

            if (comp.charAt(0) == ">") {
                if (comp.length > 1 && comp.charAt(1) == "=") {
                    return p1 >= p2;
                }
                return p1 > p2;
            }

            if (comp.charAt(0) == "<") {
                if (comp.length > 1 && comp.charAt(1) == "=") {
                    return p1 <= p2;
                }
                if (comp.length > 1 && comp.charAt(1) == ">") {
                    return p1 != p2;
                }
                return p1 < p2;
            }

            //default
            return p1 == p2;
        }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunIIF);
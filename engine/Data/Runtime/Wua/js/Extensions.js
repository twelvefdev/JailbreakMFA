//this file gets generated at compile time and are referenced by the runtime

CCompiledExtensions = {};

CCompiledExtensions.createList = function () {
    //must be called via blah.call(this);

    var extMaxHandle = 28;
    if (extMaxHandle) {
        this.extensions = new Array(extMaxHandle);
        this.numOfConditions = new Array(extMaxHandle);
        var n;
        for (n = 0; n < extMaxHandle; n++) {
            this.extensions[n] = null;
            this.numOfConditions[n] = 0;
        }

        var e;

        // START_ADDEXT
        // INCLUDE_ADDEXT
    }
};

CCompiledExtensions.loadRunObject = function () {
    //must be called via blah.call(this);
    switch (this.handle) {
        // START_NEWEXT
        // INCLUDE_NEWEXT
    }

    return null;
};

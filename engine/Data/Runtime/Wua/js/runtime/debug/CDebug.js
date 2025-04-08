// CDebug object
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

console.clear();

var CDebug = {
    //constants
    TEST: null,//'clipWithinTest',//null//'name_of_test'

    FORCE_STARTING_FRAME: null,//10//null (zero based);
    FORCE_RENDERER_TYPE: null,//null//'canvas'//'webgl',
    FORCE_WINDOW_DIMENSION: null,//null//{width:123,height:123}
    FORCE_SCREEN_MODE: 'windowed',//null,//null/'fullscreen'//'windowed'
    FORCE_TOUCHABLE: false,//true//false
    FORCE_VIRTUAL_JOYSTICK_ON: false,//true//false
    FORCE_DEVICE_TYPE: null,//CRuntime.DEVICE_CONSOLE//null//or another of the device types in CRuntime

    SHOW_DEBUG_INFO: true,//true//false
    SHOW_TEXTURE_PADDING_LOG: false,//true//false
    SHOW_OUTLINE_FOR_CLIPPED_DRAWS: false,//true//false
    SHOW_OUTLINE_FOR_IMAGE_DRAWS: false,//true//false

    FAIL_LOAD_SOUNDS: true,//true//false
    FAIL_LOAD_IMAGES: false,//true//false
    FAIL_LOAD_MOSAICS: false,//true//false

    FAKE_SLOW_LOADING: 0,//0-infinite adds delay onto loading

    CLEAR_LOCAL_STORAGE: false,//false//true

    DONT_CACHE_BOUNDING: false,//false/true
    DONT_CLIP_RENDERING: false,//false/true
    DONT_CACHE_DATA: false,//true//false
    DONT_USE_EFFECTS: true,//true//false
    DONT_SHOW_COUNTERS: true,//true//false

    TRACK_OBJECT_DEFINITIONS: [
        //blank tracker
        /*
        {
            type: '',
            name: '',
            startX: 0,
            startY: 0,
            firstOnly: false,
            onCreate: function (type, name, obj) {},
            onUpdate: function (type, name, obj) {},
            onRender: function (renderer, type, name, obj) {},
            onDestroy: function (type, name, obj) {},
        },
        */

        //clipping tracker
        {
            type: 'text',
            name: 'String',
            startX: 257,
            startY: 384,
            firstOnly: false,
            onCreate: function (type, name, obj) {
                obj.debugId = 'the_object_to_track_bounding'
            },
            onUpdate: function (type, name, obj) {
                CDebug.setValue("Text Position", this.getX()+" x "+this.getY());
            },
            onRender: function (renderer, type, name, obj) {
                //renderer.renderOutlineRect(this.getX(), this.getY(), 32, 32, CServices.RGBFlash(255, 0, 0),1);
            },
            onDestroy: function (type, name, obj) {

            },
        },
    ],

    //fields
    debugPanelWidth: 150,
    debugPanelGraphHeight: 40,
    debugPanelValueHeight: 16,

    container:null,
    renderGraph: null,
    updateGraph: null,
    drawImageGraph: null,

    namedValues: {},

    trackedObjectDefinitions: [],
    trackedObjects: [],

    testReady: false,
    testInstance: null,
    testCache: {},
    testFactory: {},

    //events
    onSetup: function () {
        if (!CDebug.SHOW_DEBUG_INFO) {
            return false;
        }

        CDebug.log('showing debug info');

        //create debug content 
        this.container = window.document.createElement('div');
        this.container.style.backgroundColor = '#4c7685';
        this.container.style.color = '#ffffff;'
        this.container.style.position = 'absolute';
        this.container.style.top = '0px';
        this.container.style.left = '0px';
        this.container.style.zIndex = '9999';
        this.container.style.padding = '3px';
        this.container.style.border = '1px solid #304f59';
        this.container.style.opacity = '0.6';
        this.container.style.pointerEvents = 'none';
        document.body.appendChild(this.container);

        //add title
        var title = document.createElement('span');
        title.style.fontWeight = 'bold';
        title.innerText = 'Debug Mode'
        this.container.appendChild(title);

        //add render graph
        if (Runtime.separateLoops) {
            var renderContainer = document.createElement('div');
            this.container.appendChild(renderContainer);
            this.renderGraph = new CDebugGraph({
                title: 'Render',
                parent: renderContainer,
                target: Runtime.application.gaFrameRate,
            });

            //add update graph
            var updateContainer = document.createElement('div');
            this.container.appendChild(updateContainer);
            this.updateGraph = new CDebugGraph({
                title: 'Update',
                parent: updateContainer,
                target: Runtime.application.gaFrameRate,
            });
        } else {
            var renderContainer = document.createElement('div');
            this.container.appendChild(renderContainer);
            this.renderGraph = new CDebugGraph({
                title: 'FPS',
                parent: renderContainer,
                target: Runtime.application.gaFrameRate,
            });
        }

        //setup tracked object definitions from teh "constant" var
        if (CDebug.TRACK_OBJECT_DEFINITIONS != null) {
            var raw;
            for (var index = 0; index < CDebug.TRACK_OBJECT_DEFINITIONS.length; index++) {
                raw = CDebug.TRACK_OBJECT_DEFINITIONS[index];

                CDebug.addTrackedObjectDefinition({
                    type: typeof raw.type != 'undefined'? raw.type : null,
                    name: typeof raw.name != 'undefined' ? raw.name : null,
                    startX: typeof raw.startX != 'undefined' ? raw.startX : null,
                    startY: typeof raw.startY != 'undefined' ? raw.startY : null,
                    firstOnly: typeof raw.firstOnly != 'undefined' ? raw.firstOnly : null,
                    onCreate: typeof raw.onCreate != 'undefined' ? raw.onCreate : null,
                    onUpdate: typeof raw.onUpdate != 'undefined' ? raw.onUpdate : null,
                    onRender: typeof raw.onRender != 'undefined' ? raw.onRender : null,
                    onDestroy: typeof raw.onDestroy != 'undefined' ? raw.onDestroy : null,
                });
            }
        }
    },

    onFrameStart: function () {
        if (this.renderGraph) {
            //CDebug.renderGraph.reset();
        }
        if (this.updateGraph) {
            //CDebug.updateGraph.reset();
        }
    },

    onRender: function () {
        if (this.renderGraph) {
            this.renderGraph.setTarget(Runtime.application.gaFrameRate);
            this.renderGraph.updateValue();
        }

        //update names values
        for (var name in this.namedValues) {
            var namedValue = this.namedValues[name];

            //do we need to create graphs?
            switch (namedValue.type) {
                case 'graph':
                    if (namedValue.obj == null) {
                        //create html container
                        var div = document.createElement('div');
                        this.container.appendChild(div);

                        //create graph
                        namedValue.obj = new CDebugGraph({
                            title: name,
                            parent: div,
                            target: namedValue.value,
                            maxValue: 0,
                        });
                    } else {
                        //update graph
                        namedValue.obj.setValue(namedValue.value);
                    }

                    //reset value
                    namedValue.value = 0;

                    break;

                case 'value':
                    if (namedValue.obj == null) {
                        //create html container
                        var div = document.createElement('div');
                        this.container.appendChild(div);

                        //create value
                        namedValue.obj = new CDebugValue({
                            title: name,
                            parent: div,
                            value: namedValue.value,
                        });

                        //alwasy render first time
                        namedValue.obj.render();

                    } else {
                        //update the value
                        namedValue.obj.set(namedValue.value);
                    }

                    break;
            }
        }
    },

    onUpdate: function () {
        if (this.updateGraph) {
            this.updateGraph.setTarget(Runtime.application.gaFrameRate);
            this.updateGraph.updateValue();
        }

        //update tracked objects
        var trackedObjects = CDebug.trackedObjects;
        var trackedObject;

        for (var index = 0; index < trackedObjects.length; index++) {
            trackedObject = trackedObjects[index];

            //fire callback for this tracked object
            if (trackedObject.onUpdate) {
                trackedObject.onUpdate.call(trackedObject, trackedObject.type, trackedObject.name, trackedObject.obj);
            }
        }

        //update test
        if (CDebug.testReady) {
            CDebug.testInstance.update();
        }
    },

    onAppRender: function() {
        //render test
        if (CDebug.testReady) {
            CDebug.testInstance.render();
        }

        //render tracked objects
        var trackedObjects = CDebug.trackedObjects;
        var trackedObject;

        for (var index = 0; index < trackedObjects.length; index++) {
            trackedObject = trackedObjects[index];

            //fire callback for this tracked object
            if (trackedObject.onRender) {
                trackedObject.onRender.call(trackedObject, Runtime.application.renderer, trackedObject.type, trackedObject.name, trackedObject.obj);
            }
        }
    },

    //object events
    onCreateObject: function(type, name, obj, definition) {
        //f_CreateObject in CRun is creating an object so now we can do stuff!
        //lets lookup the object tracking rules
        var definitions = CDebug.trackedObjectDefinitions;
        var definition;
        var matched;
        for (var index = 0; index < definitions.length; index++) {
            matched = true;
            definition = definitions[index];

            //first only
            if (definition.firstOnly && definition.count > 0) {
                matched = false;
            }

            //type
            if (definition.type !== null && definition.type != type) {
                matched = false;
            }

            //name
            if (definition.name !== null && definition.name != name) {
                 matched = false;
            }

            //start position
            if ((definition.startX != null && obj.hoX != definition.startX) || (definition.startY !== null && obj.hoY != definition.startY)) {
                matched = false;
            }

            //ok did we match?
            if (matched) {
                //yup so lets create a debug object wrapper
                var trackedObject = new CDebugTrackedObject(type, name, obj, definition.onCreate, definition.onUpdate, definition.onRender, definition.onDestroy);
                CDebug.trackedObjects.push(trackedObject);
                definition.count++;

                //call to let this tracker create
                if (trackedObject.onCreate) {
                    trackedObject.onCreate.call(trackedObject, trackedObject.type, trackedObject.name, trackedObject.obj);
                }
            }
        }
    },

    onDestroyObject(obj) {
        //lets remove this object from tracked objects
        var trackedObjects = CDebug.trackedObjects;
        var trackedObject;

        for (var index = trackedObjects.length - 1; index >= 0; index--) {
            trackedObject = trackedObjects[index];

            //does it match the tracked id?
            if (trackedObject.obj.hoCreationId == obj.hoCreationId) {
                //yup so remove it!
                trackedObjects.splice(index, 1);

                //call to let this tracker destroy
                if (trackedObject.onDestroy) {
                    trackedObject.onDestroy.call(trackedObject, trackedObject.type, trackedObject.name, trackedObject.obj);
                }
            }
        }
    },

    //test events
    onTestLoaded: function (test) {
        //reset
        CDebug.testReady = false;

        //finish previous test
        if (CDebug.testInstance != null) {
            //let the test finish
            CDebug.testInstance.finish(function () {
                CDebug.testInstance = null;
                beginTest();
            });
        } else {
            //start now!
            beginTest();
        }

        function beginTest() {
            //check for error
            if (test.error) {
                console.log('could not start test: ' + test.path);
            } else {
                //the script loaded fine so we should attempt to create the test object
                console.log('starting test: ' + test.path);

                //check for test factory
                if (typeof CDebug.testFactory[test.className] == 'undefined') {
                    console.log('could not find factory for: ' + test.className);
                } else {
                    //set active test
                    CDebug.testInstance = new CDebug.testFactory[test.className]();

                    //let the test start
                    CDebug.testInstance.start(function () {
                        console.log('test is running!');
                        CDebug.testReady = true;
                    });
                }
            }
        }
    },

    //tracked objects api
    addTrackedObjectDefinition: function (properties) {
        CDebug.trackedObjectDefinitions.push({
            type: typeof properties.type != 'undefined' ? properties.type : null,
            name: typeof properties.name != 'undefined' ? properties.name : null,
            startX: typeof properties.startX != 'undefined' ? properties.startX : null,
            startY: typeof properties.startY != 'undefined' ? properties.startY : null,
            firstOnly: typeof properties.firstOnly != 'undefined' ? properties.firstOnly : false,
            onCreate: typeof properties.onCreate != 'undefined' ? properties.onCreate : null,
            onUpdate: typeof properties.onUpdate != 'undefined' ? properties.onUpdate : null,
            onRender: typeof properties.onRender != 'undefined' ? properties.onRender : null,
            onDestroy: typeof properties.onDestroy != 'undefined' ? properties.onDestroy : null,

            count: 0,
        });
    },

    //test api
    loadTest: function(name) {
        //start loading procedure for a test
        var cache = CDebug.testCache;

        //check if the test is already loaded
        if (typeof cache[name] == 'undefined') {
            //need to wait for it to load
            var path = 'js/runtime/debug/tests/' + name + '.js';

            //create script element
            var element = document.createElement("script");
            document.body.appendChild(element);

            //handle script loading
            element.addEventListener('load', function (event) {
                console.log("loaded test: " + path);

                //update test cache
                cache[name].error = false;
                cache[name].loading = false;

                //fire handler
                CDebug.onTestLoaded(cache[name]);
            });

            element.addEventListener('error', function (event) {
                console.log("failed to load test: " + path);

                //update test cache
                cache[name].error = true;
                cache[name].loading = false;

                //fire handler
                CDebug.onTestLoaded(cache[name]);
            });

            //create test cache before loading
            cache[name] = {
                className: 'CDebugTest' + CServices.capitalizeFirstLetter(name),
                path: path,
                error: false,
                loading: true,
                element: element,
            }

            //start loading
            console.log("loading test: " + path);
            element.src = path;
        } else {
            //check cache is not currently loading
            if (!cache[name].loading) {
                CDebug.onTestLoaded(cache[name]);
            }
        }
    },

    addTestFactory: function(className, classPointer) {
        CDebug.testFactory[className] = classPointer;
    },

    //api
    log: function (msg) {
        var date = new Date();
        console.log('[CDebug ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + '] ' + msg);
    },

    trackValue: function (name, amount) {
        //adds a named value
        amount = amount || 1;

        if (typeof this.namedValues[name] == 'undefined') {
            this.namedValues[name] = {
                type: 'graph',
                obj: null,
                value: amount,
            }
        } else {
            this.namedValues[name].value += amount;
        }
    },

    setValue: function (name, value) {
        //adds a named value
        value = typeof value != 'undefined' ? value : 1;

        if (typeof this.namedValues[name] == 'undefined') {
            this.namedValues[name] = {
                type: 'value',
                obj: null,
                value: value,
            }
        } else {
            this.namedValues[name].value = value;
        }
    },
};

//act on CDebug vars
if (CDebug.CLEAR_LOCAL_STORAGE) {
    localStorage.clear();
}
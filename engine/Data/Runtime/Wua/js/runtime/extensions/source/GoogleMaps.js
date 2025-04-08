/* Google Maps (Stephen) */

CRunGoogleMaps.CND0_OBJ_MAPISREADY
CRunGoogleMaps.CND1_OBJ_MAPISVISIBLE = 1;
CRunGoogleMaps.CND_LAST = 2;

CRunGoogleMaps.ACT0_SETMAPKEY0 = 0;
CRunGoogleMaps.ACT1_CONTINUOUSZOOM0 = 1;
CRunGoogleMaps.ACT2_CONTROLLEDBYKEYBOARD0 = 2;
CRunGoogleMaps.ACT3_CROSSHAIRS0 = 3;
CRunGoogleMaps.ACT4_DRAGGING0 = 4;
CRunGoogleMaps.ACT5_SCROLLWHEELZOOM0 = 5;
CRunGoogleMaps.ACT6_INITIALMAPTYPE0 = 6;
CRunGoogleMaps.ACT7_CREATEMAP0123 = 7;
CRunGoogleMaps.ACT8_ADDZOOMCONTROL = 8;
CRunGoogleMaps.ACT9_ADDOVERVIEWMAPCONTROL = 9;
CRunGoogleMaps.ACT10_ADDMAPTYPECONTROL = 10;
CRunGoogleMaps.ACT11_ADDNAVIGATIONCONTROL = 11;
CRunGoogleMaps.ACT12_ADDPOSITIONCONTROL = 12;
CRunGoogleMaps.ACT13_ADDSCALECONTROL = 13;
CRunGoogleMaps.ACT14_REMOVEZOOMCONTROL = 14;
CRunGoogleMaps.ACT15_REMOVEOVERVIEWMAPCONTROL = 15;
CRunGoogleMaps.ACT16_REMOVEMAPTYPECONTROL = 16;
CRunGoogleMaps.ACT17_REMOVENAVIGATIONCONTROL = 17;
CRunGoogleMaps.ACT18_REMOVEPOSITIONCONTROL = 18;
CRunGoogleMaps.ACT19_REMOVESCALECONTROL = 19;
CRunGoogleMaps.ACT20_SETMAPCENTER01 = 20;
CRunGoogleMaps.ACT21_ADDMARKEROVERLAY01 = 21;
CRunGoogleMaps.ACT22_ADDPOLYLINEOVERLAY0123 = 22;
CRunGoogleMaps.ACT23_ADDINFOWINDOWOVERLAY0123 = 23;
CRunGoogleMaps.ACT24_CLEAROVERLAYS = 24;
CRunGoogleMaps.ACT25_PANTO01 = 25;
CRunGoogleMaps.ACT26_SHOWMAP = 26;
CRunGoogleMaps.ACT27_HIDEMAP = 27;

CRunGoogleMaps.EXP0_MAPX = 0;
CRunGoogleMaps.EXP1_MAPY = 1;
CRunGoogleMaps.EXP2_MAPWIDTH = 2;
CRunGoogleMaps.EXP3_MAPHEIGHT = 3;

this.GoogleMaps = CRunGoogleMaps;

function CRunGoogleMaps() {
    //call chain
    CRunExtension.call(this);

    //call self

    // var mapOptions = {zoom: 8, center: new google.maps.LatLng(-34.397, 150.644), mapTypeId: google.maps.MapTypeId.ROADMAP}
    // this.map = new google.maps.Map(document.getElementById("MMFCanvas"), mapOptions);
    // this.mapKey = "AIzaSyBD2qZ96o9ieAhnMqAYSwrfvbm9vlKptdM";

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBD2qZ96o9ieAhnMqAYSwrfvbm9vlKptdM&sensor=false";
    document.body.appendChild(script);

    this.map = null;
    this.mapX = 0;
    this.mapY = 0;
    this.mapWidth = 320;
    this.mapHeight = 240;
    this.locationLat = 45.53377; //Portland, OR :)
    this.locationLong = -122.678146;
    this.mapInitType = 0;
    this.mapIsReady = 0;
}

CRunGoogleMaps.prototype = {
        getNumberOfConditions: function () {
            return CRunGoogleMaps.CND_LAST;
        },

        // Conditions
        // -------------------------------------------------
        condition: function (num, cnd) {
            switch (num) {
                case CRunGoogleMaps.CND0_OBJ_MAPISREADY:
                    return this.cnd0_obj_MapIsReady();
                case CRunGoogleMaps.CND1_OBJ_MAPISVISIBLE:
                    return this.cnd1_obj_MapIsVisible();
            }
            return false;
        },

        // Actions
        // -------------------------------------------------
        action: function (num, act) {
            switch (num) {
                case CRunGoogleMaps.ACT0_SETMAPKEY0:
                    this.act0_SetMapKey0(act.getParamExpString(this.rh, 0));
                    break;
                case CRunGoogleMaps.ACT1_CONTINUOUSZOOM0:
                    this.act1_ContinuousZoom0(act.getParamExpression(this.rh, 0));
                    break;
                case CRunGoogleMaps.ACT2_CONTROLLEDBYKEYBOARD0:
                    this.act2_ControlledByKeyboard0(act.getParamExpression(this.rh, 0));
                    break;
                case CRunGoogleMaps.ACT3_CROSSHAIRS0:
                    this.act3_Crosshairs0(act.getParamExpression(this.rh, 0));
                    break;
                case CRunGoogleMaps.ACT4_DRAGGING0:
                    this.act4_Dragging0(act.getParamExpression(this.rh, 0));
                    break;
                case CRunGoogleMaps.ACT5_SCROLLWHEELZOOM0:
                    this.act5_ScrollWheelZoom0(act.getParamExpression(this.rh, 0));
                    break;
                case CRunGoogleMaps.ACT6_INITIALMAPTYPE0:
                    this.act6_InitialMapType0(act.getParamExpression(this.rh, 0));
                    break;
                case CRunGoogleMaps.ACT7_CREATEMAP0123:
                    this.act7_CreateMap0123(act.getParamExpression(this.rh, 0), act.getParamExpression(this.rh, 1), act.getParamExpression(this.rh, 2), act.getParamExpression(this.rh, 3));
                    break;
                case CRunGoogleMaps.ACT8_ADDZOOMCONTROL:
                    this.act8_AddZoomControl();
                    break;
                case CRunGoogleMaps.ACT9_ADDOVERVIEWMAPCONTROL:
                    this.act9_AddOverviewMapControl();
                    break;
                case CRunGoogleMaps.ACT10_ADDMAPTYPECONTROL:
                    this.act10_AddMapTypeControl();
                    break;
                case CRunGoogleMaps.ACT11_ADDNAVIGATIONCONTROL:
                    this.act11_AddNavigationControl();
                    break;
                case CRunGoogleMaps.ACT12_ADDPOSITIONCONTROL:
                    this.act12_AddPositionControl();
                    break;
                case CRunGoogleMaps.ACT13_ADDSCALECONTROL:
                    this.act13_AddScaleControl();
                    break;
                case CRunGoogleMaps.ACT14_REMOVEZOOMCONTROL:
                    this.act14_RemoveZoomControl();
                    break;
                case CRunGoogleMaps.ACT15_REMOVEOVERVIEWMAPCONTROL:
                    this.act15_RemoveOverviewMapControl();
                    break;
                case CRunGoogleMaps.ACT16_REMOVEMAPTYPECONTROL:
                    this.act16_RemoveMapTypeControl();
                    break;
                case CRunGoogleMaps.ACT17_REMOVENAVIGATIONCONTROL:
                    this.act17_RemoveNavigationControl();
                    break;
                case CRunGoogleMaps.ACT18_REMOVEPOSITIONCONTROL:
                    this.act18_RemovePositionControl();
                    break;
                case CRunGoogleMaps.ACT19_REMOVESCALECONTROL:
                    this.act19_RemoveScaleControl();
                    break;
                case CRunGoogleMaps.ACT20_SETMAPCENTER01:
                    this.act20_SetMapCenter01(act.getParamExpDouble(this.rh, 0), act.getParamExpDouble(this.rh, 1));
                    break;
                case CRunGoogleMaps.ACT21_ADDMARKEROVERLAY01:
                    this.act21_AddMarkerOverlay01(act.getParamExpDouble(this.rh, 0), act.getParamExpDouble(this.rh, 1));
                    break;
                case CRunGoogleMaps.ACT22_ADDPOLYLINEOVERLAY0123:
                    this.act22_AddPolylineOverlay0123(act.getParamExpDouble(this.rh, 0), act.getParamExpDouble(this.rh, 1), act.getParamExpDouble(this.rh, 2), act.getParamExpDouble(this.rh, 3));
                    break;
                case CRunGoogleMaps.ACT23_ADDINFOWINDOWOVERLAY0123:
                    this.act23_AddInfoWindowOverlay0123(act.getParamExpDouble(this.rh, 0), act.getParamExpDouble(this.rh, 1), act.getParamExpString(this.rh, 2), act.getParamExpString(this.rh, 3));
                    break;
                case CRunGoogleMaps.ACT24_CLEAROVERLAYS:
                    this.act24_ClearOverlays();
                    break;
                case CRunGoogleMaps.ACT25_PANTO01:
                    this.act25_PanTo01(act.getParamExpDouble(this.rh, 0), act.getParamExpDouble(this.rh, 1));
                    break;
                case CRunGoogleMaps.ACT26_SHOWMAP:
                    this.act26_ShowMap();
                    break;
                case CRunGoogleMaps.ACT27_HIDEMAP:
                    this.act27_HideMap();
                    break;
            }
        },

        // Expressions
        // -------------------------------------------------
        expression: function (num) {
            switch (num) {
                case CRunGoogleMaps.EXP0_MAPX:
                    return this.exp0_MapX();
                case CRunGoogleMaps.EXP1_MAPY:
                    return this.exp1_MapY();
                case CRunGoogleMaps.EXP2_MAPWIDTH:
                    return this.exp2_MapWidth();
                case CRunGoogleMaps.EXP3_MAPHEIGHT:
                    return this.exp3_MapHeight();
            }
            return 0;
        },

        //Conditions Start
        cnd0_obj_MapIsReady: function () {
            if (this.mapIsReady == 1) {
                return true;
            }
            else {
                return false;
            }
            return false;
        },

        cnd1_obj_MapIsVisible: function () {
            if (this.map != null) {
                return this.map.visible;
            }
        },

        //Actions Start
        act0_SetMapKey0: function (param0) {
            if (this.map != null) {
                this.mapKey = param0;
            }
        },

        act1_ContinuousZoom0: function (param0) {
            if (this.map != null) {
                if (param0 == 1) {
                    this.map.enableContinuousZoom();
                }
                else {
                    this.map.disableContinuousZoom();
                }
            }
        },

        act2_ControlledByKeyboard0: function (param0) {
            if (this.map != null) {
                if (param0 == 1) {
                    this.map.enableControlByKeyboard();
                }
                else {
                    this.map.disableControlByKeyboard();
                }
            }
        },

        act3_Crosshairs0: function (param0) {
            if (this.map != null) {
                if (param0 == 1) {
                    this.map.enableCrosshairs();
                }
                else {
                    this.map.disableCrosshairs();
                }
            }
        },

        act4_Dragging0: function (param0) {
            if (this.map != null) {
                if (param0 == 1) {
                    this.map.enableDragging();
                }
                else {
                    this.map.disableDragging();
                }
            }
        },

        act5_ScrollWheelZoom0: function (param0) {
            if (this.map != null) {
                if (param0 == 1) {
                    this.map.enableScrollWheelZoom();
                }
                else {
                    this.map.disableScrollWheelZoom();
                }
            }
        },

        act6_InitialMapType0: function (param0) {
            if (this.map != null) {
                this.mapInitType = param0;
            }
        },

        act7_CreateMap0123: function (param0, param1, param2, param3) {
            var mapOptions = {
                draggable: true,
                zoom: 8,
                panControl: true,
                zoomControl: false,
                scaleControl: true,
                center: new google.maps.LatLng(-34.397, 150.644),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.map = new google.maps.Map(document.getElementById("MMFCanvas").parentElement, mapOptions);

            //document.getElementById('MMFCanvas').parentNode.appendChild(document.createElement('input'))
            //this.mapKey = "AIzaSyBD2qZ96o9ieAhnMqAYSwrfvbm9vlKptdM";

            this.locationLat = 45.53377; //Portland, OR :)
            this.locationLong = -122.678146;
            this.mapInitType = 0;
            this.mapIsReady = 0;

            this.mapX = param0;
            this.mapY = param1;
            this.mapWidth = param2;
            this.mapHeight = param3;

            this.map.x = this.mapX;
            this.map.y = this.mapY;
            //this.map.setSize((new Point(this.mapWidth, this.mapHeight)));

            //this.map.key = mapKey;
            this.map.sensor = "false";
            this.onMapReady();
        },

        onMapReady: function (event) {
            if (this.mapInitType == 1) {
                this.map.setCenter(new LatLng(this.locationLat, this.locationLong), 7, google.maps.MapTypeId.TERRAIN); //physical
            }
            else if (this.mapInitType == 2) {
                this.map.setCenter(new LatLng(this.locationLat, this.locationLong), 7, google.maps.MapTypeId.SATELLITE); //satellite
            }
            else if (this.mapInitType == 3) {
                this.map.setCenter(new LatLng(this.locationLat, this.locationLong), 7, google.maps.MapTypeId.HYBRID); //hybrid
            }
            else {
                this.map.setCenter(new google.maps.LatLng(this.locationLat, this.locationLong), 7, google.maps.MapTypeId.ROADMAP);
            }

            this.mapIsReady = 1;
            ho.pushEvent(GoogleMaps.CND0_OBJ_MAPISREADY, 0);
        },

        act8_AddZoomControl: function () {
            if (this.map != null) {
                this.map.addControl(new ZoomControl());
            }
        },

        act9_AddOverviewMapControl: function () {
            if (this.map != null) {
                this.map.addControl(new OverviewMapControl());
            }
        },

        act10_AddMapTypeControl: function () {
            if (this.map != null) {
                this.map.addControl(new MapTypeControl());
            }
        },

        act11_AddNavigationControl: function () {
            if (this.map != null) {
                this.map.addControl(new NavigationControl());
            }
        },

        act12_AddPositionControl: function () {
            if (this.map != null) {
                this.map.addControl(new PositionControl());
            }
        },

        act13_AddScaleControl: function () {
            if (this.map != null) {
                this.map.addControl(new ScaleControl());
            }
        },

        act14_RemoveZoomControl: function () {
            if (this.map != null) {
                this.map.removeControl(new ZoomControl());
            }
        },

        act15_RemoveOverviewMapControl: function () {
            if (this.map != null) {
                this.map.removeControl(new OverviewMapControl());
            }
        },

        act16_RemoveMapTypeControl: function () {
            if (this.map != null) {
                this.map.removeControl(new MapTypeControl());
            }
        },

        act17_RemoveNavigationControl: function () {
            if (this.map != null) {
                this.map.removeControl(new NavigationControl());
            }
        },

        act18_RemovePositionControl: function () {
            if (this.map != null) {
                this.map.removeControl(new PositionControl());
            }
        },

        act19_RemoveScaleControl: function () {
            if (this.map != null) {
                this.map.removeControl(new ScaleControl());
            }
        },

        act20_SetMapCenter01: function (param0, param1) {
            if (this.map != null) {
                this.locationLat = param0;
                this.locationLong = param1;

                if (this.mapInitType == 1) {
                    this.map.setCenter(new LatLng(locationLat, locationLong), 7);
                }
                else if (this.mapInitType == 2) {
                    this.map.setCenter(new LatLng(locationLat, locationLong), 7);
                }
                else if (this.mapInitType == 3) {
                    this.map.setCenter(new LatLng(locationLat, locationLong), 7);
                }
                else {
                    this.map.setCenter(new LatLng(locationLat, locationLong), 7);
                }
            }
        },

        act21_AddMarkerOverlay01: function (param0, param1) {
            if (this.map != null) {
                var marker = new Marker(new LatLng(param0, param1));
                this.map.addOverlay(marker);
            }
        },

        act22_AddPolylineOverlay0123: function (param0, param1, param2, param3) {
            if (this.map != null) {
                var polyline = new Polyline([new LatLng(param0, param1), new LatLng(param2, param3)]);
                this.map.addOverlay(polyline);
            }
        },

        act23_AddInfoWindowOverlay0123: function (param0, param1, param2, param3) {
            if (this.map != null) {
                this.map.openInfoWindow(new LatLng(param0, param1), new InfoWindowOptions({
                    title: param2,
                    content: param3
                }));
            }
        },

        act24_ClearOverlays: function () {
            if (this.map != null) {
                this.map.clearOverlays();
            }
        },

        act25_PanTo01: function (param0, param1) {
            if (this.map != null) {
                this.map.panTo(new LatLng(param0, param1));
            }
        },

        act26_ShowMap: function () {
            if (this.map != null) {
                this.map.visible = true;
            }
        },

        act27_HideMap: function () {
            if (this.map != null) {
                this.map.visible = false;
            }
        },

        //Expressions Start
        exp0_MapX: function () {
            var r = (0);
            r.forceInt(this.map.x);
            return r;
        },

        exp1_MapY: function () {
            var r = (0);
            r.forceInt(this.map.y);
            return r;
        },

        exp2_MapWidth: function () {
            var r = (0);
            r.forceInt(this.map.width);
            return r;
        },

        exp3_MapHeight: function () {
            var r = (0);
            r.forceInt(this.map.height);
            return r;
        }
};

//setup inheritance using extend
CServices.extend(CRunExtension, CRunGoogleMaps);
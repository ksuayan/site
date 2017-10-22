gb.Namespace(gb,"gb.ui.MapEdit");
gb.ui.MapEdit = new gb.Class();

gb.ui.MapEdit.include({

    init: function(window, divID, initObj, mapService) {
        this.mapService = mapService;
        this.queryRadius = 100;
        this.locations = {};
        this.styleHashes = {};
        this.selectorMarker = null;
        this.initMap(divID, initObj);
    },
    /**
     * Initialize mapWidget instance.
     *
     * @param divID - div ID to render map on
     * @param initObj - an instance of a MapDocument in the DB.
     */
    initMap: function(divID, initObj) {
        var that = this;

        var mapOptions = gb.ui.MapConfig.mapOptions;
        if (initObj.center && initObj.center.coordinates) {
            var coords = initObj.center.coordinates;
            mapOptions.center = new google.maps.LatLng(coords[1],coords[0]);
        }
        if (initObj.zoom) {
            mapOptions.zoom = initObj.zoom;
        }
        this.map = new google.maps.Map(document.getElementById(divID), mapOptions);
        this.map.setOptions({styles: gb.ui.MapConfig.mapStyles2});

        var onSuccess = function(data){
            console.log("response", data);
            that.onQueryResponse(that, data);
        },

        getLocationsByMap = function(){
            that.mapService.getLocationsByMap(initObj._id,
                function(results){
                    that.onQueryResponse(that, results);
                }, function(){}
            );
        },

        getMapLocationsWithin = function(){
            gb.util.throttle(function(){
                var bounds = that.map.getBounds(),
                    neLatLng = bounds.getNorthEast(),
                    swLatLng = bounds.getSouthWest(),
                    neLatLngStr = neLatLng.lat() + "," + neLatLng.lng(),
                    swLatLngStr = swLatLng.lat() + "," + swLatLng.lng();
                that.mapService.getLocationsWithin(swLatLngStr, neLatLngStr,
                    function(results){
                        that.onQueryResponse(that, results);
                    }, function(){});
            },500);
        };

        google.maps.event.addListener(that.map, 'bounds_changed', getMapLocationsWithin, 300);

        google.maps.event.addListener(that.map, 'click', gb.util.throttle(function(event){
            var latLng = event.latLng, clickCoord = latLng.lat()+","+latLng.lng();
            that.mapService.getLocationsNearPoint(clickCoord, that.queryRadius, onSuccess, function(){});
        }, 300));

        // google.maps.event.addListener(that.map, 'maptypeid_changed', function(){});

        getLocationsByMap();

    },
    /**
     * Angular utility. Fetch the $scope.
     * @returns {*}
     */
    getAngularScope: function() {
        return angular.element(document.getElementById("screen")).scope();
    },
    /**
     * The selector marker is a draggable
     * marker used to define new locations.
     *
     * @param latLng
     * @param draggable
     */
    updateSelectorMarker: function(latLng, draggable) {
        var that = this,
            newLatLng = null,
            locationObj = {
                loc: {
                    coordinates: [latLng.lng(), latLng.lat()]
                },
                address: "",
                name: ""
            };
        var onGeocoderResponse = function(results) {
            locationObj.address = results[0].formatted_address;
            locationObj.name = results[1].formatted_address;
        };
        var onPositionUpdate = function() {
            newLatLng = that.selectorMarker.getPosition();
            locationObj.loc.coordinates[0] = newLatLng.lng();
            locationObj.loc.coordinates[1] = newLatLng.lat();
            that.map.panTo(newLatLng);
            that.mapService.reverseGeocode(newLatLng, onGeocoderResponse);
        };
        /**
         * Replace previous instance.
         */
        if (this.selectorMarker) {
            this.selectorMarker.setMap(null);
            this.selectorMarker = null;
        }
        this.selectorMarker = new google.maps.Marker({
            map: that.map,
            position: latLng,
            draggable: draggable
        });
        // Tell angular when the selector marker is clicked.
        google.maps.event.addListener(this.selectorMarker, 'click', function(){
            var scope = that.getAngularScope();
            scope.addLocation(locationObj);
        });
        google.maps.event.addListener(this.selectorMarker, 'dragend', onPositionUpdate);
        onPositionUpdate();
    },
    /**
     * Get the mapWidget's center latLng coordinates.
     * @param detectLocation
     */
    getGeoLocation: function() {
        var that = this;
        var showPosition = function(center) {
            that.updateSelectorMarker(center, true);
        };
        showPosition(that.map.getCenter());
    },

    /**
     * Go to an Angular state with parameters.
     * @param state
     * @param params
     */
    gotoAngularState: function(state, params) {
        var scope = this.getAngularScope();
        scope.$apply(function () {
            scope.gotoState(state, params);
        });
    },
    /**
     * Create a Google Map InfoWindow.
     * @param name
     * @returns {google.maps.InfoWindow}
     */
    createInfoWindow: function(name) {
        var contentString = '<div class="info"><p>'+name+'</p></div>';
        return new google.maps.InfoWindow({
            content: contentString
        });
    },
    /**
     * Create a marker.
     * @param icon
     * @param id
     * @param name
     * @param desc
     * @param lng
     * @param lat
     * @returns {google.maps.Marker}
     */
    createMarker: function(icon, id, name, desc, lng, lat) {
        var that = this,
            latLng = new google.maps.LatLng(lat,lng),
            marker = new google.maps.Marker({
                position: latLng,
                map: this.map,
                icon: icon,
                title: name
            }),
            infoWindow = this.createInfoWindow(name);

        google.maps.event.addListener(marker, 'mouseover', function() {
            infoWindow.open(that.map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            infoWindow.close();
        });

        google.maps.event.addListener(marker, 'click', function() {
            that.map.panTo(latLng);
            var scope = that.getAngularScope();
            scope.editMapLocation(id);
        });

        return marker;
    },
    /**
     * Handle incoming response data from backend queries.
     * @param that
     * @param data
     */
    onQueryResponse: function(that, data) {
        if (data.length) {
            for (var i=0, n=data.length; i<n; i++) {
                that.addLocation(data[i]);
            }
        }
    },

    addLocation: function(location) {
        var id = location._id;
        if (!this.locations[id]) {
            console.log("loc:", location);
            var coords = location.loc.coordinates,
                style = (location.styleHash) ? location.styleHash : "none",
                mapMarkerStyle = gb.ui.MapConfig.mapMarkerStyles[style];
            // used for filtering
            this.styleHashes[id] = style;
            this.locations[id] = this.createMarker(
                mapMarkerStyle,
                id,
                location.name,
                location.description,
                coords[0],
                coords[1]);
        }
    },

    getStyleFilters: function(that) {
        var countChecked = function() {
            var selected = [];
            $("#filter-form input:checked").each(function(){
                selected.push($(this).val());
            });
            // console.log("selected", selected);
            that.enabledList = selected;
            that.filterLocationsByStyle();
        };
        var filterForm = $("<form id='filter-form'></form>");
        for (var key in gb.ui.MapConfig.mapMarkerStyles) {
            var jq = $("<input type='checkbox'>"),
                name = key.replace("-",""),
                layerName = gb.ui.MapConfig.mapLayerNames[key],
                label = $("<label for='filter-"+name+"'>"+layerName+"</label>");

            jq.attr("id", "filter-"+name)
                .attr("value", key)
                .prop('checked', true);

            console.log(key, layerName);
            filterForm.append(jq).append(label);
        }
        $("#notes").append(filterForm);
        $("#filter-form input[type=checkbox]").on("click", countChecked);
        countChecked();
    },

    filterLocationsByStyle: function() {
        /*
        for (var item in this.locations) {
            if (this.enabledList.indexOf(this.styleHashes[item])>-1) {
                this.locations[item].setMap(this.map);
            } else {
                this.locations[item].setMap(null);
            }
        }
        */
    }
});

google.maps.visualRefresh = true;

/**
 * Prototype extension for computing distance
 * between two points in meters.
 * @param latlng
 * @returns {number}
 */
google.maps.LatLng.prototype.distanceFrom = function(latlng) {
    var lat = [this.lat(), latlng.lat()],
        lng = [this.lng(), latlng.lng()],
        R = 6378137,
        dLat = (lat[1]-lat[0]) * Math.PI / 180,
        dLng = (lng[1]-lng[0]) * Math.PI / 180,
        a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat[0] * Math.PI / 180 ) * Math.cos(lat[1] * Math.PI / 180 ) *
            Math.sin(dLng/2) * Math.sin(dLng/2),
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)),
        d = R * c;
    return Math.round(d);
};
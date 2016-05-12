gb.Namespace(gb,"gb.ui.MapWidget");
gb.ui.MapWidget = new gb.Class();


gb.ui.MapWidget.include({

    init: function(window, divID, mapObj) {
        this.geocoder = new google.maps.Geocoder();
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.selectorMarker = null;
        this.errorMessage = $("#message");
        this.initMap(divID, mapObj);
    },


    /**
     * Initialize map instance.
     * @param divID
     */
    initMap: function(divID, mapObj) {
        var that = this,
            scope = angular.element(document.getElementById("screen")).scope();

        this.map = new google.maps.Map(document.getElementById(divID), gb.ui.MapConfig.mapOptions);
        this.map.setOptions({styles: gb.ui.MapConfig.mapStyles2});

        if (mapObj) {
            if (mapObj.center.coordinates) {
                var latLng = new google.maps.LatLng(mapObj.center.coordinates[1], mapObj.center.coordinates[0]);
                this.map.panTo(latLng);
            }
            if (mapObj.zoom) {
                this.map.setZoom(mapObj.zoom);
            }
        }

        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setPanel($("#info").get(0));

        google.maps.event.addListener(that.map, 'bounds_changed', function(){
            var center = that.map.getCenter(),
            zoom = that.map.getZoom();
            scope.updateMapSetting(zoom, center.lat(), center.lng());
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
            that.selectLocation(latLng, name);
            that.gotoAngularState("editLocation", {"id":id});
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
            // var markerStyles = gb.util.getDedupedValuesByKey(data,"styleHash");
            // console.log("styles", markerStyles);
            for (var i=0, n=data.length; i<n; i++) {
                var item = data[i];
                that.addLocation(item);
            }
            that.filterLocationsByStyle();
        }
    },
    /**
     * Retrieve geolocation given a query string.
     * @param that
     * @param queryStr
     */
    geocode: function(that, queryStr) {
        that.geocoder.geocode({
            'address': queryStr,
            'bounds': that.map.getBounds()
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var latLng = results[0].geometry.location;
                that.map.panTo(latLng);
                that.updateSelectorMarker(latLng, true);
                that.hideError();
            } else {
                that.showError('Geocode was not successful for the following reason: ' + status);
            }
        });
    },
    /**
     * Retrieve an address given a latitude and longitude.
     * @param lat
     * @param lng
     * @param onSuccess
     * @param onError
     */
    reverseGeocode: function(latLng, onSuccess) {
        var that = this;
        this.geocoder.geocode({'latLng': latLng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1] && results[1].formatted_address &&
                    onSuccess && typeof onSuccess === 'function') {
                    onSuccess(results);
                    that.hideError();
                } else {
                    that.showError("No results found.");
                }
            } else {
                that.showError('Geocoder failed due to: ' + status);
            }
        });
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
            newLatLng = null;
        /**
         * Let's notify the Angular side whenever the
         * user drags the marker on the map.
         * @param results
         */
        var onGeocoderResponse = function(results) {
            that.gotoAngularState("addLocation");
            var locationObj = {
                loc: {
                    coordinates: [newLatLng.lng(), newLatLng.lat()]
                },
                address: results[0].formatted_address,
                name: results[1].formatted_address
            };
        };

        var onPositionUpdate = function() {
            newLatLng = that.selectorMarker.getPosition();
            that.map.panTo(newLatLng);
            that.reverseGeocode(newLatLng, onGeocoderResponse);
        };

        /**
         * Replace previous instance.
         */
        if (this.selectorMarker) {
            this.selectorMarker.setMap(null);
            this.selectorMarker = null;
        }
        this.selectorMarker = new google.maps.Marker({
            map: this.map,
            position: latLng,
            draggable: draggable
        });
        google.maps.event.addListener(this.selectorMarker, 'click', onPositionUpdate);
        google.maps.event.addListener(this.selectorMarker, 'dragend', onPositionUpdate);
        onPositionUpdate();
    },
    /**
     *
     * @param detectLocation
     */
    getGeoLocation: function(detectLocation) {
        var that = this;

        var showPosition = function(latLng) {
            that.updateSelectorMarker(latLng, true);
        };
        /** either get the location from the browser
         *  or just use the current map center.
         */
        if (detectLocation && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position){
                showPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            });
        } else {
            showPosition(that.map.getCenter());
        }
    },

    selectLocation: function(latLng, name) {
        if (latLng) {
            this.destination = latLng;
        }
        if (name) {
            $("#info").html('<h3>To: '+name+'</h3>');
        }
    },

    showError: function(message) {
        this.errorMessage.text(message).slideDown();
    },
    hideError: function() {
        this.errorMessage.text("").slideUp();
    }
});


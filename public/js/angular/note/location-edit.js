gb.Namespace(gb,"gb.ui.LocationEdit");
gb.ui.LocationEdit = new gb.Class();

gb.ui.LocationEdit.include({

    init: function(window, divID, locationObj, mapService) {
        var that = this;

        this.locations = {};
        this.styleHashes = {};

        var mapOptions = gb.ui.MapConfig.mapOptions,
            newLatLng = null;

        this.map = new google.maps.Map(document.getElementById(divID), mapOptions);
        this.map.setOptions({styles: gb.ui.MapConfig.mapStyles2});

        var draggableMarker = null;

        if (locationObj) {
            // starting from a locationObj
            var coords = locationObj.loc.coordinates;
            newLatLng = new google.maps.LatLng(coords[1], coords[0]);
            draggableMarker = new google.maps.Marker({
                position: newLatLng,
                map: this.map,
                icon: gb.ui.MapConfig.mapMarkerStyles[locationObj.styleHash],
                title: "Drag Me",
                draggable: true
            });
            this.map.panTo(newLatLng);

        } else {

            // starting off blank...
            var mapCenter = this.map.getCenter();
            locationObj = {
              loc: {
                  coordinates: [mapCenter.lng(), mapCenter.lat()],
                  type: "Point"
              }
            };

            draggableMarker = new google.maps.Marker({
                position: this.map.getCenter(),
                map: this.map,
                icon: gb.ui.MapConfig.mapMarkerStyles["none"],
                title: "Drag Me",
                draggable: true
            });
        }

        var onGeocoderResponse = function(results) {
            locationObj.name = results[1].formatted_address;
            locationObj.address = results[0].formatted_address;

            var scope = that.getAngularScope();
            mapService.updateLocationInfo(scope.location, locationObj);
            scope.$apply();
        },

        updateMarkerLocation = function() {
            newLatLng = draggableMarker.getPosition();
            locationObj.loc.coordinates[0] = newLatLng.lng();
            locationObj.loc.coordinates[1] = newLatLng.lat();
            that.map.panTo(newLatLng);
            mapService.reverseGeocode(newLatLng, onGeocoderResponse);
        };

        google.maps.event.addListener(draggableMarker, 'dragend', updateMarkerLocation);
    },


    /**
     * Angular utility. Fetch the $scope.
     * @returns {*}
     */
    getAngularScope: function() {
        return angular.element(document.getElementById("screen")).scope();
    }

});


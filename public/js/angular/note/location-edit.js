gb.Namespace(gb,"gb.ui.LocationView");
gb.ui.LocationView = new gb.Class();

gb.ui.LocationView.include({

    init: function(window, divID, locationObj) {
        this.locations = {};
        this.styleHashes = {};
        var mapOptions = gb.ui.MapConfig.mapOptions;
        if (locationObj.loc && locationObj.loc.coordinates) {
            var coords = locationObj.loc.coordinates;
            mapOptions.center = new google.maps.LatLng(coords[1],coords[0]);
        }
        this.map = new google.maps.Map(document.getElementById(divID), mapOptions);
        this.map.setOptions({styles: gb.ui.MapConfig.mapStyles2});
        this.addLocation(locationObj);
    },
    /**
     * Create a Google Map InfoWindow.
     * @param name
     * @returns {google.maps.InfoWindow}
     */
    createInfoWindow: function(name, desc) {
        return new google.maps.InfoWindow({
            content: '<div class="info"><strong>'+name+'</strong></div>'
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
            infoWindow = this.createInfoWindow(name, desc);

        google.maps.event.addListener(marker, 'mouseover', function() {
            infoWindow.open(that.map, marker);
        });

        google.maps.event.addListener(marker, 'mouseout', function() {
            infoWindow.close();
        });

        google.maps.event.addListener(marker, 'click', function() {
            that.map.panTo(latLng);
        });
        return marker;
    },
    addLocation: function(location) {
        var id = location._id;
        if (!this.locations[id]) {
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
    }
});


gb.Namespace(gb,"gb.ui.MapView");
gb.ui.MapView = new gb.Class();

gb.ui.MapView.include({

    init: function(window, divID, mapId) {
        this.locations = {};
        this.styleHashes = {};
        var that = this,
            mapOptions = gb.ui.MapConfig.mapOptions,
            onMapDetails = function(mapId) {
                $.ajax({
                    dataType: "json",
                    url: "/api/map-locations/" + mapId,
                    success: function (data) {
                        that.onQueryResponse(that, data);
                    }
                });
            };
        $.ajax({
            dataType: "json",
            url: "/api/map/"+mapId,
            success: function(initObj){
                if (initObj.center && initObj.center.coordinates) {
                    var coords = initObj.center.coordinates;
                    mapOptions.center = new google.maps.LatLng(coords[1],coords[0]);
                }
                if (initObj.zoom) {
                    mapOptions.zoom = initObj.zoom;
                }
                that.map = new google.maps.Map(document.getElementById(divID), mapOptions);
                that.map.setOptions({styles: gb.ui.MapConfig.mapStyles2});
                onMapDetails(mapId);
            }
        });
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
     * Create a Google Map InfoWindow.
     * @param name
     * @returns {google.maps.InfoWindow}
     */
    createInfoWindow: function(name, desc) {
        var contentString = '<div class="info"><strong>'+name+'</strong></div>';
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

/**
 * Initialize multiple instances on page.
 * Look for all .map-widget divs,
 * read their data-map-id and invoke backend call from widget.
 */
$(function(){
    if ($(".map-widget").length>0) {
        var mapWidget = {},
            mapDivs = $(".map-widget");
        mapDivs.each(function(idx, el){
            var jq = $(el),
                id = jq.attr("id"),
                mapId = jq.attr("data-map-id");
            mapWidget[id] = new gb.ui.MapView(window, id, mapId);
        });
    }
});



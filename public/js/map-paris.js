/**
 *
 * Paris Map by Kyo Suayan
 *
 *
 */

var mapStyles = [
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            { "color": "#4875b7" },
            { "lightness": 13 }
        ]
    },{
        "featureType": "water"  },{
        "elementType": "labels.text.fill",
        "stylers": [
            { "color": "#333333" }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "stylers": [
            { "hue": "#c3ff00" },
            { "saturation": -48 },
            { "lightness": -51 }
        ]
    },{
        "featureType": "road.highway",
        "stylers": [
            { "hue": "#ff6e00" },
            { "lightness": -1 },
            { "saturation": 13 }
        ]
    },{
        "featureType": "road.local",
        "stylers": [
            { "saturation": 21 },
            { "color": "#95cdcf" },
            { "lightness": 13 }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            { "color": "#fff" }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            { "hue": "#ff8000" },
            { "color": "#e8be86" }
        ]
    }
];

var mapOptions = {
    center: new google.maps.LatLng(48.852968,2.349902),
    zoom: 14,
    // mapTypeId: google.maps.MapTypeId.ROADMAP,
    // mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapTypeControl: true,
    mapTypeControlOptions: {
        style: google.maps.MapTypeControlStyle.DEFAULT,
        mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.TERRAIN
        ]
    },
    zoomControl: true,
    zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL
    }

};

var positions = [];


var placeMarkerByAddress = function(addressObj, streetAddress) {
    geocoder.geocode( { 'address': streetAddress }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            var isOpen = false;
            var position = results[0].geometry.location;

            addressObj["latitude"] = position.lat().toFixed(5);
            addressObj["longitude"] = position.lng().toFixed(5);

            positions.push(new google.maps.LatLng(position.lat(), position.lng()));
            console.log('Success: ' + addressObj.address + ": " + position);
            var marker = new google.maps.Marker({
                map: map,
                position: position
            });

            var infoWindow = createInfoWindow(addressObj);

            google.maps.event.addListener(marker, 'mouseover', function() {
                infoWindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                infoWindow.close();
            });
        } else {
            console.log('Failed: ' + addressObj.address + ": " + status);
        }
    });
};

var zoomToFit = function() {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, n = positions.length; i < n; i++) {
        bounds.extend(positions[i]);
    }
    map.fitBounds(bounds);
};

var codeAddress = function() {
    var address = document.getElementById('address').value;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
};

var initialize = function() {

    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    map.setOptions({styles: mapStyles});

    geocoder = new google.maps.Geocoder();
    google.maps.event.addListener( map, 'maptypeid_changed', function() {
        console.log("type changed", map.getMapTypeId());
    });

    var layer = new google.maps.KmlLayer({
        url: 'http://media.suayan.com/geodata/Paris-City-Map-Layered.kmz',
        // suppressInfoWindows: true,
        map: map
    });


    google.maps.event.addListener(layer, 'click', function(kmlEvent) {
        var name = kmlEvent.featureData.name,
            id = kmlEvent.featureData.id,
            latLng = kmlEvent.latLng;

        $("#notes").html("<h2>"+name+"</h3><p>ID: "+id+"</p>");
        console.log("kmlEvent", kmlEvent);
    });

    console.log("present.", map, geocoder, layer);

};

var map = null;
var geocoder = null;
google.maps.visualRefresh = true;

google.maps.event.addDomListener(window, 'load', initialize);

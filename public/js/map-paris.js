gb.Namespace(gb,"gb.ui.MapDemo");
gb.ui.MapDemo = new gb.Class();

gb.ui.MapConfig = {
    mapPath: "/img/map/",
    mapStyles: [
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
                { "saturation": 5 }
            ]
        },{
            "featureType": "road.local",
            "stylers": [
                { "saturation": 21 },
                { "color": "#95cdcf" },
                { "lightness": 5 }
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
    ],
    mapStyles2: [
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
                { "saturation": 5 }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "on"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#dff1ee"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#b1d7e8"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#095e5f"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#acf2f7"
                }
            ]
        },

        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffa75b"
                }
            ]
        }
    ],
    mapOptions: {
        center: new google.maps.LatLng(48.85340300000001,2.3487840000000233),
        zoom: 18,
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
    }
};

gb.ui.MapConfig.mapMarkers = [
    {
        url: gb.ui.MapConfig.mapPath + "pin14.png", // red
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin4.png", // green
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin10.png", // blue
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "pin9.png", // orange
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
        {
        url: gb.ui.MapConfig.mapPath + "pin6.png", // yello-green
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    }
];
gb.ui.MapConfig.mapMarkerStyles = {
    "53ca3a80": gb.ui.MapConfig.mapMarkers[0],
    "-662d500": gb.ui.MapConfig.mapMarkers[1],
    "3a98100": gb.ui.MapConfig.mapMarkers[2],
    "1939180": gb.ui.MapConfig.mapMarkers[3],
    "-2a77fa60": gb.ui.MapConfig.mapMarkers[4]
};
gb.ui.MapConfig.mapLayerNames = {
    "53ca3a80": "Food",
    "-662d500": "Art &amp; Museums",
    "3a98100": "Landmarks",
    "1939180": "Shops &amp; Markets",
    "-2a77fa60": "Specialty"
};

gb.ui.MapDemo.include({


    init: function(window, divID, formID) {
        var that = this;
        this.center = "48.85340300000001,2.3487840000000233"; // Kilometer Zero
        this.maxDistance = 300;
        this.locations = {};
        this.styleHashes = {};
        this.geocoder = new google.maps.Geocoder();
        this.map = new google.maps.Map(
            document.getElementById(divID),
            gb.ui.MapConfig.mapOptions);
        this.map.setOptions({styles: gb.ui.MapConfig.mapStyles2});
        this.geocodeButton = $("#"+formID+" #go");
        this.geocodeButton.on("click", function(evt){
            var value = $("#"+formID+" #address").val();
            that.codeAddress(that, value);
        });
        this.initMap();
        this.getStyleFilters(that);
    },

    initMap: function() {
        var that = this;

        google.maps.event.addListener(that.map, 'bounds_changed', gb.util.throttle(function(){
            var bounds = that.map.getBounds(),
                neLatLng = bounds.getNorthEast(),
                swLatLng = bounds.getSouthWest(),
                neLatLngStr = neLatLng.lat() + "," + neLatLng.lng(),
                swLatLngStr = swLatLng.lat() + "," + swLatLng.lng();
            // console.log("bounds_changed", swLatLngStr, neLatLngStr);
            that.queryMarkersWithin(swLatLngStr, neLatLngStr);
        }, 1000));

        google.maps.event.addListener(that.map, 'click', gb.util.throttle(function(event){
            var latLng = event.latLng;
            center = latLng.lat()+","+latLng.lng();
            // console.log("click", center, that.maxDistance);
            that.queryMarkersNearPoint(that.center, that.maxDistance);
        }, 500));

        google.maps.event.addListener(that.map, 'maptypeid_changed', function() {
            console.log("type changed", that.map.getMapTypeId());
        });
    },

    createInfoWindow: function(name, description) {
        var contentString = '<div id="content">'+
            '<h2 id="firstHeading" class="firstHeading">'+name+'</h2>'+
            '<div id="bodyContent">'+description+'</div>'+
            '</div>';
        return new google.maps.InfoWindow({
            content: contentString
        });
    },

    createMarker: function(icon, name, desc, lat, lng) {
        // console.log(">> loc", name, desc, lat, lng);
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
        return marker;
    },

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

    addLocation: function(location) {
        var id = location._id;
        if (!this.locations[id]) {
            var coords = location.loc.coordinates;
            this.styleHashes[id] = location.styleHash;
            this.locations[id] = this.createMarker(
                gb.ui.MapConfig.mapMarkerStyles[location.styleHash],
                location.name,
                location.description,
                coords[0],
                coords[1]);
        }
    },

    queryMarkersNearPoint: function(ctr, dist) {
        var that = this;
        // console.log("/api/loc/near/"+ctr+"/"+dist);
        $.ajax({
            url: "/api/loc/near/"+ctr+"/"+dist
        }).success(function(data){
            that.onQueryResponse(that, data);
        });
    },

    queryMarkersWithin: function(swLatLng, neLatLng) {
        var that = this;
        // console.log("/api/loc/within/"+swLatLng+"/"+neLatLng);
        $.ajax({
            url: "/api/loc/within/"+swLatLng+"/"+neLatLng
        }).success(function(data){
            that.onQueryResponse(that, data);
        });
    },

    codeAddress: function(that, queryStr) {
        that.geocoder.geocode({'address': queryStr}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                that.map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: that.map,
                    position: results[0].geometry.location
                });
            } else {
                console.log('Geocode was not successful for the following reason: ' + status);
            }
        });
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
            var jq = $("<input type='checkbox'>");
            var name = key.replace("-","");
            jq.attr("id", "filter-"+name)
              .attr("value", key)
              .prop('checked', true);

            var label = $("<label for='filter-"+name+"'>"+gb.ui.MapConfig.mapLayerNames[key]+"</label>");
            filterForm.append(jq).append(label);
        }
        $("#notes").append(filterForm);
        $("#filter-form input[type=checkbox]").on("click", countChecked);
        countChecked();
    },

    filterLocationsByStyle: function() {
        for (var item in this.locations) {
            if (this.enabledList.indexOf(this.styleHashes[item])>-1) {
                this.locations[item].setMap(this.map);
            } else {
                this.locations[item].setMap(null);
            }
        }
    }

});



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


var loadFromKml = function(map, url) {
    var layer = new google.maps.KmlLayer({
        url: 'http://media.suayan.com/geodata/paris.kml',
        map: map
    });
    google.maps.event.addListener(layer, 'click', function(kmlEvent) {
        var name = kmlEvent.featureData.name,
            id = kmlEvent.featureData.id,
            latLng = kmlEvent.latLng;
        $("#notes").html("<h2>"+name+"</h3><p>ID: "+id+"</p>");
        console.log("kmlEvent", kmlEvent);
    });
    map.data.loadGeoJson('http://media.suayan.com/geodata/paris.json');
};



google.maps.visualRefresh = true;
google.maps.event.addDomListener(window, 'load', function(){
    var parisMap = new gb.ui.MapDemo(window, "map-canvas", "geocode");
});
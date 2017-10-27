gb.Namespace(gb,"gb.ui.MapConfig");

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
        zoom: 15,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.DEFAULT,
            mapTypeIds: [
                google.maps.MapTypeId.ROADMAP,
                google.maps.MapTypeId.TERRAIN,
                google.maps.MapTypeId.SATELLITE
            ]
        },
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        }
    }
};

gb.ui.MapConfig.screens = [
    {
        name: "San Mateo, CA",
        center: new google.maps.LatLng(37.556425880972185, -122.29441177542719),
        zoom: 16
    },
    {
        name: "San Francisco, CA",
        center: new google.maps.LatLng(37.7749295, -122.41941550000001),
        zoom: 14
    },
    {
        name: "Copenhagen, Denmark",
        center: new google.maps.LatLng(55.6877104529202, 12.598292010278355),
        zoom: 14
    },
    {
        name: "Paris, France",
        center: new google.maps.LatLng(48.856614, 2.3522219000000177),
        zoom: 15
    },
    {
        name: "Venice, Italy",
        center: new google.maps.LatLng(45.43992899642088, 12.331973134515351),
        zoom: 14
    }
];

gb.ui.MapConfig.mapMarkers = [
    {
        url: gb.ui.MapConfig.mapPath + "map-pin-red.svg", // red
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "map-pin-yellowgreen.svg", // yellowgreen
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "map-pin-blue.svg", // blue
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "map-pin-orange.svg", // orange
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "map-pin-yellow.svg", // yellow
        size: new google.maps.Size(25, 45),
        origin: new google.maps.Point(0,0),
        anchor: new google.maps.Point(13, 45)
    },
    {
        url: gb.ui.MapConfig.mapPath + "map-pin-skyblue.svg", // sky blue
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
    "-2a77fa60": gb.ui.MapConfig.mapMarkers[4],
    "none": gb.ui.MapConfig.mapMarkers[5]
};

gb.ui.MapConfig.mapLayerNames = {
    "53ca3a80": "Food",
    "-662d500": "Art &amp; Museums",
    "3a98100": "Landmarks",
    "1939180": "Shops &amp; Markets",
    "-2a77fa60": "Specialty",
    "none": "None"
};


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
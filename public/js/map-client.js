
var shcAddresses = [
    {
        "name": "Stanford Hospitals &amp; Clinics",
        "address": "300 Pasteur Drive, Stanford, CA, 94305"
    },
    {
        "name": "Arrillaga Center for Sports &amp; Recreation",
        "address": "341 Galvez Street, Stanford, CA 94305-6175"
    },
    {
        "name": "Blake Wilbur Building",
        "address": "900 Blake Wilbur Drive, Palo Alto, CA  94304"
    },
    {
        "name": "Byers Eye Institute at Stanford",
        "address": "2452 Watson Court, Palo Alto, CA 94303"
    },
    {
        "name": "California VitreoRetinal Center",
        "address": "2452 Watson Court, Palo Alto, CA 94303"
    },
    {
        "name": "Stanford Clinical Cancer Center",
        "address": "875 Blake Wilbur Drive, Stanford, CA 94305"
    },
    {
        "name": "Center for Education and Professional Development",
        "address": "1451 California Ave, Palo Alto, CA 94304"
    },
    {
        "name": "Hoover Pavillion",
        "address": "211 Quarry Road, Palo Alto, CA 94304"
    },
    {
        "name": "Lucile Packard Children's Hospital",
        "address": "725 Welch Road, Palo Alto, CA 94304"
    },
    {
        "name": "Psychiatry Building",
        "address": "401 Quarry Rd., Stanford, CA 94305"
    },
    {
        "name": "Stanford University Blood Center of Mountain View",
        "address": "515 South Drive, Suite #20, Mountain View, CA 94040"
    },
    {
        "name": "Menlo Medical Clinic (Adult &amp; Pediatric)",
        "address": "1300 Crane Street, Menlo Park, CA 94025"
    },
    {
        "name": "Menlo Medical Clinic (Adult)",
        "address": "321 Middlefield Road, Menlo Park, CA 94025"
    },
    {
        "name": "Stanford Medicine Outpatient Center",
        "address": "450 Broadway Street, Redwood City, CA 94063"
    },
    {
        "name": "Vaden Student Health (Stanford Students Only)",
        "address": "866 Campus Drive, Stanford, CA 94305"
    },
    {
        "name": "Stanford Medicine Imaging Center",
        "address": "451 Sherman Avenue, Palo Alto, CA 94306"
    },
    {
        "name": "Stanford Medical School Blood Center",
        "address": "780 Welch Road, Suite 100, Palo Alto, CA 94304"
    },
    {
        "name": "Stanford Primary Care, Portola Valley",
        "address": "3250 Alpine Road, Portola Valley, CA 94028"
    }
];

var addresses = [{"i":1,"city":"Alameda","name":"ALAMEDA CENTRE PHYSICIANS","address":"501 S Shore Ctr W 103c","zipcode":"94501-5762"},{"i":2,"city":"Berkeley","name":"US HEALTHWORKS MED GRP PC","address":"2850 7th St 100","zipcode":"94710-2703"},{"i":3,"city":"Campbell","name":"CALIFORNIA EMERG PHYS MED","address":"1580 S Winchester Bl 202","zipcode":"95008-0519"},{"i":4,"city":"Concord","name":"PARK AVE WALK INCLINIC","address":"1280 Monument Blvd 1","zipcode":"94520-4405"},{"i":5,"city":"Daly City","name":"PRIMARY HLTH CARE ASSOCS","address":"901 Campus Dr 112","zipcode":"94015-4930"},{"i":6,"city":"Dublin","name":"AMADOR VLY MED CLNC","address":"7667 Amador Valley Blvd","zipcode":"94568-2341"},{"i":7,"city":"Foster City","name":"MARINER MED CTR","address":"1098 Foster City Blvd 210","zipcode":"94404-2300"},{"i":8,"city":"Fremont","name":"FREMONT URGENT CARE","address":"3161 Walnut Ave","zipcode":"94538-2216"},{"i":9,"city":"Gilroy","name":"US HEALTHWORKS MED GRP PC","address":"7793 Wren Ave","zipcode":"95020-4902"},{"i":10,"city":"Livermore","name":"TRI VALLEY FAMILY MEDICINE","address":"1133 E Stanley Blvd 111","zipcode":"94550-4243"},{"i":11,"city":"Los Gatos","name":"AFTER HOURS HEALTHCARE","address":"14651 S Bascom Ave 112","zipcode":"95032-4477"},{"i":12,"city":"Los Gatos","name":"SOUTH BAY CHILDRENS MEDICAL","address":"800 Pollard Rd B205","zipcode":"95032-1429"},{"i":13,"city":"Milpitas","name":"US HEALTHWORKS MED GRP PC","address":"1717 S Main St","zipcode":"95035-6756"},{"i":14,"city":"Newark","name":"DOCTORS EXPRESS OF NEWARK","address":"5763 Stevenson Blvd","zipcode":"94560-5301"},{"i":15,"city":"Oakland","name":"CHILDRENS HOSPITAL","address":"747 52nd St","zipcode":"94609-1859"},{"i":16,"city":"Oakland","name":"CONCENTRA URGENT CARE","address":"384 Embarcadero West","zipcode":"94607-3735"},{"i":17,"city":"Oakland","name":"HEALTHY COMMUNITIES","address":"2580 San Pablo Ave","zipcode":"94612-1160"},{"i":18,"city":"Oakland","name":"US HEALTHWORKS MED GRP PC","address":"7817 Oakport St 140","zipcode":"94621-2035"},{"i":19,"city":"Palo Alto","name":"LPCH AFTER HOURS CLINIC FOR CHILDREN","address":"725 Welch Rd","zipcode":"94304"},{"i":20,"city":"Palo Alto","name":"STANFORD EXPRESS CARE CLINIC","address":"211 Quarry Rd","zipcode":"94304"},{"i":21,"city":"Pleasant Hill","name":"NIGHT OWL PEDIATRICSINC","address":"425 Gregory Ln 203","zipcode":"94523-2813"},{"i":22,"city":"Pleasanton","name":"EXPRESS MEDICINE URGENT CARE","address":"5700 Stoneridge Mall 100","zipcode":"94588-2872"},{"i":23,"city":"Pleasanton","name":"PLEASANTON URGENT CARE","address":"3128 Santa Rita Rd","zipcode":"94566-8300"},{"i":24,"city":"San Carlos","name":"US HEALTHWORKS MED GRP PC","address":"125 Shoreway Rd, Suite A","zipcode":"94070"},{"i":25,"city":"San Francisco","name":"CONCENTRA URGENT CARE","address":"2 Connecticut St","zipcode":"94107-2451"},{"i":26,"city":"San Francisco","name":"CONCENTRA URGENT CARE","address":"26 California St","zipcode":"94111-4803"},{"i":27,"city":"San Francisco","name":"GOLDEN GATE URGENT CARE","address":"2395 Lombard St","zipcode":"94123-2601"},{"i":28,"city":"San Francisco","name":"SFO MEDICAL CLINIC","address":"International Terminal 3","zipcode":"94128"},{"i":29,"city":"San Jose","name":"ALMADEN FAMILY PHYS MED GRP (AFPMG)","address":"6475 Camden Ave 105","zipcode":"95120-2847"},{"i":30,"city":"San Jose","name":"CALIFORNIA EMERG PHYS MED","address":"554 Blossom Hill Rd","zipcode":"95123-3212"},{"i":31,"city":"San Jose","name":"DOCTORS ON DUTY MED CLNC","address":"1910 N Capitol Ave","zipcode":"95132-1019"},{"i":32,"city":"San Jose","name":"FIRST HEALTH CLINIC","address":"459 S Capitol Ave 4","zipcode":"95127-3025"},{"i":33,"city":"San Jose","name":"CRESCENT MEDICAL CENTER","address":"2504 Samaritan Dr 20","zipcode":"95124-4005"},{"i":34,"city":"San Jose","name":"US HEALTHWORKS MED GRP PC","address":"1893 Monterey Rd 200","zipcode":"95112-6137"},{"i":35,"city":"San Leandro","name":"CONCENTRA URGENT CARE","address":"2587 Merced St","zipcode":"94577-4207"},{"i":36,"city":"San Leandro","name":"US HEALTHWORKS MED GRP PC","address":"13939 E 14th St 150","zipcode":"94578-2601"},{"i":37,"city":"San Mateo","name":"AFTER HOUR PED URGENT CARE","address":"210 Baldwin Ave","zipcode":"94401-3915"},{"i":38,"city":"San Mateo","name":"MATEO MEDICAL GROUP","address":"60 N El Camino Real","zipcode":"94401-2866"},{"i":39,"city":"San Pablo","name":"CONCENTRA URGENT CARE","address":"2970 Hilltop Mall Rd 203","zipcode":"94806-1949"},{"i":40,"city":"Santa Clara","name":"BEACON URGENT CARE","address":"4949 Stevens Creek Blvd","zipcode":"95051-6661"},{"i":41,"city":"Santa Clara","name":"SANTA CLARA URGENT CARE","address":"1825 Civic Center Dr 7","zipcode":"95050-7302"},{"i":42,"city":"Santa Clara","name":"US HEALTHWORKS MED GRP PC","address":"988 Walsh Ave","zipcode":"95050-2649"},{"i":43,"city":"South San Francisco","name":"US HEALTHWORKS MED GRP PC","address":"192 Beacon St","zipcode":"94080-6913"},{"i":44,"city":"Sunnyvale","name":"US HEALTHWORKS MED GRP PC","address":"1195 E Arques Ave 1","zipcode":"94085-3904"},{"i":45,"city":"Union City","name":"US HEALTHWORKS MED GRP PC","address":"33560 Alvarado Niles Rd","zipcode":"94587-3111"}]



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
    center: new google.maps.LatLng(14.64994, 121.03992),
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP]
    }
};

var positions = [];

var createInfoWindow = function(address) {
    var contentString = '<div id="content">'+
        // '<div id="siteNotice">this is  a test</div>'+
        '<h2 id="firstHeading" class="firstHeading">' + address.name +'</h2>'+
        '<div id="bodyContent">'+
        '<p>'+address.address+', '+address.city+', CA '+address.zipcode+'</p>'+
        '<p>'+address.latitude+','+address.longitude+'</p>'+
        '</div>'+
        '</div>';

    return new google.maps.InfoWindow({
        content: contentString
    })
};

var saveLocation = function(locationObj) {
    /*
    $.ajax({
        type: "POST",
        url: "/geo",
        data: locationObj,
        success: function(){
            console.log("saved:", locationObj);
        },
        dataType: "json"
    });
    */
};

var placeMarkerByAddress = function(addressObj, streetAddress) {
    geocoder.geocode( { 'address': streetAddress }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var isOpen = false;
            var position = results[0].geometry.location;

            addressObj["latitude"] = position.lat();
            addressObj["longitude"] = position.lng();

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

    console.log("present.", map, geocoder);

    var count = addresses.length, i=0;
    var timeoutCycle = new gb.util.TimeOutCycle(1000, function(){
        if (i < count) {
            zoomToFit();
            var streetAddress =
                addresses[i].address +
                ", " +
                addresses[i].city +
                ", CA " +
                addresses[i].zipcode;
            $("#current").text(streetAddress);
            placeMarkerByAddress(addresses[i], streetAddress);
            i++;
        } else {

            console.log(JSON.stringify(addresses));
            console.log("timer stopped.");
            timeoutCycle.stop();
        }
    });
    timeoutCycle.start();
};

var map = null;
var geocoder = null;
google.maps.visualRefresh = true;
google.maps.event.addDomListener(window, 'load', initialize);

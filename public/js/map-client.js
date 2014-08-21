
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

var addresses = [{"i":1,"city":"Alameda","name":"Alameda Centre Physicians","address":"501 South Shore Center West, Suite 103C","zipcode":"94501-5762","phone":"510-769-1118 "},{"i":2,"city":"Berkeley","name":"US HealthWorks Medical Group","address":"2850 7th St, Suite 100","zipcode":"94710-2703","phone":"510-845-5170 "},{"i":3,"city":"Campbell","name":"California Emergency Physicians Medical Group","address":"1580 S Winchester Blvd #202","zipcode":"95008-0519"},{"i":4,"city":"Concord","name":"Park Avenue Walk-In Clinic","address":"1280 Monument Blvd, Suite 1","zipcode":"94520-4405","phone":"925-825-8181 "},{"i":5,"city":"Daly City","name":"Primary Hlth Care Assocs Med","address":"901 Campus Dr, Suite 112","zipcode":"94015-4930","phone":"650-991-1842 "},{"i":6,"city":"Dublin","name":"Amador Valley Medical Center","address":"7667 Amador Valley Blvd","zipcode":"94568-2341","phone":"925-828-9211 "},{"i":7,"city":"Foster City","name":"Mariner Medical Center","address":"1098 Foster City Blvd, Suite 210","zipcode":"94404-2300","phone":"650-570-2299 "},{"i":8,"city":"Fremont","name":"Fremont Urgent Care","address":"3161 Walnut Ave","zipcode":"94538-2216","phone":"510-796-1000 "},{"i":9,"city":"Gilroy","name":"US HealthWorks Medical Group","address":"7793 Wren Ave","zipcode":"95020-4902","phone":"408-848-0444 "},{"i":10,"city":"Livermore","name":"Tri Valley Family Medicine","address":"1133 E Stanley Blvd, Suite 111","zipcode":"94550-4243","phone":"925-443-9000 "},{"i":11,"city":"Los Gatos","name":"After Hours Healthcare","address":"14651 S Bascom Ave, Suite 112","zipcode":"95032-4477","phone":"408-356-9300 "},{"i":12,"city":"Los Gatos","name":"South Bay Children's Medical Group","address":"800 Pollard Rd, Suite B205","zipcode":"95032-1429","phone":"408-370-0110 "},{"i":13,"city":"Milpitas","name":"US HealthWorks Medical Group","address":"1717 S Main St","zipcode":"95035-6756","phone":"408-957-5700 "},{"i":14,"city":"Newark","name":"Doctors Express Newark","address":"5763 Stevenson Blvd","zipcode":"94560-5301","phone":"408-370-0110 "},{"i":15,"city":"Oakland","name":"Children's Hospital Oakland","address":"747 52nd St","zipcode":"94609-1859","phone":"510-428-3000 "},{"i":16,"city":"Oakland","name":"Concentra Urgent Care","address":"384 Embarcadero West","zipcode":"94607-3735","phone":"510-465-9565 "},{"i":17,"city":"Oakland","name":"Healthy Communities, Inc.","address":"2580 San Pablo Ave","zipcode":"94612-1160","phone":"510-444-9655 "},{"i":18,"city":"Oakland","name":"US HealthWorks Medical Group","address":"7817 Oakport St, Suite 140","zipcode":"94621-2035","phone":"510-638-0701 "},{"i":19,"city":"Palo Alto","name":"After Hours Clinic at Lucile Packard Children's Hospital Stanford","address":"725 Welch Rd","zipcode":"94304","phone":"650-725-5236 "},{"i":20,"city":"Palo Alto","name":"Stanford Express Care Clinic","address":"211 Quarry Rd","zipcode":"94304","phone":"650-736-5211 "},{"i":21,"city":"Pleasant Hill","name":"Night Owl Pediatrics","address":"425 Gregory Ln, Suite 203","zipcode":"94523-2813","phone":"925-288-3600 "},{"i":22,"city":"Pleasanton","name":"Express Medicine Urgent Care","address":"5700 Stoneridge Mall, Suite 100","zipcode":"94588-2872","phone":"925-425-9525 "},{"i":23,"city":"Pleasanton","name":"Pleasanton Urgent Care","address":"3128 Santa Rita Rd","zipcode":"94566-8300","phone":"925-462-9300 "},{"i":24,"city":"San Carlos","name":"US HealthWorks Medical Group","address":"125 Shoreway Rd, Suite A","zipcode":"94070","phone":"650-556-9420 "},{"i":25,"city":"San Francisco","name":"Concentra Urgent Care","address":"2 Connecticut St","zipcode":"94107-2451","phone":"415-621-5055 "},{"i":26,"city":"San Francisco","name":"Concentra Urgent Care","address":"26 California St","zipcode":"94111-4803","phone":"415-781-7077 "},{"i":27,"city":"San Francisco","name":"Golden Gate Urgent Care","address":"2395 Lombard St","zipcode":"94123-2601","phone":"415-796-2242 "},{"i":28,"city":"San Francisco","name":"SFO Medical Clinic","address":"International Terminal 3","zipcode":"94128","phone":"650-821-5600 "},{"i":29,"city":"San Jose","name":"Almaden Family Physicians Medical Group","address":"6475 Camden Ave, Suite 105","zipcode":"95120-2847","phone":"408-997-9155"},{"i":30,"city":"San Jose","name":"California Emergency Physicians Medical Group","address":"554 Blossom Hill Rd","zipcode":"95123-3212","phone":"408-227-1622 "},{"i":31,"city":"San Jose","name":"Doctors On Duty Medical Clinic","address":"1910 N Capitol Ave","zipcode":"95132-1019","phone":"408-942-0333 "},{"i":32,"city":"San Jose","name":"First Health Clinic","address":"459 S Capitol Ave, Suite 4","zipcode":"95127-3025","phone":"408-929-5505 "},{"i":33,"city":"San Jose","name":"Crescent Medical Center","address":"2504 Samaritan Dr, Suite 20","zipcode":"95124-4005","phone":"408-356-1111 "},{"i":34,"city":"San Jose","name":"US HealthWorks Medical Group","address":"1893 Monterey Rd, Suite 200","zipcode":"95112-6137","phone":"408-288-3800 "},{"i":35,"city":"San Leandro","name":"Concentra Urgent Care","address":"2587 Merced St","zipcode":"94577-4207","phone":"510-351-3553 "},{"i":36,"city":"San Leandro","name":"US HealthWorks Medical Group","address":"13939 E 14th St, Suite 150","zipcode":"94578-2601","phone":"510-343-8300 "},{"i":37,"city":"San Mateo","name":"After Hour Pediatrics","address":"210 Baldwin Ave","zipcode":"94401-3915","phone":"650-579-6581 "},{"i":38,"city":"San Mateo","name":"Immediate Care","address":"60 N El Camino Real","zipcode":"94401-2866","phone":"650-349-5007"},{"i":39,"city":"San Pablo","name":"Concentra Urgent Care","address":"2970 Hilltop Mall Rd, Suite 203","zipcode":"94806-1949","phone":"510-222-8000 "},{"i":40,"city":"Santa Clara","name":"Beacon Urgent Care","address":"4949 Stevens Creek Blvd","zipcode":"95051-6661","phone":"408-260-2273 "},{"i":41,"city":"Santa Clara","name":"Santa Clara Urgent Care","address":"1825 Civic Center Dr, Suite 7","zipcode":"95050-7302","phone":"408-985-2401 "},{"i":42,"city":"Santa Clara","name":"US HealthWorks Medical Group","address":"988 Walsh Ave","zipcode":"95050-2649","phone":"408-988-6868 "},{"i":43,"city":"South San Francisco","name":"US HealthWorks Medical Group","address":"192 Beacon St","zipcode":"94080-6913","phone":"650-589-6500 "},{"i":44,"city":"Sunnyvale","name":"US HealthWorks Medical Group","address":"1195 E Arques Ave, Suite 1","zipcode":"94085-3904","phone":"408-773-9000 "},{"i":45,"city":"Union City","name":"US HealthWorks Medical Group","address":"33560 Alvarado Niles Rd","zipcode":"94587-3111","phone":"510-489-8700 "}];


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

            addresses[i].state = "CA";

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

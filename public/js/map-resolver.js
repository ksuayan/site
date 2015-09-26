/*
 * Batch Geolocation resolver demo.
 * - Pull address table in JSON format via AJAX call.
 * - georesolve each address with 1second throttling.
 * - send resolved JSON Objects to server.
 * - save via POST AJAX call.
 *
 */

var positions = [],
    map = null,
    geocoder = null,
    throttleInterval = 1000,
    dataSource = "/data/geo-csv.json",
    postURL    = "/api/csv",
    targetFile = "geo-resolved.csv";

var createInfoWindow = function(address) {
    var contentString = '<div id="content">'+
        '<h2 id="firstHeading" class="firstHeading">' + address.name +'</h2>'+
        '<div id="bodyContent">'+
        '<p>'+address.address+', '+
              address.city+', '+
              address.state+', '+
              address.zipcode+'</p>'+
        '<p>'+address.latitude+', '+address.longitude+'</p>'+
        '</div>'+
        '</div>';
    return new google.maps.InfoWindow({
        content: contentString
    });
};

var placeMarkerByAddress = function(addressObj, streetAddress) {

    /**
     * Call Google's georesolver service.
     */
    geocoder.geocode( { 'address': streetAddress }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {

            var position = results[0].geometry.location;
            addressObj.latitude = position.lat();
            addressObj.longitude = position.lng();

            positions.push(new google.maps.LatLng(position.lat(), position.lng()));
            var marker = new google.maps.Marker({ map: map, position: position });
            var infoWindow = createInfoWindow(addressObj);

            google.maps.event.addListener(marker, 'mouseover', function() {
                infoWindow.open(map, marker);
            });
            google.maps.event.addListener(marker, 'mouseout', function() {
                infoWindow.close();
            });

            $("#current").append("<li class='list-group-item'><span class='label label-success'>Resolved</span> "+streetAddress+"</li>");
        } else {
            $("#current").append("<li class='list-group-item'><span class='label label-warning'>Failed</span> "+streetAddress+ " " +status+"</li>");
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

/**
 * geo-csv.json is exported with npm package csvtojson.
 * @param callback
 */
var getMapData = function(callback) {
    $.ajax({
        type: "GET",
        url: dataSource,
        success: function(data){
            console.log("data:", data);
            if (callback && typeof callback === 'function') {
                callback(data);
            }
        },
        dataType: "json"
    });
};

var saveJsonToCsv = function(jsonData) {

    $("#current").append("<li class='list-group-item list-group-item-info'>Saving ...</li>");
    var encoded = {
        filename: targetFile,
        jsonData: jsonData
    };
    $.ajax({
        type: "POST",
        url: postURL,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(encoded),
        success: function(result){
            if (result && result.status === "ok") {
                $("#current").append("<li class='list-group-item list-group-item-success'>Saved "+targetFile+"</li>");
            } else {
                $("#current").append("<li class='list-group-item'>"+result.error+"</li>");
            }
        }
    });
};

var initialize = function() {

    /**
     * JSON addresses from CSV.
     * @param addresses
     */
    var onDataReady = function(addresses) {
        var count = addresses.length,
            i= 0,
            timeoutCycle = new gb.util.TimeOutCycle(throttleInterval, function(){
            if (i < count) {
                zoomToFit();
                var streetAddress = addresses[i].address+", " +
                    addresses[i].city + ", " +
                    addresses[i].state + ", " +
                    addresses[i].zipcode;
                placeMarkerByAddress(addresses[i], streetAddress);
                i++;
            } else {
                $("#current").append("<li class='list-group-item'>Done resolving.</li>");
                timeoutCycle.stop();
                saveJsonToCsv(addresses);
            }
        });
        timeoutCycle.start();
    };

    map = new google.maps.Map(document.getElementById("map-canvas"), gb.ui.MapConfig.mapOptions);
    map.setOptions({styles: gb.ui.MapConfig.mapStyles});
    geocoder = new google.maps.Geocoder();
    // wait for map data
    getMapData(onDataReady);
};

google.maps.visualRefresh = true;
google.maps.event.addDomListener(window, 'load', initialize);

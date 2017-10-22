angular.module('app.services', [])
.factory('Location', function($resource) {
    return $resource('/api/loc/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
})
.factory('MapDocument', function($resource) {
    return $resource('/api/map/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
})
.factory('StateService', function($state){
    return {
        gotoState: function(state, params) {
            $state.go(state, params);
        }
    };
})
.service("MapService", function($http){

    var geocoder = new google.maps.Geocoder(),
        directionsService = new google.maps.DirectionsService(),
        directionsDisplay = new google.maps.DirectionsRenderer(),

    getCenter = function(mapWidget){
        var latlng = mapWidget.map.getCenter();
        return {
            "coordinates" : [
                latlng.lng(),
                latlng.lat()
            ],
            "type" : "Point"
        };
    },

    getLocationsByMap = function(mapId, onSuccess, onError) {
        $http({
            method: 'GET',
            url: '/api/map-locations/'+mapId
        }).then(function successCallback(response) {
            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        }, function errorCallback(response) {
            if (typeof onError === 'function') {
                onError(response);
            }
        });
    },

    /**
     * Query backend for locations near point.
     * @param ctr
     * @param dist
     */
    getLocationsNearPoint = function(ctr, dist, onSuccess, onError) {
        $http({
            method: 'GET',
            url: "/api/loc/near/"+ctr+"/"+dist
        }).then(function successCallback(response) {
            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        }, function errorCallback(response) {
            if (typeof onError === 'function') {
                onError(response);
            }
        });
    },
    /**
     * Query backend for locations within two points.
     * @param swLatLng
     * @param neLatLng
     */
    getLocationsWithin = function(swLatLng, neLatLng, onSuccess, onError) {
        $http({
            method: 'GET',
            url: "/api/loc/within/"+swLatLng+"/"+neLatLng
        }).then(function successCallback(response) {
            if (typeof onSuccess === 'function') {
                onSuccess(response.data);
            }
        }, function errorCallback(response) {
            if (typeof onError === 'function') {
                onError(response);
            }
        });
    },

    /**
     * Retrieve geolocation given a query string.
     * @param that
     * @param queryStr
     */
    geocode = function(queryStr) {
        geocoder.geocode({
            'address': queryStr,
            'bounds': map.getBounds()
        }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                var latLng = results[0].geometry.location;
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
    reverseGeocode = function(latLng, onSuccess, onError) {
        var that = this;
        if (typeof onError !== 'function') {
            onError = function(){};
        }
        if (typeof onSuccess !== 'function') {
            onSuccess = function(){};
        }
        geocoder.geocode({'latLng': latLng}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1] && results[1].formatted_address &&
                    onSuccess && typeof onSuccess === 'function') {
                    onSuccess(results);
                } else {
                    onError("No results found.");
                }
            } else {
                onError('Geocoder failed due to: ' + status);
            }
        });
    },

    getDirections = function(origin, destination, travelMode) {
        if (!travelMode) {
            travelMode = google.maps.TravelMode.WALKING; // or DRIVING or TRANSIT
        }
        var request = {
            origin: origin,
            destination: destination,
            travelMode: travelMode
        };

        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    },

    updateLocationInfo = function(scopeLocation, locationObj) {
        scopeLocation.loc = locationObj.loc;
        scopeLocation.address = locationObj.address;
        scopeLocation.name = locationObj.name;
    };

    return {
        geocode: geocode,
        reverseGeocode: reverseGeocode,
        getCenter: getCenter,
        getLocationsByMap: getLocationsByMap,
        getLocationsNearPoint: getLocationsNearPoint,
        getLocationsWithin: getLocationsWithin,
        getDirections: getDirections,
        updateLocationInfo: updateLocationInfo
    };
});
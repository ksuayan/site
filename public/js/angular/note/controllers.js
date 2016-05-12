angular.module('app.controllers', [])
.controller('LocationViewController', function($scope, $state, $stateParams, StateService, Location) {

    // Issues a GET to /api/loc/:id
    $scope.location = Location.get({ id: $stateParams.id });
    $scope.gotoState = StateService.gotoState;

}).controller('LocationEditController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.updateLocation = function() {
        $scope.location.$update(function() {
            $state.go('home');
        });
    };

    $scope.loadLocation = function() {
        $scope.location = Location.get({ id: $stateParams.id });
    };

    $scope.gotoState = StateService.gotoState;
    $scope.loadLocation($stateParams);

}).controller('LocationAddController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.location = new Location();

    $scope.createLocation = function() {
        $scope.location.$save(function() {
            $state.go('home');
        });
    };

    $scope.updateLocationInfo = function(locationObj) {
        $scope.location.loc = locationObj.loc;
        $scope.location.address = locationObj.address;
        $scope.location.name = locationObj.name;
    };
    $scope.gotoState = StateService.gotoState;


}).controller('HomeController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.locations = Location.query();
    $scope.gotoState = StateService.gotoState;

}).controller('LocationListController', function($scope, $state, $stateParams, StateService, Location) {

    $scope.locations = Location.query(); //fetch all locations. Issues a GET to /api/movies
    $scope.gotoState = StateService.gotoState;

}).controller('MapListController', function($scope, $state, $stateParams, StateService, MapDocument) {

    $scope.maps = MapDocument.query();
    $scope.gotoState = StateService.gotoState;

}).controller('MapAddController', function($scope, $state, $stateParams, StateService, MapDocument) {

    $scope.map = new MapDocument();

    google.maps.visualRefresh = true;
    var mapWidget = new gb.ui.MapWidget(window, "map-widget");

    $scope.createMap = function() {
        $scope.map.$save(function() {
            $state.go('maps');
        });
    };

    $scope.updateMapSetting = function(zoom, lat, lng) {
        $scope.map.zoom = zoom;
        $scope.map.center = {
            type: 'Point',
            coordinates: [lng, lat]
        };
    };

    $scope.updateMapInfo = function(mapObj) {
        $scope.map.name = mapObj.name;
        $scope.map.description = mapObj.description;
        $scope.map.center = mapObj.center;
        $scope.map.zoom = mapObj.zoom;
    };

    $scope.gotoState = StateService.gotoState;

}).controller('MapEditController', function($scope, $state, $stateParams, StateService, MapDocument) {

    $scope.map = MapDocument.get({ id: $stateParams.id });
    $scope.updateMap = function() {
        $scope.map.$update(function() {
            $state.go('maps');
        });
    };

    $scope.loadMap = function(param) {
        $scope.map = MapDocument.get({ id: param.id }, function(mapObj){
            google.maps.visualRefresh = true;
            var mapWidget = new gb.ui.MapWidget(window, "map-widget", mapObj);
        });
    };

    $scope.updateMapSetting = function(zoom, lat, lng) {
       $scope.map.zoom = zoom;
       $scope.map.center = {
           type: 'Point',
           coordinates: [lng, lat]
       };
    };

    $scope.gotoState = StateService.gotoState;
    $scope.loadMap($stateParams);
});



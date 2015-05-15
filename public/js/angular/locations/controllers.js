angular.module('app.controllers', [])
.controller('LocationViewController', function($scope, $state, $stateParams, Location) {

    // Issues a GET to /api/loc/:id
    $scope.location = Location.get({ id: $stateParams.id });

    $scope.gotoState = function(state, params) {
        $state.go(state, params);
    };

}).controller('LocationEditController', function($scope, $state, $stateParams, Location) {

    $scope.updateLocation = function() {
        $scope.location.$update(function() {
            $state.go('home');
        });
    };

    $scope.loadLocation = function() {
        $scope.location = Location.get({ id: $stateParams.id });
    };

    $scope.gotoState = function(state, params) {
        $state.go(state, params, {reload:true});
    };

    $scope.loadLocation($stateParams);

}).controller('LocationAddController', function($scope, $state, $stateParams, Location) {

    $scope.location = new Location();

    $scope.createLocation = function() {
        $scope.location.$save(function() {
            $state.go('home');
        });
    };

    $scope.updateLocationInfo = function(locationObj) {
        $scope.location.loc = locationObj.loc;
        $scope.location.address = locationObj.address;
    };

    $scope.gotoState = function(state, params) {
        $state.go(state, params);
    };

}).controller('HomeController', function($scope, $state, $stateParams, Location) {
    $scope.gotoState = function(state, params) {
        $state.go(state, params);
    };
});
angular.module('app.controllers', [])
.controller('LocationViewController', function($scope, $state, $stateParams, Location) {

    // Issues a GET to /api/loc/:id
    console.log("view", $stateParams);
    $scope.location = Location.get({ id: $stateParams.id });

    $scope.gotoState = function(state, params) {
        $state.go(state, params);
    };

}).controller('LocationEditController', function($scope, $state, $stateParams, Location) {

    $scope.updateLocation = function() {
        $scope.location.$update(function() {
            console.log("updateLocation", $scope.location);
            Location.update({ id:$scope.location._id }, $scope.location);
            $state.go('home');
        });
    };

    $scope.loadLocation = function() {
        console.log("loadLocation", $stateParams);
        $scope.location = Location.get({ id: $stateParams.id });
    };

    /*
    $scope.loadLocationById = function(id) {
        $scope.location = Location.get({ id: id });
        console.log("loadLocationById", $scope.location);
    };
    */

    $scope.gotoState = function(state, params) {
        console.log("-------");
        console.log("gotoState>>", state, params);
        $state.go(state, params, {reload:true});
    };

    $scope.loadLocation($stateParams);


}).controller('HomeController', function($scope, $state, $stateParams, Location) {
    $scope.gotoState = function(state, params) {
        $state.go(state, params);
    };
});
'use strict';

var trackServices = angular.module('trackServices', ['ngResource']);

trackServices.factory('Track', ['$resource',
    function($resource){
        return $resource('/search/:term', {term:'@term'},
        {
            query: {
                method:'GET',
                isArray: false
            }
        });
    }]);

var mainApp = angular.module('MainApp',['ngRoute','trackControllers','trackServices']);

mainApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/home', {
                templateUrl: '/jade/ng/tracklist',
                controller: 'TrackListController'
            }).
            when('/home/:term', {
                templateUrl: '/jade/ng/trackdetails',
                controller: 'TrackListController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

var trackControllers = angular.module('trackControllers',[]);

trackControllers.controller('TrackListController', ['$scope', 'Track',
function($scope, Track){

    // sort by Name
    $scope.orderProp = 'Name';
    // show 10 at a time
    $scope.count = 10;

    var onDataReady = function(data) {
        if (data.status === "ok") {
            $scope.list = data.result;
        } else {
            $scope.list = [];
        }
    };
    $scope.handleKeypress = function(evt) {
        if ($scope.query.length>3) {
            Track.query({term: $scope.query}, onDataReady);
        } else {
            $scope.list = [];
        }
    };
}]);

trackControllers.controller('TrackDetailsController', ['$scope', '$routeParams', 'Track',
function($scope, $routeParams, Track){

    $scope.list = Track.get({term: $routeParams.term}, function(track) {
        return track.result;
    });

    $scope.setGenre = function(genre) {
        $scope.genre = genre;
    };
}]);
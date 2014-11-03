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
                templateUrl: 'templates/tracklist.html',
                controller: 'TrackListController'
            }).
            when('/home/:term', {
                templateUrl: 'templates/trackdetails.html',
                controller: 'TrackListController'
            }).
            otherwise({
                redirectTo: '/home'
            });
    }]);

var trackControllers = angular.module('trackControllers',[]);

trackControllers.controller('TrackListController', ['$scope', 'Track',
function($scope, Track){

    $scope.orderProp = 'Name';
    $scope.count = 10;

    var onDataReady = function(data) {
        console.log("list", data);
        if (data.status === "ok") {
            $scope.list = data.result;
        } else {
            $scope.list = [];
        }
    };

    $scope.handleKeypress = function(evt) {
        console.log("key", evt);
        if ($scope.query.length>3) {
            Track.query({term: $scope.query}, onDataReady);
        }
    };

}]);

trackControllers.controller('TrackDetailsController', ['$scope', '$routeParams', 'Track',
function($scope, $routeParams, Track){

    $scope.list = Track.get({term: $routeParams.term}, function(track) {
        console.log("track", track);
        return track.result;
    });

    $scope.setGenre = function(genre) {
        $scope.genre = genre;
    };
}]);
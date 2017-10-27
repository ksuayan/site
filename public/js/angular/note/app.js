var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngSanitize',
    'ngResource',
    'textAngular',
    'app.controllers',
    'app.services'
]);

angular.module('app').config(["$stateProvider", "$sceProvider",
    function($stateProvider, $sceProvider) {
        $stateProvider.state('locations', {
            url: '/locations',
            templateUrl: '/jade/maps/locations',
            controller: 'LocationListController'
        })
        .state('addLocation', {
            url: '/addLocation',
            templateUrl: '/jade/maps/add-location',
            controller: 'LocationAddController'
        })
        .state('editLocation', {
            url: '/editLocation/:id',
            templateUrl: '/jade/maps/edit-location',
            controller: 'LocationEditController'
        })
        .state('maps', {
            url: '/maps',
            templateUrl: '/jade/maps/maps',
            controller: 'MapListController'
        })
        .state('addMap', {
            url: '/addMap',
            templateUrl: '/jade/maps/add-map',
            controller: 'MapAddController'
        })
        .state('editMap', {
            url: '/editMap/:id',
            templateUrl: '/jade/maps/edit-map',
            controller: 'MapEditController'
        });

    }
    ]).run(function($state) {
        $state.go('maps');
    });

app.filter('trusted', function($sce) { return $sce.trustAsHtml; });
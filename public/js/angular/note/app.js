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
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/jade/maps/home',
            controller: 'HomeController'
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
        })
        .state('editMapLocation', {
            url: '/editMapLocation/:id',
            templateUrl: '/jade/maps/edit-map-location',
            controller: 'EditMapLocationModalController'
        });

    }
    ]).run(function($state) {
        $state.go('maps');
    });

app.filter('trusted', function($sce) { return $sce.trustAsHtml; });
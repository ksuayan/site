var app = angular.module('app', ['ui.router', 'ngSanitize', 'ngResource', 'app.controllers', 'app.services']);

angular.module('app').config(["$stateProvider", "$sceProvider",
    function($stateProvider, $sceProvider) {

        $stateProvider.state('listLocations', {

            url: '/list',
            templateUrl: '/templates/locations/list.html',
            controller: 'LocationListController'

        }).state('viewLocation', {

            url: '/view/:id',
            templateUrl: '/templates/locations/view.html',
            controller: 'LocationViewController'

        }).state('editLocation', {

            url: '/edit/:id',
            templateUrl: '/templates/locations/edit.html',
            controller: 'LocationEditController'

        }).state('addLocation', {

            url: '/add',
            templateUrl: '/templates/locations/add.html',
            controller: 'LocationAddController'

        }).state('error', {

            url: '/error',
            templateUrl: '/templates/locations/error.html',
            controller: 'LocationAddController'

        }).state('home', {

            url: '/home',
            templateUrl: '/templates/locations/home.html',
            controller: 'HomeController'

        });

    }
    ]).run(function($state) {
        $state.go('listLocations');
    });

app.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        scope: true,
        link: function ($scope, elm, attr, ngModel) {
            if (!ngModel) return;

            function updateModel() {
                $scope.$apply(function() {
                    if ( ck.getData().length ) {
                        ngModel.$setViewValue(ck.getData());
                    }
                });
            }

            var ck = CKEDITOR.replace(elm[0]);
            ck.on('instanceReady', function() {
                ck.setData(ngModel.$viewValue);
            });
            ck.on('pasteState', updateModel);
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function() {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}]);

app.filter('trusted', function($sce) { return $sce.trustAsHtml; });
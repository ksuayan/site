var app = angular.module('app', ['ui.router', 'ngSanitize', 'ngResource', 'app.controllers', 'app.services']);

angular.module('app').config(["$stateProvider", "$sceProvider",
    function($stateProvider, $sceProvider) {
        $stateProvider.state('home', {
            url: '/home',
            templateUrl: '/templates/note/home.html',
            controller: 'HomeController'
        })
        .state('maps', {
            url: '/maps',
            templateUrl: '/templates/note/maps.html',
            controller: 'MapListController'
        })
        .state('addMap', {
            url: '/addMap',
            templateUrl: '/templates/note/add-map.html',
            controller: 'MapAddController'
        })
        .state('editMap', {
            url: '/editMap/:id',
            templateUrl: '/templates/note/edit-map.html',
            controller: 'MapEditController'
        });
    }
    ]).run(function($state) {
        $state.go('home');
    });

app.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        scope: true,
        link: function ($scope, elm, attr, ngModel) {
            if (!ngModel) {
                return;
            }
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
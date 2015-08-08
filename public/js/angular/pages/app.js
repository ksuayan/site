var site = angular.module('site',
    ['ui.router', 'ui.bootstrap', 'ngSanitize', 'ngResource', 'site.controllers', 'site.services']);

angular.module('site').config(["$stateProvider", "$sceProvider", "$logProvider",
    function($stateProvider, $sceProvider, $logProvider) {

    $stateProvider
    .state('addPage', {
        url: '/add',
        templateUrl: '/templates/pages/page-add.html',
        controller: 'PageCreateController'
    })
    .state('viewPage', {
        url: '/view/:id',
        templateUrl: '/templates/pages/page-view.html',
        controller: 'PageViewController'
    })
    .state('editPage', {
        url: '/edit/:id',
        templateUrl: '/templates/pages/page-edit.html',
        controller: 'PageEditController'
    })
    .state('listPages', {
        url: '/list',
        templateUrl: '/templates/pages/pages.html',
        controller: 'PageListController'
    });

}]).run(function($state) {
    $state.go('listPages');
});

site.directive('ckEditor', [function () {
    return {
        require: '?ngModel',
        link: function ($scope, elm, attr, ngModel) {

            var ck = CKEDITOR.replace(elm[0]);

            ck.on('pasteState', function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };
        }
    };
}]);

site.filter('trusted', function($sce) { return $sce.trustAsHtml; });
var site = angular.module('site',
    ['ui.router',
     'ui.bootstrap',
     'ngSanitize',
     'ngResource',
     'textAngular',
     'site.controllers',
     'site.services']);

angular.module('site').config(["$stateProvider", "$sceProvider", "$logProvider",
    function($stateProvider, $sceProvider, $logProvider) {

    $stateProvider
    .state('addPage', {
        url: '/addPage',
        templateUrl: '/jade/pages/add-page',
        controller: 'PageCreateController'
    })
    .state('viewPage', {
        url: '/viewPage/:id',
        templateUrl: '/jade/pages/page-view',
        controller: 'PageViewController'
    })
    .state('editPage', {
        url: '/editPage/:id',
        templateUrl: '/jade/pages/edit-page',
        controller: 'PageEditController'
    })
    .state('listPages', {
        url: '/listPages',
        templateUrl: '/jade/pages/list-pages',
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

            var onChangeHandler = function () {
                $scope.$apply(function () {
                    ngModel.$setViewValue(ck.getData());
                });
            };

            ck.on('pasteState', onChangeHandler);
            ck.on('change', onChangeHandler);
            ck.on('blur', onChangeHandler);
            ck.on('dataReady', onChangeHandler);

            ngModel.$render = function (value) {
                ck.setData(ngModel.$modelValue);
            };

            $scope.$on("$destroy",function() {
                ck.destroy();
            });

        }
    };
}]);

site.filter('trusted', function($sce) { return $sce.trustAsHtml; });

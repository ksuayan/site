angular.module('site.controllers', [])
.controller('PageListController', ["$log", "$scope", "$state", "$window", "Page",

   function($log, $scope, $state, $window, Page) {
       // $log.debug("test...");
       $scope.pages = Page.query();
   }

]
).controller('PageCreateController',

   function($scope, $state, $stateParams, Page) {
        $scope.page = new Page();

        $scope.addPage = function() {
            $scope.page.$save(function() {
                $state.go('listPages');
            });
        };
   }

).controller('PageViewController', ["$log", "$scope", "$state", "$stateParams", "$modal", "Page",

    function($log, $scope, $state, $stateParams, $modal, Page) {
        $scope.page = Page.get({ id: $stateParams.id });
        $scope.editPage = function() {
            $state.go('editPage');
        };
    }

]
).controller('PageEditController', ["$log", "$scope", "$state", "$stateParams", "$modal", "Page",
    function($log, $scope, $state, $stateParams, $modal, Page) {

    $scope.page = Page.get({ id: $stateParams.id });

    $scope.updatePage = function() {
        // Issue a PUT to /api/pages/:id
        $scope.page.$update(function() {
            $state.go('listPages');
        });
    };

    $scope.deletePage = function(pageObj){
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/pages/delete-page',
            controller: 'DeleteModalController',
            resolve: {
                page: function (){
                    $scope.page = pageObj;
                    return $scope.page;
                }
            }
        });
        modalInstance.result.then(function (page) {
            $scope.page = page;
            $scope.page.$delete(function() {
                $state.go('listPages');
            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addComponent = function(pageObj){
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/pages/add-component',
            controller: 'AddComponentController',
            size: "md",
            resolve: {
                page: function (){
                    $scope.page = pageObj;
                    return $scope.page;
                }
            }
        });
        modalInstance.result.then(function (page) {
            $scope.page = page;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addRichText = function(pageObj){
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/pages/add-rich-text',
            controller: 'AddRichTextController',
            resolve: {
                page: function (){
                    $scope.page = pageObj;
                    return $scope.page;
                }
            }
        });
        modalInstance.result.then(function (page) {
            $scope.page = page;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.loadPage = function() {
        // Issue a GET request to /api/page/:id
        $scope.page = Page.get({ id: $stateParams.id });
    };

    $scope.loadPage();

}]
).controller('DeleteModalController', function ($scope, $modalInstance, page) {

    $scope.page = page;

    $scope.ok = function () {
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}
).controller('AddComponentController', function ($log, $scope, $modalInstance, page) {


    $log.log("Passed in ", page);
    $scope.page = page;
    $scope.component = {};

    $scope.ok = function ($event) {
        var fieldType = $("input[name=component_type]").attr("type");
        if (fieldType==="radio") {
            $scope.component.type = $("input[name=component_type]:checked").val();
        } else {
            $scope.component.type = $("input[name=component_type]").val();
        }
        $scope.page.content.push($scope.component);
        $log.log("Adding:", $scope.component);
        $scope.page.$update();
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.subform = "";

    $scope.toggleDropdown = function(item) {
        $log.log("Dropdown toggled...", item);
        $scope.component = {};
        $scope.subform = item;
        $scope.status.isopen = !$scope.status.isopen;
    };


}

).controller('AddRichTextController', function ($scope, $modalInstance, page) {

        $scope.page = page;

        $scope.ok = function ($event) {
            $scope.page.content.push({
                "type": "rich_text",
                "content": $scope.rich_text
            });
            $scope.page.$update();
            $modalInstance.close($scope.page);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }

).controller('ChooseComponentController', function ($scope, $log, page) {

    $scope.page = page;

    $scope.items = [
        'The first choice!',
        'And another choice for you.',
        'but wait! A third!'
    ];

    $scope.status = {
        isopen: false
    };

    $scope.toggled = function(open) {
        $log.log('Dropdown is now: ', open);
    };

    $scope.toggleDropdown = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
});

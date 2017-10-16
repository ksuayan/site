angular.module('site.controllers', [])
.controller('PageListController', ["$log", "$scope", "$state", "$window", "Page",

   function($log, $scope, $state, $window, Page) {
       $scope.pages = Page.query();
   }

]).controller('PageCreateController',

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

]).controller('PageEditController',
    ["$log", "$scope", "$rootScope", "$state", "$stateParams", "$modal", "formEditorService", "Page",
    function($log, $scope, $rootScope, $state, $stateParams, $modal, formEditorService, Page) {

    $scope.page = Page.get({ id: $stateParams.id });

    $scope.updatePage = function() {
        // Issue a PUT to /api/pages/:id
        $scope.page.$update(function() {
            $state.go('listPages');
        });
    };

    $scope.updateStatus = function($event) {
        // $log.info("yo...", $scope.page.status);
        $scope.page.$update();
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

    $scope.editExcerpt = function(pageObj) {
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/pages/edit-excerpt',
            controller: 'EditExcerptController',
            size: "lg",
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
            $log.info('Excerpt:'+$scope.page.excerpt);
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.addComponent = function(pageObj){
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/pages/edit-component',
            controller: 'AddComponentController',
            size: "lg",
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

    $scope.editComponent = function(pageObj, index) {
        $rootScope.page = pageObj;
        $rootScope.index = index;
        var modalInstance = $modal.open({
            templateUrl: '/jade/pages/edit-component',
            controller: 'EditComponentController',
            size: "lg",
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

    $scope.deleteComponent = function($event, idx) {
        $event.stopPropagation();
        $scope.page.content.splice(idx,1);
        $scope.page.$update();
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

}]).controller('DeleteModalController', function ($scope, $modalInstance, page) {

    $scope.page = page;

    $scope.ok = function () {
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}).controller('AddComponentController', function ($log, $scope, $modalInstance, page, formEditorService) {

    $scope.page = page;
    $scope.component = {};
    $scope.menuItems = formEditorService.getEditors();
    $scope.subform = "/jade/pages/edit-component-default";

    $scope.ok = function ($event) {
        $scope.page.content.push($scope.component);
        $scope.page.$update();
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.status = {
        isopen: false
    };

    $scope.toggleDropdown = function(item) {
        $scope.component = {};
        $scope.component.type = item.type;
        $scope.subform = item.form;
        $scope.componentName = item.name;
        $scope.status.isopen = !$scope.status.isopen;

        $log.info("item:",item);
        $log.info("scope:",$scope.component);
    };

}).controller('EditComponentController',
    ["$log", "$scope", "$rootScope", "$modalInstance", "formEditorService",

    function ($log, $scope, $rootScope, $modalInstance, formEditorService) {

    // Pass the page and page.content[] index:
    $log.log("Page, Index:", $rootScope.page, $rootScope.index);

    $scope.page = $rootScope.page;
    $scope.component = $rootScope.page.content[$rootScope.index];

    var type = $scope.component.type;
    $scope.subform = formEditorService.getEditor(type).form;
    $scope.componentName = formEditorService.getEditor(type).name;
    $scope.menuItems = formEditorService.getEditors();

    $log.log("Page: ", $scope.page);
    $log.log("Component: ", $scope.component);

    // This is the actual update handler
    // for the targeted component.
    $scope.ok = function ($event) {
        $log.log("Updating:", $scope.component);
        $scope.page.content[$rootScope.index] = $scope.component;
        $scope.page.$update();
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.status = {
        isopen: false
    };

    // Should we allow type switching?
    $scope.toggleDropdown = function(item) {
        $log.log("Dropdown toggled...", item);
        $scope.component = {};
        $scope.subform = item.form;
        $scope.componentName = item.name;
        $scope.status.isopen = !$scope.status.isopen;
    };

}]).controller('EditExcerptController', function ($log, $scope, $modalInstance, page) {

    $scope.page = page;
    $scope.ok = function ($event) {
        $log.log("Editing Page Excerpt", $scope.page);
        $scope.page.$update();
        $modalInstance.close($scope.page);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}).controller('AddRichTextController', function ($scope, $modalInstance, $log, page, formEditorService) {

    $scope.page = page;
    $scope.subform = formEditorService.getEditor("rich_text").form;
    $scope.component = {
        type: "rich_text"
    };

    $scope.ok = function ($event) {
        $log.log("Adding Rich Text", $scope.component);
        $scope.page.content.push($scope.component);
        $scope.page.$update();
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

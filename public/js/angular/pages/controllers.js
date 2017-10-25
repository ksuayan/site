


angular.module('site.controllers', [])
.controller('PageListController',

   ["$log", "$scope", "$state", "$window", "Page",
   function($log, $scope, $state, $window, Page) {
       $scope.pages = Page.query();
   }

]).controller('PageCreateController',


   function($log, $scope, $state, $stateParams, formEditorService, Page) {
        $scope.page = new Page();
        $scope.layoutOptions = formEditorService.getLayouts();
        $scope.status = {isopen: false};

        $scope.toggleLayoutDropdown = function(item) {
           $scope.page.layout = item.type;
           $scope.layoutName = item.name;
           $scope.status.isopen = !$scope.status.isopen;
           $scope.page.$update();
        };

        $scope.addPage = function() {
            $scope.page.$save(function(obj) {
                $state.go('editPage', {id:obj._id});
            });
        };
   }

).controller('PageViewController',

    ["$log", "$scope", "$state", "$stateParams", "$modal", "Page",
    function($log, $scope, $state, $stateParams, $modal, Page) {
        $scope.page = Page.get({ id: $stateParams.id });
        $scope.editPage = function() {
            $state.go('editPage');
        };
    }

]).controller('PageEditController',

    ["$log", "$scope", "$rootScope", "$state", "$stateParams", "$modal", "formEditorService", "Page",
    function($log, $scope, $rootScope, $state, $stateParams, $modal, formEditorService, Page) {

    $scope.layoutOptions = formEditorService.getLayouts();
    $scope.status = {isopen: false};

    $scope.getComponentName = function(key) {
        return formEditorService.getEditor(key).name;
    };

    $scope.updatePage = function() {
        // Issue a PUT to /api/pages/:id
        $scope.page.$update(function() {
            $state.go('listPages');
        });
    };

    $scope.updateStatus = function($event) {
        $scope.page.$update();
    };

    $scope.toggleLayoutDropdown = function(item) {
        $scope.page.layout = item.type;
        $scope.layoutName = item.name;
        $scope.status.isopen = !$scope.status.isopen;
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
        });
    };

    $scope.addComponent = function(pageObj, index){
        $rootScope.page = pageObj;
        $rootScope.index = index;
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
        });
    };

    $scope.deleteComponent = function($event, idx) {
        $event.stopPropagation();
        $scope.page.content.splice(idx,1);
        $scope.page.$update();
    };

    $scope.addRichText = function(pageObj, index){
        $rootScope.page = pageObj;
        $rootScope.index = index;
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: '/jade/pages/add-rich-text',
            controller: 'AddRichTextController',
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

    $scope.loadPage = function() {
        // Issue a GET request to /api/page/:id
        $scope.page = Page.get({ id: $stateParams.id }, function(page){
            $scope.layoutName = formEditorService.getLayout(page.layout).name;
        });
    };

    $scope.loadPage();

}]).controller('DeleteModalController',

    function ($scope, $modalInstance, page) {
    $scope.page = page;
    $scope.ok = function () {
        $modalInstance.close($scope.page);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}).controller('AddComponentController',

    function ($log, $scope, $rootScope, $modalInstance, page, formEditorService) {

    $scope.page = page;
    $scope.component = {};
    $scope.menuItems = formEditorService.getEditors();
    $scope.subform = "/jade/pages/edit-component-default";

    $scope.ok = function ($event) {
        formEditorService.insertComponent($scope.page, "content", $rootScope.index, $scope.component);
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
    };

}).controller('EditComponentController',

    ["$log", "$scope", "$rootScope", "$modalInstance", "formEditorService",
    function ($log, $scope, $rootScope, $modalInstance, formEditorService) {

    $scope.page = $rootScope.page;
    $scope.component = $rootScope.page.content[$rootScope.index];

    var type = $scope.component.type;
    $scope.subform = formEditorService.getEditor(type).form;
    $scope.componentName = formEditorService.getEditor(type).name;
    $scope.menuItems = formEditorService.getEditors();

    // This is the actual update handler
    // for the targeted component.
    $scope.ok = function ($event) {
        formEditorService.updateComponent($scope.page,"content",$rootScope.index,$scope.component);
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
        $scope.component = {};
        $scope.subform = item.form;
        $scope.componentName = item.name;
        $scope.status.isopen = !$scope.status.isopen;
    };

}]).controller('EditExcerptController',

    function ($log, $scope, $modalInstance, page) {

    $scope.page = page;
    $scope.ok = function ($event) {
        $scope.page.$update();
        $modalInstance.close($scope.page);
    };
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

}).controller('AddRichTextController',

    function ($scope, $rootScope, $modalInstance, $log, page, formEditorService) {

    $scope.page = page;
    $scope.subform = formEditorService.getEditor("rich_text").form;
    $scope.component = { type: "rich_text" };

    $scope.ok = function ($event) {
        formEditorService.insertComponent($scope.page, "content", $rootScope.index, $scope.component);
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

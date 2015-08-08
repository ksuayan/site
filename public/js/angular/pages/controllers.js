angular.module('site.controllers', [])
.controller('PageListController', ["$log", "$scope", "$state", "$window", "Page",

   function($log, $scope, $state, $window, Page) {
       $log.debug("test...");
       $scope.pages = Page.query();

}]).controller('PageCreateController', function($scope, $state, $stateParams, Page) {

    $scope.page = new Page();

    $scope.addPage = function() {
        $scope.page.$save(function() {
            $state.go('listPages');
        });
    };

}).controller('PageViewController', ["$log", "$scope", "$state", "$stateParams", "$modal", "Page",
    function($log, $scope, $state, $stateParams, $modal, Page) {



        $scope.page = Page.get({ id: $stateParams.id });

        $scope.editPage = function() {
            $state.go('editPage');
        };

        $scope.deletePage = function(pageObj){
            var modalInstance = $modal.open({
                animation: false,
                templateUrl: 'deleteModal.html',
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


}]).controller('PageEditController', function($scope, $state, $stateParams, Page) {

    $scope.page = Page.get({ id: $stateParams.id });

    $scope.updatePage = function() {
        // Update the edited profile.
        // Issue a PUT to /api/profile/:id
        $scope.page.$update(function() {
            $state.go('listPages'); // on success go back to home i.e. movies state.
        });
    };

    /*
    $scope.addIndustry = function($event) {
        $event.stopPropagation();
        $scope.user.profile.industries.push($("#industry").val());
        $("#industry").val("");
    };

    $scope.deleteIndustry = function($event, idx) {
        $event.stopPropagation();
        $scope.user.profile.industries.splice(idx,1);
    };

    $scope.addDegree = function($event) {
        $event.stopPropagation();
        var degreeName = $("#degreeName").val(),
            degreeField = $("#degreeField").val(),
            degreeSchool = $("#degreeSchool").val(),
            degreeYear = $("#degreeYear").val();
        if (degreeName && degreeField) {
            var degree = {
                degree: degreeName,
                field: degreeField,
                school: degreeSchool,
                year: degreeYear
            };
            $scope.user.profile.degrees.push(degree);
        }
        $("#degreeName").val("");
        $("#degreeField").val("");
        $("#degreeSchool").val("");
        $("#degreeYear").val("");
    };

    $scope.deleteDegree = function($event, idx) {
        $event.stopPropagation();
        $scope.user.profile.degrees.splice(idx,1);
    };
    */

    $scope.loadPage = function() {
        // Issue a GET request to /api/profile/:id
        // to get a profile to update
        $scope.page = Page.get({ id: $stateParams.id });
    };

    $scope.loadPage();

}).controller('DeleteModalController', function ($scope, $modalInstance, page) {

    $scope.page = page;

    $scope.ok = function () {
        $modalInstance.close($scope.page);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
angular.module('app.services', [])
.factory('Location', function($resource) {
    return $resource('/api/loc/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
})
.factory('StateService', function($state){
    return {
        gotoState: function(state, params) {
            $state.go(state, params);
        }
    }
});
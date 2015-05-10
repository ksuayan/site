angular.module('app.services', []).factory('Location', function($resource) {
    return $resource('/api/loc/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
});
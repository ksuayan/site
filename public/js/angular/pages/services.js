angular.module('site.services', []).factory('Page', function($resource) {
    return $resource('/api/page/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
});
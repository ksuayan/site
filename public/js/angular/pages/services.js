angular.module('site.services', [])
.factory('Page', function($resource) {
    return $resource('/api/page/:id', { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
    });
})
.service("formEditorService", function(){
    var editors = [
        {
            type: "rich_text",
            name: "Rich Text",
            form: "/jade/pages/form-rich-text"
        },
        {
            type: "alert",
            name: "Alert",
            form: "/jade/pages/form-alert"
        },
        {
            type: "image",
            name: "Image",
            form: "/jade/pages/form-image"
        },
        {
            type: "youtube_video",
            name: "Youtube Video",
            form: "/jade/pages/form-youtube"
        }
    ],
    getEditors = function() {
        return editors;
    },
    getEditor = function(key) {
        if (!key) return null;
        for (var i=0,n=editors.length; i<n; i++) {
            if (editors[i].type===key) {
                return  editors[i];
            }
        }
        return null;
    },
    getKeys = function() {
        var keys=[];
        for (var i=0,n=editors.length; i<n; i++) {
            keys.push(editors[i].type);
        }
        return keys;
    };
    return {
        getEditors: getEditors,
        getEditor: getEditor,
        getKeys: getKeys
    };
});
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
            type: "image",
            name: "Image",
            form: "/jade/pages/form-image"
        },
        {
            type: "youtube_video",
            name: "Youtube Video",
            form: "/jade/pages/form-youtube"
        },
        {
            type: "vimeo_video",
            name: "Vimeo Video",
            form: "/jade/pages/form-vimeo"
        },
        {
            type: "audio_player",
            name: "Audio Player",
            form: "/jade/pages/form-audio"
        },
        {
            type: "alert",
            name: "Alert",
            form: "/jade/pages/form-alert"
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
    },
    /**
     * Insert a component under a page's container at index location.
     *
     * @param page
     * @param container
     * @param index
     * @param component
     */
    insertComponent = function(page, container, index, component) {
        if (page && page[container] && page[container].length) {
            page[container].splice(index+1, 0, component);
        } else {
            page[container] = [component];
        }
        page.$update();
    },
    updateComponent = function(page, container, index, component){
        if (page && page[container] && page[container][index]) {
            page[container][index] = component;
            page.$update();
        } else {
            throw("invalidUpdate:"+container+":"+index);
        }
    };
    return {
        getEditors: getEditors,
        getEditor: getEditor,
        getKeys: getKeys,
        insertComponent: insertComponent,
        updateComponent: updateComponent
    };
});
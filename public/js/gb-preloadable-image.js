gb.Namespace(gb, "gb.ui.PreloadableImage");
gb.ui.PreloadableImage = new gb.Class();


/**
 * @fileOverview A preloadable image.
 * @author Kyo Suayan
 * @module gb.ui.PreloadableImage
 *
 * @example
 * var pImage = new gb.ui.PreloadableImage("#id", "image.jpg", onSuccess, onError);
 *
 */
gb.ui.PreloadableImage.include({

    /**
     * @param id {string} selector
     * @param source {string} image source
     * @param onSuccess {Function} callback
     * @param onError {Function} callback
     * @instance
     */
    init: function(id, source, onSuccess, onError) {
        "use strict";
        this.id = id;
        this.startTime = new Date().valueOf();
        this.endTime = this.startTime;
        this.image = new Image();
        this.setSource(source);
        this.setOnLoad(onSuccess);
        this.setOnError(onError);
    },

    /**
     * Set the image src attribute.
     * @param source {string}
     * @instance
     */
    setSource: function(source) {
        if (!source) {
            this.image.src = "";
            return;
        }
        this.image.src = source;
    },

    /**
     * Set the onSuccess callback.
     * @param onSuccess {Function}
     * @instance
     */
    setOnLoad: function(onSuccess) {
        var that = this;
        if (!onSuccess || typeof onSuccess != 'function') {
            // default onload handler ..
            this.image.onload = function(){
                that.endTime = new Date().valueOf();
            };
            return;
        }
        var onSuccessWrapper = function(e) {
            that.endTime = new Date().valueOf();
            onSuccess(e);
        };
        this.image.onload = onSuccessWrapper;
    },

    /**
     * Set the onError callback.
     * @param onError {Function}
     * @instance
     */
    setOnError: function(onError) {
        var that = this;
        if (!onError || typeof onError != 'function') {
            this.image.onerror = function(){
                that.endTime = new Date().valueOf();
            };
            return;
        }
        this.endTime = new Date().valueOf();
        this.image.onerror = onError;

    },

    /**
     * Return elapse time from request to completion.
     * @returns {number}
     * @instance
     */
    getTotalTimeMS: function() {
        return (this.endTime - this.startTime);
    }

});


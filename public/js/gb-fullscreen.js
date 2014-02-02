gb.Namespace(gb,"gb.ui.FullScreen");
gb.ui.FullScreen = new gb.Class();

/**
 * @fileOverview A rotating slideshow running on a page's background.
 * Requires jquery.fullscreen.js
 *
 * @author Kyo Suayan
 * @module gb.ui.FullScreen
 * @requires gb.util
 *
 * @example
 * var fs = new gb.ui.Fullscreen();
 */
gb.ui.FullScreen.include({

    /**
     * @instance
     */
    init: function() {
        "use strict";
        this.spinner = $("#spinner");
        this.spinner.show();
        this.mediaHost = "//media.suayan.com/";
        this.images = [];
        this.howMany = 3;
        this.countLoaded = 0;
        this.initImageList();
        this.initBackground();
        console.log("init: FullScreen.");
    },

    /**
     * @instance
     */
    initBackground: function() {
        var that = this;
        $("body").fullscreen({
            "refreshInterval": 30000,
            "fadeOutTime": 5000,
            "fadeInTime": 3000,
            "successCallback": function(){ that.checkSpinner(); },
            "errorCallback": function(){ that.checkSpinner(); },
            "images": this.images
        });
    },

    /**
     * Event handler to trigger every time an image
     * is loaded or has failed loading.
     * @inner
     */
    checkSpinner: function() {
        this.countLoaded++;
        if (this.countLoaded === this.howMany) {
            this.spinner.hide();
        }
    },

    /**
     * Prepopulate images[] array.
     * @inner
     */
    initImageList: function() {
        this.images = [];
        for (var i=1; i<=this.howMany; i++) {
            var numStr = gb.util.zeroFill(i,3);
            this.images.push(this.mediaHost+"images/image-"+numStr+".jpg");
        }
    }
});
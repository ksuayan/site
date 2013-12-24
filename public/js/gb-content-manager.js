gb.Namespace(gb,"gb.ui.ContentManager");
gb.ui.ContentManager = new gb.Class();

/**
 * @fileOverview gb.ui.ContentManager is the main page controller
 * responsible for instantiating other gb.ui objects on the page.
 * @author Kyo Suayan
 * @module gb.ui.ContentManager
 * @requires gb.ui.FullScreen
 * @requires gb.ui.Stage
 *
 * @example
 * var contentManager = new gb.ui.ContentManger("#parent");
 *
 */

gb.ui.ContentManager.include({

    /**
     * @param selector
     * @instance
     */
    init: function(selector) {
        "use strict";

        this.content = $(selector);
        this.visible = true;
        this.fullscreen = new gb.ui.FullScreen();
        this.stage = new gb.ui.Stage("stage");

        var that = this;
        $("#slideshow-button").click(function(){that.toggleSlideShow();});
        $(window).on("resizeEnd", function(){that.onResizeEndHandler();});
        console.log("init: ContentManager");
    },

    /**
     * @instance
     */
    onResizeEndHandler: function() {
        this.stage.onResizeEndHandler();
    },

    /**
     * @instance
     */
    toggleSlideShow: function() {
        this.visible = (!this.visible);
        if (this.visible) {
            this.show();
        } else {
            this.hide();
        }
    },

    /**
     * @instance
     */
    show: function() {
        var that = this;
        this.content.transition({opacity:1},
            2000,
            function(){
                that.content.attr({"visibility":"visible", "display":"block"});
            });
    },

    /**
     * @instance
     */
    hide: function() {
        var that = this;
        this.content.transition({opacity:0},
            2000,
            function(){
                that.content.attr({"visibility":"hidden", "display":"none"});
            });
    }
});

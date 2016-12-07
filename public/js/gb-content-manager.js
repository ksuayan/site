gb.Namespace(gb,"gb.ui.ContentManager");
gb.ui.ContentManager = new gb.Class();

/**
 * @fileOverview gb.ui.ContentManager is the main page controller
 * responsible for instantiating other gb.ui objects on the page.
 * @author Kyo Suayan
 * @module gb.ui.ContentManager
 * @requires gb.ui.FullScreen
 * @requires gb.ui.Stage
 * @requires gb.ui.Timeline
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

        var that = this;
        this.content = $(selector);
        if (this.content.html()) {
            this.visible = true;


            // instantiate the stage
            this.stage = new gb.ui.Stage("stage");


            var splashTile = new gb.ui.Tile({id: "splash-tile", class: "tile"});
            splashTile.setContent('<img src="/img/splash-02.svg"/>');
            this.stage.addTile(splashTile);


            // instantiate Timeline(Tile)
            var timelineTile = new gb.ui.Tile({id: "timeline-tile", class: "tile"});
            this.stage.addTile(timelineTile);
            var timeline = new gb.ui.Timeline("timeline-tile");

            this.stage.loadTileData();
            this.stage.onResizeEndHandler();
            this.show();

            $("#slideshow-button").click(function(){that.toggleSlideShow();});
            $("#play-button").click(function(){that.toggleStage();});
            $(window).on("resizeEnd", function(){that.onResizeEndHandler();});
            console.log("init: ContentManager");
        }
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
            $(".glyphicon-home")
                .removeClass("glyphicon-home")
                .addClass("glyphicon-picture");
            this.show();
            $(".container").fadeIn();
        } else {
            $(".glyphicon-picture")
                .removeClass("glyphicon-picture")
                .addClass("glyphicon-home");
            this.hide();
            $(".container").fadeOut();
        }
    },

    /**
     * @instance
     */
    toggleStage: function() {
        if (this.stage.isRunning()) {
            $(".glyphicon-pause")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play");
            this.stage.stop();
        } else {
            $(".glyphicon-play")
                .removeClass("glyphicon-play")
                .addClass("glyphicon-pause");
            this.stage.start();
        }
    },

    /**
     * @instance
     */
    show: function() {
        var that = this;
        this.content.transition({opacity:1},
            800,
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
            800,
            function(){
                that.content.attr({"visibility":"hidden", "display":"none"});
            });
    }
});

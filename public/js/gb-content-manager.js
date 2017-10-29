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
     * @memberOf gb.ui.Stage
     * @static
     */
    COLORS: ["#333", "#3E606F",  "#002A4A", "#FF9311", "#E33200",
        "#002A4A", "#D1DBBD", "#91AA9D", "#3E606F", "#193441",
        "#3C3658", "#3EC8B7", "#7CD0B4", "#B9D8B1", "#F7E0AE",
        "#FFF1CE", "#17607D"],

    /**
     * @param selector
     * @instance
     */
    init: function(selector) {
        "use strict";

        var that = this,
            rotateInterval = 15000,
            waitTime = 15000,
            stageDiv = $("#stage");
        this.content = $(selector);

        if (this.content.html()) {
            this.visible = true;

            /**
             * Instantiate Stage only for medium screen sizes and up.
             *
             */
            if (stageDiv.length>0 && gb.ui.screenWidth>gb.ui.ScreenSizes["md"]) {
                // instantiate the stage
                this.stage = new gb.ui.Stage("stage", rotateInterval, waitTime);

                var splashTile = new gb.ui.Tile({id: "splash-tile", class: "tile"});
                splashTile.setContent('<img src="http://cdn.suayan.com/dist/img/splash-04.svg"/>');
                this.stage.addTile(splashTile);
                stageDiv.transit({
                    opacity: 1,
                    'background-color': '#212121',
                    easing: 'in',
                    duration: 500
                });

                // instantiate Timeline(Tile)
                var timelineTile = new gb.ui.Tile({id: "timeline-tile", class: "tile"});
                this.stage.addTile(timelineTile);
                var timeline = new gb.ui.Timeline("timeline-tile");
                this.loadTileData(function(count){
                    console.log("Added " + count + " additional tiles from api call.");
                    that.stage.onResizeEndHandler();
                });
                $("#slideshow-button").click(function(){that.toggleSlideShow();});
                $("#play-button").click(function(){that.toggleStage();});
                $(window).on("resizeEnd", function(){that.onResizeEndHandler();});
                console.log("Stage found and instantiated.");
            } else {
                console.log("Skipped gb.ui.Stage.");
            }
            console.log("ContentManager initialized.");
        }
    },

    /**
     * Load tiles from /api/tiles call.
     *
     * @param onLoadComplete
     */
    loadTileData: function(onLoadComplete) {
        var that = this, colorIndex = 0;
        $.get( "/api/tiles", function( data ) {
            var template = JST["handlebars/tile.hbs"];
            for(var i = 0, n=data.length; i<n; i++) {
                var html = template(data[i]),
                    tile = new gb.ui.Tile({
                        "id": "tile-"+i,
                        "class" : "tile"
                    });
                tile.hide();
                tile.setContent(html);
                that.setTileColor(tile, colorIndex);
                that.stage.addTile(tile);
                if (colorIndex > that.COLORS.length) {
                    colorIndex = 0;
                } else {
                    colorIndex++;
                }
            }
            if (onLoadComplete && typeof onLoadComplete === 'function') {
                onLoadComplete(data.length);
            }
        });
    },

    setTileColor: function(tile, colorIndex) {
        var el = tile.jq.get(0);
        if (el) {
            el.style.backgroundColor = this.COLORS[colorIndex];
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

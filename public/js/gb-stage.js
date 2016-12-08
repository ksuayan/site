gb.Namespace(gb,"gb.ui.Stage");
gb.ui.Stage = gb.Class(gb.ui.Tile);

/**
 * @fileOverview A simple carousel using gb.ui.Tiles.
 * @author Kyo Suayan
 * @module gb.ui.Stage
 * @requires gb.ui.Tile
 * @requires gb.util.TimeOutCycle
 *
 * @example
 * var stage = new gb.ui.Stage("#parent");
 * stage.show();
 *
 */
gb.ui.Stage.include({

    /**
     * @param selector
     * @instance
     */
    init: function(selector, intervalMS, waitTime) {
        "use strict";
        var that = this;

        this.intervalMS = intervalMS; // rotation interval
        this.currentIndex = 0;
        this.initTiles();
        if (selector) {
            this.selector = selector;
            // the core jQuery object
            this.jq = $("#"+selector);
            this.contentSelector = "#"+selector+"-content";
            this.content = $("<div id='"+selector+"-content'></div>");
            this.jq.append(this.content);
            this.setupEventHandlers();

            // setup interval loop
            this.timeoutCycle = new gb.util.TimeOutCycle(this.intervalMS,
                function(){ that.rotate(); });

            if (waitTime) {
                setTimeout(function(){
                    console.log("Stage wait:", waitTime);
                    that.start();
                }, waitTime);
            } else {
                that.start();
            }
        }
    },

    setupEventHandlers: function() {
        var that = this;
        // setup swipe handler
        this.touchSurface = new gb.ui.TouchSurface( this.content[0],
            function(evt, dir, phase, swipetype, distance){
                that.onTouchEvent(evt, dir, phase, swipetype, distance);
            });
        $("#stage-next").on("click", function(){that.goToNext();});
        $("#stage-prev").on("click", function(){that.goToPrevious();});
    },

    /**
     * @inner
     */
    initTiles: function() {
        this.tiles = [];
        this.tileOffsets = [];
    },

    addTile: function(tile) {
        this.tiles.push(tile);
        this.content.append(tile.jq);
    },
    /**
     * onTouchEvent handler
     * @param evt event object
     * @param dir direction
     * @param phase start,move,end
     * @param swipetype
     * @param distance
     */
    onTouchEvent: function(evt, dir, phase, swipetype, distance) {
        // dragging
        if (phase === "move" && this.tileOffsets) {
            var scale = 3;
            var offset = (-1 * this.tileOffsets[this.currentIndex]) + (distance * scale);
            var maxOffset = -1 * (this.tileOffsets[1] * (this.tileOffsets.length-1));
            if (offset < 0 && offset > maxOffset) {
                this.content.css({x: offset});
            } else {
                return;
            }
        }
        // end of swipe
        if (phase !== "end") {
            return;
        }
        switch (dir) {
            case "left": this.goToNext();
                break;
            case "right": this.goToPrevious();
                break;
            default: break;
        }
    },


    /**
     * Recalculate dimensions of every tile under
     * this.tiles[].
     * @inner
     */
    resizeTiles: function() {
        var xPos = 0,
        stageWidth = this.jq.width(),
        stageHeight = this.jq.height(),
        t = this.tiles;
        for (var i= 0,n=t.length; i<n; i++) {
            t[i].jq.width(stageWidth);
            t[i].jq.height(stageHeight);
            var el = t[i].jq.get(0);
            if (el) {
                el.style.top = "0px";
                el.style.left = xPos + "px";
            }
            this.tileOffsets[i] = xPos;
            xPos += stageWidth;
        }
    },

    /**
     * @instance
     * @returns {boolean}
     */
    isRunning: function() {
        return (this.timeoutCycle.isRunning()===true);
    },

    /**
     * @instance
     */
    start: function() {
        this.timeoutCycle.start();
    },

    /**
     * @instance
     */
    stop: function() {
        this.timeoutCycle.stop();
    },

    /**
     * @instance
     */
    rotate: function() {
        if (this.currentIndex<this.tiles.length-1) {
            this.goToNext();
        } else {
            this.goTo(0);
        }
    },

    /**
     * @instance
     */
    goToPrevious: function() {
        if (this.currentIndex>0) {
            this.currentIndex--;
        } else {
            this.currentIndex = 0;
        }
        this.goTo(this.currentIndex);
    },

    /**
     * @instance
     */
    goToNext: function() {
        if (this.currentIndex < this.tiles.length - 1) {
            this.currentIndex++;
        } else {
            this.currentIndex = 0;
        }
        this.goTo(this.currentIndex);
    },


    /**
     * Go to 'index'.
     * @instance
     * @param index {number} the index to go to
     */
    goTo: function(index) {
        var that = this;
        // fadeOut
        if (this.currentIndex) {
            this.tiles[this.currentIndex].jq.transition({opacity:0, queue:false}, 100, "ease");
        }
        this.currentIndex = index;
        var xOffset = -1 * this.tileOffsets[index];
        this.content.transition({x:xOffset, queue:false}, 200, "ease", function(){
            that.jq.trigger({
                type: "goto-end",
                slideIndex: index,
                slideXOffset: xOffset
            });
            var currentTile = that.tiles[that.currentIndex].jq;
            currentTile.show();
            currentTile.transition({opacity:1, queue:false}, 300, "ease");
        });
    },

    /**
     * Display the stage.
     * @instance
     */
    show: function() {
        this.jq.css({"opacity":1});
        this.goTo(this.currentIndex);
    },

    hide: function() {
        this.jq.hide();
    },

    fadeOut: function() {
        this.jq.css({"opacity":0});
    },

    /**
     * Event handler for "resizeEnd".
     * @instance
     */
    onResizeEndHandler: function() {
        this.resizeTiles();
        this.show();
    }
});
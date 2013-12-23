gb.Namespace(gb,"gb.ui.Stage");
gb.ui.Stage = gb.Class(gb.ui.Tile);

gb.ui.Stage.include({

    colors: ["#00CBD4", "#D4FFEF", "#5A9097", "#17494F", "#0B2124"],

    init: function(selector) {
        "use strict";

        var that = this;

        this.tiles = [];
        this.tileOffsets = [];
        this.howMany = 15;

        this.currentIndex = 0;
        this.selector = selector;
        this.jq = $("#"+selector);
        this.contentSelector = "#"+selector+"-content";
        this.content = $("<div id='"+selector+"-content'></div>");
        this.jq.append(this.content);

        this.initTiles();
        this.show();

        $(window).resize(function(){that.hide()});
        $("#stage-next").on("click", function(){that.goToNext()});
        $("#stage-prev").on("click", function(){that.goToPrevious()});

        console.log("init: Stage.");
    },

    initTiles: function() {
        this.tiles = [];
        this.tileOffsets = [];

        var colorIndex = 0;
        var xPos = 0;

        for (var i=0; i<this.howMany; i++) {
            var tile = new gb.ui.Tile(this.contentSelector,
            {
                "id": "tile-"+i,
                "class" : "tile"
            });
            tile.jq.html("<p>Tile: "+i+"</p>");
            var el = tile.jq.get(0);
            el.style.backgroundColor = this.colors[colorIndex];
            this.tiles.push(tile);
            if (colorIndex > this.colors.length - 2) {
                colorIndex = 0;
            } else {
                colorIndex++;
            }
        }

        this.resizeTiles();
    },

    resizeTiles: function() {
        var xPos = 0;
        var stageWidth = this.jq.width();
        var stageHeight = this.jq.height();
        var t = this.tiles;

        for (var i= 0,n=t.length; i<n; i++) {
            t[i].jq.width(stageWidth);
            t[i].jq.height(stageHeight);
            var el = t[i].jq.get(0);
            el.style.top = "0px";
            el.style.left = xPos + "px";
            this.tileOffsets[i] = xPos;
            xPos += stageWidth;
        }
    },

    goToPrevious: function() {
        if (this.currentIndex>0) {
            this.currentIndex--;
        } else {
            this.currentIndex = 0;
        }
        this.goTo(this.currentIndex);
    },

    goToNext: function() {
        if (this.currentIndex < this.tiles.length - 2) {
            this.currentIndex++;
        } else {
            this.currentIndex = this.tiles.length - 1;
        }
        this.goTo(this.currentIndex);
    },

    goTo: function(index) {
        this.currentIndex = index;
        var xOffset = -1 * this.tileOffsets[index];
        this.content.transition({x:xOffset}, 500, "snap");
    },

    show: function() {
        var that = this;
        this.jq.hide();
        this.goTo(this.currentIndex);
        this.jq.show();
    },

    onResizeEndHandler: function() {
        this.resizeTiles();
        this.show();
    }


});
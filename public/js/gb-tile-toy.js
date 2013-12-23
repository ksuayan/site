gb.Namespace(gb,"gb.ui.TileToy");
gb.ui.TileToy = gb.Class(gb.ui.Tile);

gb.ui.TileToy.include({

    colors: [
        "#5C4B51", "#8CBEB2", "#F2EBBF", "#F3B562", "#F06060",
        "#FD4B00", "#FE974F", "#FFBC5E", "#FFE290", "#FFF4B0",
        "#3C3658", "#3EC8B7", "#7CD0B4", "#B9D8B1", "#F7E0AE",
        "#00CBD4", "#D4FFEF", "#5A9097", "#17494F", "#0B2124"],

    init: function(selector) {
        "use strict";
        this.tiles = [];
        // parent Div
        this.selector = selector;
        this.parentDiv = $(selector);
        this.saveHtml = this.parentDiv.html();
        this.tileHeight = this.parentDiv.width() / 10;
        this.tileWidth = this.tileHeight;
        console.log("init: TileToy.");
    },

    show: function() {

        var that = this;

        this.parentDiv.empty();

        var index = 0;
        for (var j=0; j<4; j++) {
            for (var i=0; i<5;i++) {

                var colorIndex = index;
                if (index>this.colors.length) {
                    colorIndex = 0;
                }

                var tile = new gb.ui.Tile(this.selector,
                    {
                        "id": "id-"+index
                    },
                    {
                        "width": this.tileWidth,
                        "height": this.tileHeight,
                        "background-color": this.colors[colorIndex],
                        "opacity": 1,
                        "z-index": 0,
                        "float": "left",
                        "display": "block"
                    });

                tile.jq.on("mouseover", function(e){
                    $(e.target).transition({opacity:.9, height: 150, duration: 500});
                });
                tile.jq.on("mouseout", function(e){
                    $(e.target).transition({opacity:.9, height: 10, duration: 500});
                });
                tile.jq.on("click", function(e){
                    $(e.target).transition({opacity: 1, duration: 50});
                    that.stripView();
                });

                this.tiles.push(tile);
                index++;

            }
        }
    },

    stripView: function() {
        var index = 0;
        for (var j=0; j<10; j++) {
            for (var i=0; i<5;i++) {
                this.tiles[index].transition({
                    width: "100%",
                    height: 10,
                    opacity:.5,
                    delay: (index*50),
                    duration: 500 + (index*50)
                });
                index++;
            }
        }
    }
});
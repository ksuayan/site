'use strict';

$(function(){
    var contentManager = new gb.ui.ContentManager("#content");

    var colors = [
        "#5C4B51", "#8CBEB2", "#F2EBBF", "#F3B562", "#F06060",
        "#FD4B00", "#FE974F", "#FFBC5E", "#FFE290", "#FFF4B0",
        "#3C3658", "#3EC8B7", "#7CD0B4", "#B9D8B1", "#F7E0AE",
        "#00CBD4", "#D4FFEF", "#5A9097", "#17494F", "#0B2124"];

    var tiles = [];
    var index = 0;
    for (var j=0; j<10; j++) {
        for (var i=0; i<5;i++) {
            var width = 50;
            var height = 50;
            var tile = new gb.ui.Tile("#tiles", "id-"+index,
                {
                    "width": width,
                    "height": height,
                    "background-color": colors[index],
                    "border": "1px solid #333",
                    "opacity": 0.7,
                    "z-index": 0,
                    "float": "left",
                    "display": "block"
                });
            tiles.push(tile);

            if (index>15) {
                index=0;
            } else {
                index++;
            }
        }
    }

    index = 0;
    for (var j=0; j<10; j++) {
        for (var i=0; i<5;i++) {
            tiles[index].transition({
                width: 250,
                height: 250,
                opacity: 1,
                delay: 2000 + (index*50),
                duration: 500 + (index*50)
            });
            index++;
        }
    }


});
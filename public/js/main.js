'use strict';

$(window).load(function () {

    var mediaHost = "//media.suayan.com/";
    var images = [];
    var howMany = 5; // 28;
    var countLoaded = 0;

    // Setup Spinner
    var checkSpinner = function() {
        countLoaded++;
        if (countLoaded == howMany) {
            $("#spinner").hide();
        }
    };
    $("#spinner").show();

    // Initialize rotating background images[]
    var initImageList = function(howMany) {
        images = [];
        for (var i=1;i<=howMany;i++) {
            var numStr = gb.util.ZeroFill(i,3);
            images.push(mediaHost+"images/image-"+numStr+".jpg");
        }
    };
    initImageList(howMany);
    $("body").fullscreen({
        refreshInterval: 30000,
        fadeOutTime: 1000,
        fadeInTime: 50,
        successCallback: checkSpinner,
        errorCallback: checkSpinner,
        images: images
    });

    // Initialize toolbar
    var content = $("#content");
    var visibleContent = true;
    var playSlideShow = function() {
        visibleContent = (!visibleContent);
        if (visibleContent) {
            content.stop().animate({opacity:1},500,"swing",
                function(){
                    content.attr({"visibility":"visible", "display":"block"});
                });
        } else {
            content.stop().animate({opacity:0},1000,"swing",
                function(){
                    content.attr({"visibility":"hidden", "display":"none"});
                });
        }
    };


    $("#slideshow-button").click(playSlideShow);
    $("#play-button").click(function(){cm.show()});

    /*
    var cm = new gb.ui.ContentManager("#canvas");
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
            var tile = new gb.ui.Tile("#canvas", "id-"+index,
            {
                "top": j*height,
                "left": i*width,
                "width": width,
                "height": height,
                "background-color": colors[index],
                "border": "1px solid #333",
                "position": "absolute",
                "opacity": 0.7,
                "z-index": 0

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
    for (var j=0; j<40; j++) {
        for (var i=0; i<5;i++) {
            tiles[index].transition({
                x: 200+(i*200),
                y: 60+(j*200),
                width: 240,
                height: 240,
                opacity: 1,
                delay: index*50,
                duration: 100
            });
            index++;
        }
    }
    */

});




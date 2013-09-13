'use strict';

$(window).load(function () {

    var mediaHost = "//media.suayan.com/";
    // var mediaHost = "//localhost/";
    var images = [];
    var backgrounds = [];
    var totalBackgrounds = 28;
    var countLoaded = 0;

    var checkSpinner = function() {
        countLoaded++;
        if (countLoaded == totalBackgrounds) {
            $("#spinner").hide();
        }
    };
    var onSuccess = function() {
        checkSpinner();
    };
    var onError = function() {
        checkSpinner();
    };

    var preloadBackgrounds = function() {
        for (var i=1;i<=totalBackgrounds;i++) {
            var numStr = util.ZeroFill(i,3);
            images.push(mediaHost+"images/image-"+numStr+".jpg");
        }
        for (var i= 0,n=images.length;i<n;i++) {
            var preloader = new gb.ui.PreloadableImage("img"+i, images[i], onSuccess, onError)
            backgrounds.push(preloader);
        }
    };

    preloadBackgrounds();

    var onResizeHandler = function(e){
        // console.log("resize",e);
    };
    $(window).resize(util.ResizeThrottle(onResizeHandler, 500));

    $("#spinner").show();

    $("body").fullscreen({
        refreshInterval: 30000,
        fadeOutTime: 1000,
        fadeInTime: 50,
        images: images
    });

    var content = $("#content");
    var visibleContent = true;
    var toggleContent = function() {
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
    $("#ui-toolbar").click(toggleContent);

    // Search Hookups.
    var $search = $("#search-field").search();
    $(window).resize(util.ResizeThrottle($search.onResize, 500));

});




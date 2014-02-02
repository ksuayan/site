//
// $.fn.fullscreen()
// Rotating fullscreen background images.
//
// Dependencies:
// gb-preloadable-image.js: gb.ui.PreloadableImage



(function ($) {

    $.fn.fullscreen = function(options) {
        "use strict";

        var settings = $.extend({
            front: "#background",
            bgHeightClass: 'bgheight',
            bgWidthClass: 'bgwidth',
            refreshInterval: 5000,
            fadeOutTime: 500,
            fadeInTime: 700,
            successCallback: function(){},
            errorCallback: function(){},
            images: ["images/image-001.png","images/image-002.png","images/image-003.png"]
        }, options);


        var theWindow = $(window),
            bkgImage = $(settings.front),
            windowAspect = theWindow.width()/theWindow.height(),
            imageAspect = bkgImage.width() / bkgImage.height(),
            intervalHandler = null,
            backgrounds = [],// array of gb.ui.PreloadableImage();
            index = 0;

        var refreshImage = function() {
            if (index < settings.images.length - 1) {
                index++;
            } else {
                index = 0;
            }
            var onComplete = function() {
                bkgImage.attr("src", settings.images[index]);
                bkgImage.transition({opacity:1},settings.fadeInTime,"snap");
                resizeBackgound();
            };

            bkgImage.transition({opacity:0},settings.fadeOutTime,"snap", onComplete);
        };

        var resizeBackgound = function() {
            var width = backgrounds[index].image.width;
            var height = backgrounds[index].image.height;
            imageAspect = width/height;
            windowAspect = theWindow.width()/theWindow.height();
            if (windowAspect > imageAspect) {
                bkgImage.removeClass().addClass(settings.bgWidthClass);
            } else {
                bkgImage.removeClass().addClass(settings.bgHeightClass);
            }
        };

        var preloadBackgrounds = function() {
            for (var i= 0, n=settings.images.length;i<n;i++) {
                var id = "img"+i;
                var source = settings.images[i];
                var pre = new gb.ui.PreloadableImage(id, source, settings.successCallback, settings.errorCallback);
                backgrounds.push(pre);
            }
        };

        var setRefreshInterval = function() {
            theWindow.on("resizeEnd", resizeBackgound);
            if (!intervalHandler) {
                intervalHandler = setInterval(refreshImage, settings.refreshInterval);
            }
        };

        preloadBackgrounds();
        setRefreshInterval();
        return this;
    };
}(jQuery));



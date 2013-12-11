//
// $.fn.fullscreen()
// Rotating fullscreen background images.
//
// Dependencies:
// preloadable-image.js: gb.ui.PreloadableImage



(function ($) {

    $.fn.fullscreen = function(options) {

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
            $bg = $(settings.front),
            windowAspect = theWindow.width()/theWindow.height(),
            imageAspect = $bg.width() / $bg.height(),
            intervalHandler = null,
            backgrounds = [],// array of gb.ui.PreloadableImage();
            index = 0;

        var refreshImage = function() {
            imageAspect = $bg.width() / $bg.height();
            windowAspect = theWindow.width()/theWindow.height();
            if (index < settings.images.length - 1) {
                index++;
            } else {
                index = 0;
            }
            var onComplete = function() {
                $bg.attr("src", settings.images[index]);
                $bg.fadeIn(settings.fadeInTime);
            };
            $bg.fadeOut(settings.fadeOutTime, onComplete);
        };

        var resizeBackgound = function() {
            if (windowAspect < imageAspect) {
                $bg.removeClass().addClass(settings.bgHeightClass);
            } else {
                $bg.removeClass().addClass(settings.bgWidthClass);
            }
            imageAspect = $bg.width() / $bg.height();
            windowAspect = theWindow.width()/theWindow.height();
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
            theWindow.resize(resizeBackgound).trigger("resize");
            if (!intervalHandler) {
                intervalHandler = setInterval(refreshImage, settings.refreshInterval);
            }
        };

        setRefreshInterval();
        preloadBackgrounds();
        return this;
    };
}(jQuery));



gb.Namespace(gb,"gb.ui.LazyImage");
gb.ui.LazyImage = new gb.Class();

gb.ui.LazyImage.include({

    init: function(selector) {
        "use strict";
        var that = this;
        var scrolledIntoView = function(elem) {
            var docViewTop = $(window).scrollTop(),
                docViewBottom = docViewTop + $(window).height(),
                elemTop = $(elem).offset().top,
                elemBottom = elemTop + $(elem).height(),
                isVisible = ((elemTop < docViewBottom) && (elemTop > docViewTop));
            return isVisible;
        };

        var throttleScroll = function(evt){
            that.images.trigger("scrollend");
        };
        $(window).scroll(gb.util.throttle(throttleScroll, 300));

        this.images = $(selector);
        this.images.on("scrollend", function(e){
            var target = $(e.target),
                src = target.attr("src"),
                dataSrc = target.attr("data-src");
            // when scrolled into view
            // start loading the image.
            if (scrolledIntoView(target) && dataSrc && (src !== dataSrc)) {
                target.attr("src", dataSrc);
                target.off("scrollend");
                target.removeAttr("data-src");
            }
        });
        $(window).scroll(function(){
            that.images.trigger("scrollend");
        });
        this.images.trigger("scrollend");
    }
});
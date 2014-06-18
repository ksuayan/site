$(function(){

    var isScrolledIntoView = function(elem) {

        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        var isVisible = ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        // var isVisible = (elemBottom <= docViewBottom);

        if (isVisible) {
            console.log("elemBottom", elemBottom,
                "docBottom", docViewBottom,
                "elemTop", elemTop,
                "docTop", docViewTop);
        }
        return isVisible;
    };

    var throttleScroll = function(evt){
        images.trigger("scrollend");
    };

    var images = $("img.lazy");

    images.on("scrollend", function(e){
        var target = $(e.target);

        // when scrolled into view
        // start loading the image.

        if (isScrolledIntoView(target)) {
            target.attr("src", target.attr("data-src"));
            console.log("scrollend", new Date().valueOf(), this);
        }
    });

    $(window).scroll(gb.util.throttle(throttleScroll, 200));
    images.trigger("scrollend");

});
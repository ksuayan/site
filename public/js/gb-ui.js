// Shared UI objects.

gb.Namespace(gb, "gb.ui");

// breakpoints matched to global.less
gb.ui.ScreenSizes = {
    "sm": 480,
    "md": 768,
    "lg": 992,
    "xl": 1200
};

gb.ui.screenMode = "lg";

gb.ui.onResizeHandler = function(){
    var breaks = gb.ui.ScreenSizes;
    var width = $(window).width();
    if (width < breaks.sm) {
        gb.ui.screenMode = "xs";
    } else if (width >= breaks.sm && width < breaks.md) {
        gb.ui.screenMode = "sm";
    } else if (width >= breaks.md && width < breaks.lg) {
        gb.ui.screenMode = "md";
    } else if (width >= breaks.lg && width < breaks.xl) {
        gb.ui.screenMode = "lg";
    } else if (width >= breaks.xl) {
        gb.ui.screenMode = "xl";
    }
    $(this).trigger('resizeEnd');
};

// Setup a throttled event handler for onresize event.
$(function(){
    $(window).resize(gb.util.throttle(gb.ui.onResizeHandler, 1000));
});
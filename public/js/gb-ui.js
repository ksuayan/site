gb.Namespace(gb, "gb.ui");

/**
 * @fileOverview Application wide settings for UI environment.
 * @author Kyo Suayan
 * @namespace gb.ui
 */
gb.ui = {
    /**
     * Breakpoints matched to global.less
     * @memberOf gb.ui
     * @type {{sm: number, md: number, lg: number, xl: number}}
     */
    ScreenSizes : {
        "sm": 480,
        "md": 768,
        "lg": 992,
        "xl": 1200
    },

    /** @type {string} */
    screenMode: "lg",

    /**
     * Sitewide window resize event handler. This would usually be throttled
     * via gb.util.throttle.
     * @memberOf gb.ui
     * @static
     */
    onResizeHandler: function(){
        var breaks = gb.ui.ScreenSizes;
        var width = $(window).width();
        gb.ui.screenWidth = $(window).width();
        gb.ui.screenHeight = $(window).height();
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
    }
};

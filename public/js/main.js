'use strict';

$(function(){
    var contentManager = new gb.ui.ContentManager("#content");
    $(window).resize(gb.util.throttle(gb.ui.onResizeHandler, 500));
});
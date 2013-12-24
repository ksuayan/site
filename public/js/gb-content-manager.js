gb.Namespace(gb,"gb.ui.ContentManager");
gb.ui.ContentManager = new gb.Class();

gb.ui.ContentManager.include({

    init: function(selector) {
        "use strict";

        this.content = $(selector);
        this.visible = true;
        this.fullscreen = new gb.ui.FullScreen();
        this.stage = new gb.ui.Stage("stage");

        var that = this;
        $("#slideshow-button").click(function(){that.toggleSlideShow();});
        $(window).on("resizeEnd", function(){that.onResizeEndHandler();});

        console.log("init: ContentManager");
    },

    onResizeEndHandler: function() {
        this.stage.onResizeEndHandler();
    },

    toggleSlideShow: function() {
        this.visible = (!this.visible);
        if (this.visible) {
            this.show();
        } else {
            this.hide();
        }
    },

    show: function() {
        var that = this;
        this.content.stop().transition({opacity:1, duration: 50},
            function(){
                that.content.attr({"visibility":"visible", "display":"block"});
            });
    },

    hide: function() {
        var that = this;
        this.content.stop().transition({opacity:0,duration:1000},
            function(){
                that.content.attr({"visibility":"hidden", "display":"none"});
            });
    }
});


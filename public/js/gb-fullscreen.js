gb.Namespace(gb,"gb.ui.FullScreen");
gb.ui.FullScreen = new gb.Class();


gb.ui.FullScreen.include({
    init: function() {
        "use strict";
        this.spinner = $("#spinner");
        this.spinner.show();

        this.mediaHost = "//media.suayan.com/";
        this.images = [];
        this.howMany = 3;
        this.countLoaded = 0;

        this.initImageList();
        this.initBackground();
        console.log("init: FullScreen.");
    },

    initBackground: function() {
        var that = this;
        $("body").fullscreen({
            "refreshInterval": 30000,
            "fadeOutTime": 5000,
            "fadeInTime": 3000,
            "successCallback": function(){ that.checkSpinner(); },
            "errorCallback": function(){ that.checkSpinner(); },
            "images": this.images
        });
    },

    // Setup Spinner
    checkSpinner: function() {
        this.countLoaded++;
        if (this.countLoaded == this.howMany) {
            this.spinner.hide();
        }
    },

    // Initialize rotating background images[]
    initImageList: function() {
        this.images = [];
        for (var i=1;i<=this.howMany;i++) {
            var numStr = gb.util.ZeroFill(i,3);
            this.images.push(this.mediaHost+"images/image-"+numStr+".jpg");
        }
    }
});
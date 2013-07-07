$(window).load(function () {

    var mediaHost = "//media.suayan.com/";
    var images = [];
    var backgrounds = [];

    var onSuccess = function() {
        console.log("success", arguments, backgrounds);
    };
    var onError = function() {
        console.log("error", arguments);
    };


    for (var i=1;i<=28;i++) {
        var numStr = util.zeroFill(i,3);
        images.push(mediaHost+"images/image-"+numStr+".jpg");
    }

    for (var i= 0,n=images.length;i<n;i++) {
        var preloader = new gb.ui.PreloadableImage("img"+i, images[i], onSuccess, onError)
        backgrounds.push(preloader);
    }

    $("body").fullscreen({
        refreshInterval: 30000,
        fadeOutTime: 1000,
        fadeInTime: 50,
        images: images
    });

});
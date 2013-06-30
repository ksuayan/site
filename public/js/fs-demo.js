$(window).load(function () {

    var mediaHost = "//media.suayan.com/";
    var images = [];
    for (var i=1;i<=28;i++) {
        var numStr = util.zeroFill(i,3);
        images.push(mediaHost+"images/image-"+numStr+".jpg");
    }

    $("body").fullscreen({
        refreshInterval: 30000,
        fadeOutTime: 1000,
        fadeInTime: 50,
        images: images
    });

});
var fs = require('fs'),
    gm = require('gm').subClass({imageMagick: true});


var squareThumbnail = function(source, destination, size) {
    gm(source)
    .identify(function (err, data) {
        if (!err) {
            var height = data.size.height,
                width = data.size.width;
            console.log("width x height ", width, height);
            if (height>width) {
                var y = (height - width)/2;
                // portrait
                gm(source)
                .crop(width, width, 0, y)
                .resize(size)
                .write(destination, function(err){
                    if (!err) {
                        console.log('portrait resize done.');
                    }
                });
            } else {
                // landscape
                var x = (width - height)/2;
                gm(source)
                .crop(height, height, x, 0)
                .resize(null, size)
                .write(destination, function(err){
                    if (!err) {
                        console.log('landscape resize done.');
                    }
                });
            }
        }
    });
};

squareThumbnail("uploads/8ebbe29fa2ed626ff2824ef3be5d67cc", "processed/result-1.jpg", 600);
squareThumbnail("uploads/6478d254b85020ee635caca4b0291538", "processed/result-2.jpg", 600);
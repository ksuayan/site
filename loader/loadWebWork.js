var data = require('./site-content.json');
var content = require('../server/content-db');

var TileLoader = function(){
    console.log("Init TileContentLoader.");
    var errorHandler = function(err){
        if (err) {
            return console.log(err);
        }
    };
    for (var i= 0, n=data.length; i<n; i++){
        var tile = new content.TileModel(data[i]);
        tile.save(errorHandler);
    }
};

var ito = new TileLoader();


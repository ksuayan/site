var data = require('./site-content.json');
var content = require('../server/content-db');


var TileLoader = function(){
    console.log("Init TileContentLoader.");

    for (var i= 0, n=data.length; i<n; i++){
        var tile = new content.TileModel(data[i]);
        tile.save(function(err){
            if (err) return console.log(err);

        });
    };

};

var ito = new TileLoader();


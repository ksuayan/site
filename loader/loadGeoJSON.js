var geo = require('../server/locations-db');

var GeoJsonLoader = function(){
    console.log("Init GeoJsonLoader.");

    var errorHandler = function(err){
        if (err) {
            return console.log("error: ", err);
        }
    };

    var loadJsonData = function(filename, mapId) {
        var data = require(filename);
        var features = data.features;
        for (var i= 0, n=features.length; i<n; i++){
            var item = features[i];
            if (item.type === "Feature" &&
                item.geometry) {

                // Google uses Lat,Lon
                var lat = item.geometry.coordinates[1],
                    lon = item.geometry.coordinates[0],
                    geoLocation = {
                        name: item.properties.name,
                        description: "",
                        styleHash: item.properties.styleHash ? item.properties.styleHash : "none",
                        loc: {
                            type: "Point",
                            coordinates: [lon, lat]
                        },
                        address: item.properties.description ? item.properties.description : "",
                        url: "",
                        map: mapId
                    };
                console.log("creating: ", mapId, geoLocation.name);
                var geoInstance = new geo.LocationModel(geoLocation);
                geoInstance.save(errorHandler);
            }
        }
    };

    loadJsonData("./paris.json","paris");
    loadJsonData("./venice.json","venice");
};

var ito = new GeoJsonLoader();
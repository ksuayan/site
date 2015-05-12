var data = require('./paris.json');
var geo = require('../server/locations-db');

var GeoJsonLoader = function(){
    console.log("Init GeoJsonLoader.");

    var errorHandler = function(err){
        if (err) {
            return console.log("error: ", err);
        }
    };

    var features = data.features;

    for (var i= 0, n=features.length; i<n; i++){
        var item = features[i];

        if (item.type === "Feature" &&
            item.geometry) {

            // Google uses Lat,Lon
            var lat = item.geometry.coordinates[1],
                lon = item.geometry.coordinates[0];

            var geoLocation = {
                name: item.properties.name,
                description: item.properties.description ? item.properties.description : "",
                styleHash: item.properties.styleHash,
                styleUrl: item.properties.styleUrl,
                loc: {
                    type: "Point",
                    coordinates: [lon, lat]
                }
            };
            console.log("creating: ", geoLocation.name);
            var geoInstance = new geo.LocationModel(geoLocation);
            geoInstance.save(errorHandler);
        }
    }
};

var ito = new GeoJsonLoader();
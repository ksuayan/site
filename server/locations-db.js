var mongoClient = require('./mongo-client'),
    mongoose = mongoClient.mongoose,
    util = require('./apputil');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Location = new Schema({
    name        : {type: String, default: "POI"},
    description : {type: String, default: ""},
    address : {type: String, default: ""},
    url : {type: String, default: ""},
    loc: {
        type: {
            type: "String",
            required: true,
            enum: ['Point', 'LineString', 'Polygon'],
            default: 'Point'
        },
        coordinates: [Number]
    },
    styleHash   : {type: String, default: ""},
    map         : {type: String, default: ""},
    date        : {type: Date,  default: Date.now}
});

var MapDocument = new Schema({
    name: {type: String, default: "default"},
    description: {type: String, default: ""},
    owner: {type: String, default: ""},
    center: [Number],
    zoom: {type: Number, default: 14},
    date: {type: Date,  default: Date.now}
});

Location.index({ 'loc': '2dsphere' });
MapDocument.index({ 'center': '2dsphere' });

var LocationDB = function(){
    this.LocationModel = mongoose.model('location', Location);
    this.MapDocumentModel = mongoose.model('map', MapDocument);
    console.log("Initialized LocationsDB.");
};

LocationDB.prototype.getLocationById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.LocationModel
    .findOne(query)
    .exec(function (err, textObj) {
        if (err) {
            return util.HandleError(err, onError);
        }
        if (typeof onSuccess ==='function') {
            onSuccess(textObj);
        }
    });
};


LocationDB.prototype.updateLocation = function(locationObj, onSuccess, onError) {
    this.LocationModel
    .findById(locationObj._id)
    .exec(function(err, found){
        if (err) {
            return util.HandleError(err, onError);
        }
        if (found) {
            found.name = locationObj.name;
            found.description = locationObj.description;
            found.address = locationObj.address;
            found.url = locationObj.url;
            found.loc = locationObj.loc;
            found.styleHash = locationObj.styleHash;

            found.save(function(err){
                if (err) {
                    return util.HandleError(err, onError);
                }
                if (typeof onSuccess ==='function') {
                    onSuccess(locationObj);
                }
            });
        } else {
            onError({status:"error", reason: "id not found: " + locationObj._id});
        }
    });
};

LocationDB.prototype.createLocation = function(locationObj, onSuccess, onError) {
    var that = this;
    this.LocationModel
    .findOne({loc: locationObj.loc })
    .exec(function(err, found){
        if (!err && found) {
            onError({status:"error", reason:"location exists: "+found.loc.coordinates});
            return;
        } else {
            var newLoc = new that.LocationModel(locationObj);
            newLoc.save(function(err){
                if (err) {
                    return util.HandleError(err, onError);
                }
                if (typeof onSuccess ==='function') {
                   onSuccess(newLoc);
                }
            });
        }
    });
};

LocationDB.prototype.deleteLocation = function(id, onSuccess, onError) {
    this.LocationModel
    .findById(id)
    .exec(function(err, locationObj){
        if (err) {
            return util.HandleError(err, onError);
        }
        if (locationObj){
            locationObj.remove(function(deleteError){
                if (deleteError) {
                    return util.HandleError(deleteError, onError);
                }
                onSuccess(locationObj);
            });
        } else {
            onError({status:"error",reason: "id not found: " + id});
        }
    });
};

LocationDB.prototype.saveLocation = function(doc) {
    var instance = new this.model(doc);
    instance.save();
};

LocationDB.prototype.getLocations = function(onSuccess, onError) {
    var query = {};
    this.LocationModel
        .find(query)
        .sort("_id")
        .exec(function (err, locations) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(locations);
            }
        });
};

LocationDB.prototype.getLocationsNearPoint = function(latLng, maxDistance, onSuccess, onError) {
    var point = [latLng[1],latLng[0]];
    var query = {
        loc: {
            $nearSphere: {
                $geometry: {
                    type : "Point",
                    coordinates : point
                },
                $maxDistance: maxDistance
            }
        }
    };
    this.LocationModel
        .find(query)
        .exec(function (err, locations) {
            if (err) {
                console.log("Error:", err);
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                // console.log("found: ", locations.length);
                onSuccess(locations);
            }
        });
};

LocationDB.prototype.getLocationsWithin = function(swLatLng, neLatLng, onSuccess, onError) {
    // clockwise from lower-left, longitude first
    var query = {
        "loc": {
            "$geoWithin": {
                "$geometry": {
                    "type": "Polygon",
                    "coordinates": [[
                        [swLatLng[1], swLatLng[0]],
                        [neLatLng[1], swLatLng[0]],
                        [neLatLng[1], neLatLng[0]],
                        [swLatLng[1], neLatLng[0]],
                        [swLatLng[1], swLatLng[0]]
                    ]]
                }
            }
        }
    };
    this.LocationModel
        .find(query)
        .exec(function (err, locations) {
            if (err) {
                console.log("Error:", err);
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                // console.log("found: ", locations.length);
                onSuccess(locations);
            }
        });
};

/*
 * MapDocuments
 * ------------
 *
 */

LocationDB.prototype.createMapDocument = function(mapObj, onSuccess, onError) {
    var that = this;
    this.MapDocumentModel
        .findOne({name: mapObj.name, owner: mapObj.owner })
        .exec(function(err, found){
            if (!err && found) {
                onError({status:"error", reason:"map exists: "+found.name});
                return;
            } else {
                var newMap = new that.MapDocumentModel(mapObj);
                newMap.save(function(err){
                    if (err) {
                        return util.HandleError(err, onError);
                    }
                    if (typeof onSuccess ==='function') {
                        onSuccess(newMap);
                    }
                });
            }
        });
};

LocationDB.prototype.getMapDocuments = function(query, onSuccess, onError) {
    this.MapDocumentModel
        .find(query)
        .sort("date")
        .exec(function (err, locations) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(locations);
            }
        });
};

LocationDB.prototype.getMapDocumentById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.MapDocumentModel
        .findOne(query)
        .exec(function (err, mapObj) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(mapObj);
            }
        });
};

LocationDB.prototype.updateMapDocument = function(mapObj, onSuccess, onError) {
    this.MapDocumentModel
        .findById(mapObj._id)
        .exec(function(err, found){
            if (err) {
                return util.HandleError(err, onError);
            }
            if (found) {
                found.name = mapObj.name;
                found.description = mapObj.description;
                found.center = mapObj.center;
                found.zoom = mapObj.zoom;
                found.save(function(err){
                    if (err) {
                        return util.HandleError(err, onError);
                    }
                    if (typeof onSuccess ==='function') {
                        onSuccess(mapObj);
                    }
                });
            } else {
                onError({status:"error", reason: "id not found: " + mapObj._id});
            }
        });
};

LocationDB.prototype.deleteMapDocument = function(id, onSuccess, onError) {
    this.MapDocumentModel
        .findById(id)
        .exec(function(err, mapObj){
            if (err) {
                return util.HandleError(err, onError);
            }
            if (mapObj){
                mapObj.remove(function(deleteError){
                    if (deleteError) {
                        return util.HandleError(deleteError, onError);
                    }
                    onSuccess(mapObj);
                });
            } else {
                onError({status:"error",reason: "id not found: " + id});
            }
        });
};

module.exports = new LocationDB();

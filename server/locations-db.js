var mongoose = require('mongoose'),
    conf = require('./conf'),
    util = require('./apputil');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Location = new Schema({
    name        : {type: String, default: "POI"},
    description : {type: String, default: ""},
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
    styleUrl    : {type: String, default: ""},
    date        : {type : Date,  default: Date.now}
});

Location.index({ 'loc': '2dsphere' });


var LocationDB = function(){
    console.log("Initialized LocationsDB.");
    this.db = mongoose.createConnection(conf.app.mongoURL);
    this.LocationModel = this.db.model('location', Location);
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
    this.Locationodel
    .findById(locationObj._id)
    .exec(function(err, found){
        if (err) {
            return util.HandleError(err, onError);
        }
        if (found) {
            found.name = locationObj.name;
            found.description = locationObj.description;
            found.coordinates = locationObj.coordinates;
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
    .findOne({coordinates: locationObj.coordinates})
    .exec(function(err, found){
        if (!err && found) {
            onError({status:"error", reason:"location exists: "+locationObj.coordinates});
            return;
        } else {
            var locationObj = new that.LocationModel(locationObj);
            locationObj.save(function(err){
                if (err) {
                    return util.HandleError(err, onError);
                }
                if (typeof onSuccess ==='function') {
                   onSuccess(locationObj);
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

LocationDB.prototype.getLocationsNearPoint = function(point, maxDistance, onSuccess, onError) {
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
                console.log("found: ", locations.length);
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
                        [swLatLng[0], swLatLng[1]],
                        [neLatLng[0], swLatLng[1]],
                        [neLatLng[0], neLatLng[1]],
                        [swLatLng[0], neLatLng[1]],
                        [swLatLng[0], swLatLng[1]]
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
                console.log("found: ", locations.length);
                onSuccess(locations);
            }
        });
};

module.exports = new LocationDB();

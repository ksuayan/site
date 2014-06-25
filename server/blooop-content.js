var mongoose = require('mongoose'),
    conf = require('./blooop-config'),
    util = require('./apputil');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Log = new Schema({
    ts: {type: Date},
    group : {type: String, default: ""},
    host :  {type: String, default: ""},
    path :  {type: String, default: ""},
    url :   {type: String, default: ""},
    status: {type: Number},
    elapsed :  {type: Number, default: 0}
});


var BlooopDB = function(){
    console.log("Initialized Blooop DB.");
    this.locale = conf.app.defaultLocale;
    this.db = mongoose.createConnection(conf.app.mongoURL);
    this.LogModel = this.db.model('log', Log);
};

BlooopDB.prototype.getLogById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.LogModel
        .findOne(query)
        .exec(function (err, logObj) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(logObj);
            }
        });
};

BlooopDB.prototype.createLog = function(logObj, onSuccess, onError) {
    var that = this;
    this.LogModel
        .findOne({name: logObj.name})
        .exec(function(err, found){
            if (!err && found) {
                onError({status:"error", reason:"page.name exists: "+logObj.name});
                return;
            } else {
                var page = new that.LogModel(logObj);
                page.save(function(err){
                    if (err) {
                        return util.HandleError(err, onError);
                    }
                    if (typeof onSuccess ==='function') {
                        onSuccess(page);
                    }
                });
            }
        });
};

BlooopDB.prototype.updateLog = function(logObj, onSuccess, onError) {
    this.LogModel
        .findById(logObj._id)
        .exec(function(err, found){
            if (err) {
                return util.HandleError(err, onError);
            }
            if (found) {
                found.save(function(err){
                    if (err) {
                        return util.HandleError(err);
                    }
                    if (typeof onSuccess ==='function') {
                        onSuccess(logObj);
                    }
                });
            } else {
                onError({status:"error", reason: "id not found: " + logObj._id});
            }
        });
};

BlooopDB.prototype.deleteLog = function(id, onSuccess, onError) {
    this.LogModel
        .findById(id)
        .exec(function(err, logObj){
            if (err) {
                return util.HandleError(err, onError);
            }
            if (logObj){
                logObj.remove(function(deleteError){
                    if (deleteError) {
                        return util.HandleError(deleteError, onError);
                    }
                    onSuccess(logObj);
                });
            } else {
                onError({status:"error",reason: "id not found: " + id});
            }
        });
};

BlooopDB.prototype.getLogs = function(onSuccess, onError) {
    var query = {};
    this.LogModel
        .find(query)
        .exec(function (err, pages) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(pages);
            }
        });
};

BlooopDB.prototype.getDocuments = function(id, callback) {
    var query = {};
    if (id) {
        query._id = id;
    }
    this.model.find(query, function(err,docs){
        if (err) {
            return util.HandleError(err);
        }
        if (callback && typeof callback ==='function') {
            callback(docs);
        }
    });
};

BlooopDB.prototype.saveDocument = function(doc) {
    var instance = new this.model(doc);
    instance.save();
};


module.exports = new BlooopDB();

var mongoose = require('mongoose'),
    conf = require('./blooop-config'),
    util = require('../server/apputil');

var Schema = mongoose.Schema;

var Log = new Schema({
    i: {type: Number},
    of: {type: Number},
    statusCode: {type: Number},
    at: {type: Date},
    time: {type: Number}
}, {strict:false});



var BlooopDB = function(){
    this.locale = conf.app.defaultLocale;
    this.db = mongoose.createConnection(conf.app.mongoURL);
    this.logModel = this.db.model('log', Log);
    console.log("Initialized Blooop DB.");
};

BlooopDB.prototype.getLogById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.logModel
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
    this.logModel
        .findOne({name: logObj.name})
        .exec(function(err, found){
            if (!err && found) {
                onError({status:"error", reason:"page.name exists: "+logObj.name});
                return;
            } else {
                var page = new that.logModel(logObj);
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
    this.logModel
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
    this.logModel
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
    this.logModel
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

/* ------------- vanilla mongo calls ----------------- */

BlooopDB.prototype.findQuery = function(query, callback) {
    this.model.find(query, function(err,docs){
        if (err) {
            return util.HandleError(err);
        }
        if (callback && typeof callback ==='function') {
            callback(docs);
        }
    });
};

/**
 * Generic MongoDB save.
 * @param doc
 */
BlooopDB.prototype.saveLogObject = function(doc) {
    var instance = new this.logModel(doc);
    instance.save();
};


module.exports = new BlooopDB();

var mongoose = require('mongoose'),
    conf = require('./conf'),
    util = require('./apputil');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var JobModel = new Schema({
    startDate: {type: Number, default: null},
    endDate: {type: Number, default: null},
    title: {type: String, default: "Title"},
    employer: {type: String, default: "Employer, Inc"},
    location: {type: String, default: "City,State"},
    body: {type:String, default: ""}
});

var TimelineDB = function(){
    console.log("Initialized TimelineDB.");
    this.db = mongoose.createConnection(conf.app.mongoURL);
    this.JobModel = this.db.model('job', JobModel);
};

TimelineDB.prototype.getJobs = function(onSuccess, onError) {
    var query = {};
    var that = this;
    this.JobModel
    .find(query)
    .sort("-dateCreated")
    .exec(function (err, texts) {
        if (err)
            return util.HandleError(err, onError);
        if (typeof onSuccess ==='function') {
            onSuccess(texts);
        }
    });
};

TimelineDB.prototype.createJob = function(jobObj, onSuccess, onError) {
    var text = new this.JobModel(jobObj);
    text.save(function(err){
        if (err)
            return util.HandleError(err, onError);
        if (typeof onSuccess ==='function') {
            onSuccess(text);
        }
    });
};

TimelineDB.prototype.getJobById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.JobModel
        .findOne(query)
        .exec(function (err, textObj) {
            if (err)
                return util.HandleError(err, onError);
            if (typeof onSuccess ==='function') {
                onSuccess(textObj);
            }
        });
};

TimelineDB.prototype.updateJob = function(jobObj, onSuccess, onError) {
    this.JobModel
    .findById(jobObj._id)
    .exec(function(err, found){
        if (err)
            return util.HandleError(err, onError);
        if (found) {
            found.startDate = jobObj.startDate;
            found.endDate = jobObj.endDate;
            found.title = jobObj.title;
            found.employer = jobObj.employer;
            found.location = jobObj.location;
            found.body = jobObj.body;
            found.save(function(err){
                if (err)
                    return util.HandleError(err, onError);
                if (typeof onSuccess ==='function') {
                    onSuccess(jobObj);
                }
            });
        } else {
            onError({status:"error", reason: "id not found: " + jobObj._id});
        }
    });
};

TimelineDB.prototype.deleteJob = function(id, onSuccess, onError) {
    this.JobModel
    .findById(id)
    .exec(function(err, jobObj){
        if (err)
            return util.HandleError(err, onError);
        if (jobObj){
            jobObj.remove(function(deleteError){
                if (deleteError)
                    return util.HandleError(deleteError, onError);
                onSuccess(jobObj);
            });
        } else {
            onError({status:"error", reason: "id not found: " + id});
        };
    });
};

module.exports = new TimelineDB();

var content = require('./blooop-content'),
    util = require('./apputil');

var ApiHandler = function() {
    console.log("Initialized API handler");
};

ApiHandler.prototype.getLogs = function(req, res) {
    var onSuccess = function(pages) {
        return res.send(pages);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.getLogs(onSuccess, onError);
};

ApiHandler.prototype.getLogById = function(req, res) {
    var onSuccess = function(logObj) {
        res.send(logObj);
    };
    content.getLogById(req.params.id, onSuccess);
};

ApiHandler.prototype.createLog = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    var logObj = {
        ts: req.body.ts,
        group: req.body.group,
        host: req.body.host,
        path: req.body.path,
        url: req.body.url,
        status: req.body.status,
        elapsed: req.body.elapsed

    };
    content.createLog(logObj, onSuccess, onError)
};

ApiHandler.prototype.updateLog = function(req, res) {
    var onSuccess = function(pageObj) {
        return res.send(pageObj)
    };
    var onError = function(err) {
        return res.send(err);
    };
    var logObj = {
        _id: req.params.id,
        ts: req.body.ts,
        group: req.body.group,
        host: req.body.host,
        path: req.body.path,
        url: req.body.url,
        status: req.body.status,
        elapsed: req.body.elapsed
    };
    content.updateLog(logObj, onSuccess, onError);
};

ApiHandler.prototype.deleteLog = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    content.deleteLog(req.params.id, onSuccess, onError)
};

ApiHandler.prototype.saveDocument = function(request, response) {
    var doc = {
        title : request.body.title,
        body : request.body.body
    };
    var instance = new content.model(doc);
    instance.save();
    response.send({status:"ok"});
};


module.exports = new ApiHandler();
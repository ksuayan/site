var timeline = require('./timeline-db'),
    content = require('./content-db'),
    conf = require('./conf'),
    util = require('./apputil');

var ApiHandler = function() {
    console.log("Initialized API handler");
};


ApiHandler.prototype.getTileList = function(req, res) {
    var onSuccess = function(tiles) {
        return res.send(tiles);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.getTileList(onSuccess, onError);
};

ApiHandler.prototype.getTimeline = function(req, res) {
    var onSuccess = function(timeline) {
        return res.send(timeline);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    timeline.getJobs(onSuccess, onError);
};

ApiHandler.prototype.getTextList = function(req, res) {
    var onSuccess = function(contentMap) {
        return res.send(contentMap);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.getTextList(null, onSuccess, onError);
};

ApiHandler.prototype.getText = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.getTextById(req.params.id, onSuccess, onError);
};

ApiHandler.prototype.updateText = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj)
    };
    var onError = function(err) {
        return res.send(err);
    };
    var textObj = {
        _id: req.params.id,
        name: req.body.name,
        text: req.body.text,
        locale: req.body.locale
    };
    content.updateText(textObj, onSuccess, onError);
};

ApiHandler.prototype.createText = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    var textObj = {
        name: req.body.name,
        text: req.body.text,
        locale: req.body.locale || conf.app.defaultLocale
    };
    content.createText(textObj, onSuccess, onError)
};

ApiHandler.prototype.deleteText = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    content.deleteText(req.params.id, onSuccess, onError)
};


ApiHandler.prototype.getPageList = function(req, res) {
    var onSuccess = function(pages) {
        return res.send(pages);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.getPageList(onSuccess, onError);
};


ApiHandler.prototype.getPage = function(req, res) {
    var onSuccess = function(contentMap) {
        res.send(contentMap);
    };
    content.getPageText(req.params.id, onSuccess);
};

ApiHandler.prototype.getPageById = function(req, res) {
    var onSuccess = function(pageObj) {
        res.send(pageObj);
    };
    content.getPageById(req.params.id, onSuccess);
};

ApiHandler.prototype.createPage = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    var pageObj = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        content: req.body.content
    };
    content.createPage(pageObj, onSuccess, onError)
};

ApiHandler.prototype.updatePage = function(req, res) {
    var onSuccess = function(pageObj) {
        return res.send(pageObj)
    };
    var onError = function(err) {
        return res.send(err);
    };

    var pageObj = {
        _id: req.params.id,
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        content: req.body.content
    };

    content.updatePage(pageObj, onSuccess, onError);
};

ApiHandler.prototype.deletePage = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    content.deletePage(req.params.id, onSuccess, onError)
};

//
//
//

ApiHandler.prototype.getDocument = function(request, response) {
    var result = {status:"error"};
    var query = {};
    if (typeof request.params.id != 'undefined') {
        query = { _id: request.params.id };
    }
    content.TextModel.find(query, function(err, docs) {
        if (err) {
            console.log(err);
        } else {
            result = {status : "ok", result : docs };
        }
        response.send(result);
    });
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
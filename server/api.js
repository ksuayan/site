var timeline = require('./timeline-db'),
    content = require('./content-db'),
    conf = require('./conf'),
    util = require('./apputil');

var ApiHandler = function() {
    console.log("Initialized API handler");
};

ApiHandler.prototype.GetTimeline = function(req, res) {
    var onSuccess = function(timeline) {
        return res.send(timeline);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    timeline.GetJobs(onSuccess, onError);
};

ApiHandler.prototype.GetTextList = function(req, res) {
    var onSuccess = function(contentMap) {
        return res.send(contentMap);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.GetTextList(null, onSuccess, onError);
};

ApiHandler.prototype.GetText = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.GetTextById(req.params.id, onSuccess, onError);
};

ApiHandler.prototype.UpdateText = function(req, res) {
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
    content.UpdateText(textObj, onSuccess, onError);
};

ApiHandler.prototype.CreateText = function(req, res) {
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
    content.CreateText(textObj, onSuccess, onError)
};

ApiHandler.prototype.DeleteText = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    content.DeleteText(req.params.id, onSuccess, onError)
};


//
//
//

ApiHandler.prototype.GetPageList = function(req, res) {
    var onSuccess = function(pages) {
        return res.send(pages);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    content.GetPageList(onSuccess, onError);
};


ApiHandler.prototype.GetPage = function(req, res) {
    var onSuccess = function(contentMap) {
        res.send(contentMap);
    };
    content.GetPageText(req.params.id, onSuccess);
};

ApiHandler.prototype.GetPageById = function(req, res) {
    var onSuccess = function(pageObj) {
        res.send(pageObj);
    };
    content.GetPageById(req.params.id, onSuccess);
};

ApiHandler.prototype.CreatePage = function(req, res) {
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
    content.CreatePage(pageObj, onSuccess, onError)
};

ApiHandler.prototype.UpdatePage = function(req, res) {
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

    content.UpdatePage(pageObj, onSuccess, onError);
};

ApiHandler.prototype.DeletePage = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    content.DeletePage(req.params.id, onSuccess, onError)
};

//
//
//

ApiHandler.prototype.GetDocument = function(request, response) {
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


ApiHandler.prototype.SaveDocument = function(request, response) {
    var doc = {
        title : request.body.title,
        body : request.body.body
    };
    var instance = new content.model(doc);
    instance.save();
    response.send({status:"ok"});
};


module.exports = new ApiHandler();
var timeline = require('./timeline-db'),
    content = require('./content-db'),
    locations = require('./locations-db'),
    conf = require('./conf'),
    util = require('./apputil'),
    Twitter = require('twitter-node-client').Twitter;

var twitterClient = new Twitter(conf.app.twitter);

var ApiHandler = function() {
    console.log("Initialized API handler");
};

ApiHandler.prototype.twitter = function(request, response) {
    var onError = function (err, response, body) {
        response.send({"error": err});
    },
    onSuccess = function (data) {
        var obj = JSON.parse(data);
        response.send({"status":"ok","data": obj});
    };
    twitterClient.getUserTimeline(
        {screen_name:"ksuayan", count:'10'},
        onError, onSuccess);
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


// ------------------------

ApiHandler.prototype.getLocations = function(req, res) {
    var onSuccess = function(locations) {
        return res.send(locations);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    locations.getLocations(onSuccess, onError);
};

ApiHandler.prototype.getLocationById = function(req, res) {
    var onSuccess = function(locationObj) {
        return res.send(locationObj);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    locations.getLocationById(req.params.id, onSuccess, onError);
};

ApiHandler.prototype.getLocationsNearPoint = function(req, res) {
    var onSuccess = function(locationObj) {
        return res.send(locationObj);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };

    var point = req.params.point.split(","),
        maxDistance = req.params.maxDistance ? parseFloat(req.params.maxDistance) : 8.0,
        numericList = util.toNumericList(point);
    locations.getLocationsNearPoint(numericList, maxDistance, onSuccess, onError);
};

ApiHandler.prototype.getLocationsWithin = function(req, res) {
    var onSuccess = function(locationObj) {
        return res.send(locationObj);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    var seLatLng = util.toNumericList(req.params.swLatLng.split(",")),
        nwLatLng = util.toNumericList(req.params.neLatLng.split(","));
    locations.getLocationsWithin(seLatLng, nwLatLng, onSuccess, onError);
};

ApiHandler.prototype.updateLocation = function(req, res) {
    var onSuccess = function(location) {
        return res.send(location);
    };
    var onError = function(err) {
        return res.send(err);
    };
    var locationObj = {
        _id: req.params.id,
        name: req.body.name,
        description: req.body.description
    };
    locations.updateLocation(locationObj, onSuccess, onError);
};

ApiHandler.prototype.createLocation = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    var locationObj = {
        name: req.body.name,
        description: req.body.description
    };
    locations.createLocation(locationObj, onSuccess, onError)
};

ApiHandler.prototype.deleteLocation = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    locations.deleteLocation(req.params.id, onSuccess, onError)
};

module.exports = new ApiHandler();
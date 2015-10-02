var timeline = require('./timeline-db'),
    content = require('./content-db'),
    locations = require('./locations-db'),
    conf = require('./conf'),
    util = require('./apputil'),
    chatServer = require('./chat-server'),

    Twitter = require('twitter-node-client').Twitter,
    Vimeo = require('vimeo').Vimeo,
    Flickr = require('flickrapi');

var flickrClient = null,
    twitterClient = null,
    vimeoClient = null,
    vimeoConfig = conf.vimeo,
    streamCollection = "stream";

var ApiHandler = function() {
    try {
        var FlickrOptions = {
            api_key: process.env['FLICKR_KEY'],
            secret: process.env['FLICKR_USER_ID'],
            user_id: process.env['FLICKR_SECRET'],
            access_token: process.env['FLICKR_ACCESS_TOKEN'],
            access_token_secret: process.env['FLICKR_ACCESS_TOKEN_SECRET'],
            progress: false,
            silent: true,
            nobrowser: true
        };
        Flickr.authenticate(FlickrOptions, function(error, flickr) {
            flickrClient = flickr;
        });
    } catch (err) {
        console.log("Error Flickr init: ", err);
    }

    try {
        twitterClient = new Twitter(conf.twitter);
    } catch (err) {
        console.log("Error Twitter init: ", err);
    }

    try {
        vimeoClient = new Vimeo(vimeoConfig.clientId, vimeoConfig.clientSecret, vimeoConfig.accessToken);
    } catch (err) {
        console.log("Error Vimeo init: ", err);
    }
    console.log("Initialized API handler");
};

ApiHandler.prototype.twitter = function(request, response) {
    if (twitterClient) {
        var onError = function (err, res, body) {
            response.send({"error": err});
        },
        onSuccess = function (data) {
            var obj = JSON.parse(data);
            response.send({"status":"ok","data": obj});
        };
        twitterClient.getUserTimeline({
            screen_name:"ksuayan",
            count:'20'
        }, onError, onSuccess);
    }
};


ApiHandler.prototype.importTwitterFeed = function(req, res) {

    if (twitterClient) {
        var getMinAttributeValue = function(key, list) {
            var minValue = 0;
            if (list.length === 1) {
                minValue = list[0][key];
            } else if (list.length > 1) {
                minValue = list[0][key];
                for (var i= 1, n=list.length; i<n; i++) {
                    if (list[i][key] < minValue) {
                        minValue = list[i][key];
                    }
                }
            }
            return minValue;
        };
        var throttleInterval = 500,
            totalDocs = 0,
        query = {
            screen_name:"ksuayan",
            count: 200
        },
        onError = function (err, res, body) {
            res.send({"error": err});
        },
        onSuccess = function (data) {
            var twitterData = JSON.parse(data);
            if (twitterData && twitterData.length) {
                var normalized = content.normalizeList(twitterData, content.normalizeTwitter),
                    current_max_id = getMinAttributeValue("sourceId", normalized);

                totalDocs = totalDocs + normalized.length;
                console.log("current_max_id", current_max_id);
                content.saveDocumentList(streamCollection, normalized,

                    function(okDocs){
                        chatServer.message("twitter saved: " + okDocs.length);
                        console.log("twiter saved: ", okDocs.length);
                        if (okDocs.length < query.count) {
                            chatServer.message("twitter import done. " + totalDocs);
                            res.send({"status": "ok", "total": totalDocs});
                        } else {
                            getTwitterData(current_max_id);
                        }
                    },

                    function(errDocs){
                        console.log("errDocs", errDocs.length);
                    });
            } else {
                res.send({"status":"ok"});
            }
        };

        var getTwitterData = function(max_id) {
            if (max_id) {
                query.max_id = max_id;
            }
            setTimeout(function(){
                twitterClient.getUserTimeline(query, onError, onSuccess);
            }, throttleInterval);
        };

        chatServer.message("twitter import started");
        getTwitterData(null);
    }
};


ApiHandler.prototype.importVimeoFeed = function(req, res) {

    if (vimeoClient) {
        var totalDocs = 0,
            query = { page: 0, count:25 },
            onError = function (err, res, body) {
                res.send({"error": err});
            },
            onSuccess = function (body) {
                var vimeoData = body.data;
                if (vimeoData && vimeoData.length) {
                    var normalized = content.normalizeList(vimeoData, content.normalizeVimeo);
                    totalDocs = totalDocs + normalized.length;
                    content.saveDocumentList(streamCollection, normalized,
                        function(okDocs){
                            chatServer.message("vimeo saved: " + okDocs.length);
                            console.log("saved", okDocs.length);
                            if (normalized.length === query.count) {
                                getVimeoData();
                            } else {
                                chatServer.message("vimeo import done. " + totalDocs);
                                res.send({"status": "ok", "total": totalDocs});
                            }
                        },
                        function(errDocs){
                            console.log("errDocs", errDocs.length);
                        });
                } else {
                    res.send({"status":"ok"});
                }
            };
        var getVimeoData = function() {
            query.page++;
            vimeoClient.request({
                path: '/me/videos',
                query : query
            }, function (error, body, status_code, headers) {
                if (error) {
                    onError(error);
                } else {
                    onSuccess(body);
                }
            });
        };
        chatServer.message("start vimeo import.");
        getVimeoData();
    }
};

ApiHandler.prototype.vimeo = function(request, response) {
    var count = (request.params.count && request.params.count < 30) ? request.params.count : 5;

    if (vimeoClient) {
        vimeoClient.request({
            path: '/me/videos',
            query : {
                page : 1,
                per_page : 10
            }
        }, function (error, body, status_code, headers) {
            if (error) {
                response.send({"error": error});
            } else {
                response.send({
                    "status": "ok",
                    "statusCode": status_code,
                    "headers": headers,
                    "body": body});
            }
        });
    }
};

ApiHandler.prototype.flickr = function(request, response) {
    var count = (request.params.count && request.params.count < 200) ? request.params.count : 50;
    var onResponse = function(err, result) {
        if (err) {
            response.send({"error": err});
        } else {
            response.send({"status": "ok", "data": result});
        }
    };
    if (flickrClient) {
        flickrClient.people.getPhotos({
            api_key: conf.flickr.api_key,
            user_id: "ksuayan",
            page: 1,
            per_page: 500,
            authenticated: true
        }, onResponse);
    }
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

ApiHandler.prototype.getTextById = function(req, res) {
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
        return res.send(textObj);
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
        locale: req.body.locale || conf.defaultLocale
    };
    content.createText(textObj, onSuccess, onError);
};

ApiHandler.prototype.deleteText = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    content.deleteText(req.params.id, onSuccess, onError);
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


ApiHandler.prototype.getPageText = function(req, res) {
    var onSuccess = function(contentMap) {
        res.send(contentMap);
    };
    var onError = function(err) {
        return res.send(util.defaultError);
    };
    var page = (req.params.page) ? req.params.page : "home";
    content.getPageText(page, onSuccess, onError);
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
        body: req.body.body,
        content: req.body.content
    };
    content.createPage(pageObj, onSuccess, onError);
};

ApiHandler.prototype.updatePage = function(req, res) {
    var onSuccess = function(pageObj) {
        return res.send(pageObj);
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
        body: req.body.body,
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
    content.deletePage(req.params.id, onSuccess, onError);
};

//
//
//

ApiHandler.prototype.getDocument = function(request, response) {
    var result = {status:"error"};
    var query = {};
    if (typeof request.params.id !== 'undefined') {
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
        latLng = util.toNumericList(point);
    locations.getLocationsNearPoint(latLng, maxDistance, onSuccess, onError);
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
        description: req.body.description,
        address: req.body.address,
        url: req.body.url,
        loc: req.body.loc,
        styleHash: req.body.styleHash
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
        description: req.body.description,
        address: req.body.address,
        url: req.body.url,
        loc: {
            coordinates: req.body.loc.coordinates,
            type: "Point"
        },
        styleHash: req.body.styleHash
    };
    locations.createLocation(locationObj, onSuccess, onError);
};

ApiHandler.prototype.deleteLocation = function(req, res) {
    var onSuccess = function(textObj) {
        return res.send(textObj);
    };
    var onError = function(err) {
        return res.send(err);
    };
    locations.deleteLocation(req.params.id, onSuccess, onError);
};

module.exports = new ApiHandler();
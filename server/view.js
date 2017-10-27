var content = require('./content-db'),
    locations = require('./locations-db'),
    moment = require('moment');

var ViewHandler = function () {
        console.log("Initialized WebView handler");
    },
    CONTENT_NOTFOUND = "content/notfound",
    CONTENT_HOME ="content/home",
    LAYOUT_VIEW = "layouts/view",
    LAYOUT_MAP = "layouts/map",
    LAYOUT_LOCATION = "layouts/location";
/**
 * JADE template extension points.
 * Static functions.
 *
 * @type {{fromNow: ViewHandler.fn.fromNow}}
 */
ViewHandler.fn = {
    fromNow: function (value) {
        return moment(value).fromNow();
    }
};

/**
 * Page not found handler.
 * @param req
 * @param res
 */
ViewHandler.prototype.notfound = function(req, res) {
    res.render(CONTENT_NOTFOUND);
};

/**
 * Home Page loader. Retrieve only 'published' articles
 * and sort descending by date updated.
 *
 * @param req
 * @param res
 */
ViewHandler.prototype.homeView = function (req, res) {
    var successHandler = function (stories) {
        res.render(CONTENT_HOME, {
            linkTitle: true,
            stories: stories,
            user: req.user,
            fn: ViewHandler.fn
        });
    },
    errorHandler = function () {
        res.render(CONTENT_NOTFOUND);
    },
    query = {"status":"published"};
    content.getPageList(query, "-dateUpdated", successHandler, errorHandler);
};

/**
 * Simple layout passthrough.
 * @param req
 * @param res
 */
ViewHandler.prototype.content = function(req, res) {
    res.render('content/'+req.params.page, {user: req.user});
};

/**
 * Pull content node from MongoDB by page name.
 * If the story has a layout declared, render that.
 *
 * @param req
 * @param res
 */
ViewHandler.prototype.pageView = function (req, res) {
    var page = req.params.page,
        view = LAYOUT_VIEW,
        onSuccess = function (story) {
            if (story) {
                if (story.layout) {
                    view = "layouts/"+story.layout;
                }
                res.render(view, {
                    page:  page,
                    pagePath: "/page/"+page,
                    story: story,
                    user:  req.user,
                    fn:    ViewHandler.fn
                });
            } else {
                onError();
            }
        },
        onError = function () {
            res.render(CONTENT_NOTFOUND);
        };
    content.getPageByName(page, onSuccess, onError);
};

ViewHandler.prototype.jade = function (req, res) {
    var pseudoPath = req.path.toString();
    pseudoPath = pseudoPath.replace("/jade/","");

    res.render(pseudoPath, {
        user: req.user,
        fn: ViewHandler.fn
    });
};

ViewHandler.prototype.mapView = function (req, res) {
    var id = req.params.id,
        view = LAYOUT_MAP,
        onSuccess = function (map) {
            if (map) {
                res.render(view, {
                    fn: ViewHandler.fn,
                    id: id,
                    map: map,
                    pagePath: "/map/"+id,
                    story: {
                        title: "suayan.com | Map | " + map.name
                    }

                });
            } else {
                onError();
            }
        },
        onError = function () {
            res.render(CONTENT_NOTFOUND);
        };
    locations.getMapDocumentById(id, onSuccess, onError);
};

ViewHandler.prototype.locationView = function (req, res) {
    var id = req.params.id,
        onSuccess = function (location) {
            if (location) {
                res.render(LAYOUT_LOCATION, {
                    fn: ViewHandler.fn,
                    id: id,
                    mapObj: location,
                    pagePath: "/location/"+id,
                    story: {
                        title: "suayan.com | Location | " + location.name
                    }
                });
            } else {
                onError();
            }
        },
        onError = function () {
            res.render(CONTENT_NOTFOUND);
        };
    locations.getLocationById(id, onSuccess, onError);
};


ViewHandler.prototype.listDocuments = function (req, res) {
    content.getDocuments(req.params.id, function (result) {
        res.render('listDocuments', {jsondb: result });
    });
};

ViewHandler.prototype.viewDocument = function (req, res) {
    if (!req.params.id) {
        res.render('viewVector');
    } else {
        content.getDocuments(req.params.id, function (result) {
            res.render('viewVector', {doc: result[0] });
        });
    }
};

ViewHandler.prototype.processFileUploads = function (req, res) {
    var onSuccess = function (okFiles) {
        return res.render("content/upload-success", {
          okFiles: okFiles
        });
    },
    onError = function (err) {
        return res.render("errors", err);
    };
    content.processFileUploads(req.files, onSuccess, onError);
};

module.exports = new ViewHandler();

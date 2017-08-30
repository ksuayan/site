var content = require('./content-db'),
    moment = require('moment');

var ViewHandler = function () {
    console.log("Initialized WebView handler");
};

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
    res.render('content/notfound');
};

/**
 * Home Page loader.
 * @param req
 * @param res
 */
ViewHandler.prototype.homeView = function (req, res) {
    var successHandler = function (stories) {
        res.render('content/home', {
            linkTitle: true,
            stories: stories,
            user: req.user,
            fn: ViewHandler.fn
        });
    },
    errorHandler = function () {
        res.render('content/notfound');
    };
    content.getPageList(successHandler, errorHandler);
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
 *
 * @param req
 * @param res
 */
ViewHandler.prototype.pageView = function (req, res) {
    var page = req.params.page,
        onError = function () {
            res.render('content/notfound');
        },
        onSuccess = function (story) {
            if (story) {
                res.render('layouts/view', {
                    page: page,
                    story: story, // turn off
                    user: req.user,
                    fn: ViewHandler.fn
                });
            } else {
                onError();
            }
        };
    content.getPageByName(page, onSuccess, onError);
};

ViewHandler.prototype.createPage = function (req, res) {
    var pageObj = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        body: req.body.body,
        content: req.body.textId
    };
    var onSuccess = function (content) {
        return res.render("content/db/pageEdit",
            { content: content,
              fn: ViewHandler.fn,
              user: req.user
            });
    };
    var onError = function (err) {
        return res.render("test", err);
    };
    content.createPage(pageObj, onSuccess, onError);
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
    };
    var onError = function (err) {
        return res.render("errors", err);
    };
    content.processFileUploads(req.files, onSuccess, onError);
};

module.exports = new ViewHandler();

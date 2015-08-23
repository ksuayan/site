var content = require('./content-db');
var moment = require('moment');

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
ViewHandler.prototype.fullScreen = function (req, res) {
    content.getPageText("home", function (content) {
            res.render('content/home', {content: content});
        },
        function () {
            res.render('content/notfound');
        });
};

ViewHandler.prototype.pageEdit = function (req, res) {
    var locale = null;
    if (req.params.locale) {
        locale = req.params.locale;
    }
    content.getTextList(locale, function (content) {
        res.render('content/db/pageEdit', {content: content, fn: ViewHandler.fn });
    });
};

/**
 * Simple layout passthrough.
 * @param req
 * @param res
 */
ViewHandler.prototype.content = function(req, res) {
    res.render('content/'+req.params.page);
};
/**
 * Pull content node from MongoDB by page name.
 *
 * @param req
 * @param res
 */
ViewHandler.prototype.pageView = function (req, res) {
    var page = req.params.page;
    var onError = function () {
        res.render('content/notfound');
    };
    var onSuccess = function (content) {
        if (content[page]) {
            res.render('layouts/pageView', {content: content[page]});
        } else {
            onError();
        }
    };
    content.getPageText(page, onSuccess, onError);
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
        return res.render("content/db/pageEdit", {content: content, fn: ViewHandler.fn });
    };
    var onError = function (err) {
        return res.render("test", err);
    };
    content.createPage(pageObj, onSuccess, onError);
};

ViewHandler.prototype.textList = function (req, res) {
    var locale = null;
    if (req.params.locale) {
        locale = req.params.locale;
    }
    content.getTextList(locale, function (content) {
        res.render('content/db/textList', {content: content, fn: ViewHandler.fn });
    });
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


module.exports = new ViewHandler();

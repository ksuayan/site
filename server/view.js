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

ViewHandler.prototype.fullScreen = function (req, res) {
    content.getPageText("home", function (content) {
        res.render('layouts/fullscreen', {content: content});
    });
};

ViewHandler.prototype.core = function (req, res) {
    content.getPageText("home", function (content) {
        res.render('layouts/core', {content: content});
    });
};

ViewHandler.prototype.searchDemo = function (req, res) {
    content.getPageText("home", function (content) {
        res.render('layouts/search', {content: content});
    });
};

ViewHandler.prototype.pageEdit = function (req, res) {
    var locale = null;
    if (req.params.locale) {
        locale = req.params.locale;
    }
    content.getTextList(locale, function (content) {
        res.render('pageEdit', {content: content, fn: ViewHandler.fn });
    });
};

ViewHandler.prototype.paris = function (req, res) {
    res.render('layouts/paris');
};

ViewHandler.prototype.video = function (req, res) {
    res.render('content/video');
};

ViewHandler.prototype.live = function (req, res) {
    res.render('layouts/live');
};

ViewHandler.prototype.graph = function (req, res) {
    res.render('layouts/graph');
};

ViewHandler.prototype.canvas = function (req, res) {
    res.render('layouts/canvas');
};

ViewHandler.prototype.transit = function (req, res) {
    res.render('layouts/transit');
};

ViewHandler.prototype.pageView = function (req, res) {
    var page = req.params.page;
    var onError = function () {
        res.render('notfound');
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
        content: req.body.textId
    };
    var onSuccess = function (content) {
        return res.render("pageEdit", {content: content, fn: ViewHandler.fn });
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
        res.render('textList', {content: content, fn: ViewHandler.fn });
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

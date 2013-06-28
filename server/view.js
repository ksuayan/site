var content = require('./content-db');
var moment = require('moment');

var ViewHandler = function() {
    console.log("Initialized WebView handler");
};

ViewHandler.fn = {
    fromNow: function(value){
        return moment(value).fromNow();
    }
};

ViewHandler.prototype.Home = function(req, res) {
    content.GetPageText("home", function(content){
        res.render('layouts/home', {content : content});
    });
};

ViewHandler.prototype.PageEdit = function(req, res) {
    var locale = null;
    if (req.params.locale) locale = req.params.locale;
    content.GetTextList(locale, function(content){
        res.render('pageEdit', {content : content, fn : ViewHandler.fn });
    });
};

ViewHandler.prototype.Live = function(req, res) {
    res.render('layouts/live');
};

ViewHandler.prototype.Graph = function(req, res) {
    res.render('layouts/graph');
};

ViewHandler.prototype.Canvas = function(req, res) {
    res.render('layouts/canvas');
};

ViewHandler.prototype.PageView = function(req, res) {
   var page = req.params.page;

   var onError = function() {
       res.render('notfound');
   };

   var onSuccess = function(content){
     if (content[page]) {
       res.render('layouts/pageView', {content : content[page]});
     } else {
       onError();
     }

   };

   content.GetPageText(page, onSuccess, onError);
};

ViewHandler.prototype.CreatePage = function(req, res) {
    var pageObj = {
        name: req.body.name,
        title: req.body.title,
        description: req.body.description,
        keywords: req.body.keywords,
        content: req.body.textId
    };
    var onSuccess = function(content) {
        return res.render("pageEdit", {content : content, fn : ViewHandler.fn });
    };
    var onError = function(err) {
        return res.render("test", err);
    };
    content.CreatePage(pageObj, onSuccess, onError);
};


ViewHandler.prototype.TextList = function(req, res) {
    var locale = null;
    if (req.params.locale) locale = req.params.locale;
    content.GetTextList(locale, function(content){
        res.render('textList', {content : content, fn : ViewHandler.fn });
    });
};

ViewHandler.prototype.ListDocuments = function(req, res) {
    content.GetDocuments(req.params.id, function(result) {
        res.render('listDocuments', {jsondb : result });
    });
};

ViewHandler.prototype.ViewDocument = function(req, res) {
    if (!req.params.id) {
       res.render('viewVector');
    } else {
        content.GetDocuments(req.params.id, function(result) {
            res.render('viewVector', {doc : result[0] });
        });
    }
};


module.exports = new ViewHandler();
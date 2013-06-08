var mongoose = require('mongoose'),
    conf = require('./conf'),
    util = require('./apputil');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var Document = new Schema({
    title       : {type: String, default: "Untitled"},
    body        : {type: String, default: ""},
    status      : {type: String, default: "new"},
    locale      : {type: String, default: "en_US"},
    contentType : {type: String, default: "text/html"},
    date        : {type: Date, default: Date.now}
});

var TextContent = new Schema({
    text        : {type: String, default: ""},
    name        : {type: String, default: ""},
    locale      : {type: String, default: "en_US"},
    contentType : {type: String, default: "text/html"},
    dateCreated : {type: Date, default: Date.now}
});

var Page = new Schema({
    name        : {type: String, default: ""},
    title       : {type: String, default: ""},
    description : {type: String, default: ""},
    keywords    : {type: String, default: ""},
    content     : [{ type: Schema.Types.ObjectId, ref: 'text' }]
});

var DocumentDB = function(){
    console.log("Initialized DocumentDB.");
    this.locale = conf.app.defaultLocale;
    this.db = mongoose.createConnection(conf.app.mongoURL);
    this.TextModel = this.db.model('text', TextContent);
    this.PageModel = this.db.model('page', Page);
};

DocumentDB.prototype.GetTextList = function(locale, onSuccess, onError) {
    var query = {};
    if (!locale) { query.locale = this.locale;}
    var that = this;
    this.TextModel
    .find(query)
    .sort("-dateCreated")
    .exec(function (err, texts) {
        if (err) return util.HandleError(err, onError);
        if (typeof onSuccess ==='function') {
            onSuccess(texts);
        }
    });
};

DocumentDB.prototype.GetTextById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.TextModel
    .findOne(query)
    .exec(function (err, textObj) {
        if (err) return util.HandleError(err, onError);
        if (typeof onSuccess ==='function') {
            onSuccess(textObj);
        }
    });
};

DocumentDB.prototype.UpdateText = function(textObj, onSuccess, onError) {
    this.TextModel
    .findById(textObj._id)
    .exec(function(err, found){
        if (err) return util.HandleError(err, onError);
        if (found) {
            found.name = textObj.name;
            found.text = textObj.text;
            found.locale = textObj.locale;
            found.save(function(err){
                if (err) return util.HandleError(err, onError);
                if (typeof onSuccess ==='function') {
                    onSuccess(textObj);
                }
            });
        } else {
            onError({status:"error", reason: "id not found: " + textObj._id});
        }
    });
};

DocumentDB.prototype.CreateText = function(textObj, onSuccess, onError) {
    var that = this;
    this.TextModel
    .findOne({name: textObj.name})
    .exec(function(err, found){
        if (!err && found) {
            onError({status:"error", reason:"text.name exists: "+textObj.name});
            return;
        } else {
            var text = new that.TextModel(textObj);
            text.save(function(err){
                if (err) return util.HandleError(err, onError);
                if (typeof onSuccess ==='function') {
                   onSuccess(text);
                }
            });
        }
    });
};

DocumentDB.prototype.DeleteText = function(id, onSuccess, onError) {
    this.TextModel
    .findById(id)
    .exec(function(err, textObj){
        if (err) return util.HandleError(err, onError);
        if (textObj){
            textObj.remove(function(deleteError){
                if (deleteError) return util.HandleError(deleteError, onError);
                onSuccess(textObj);
            });
        } else {
            onError({status:"error",reason: "id not found: " + id});
        };
    });
};




DocumentDB.prototype.GetPageById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.PageModel
        .findOne(query)
        .exec(function (err, pageObj) {
            if (err) return util.HandleError(err, onError);
            if (typeof onSuccess ==='function') {
                onSuccess(pageObj);
            }
        });
};

DocumentDB.prototype.GetPageText = function(page, onSuccess, onError) {
    var result = {status:"error"};
    var query = {name: page};
    var that = this;
    this.PageModel
    .findOne(query)
    .populate("content")
    .exec(function (err, page) {
        if (err) return util.HandleError(err);
        var contentMap = that.GetPageContentMap(page);
        if (!contentMap && typeof onError ==='function') {
            onError(err);
            return;
        }
        if (typeof onSuccess === 'function') {
            onSuccess(contentMap);
        } 
    });
};


DocumentDB.prototype.GetPageContentMap = function(page) {
    if (!page || !page.content || !page.content.length) return null;
    var contentMap = {};
    var contentArray = page.content;
    for (var i=0,n=contentArray.length;i<n;i++){
        var textObj = contentArray[i];
        if (textObj.name && textObj.text) {
            contentMap[textObj.name] = textObj.text;
        }
    }
    return contentMap;
};


DocumentDB.prototype.CreatePage = function(pageObj, onSuccess, onError) {
    var that = this;
    this.PageModel
    .findOne({name: pageObj.name})
    .exec(function(err, found){
        if (!err && found) {
            onError({status:"error", reason:"page.name exists: "+pageObj.name});
            return;
        } else {
            var page = new that.PageModel(pageObj);
            page.save(function(err){
                if (err) return util.HandleError(err, onError);
                if (typeof onSuccess ==='function') {
                   onSuccess(page);
                }
            });
        }
    });
};

DocumentDB.prototype.UpdatePage = function(pageObj, onSuccess, onError) {
    this.PageModel
        .findById(pageObj._id)
        .exec(function(err, found){
            if (err) return util.HandleError(err, onError);
            if (found) {
                found.name = pageObj.name;
                found.title = pageObj.title;
                found.description = pageObj.description;
                found.keywords = pageObj.keywords;
                if (pageObj.content && pageObj.content.length)
                    found.content = pageObj.content.split("|");
                else
                    found.constent = null;
                found.save(function(err){
                    if (err) return util.HandleError(err);
                    if (typeof onSuccess ==='function') {
                        onSuccess(pageObj);
                    }
                });
            } else {
                onError({status:"error", reason: "id not found: " + pageObj._id});
            }
        });
};

DocumentDB.prototype.DeletePage = function(id, onSuccess, onError) {
    this.PageModel
        .findById(id)
        .exec(function(err, pageObj){
            if (err) return util.HandleError(err, onError);
            if (pageObj){
                pageObj.remove(function(deleteError){
                    if (deleteError) return util.HandleError(deleteError, onError);
                    onSuccess(pageObj);
                });
            } else {
                onError({status:"error",reason: "id not found: " + id});
            };
        });
};

DocumentDB.prototype.GetPageList = function(onSuccess, onError) {
    var query = {};
    var that = this;
    this.PageModel
    .find(query)
    .sort("name")
    .populate("content")
    .exec(function (err, pages) {
        if (err) return util.HandleError(err, onError);
        if (typeof onSuccess ==='function') {
            onSuccess(pages);
        }
    });
};

DocumentDB.prototype.GetDocuments = function(id, callback) {
    var result = null;
    var query = {};
    if (id) query._id = id;
    this.model.find(query, function(err,docs){
        if (err) return util.HandleError(err);
        if (callback && typeof callback ==='function') {
            callback(docs);
        }
    });
};

DocumentDB.prototype.SaveDocument = function(doc) {
    var instance = new this.model(doc);
    instance.save();
};

module.exports = new DocumentDB();

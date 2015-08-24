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
    date        : {type: Date,   default: Date.now}
});

var TextContent = new Schema({
    text        : {type: String, default: ""},
    name        : {type: String, default: ""},
    locale      : {type: String, default: "en_US"},
    contentType : {type: String, default: "text/html"},
    dateCreated : {type: Date,   default: Date.now}
});

var Page = new Schema({
    dateCreated : {type: Date,   default: Date.now},
    name        : {type: String, default: ""},
    title       : {type: String, default: ""},
    description : {type: String, default: ""},
    keywords    : {type: String, default: ""},
    body        : {type: String, default: ""},
    content     : [{ type: Schema.Types.ObjectId, ref: 'text' }]
});

var Pic = new Schema({
    width : {type: Number,  default: ""},
    height : {type: Number, default: ""},
    path : {type: String,   default: ""}
});

var TileContent = new Schema({
    name:        {type: String, default: ""},
    title:       {type: String, default: ""},
    description: {type: String, default: ""},
    keywords :   {type: String, default: ""},
    pageTitle:   {type: String, default: ""},
    subhead :    {type: String, default: ""},
    body :       [String],
    image :      [Pic],
    tech :       [String]
});



var DocumentDB = function(){
    console.log("Initialized DocumentDB.");
    this.locale = conf.app.defaultLocale;
    this.db = mongoose.createConnection(conf.app.mongoURL);
    this.TextModel = this.db.model('text', TextContent);
    this.PageModel = this.db.model('page', Page);
    this.TileModel = this.db.model('tile', TileContent);
};

DocumentDB.prototype.getTextList = function(locale, onSuccess, onError) {
    var query = {};
    if (!locale) { query.locale = this.locale;}
    var that = this;
    this.TextModel
    .find(query)
    .sort("-dateCreated")
    .exec(function (err, texts) {
        if (err) {
            return util.HandleError(err, onError);
        }
        if (typeof onSuccess ==='function') {
            onSuccess(texts);
        }
    });
};

DocumentDB.prototype.getTextById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.TextModel
    .findOne(query)
    .exec(function (err, textObj) {
        if (err) {
            return util.HandleError(err, onError);
        }
        if (typeof onSuccess ==='function') {
            onSuccess(textObj);
        }
    });
};

DocumentDB.prototype.updateText = function(textObj, onSuccess, onError) {
    this.TextModel
    .findById(textObj._id)
    .exec(function(err, found){
        if (err) {
            return util.HandleError(err, onError);
        }
        if (found) {
            found.name = textObj.name;
            found.text = textObj.text;
            found.locale = textObj.locale;
            found.save(function(err){
                if (err) {
                    return util.HandleError(err, onError);
                }
                if (typeof onSuccess ==='function') {
                    onSuccess(textObj);
                }
            });
        } else {
            onError({status:"error", reason: "id not found: " + textObj._id});
        }
    });
};

DocumentDB.prototype.createText = function(textObj, onSuccess, onError) {
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
                if (err) {
                    return util.HandleError(err, onError);
                }
                if (typeof onSuccess ==='function') {
                   onSuccess(text);
                }
            });
        }
    });
};

DocumentDB.prototype.deleteText = function(id, onSuccess, onError) {
    this.TextModel
    .findById(id)
    .exec(function(err, textObj){
        if (err) {
            return util.HandleError(err, onError);
        }
        if (textObj){
            textObj.remove(function(deleteError){
                if (deleteError) {
                    return util.HandleError(deleteError, onError);
                }
                onSuccess(textObj);
            });
        } else {
            onError({status:"error",reason: "id not found: " + id});
        }
    });
};



DocumentDB.prototype.getPageList = function(onSuccess, onError) {
    var query = {};
    var that = this;
    this.PageModel
        .find(query)
        .sort("name")
        .populate("content")
        .exec(function (err, pages) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(pages);
            }
        });
};

DocumentDB.prototype.getPageById = function(id, onSuccess, onError) {
    var query = {_id: id};
    this.PageModel
        .findOne(query)
        .exec(function (err, pageObj) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(pageObj);
            }
        });
};

DocumentDB.prototype.getPageByName = function(name, onSuccess, onError) {
    var query = {name: name};
    this.PageModel
        .findOne(query)
        .exec(function (err, pageObj) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(pageObj);
            }
        });
};

DocumentDB.prototype.createPage = function(pageObj, onSuccess, onError) {
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
                if (err) {
                    return util.HandleError(err, onError);
                }
                if (typeof onSuccess ==='function') {
                   onSuccess(page);
                }
            });
        }
    });
};

DocumentDB.prototype.updatePage = function(pageObj, onSuccess, onError) {
    this.PageModel
        .findById(pageObj._id)
        .exec(function(err, found){
            if (err) {
                return util.HandleError(err, onError);
            }
            if (found) {
                found.name = pageObj.name;
                found.title = pageObj.title;
                found.description = pageObj.description;
                found.keywords = pageObj.keywords;
                found.body = pageObj.body;
                found.content = pageObj.content;
                found.save(function(err){
                    if (err) {
                        return util.HandleError(err);
                    }
                    if (typeof onSuccess ==='function') {
                        onSuccess(pageObj);
                    }
                });
            } else {
                onError({status:"error", reason: "id not found: " + pageObj._id});
            }
        });
};

DocumentDB.prototype.deletePage = function(id, onSuccess, onError) {
    this.PageModel
        .findById(id)
        .exec(function(err, pageObj){
            if (err) {
                return util.HandleError(err, onError);
            }
            if (pageObj){
                pageObj.remove(function(deleteError){
                    if (deleteError) {
                        return util.HandleError(deleteError, onError);
                    }
                    onSuccess(pageObj);
                });
            } else {
                onError({status:"error",reason: "id not found: " + id});
            }
        });
};


DocumentDB.prototype.getPageText = function(page, onSuccess, onError) {
    var query = {name: page};
    var that = this;
    this.PageModel
        .findOne(query)
        .populate("content")
        .exec(function (err, page) {
            if (err) {
                return util.HandleError(err);
            }
            var contentMap = that.getPageContentMap(page);
            if (!contentMap && typeof onError ==='function') {
                onError(err);
                return;
            }
            if (typeof onSuccess === 'function') {
                onSuccess(contentMap);
            }
        });
};

DocumentDB.prototype.getPageContentMap = function(page) {
    if (!page || !page.content || !page.content.length) {
        return null;
    }
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



DocumentDB.prototype.getDocuments = function(id, callback) {
    var result = null;
    var query = {};
    if (id) {
        query._id = id;
    }
    this.model.find(query, function(err,docs){
        if (err) {
            return util.HandleError(err);
        }
        if (callback && typeof callback ==='function') {
            callback(docs);
        }
    });
};

DocumentDB.prototype.saveDocument = function(doc) {
    var instance = new this.model(doc);
    instance.save();
};

DocumentDB.prototype.createTile = function(tileObj, onSuccess, onError) {
    var that = this;
    this.PageModel
        .findOne({name: tileObj.name})
        .exec(function(err, found){
            if (!err && found) {
                onError({status:"error", reason:"tile.name exists: "+tileObj.name});
                return;
            } else {
                var page = new that.TileModel(tileObj);
                page.save(function(err){
                    if (err) {
                        return util.HandleError(err, onError);
                    }
                    if (typeof onSuccess ==='function') {
                        onSuccess(page);
                    }
                });
            }
        });
};

DocumentDB.prototype.getTileList = function(onSuccess, onError) {
    var query = {};
    var that = this;
    this.TileModel
        .find(query)
        .sort("_id")
        .exec(function (err, pages) {
            if (err) {
                return util.HandleError(err, onError);
            }
            if (typeof onSuccess ==='function') {
                onSuccess(pages);
            }
        });
};

module.exports = new DocumentDB();

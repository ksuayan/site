var mongoClient = require('./mongo-client'),
    mongoose = mongoClient.mongoose,
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

var File = new  Schema({
    dateCreated  : {type: Date,   default: Date.now},
    status       : {type: String, default: "new"},
    fieldname    : {type: String, default: ""},
    originalname : {type: String, default: ""},
    encoding     : {type: String, default: ""},
    mimetype     : {type: String, default: ""},
    destination  : {type: String, default: ""},
    filename     : {type: String, default: ""},
    path         : {type: String, default: ""},
    size         : {type: String, default: ""}
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
    this.locale = conf.defaultLocale;
    this.TextModel = mongoose.model('text', TextContent);
    this.PageModel = mongoose.model('page', Page);
    this.TileModel = mongoose.model('tile', TileContent);
    this.FileModel = mongoose.model('file', File);
    console.log("Initialized DocumentDB.");
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

DocumentDB.prototype.processFileUploads = function(fileArray, onSuccess, onError) {
    var remaining = fileArray.length,
        okFiles = [],
        errFiles = [];
    var checkLast = function() {
            remaining--;
            if (remaining===0) {
                if (errFiles.length) {
                    onError(errFiles);
                } else if (onSuccess && typeof onSuccess ==='function') {
                    onSuccess(okFiles);
                }
            }
        },
        onSaveSuccess = function(okFile){
            okFiles.push(okFile);
            checkLast();
        }, onSaveError = function(err) {
            console.log("save error: ", err);
            errFiles.push(err);
            checkLast();
        };

    for (var i=0,n=fileArray.length; i<n; i++ ) {
        var fileObj = fileArray[i];
        this.updateUploadsDB(fileObj, onSaveSuccess, onSaveError);
    }
};

/**
 * Update our database for each individual file.
 * @param fileObj
 * @param onSuccess
 * @param onError
 */
DocumentDB.prototype.updateUploadsDB = function(fileObj, onSuccess, onError) {
    var that = this;
    var saveFile = function(err, found){
        if (!err && found) {
            onError({status:"error", reason:"file already exists: "+fileObj.name});
            return;
        } else {
            var file = new that.FileModel(fileObj);
            file.save(function(err){
                if (err) {
                    return util.HandleError(err, onError);
                }
                console.log("ok:", fileObj);
                if (typeof onSuccess === 'function') {
                    onSuccess(fileObj);
                }
            });
        }
    };
    this.FileModel
        .findOne({filename: fileObj.filename})
        .exec(saveFile);
};

/**
 * Normalize an array of data with a specified converter.
 * @param data
 * @param converter
 */
DocumentDB.prototype.normalizeList = function(data, converter) {
    var normalized = [];
    if (!data) {
        return null;
    }
    for (var i= 0,n=data.length; i<n; i++) {
        var item = data[i];
        normalized.push(converter(item));
    }
    return normalized;
};
/**
 * Convert a twitter feed into our standard stream format.
 * @param item
 * @returns {{recordType: string, user: (screen_name|*|params.screen_name), dateCreated: Date, id: (*|id|creds.id|test.id|a.id|$scope.location.id), body: (*|text|module.exports.text|e.text|callback.text|TextContent.defaults.text), geo: *, coordinates: (*|LocationObject.loc.coordinates|data.loc.coordinates|coords.coordinates|geoLocation.loc.coordinates|Location.loc.coordinates), source: (*|exports.source|resolver.source|.test_vars.source|expectSources.env.source|defaults.source), entities: (*|CKBUILDER_CONFIG.plugins.entities|NamedNodeMap|CKEDITOR.config.entities)}}
 */
DocumentDB.prototype.normalizeTwitter = function(item) {
    var newObj = {
        type: "twitter",
        sourceId: item.id,
        user: item.user.screen_name,
        dateCreated: new Date(item.created_at),
        body: item.text,
        geo: item.geo,
        coordinates: item.coordinates,
        source: item.source,
        entities: item.entities
    };
    return newObj;
};

DocumentDB.prototype.normalizeVimeo = function(item) {
    var newObj = {
        type: "vimeo",
        sourceId: item.uri,
        user: item.user.uri,
        dateCreated: new Date(item.created_time),
        body: item.embed.html,
        title: item.name,
        description: item.description,
        duration: item.duration,
        pictures: item.pictures
    };
    return newObj;
};

DocumentDB.prototype.saveDocumentList = function(collectionName, docList, onSuccess, onError) {
    var remaining = docList.length,
        okDocs = [],
        errDocs = [];
    var checkLast = function() {
            remaining--;
            if (remaining===0) {
                if (errDocs.length) {
                    onError(errDocs);
                } else if (onSuccess && typeof onSuccess ==='function') {
                    onSuccess(okDocs);
                }
            }
        },
        onSaveSuccess = function(okDoc){
            okDocs.push(okDoc);
            checkLast();
        }, onSaveError = function(err) {
            console.log("save error: ", err);
            errDocs.push(err);
            checkLast();
        };

    for (var i=0,n=docList.length; i<n; i++ ) {
        var docObj = docList[i];
        this.saveDocument(collectionName, docObj, onSaveSuccess, onSaveError);
    }
};

DocumentDB.prototype.saveDocument = function(collectionName, docObj, onSuccess, onError) {
    var collection = mongoClient.db.collection(collectionName),
        query = {
            type: docObj.type,
            sourceId: docObj.sourceId
        },
        sort = {
            dateCreated: 1
        },
        options = {
            new:true,
            upsert:true
        };

    collection.findAndModify(query, sort, docObj, options, function(err, foundDoc) {
        if (err) {
            return util.HandleError(err, onError);
        }
        if (typeof onSuccess === 'function') {
            onSuccess(foundDoc);
        }
    });
};

module.exports = new DocumentDB();


var MongoClient = require('mongodb').MongoClient,
    url = 'mongodb://localhost:27017/site',
    collection = "pages";


var insertDocument = function(db, collection, dbObj, callback) {
    // Get the documents collection
    var collection = db.collection(collection);
    // Insert some documents
    collection.insert(dbObj, function(err, result) {
        callback(result);
    });
};

console.log("WordPress Loader.");


// Use connect method to connect to the Server
MongoClient.connect(url, function(err, db) {
    console.log("Connected correctly to server");

    var docs = require('./output-wp02.json');

    var WordPressLoader = function(){

        var count = 0;

        var onSuccess = function() {
            console.log("Success");
            count++;
            if (count==docs.length) {
                console.log("Loaded: " + count);
            }
        };

        var onError = function() {
            console.log("Error");
            count++;
            if (count==docs.length) {
                console.log("Loaded: " + count);
            }
        };


        var handleResult = function(err, result) {
            console.log("result: ", err, result);
        };

        var cleanup = function(str) {
            if (str) {
                return "<p>" + str
                    .replace(/\r/g,"")
                    .replace(/\n\n/g,"<\/p><p>")
                    .replace(/\\\\\\/g,"\\")
                    .replace(/\\"/g,"") + "</p>";
            }
            return "";
        };

        for (var i= 0,n=docs.length;i<n;i++) {
            if (docs[i].post_status == "publish") {

                var rich_text =  {
                    "type" : "rich_text",
                    "content" : cleanup(docs[i].post_content)
                };

                var dbObj = {
                    title: docs[i].post_title,
                    name: docs[i].post_name,
                    excerpt: cleanup(docs[i].post_excerpt),
                    content: [rich_text],
                    dateCreated: new Date(docs[i].post_date),
                    dateUpdated: new Date(docs[i].post_modified),
                    status: "archived"
                };
                console.log("obj", dbObj);
                insertDocument(db, collection, dbObj, handleResult);
                count++;
            }
        }

        console.log("Total: ", count);
        db.close();
    };

    var wpObj = new WordPressLoader();

});






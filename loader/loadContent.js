var data = require('./content.json');
var content = require('../server/content-db');
var conf = require('../server/conf');

var ContentLoader = function(){
    console.log("Init ContentLoader.");

    var docs = data["text"];
    var page = new content.PageModel({"name":"home"});

    content.TextModel.create(docs, function (err) {
        if (err) return console.log(err);

        if (arguments.length > 1) {
            for (var i=1,n=arguments.length; i<n; i++) {
                page.content.push(arguments[i]);
            }
        };
        page.save();
        console.log("Done.");
    });
};

var ito = new ContentLoader();


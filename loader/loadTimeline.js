var data = require('./timeline.json');
var timelineDB = require('../server/timeline-db');
var conf = require('../server/conf');

var TimelineLoader = function(){
    console.log("Timeline Loader.");

    var docs = data["timeline"];
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


    for (var i= 0,n=docs.length;i<n;i++) {
        var doc = docs[i];
        doc.body = "";

        var tlObj = new timelineDB.JobModel(doc);
        console.log("doc", tlObj);
        tlObj.save();
        // timelineDB.JobModel.CreateJob(doc, onSuccess, onError);
    }
};

var timelineObj = new TimelineLoader();


var fs = require('fs');

var walkParallel = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walkParallel(file, function(err, res) {
                        results = results.concat(res);
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push(file);
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

var walkSerial = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walkSerial(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

var path = "/Users/s0107397/Development/shc/shc-packages/shc-application/src/main/content";

console.log("path:", path);

var filterList = function(list) {
    for (var i= 0, n=list.length; i<n; i++) {
        var filename = list[i].match(/.*\/(.*?)$/);
        console.log(filename);
    }
};

walkParallel(path, function(err, results) {
    if (err) throw err;
    filterList(results);
});
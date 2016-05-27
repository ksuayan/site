var fs = require('fs');

var walkParallel = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function (file) {
            file = dir + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walkParallel(file, function (err, res) {
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

function printLine(line) {
    var text = line.trim();
    if (text) {
        if (text.match(/^#base/)) {
            console.log('>>> ' + text);
        } else {
            console.log('>> ' + text);
        }
    }
}

function readLines(input, printLine) {
    var remaining = '';
    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            printLine(line);
            index = remaining.indexOf('\n');
        }
    });
    input.on('end', function () {
        if (remaining.length > 0) {
            printLine(remaining);
        }
    });
}

var walkSerial = function (dir, done) {
    var results = [];
    fs.readdir(dir, function (err, list) {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    walkSerial(file, function (err, res) {
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

var filterList = function (list) {
    for (var i = 0, n = list.length; i < n; i++) {
        var filename = list[i].match(/.*\/(.*?)$/);
        var fullpath = filename[0];
        var file = filename[1];
        if (file.match(/js.txt/)) {
            var input = fs.createReadStream(fullpath);
            readLines(input, printLine);
        }
    }
};

walkParallel(path, function (err, results) {
    if (err) throw err;
    filterList(results);
});
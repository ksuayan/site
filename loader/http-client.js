'use strict';

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    exec = require('child_process').exec;

var config = {
    saveEnabled: false,
    queueEnabled: true,
    queueInterval: 2000,
    logfile: "progress.log",
    downloadDir: './downloads/',
    doAuthorization: false
};

var commands = {
  mkdir: 'mkdir -p ' + config.downloadDir
};


var hosts = {
    "visual": {
        "host": "visual.suayan.com",
        "port": 80,
        "username": "",
        "password": ""
    },
    "photos": {
        "host": "visual.suayan.com",
        "port": 80,
        "username": "",
        "password": ""
    },
    "img" : {
        "host": "img.suayan.com",
        "port": 80,
        "username": "",
        "password": ""
    }
};

var paths = {
    "albums":   "/api.php?/albums/listed:1/limit:50",
    "content":  "/api.php?/content/limit:50",
    "featured": "/api.php?/albums/featured/limit:50",
    "essays":   "/api.php?/text/type:essay/render:0"
};

var keys = function(o){
    var ret=[],p;
    for(p in o) {
        if (o.hasOwnProperty(p)) {
            ret.push(p);
        }
    }
    return ret;
};

/**
 * Create download directory.
 * @type {*}
 */
var child = exec(commands.mkdir, function(err, stdout, stderr) {
    if (err) {
        throw err;
    }
});

/**
 * Base64 encode credentials for basic auth.
 * @param username
 * @param password
 * @returns {string}
 */
var encodeAuth = function(username, password) {
    return 'Basic ' + new Buffer(username + ':' + password).toString('base64');
};

var logStatus = function(statusCode,hostKey,pathKey,timeMS,message) {
    console.log(hostKey+"-"+pathKey+": ["+statusCode+"] " +
        timeMS+"ms >>> "+message);
};

/**
 * process and save to downloadDir.
 * @param hostKey
 * @param pathKey
 * @param options
 */
var processWithSave = function(hostKey,pathKey,options) {
    var file_name = hostKey+"-"+pathKey+".json",
        file = fs.createWriteStream(config.downloadDir + file_name),
        startTick = new Date().valueOf();

    http.get(options, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            var endTick = new Date().valueOf(),
                totalMS = endTick - startTick;
            file.end();
            logStatus(res.statusCode,hostKey,pathKey,totalMS,"file: " + file_name);
            if (config.queueEnabled) {
                doNext();
            }
        });
    });
};

/**
 * Get timing and status only.
 * @param hostKey
 * @param pathKey
 * @param options
 */
var processWithTimingOnly = function(hostKey,pathKey,options) {
    var startTick = new Date().valueOf();
    var chunks = 0;
    http.get(options, function(res) {
        res.on('data', function(data) {
            chunks++;
        }).on('end', function() {
            var endTick = new Date().valueOf(),
                totalMS = endTick - startTick;
            logStatus(res.statusCode,hostKey,pathKey,totalMS,chunks+" chunks.");
            if (config.queueEnabled) {
                doNext();
            }
        });
    });
};

var process = function(hostKey,pathKey) {
    var options = {
        "host": hosts[hostKey].host,
        "port": hosts[hostKey].port,
        "path": paths[pathKey]
    };
    if (config.doAuthorization) {
        options.authorization =
            encodeAuth(hosts[hostKey].username, hosts[hostKey].password);
    }
    if (config.saveEnabled) {
        processWithSave(hostKey,pathKey,options);
    } else {
        processWithTimingOnly(hostKey,pathKey,options);
    }
};

/**
 * Execute all hosts and path combos immediately.
 */
var run = function() {
    for (var i=0, n=queue.length; i<n; i++) {
        process(queue[i].host, queue[i].path);
    }
};

/**
 * Generate a list of items to process.
 * @returns {Array}
 */
var generateQueue = function() {
    var queue = [];
    var hostKeys = keys(hosts),
        pathKeys = keys(paths);
    for (var i=0, n=pathKeys.length; i<n; i++) {
        for(var k=0, m=hostKeys.length; k<m; k++ ) {
            queue.push({
                host: hostKeys[k],
                path: pathKeys[i]
            });
        }
    }
    return queue;
};

var processInterval = function() {
    if (queue[current]) {
        var item = queue[current];
        process(item.host, item.path);
        current++;
    }

};

var doNext = function() {
    if (config.queueEnabled && current < queue.length) {
        setTimeout(processInterval, config.queueInterval);
    }
};


var current = 0;
var queue = generateQueue();
console.log(queue);

// run all at once:
// run();

doNext();






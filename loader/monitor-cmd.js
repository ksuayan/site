'use strict';

/**
 * A quick and dirty NodeJS HTTP client
 * with some basic authentication
 * and queue processing.
 *
 * Loop through a list of hosts and paths
 * then save local copies in downloads directory.
 *
 * @author: ksuayan@gmail.com
 * @type {exports}
 */

var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    exec = require('child_process').exec;

var config = {
    saveEnabled: true, // enable saving to downloadDir
    queueEnabled: true, // queue generated requests
    authEnabled: false, // global Basic auth
    queueInterval: 2000, // time in MS between requests
    logfile: "progress.log",
    downloadDir: './downloads/'
};

var commands = {
  mkdir: 'mkdir -p ' + config.downloadDir
};

var groups = {
    "cq5": {
      "hosts": {
        "qa": {
            "host": "localhost",
            "port": 4502,
            "username": "wsuayan",
            "password": "changeme"
        },
        "img" : {
            "host": "shc.menloclinic.net",
            "port": 4502,
            "username": "admin",
            "password": "admin"
        }
      },
      "paths": {
        "waittime": "/connector/waittime",
        "phys-brain-tumor":"/bin/api/physicians/clinic.json/content/shc/en/medical-clinics/brain-tumor-center.json",
        "phys-cancer-center": "/bin/api/physicians/clinic.json/content/shc/en/medical-clinics/cancer-center.json",
        "phys-titles": "/bin/api/physicians/titles.json",
        "clinical-titles": "/bin/api/v1/content/clinicaltitles.json"
      }
    }
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

/**
 * Utility logger.
 * @param statusCode
 * @param hostKey
 * @param pathKey
 * @param timeMS
 * @param message
 */
var logStatus = function(item, statusCode, timeMS,message) {
    console.log(item.group+"-"+item.host+"-"+item.path+": ["+statusCode+"] " +
        timeMS+"ms, "+message);
};

/**
 * process and save response to downloadDir.
 * @param hostKey
 * @param pathKey
 * @param options
 */
var processWithSave = function(item,options) {

    var file_name = item.group+"-"+item.host+"-"+item.path+".json",
        file = fs.createWriteStream(config.downloadDir + file_name),
        startTick = new Date().valueOf();

    http.get(options, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            var endTick = new Date().valueOf(),
                totalMS = endTick - startTick;
            file.end();
            logStatus(item, res.statusCode, totalMS, "file: "+file_name);
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
var processWithTimingOnly = function(item,options) {
    var startTick = new Date().valueOf();
    var chunks = 0;
    http.get(options, function(res) {
        res.on('data', function(data) {
            chunks++;
        }).on('end', function() {
            var endTick = new Date().valueOf(),
                totalMS = endTick - startTick;
            logStatus(item, res.statusCode, totalMS,chunks+" chunks");
            if (config.queueEnabled) {
                doNext();
            }
        });
    });
};

/**
 * Main processing call.
 * Branch to variants.
 *
 * @param hostKey
 * @param pathKey
 */
var process = function(item) {
    var options = {
        "host": groups[item.group].hosts[item.host].host,
        "port": groups[item.group].hosts[item.host].port,
        "path": groups[item.group].paths[item.path]
    };
    if (config.authEnabled) {
        options.authorization =
            encodeAuth(groups[item.group].hosts[item.group].username,
                groups[item.group].hosts[item.host].password);
    }
    if (config.saveEnabled) {
        processWithSave(item,options);
    } else {
        processWithTimingOnly(item,options);
    }
};

/**
 * Execute all hosts and path combos immediately.
 */
var run = function() {
    for (var i=0, n=queue.length; i<n; i++) {
        process(queue[i]);
    }
};

/**
 * Loop through paths, then by hosts.
 * @returns {Array}
 */
var generateQueueByPaths = function() {
    var queue = [];
    var groupKeys = keys(groups);
    for (var g=0,gsize=groupKeys.length; g<gsize; g++) {
        var groupKey = groupKeys[g],
            group = groups[groupKey],
            hostKeys = keys(group.hosts),
            pathKeys = keys(group.paths);

        console.log("hosts:", hostKeys);
        console.log("paths:", pathKeys);

        for(var p=0, psize=pathKeys.length; p<psize; p++) {
            for (var h=0, hsize=hostKeys.length; h<hsize; h++) {
                queue.push({
                    group: groupKey,
                    host: hostKeys[h],
                    path: pathKeys[p]
                });
            }
        }
    }
    return queue;
};

/**
 * Loop through hosts, then by path.
 * @returns {Array}
 */
var generateQueueByHosts = function() {
    var queue = [];
    var groupKeys = keys(groups);
    console.log("groups:", groupKeys);

    for (var g=0,gsize=groupKeys.length; g<gsize; g++) {
        var groupKey = groupKeys[g],
            group = groups[groupKey],
            hostKeys = keys(group.hosts),
            pathKeys = keys(group.paths);

        console.log("hosts:", hostKeys);
        console.log("paths:", pathKeys);

        for (var h=0, hsize=hostKeys.length; h<hsize; h++) {
            for(var p=0, psize=pathKeys.length; p<psize; p++ ) {
                queue.push({
                    group: groupKey,
                    host: hostKeys[h],
                    path: pathKeys[p]
                });
            }
        }
    }
    return queue;
};


/**
 * Process the current item,
 * increment the pointer.
 *
 */
var processInterval = function() {
    if (queue[current]) {
        var item = queue[current];
        process(item);
        current++;
    }
};

/**
 * Setup the next item in the queue.
 */
var doNext = function() {
    if (config.queueEnabled && current < queue.length) {
        setTimeout(processInterval, config.queueInterval);
    }
};


var current = 0;
var queue = generateQueueByHosts();

console.log("--------- queue -------------");
console.log(queue);
console.log("-----------------------------");

// run all at once:
// run();

doNext();
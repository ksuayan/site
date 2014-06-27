"use strict";

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

var groups = require('./kyo-groups'),
    http   = require('http'),
    fs     = require('fs'),
    url    = require('url'),
    exec   = require('child_process').exec,
    conf   = require('./blooop-config');

var config = {
    saveEnabled: false, // enable saving to downloadDir
    queueEnabled: true, // queue generated requests
    authEnabled: false, // global Basic auth
    queueInterval: 3000, // time in MS between requests
    messageChannel: "broadcast",
    messageSource: "blooop",
    logfile: "progress.log",
    downloadDir: './downloads/'
};

var commands = {
    mkdir: 'mkdir -p ' + config.downloadDir
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
 * Util.
 * @param o
 * @returns {Array}
 */
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
 * Base64 encode credentials for basic auth.
 * @param username
 * @param password
 * @returns {string}
 */
var encodeAuth = function(username, password) {
    return 'Basic ' + new Buffer(username+':'+password).toString('base64');
};

var Monitor = function(){
    this.running = null;
    console.log("Initialized Blooop Monitor.");
};

/**
 * Pass in the websocket server.
 * @param socketServer
 */
Monitor.prototype.setSocketServer = function(socketServer) {
    console.log("Setting socketServer", socketServer);
    this.socketServer = socketServer;
};

/**
 * Pass in Mongoose.
 * @param logServer
 */
Monitor.prototype.setLogServer = function(logServer) {
    this.logServer = logServer;
};

/**
 * Save log entry.
 * @param logObj
 */
Monitor.prototype.saveLogObject = function(logObj) {
    if (this.logServer) {
        this.logServer.saveLogObject(logObj);
    }
}

/**
 * Utility logger.
 * @param statusCode
 * @param hostKey
 * @param pathKey
 * @param timeMS
 * @param message
 */
Monitor.prototype.logStatus = function(logObj) {

    if (this.socketServer) {
        this.socketServer.broadcast({
            "channel": config.messageChannel,
            "source" : config.messageSource,
            "message" : logObj
        });
    }

    this.saveLogObject(logObj);

    console.log(this.current+": "+
        logObj.item.group+"-"+logObj.item.host+"-"+logObj.item.path+
        ": ["+logObj.statusCode+"] "+logObj.time+"ms");
};

/**
 * process and save response to downloadDir.
 * @param hostKey
 * @param pathKey
 * @param options
 */
Monitor.prototype.processWithSave = function(item,options) {
    var that = this,
        file_name = item.group+"-"+item.host+"-"+item.path+".json",
        file = fs.createWriteStream(config.downloadDir + file_name),
        startTick = new Date().valueOf();
    http.get(options, function(res) {
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            var endTick = new Date().valueOf(),
                totalMS = endTick - startTick;
            file.end();
            that.logStatus({
                i: that.current,
                of: that.queue.length,
                item: item,
                statusCode: res.statusCode,
                at: endTick,
                time: totalMS
            });
            if (config.queueEnabled) {
                that.doNext();
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
Monitor.prototype.processWithTimingOnly = function(item,options) {
    var that = this,
        startTick = new Date().valueOf(),
        chunks = 0;
    http.get(options, function(res) {
        res.on('data', function(data) {
            chunks++;
        }).on('end', function() {
            var endTick = new Date().valueOf(),
                totalMS = endTick - startTick;
            that.logStatus({
                i: that.current,
                of: that.queue.length,
                item: item,
                statusCode: res.statusCode,
                at: endTick,
                time: totalMS,
                chunks: chunks
            });
            if (config.queueEnabled) {
                that.doNext();
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
Monitor.prototype.process = function(item) {
    var options = {
        "host": groups[item.group].hosts[item.host].host,
        "port": groups[item.group].hosts[item.host].port,
        "path": groups[item.group].paths[item.path]
    };
    if (config.authEnabled) {
        options.authorization =
            encodeAuth(groups[item.group].hosts[item.host].username,
                       groups[item.group].hosts[item.host].password);
    }
    if (config.saveEnabled) {
        this.processWithSave(item,options);
    } else {
        this.processWithTimingOnly(item,options);
    }
};

/**
 * Execute all hosts and path combos immediately.
 */
Monitor.prototype.run = function() {
    this.reset();
    this.generateQueueByPaths();
    for (var i=0, n=this.queue.length; i<n; i++) {
        this.process(this.queue[i]);
    }
};

/**
 * Loop through paths, then by hosts.
 * @returns {Array}
 */
Monitor.prototype.generateQueueByPaths = function() {
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
Monitor.prototype.generateQueueByHosts = function() {
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
Monitor.prototype.processInterval = function() {
    if (this.queue[this.current]) {
        this.process(this.queue[this.current]);
    }
    if (this.current<this.queue.length-1){
        this.current++;
    } else {
        this.current = 0;
    }
};

/**
 * Setup the next item in the queue.
 */
Monitor.prototype.doNext = function() {
    if (config.queueEnabled && this.current < this.queue.length) {
        var that = this;
        this.running = setTimeout(function(){
            that.processInterval();
        }, config.queueInterval);
    }
};

/**
 * Reset the queue and pause.
 */
Monitor.prototype.reset = function() {
    this.current = 0;
    this.queue = null;
    this.pause();
    console.log("Monitor reset");
};

/**
 * Initialize and run the queue.
 */
Monitor.prototype.start = function() {
    this.reset();
    this.queue = this.generateQueueByHosts();
    this.doNext();
};

/**
 * Pause the queue.
 */
Monitor.prototype.pause = function() {
    if (this.running) {
        clearTimeout(this.running);
    }
};

/**
 * Resume queue processing.
 */
Monitor.prototype.continue = function() {
    this.doNext();
};

/**
 *
 */
Monitor.prototype.getConfig = function(req, res) {

    var groupKeys = keys(groups),
        groupList = [];
    for (var i= 0,n=groupKeys.length; i<n; i++) {
        groupList.push({
            "name": groupKeys[i],
            "hosts": keys(groups[groupKeys[i]].hosts),
            "paths": keys(groups[groupKeys[i]].paths)
        });
    }
    var response = {
        "groups": groupList
    };
    return res.send(response);
};


module.exports = new Monitor();
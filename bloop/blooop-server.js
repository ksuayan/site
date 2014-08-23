#!/usr/bin/env node

"use strict";

/**
 * Blooop! Server is a website monitoring
 * tool based on NodeJS, Express and Socket.io.
 *
 * blooop-api: REST API endpoint
 * blooop-groups: sample server config
 * blooop-monitor: monitoring module
 * blooop-server: this module
 * blooop-socket: Socket.IO server
 * blooop-view: view layer (Jade+Handlebars)
 * blooop-config: config for blooop-server
 *
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    server = http.createServer(app),
    socketServer = require("./blooop-socket"),
    conf = require('./blooop-config'),
    view = require('./blooop-view'),
    api = require('./blooop-api'),
    db = require('./blooop-content'),
    monitor = require('./blooop-monitor');

/**
 * Initialize ExpressJS.
 */
var init = function () {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.locals({config: conf.app});
    app.use(express.compress());
    // upload turned off
    // app.use(express.bodyParser({uploadDir: '/tmp/test'}));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(express.favicon());
    app.use(express.cookieParser());
    app.use(express.session({secret: 'booyakasha'}));
    app.use(express.errorHandler({
        dumpExceptions: false,
        showStack: false
    }));
};

app.configure(init);

app.all("*", function (req, res, next) {
    if (conf.caching) {
        if ((req.url.indexOf("/js/")  === 0)||
            (req.url.indexOf("/css/") === 0)||
            (req.url.indexOf("/img/") === 0)) {
            res.setHeader("Cache-Control", "public, max-age="+conf.expires);
            res.setHeader("Expires", new Date(Date.now() + conf.expires * 1000).toUTCString());
        }
    }
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

app.get('/', view.home);
app.get('/api/config', monitor.getConfig);

console.log('Go to http://localhost:' + conf.app.port);
console.log('path: ', __dirname);

socketServer.listen(server);
server.listen(conf.app.port);

/**
 * Pass in the Socket.io server
 * into the monitor event loop.
 */
monitor.setSocketServer(socketServer);
monitor.setLogServer(db);
monitor.start();

module.exports = app;
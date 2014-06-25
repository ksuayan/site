"use strict";

var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    server = http.createServer(app),
    socketServer = require("./blooop-socket"),
    conf = require('./blooop-config'),
    view = require('./blooop-view'),
    api  = require('./blooop-api');

socketServer.listen(server);

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

server.listen(conf.app.port);

console.log('Go to http://localhost:' + conf.app.port);
console.log('path: ', __dirname);

module.exports = app;
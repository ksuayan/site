#!/usr/bin/env node

var http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    multer = require('multer'),
    upload = multer({ dest: './uploads'}),
    app = express(),
    path = require('path'),
    conf = require('./conf'),
    view = require('./view'),
    api = require('./api'),
    csv = require('./api-csv'),
    users = require('./users'),
    server = http.createServer(app),
    chatServer = require('./system-ws-server');

chatServer.listen(server);

var globalErrorHandler = function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Oops! Something broke.');
};

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.locals({config: conf, env: process.env.NODE_ENV});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.compress());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.favicon());
app.use(express.session({secret: 'booyakasha'}));
app.use(express.errorHandler({dumpExceptions: false, showStack: false}));
app.use(globalErrorHandler);

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

/**
 * Published view. Publicly viewable.
 */
app.get("/page/*", function(req, res){
    var pseudoPath = req.path.toString();
    pseudoPath = pseudoPath.replace("/page/","");
    req.params.page = pseudoPath;
    return view.pageView(req, res);
});

// HOME
app.get('/', view.homeView);


app.get('/geo', function(req, res){ res.render("content/geo"); });
app.post('/api/csv', csv.saveJsonToCSV);

app.get('/auth/instagram', api.instagramAuthorize);
app.get('/auth/instagram/callback', api.instagramHandleAuth);
app.get('/api/instagram', api.instagramSelfFeed);


// API
app.get('/api/twitter/import', api.importTwitterFeed);
app.get('/api/vimeo/import', api.importVimeoFeed);
app.get('/api/instagram/import', api.importInstagram);

app.get('/api/timeline',    api.getTimeline);
app.get('/api/tiles',       api.getTileList);

app.get('/api/twitter',      api.twitter);
app.get('/api/vimeo/:count', api.vimeo);
app.get('/api/flickr/:count', api.flickr);

app.get('/api/page/text/:page', api.getPageText);
app.get('/api/page/text', api.getPageText);

app.get('/api/page',        api.getPageList);
app.post('/api/page',       api.createPage);
app.get('/api/page/:id',    api.getPageById);
app.put('/api/page/:id',    api.updatePage);
app.delete('/api/page/:id', api.deletePage);

app.get('/api/text',        api.getTextList);
app.post('/api/text',       api.createText);
app.get('/api/text/:id',    api.getTextById);
app.put('/api/text/:id',    api.updateText);
app.delete('/api/text/:id', api.deleteText);

app.get('/api/doc',         api.getDocument);
app.get('/api/doc/:id',     api.getDocument);
app.post('/api/doc/:id',    api.saveDocument);

app.get('/api/loc',         api.getLocations);
app.get('/api/loc/:id',     api.getLocationById);
app.get('/api/loc/near/:point/:maxDistance', api.getLocationsNearPoint);
app.get('/api/loc/within/:swLatLng/:neLatLng', api.getLocationsWithin);
app.post('/api/loc',        api.createLocation);
app.put('/api/loc/:id',     api.updateLocation);
app.delete('/api/loc/:id',  api.deleteLocation);

// default handler
app.get('*',                view.notfound);

app.listen(conf.port);
console.log('batch-server\nGo to '+conf.host);
console.log('path: ', __dirname);

module.exports = app;

#!/usr/bin/env node

var express = require('express'),
    app = express(),
    path = require('path'),
    conf = require('./conf'),
    view = require('./view'),
    itunes = require('./itunes'),
    api = require('./api');

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

app.get('/', view.fullScreen);

app.get('/page/:page', view.pageView);
app.get('/text',       view.textList);
app.get('/edit',       view.pageEdit);


app.get('/content/:page', view.content);


app.get('/search',             itunes.searchTerm);
app.get('/search/:term',       itunes.searchTerm);
app.get('/multi/:term',        itunes.searchMultiCriteria);
app.get('/track',              itunes.getTrackList);
app.get('/track/:id',          itunes.getTrack);

// API
app.get('/api/timeline',    api.getTimeline);
app.get('/api/tiles',       api.getTileList);

app.get('/api/twitter',     api.twitter);

app.get('/api/page',        api.getPageList);
app.post('/api/page',       api.createPage);
app.get('/api/page/:id',    api.getPageById);
app.put('/api/page/:id',    api.updatePage);
app.delete('/api/page/:id', api.deletePage);

app.get('/api/text',        api.getTextList);
app.post('/api/text',       api.createText);
app.get('/api/text/:id',    api.getText);
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
app.delete('/api/log/:id',  api.deleteLocation);

app.listen(conf.app.port);
console.log('Go to http://localhost:' + conf.app.port);
console.log('path: ', __dirname);
module.exports = app;
#!/usr/bin/env node

var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express(),
    path = require('path'),
    conf = require('./conf'),
    view = require('./view'),
    itunes = require('./itunes'),
    api = require('./api'),
    users = require('./users');

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    LinkedInStrategy = require('passport-linkedin').Strategy,
    LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) { done(null, user); });

passport.deserializeUser(function(obj, done) { done(null, obj); });

/**
 *   Passport.JS Strategies
 *   ----------------------
 */

passport.use(new FacebookStrategy({
        clientID: conf.facebook.clientId,
        clientSecret: conf.facebook.secret,
        callbackURL: conf.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            if (profile.provider !== "facebook") {
                var error = "Invalid provider: " + profile.provider;
                return done(null, false, { message: error });
            }
            return users.FindOrCreateFacebookUser(profile, done);
        });
    }
));

passport.use(new GoogleStrategy({
        clientID: conf.google.clientID,
        clientSecret: conf.google.clientSecret,
        callbackURL: conf.google.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function(){
            return users.FindOrCreateGoogleUser(profile, done);
        });
    }
));

passport.use(new TwitterStrategy({
        consumerKey: conf.twitter.consumerKey,
        consumerSecret: conf.twitter.consumerSecret,
        callbackURL: conf.twitter.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
            return users.FindOrCreateTwitterUser(profile, done);
        });
    }
));

passport.use(new LinkedInStrategy({
        consumerKey: conf.linkedin.consumerKey,
        consumerSecret: conf.linkedin.consumerSecret,
        callbackURL: conf.linkedin.callbackURL
    },
    function(token, tokenSecret, profile, done) {
        process.nextTick(function () {
            return users.FindOrCreateLinkedInUser(profile, done);
        });
    }
));

passport.use(new LocalStrategy(users.FindLocalUser));


var globalErrorHandler = function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Oops! Something broke.');
};

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');
app.locals({config: conf});
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.compress());
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.favicon());
app.use(express.session({secret: 'booyakasha'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.errorHandler({dumpExceptions: false, showStack: false}));
app.use(globalErrorHandler);


app.get('/login', function(req, res) {
    res.render('layouts/login');
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/members',
        failureRedirect: '/login'
    })
);

app.get('/auth/facebook', passport.authenticate('facebook',
    {scope: ['public_profile', 'email']}));

app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/members',
        failureRedirect: '/login'
    })
);

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']}),
    function(req, res){
    });

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/members');
    });

app.get('/auth/twitter',
    passport.authenticate('twitter'),
    function(req, res){
    });

app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/members');
    });

app.get('/auth/linkedin',
    passport.authenticate('linkedin'),
    function(req, res){
        // not called
    });

app.get('/auth/linkedin/callback',
    passport.authenticate('linkedin', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/members');
    });


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

app.get("/view/*", function(req, res){
    var pseudoPath = req.path.toString();
    pseudoPath = pseudoPath.replace("/view/","");
    req.params.page = pseudoPath;
    console.log(">> path", pseudoPath);
    return view.pageView(req, res);
});

app.get('/',              view.fullScreen);
app.get('/page/:page',    view.pageView);
app.get('/text',          view.textList);
app.get('/edit',          view.pageEdit);
app.get('/content/:page', view.content);

app.get('/members', function(req, res) {
    var path = 'layouts/signup';
    if (req.user && req.user.status === 'complete') {
        path = 'layouts/members';
    }
    res.render(path, {user: req.user});
});
app.post('/members',      users.SaveProfile);

// TRACKS Demo
app.get('/search',        itunes.searchTerm);
app.get('/search/:term',  itunes.searchTerm);
app.get('/multi/:term',   itunes.searchMultiCriteria);
app.get('/track',         itunes.getTrackList);
app.get('/track/:id',     itunes.getTrack);

// API
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

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// default handler
app.get('*',                view.notfound);

app.listen(conf.port);
console.log('Go to http://localhost:' + conf.port);
console.log('path: ', __dirname);
module.exports = app;
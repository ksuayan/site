var express = require('express'),
app  = express(),
path = require('path'),
conf = require('./conf'),
view = require('./view'),
api  = require('./api');

console.log(conf);

var init = function() {
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'jade');
    app.locals({config:conf.app});
    app.use(express.bodyParser({uploadDir: '/tmp/test'}));
    app.use(express.static(path.join(__dirname,"../public")));
    app.use(express.favicon());
    app.use(express.cookieParser());
    app.use(express.session({secret : 'booyakasha'}));
    app.use(express.errorHandler({
        dumpExceptions : false,
        showStack : false
    }));
}

app.configure(init);

app.all("/", function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin || "*");
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with');
    next();
});

app.get('/', view.Home);
app.get('/page/:page', view.PageView);

// demos
app.get('/live', view.Live); // Backbone Editor
app.get('/graph', view.Graph); // Raphael Graph
app.get('/canvas', view.Canvas); // Raphael Graph

// API
app.get('/api/timeline', api.GetTimeline);

app.get('/api/page', api.GetPageList);
app.post('/api/page', api.CreatePage);
app.get('/api/page/:id', api.GetPageById);
app.put('/api/page/:id', api.UpdatePage);
app.delete('/api/page/:id', api.DeletePage);

app.get('/api/text', api.GetTextList);
app.post('/api/text', api.CreateText);
app.get('/api/text/:id', api.GetText);
app.put('/api/text/:id', api.UpdateText);
app.delete('/api/text/:id', api.DeleteText);

// misc
app.get('/text', view.TextList);
app.get('/edit', view.PageEdit);

app.get('/api/doc', api.GetDocument);
app.get('/api/doc/:id', api.GetDocument);
app.post('/api/doc/:id', api.SaveDocument);

app.listen(conf.app.port);
console.log('Go to http://localhost:' + conf.app.port);
console.log('path: ', __dirname);
module.exports = app;
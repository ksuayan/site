var config = require('./blooop-config'),
    content = require('./blooop-content'),
    moment = require('moment');

var ViewHandler = function () {
    console.log("Initialized WebView handler");
};

ViewHandler.fn = {
    fromNow: function (value) {
        return moment(value).fromNow();
    }
};

ViewHandler.prototype.home = function (req, res) {
    res.render('layouts/blooop-home', {server: config.socketHost});
};

module.exports = new ViewHandler();

var page = require('webpage').create();

page.open('http://node.suayan.com', function() {
    page.render('node-suayan.png');
    phantom.exit();
});
/**
 * A trivial POST call to Sling/CQ.
 *
 * @type {exports}
 */

var http = require('http'),
    qs = require('querystring');

var postData = qs.stringify({
        "jcr:primaryType": "nt:unstructured",
        title: "new title",
        sample: "here goes nothing",
        status: "yey!",
        multi: ['eenie','mini','miney','moe']
    }),

    postOptions = {
        hostname: 'localhost',
        auth: 'admin:admin',
        port: 4502,
        path: '/tmp/new_resource.json',
        method: 'POST',
        headers: {
            'Accept': 'application/json', // want to get JSON back instead of HTML
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    },

    responseHandler = function (response) {
    console.log('status: ' + response.statusCode);
    console.log('headers: ' + JSON.stringify(response.headers));
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        console.log('body: ' + chunk);
    });
};

var postRequest = http.request( postOptions, responseHandler);
postRequest.write(postData);
postRequest.end();
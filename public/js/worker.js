
self.addEventListener('message', function(e) {
    var lastweek = new Date().valueOf() - (7 * 24 * 60 * 60 * 1000);
    var response = {data: e.data, lastweek: lastweek }
    self.postMessage(response);
}, false);
var conf = require('./conf');

var Util = function() {
    console.log("Util loaded");
    this.defaultError = {status:"error"};
};

Util.HandleError = function(err, onError){
    console.log(">> Error", err);
    if (typeof onError === 'function') {
        onError(err);
    }
};


module.exports = new Util();
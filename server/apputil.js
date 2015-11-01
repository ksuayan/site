var Util = function() {
    console.log("Util loaded");
    this.defaultError = {status:"error"};
};

Util.prototype.HandleError = function(err, onError){
    console.log(">> Error", err);
    if (typeof onError === 'function') {
        onError(err);
    }
};

Util.prototype.toNumericList = function(list) {
    var newList = [];
    for (var i=0,n=list.length; i<n; i++) {
        newList.push(parseFloat(list[i]));
    }
    return newList;
};


module.exports = new Util();
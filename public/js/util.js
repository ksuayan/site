var util = util || {};

util.RandomArray = function(size, scale) {
    var r = new Array(size);
    for (var i = 0; i < size; i++) {
        r[i] = Math.floor(Math.random() * (scale+1));
    }
    return r;
};

util.ArrayMax = function(array){
    return Math.max.apply(Math, array);
};

util.ArrayMin = function(array){
    return Math.min.apply(Math, array);
};

util.ZeroFill = function(number, width) {
    width -= number.toString().length;
    if ( width > 0 ) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
};

util.ResizeThrottle = function(callback, timeout) {
    var timeoutID , timeout = timeout || 200;
    return function () {
        var scope = this , args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function(){
            callback.apply( scope , Array.prototype.slice.call(args) );
        } , timeout );
    }
}


var extend = function ( ns, ns_string ) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "gb") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};
"use strict";

gb.Namespace(gb, "gb.util");

gb.util.RandomArray = function(size, scale) {
    var r = new Array(size);
    for (var i = 0; i < size; i++) {
        r[i] = Math.floor(Math.random() * (scale+1));
    }
    return r;
};

gb.util.ArrayMax = function(array){
    return Math.max.apply(Math, array);
};

gb.util.ArrayMin = function(array){
    return Math.min.apply(Math, array);
};

gb.util.ZeroFill = function(number, width) {
    width -= number.toString().length;
    if ( width > 0 ) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
};

gb.util.throttle = function(callback, timeout) {
    var timeoutID , timeout = timeout || 200;
    return function () {
        var scope = this , args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function(){
            callback.apply( scope , Array.prototype.slice.call(args) );
        } , timeout );
    }
};
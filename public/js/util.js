
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

var util = util || {};

util.randomArray = function(size, scale) {
    var r = new Array(size);
    for (var i = 0; i < size; i++) {
        r[i] = Math.floor(Math.random() * (scale+1));
    }
    return r;
};

util.arrayMax = function(array){
    return Math.max.apply(Math, array);
};

util.arrayMin = function(array){
    return Math.min.apply(Math, array);
};

util.zeroFill = function(number, width) {
    width -= number.toString().length;
    if ( width > 0 ) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
};



// -- http://jsfiddle.net/amustill/Bh276/1/
Raphael.el.hoverInBounds = function(inFunc, outFunc) {
    var inBounds = false;
    // Mouseover function. Only execute if `inBounds` is false.
    this.mouseover(function() {
        if (!inBounds) {
            inBounds = true;
            inFunc.call(this);
        }
    });
    // Mouseout function
    this.mouseout(function(e) {
        var x = e.offsetX || e.clientX,
            y = e.offsetY || e.clientY;

        // Return `false` if we're still inside the element's bounds
        if (this.isPointInside(x, y)) return false;
        inBounds = false;
        outFunc.call(this);
    });
    return this;
};
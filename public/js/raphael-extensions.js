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
        if (this.isPointInside(x, y)) {
            return false;
        }
        inBounds = false;
        outFunc.call(this);
    });
    return this;
};


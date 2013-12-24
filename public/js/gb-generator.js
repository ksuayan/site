
gb.Namespace(gb, "gb.data.Generator");

/**
 *
 * @param size
 * @param scale
 * @constructor
 */
gb.data.Generator = function(size, scale) {
    "use strict";
    this.size = size;
    this.scale = scale;
};

/**
 * Return data.
 * @returns {*}
 *
 */
gb.data.Generator.prototype.GetData = function() {
    return gb.util.randomArray(this.size, this.scale);
};
'use strict';

var gb = gb || {};
gb.data = gb.data || {};

gb.data.Generator = function(size, scale) {
    this.size = size;
    this.scale = scale;
};

gb.data.Generator.prototype.GetData = function() {
    return util.RandomArray(this.size, this.scale);
};
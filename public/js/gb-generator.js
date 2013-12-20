"use strict";

gb.Namespace(gb, "gb.data.Generator");

gb.data.Generator = function(size, scale) {
    this.size = size;
    this.scale = scale;
};

gb.data.Generator.prototype.GetData = function() {
    return gb.util.RandomArray(this.size, this.scale);
};
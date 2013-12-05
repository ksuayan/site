"use strict";

util.Extend(gb,"gb.ui");

gb.ui.Tile = function(parent, id, cssAttributes) {
    this.jq = $("<div/>", {"id": id})
    .css(cssAttributes)
    .appendTo(parent);
};

gb.ui.Tile.prototype.transition = function(attr) {
    this.jq.transition(attr);
}


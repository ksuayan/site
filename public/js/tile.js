"use strict";

gb.Namespace(gb,"gb.ui.Tile");

gb.ui.Tile = function(parent, id, cssAttributes) {
    this.jq = $("<div/>", {"id": id})
    .css(cssAttributes)
    .appendTo(parent);
};

gb.ui.Tile.prototype.transition = function(attr) {
    this.jq.transition(attr);
};


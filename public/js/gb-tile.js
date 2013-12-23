"use strict";

gb.Namespace(gb,"gb.ui.Tile");

gb.ui.Tile = new gb.Class();

gb.ui.Tile.include({
    init: function(parent, elementAttributes) {
        this.jq = $("<div/>", elementAttributes)
            .appendTo(parent);
    },

    transition: function(attr) {
        this.jq.transition(attr);
    },

    show: function() {
        this.jq.show();

    },

    hide: function() {
        this.jq.hide();
    },

    onResizeEndHandler: function() {
        console.log("Tile.onResizeEndHandler");
    },

    activate: function() {

    },

    deactivate: function() {

    }
});
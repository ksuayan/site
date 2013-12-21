"use strict";

gb.Namespace(gb,"gb.ui.Tile");

gb.ui.Tile = new gb.Class();

gb.ui.Tile.include({
    init: function(parent, elementAttributes, cssAttributes) {
        this.jq = $("<div/>", elementAttributes)
            .css(cssAttributes)
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

    activate: function() {

    },

    deactivate: function() {

    }
});
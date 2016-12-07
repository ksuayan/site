
gb.Namespace(gb,"gb.ui.Tile");
gb.ui.Tile = new gb.Class();

/**
 * @fileOverview Represents a visual Tile object.
 * @author Kyo Suayan
 * @module gb.ui.Tile
 *
 * @example
 * var tile = new gb.ui.Tile("#parent", {id:"myId"});
 * tile.show();
 *
 */
gb.ui.Tile.include({
    /**
     * @param elementAttributes {Object} map of html element attributes.
     * @instance
     */
    init: function(elementAttributes) {
        "use strict";
        this.jq = $("<div/>", elementAttributes);
    },

    /**
     * wrapper for jquery.transition.
     * @param attr
     * @instance
     */
    transition: function(attr) {
        this.jq.transition(attr);
    },

    /**
     * Display the object.
     * @instance
     */
    show: function() {
        this.jq.show();

    },

    /**
     * Hide the object.
     * @instance
     */
    hide: function() {
        this.jq.hide();
    },

    /**
     * Default resizeEnd event handler.
     * @instance
     */
    onResizeEndHandler: function() {
        console.log("Tile.onResizeEndHandler");
    },

    /**
     * Enable interaction with the object.
     * @instance
     */
    activate: function() {

    },

    setContent: function(content) {
      this.jq.append($(content));
    },

    /**
     * Disable interaction with the object.
     * @instance
     */
    deactivate: function() {
    }
});
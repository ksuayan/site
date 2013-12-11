"use strict";

gb.Namespace(gb,"gb.ui.ContentManager");

gb.ui.ContentManager = function(selector) {
    this.parent = $(selector);
    this.content = null;
    this.init();
};

gb.ui.ContentManager.prototype.init = function() {
    console.log("Initialize ContentManager.");
};

gb.ui.ContentManager.prototype.setContent = function(content) {
    this.content = content;
};

gb.ui.ContentManager.prototype.show = function() {
    console.log("Showtime!");
};

gb.ui.ContentManager.prototype.hide = function() {
    console.log("Adios.");
};
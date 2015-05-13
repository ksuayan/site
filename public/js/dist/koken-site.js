/** @namespace */
var gb = gb || {};

/**
 * Initialize namespace for a given path using ns
 * object as the parent.
 * @param ns {Object}
 * @param ns_string {string}
 * @returns {*}
 */
gb.Namespace = function (ns, ns_string) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] === "gb") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesn't exist
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

/**
 * Class factory.
 * @param parent {Object}
 * @returns {Function}
 */
gb.Class = function(parent){
    "use strict";

    var klass = function() {
        this.init.apply(this,arguments);
    };

    if (parent) {
        var Subclass = function(){};
        Subclass.prototype = parent.prototype;
        klass.prototype =  new Subclass();
    }

    klass.prototype.init = function(){};
    klass.fn = klass.prototype;
    klass.fn.parent =  klass;
    // klass._super = klass.__proto__;

    klass.extend = function(obj){
        var extended =obj.extended;
        for (var i in obj) {
            klass[i] = obj[i];
        }
        if (extended) {
            extended(klass);
        }
    };

    klass.include = function(obj) {
        var included = obj.included;
        for (var i in obj) {
            klass.fn[i] = obj[i];
        }
        if (included) {
            included(klass);
        }
    };
    return klass;
};




gb.Namespace(gb, "gb.util");

/**
 * @fileOverview A collection of static JavaScript utilities.
 *
 * @author Kyo Suayan
 * @namespace gb.util
 */
gb.util = {
    /**
     * Generate a random array of numbers.
     * @param size {number} number of elements
     * @param scale {number} upper limit value
     * @returns {Array}
     */
     randomArray: function(size, scale) {
        var r = new Array(size);
        for (var i = 0; i < size; i++) {
            r[i] = Math.floor(Math.random() * (scale+1));
        }
        return r;
    },

    /**
     * Find the maximum value in the array.
     * @param array
     * @returns {number}
     */
    arrayMax: function(array){
        return Math.max.apply(Math, array);
    },

    /**
     * Find the minimum value in the array.
     * @param array
     * @returns {number}
     */
    arrayMin: function(array){
        return Math.min.apply(Math, array);
    },

    /**
     * Degrees to Radians
     * @param x
     * @returns {number}
     */
    rad: function(x) {
        return x * Math.PI / 180;
    },

    /**
     * Get distance in meters between two coordinates.
     * http://stackoverflow.com/questions/1502590/calculate-distance-between-two-points-in-google-maps-v3
     *
     * @param p1
     * @param p2
     * @returns {number}
     */
    getDistance: function(p1, p2) {
        var R = 6378137; // Earth’s mean radius in meter
        var dLat = gb.util.rad(p2.lat() - p1.lat());
        var dLong = gb.util.rad(p2.lng() - p1.lng());
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(gb.util.rad(p1.lat())) * Math.cos(gb.util.rad(p2.lat())) *
                Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d; // returns the distance in meter
    },
    /**
     * Zero pad a number.
     * @param number {number} the number to pad
     * @param width {number} required length
     * @returns {string}
     */
    zeroFill: function(number, width) {
        width -= number.toString().length;
        if ( width > 0 ) {
            return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
        }
        return number + ""; // always return a string
    },

    /**
     * Count syllables in a word.
     * @param word
     * @returns {*}
     */
    countSyllables: function(word) {
        word = word.toLowerCase();                               //word.downcase!
        if(word.length <= 3) { return 1; }                       //return 1 if word.length <= 3
        word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, ''); //word.sub!(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
        word = word.replace(/^y/, '');                           //word.sub!(/^y/, '')
        return word.match(/[aeiouy]{1,2}/g).length;              //word.scan(/[aeiouy]{1,2}/).size
    },

    countWords: function(text) {
        var words = text.match(/\S+/g) || [];
        return words.length;
    },

    countSentences: function(text) {
        var sentences = text.match(/[\.\?\!]/g) || [];
        return sentences.length;
    },

    /**
     * Flesch-Kincaid Test
     * http://en.wikipedia.org/wiki/Flesch-Kincaid_Readability_Test
     * @param text
     * @returns {number}
     */
    fleschReadingEase: function(text) {
        var totalWords = gb.util.countWords(text),
            totalSentences = gb.util.countSentences(text),
            totalSyllables = gb.util.countSyllables(text);
        console.log("words:", totalWords, "sentences:", totalSentences, "syllables:", totalSyllables);
        return 206.835 - (1.015*(totalWords/totalSentences)) - (84.6*(totalSyllables/totalWords));
    },

    /**
     * Compute Flesch-Kincade Grade level
     * @param text
     * @returns {number}
     */
    fleschKincaidGradeLevel: function(text) {
        var totalWords = gb.util.countWords(text),
            totalSentences = gb.util.countSentences(text),
            totalSyllables = gb.util.countSyllables(text);
        console.log("words:", totalWords, "sentences:", totalSentences, "syllables:", totalSyllables);
        return (0.39*(totalWords/totalSentences)) + (11.8*(totalSyllables/totalWords)) - 15.59;
    },

    getDedupedValuesByKey: function(list, key) {
        var keyList = [],
            lookup = {};
        if (!list.length) {
            return keyList;
        }
        for (var i=0, n=list.length; i<n; i++) {
            var value = (list[i][key]) ? list[i][key] : "";
            if (value && !lookup[value]) {
                keyList.push(value);
                lookup[value] = 1;
            }
        }
        return keyList;
    },

    /**
     * Parse a Twitter Date (created_at).
     * @param dt
     * @returns {Date}
     */
    parseTwitterDate: function(dt) {
        return new Date(Date.parse(dt.replace(/( \+)/, ' UTC$1')));
    },

    /**
     * Throttle a function invocation.
     * @param callback {Function} the function to call.
     * @param timeoutMS {number} the number of ms to set as cap between calls.
     * @returns {Function}
     */
    throttle: function(callback, timeoutMS) {
        var timeoutID , timeout = timeoutMS || 500;
        return function () {
            var scope = this , args = arguments;
            clearTimeout(timeoutID);
            timeoutID = setTimeout(function(){
                callback.apply( scope , Array.prototype.slice.call(args) );
            } , timeout );
        };
    }
};



gb.Namespace(gb, "gb.ui");

/**
 * @fileOverview Application wide settings for UI environment.
 * @author Kyo Suayan
 * @namespace gb.ui
 */
gb.ui = {
    /**
     * Breakpoints matched to global.less
     * @memberOf gb.ui
     * @type {{sm: number, md: number, lg: number, xl: number}}
     */
    ScreenSizes : {
        "sm": 480,
        "md": 768,
        "lg": 992,
        "xl": 1200
    },

    /** @type {string} */
    screenMode: "lg",

    /**
     * Sitewide window resize event handler. This would usually be throttled
     * via gb.util.throttle.
     * @memberOf gb.ui
     * @static
     */
    onResizeHandler: function(){
        var breaks = gb.ui.ScreenSizes;
        var width = $(window).width();
        gb.ui.screenWidth = $(window).width();
        gb.ui.screenHeight = $(window).height();
        if (width < breaks.sm) {
            gb.ui.screenMode = "xs";
        } else if (width >= breaks.sm && width < breaks.md) {
            gb.ui.screenMode = "sm";
        } else if (width >= breaks.md && width < breaks.lg) {
            gb.ui.screenMode = "md";
        } else if (width >= breaks.lg && width < breaks.xl) {
            gb.ui.screenMode = "lg";
        } else if (width >= breaks.xl) {
            gb.ui.screenMode = "xl";
        }
        $(this).trigger('resizeEnd');
    }
};



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
     * @param parent {string} jquery selector to append to.
     * @param elementAttributes {Object} map of html element attributes.
     * @instance
     */
    init: function(parent, elementAttributes) {
        "use strict";
        this.jq = $("<div/>", elementAttributes)
            .appendTo(parent);
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

    /**
     * Disable interaction with the object.
     * @instance
     */
    deactivate: function() {
    }
});

$(function(){
    console.log("Koken Main Module loaded from node.suayan.com.");
});
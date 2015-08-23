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



this["JST"] = this["JST"] || {};

Handlebars.registerPartial("gridCell", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td id=\"grid-";
  if (stack1 = helpers.cellName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.cellName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">&nbsp;</td>";
  return buffer;
  }));

Handlebars.registerPartial("gridHeaders", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "";
  buffer += "\n        <td class=\"head-"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</td>\n    ";
  return buffer;
  }

  buffer += "<thead>\n<tr>\n    <td></td>\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.gridHeaders), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</tr>\n</thead>";
  return buffer;
  }));

Handlebars.registerPartial("gridRows", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, self=this, functionType="function", escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <tr>\n  <td>";
  if (stack1 = helpers.rowName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.rowName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</td>\n  ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.gridCells), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </tr>\n";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n      ";
  stack1 = self.invokePartial(partials.gridCell, 'gridCell', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  ";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.gridRows), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  }));

this["JST"]["handlebars/gridGroups.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n  <h2>";
  if (stack1 = helpers.groupName) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.groupName); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n  <table class=\"table\">\n    ";
  stack1 = self.invokePartial(partials.gridHeaders, 'gridHeaders', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ";
  stack1 = self.invokePartial(partials.gridRows, 'gridRows', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n  </table>\n";
  return buffer;
  }

  stack1 = helpers.each.call(depth0, (depth0 && depth0.gridList), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }
  });

this["JST"]["handlebars/tile.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n<p>";
  stack1 = (typeof depth0 === functionType ? depth0.apply(depth0) : depth0);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</p>\n";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "";
  buffer += "\n  <span class=\"label label-primary\">"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</span>\n";
  return buffer;
  }

  buffer += "<h2>";
  if (stack1 = helpers.pageTitle) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.pageTitle); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n<h3>";
  if (stack1 = helpers.subhead) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.subhead); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h3>\n<p class=\"description\">";
  if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.description); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</p>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.body), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n<div class=\"indent\">\n  <span class=\"label\">Tech:</span>\n";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.tech), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;
  });

this["JST"]["handlebars/tweet.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <a href=\"";
  if (stack1 = helpers.permalink) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.permalink); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\" class=\"permalink\" target=\"_blank\">";
  if (stack1 = helpers.permalink) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.permalink); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>\n        ";
  return buffer;
  }

  buffer += "<div class=\"media\">\n    <div class=\"media-left\">\n        <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"><img src=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.profile_image_url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" /></a>\n    </div>\n    <div class=\"media-body\">\n        <a href=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">@"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.user)),stack1 == null || stack1 === false ? stack1 : stack1.screen_name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</a>\n        ";
  if (stack2 = helpers.text) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.text); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "\n        ";
  stack2 = helpers['if'].call(depth0, (depth0 && depth0.permalink), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n        <span class=\"when\">";
  if (stack2 = helpers.ago) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
  else { stack2 = (depth0 && depth0.ago); stack2 = typeof stack2 === functionType ? stack2.call(depth0, {hash:{},data:data}) : stack2; }
  buffer += escapeExpression(stack2)
    + "</span>\n    </div>\n</div>\n\n\n\n\n\n\n\n\n";
  return buffer;
  });

this["JST"]["handlebars/vimeo.hbs"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, stack2, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"media\">\n    <div class=\"media-header\">\n        <h2><a href=\"";
  if (stack1 = helpers.link) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.link); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "\">";
  if (stack1 = helpers.name) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.name); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</a>, ";
  if (stack1 = helpers.ago) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.ago); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "</h2>\n    </div>\n    <div class=\"media-body\">\n        ";
  stack2 = ((stack1 = ((stack1 = (depth0 && depth0.embed)),stack1 == null || stack1 === false ? stack1 : stack1.html)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1);
  if(stack2 || stack2 === 0) { buffer += stack2; }
  buffer += "\n    </div>\n</div>\n";
  return buffer;
  });


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


gb.Namespace(gb, "gb.ui.TouchSurface");
gb.ui.TouchSurface = new gb.Class();

/**
 * @fileOverview gb.ui.TouchSurface is a touch event detection
 * tool for mobile devices.
 * @author Kyo Suayan
 * @module gb.ui.TouchSurface
 * @example
 * var touchSurface = new gb.ui.TouchSurface(el, yourFunction);
 *
 */
gb.ui.TouchSurface.include({
    /**
     * @instance
     * @param el
     * @param callback
     */
    init: function(el, callback) {
        "use strict";
        try {
            var that = this;
            this.touchSurface = el;
            this.direction = 'none';
            this.swipeType = 'none';
            this.startX = null;
            this.startY = null;
            this.distX = null;
            this.distY = null;
            this.threshold = 50; //required min distance traveled to be considered swipe
            this.restraint = 50; // maximum distance allowed at the same time in perpendicular direction
            this.allowedTime = 500; // maximum time allowed to travel that distance
            this.elapsedTime = null;
            this.startTime = null;
            this.touchHandler = callback || function(evt, dir, phase, swipetype, distance){};

            this.touchSurface.addEventListener('touchstart', function(e){ that.onTouchStart(e); }, false);
            this.touchSurface.addEventListener('touchmove', function(e){ that.onTouchMove(e); }, false);
            this.touchSurface.addEventListener('touchend', function(e){ that.onTouchEnd(e); }, false);
        } catch(err) {}
    },

    /**
     * Unbind event listeners.
     */
    removeEventListeners: function() {
        try {
            this.touchSurface.removeEventListener('touchstart');
            this.touchSurface.removeEventListener('touchmove');
            this.touchSurface.removeEventListener('touchend');
        } catch(err) {}
    },

    debug: function() {
        console.log("----------------");
        console.log("startX", this.startX, "startY", this.startY);
        console.log("x", this.distX, "y", this.distY, this.axis, this.direction);
    },

    /**
     * Touch start event handler.
     * @param e
     */
    onTouchStart: function(e) {
        var touchObj = e.changedTouches[0];
        e.preventDefault();
        this.axis = null;
        this.direction = 'none';
        this.swipeType = 'none';
        this.startX = touchObj.pageX;
        this.startY = touchObj.pageY;
        // record time when finger first makes contact with surface
        this.startTime = new Date().getTime();
        // fire callback function with params direction="none", phase="start", swipetype="none" etc
        this.touchHandler(e, 'none', 'start', this.swipeType, 0);
    },

    /**
     * Touch move event handler.
     * @param e
     */
    onTouchMove: function(e) {
        var touchObj = e.changedTouches[0];
        e.preventDefault();

        // get horizontal dist traveled by finger while in contact with surface
        this.distX = touchObj.pageX - this.startX;
        // get vertical dist traveled by finger while in contact with surface
        this.distY = touchObj.pageY - this.startY;

        // if distance traveled horizontally is greater than vertically, consider this a horizontal movement
        if (!this.axis) {
            this.axis =  (Math.abs(this.distX) > Math.abs(this.distY)) ? "horizontal" : "vertical";
        }

        if (this.axis === 'horizontal') {
            this.direction = (this.distX < 0) ? 'left' : 'right';
            // fire callback function with params direction="left|right", phase="move", swipetype="none" etc
            this.touchHandler(e, this.direction, 'move', this.swipeType, this.distX);
            // else consider this a vertical movement
        } else {
            this.direction = (this.distY < 0) ? 'up' : 'down';
            // fire callback function with params direction="up|down", phase="move", swipetype="none" etc
            this.touchHandler(e, this.direction, 'move', this.swipeType, this.distY);
        }
        // this.debug();
    },

    /**
     * Touch end event handler.
     * @param e
     */
    onTouchEnd: function(e) {
        e.preventDefault();
        // get time elapsed

        this.elapsedTime = new Date().getTime() - this.startTime;
        // first condition for swipe met
        if (this.elapsedTime <= this.allowedTime) {
            // 2nd condition for horizontal swipe met
            if (Math.abs(this.distX) >= this.threshold &&
                Math.abs(this.distY) <= this.restraint){
                // set swipeType to either "left" or "right"
                this.swipeType = this.direction;
                // 2nd condition for vertical swipe met
            } else if (Math.abs(this.distY) >= this.threshold &&
                Math.abs(this.distX) <= this.restraint){
                // set swipeType to either "top" or "down"
                this.swipeType = this.direction;
            }
        }
        // Fire callback function with params direction="left|right|up|down", phase="end", swipetype=direction
        var distance = (this.direction === 'left' || this.direction === 'right') ? this.distX : this.distY;
        this.touchHandler(e, this.direction, 'end', this.swipeType, distance);
    }
});


gb.Namespace(gb, "gb.ui.PreloadableImage");
gb.ui.PreloadableImage = new gb.Class();


/**
 * @fileOverview A preloadable image.
 * @author Kyo Suayan
 * @module gb.ui.PreloadableImage
 *
 * @example
 * var pImage = new gb.ui.PreloadableImage("#id", "image.jpg", onSuccess, onError);
 *
 */
gb.ui.PreloadableImage.include({

    /**
     * @param id {string} selector
     * @param source {string} image source
     * @param onSuccess {Function} callback
     * @param onError {Function} callback
     * @instance
     */
    init: function(id, source, onSuccess, onError) {
        "use strict";
        this.id = id;
        this.startTime = new Date().valueOf();
        this.endTime = this.startTime;
        this.image = new Image();
        this.setSource(source);
        this.setOnLoad(onSuccess);
        this.setOnError(onError);
    },

    /**
     * Set the image src attribute.
     * @param source {string}
     * @instance
     */
    setSource: function(source) {
        if (!source) {
            this.image.src = "";
            return;
        }
        this.image.src = source;
    },

    /**
     * Set the onSuccess callback.
     * @param onSuccess {Function}
     * @instance
     */
    setOnLoad: function(onSuccess) {
        var that = this;
        if (!onSuccess || typeof onSuccess !== 'function') {
            // default onload handler ..
            this.image.onload = function(){
                that.endTime = new Date().valueOf();
            };
            return;
        }
        var onSuccessWrapper = function(e) {
            that.endTime = new Date().valueOf();
            onSuccess(e);
        };
        this.image.onload = onSuccessWrapper;
    },

    /**
     * Set the onError callback.
     * @param onError {Function}
     * @instance
     */
    setOnError: function(onError) {
        var that = this;
        if (!onError || typeof onError !== 'function') {
            this.image.onerror = function(){
                that.endTime = new Date().valueOf();
            };
            return;
        }
        this.endTime = new Date().valueOf();
        this.image.onerror = onError;

    },

    /**
     * Return elapse time from request to completion.
     * @returns {number}
     * @instance
     */
    getTotalTimeMS: function() {
        return (this.endTime - this.startTime);
    }

});




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

gb.Namespace(gb,"gb.util.TimeOutCycle");
gb.util.TimeOutCycle = new gb.Class();

/**
 * @fileOverview A TimeOutCycle object invokes
 * a callback every timeoutMS milliseconds.
 *
 * @author Kyo Suayan
 * @module gb.ui.TimeOutCycle
 *
 * @example
 * var timeout = new gb.ui.TimeOutCycle(1000, someFunction);
 * timeout.setTickHandler(function(){console.log("Hello");});
 * timeout.setTimeoutMS(5000);
 * timeout.start();
 * timeout.stop();
 */

gb.util.TimeOutCycle.include({

    /**
     * constructor
     * @param timeoutMS
     * @param callback
     * @instance
     */
    init: function(timeoutMS, callback) {
        "use strict";
        this.timeoutMS = timeoutMS;
        this.running = false;
        this.timeoutHandle = null;
        this.tickHandler = function(){
            console.log("default tickHandler");
        };
        this.setTimeoutMS(timeoutMS);
        this.setTickHandler(callback);
    },

    /**
     * Set the function to call.
     * @param callback
     * @instance
     */
    setTickHandler: function(callback) {
        if (callback && typeof callback === 'function') {
            this.tickHandler = callback;
        }
    },

    /**
     * set the interval between calls.
     * @param timeoutMS
     * @instance
     */
    setTimeoutMS: function(timeoutMS) {
        if (timeoutMS) {
            this.timeoutMS = timeoutMS;
        }
    },

    /**
     * start the loop.
     * @instance
     */
    start: function() {
        this.running = true;
        this._tick();
    },

    /**
     * end the loop.
     * @instance
     */
    stop: function() {
        this.running = false;
        if (this.timeoutHandle) {
            clearTimeout(this.timeoutHandle);
        }
    },

    /**
     * is this object running?
     * @instance
     */
    isRunning: function() {
        return (this.running === true);
    },

    /**
     * invoke tickHandler and setup next invocation.
     * @private
     */
    _tick: function() {
        if (!this.running) {
            return;
        }
        this.tickHandler();
        this._setNext();
    },

    /**
     * setup a timer for next call.
     * @private
     */
    _setNext: function() {
        var that = this;
        if (this.running) {
            this.timeoutHandle = setTimeout(function(){that._tick();}, this.timeoutMS);
        }
    }
});



//
// $.fn.fullscreen()
// Rotating fullscreen background images.
//
// Dependencies:
// gb-preloadable-image.js: gb.ui.PreloadableImage



(function ($) {

    $.fn.fullscreen = function(options) {
        "use strict";

        var settings = $.extend({
            front: "#background",
            bgHeightClass: 'bgheight',
            bgWidthClass: 'bgwidth',
            refreshInterval: 5000,
            fadeOutTime: 500,
            fadeInTime: 700,
            successCallback: function(){},
            errorCallback: function(){},
            images: ["images/image-001.png","images/image-002.png","images/image-003.png"]
        }, options);


        var theWindow = $(window),
            bkgImage = $(settings.front),
            windowAspect = theWindow.width()/theWindow.height(),
            imageAspect = bkgImage.width() / bkgImage.height(),
            intervalHandler = null,
            backgrounds = [],// array of gb.ui.PreloadableImage();
            index = 0;

        var refreshImage = function() {
            if (index < settings.images.length - 1) {
                index++;
            } else {
                index = 0;
            }
            var onComplete = function() {
                bkgImage.attr("src", settings.images[index]);
                bkgImage.transition({opacity:1},settings.fadeInTime,"snap");
                resizeBackgound();
            };

            bkgImage.transition({opacity:0},settings.fadeOutTime,"snap", onComplete);
        };

        var resizeBackgound = function() {
            var width = backgrounds[index].image.width;
            var height = backgrounds[index].image.height;
            imageAspect = width/height;
            windowAspect = theWindow.width()/theWindow.height();
            if (windowAspect > imageAspect) {
                bkgImage.removeClass().addClass(settings.bgWidthClass);
            } else {
                bkgImage.removeClass().addClass(settings.bgHeightClass);
            }
        };

        var preloadBackgrounds = function() {
            for (var i= 0, n=settings.images.length;i<n;i++) {
                var id = "img"+i;
                var source = settings.images[i];
                var pre = new gb.ui.PreloadableImage(id, source, settings.successCallback, settings.errorCallback);
                backgrounds.push(pre);
            }
        };

        var setRefreshInterval = function() {
            theWindow.on("resizeEnd", resizeBackgound);
            if (!intervalHandler) {
                intervalHandler = setInterval(refreshImage, settings.refreshInterval);
            }
        };

        preloadBackgrounds();
        setRefreshInterval();
        return this;
    };
}(jQuery));




(function ($) {

    $.fn.search = function(options) {
        "use strict";

        var that = this;
        var intervalHandler = null;
        var previousTerm = null;

        var settings = $.extend({
            input: "search-field",
            results: "search-results",
            minchars: 4,
            requestInterval: 3000
        }, options);

        var showHeading = function(collectionName, count) {
            var heading = "<div class='heading'>" +
                    collectionName + ": " + count +
                    "</div>";
            that.resultsDiv.append(heading);
        };

        var showTracks = function(collectionName, data) {
            var tracks = data.tracks;
            if (data.count && tracks && tracks.length){
                showHeading(collectionName, data.count);
                for(var i= 0,n=tracks.length; i<n; i++) {
                    var track = "<div class='track'>" +
                        "<div class='title'>"+tracks[i].Name+"</div>" +
                        "<div class='normal'>"+tracks[i].Artist+"</div>" +
                        "<div class='normal'>"+tracks[i].Album+"</div>" +
                        "</div>";
                    that.resultsDiv.append(track);
                }
            }
        };

        var showTitle = function(collectionName, data) {
            var tracks = data.tracks;
            if (data.count && tracks && tracks.length){
                showHeading(collectionName, data.count);
                for(var i= 0,n=tracks.length; i<n; i++) {
                    var track = "<div class='track'>" +
                        "<div class='title'>" +
                        tracks[i]._id +
                        " <span class=\'count\'>"+ tracks[i].value + "</span>" +
                        "</div>" +
                        "</div>";
                    that.resultsDiv.append(track);
                }
            }
        };

        var hideResults = function() {
            that.resultsDiv.empty();
            that.resultsDiv.hide();
        };

        var showResults = function(response) {
            that.resultsDiv.show();
            var keys = response.keys;
            that.resultsDiv.empty();

            if (response.total) {
                var found = "<div class='found'>Found: " +
                    response.total + "</div>";
                that.resultsDiv.append(found);
                for (var i=0,n=keys.length;i<n;i++){
                    var collectionName = keys[i];
                    var data = response.data[collectionName];

                    if (response.data[collectionName].type==="find") {
                        showTracks(collectionName, data);
                    } else {
                        showTitle(collectionName, data);
                    }


                }
            } else {
                that.resultsDiv.append("<div class='none-found'>No results found.</div>");
            }
        };

        var requestQuery = function() {
            var term = that.searchInput.val().trim();
            if (term.length<settings.minchars) {
                hideResults();
                return;
            }
            if (term === previousTerm) {
                return;
            }
            previousTerm = term;
            var url = "/multi/"+term;
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function(response,status,jqxhr) {
                    console.log("success:", status);
                    showResults(response);
                }
            });
        };

        // call this when the window is resized
        this.onResize = function() {
            if (!that.searchInput) {
                return;
            }

            var pos = that.searchInput.position();
            var width = that.searchInput.outerWidth(true);
            var height = that.searchInput.outerHeight(true);
            that.resultsDiv.css({
                position: "absolute",
                top: (pos.top+height+10)+"px",
                left: pos.left+"px",
                width: width+"px",
                height: "600px"
            });
        };

        var init = function() {
            that.searchInput = $("#"+settings.input);
            if (typeof that.searchInput[0] === 'undefined') {
                return null;
            }
            if (!intervalHandler) {
                intervalHandler = setInterval(requestQuery, settings.requestInterval);
            }
            that.searchInput.after("<div id=\'"+settings.results+"\'></div>");
            that.resultsDiv = $("#"+settings.results);
            // reposition on window resize.
            that.onResize();
            that.resultsDiv.hide();

            // initialized.. return self.
            return that;
        };
        return init();
    };
}(jQuery));

$(function(){
    // Search Hookups.
    var $search = $("#search-field").search();
    if ($search) {
        $(window).resize(gb.util.throttle($search.onResize, 500));
    }
});

gb.Namespace(gb,"gb.ui.Timeline");
gb.ui.Timeline = new gb.Class();

/**
 * @fileOverview Render an SVG Timeline
 * @author Kyo Suayan
 * @module gb.ui.Timeline
 * @requires Raphael
 *
 * @example
 * var timeline = new gb.ui.TimeLine();
 *
 */

gb.ui.Timeline.include({

    MONTHS: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],

    /**
     *
     * @param selector the parentSelector
     * @instance
     */
    init: function(selector) {
        "use strict";
        this.x = 0;
        this.y = 0;
        this.margin = 70;
        this.trackHeight = 24;
        this.yTrack = 200;
        this.paper = null;
        this.selected = null;
        this.startDateLabel = null;
        this.endDateLabel = null;
        this.htmlContent = null;
        this.id = selector;
        this.jqContainer = $("#"+this.id);
        this.ajaxURL = "/api/timeline";
        this.timelineData = null;

        var that = this;
        $.getJSON(this.ajaxURL, function(data) {
            that.timelineData = data;
            that.onDataHandler();
        });
    },

    resize: function() {
        if (!this.htmlContent) {
            this.htmlContent = this.jqContainer.html();
        }
        this.width = this.jqContainer.width();
        this.height = this.jqContainer.height();
        this.trackWidth = this.width - (this.margin * 2);
        // recompute on window resize ...
        if (this.paper) {
            this.paper.clear();
        }
        if (this.width > 768) {
            this.jqContainer.empty();
            this.paper = Raphael(this.id, this.width, this.height);
            this.processData(this.timelineData);
            this.draw();
        } else {
            this.jqContainer.html(this.htmlContent);
        }
    },

    processData: function(rawData) {
        this.dataPoints = [];
        var min = null;
        var max = null;
        var len = rawData.length;
        var entry = null;
        // first pass
        for (var i = 0, n=len; i<n; i++){
            entry = rawData[i];
            if (entry.startDate) {
                min = (min) ? Math.min(entry.startDate, min) : entry.startDate;
                max = (max) ? Math.max(entry.startDate, max) : entry.startDate;
            }
            if (!entry.endDate) {
                entry.endDate = new Date().valueOf();
            }
            min = (min) ? Math.min(entry.endDate, min) : entry.endDate;
            max = (max) ? Math.max(entry.endDate, max) : entry.endDate;
        }
        var xRange = max - min;
        this.xMin = min;
        this.xMax = max;
        this.xScale = this.trackWidth/xRange; // px/MS
        // second pass: transform to screen position
        for (i = 0, n=len; i<n; i++){
            entry = rawData[i];
            entry.xStart = Math.floor(this.margin + this.xScale * (entry.startDate-min));
            entry.xEnd = Math.floor(this.margin + this.xScale * (entry.endDate-min));
            this.dataPoints.push(entry);
        }
    },

    draw: function() {
        var that = this;
        var line = "M" + (this.x + this.margin) + " " + this.yTrack +
            "L" + (this.width - this.margin) + " " + this.yTrack;
        this.track = this.paper.path(line);
        var strokeStyle = {
            "stroke":"#ccc",
            "stroke-width": this.trackHeight,
            "stroke-linecap": "round"
        };
        this.track.attr(strokeStyle);

        var onHover = function(e) {
            var sp = this.data("startPoint");
            var ep = this.data("endPoint");
            var dataPoint = this.data("dataPoint");

            that.selected = that.drawSegment(dataPoint.startDate, dataPoint.endDate);
            that.selected.animate({"opacity":1}, 500, "easeInOut");
            sp.stop();
            sp.toFront();
            ep.stop();
            ep.toFront();
            sp.animate({fill: "#DE001E"}, 50, "linear");
            ep.animate({cx: dataPoint.xEnd, fill: "#FF8400"}, 300, "easeInOut");
            that.drawHeader(dataPoint);
            if (that.startDateLabel) {
                that.startDateLabel.remove();
            }
            if (that.endDateLabel) {
                that.endDateLabel.remove();
            }
            this.toFront();
            that.startDateLabel = that.drawDate(dataPoint.startDate);
            that.endDateLabel = that.drawDate(dataPoint.endDate);
            that.startDateLabel.animate({opacity:1}, 300, "easeInOut");

            if (dataPoint.startDate !== dataPoint.endDate){
                var x1 = that.startDateLabel.getBBox().x2;
                var x2 = that.endDateLabel.getBBox().x;
                if (x1>x2) {
                    that.endDateLabel.transform("T20,0");
                }
                that.endDateLabel.animate({opacity:1}, 300, "easeInOut");
            }
        };

        var onHoverOut = function(e) {
            var sp = this.data("startPoint");
            var ep = this.data("endPoint");
            var dataPoint = this.data("dataPoint");
            if (that.selected) {
                that.selected.remove();
            }
            if (that.startDateLabel) {
                that.startDateLabel.remove();
            }
            if (that.endDateLabel) {
                that.endDateLabel.remove();
            }
            sp.animate({fill: "#333"}, 50, "linear");
            ep.animate({cx: dataPoint.xStart, fill: "#999"}, 500, "easeInOut");

        };

        var onClick = function(e) {
            var dataPoint = this.data("dataPoint");
        };

        var styles = {
            hoverPoint: {"fill":"#00b", "stroke-width":"0", "opacity":0},
            startPoint: {"opacity": 0, "cx":0, "fill":"#ccc", "stroke-width": "0"},
            endPoint: {"fill":"#999", "stroke-width": "0"}
        };

        for (var i= 0,n=this.dataPoints.length; i<n; i++) {
            var entry = this.dataPoints[i];
            var hoverPoint = this.paper.circle(entry.xStart, this.yTrack, 15);
            hoverPoint.attr(styles.hoverPoint);
            var startPoint = this.paper.circle(entry.xStart, this.yTrack, 10);
            startPoint.attr(styles.startPoint);
            startPoint.animate({"opacity": 1, "fill":"#333", cx: entry.xStart }, i * 100, "easeInOut");
            var endPoint = this.paper.circle(entry.xStart, this.yTrack, 5);
            endPoint.attr(styles.endPoint);
            hoverPoint.toFront();
            hoverPoint.data("dataPoint", entry);
            hoverPoint.data("startPoint", startPoint);
            hoverPoint.data("endPoint", endPoint);
            hoverPoint.hoverInBounds(onHover, onHoverOut);
            hoverPoint.click(onClick);
        }

        var last = this.dataPoints.length - 1;
        this.drawHeader(this.dataPoints[last]);
        this.drawTicks();
    },

    drawHeader: function(dataPoint) {
        var headerStyle = {"fill":"#fff","font-size":"32pt","text-anchor":"start","font-family":"Source Sans Pro"};
        var subheadStyle = {"fill":"#fff","font-size":"16pt","text-anchor":"start","font-family":"Source Sans Pro"};
        var subhead2Style = {"fill":"#fff","font-size":"16pt","text-anchor":"start","font-family":"Source Sans Pro"};
        if (this.title) {
            this.title.remove();
        }
        this.title = this.paper.text(this.margin, 40, dataPoint.title);
        this.title.attr(headerStyle);

        if (this.subhead) {
            this.subhead.remove();
        }
        this.subhead = this.paper.text(this.margin, 70, dataPoint.employer);
        this.subhead.attr(subheadStyle);

        if (this.location) {
            this.location.remove();
        }
        this.location = this.paper.text(this.margin, 94, dataPoint.location);
        this.location.attr(subhead2Style);
    },


    drawTicks: function() {
        var dateStyle = { "fill":"#fff","font-size":"10pt","font-family":"Source Sans Pro"};
        var startDate = new Date(this.dataPoints[0].startDate);
        var startYear = startDate.getUTCFullYear();
        var endDate = new Date(this.dataPoints[this.dataPoints.length - 1].endDate);
        var endYear = endDate.getUTCFullYear();

        for (var i = startYear+1; i <= endYear; i++) {
            var xPos = new Date("Jan 1, "+i).valueOf();
            var dateXPos = Math.floor(this.margin + ((xPos - this.xMin) * this.xScale));
            this.paper.text(dateXPos, this.yTrack + 30, i).attr(dateStyle);
        }
    },


    drawDate: function(timestamp) {
        var monthStyle = { "opacity": 0, "fill" : "#fff", "font-size": "16pt", "font-family" : "Source Sans Pro" };
        var yearStyle = { "opacity": 0, "fill" : "#fff", "font-size": "12pt", "font-family" : "Source Sans Pro" };
        var dateXPos = Math.floor(this.margin + ((timestamp - this.xMin) * this.xScale));
        var date = new Date(timestamp);
        var monthStr = this.MONTHS[date.getUTCMonth()];
        var year = date.getUTCFullYear();
        var marker = this.paper.set();
        marker.push(
            this.paper.text(dateXPos, this.yTrack - 40, monthStr).attr(monthStyle),
            this.paper.text(dateXPos, this.yTrack - 20, year).attr(yearStyle)
        );
        return marker;
    },

    drawSegment: function(start, end) {
        var startX = Math.floor(this.margin + ((start - this.xMin) * this.xScale));
        var endX = Math.floor(this.margin + ((end - this.xMin) * this.xScale));
        var line = "M" + startX + " " + this.yTrack + "L" + endX + " " + this.yTrack;

        if (this.selected) {
            this.selected.remove();
        }
        line = this.paper.path(line);
        var strokeStyle = {
            "opacity":0.7,
            "stroke":"#FAD905",
            "stroke-width": this.trackHeight - 4,
            "stroke-linecap": "round"
        };
        return line.attr(strokeStyle);
    },

    onResizeEndHandler: function() {
        if (this.paper) {
            this.paper.clear();
        }
        this.resize();
    },

    onDataHandler: function() {
        var that = this;
        $(window).on("resizeEnd", function(){that.onResizeEndHandler();});
        $(window).on("resize", function(){if (that.paper) {that.paper.clear();}});
        this.onResizeEndHandler();
    }
});



gb.Namespace(gb,"gb.ui.FullScreen");
gb.ui.FullScreen = new gb.Class();

/**
 * @fileOverview A rotating slideshow running on a page's background.
 * Requires jquery.fullscreen.js
 *
 * @author Kyo Suayan
 * @module gb.ui.FullScreen
 * @requires gb.util
 *
 * @example
 * var fs = new gb.ui.Fullscreen();
 */
gb.ui.FullScreen.include({

    /**
     * @instance
     */
    init: function() {
        "use strict";
        this.spinner = $("#spinner");
        this.spinner.show();
        this.mediaHost = "//media.suayan.com/";
        this.images = [];
        this.howMany = 3;
        this.countLoaded = 0;
        this.initImageList();
        this.initBackground();
        console.log("init: FullScreen.");
    },

    /**
     * @instance
     */
    initBackground: function() {
        var that = this;
        $("body").fullscreen({
            "refreshInterval": 30000,
            "fadeOutTime": 5000,
            "fadeInTime": 3000,
            "successCallback": function(){ that.checkSpinner(); },
            "errorCallback": function(){ that.checkSpinner(); },
            "images": this.images
        });
    },

    /**
     * Event handler to trigger every time an image
     * is loaded or has failed loading.
     * @inner
     */
    checkSpinner: function() {
        this.countLoaded++;
        if (this.countLoaded === this.howMany) {
            this.spinner.hide();
        }
    },

    /**
     * Prepopulate images[] array.
     * @inner
     */
    initImageList: function() {
        this.images = [];
        for (var i=1; i<=this.howMany; i++) {
            var numStr = gb.util.zeroFill(i,3);
            this.images.push(this.mediaHost+"images/image-"+numStr+".jpg");
        }
    }
});

gb.Namespace(gb,"gb.ui.Stage");
gb.ui.Stage = gb.Class(gb.ui.Tile);

/**
 * @fileOverview A simple carousel using gb.ui.Tiles.
 * @author Kyo Suayan
 * @module gb.ui.Stage
 * @requires gb.ui.Tile
 * @requires gb.util.TimeOutCycle
 *
 * @example
 * var stage = new gb.ui.Stage("#parent");
 * stage.show();
 *
 */
gb.ui.Stage.include({

    /**
     * @memberOf gb.ui.Stage
     * @static
     */
    COLORS: ["#333", "#3E606F",  "#002A4A", "#FF9311", "#E33200",
             "#002A4A", "#D1DBBD", "#91AA9D", "#3E606F", "#193441",
             "#3C3658", "#3EC8B7", "#7CD0B4", "#B9D8B1", "#F7E0AE",
             "#FFF1CE", "#17607D",],

    /**
     * @param selector
     * @instance
     */
    init: function(selector) {
        "use strict";

        this.tiles = [];
        this.tileOffsets = [];
        this.howMany = 20;
        this.intervalMS = 15000;
        this.currentIndex = 0;

        if (selector) {
            var that = this;
            this.selector = selector;
            this.jq = $("#"+selector);
            this.contentSelector = "#"+selector+"-content";
            this.content = $("<div id='"+selector+"-content'></div>");
            this.jq.append(this.content);

            this.initTiles();
            this.loadTileData();
            this.show();

            this.timeoutCycle = new gb.util.TimeOutCycle(this.intervalMS,
                function(){that.rotate();});
            this.touchSurface = new gb.ui.TouchSurface( this.content[0],
                function(evt, dir, phase, swipetype, distance){
                    that.onTouchEvent(evt, dir, phase, swipetype, distance);});

            // $(window).resize(function(){that.fadeOut();});
            $("#stage-next").on("click", function(){that.goToNext();});
            $("#stage-prev").on("click", function(){that.goToPrevious();});

            console.log("init: Stage.");
        }
    },

    /**
     * @inner
     */
    initTiles: function() {
        this.tiles = [];
        this.tileOffsets = [];
        var colorIndex = 0;
        for (var i=0; i<this.howMany; i++) {
            var tile = new gb.ui.Tile(this.contentSelector,
            {
                "id": "tile-"+i,
                "class" : "tile"
            });
            var el = tile.jq.get(0);
            if (el) {
                el.style.backgroundColor = this.COLORS[colorIndex];
            }
            this.tiles.push(tile);
            if (colorIndex > this.COLORS.length - 2) {
                colorIndex = 0;
            } else {
                colorIndex++;
            }
        }
        this.resizeTiles();
    },

    loadTileData: function() {
        var that = this;

        $.get( "/api/tiles", function( data ) {
            var current = 2;
            var template = JST["handlebars/tile.hbs"];
            for(var i = 0, n=data.length; i<n; i++) {
                that.tiles[current].jq.html(template(data[i]));
                current++;
            }
        });
    },
    /**
     * onTouchEvent handler
     * @param evt event object
     * @param dir direction
     * @param phase start,move,end
     * @param swipetype
     * @param distance
     */
    onTouchEvent: function(evt, dir, phase, swipetype, distance) {
        // dragging
        if (phase === "move" && this.tileOffsets) {
            var scale = 3;
            var offset = (-1 * this.tileOffsets[this.currentIndex]) + (distance * scale);
            var maxOffset = -1 * (this.tileOffsets[1] * (this.tileOffsets.length-1));
            if (offset < 0 && offset > maxOffset) {
                this.content.css({x: offset});
            } else {
                return;
            }
        }
        // end of swipe
        if (phase !== "end") {
            return;
        }

        switch (dir) {
            case "left": this.goToNext();
                break;
            case "right": this.goToPrevious();
                break;
            default: break;
        }
    },


    /**
     * Recalculate dimensions of every tile under
     * this.tiles[].
     * @inner
     */
    resizeTiles: function() {
        var xPos = 0,
        stageWidth = this.jq.width(),
        stageHeight = this.jq.height(),
        t = this.tiles;
        for (var i= 0,n=t.length; i<n; i++) {
            t[i].jq.width(stageWidth);
            t[i].jq.height(stageHeight);
            var el = t[i].jq.get(0);
            if (el) {
                el.style.top = "0px";
                el.style.left = xPos + "px";
            }
            this.tileOffsets[i] = xPos;
            xPos += stageWidth;
        }
    },

    /**
     * @instance
     * @returns {boolean}
     */
    isRunning: function() {
        return (this.timeoutCycle.isRunning()===true);
    },

    /**
     * @instance
     */
    start: function() {
        this.timeoutCycle.start();
    },

    /**
     * @instance
     */
    stop: function() {
        this.timeoutCycle.stop();
    },

    /**
     * @instance
     */
    rotate: function() {
        if (this.currentIndex<this.tiles.length-1) {
            this.goToNext();
        } else {
            this.goTo(0);
        }
    },

    /**
     * @instance
     */
    goToPrevious: function() {
        if (this.currentIndex>0) {
            this.currentIndex--;
        } else {
            this.currentIndex = 0;
        }
        this.goTo(this.currentIndex);
    },

    /**
     * @instance
     */
    goToNext: function() {
        if (this.currentIndex < this.tiles.length - 2) {
            this.currentIndex++;
        } else {
            this.currentIndex = this.tiles.length - 1;
        }
        this.goTo(this.currentIndex);
    },


    /**
     * Go to 'index'.
     * @instance
     * @param index {number} the index to go to
     */
    goTo: function(index) {
        this.currentIndex = index;
        var xOffset = -1 * this.tileOffsets[index];
        this.content.transition({x:xOffset, queue:false}, 1000, "ease");
    },

    /**
     * Display the stage.
     * @instance
     */
    show: function() {
        this.jq.css({"opacity":1});
        this.goTo(this.currentIndex);
    },

    hide: function() {
        this.jq.hide();
    },

    fadeOut: function() {
        this.jq.css({"opacity":0});
    },

    /**
     * Event handler for "resizeEnd".
     * @instance
     */
    onResizeEndHandler: function() {
        // this.hide();
        this.resizeTiles();
        this.show();
    }
});

gb.Namespace(gb,"gb.ui.ContentManager");
gb.ui.ContentManager = new gb.Class();

/**
 * @fileOverview gb.ui.ContentManager is the main page controller
 * responsible for instantiating other gb.ui objects on the page.
 * @author Kyo Suayan
 * @module gb.ui.ContentManager
 * @requires gb.ui.FullScreen
 * @requires gb.ui.Stage
 * @requires gb.ui.Timeline
 * @example
 * var contentManager = new gb.ui.ContentManger("#parent");
 *
 */

gb.ui.ContentManager.include({

    /**
     * @param selector
     * @instance
     */
    init: function(selector) {
        "use strict";

        var that = this;
        this.content = $(selector);
        if (this.content.html()) {
            this.visible = true;
            this.fullscreen = new gb.ui.FullScreen();
            this.stage = new gb.ui.Stage("stage");
            this.timeline = new gb.ui.Timeline("tile-1");
            $("#tile-0").html('<img src="/img/splash-01.svg"/>');
            $("#slideshow-button").click(function(){that.toggleSlideShow();});
            $("#play-button").click(function(){that.toggleStage();});
            $(window).on("resizeEnd", function(){that.onResizeEndHandler();});
            console.log("init: ContentManager");
        }
    },

    /**
     * @instance
     */
    onResizeEndHandler: function() {
        this.timeline.onResizeEndHandler();
        this.stage.onResizeEndHandler();
    },

    /**
     * @instance
     */
    toggleSlideShow: function() {
        this.visible = (!this.visible);
        if (this.visible) {
            $("#ui-toolbar .glyphicon-home")
                .removeClass("glyphicon-home")
                .addClass("glyphicon-picture");
            this.show();
        } else {
            $("#ui-toolbar .glyphicon-picture")
                .removeClass("glyphicon-picture")
                .addClass("glyphicon-home");
            this.hide();
        }
    },

    /**
     * @instance
     */
    toggleStage: function() {
        if (this.stage.isRunning()) {
            $("#ui-toolbar .glyphicon-pause")
                .removeClass("glyphicon-pause")
                .addClass("glyphicon-play");
            this.stage.stop();
        } else {
            $("#ui-toolbar .glyphicon-play")
                .removeClass("glyphicon-play")
                .addClass("glyphicon-pause");
            this.stage.start();
        }
    },

    /**
     * @instance
     */
    show: function() {
        var that = this;
        this.content.transition({opacity:1},
            2000,
            function(){
                that.content.attr({"visibility":"visible", "display":"block"});
            });
    },

    /**
     * @instance
     */
    hide: function() {
        var that = this;
        this.content.transition({opacity:0},
            2000,
            function(){
                that.content.attr({"visibility":"hidden", "display":"none"});
            });
    }
});


gb.Namespace(gb,"gb.ws.SocketClient");
gb.ws.SocketClient = new gb.Class();

gb.ws.SocketClient.include({

    init: function() {
        var that = this;
        if (typeof io !== 'undefined' && io) {
            console.log("Init gb.ws.SocketClient.");
            this.socket = io.connect(socketHost);

            this.socket.on('connect', function(){
                console.log("Client connected.");
                that.onConnect();
            });

            this.socket.on('updatesystem', function(source, message) {
                that.onUpdateSystem(source, message);
            });

            this.socket.on('broadcast', function(source,message) {
                that.updateCell(message);
                // console.log("broadcast", source, message);
            });
        }
    },

    updateCell: function(message) {
        var item = message.item,
            jq = $("#grid-"+item.group+"-"+item.host+"-"+item.path);
            jq.transition({
                opacity: 0,
                duration: 3000
            });
            jq.text(message.statusCode + ": " + message.time);
            jq.transition({
                opacity: 1,
                duration: 3000
            });
    },

    appendMessage: function(timestamp, username, message) {
        var obj = {
            ts: moment(timestamp).fromNow(),
            username: username,
            message: message
        };
    },

    onConnect: function() {
        var that = this;
        $.ajax({
            url: "/api/config",
            dataType: "json",
            success: that.renderGrid
        });
    },

    onUpdateSystem: function (source, message) {
        console.log("updatesystem", source, message);
    },

    emit: function(channel, message) {
        this.socket.emit(channel, message);
    },

    renderGrid: function(data) {

        var groups = data.groups, grids = [];

        for (var g=0,gsize=groups.length; g<gsize; g++) {

            var groupName = groups[g].name,
                hosts = groups[g].hosts,
                paths = groups[g].paths,
                gridHeaders = [],
                gridRows = [];

            for (var h=0, hsize=hosts.length; h<hsize; h++) {
                gridHeaders.push(groupName+"-"+hosts[h]);
            }

            for (var p=0, psize=paths.length; p<psize; p++) {
                var gridCells = [];
                for (h=0, hsize=hosts.length; h<hsize; h++) {
                    gridCells.push({"cellName": groupName+"-"+hosts[h]+"-"+paths[p]});
                }
                gridRows.push({
                    "rowName": paths[p],
                    "gridCells": gridCells
                });
            }
            grids.push({
                "groupName": groupName,
                "gridHeaders": gridHeaders,
                "gridRows" : gridRows
            });
        }
        var template = JST["handlebars/gridGroups.hbs"];
        $("#grid").html(template({gridList:grids}));
    }
});

$(function(){
    var chatClient = new gb.ws.SocketClient();


});

$(function(){
    "use strict";
    var contentManager = new gb.ui.ContentManager("#content");
    $(window).resize(gb.util.throttle(gb.ui.onResizeHandler, 500));

    if ($("#twitter").length) {
        $.ajax({
            url: "/api/twitter",
            success: function(data) {
                if (data && data.status === "ok") {
                    var tweetTemplate = JST["handlebars/tweet.hbs"],
                        tweets = data.data;
                    for (var i= 0,n=tweets.length; i<n; i++) {
                        var dt = gb.util.parseTwitterDate(tweets[i]['created_at']),
                            permalink = (tweets[i].entities.urls.length) ? tweets[i].entities.urls[0].expanded_url : "";
                        tweets[i].ago = moment(dt).fromNow();
                        tweets[i].permalink = permalink;
                        $("#twitter").append($(tweetTemplate(tweets[i])));
                    }

                }
            }
        });
    }

    if ($("#vimeo").length) {
        $.ajax({
            url: "/api/vimeo/5",
            success: function(data) {
                if (data && data.status === "ok") {
                    var vimeoTemplate = JST["handlebars/vimeo.hbs"],
                        videos = data.body.data;
                    for (var i= 0,n=videos.length; i<n; i++) {
                        var vid = videos[i];
                        if (vid.privacy && vid.privacy.view === "anybody") {
                            vid.ago = moment(vid.created_time).fromNow();
                            var jq = $(vimeoTemplate(vid));
                            jq.find("iframe").attr("width",700).attr("height",395);
                            $("#vimeo").append(jq);
                        }
                    }
                }
            }
        });
    }

});
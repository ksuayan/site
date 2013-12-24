var gb = gb || {};

gb.Namespace = function (ns, ns_string) {
    var parts = ns_string.split('.'),
        parent = ns,
        pl, i;
    if (parts[0] == "gb") {
        parts = parts.slice(1);
    }
    pl = parts.length;
    for (i = 0; i < pl; i++) {
        //create a property if it doesnt exist
        if (typeof parent[parts[i]] == 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

gb.Class = function(parent){
    var klass = function() {
        this.init.apply(this,arguments);
    };

    if (parent) {
        var subclass = function(){};
        subclass.prototype = parent.prototype;
        klass.prototype =  new subclass();
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
        if (extended) extended(klass);
    };

    klass.include = function(obj) {
        var included = obj.included;
        for (var i in obj) {
            klass.fn[i] = obj[i];
        }
        if (included) included(klass);
    };
    return klass;
};

;
gb.Namespace(gb, "gb.util");

gb.util.RandomArray = function(size, scale) {
    var r = new Array(size);
    for (var i = 0; i < size; i++) {
        r[i] = Math.floor(Math.random() * (scale+1));
    }
    return r;
};

gb.util.ArrayMax = function(array){
    return Math.max.apply(Math, array);
};

gb.util.ArrayMin = function(array){
    return Math.min.apply(Math, array);
};

gb.util.ZeroFill = function(number, width) {
    width -= number.toString().length;
    if ( width > 0 ) {
        return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
};

gb.util.throttle = function(callback, timeoutMS) {
    var timeoutID , timeout = timeoutMS || 500;
    return function () {
        var scope = this , args = arguments;
        clearTimeout(timeoutID);
        timeoutID = setTimeout(function(){
            callback.apply( scope , Array.prototype.slice.call(args) );
        } , timeout );
    };
};;// Shared UI objects.

gb.Namespace(gb, "gb.ui");

// breakpoints matched to global.less
gb.ui.ScreenSizes = {
    "sm": 480,
    "md": 768,
    "lg": 992,
    "xl": 1200
};

gb.ui.screenMode = "lg";

gb.ui.onResizeHandler = function(){
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
};;gb.Namespace(gb, "gb.ui.PreloadableImage");
gb.ui.PreloadableImage = new gb.Class();

gb.ui.PreloadableImage = function(id, source, onSuccess, onError) {
    "use strict";
    this.id = id;
    this.startTime = new Date().valueOf();
    this.endTime = this.startTime;
    this.image = new Image();
    this.SetSource(source);
    this.SetOnLoad(onSuccess);
    this.SetOnError(onError);
};

gb.ui.PreloadableImage.prototype.SetSource = function(source) {
    if (!source) {
        this.image.src = "";
        return;
    }
    this.image.src = source;
};

gb.ui.PreloadableImage.prototype.SetOnLoad = function(onSuccess) {
    var that = this;
    if (!onSuccess || typeof onSuccess != 'function') {
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
};

gb.ui.PreloadableImage.prototype.SetOnError = function(onError) {
    var that = this;
    if (!onError || typeof onError != 'function') {
        this.image.onerror = function(){
            that.endTime = new Date().valueOf();
        };
        return;
    }
    this.endTime = new Date().valueOf();
    this.image.onerror = onError;

};

gb.ui.PreloadableImage.prototype.GetTotalTimeMS = function() {
    return (this.endTime - this.startTime);
};;gb.Namespace(gb,"gb.ui.Tile");
gb.ui.Tile = new gb.Class();

gb.ui.Tile.include({
    init: function(parent, elementAttributes) {
        "use strict";
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
});;gb.Namespace(gb,"gb.util.TimeOutCycle");
gb.util.TimeOutCycle = new gb.Class();

gb.util.TimeOutCycle = function(timeoutMS, callback) {
    "use strict";
    this.timeoutMS = timeoutMS;
    this.isRunning = false;
    this.timeoutHandle = null;
    this.tickHandler = function(){
        console.log("default tickHandler");
    };
    this.setTimeoutMS(timeoutMS);
    this.setTickHandler(callback);
};

gb.util.TimeOutCycle.prototype.setTickHandler = function(callback) {
    if (callback && typeof callback == 'function') {
        this.tickHandler = callback;
    }
};

gb.util.TimeOutCycle.prototype.setTimeoutMS = function(timeoutMS) {
    if (timeoutMS) {
        this.timeoutMS = timeoutMS;
    }
};

gb.util.TimeOutCycle.prototype.start = function() {
    this.isRunning = true;
    this._tick();
};

gb.util.TimeOutCycle.prototype.stop = function() {
    this.isRunning = false;
    if (this.timeoutHandle)
        clearTimeout(this.timeoutHandle);
};

gb.util.TimeOutCycle.prototype._tick = function() {
    if (!this.isRunning) {
        return;
    }
    this.tickHandler();
    this._setNext();
};

gb.util.TimeOutCycle.prototype._setNext = function() {
    var that = this;
    if (this.isRunning) {
        this.timeoutHandle = setTimeout(function(){that._tick();}, this.timeoutMS);
    }
};

;//
// $.fn.fullscreen()
// Rotating fullscreen background images.
//
// Dependencies:
// gb-preloadable-image.js: gb.ui.PreloadableImage



(function ($) {

    $.fn.fullscreen = function(options) {

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


;(function ($) {

    $.fn.search = function(options) {

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
            var url = "/multi-search/"+term;
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
            if (!that.searchInput) return;

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
            if (typeof that.searchInput[0] == 'undefined') {
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
});;$(function(){

    var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var Timeline = function(onDataHandler) {
        this.x = 0;
        this.y = 0;
        this.margin = 40;
        this.trackHeight = 24;
        this.yTrack = 160;
        this.paper = null;
        this.selected = null;
        this.startDateLabel = null;
        this.endDateLabel = null;
        this.htmlContent = null;
        this.id = "timeline";
        this.jqContainer = $("#"+this.id);
        this.ajaxURL = "/api/timeline";
        this.timelineData = null;
        if (onDataHandler && typeof onDataHandler === 'function') {
            this.onDataHandler = onDataHandler;
        }

        var that = this;

        $.getJSON(this.ajaxURL, function(data) {
            that.timelineData = data;
            onDataHandler();
        });
    };

    Timeline.prototype.Resize = function() {
        if (!this.htmlContent)
            this.htmlContent = this.jqContainer.html();
        this.width = this.jqContainer.width();
        this.height = this.jqContainer.height();
        this.trackWidth = this.width - (this.margin * 2);
        // recompute on window resize ...
        if (this.paper)
            this.paper.clear();
        if (this.width > 768) {
            this.jqContainer.empty();
            this.paper = Raphael(this.id, this.width, this.height);
            this.ProcessData(this.timelineData);
            this.Draw();
        } else {
            this.jqContainer.html(this.htmlContent);
        }
    };

    Timeline.prototype.ProcessData = function(rawData) {
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
    };

    Timeline.prototype.Draw = function() {
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

            that.selected = that.DrawSegment(dataPoint.startDate, dataPoint.endDate);
            that.selected.animate({"opacity":1}, 500, "easeInOut");
            sp.stop();
            sp.toFront();
            ep.stop();
            ep.toFront();
            sp.animate({fill: "#DE001E"}, 50, "linear");
            ep.animate({cx: dataPoint.xEnd, fill: "#FF8400"}, 300, "easeInOut");
            that.DrawHeader(dataPoint);
            if (that.startDateLabel) that.startDateLabel.remove();
            if (that.endDateLabel) that.endDateLabel.remove();
            this.toFront();
            that.startDateLabel = that.DrawDate(dataPoint.startDate);
            that.endDateLabel = that.DrawDate(dataPoint.endDate);
            that.startDateLabel.animate({opacity:1}, 300, "easeInOut");

            if (dataPoint.startDate != dataPoint.endDate){
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
            if (that.selected) that.selected.remove();
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
        this.DrawHeader(this.dataPoints[last]);
        this.DrawTicks();
    };

    Timeline.prototype.DrawHeader = function(dataPoint) {
        var headerStyle = {"font-size":"32pt","text-anchor":"start","font-family":"Source Sans Pro"};
        var subheadStyle = {"font-size":"16pt","text-anchor":"start","font-family":"Source Sans Pro"};
        var subhead2Style = {"font-size":"16pt","text-anchor":"start","font-family":"Source Sans Pro"};
        if (this.title) this.title.remove();
        this.title = this.paper.text(this.margin, 40, dataPoint.title);
        this.title.attr(headerStyle);

        if (this.subhead) this.subhead.remove();
        this.subhead = this.paper.text(this.margin, 70, dataPoint.employer);
        this.subhead.attr(subheadStyle);

        if (this.location) this.location.remove();
        this.location = this.paper.text(this.margin, 94, dataPoint.location);
        this.location.attr(subhead2Style);
    };


    Timeline.prototype.DrawTicks = function() {
        var dateStyle = { "fill":"#333","font-size":"10pt","font-family":"Source Sans Pro"};
        var startDate = new Date(this.dataPoints[0].startDate);
        var startYear = startDate.getUTCFullYear();
        var endDate = new Date(this.dataPoints[this.dataPoints.length - 1].endDate);
        var endYear = endDate.getUTCFullYear();

        for (var i = startYear+1; i <= endYear; i++) {
            var xPos = new Date("Jan 1, "+i).valueOf();
            var dateXPos = Math.floor(this.margin + ((xPos - this.xMin) * this.xScale));
            this.paper.text(dateXPos, this.yTrack + 30, i).attr(dateStyle);
        }
    };


    Timeline.prototype.DrawDate = function(timestamp) {
        var monthStyle = { "opacity": 0, "fill" : "#333", "font-size": "16pt", "font-family" : "Source Sans Pro" };
        var yearStyle = { "opacity": 0, "fill" : "#333", "font-size": "12pt", "font-family" : "Source Sans Pro" };
        var dateXPos = Math.floor(this.margin + ((timestamp - this.xMin) * this.xScale));
        var date = new Date(timestamp);
        var monthStr = month[date.getUTCMonth()];
        var year = date.getUTCFullYear();
        var marker = this.paper.set();
        marker.push(
            this.paper.text(dateXPos, this.yTrack - 40, monthStr).attr(monthStyle),
            this.paper.text(dateXPos, this.yTrack - 20, year).attr(yearStyle)
        );
        return marker;
    };

    Timeline.prototype.DrawSegment = function(start, end) {
        var startX = Math.floor(this.margin + ((start - this.xMin) * this.xScale));
        var endX = Math.floor(this.margin + ((end - this.xMin) * this.xScale));
        var line = "M" + startX + " " + this.yTrack + "L" + endX + " " + this.yTrack;

        if (this.selected) this.selected.remove();
        line = this.paper.path(line);
        var strokeStyle = {
            "opacity":0.7,
            "stroke":"#FAD905",
            "stroke-width": this.trackHeight - 4,
            "stroke-linecap": "round"
        };
        return line.attr(strokeStyle);
    };


    var onResizeHandler = function() {
        if (timeline.paper)
            timeline.paper.clear();
        timeline.Resize();
    };

    var onData = function() {
        $(window).on("resizeEnd", onResizeHandler);
        $(window).on("resize", function(){if (timeline.paper) timeline.paper.clear();});
        onResizeHandler();
    };

    // Instantiate.
    var timeline = new Timeline(onData);
});
;gb.Namespace(gb,"gb.ui.FullScreen");
gb.ui.FullScreen = new gb.Class();

gb.ui.FullScreen.include({

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

    initBackground: function() {
        var that = this;
        $("body").fullscreen({
            "refreshInterval": 10000,
            "fadeOutTime": 5000,
            "fadeInTime": 3000,
            "successCallback": function(){ that.checkSpinner(); },
            "errorCallback": function(){ that.checkSpinner(); },
            "images": this.images
        });
    },

    // Setup Spinner
    checkSpinner: function() {
        this.countLoaded++;
        if (this.countLoaded == this.howMany) {
            this.spinner.hide();
        }
    },

    // Initialize rotating background images[]
    initImageList: function() {
        this.images = [];
        for (var i=1;i<=this.howMany;i++) {
            var numStr = gb.util.ZeroFill(i,3);
            this.images.push(this.mediaHost+"images/image-"+numStr+".jpg");
        }
    }
});;gb.Namespace(gb,"gb.ui.Stage");
gb.ui.Stage = gb.Class(gb.ui.Tile);

gb.ui.Stage.include({

    colors: ["#FFFFFF", "#D1DBBD", "#91AA9D", "#3E606F", "#193441",
             "#002A4A", "#17607D", "#FFF1CE", "#FF9311", "#E33200",
             "#3C3658", "#3EC8B7", "#7CD0B4", "#B9D8B1", "#F7E0AE"],

    init: function(selector) {
        "use strict";

        var that = this;
        this.tiles = [];
        this.tileOffsets = [];
        this.howMany = 15;
        this.intervalMS = 8000;
        this.currentIndex = 0;
        this.selector = selector;
        this.jq = $("#"+selector);
        this.contentSelector = "#"+selector+"-content";
        this.content = $("<div id='"+selector+"-content'></div>");
        this.jq.append(this.content);
        this.initTiles();
        this.show();

        this.timeoutCycle = new gb.util.TimeOutCycle(this.intervalMS,
            function(){that.rotate();});
        this.timeoutCycle.start();

        $(window).resize(function(){that.hide();});
        $("#stage-next").on("click", function(){that.goToNext();});
        $("#stage-prev").on("click", function(){that.goToPrevious();});

        console.log("init: Stage.");
    },

    initTiles: function() {

        this.tiles = [];
        this.tileOffsets = [];
        var colorIndex = 0;
        var xPos = 0;

        for (var i=0; i<this.howMany; i++) {
            var tile = new gb.ui.Tile(this.contentSelector,
            {
                "id": "tile-"+i,
                "class" : "tile"
            });
            tile.jq.html("<p>Tile: "+i+"</p>");
            var el = tile.jq.get(0);
            el.style.backgroundColor = this.colors[colorIndex];
            this.tiles.push(tile);
            if (colorIndex > this.colors.length - 2) {
                colorIndex = 0;
            } else {
                colorIndex++;
            }
        }
        this.resizeTiles();
    },

    resizeTiles: function() {
        var xPos = 0;
        var stageWidth = this.jq.width();
        var stageHeight = this.jq.height();
        var t = this.tiles;

        for (var i= 0,n=t.length; i<n; i++) {
            t[i].jq.width(stageWidth);
            t[i].jq.height(stageHeight);
            var el = t[i].jq.get(0);
            el.style.top = "0px";
            el.style.left = xPos + "px";
            this.tileOffsets[i] = xPos;
            xPos += stageWidth;
        }
    },

    rotate: function() {
        if (this.currentIndex<this.tiles.length-1) {
            this.goToNext();
        } else {
            this.goTo(0);
        }
    },

    goToPrevious: function() {
        if (this.currentIndex>0) {
            this.currentIndex--;
        } else {
            this.currentIndex = 0;
        }
        this.goTo(this.currentIndex);
    },

    goToNext: function() {
        if (this.currentIndex < this.tiles.length - 2) {
            this.currentIndex++;
        } else {
            this.currentIndex = this.tiles.length - 1;
        }
        this.goTo(this.currentIndex);
    },

    goTo: function(index) {
        this.currentIndex = index;
        var xOffset = -1 * this.tileOffsets[index];
        this.content.transition({x:xOffset}, 500, "snap");
    },

    show: function() {
        var that = this;
        this.jq.hide();
        this.goTo(this.currentIndex);
        this.jq.show();
    },

    onResizeEndHandler: function() {
        this.resizeTiles();
        this.show();
    }

});;gb.Namespace(gb,"gb.ui.ContentManager");
gb.ui.ContentManager = new gb.Class();

gb.ui.ContentManager.include({

    init: function(selector) {
        "use strict";

        this.content = $(selector);
        this.visible = true;
        this.fullscreen = new gb.ui.FullScreen();
        this.stage = new gb.ui.Stage("stage");

        var that = this;
        $("#slideshow-button").click(function(){that.toggleSlideShow();});
        $(window).on("resizeEnd", function(){that.onResizeEndHandler();});

        console.log("init: ContentManager");
    },

    onResizeEndHandler: function() {
        this.stage.onResizeEndHandler();
    },

    toggleSlideShow: function() {
        this.visible = (!this.visible);
        if (this.visible) {
            this.show();
        } else {
            this.hide();
        }
    },

    show: function() {
        var that = this;
        this.content.stop().transition({opacity:1, duration: 50},
            function(){
                that.content.attr({"visibility":"visible", "display":"block"});
            });
    },

    hide: function() {
        var that = this;
        this.content.stop().transition({opacity:0,duration:1000},
            function(){
                that.content.attr({"visibility":"hidden", "display":"none"});
            });
    }
});

;$(function(){
    "use strict";
    var contentManager = new gb.ui.ContentManager("#content");
    $(window).resize(gb.util.throttle(gb.ui.onResizeHandler, 500));
});
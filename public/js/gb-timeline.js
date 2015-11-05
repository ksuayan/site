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
        $("#stage").on("goto-end", function(evt){
            that.onResizeEndHandler();
        });

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

        var that = this;
        gb.util.throttle(function(){

        }, 500);
    },

    onDataHandler: function() {
        var that = this;
        $(window).on("resizeEnd", function(){that.onResizeEndHandler();});
        $(window).on("resize", function(){if (that.paper) {that.paper.clear();}});
        this.onResizeEndHandler();
    }
});


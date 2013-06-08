$(function(){

    var Timeline = function() {
        this.x = 0;
        this.y = 0;
        this.margin = 40;
        this.trackHeight = 24;
        this.yTrack = 160;
        this.paper = null;
        this.segment = null;
        this.startDateLabel = null;
        this.endDateLabel = null;
        var that = this;
        $.getJSON('/api/timeline', function(data) {
            that.timelineData = data;
            that.Resize();
        });
    };

    var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    Timeline.prototype.Resize = function() {
        this.width = $("#timeline").width();
        this.height = $("#timeline").height();
        this.trackWidth = this.width - (this.margin * 2);
        // recompute on window resize ...
        if (this.paper) this.paper.clear();
        this.paper = Raphael("timeline", this.width, this.height);
        this.ProcessData(this.timelineData);
        this.Draw();
    };

    Timeline.prototype.ProcessData = function(rawData) {
        this.dataPoints = [];
        var min = null;
        var max = null;
        var len = rawData.length;
        // first pass
        for (var i = 0, n=len; i<n; i++){
            var entry = rawData[i];
            if (entry.startDate) {
                min = (min) ? Math.min(entry.startDate, min) : entry.startDate;
                max = (max) ? Math.max(entry.startDate, max) : entry.startDate;
            }

            if (!entry.endDate) {
                entry.endDate = new Date().valueOf();
            }
            min = (min) ? Math.min(entry.endDate, min) : entry.endDate;
            max = (max) ? Math.max(entry.endDate, max) : entry.endDate;

        };
        var xRange = max - min;
        this.xMin = min;
        this.xMax = max;
        this.xScale = this.trackWidth/xRange; // px/MS
        // second pass: transform to screen position
        for (var i = 0, n=len; i<n; i++){
            var entry = rawData[i];
            entry.xStart = Math.floor(this.margin + this.xScale * (entry.startDate-min));
            entry.xEnd = Math.floor(this.margin + this.xScale * (entry.endDate-min));
            this.dataPoints.push(entry);
        }
    };

    Timeline.prototype.Draw = function() {
        var that = this;
        this.rect = this.paper.rect(this.x, this.y, this.width, this.height);
        this.rect.attr({"stroke":"#ccc"});
        var line = "M" + (this.x + this.margin) + " " + this.yTrack
                 + "L" + (this.width - this.margin) + " " + this.yTrack;
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
            that.segment = that.DrawSegment(dataPoint.startDate, dataPoint.endDate);
            that.segment.animate({"opacity":1}, 50, "easeInOut");
            sp.stop();
            sp.toFront();
            ep.stop();
            ep.toFront();
            sp.animate({fill: "#DE001E"}, 50, "linear");
            ep.animate({cx: dataPoint.xEnd, fill: "#FF8400"}, 300, "easeInOut");
            this.toFront();
            that.DrawHeader(dataPoint);
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

            if (that.segment) that.segment.remove();

            sp.stop();
            sp.animate({fill: "#333"}, 50, "linear");
            ep.stop();
            ep.animate({cx: dataPoint.xStart, fill: "#999"}, 500, "easeInOut");
            if (that.startDateLabel) {
                that.startDateLabel.remove();
            }
            if (that.endDateLabel) {
                that.endDateLabel.remove();
            }
        };

        var onClick = function(e) {
            var dataPoint = this.data("dataPoint");
        };

        for (var i= 0,n=this.dataPoints.length; i<n; i++) {
            var entry = this.dataPoints[i];
            var hoverPoint = this.paper.circle(entry.xStart, this.yTrack, 15);
            hoverPoint.attr({"fill":"#fff", "stroke-width":"0", "opacity":"0"});
            var startPoint = this.paper.circle(entry.xStart, this.yTrack, 10);
            startPoint.attr({"opacity": 0, cx:0, "fill":"#ccc", "stroke-width": "0"});
            startPoint.animate({"opacity": 1, "fill":"#333", cx: entry.xStart }, i * 100, "easeInOut");
            var endPoint = this.paper.circle(entry.xStart, this.yTrack, 5);
            endPoint.attr({"fill":"#999", "stroke-width": "0"});
            hoverPoint.toFront();
            hoverPoint.data("dataPoint", entry);
            hoverPoint.data("startPoint", startPoint);
            hoverPoint.data("endPoint", endPoint);
            hoverPoint.hover(onHover, onHoverOut);
            hoverPoint.click(onClick);
        }

        var last = this.dataPoints.length - 1;
        this.DrawHeader(this.dataPoints[last]);
        this.DrawTicks();
    };

    Timeline.prototype.DrawHeader = function(dataPoint) {
        var headerStyle = {"font-size":"32pt","text-anchor":"start","font-family":"OpenSansRegular"};
        var subheadStyle = {"font-size":"16pt","text-anchor":"start","font-family":"OpenSansRegular"};
        var subhead2Style = {"font-size":"16pt","text-anchor":"start","font-family":"OpenSansLight"};
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
        var dateStyle = { "fill":"#ccc","font-size":"10pt","font-family":"OpenSansLight"};
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
        var monthStyle = { "opacity": 0, "fill" : "#333", "font-size": "16pt", "font-family" : "OpenSansLight" };
        var yearStyle = { "opacity": 0, "fill" : "#333", "font-size": "12pt", "font-family" : "OpenSansLight" };
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
        this.selected = this.paper.path(line);
        var strokeStyle = {
            "opacity":0.7,
            "stroke":"#FAD905",
            "stroke-width": this.trackHeight - 4,
            "stroke-linecap": "round"
        };

        return this.selected.attr(strokeStyle);
    };


    var timeline = new Timeline();

    $(window).resize(function() {
        if (timeline.paper) timeline.paper.clear();
        if(this.resizeTO) clearTimeout(this.resizeTO);
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 500);
    });

    $(window).bind('resizeEnd', function() {
        timeline.Resize();
    });

});

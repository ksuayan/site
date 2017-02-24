gb.Namespace(gb,"gb.ui.Chart");
gb.ui.Chart = new gb.Class();

gb.ui.Chart = function(id, width, height) {
    "use strict";

    this.width = width;
    this.height = height;
    this.chartLeft = 60; // leftmost area of chart
    this.chartTop = 60;
    this.chartRight = this.width - 60;
    this.chartBottom = this.height - 40;
    this.chartWidth = this.chartRight - this.chartLeft;
    this.chartHeight = this.chartBottom - this.chartTop;
    this.barCeiling = this.chartWidth - 40; // space from tallest bar to top of chart
    this.topInterval = 0;

    this.chart = new Raphael(document.getElementById(id), this.width, this.height);
    this.tickMarks = null;
    this.textBox = this.chart.text(50,20, "").attr({"font":"14pt 'Arial'"});
    this.minText = this.chart.text(200,20, "min:").attr({"font":"14pt 'Arial'"});
    this.maxText = this.chart.text(200,40, "max:").attr({"font":"14pt 'Arial'"});
    this.topIntervalText = this.chart.text(400,40, "top:").attr({"font":"14pt 'Arial'"});

    this.chartArea = this.chart.rect(
        this.chartLeft,
        this.chartTop,
        this.chartWidth,
        this.chartHeight)
        .attr({fill:"#efefef", "stroke-width": 1, "stroke":"#666"});

    this.numberOfBars = 10;
    this.barWidth = 20;
    this.barSpacing = 20; // spacing

    this.bars = [];
    this.data = [];

    this.tickCount = 5;
    this.roundUpTo = 100;

    // randomizer
    this.generatorIndex = 1;
};

gb.ui.Chart.prototype.init = function() {
    this.data = gb.util.randomArray(this.numberOfBars, this.generatorIndex * 100);
};

gb.ui.Chart.prototype.grid = function(horizontal,vertical) {
    // draw horizontal rules
    var path = null;
    for (var i=1; i < this.height; i+=vertical) {
        path = "M0 "+i+ " H"+this.width;
        this.chart.path(path).attr({"stroke-width": 0.1});
    }
    // draw vertical rules
    for (i=1; i < this.width; i+=horizontal) {
        path = "M"+i+ " 0 V"+this.height;
        this.chart.path(path).attr({"stroke-width": 0.1});
    }
};

gb.ui.Chart.prototype.draw = function() {
    if (this.data.length){
        for (var i = 0; i < this.data.length; i++) {
            if (this.bars[i]) this.bars[i].remove();
            this.bars[i] = this.drawBar(i, this.data[i]);
        }
    }
};

gb.ui.Chart.prototype.drawBar = function(i, value){
    var xPos = this.chartLeft,
        yPos = 20 + this.chartTop + (i * (this.barWidth + this.barSpacing)),
        thisObj = this,
        objSet = this.chart.set();
    objSet.push(
        this.chart.rect(xPos, yPos, value, this.barWidth)
        .attr({fill:"#fff", "stroke-width": 0})
        .click(function(){
            var text = "selected: " + i;
            thisObj.textBox.attr("text", text);
        })
    );
    var xPosText = xPos + value + 10;
    var yPosText = yPos + this.barWidth/2;
    objSet.push(
        this.chart.text(xPosText, yPosText, value).attr({"font":"10pt 'Arial'",fill:"#666"})
    );
    return objSet;
};

gb.ui.Chart.prototype.drawTickMarks = function() {
    var tickIntervalValue = this.topInterval / this.tickCount,
        tickSet = this.chart.set();
    if (this.tickMarks) {
        this.tickMarks.remove();
    }
    for (var i=1; i <= this.tickCount; i++) {
        var tickLabel  = tickIntervalValue * i,
            xPos = this.chartLeft + this.scaledValue(tickIntervalValue * i),
            yPos = this.chartBottom + 20;
        tickSet.push(
            this.chart.text(xPos, yPos, tickLabel ).attr({"font":"10pt 'Arial'"})
        );
    }
    this.tickMarks = tickSet;
};

gb.ui.Chart.prototype.animate = function(){
    var newData = gb.util.randomArray(this.numberOfBars, this.generatorIndex * this.roundUpTo);
    if (this.generatorIndex>12) {
        this.generatorIndex = 1;
    } else {
        this.generatorIndex++;
    }
    var min = gb.util.arrayMin(newData),
        max = gb.util.arrayMax(newData);
    this.topInterval = this.calculateTopInterval(max,this.roundUpTo);
    this.minText.attr({text: "min: " + min});
    this.maxText.attr({text: "max: " + max});
    this.topIntervalText.attr({text: "top:" + this.topInterval});
    if (this.data.length){
        for (var i = 0; i < this.data.length; i++) {
            this.data[i] = newData[i]; // sync model
            var newWidth = this.scaledValue(newData[i]),
                newXPos = this.chartLeft + newWidth + 20,
                fillColor = this.colorCode(newData[i]),
                barAnimation = Raphael.animation({width: newWidth, fill: fillColor, "stroke-width":0 },
                    500, "easeInOut"),
                textAnimation = Raphael.animation({width: newWidth, x:newXPos}, 500, "easeInOut"),
                barObj = this.bars[i];

            barObj[0].animate(barAnimation);
            barObj[1].attr({text:newData[i]}).animate(textAnimation);
        }
    }
    this.drawTickMarks();
};

/**
 * Calculate the actual pixel height:
 * barHeight = (value * barCeiling)/ topInterval;
 *
 *
 */
gb.ui.Chart.prototype.scaledValue = function(value) {
    return ((this.topInterval!==0) ?
        (value * this.barCeiling)/this.topInterval : 0);
};

/**
 * Calculate the nearest top interval:
 *    topInterval(150,100) -> 200
 *
 */
gb.ui.Chart.prototype.calculateTopInterval = function(value, interval){
    return ((value%interval) > 0) ? value-(value%interval) + interval : value;
};

gb.ui.Chart.prototype.colorCode = function(value) {
    var colorMap = {
        treshold: [550, 500, 400, 300, 200],
        color:    ["#ff0033","#ff6633","#ffcc33","#8FD600", "#3399CC"],
        def: "#003366"
    };

    for (var i=0; i < colorMap.treshold.length; i++) {
        if (value > colorMap.treshold[i]) {
            return colorMap.color[i];
        }
    }
    return colorMap.def;
};

// invoke onLoad
$(function(){
    var chart = null;

    function initPage() {
        var id = "hchart";
        chart = new gb.ui.Chart(id,
            $("#"+id).width(),
            $("#"+id).height());
        chart.init();
        chart.grid(20,20);
        chart.draw();
        chart.animate();
        var interval = setInterval(refresh, 6000);
    }
    function refresh() {
        chart.animate();
    }
    initPage();
});


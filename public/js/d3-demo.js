
// time slots are in [h,m,s]
var slots = [
    // work hours
    { from: [8,0,0],  to: [17,0,0], fill: "#666666" },

    { from: [0,0,0],  to: [1,30,0], fill: "#1e3e4a" },

    { from: [8,0,0],  to: [8,20,0], fill: "#b0dddf" },
    { from: [8,20,0], to: [8,40,0], fill: "#ef5674" },
    { from: [8,40,0], to: [9,00,0], fill: "#4f9d97" },

    // lunch
    { from: [12,0,0], to: [13,0,0], fill: "#f0e68c" },

    // noche buena
    { from: [23,0,0], to: [23,45,0], fill: "#fd8765" },
    { from: [23,58,0], to: [23,59,0], fill: "#000000" },


];

var margin = {top: 20, right: 20, bottom: 20, left: 50},
    vHeight = 500,
    vWidth = 700,
    slotWidth = 100,
    gutter = 30,
    dayInSeconds = (24 * 60 * 60) - 1;


var x = d3.scale.linear()
        .domain([0, vWidth])
        .range([0, vWidth]);

var y = d3.scale.linear()
        .domain([0, dayInSeconds])
        .range([vHeight - margin.top - margin.bottom, 0]);

var yTime = d3.scale.linear()
        .domain([0, 24])
        .range([0, vHeight - margin.top - margin.bottom]);

var yAxis = d3.svg.axis()
    .scale(yTime)
    .orient('left')
    .ticks(24)
    .tickSize(5)
    .tickPadding(8);

var viewport = d3.select("#viewport")
    .append("svg:svg")
    .attr('class', 'chart')
    .attr("width", vWidth)
    .attr("height", vHeight)
    .style("background-color", "#efefef")
    .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
/**
 * convert [h,m,s] to seconds
 * @param list
 * @returns {*}
 */
var toSeconds = function(list) {
    return (list[0]*60*60) + (list[1]*60) + list[2]
}

var loadSlots = function(day) {
    viewport.selectAll(".chart")
        .data(slots)
        .enter().append("svg:rect")
        .attr("x", 20 + ((day * slotWidth) + (gutter*day)))
        .attr("y", function(datum, index) {
            var seconds = toSeconds(datum.from);
            console.log("y:", index, seconds);
            return (vHeight - margin.top - margin.bottom - y(seconds));
        })
        .attr("height", function(datum, index) {
            var from = toSeconds(datum.from),
                to = toSeconds(datum.to);
            console.log("height:", index, to - from);
            return vHeight - margin.top - margin.bottom - y(to-from)
        })
        .attr("width", slotWidth)
        .attr("fill", function(datum){
            return datum.fill;
        });
};


viewport.append('g')
  .attr('class', 'y axis')
  .call(yAxis);

loadSlots(0);
loadSlots(1);
loadSlots(2);
loadSlots(3);
loadSlots(4);
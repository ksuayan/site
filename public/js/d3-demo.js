
var rectDemo = d3.select("#d3-demo").
  append("svg:svg")
    .attr("width", 600)
    .attr("height", 400);

rectDemo.append("svg:rect")
  .attr("x", 100)
  .attr("y", 100)
  .attr("height", 100)
  .attr("width", 200);
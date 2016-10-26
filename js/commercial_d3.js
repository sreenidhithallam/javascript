
// set the dimensions of the canvas
var margin = {top:40, bottom:100, left:150, right:50},
    width=1000-margin.left-margin.right,
    height=600-margin.top-margin.bottom;

// set the ranges
var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

// define the axis
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

    var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>value:</strong> <span style='color:white'>" + d.value+ "</span>";
  })



// add the SVG element
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");
      svg.call(tip);

// load the data
d3.json("../JSON/commercial.json", function(error, data) {

    data.forEach(function(d) {
        
        d.year = d.year;
        d.value = +d.value;
        return d;
    });

//sort the data
    // data.sort(function(a,b){
    //   return b[" 3-2013"]-a[" 3-2013"];
    // });
  
  // scale the range of the data
  x.domain(data.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // add axis
  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("g")
      .attr("class", "axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 5)
      .attr("dy", ".71em")
      .style("text-anchor", "end")


  // Add bar chart
  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(parseFloat(d.value)); })
         .on('mouseover', tip.show)
         .on('mouseout', tip.hide)

        });

          function type(d) {
          d.value = +d.value ;
          return d;
}
var data = {
	// 3- square,
  "nodes":[
    {"name":"00:00:00:00:00:00:00:01","group":0,"s":3},
    {"name":"00:00:00:00:00:00:00:02","group":1,"s":3},
    {"name":"00:00:00:00:00:00:00:03","group":2,"s":3},
    {"name":"00:00:00:00:00:00:00:11","group":0,"s":4},
    {"name":"00:00:00:00:00:00:00:21","group":1,"s":4},
    {"name":"00:00:00:00:00:00:00:31","group":2,"s":4},
    {"name":"00:00:00:00:00:00:00:32","group":2,"s":2},
    {"name":"00:00:00:00:00:00:00:12","group":0,"s":2},
    {"name":"00:00:00:00:00:00:00:22","group":1,"s":2}
  ],
  "links":[
    { "source":  0,  "target":  1,  "value":  5 },
  	{ "source":  0,  "target":  2,  "value":  5 },
  	{ "source":  2,  "target":  1,  "value":  5 },
  	{ "source":  0,  "target":  0,  "value":  5 },
  	{ "source":  1,  "target":  1,  "value":  5 },
  	{ "source":  2,  "target":  2,  "value":  5 },
  	{ "source":  3,  "target":  0,  "value":  5 },
  	{ "source":  4,  "target":  1,  "value":  5 },
  	{ "source":  5,  "target":  2,  "value":  5 },
  	{ "source":  6,  "target":  2,  "value":  5 },
  	{ "source":  7,  "target":  0,  "value":  5 },
  	{ "source":  8,  "target":  1,  "value":  5 }
  ]
};
var width = 500,
    height = 500;

var color = d3.scale.category20();


var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

var svg = d3.select('#chart').append("svg")
    .attr("width", width)
    .attr("height", height);


force
    .nodes(data.nodes)
    .links(data.links)
    .start();

var link = svg.selectAll(".link")
    .data(data.links)
    .enter().append("line")
    .attr("class", "link")
    .style("stroke-width", function(d) { return Math.sqrt(d.value); });

var node = svg.selectAll(".node")
    .data(data.nodes)
    .enter().append("path")
    .attr("class", "node")
    .attr("d", d3.svg.symbol()
        .type(function(d) { return d3.svg.symbolTypes[d.s]; }))
    .style("fill", function(d) { return color(d.group); })
    .call(force.drag); 



force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
    
    node.attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });
});
var width = 900,
    height = 500;

var force = d3.layout.force()
    .size([width, height])
    .charge(-450)
    .linkDistance(150);

var drag = force.drag()
    .on("dragstart", dragstart);

var svg = d3.select("#sf3").append("svg")
    .attr("width", width)
    .attr("height", height);

d3.json("nodes.json", function(error, graph) {
	
	 force
		.nodes(graph.nodes)
		.links(graph.links)
		.start();

	var link = svg.selectAll(".link")
		.data(graph.links)
		.enter().append("g").append("line")
		.attr("class", "link");

	var node = svg.selectAll(".node")
		.data(graph.nodes)
		.enter().append("g")
		.attr("class", "node")
		.on("dblclick", dblclick)
		.call(drag);
		
	node.append("rect")
		.attr("width",50)
		.attr("height",20);
		
	node.append("text")
		.attr("dx", 52)
		.attr("dy", ".35em")
		.text(function(d) { return d.name });
		
	force.on("tick", function() {
		link.attr("x1", function(d) { return d.source.x; })
			.attr("y1", function(d) { return d.source.y; })
			.attr("x2", function(d) { return d.target.x; })
			.attr("y2", function(d) { return d.target.y; });

		node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
		});
	  
    });

function dragstart(d) {
  d3.select(this).classed("fixed", d.fixed = true);
}

function dblclick(d) {
  d3.select(this).classed("fixed", d.fixed = false);
}

//angular module
myApp.directive('forceLayout',function(){
  function link(scope,el){
  
    var w = 600,
        h = 700; 
    var boxWidth = 400,
        boxHeight = 100;
    var box_coord_x = 550,
        box_coord_y = 400; 

    var max_x = box_coord_x + boxWidth;
    var max_y = box_coord_y + boxHeight;
    var min_x = box_coord_x;
    var min_y = box_coord_y;       
         
    var circleWidth = 5;
    var palette = {
      "orange": "#f39c12",
      "green": "#2ecc71",
      "blue": "#3498db",
      "red": "#e74c3c",
      "lightgray": "#819090",
      "white":"#fff",
      "brown": "#9b59b6"
      }

    var strokes = {
     "orange": "#e67e22",
     "green": "#27ae60",
     "blue": "#2980b9",
     "red": "#c0392b",
     "brown": "#8e44ad"      
     }
    var el = el[0];
    var links = [];
    var svg = d3.select(el).append("svg:svg")
                .attr("viewBox", "0 0 " + w + " " + h )
                .attr("preserveAspectRatio", "xMinYMin");



    var mybox = svg.append("svg:rect")
                   .attr('x',box_coord_x)
                   .attr('y',box_coord_y)
                   .attr("width",boxWidth)
                   .attr("height",boxHeight)
                   .style("fill", "#777")
                   .attr('stroke',palette.white);

// initalize force layout  
    var force = d3.layout.force()
                  .gravity(0.3)
                  .charge(-1000)
                  .size([w, h]);       
   


    var answer = new Answer();
    var selectedElements = []; 
  
    //function that checks the range 
    function between(x,min,max){
        return x >= min && x <= max;
    }
  
          
    //getting the data from json in d3 way
    d3.json("js/nodes.json", function(nodes) { 
    
        force
          .nodes(nodes)
          .links([])
          .start();

        var drag = force.drag()
                        .on("dragend", dragend);

        for(var i = 0; i<nodes.length; i++){
            if(nodes[i].target !== undefined){
                for(var x = 0; x < nodes[i].target.length; x++){

                   links.push({
                       source: nodes[i], target: nodes[nodes[i].target[x]]
                   })

                }
            }
        }
    
 

        var color = d3.scale.category20();

        var link = svg.selectAll('line')
                      .data(links).enter().append('line')
                      .attr('stroke',palette.white);
 
  
  
        var node = svg.selectAll(".node")
                      .data(nodes)
                      .enter().append("g")
                   // .call(force.drag);
                      .call(drag);

  

        var svgpath = node.append("path")
                          .attr("d", d3.svg.symbol()
                          .size(function(d) {
                              return d.size;
                          })
                          .type(function(d) {
                               return d.s
                          }))
                          .attr('fill', function(d,i){
                             if(i===0 || i===2 || i===4){ return palette.orange; }
                             else if(i===1|| i===3 || i===5){ return palette.green;}
                             else if(i===6|| i===8 || i===10){ return palette.blue;}
                             else if(i===7|| i===9 || i===11){return palette.red; }
                             else if(i===12 || i===14 || i===16){ return palette.brown;}
                             else if(i===13 || i===15 || i===17){ return palette.orange;}
                             else if(i===18||i===20){return palette.green}
                             else{ return palette.blue; }
                           })
                          .attr('stroke',function(d,i){
                             if(i===0 || i===2 || i===4){ return strokes.orange;}
                             else if(i===1|| i===3 || i===5){ return strokes.green;}
                             else if(i===6|| i===8 || i===10){ return strokes.blue;}
                             else if(i===7|| i===9 || i===11){return strokes.red; }
                             else if(i===12|| i===14 || i===16){return strokes.brown; }
                             else if(i===13 || i===15 || i===17){ return strokes.orange;}
                             else if(i===18||i===20){return strokes.green}
                             else{ return strokes.blue; }
                          })
  
                          .attr('stroke-width',3)
                          .call(force.drag);
  
        node.on('mouseover', function(d) {
             d3.select(this)
               .style('opacity',.5)
              });

        node.on('mouseout', function(d) {
             d3.select(this)
               .style('opacity', 1)
              });

       /*node.append("text")
          .attr("dx", 12)
          .attr("dy", ".35em")
          .attr('fill', palette.white)
          .text(function (d) {
              return d.name
        }); */

      
       //this function will be called whenever the dragend event of node is fired
       //it checks whether the answer is correct and dragged element is positioned in the answer box
       function dragend(d) {
  
           if(answer.checkAnswer(d.name) ===true){
              //this makes the force layout node stay on the dragged position 
              d.fixed = true;
           
            // checking if the node is dropped correctly inside the box
               if(between(d.x,min_x,max_x) && between(d.y,min_y,max_y)){
                    // the element is inside the box
                  if(answer.checkEndOfQuestion(d.name, selectedElements) === true){
                       alert("correct answer");
                       //the answer is correct
                      //making all the layout nodes to default fixed which is false
                  
                        node.each(function(d) {
                       //  d.x = 0;
                        //  d.y = 0;
                           d.fixed = false;
                        });   
                      //force.start
                  }   
                }  
                else{
                   alert("please put inside the box");
                }  
                     
            } 
       }

  

  
       force.on('tick', function(e){
          node.attr('transform', function(d, i){
            return 'translate('+d.x+','+d.y+')';
       })

       link
        /*  .attr('x1', function(d) { return d.source.x })
             .attr('y1', function(d) { return d.source.y })
             .attr('x2', function(d) { return d.target.x })
             .attr('y2', function(d) { return d.target.y }) */
 
       }) 
 
    });    //end of d3.json loop
  

 }

return {
    link:link,
    restrict: 'E'
  }
})


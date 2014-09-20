var boardAttr = {
  width: 600,
  height: 600,
  numOfEnemies : 20
};

var enemy = {
  width: 20,
  height: 20,
  radius: 10
}

var player ={
  x: 1/2 * boardAttr.width,
  y: 1/2 * boardAttr.height,
  radius: 15
}

var enemiesRandomPos = function(){
  return _.range(0, boardAttr.numOfEnemies).map(function(value, key, collection){
    return {
      colors: ["red", "blue", "green", "orange"],
      id: key,
      fill: function(){return this.colors[Math.floor(Math.random() * 4)];},
      x: enemy.radius + (Math.random()* (boardAttr.width - 2 * enemy.radius)),
      y: enemy.radius + (Math.random()* (boardAttr.height - 2 * enemy.radius))
    }
  });
};

var svg = d3.select("body").append("svg")
            .attr("height", boardAttr.height)
            .attr("width", boardAttr.width)
            .style("background-color", "lightblue");

function dragmove(d){
  d3.select(this)
     .attr("cy", d3.event.y)
     .attr("cx", d3.event.x);
}
var drag = d3.behavior
             .drag()
             .origin(Object)
             .on("drag", dragmove);

// function dragmove(d) {
//   if (true) {
//     d3.select(this)
//           .attr("cx",
//             d.cx = Math.max(0,
//               Math.min(boardAttr.width - d.width,
//                 d3.event.x)));
//   }
//   if (true) {
//      d3.select(this)
//           .attr("cy", d.cy = Math.max(0, Math.min(boardAttr.height - d.height, d3.event.y)));
//   }
// }


function update(){
  //debugger;
  var enemiesPosData = enemiesRandomPos();
  //var playerPosData = playerPos();

  var player = svg.selectAll("circle")
                .data([{x: 300, y:300, radius: 10}])
                .call(drag);

  var enemies = svg.selectAll("circle")
                .data(enemiesPosData);
  //Update Position
  // debugger;
  enemies.attr("class", "update")
         .transition()
         .duration(750)
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .style("fill", function(d){return d.fill()});

   player.attr("class", "update")
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .attr("r", function(d){return d.radius;})
         .style("fill", "black")
         .call(drag);


  //Enter
  enemies.enter()
         .append("svg:circle")
         .transition()
         .duration(750)
         .attr("class","enter")
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .attr("r", enemy.radius)
         .style("fill", function(d){return d.fill()});

   player.enter()
         .append("svg:circle")
         .attr("class","enter")
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .attr("r", function(d){return d.radius;})
         .style("fill", "black")
         .call(drag);

}



update();
// console.log(update());


setInterval(function(){
  update()
}, 1000);



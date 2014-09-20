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
//
var randomPos = function(){
  return _.range(0, boardAttr.numOfEnemies).map(function(value, key, collection){
    return {
      colors: ["red", "blue", "green", "orange"],
      id: key,
      fill: function(){return colors[Math.floor(Math.random() * 4)];},
      x: Math.random()*boardAttr.width,
      y: Math.random()*boardAttr.height
    }
  });
};

//var randomPos = function(){
//  var result = [];
//  result.push(Math.random()*boardAttr.width); //3
//  result.push(Math.random()*boardAttr.height); //10
//  return result;
//};


var svg = d3.select("body").append("svg:svg")
            .attr("height", boardAttr.height)
            .attr("width", boardAttr.width);

function update(){
  //debugger;
  var posData = randomPos();
  var enemies = svg.selectAll("circle")
                .data(posData);
  //Update Position
  // debugger;
  enemies.attr("class", "update")
         .transition()
         .duration(750)
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .style("fill", function(d){return d.fill});
  //Enter
  enemies.enter()
         .append("svg:circle")
         .transition()
         .duration(750)
         .attr("class","enter")
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .attr("r", enemy.radius)
         .style("fill", function(d){return d.fill});


}

// update();
// console.log(update());


setInterval(function(){
  update()
}, 1000);



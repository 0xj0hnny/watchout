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

// function collide(data){
//   var element = d3.select(this);

//   var startPosition = {
//     cx: element.cx,
//     cy: element.cy
//   }


//   // select the element
//   // get current position
//   // find next positon
//   //


//   return function(t){
//    //check collide();
//    //set newpostion of the el using next post.
//    console.log(t);
//  }
// }

function checkCollide(node1, node2){
  var checkNode1X = node1.getAttribute('cx');
  var checkNode1Y = node1.getAttribute('cy');
  var checkNode2X = node2.getAttribute('cx');
  var checkNode2Y = node2.getAttribute('cy');
  if(Math.sqrt(Math.pow(Math.abs(checkNode1X-checkNode2X),2)
             + Math.pow(Math.abs(checkNode1Y-checkNode2Y),2)) < 15){
    return true;
  } else
  return false;
}


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
  enemies.attr("class", "enemies")
         .transition()
         .duration(750)
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .style("fill", function(d){return d.fill()});

   player.attr("class", "player")
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
         .attr("class","enemies")
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .attr("r", enemy.radius)
         .style("fill", function(d){return d.fill()});

   player.enter()
         .append("svg:circle")
         .attr("class","player")
         .attr("cx", function(d){return d.x;})
         .attr("cy", function(d){return d.y;})
         .attr("r", function(d){return d.radius;})
         .style("fill", "black")
         .call(drag);

}



//update();

setInterval(function(){
  $('.current span').text(parseFloat($('.current span').text()) + 5);
  var enemies = d3.selectAll(".enemies")[0];
  var player = d3.selectAll('.player')[0][0];
  for(var i = 0; i < enemies.length; i++){
    if(checkCollide(player, enemies[i])){
      $('.current span').text(0);
      $('.collisions span').text(parseFloat($('.collisions span').text())+ 1);
      break;
    } else {
      if(parseFloat($('.current span').text()) > parseFloat($('.high span').text())){
        $('.high span').text($('.current span').text());
      }
    }
  }

}, 50);

setInterval(function(){
  update()
}, 1000);



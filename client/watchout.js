// start slingin' some d3 here.
//Hello

//Initializes the state of the board
var gameOptions = {
  'height': 700,
  'width': 1000,
  'numEnemies': 20,
  'padding': 40
};

//Initialize game score
var gameStats = {
  'score': 3,
  'bestScore': 0
};

//Create the board for game
var axes = {
  'x': d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  'y': d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

var svg = d3.select('.board').append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);

var rect = svg.append("rect")
  .attr('class', 'newboard')
  .attr("width", gameOptions.width)
  .attr("height", gameOptions.height)
  .style("stroke", "#999999")
  .style("fill", "#F6F6F6");



//Update the score and the bestscore
var updateScore = function() {
  d3.select('.current').select('span').text(gameStats.score.toString())
};

var updateBestScore = function() {
  if (gameStats.score > gameStats.bestScore) {
    gameStats.bestScore = gameStats.score;
  }
  d3.select('.highscore').select('span').text(gameStats.bestScore.toString());
};

//Added Drag to Player
var drag = d3.behavior.drag()
    .on("drag", dragMove)
    // .origin(function() {
    //     var t = d3.transform(d3.select(this).attr("transform"));
    //     console.log(t);
    //     console.log(d3.select('circle').attr('cy'));
    //     return {x: t.translate[0], y: t.translate[1]};
    // });
 // .on('drag', function() { circle.attr('cx', d3.event.x)
 //                                .attr('cy', d3.event.y);
 //        })


function dragMove(d) {
  var x = d3.event.x;
  var y = d3.event.y;
  // Setting the min and max limits for player to stay inside the board
  var minX = gameOptions.padding;
  var maxX = gameOptions.width - gameOptions.padding;
  var minY = gameOptions.padding;
  var maxY = gameOptions.height - gameOptions.padding;
  if (x > maxX) {
    x = maxX;
  } else if (x < minX) {
    x = minX;
  }
  if (y > maxY) {
    y = maxY;
  } else if (y < minY) {
    y = minY;
  }
  //console.log(x, y);
 // d3.select('circle').attr("transform", "translate(" + x + "," + y + ")");
  player.attr('cx', x).attr('cy', y);
}

//Create purple circle player
var player = svg.append('circle')
  .attr('class', 'player')
  .attr('cx', axes.x(50))
  .attr('cy', axes.y(50))
  .attr('r', 15)
  .style('fill', 'purple')
  .call(drag);
console.log(player);
// d3.selectAll("circle.player").style("color", function() {
//   return "hsl(" + Math.random() * 360 + ",100%,50%)";
// });

//Helper Function Gives Enemies their Starting Location
var createBadGuys = function() {
  var results ={
    'x': axes.x(Math.random() * 100),
    'y': axes.y(Math.random() * 100)
  };
  return results;
};


var badGuyArray = d3.range(gameOptions.numEnemies).map(function(enemy){
  return createBadGuys();
});

var allEnemies = svg.selectAll('circle.enemies')
  .data(badGuyArray)
  .enter().append('circle')
  .attr('class', 'enemies')
  .attr('cx', function(d) {return d.x})
  .attr('cy', function(d) {return d.y})
  .attr('r', 15)
  .style('fill', 'red');

console.log(JSON.stringify(allEnemies));

var detectCollision = function() {
  var playerCoords = {x: parseFloat(player.attr('cx')), y: parseFloat(player.attr('cy')), r: parseFloat(player.attr('r'))};
  var enemies = d3.selectAll('circle.enemies')[0];
  for (var i = 0; i < 21; i++) {
    console.log(enemies[i]);
    var diffX = Math.abs(parseFloat(enemies[i].attr('cx')) - playerCoords.x);
    var diffY = Math.abs(parseFloat(enemies[i].attr('cy')) - playerCoords.y);
    var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    var sumRadius = parseFloat(enemies[i].attr('r')) + playerCoords.r;
    if (distance < sumRadius) {
      console.log('COLLISOOONNN!!!');
    }
  };
}

setInterval(detectCollision, 500);
//useful methods
//d3.behavior.drag
// d3.mouse
// d3.range

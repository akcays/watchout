// start slingin' some d3 here.
//Hello

//Initializes the state of the board
var gameOptions = {
  'height': 700,
  'width': 1000,
  'numEnemies': 20,
  'padding': 20
};

//Initialize game score
var gameStats = {
  'score': 3,
  'bestScore': 0
}

//Create the board for game
var axes = {
  'x': d3.scale.linear().domain([0,100]).range([0, gameOptions.width]),
  'y': d3.scale.linear().domain([0,100]).range([0, gameOptions.height])
}

var svg = d3.select('.board').append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);
  //.style('background-color', 'white');

//Update the score and the bestscore
var updateScore = function() {
  d3.select('.current').select('span').text(gameStats.score.toString())
}

var updateBestScore = function() {
  if (gameStats.score > gameStats.bestScore) {
    gameStats.bestScore = gameStats.score;
  }
  d3.select('.highscore').select('span').text(gameStats.bestScore.toString())
}

//Create purple circle player
svg.append("circle")
  .attr("width", 50)
  .attr("height", 50)
  .attr("cx", axes.x(50))
  .attr("cy", axes.y(50))
  .attr("r", 25)
  .style("fill", "purple");


var createBadGuys = function() {
  var results ={
  'x': axes.x(Math.random() * 100),
  'y': axes.y(Math.random() * 100)
  }
  return results;
}

var array = Array(4);
array[1] = createBadGuys();
array[2] = createBadGuys();
array[3] = createBadGuys();
console.log(array);

//create 3 black circles
svg.selectAll('circle')
  .data(array)
  .enter().append('circle')
  .attr("width", 50)
  .attr("height", 100)
  .attr("cx", function(d){ return d.x})
  .attr("cy", function(d){ return d.y})
  .attr("r", 25)
  .attr("class", 25);
  // .exit().append('circle')
  // .attr("width", 50)
  // .attr("height", 100)
  // .attr("cx", function(d){ return d.x})
  // .attr("cy", function(d){ return d.y})
  // .attr("r", 25);
//useful methods
// d3.mouse
// d3.range

// <svg viewbox="0 0 50 60">
//   <polygon points="0 0 50 0 50 5 0 50" fill="#C000FF"/>
//   <polygon points="0 50 50 5 50 60 0 60" fill="#803698"/>
// </svg>
// start slingin' some d3 here.
//Hello

///////Initializes the state of the board////////
var gameOptions = {
  'height': 700,
  'width': 1000,
  'numEnemies': 20,
  'padding': 40
};

var gameStats = {
  'score': 0,
  'bestScore': 0,
  'collisions': 0
};

///////Create the board for game////////////////
var axes = {
  'x': d3.scale.linear().domain([0, 100]).range([0, gameOptions.width]),
  'y': d3.scale.linear().domain([0, 100]).range([0, gameOptions.height])
};

var svg = d3.select('.board').append('svg')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height);

var rect = svg.append('rect')
  .attr('class', 'newboard')
  .attr('width', gameOptions.width)
  .attr('height', gameOptions.height)
  .style('stroke', '#999999')
  .style('fill', '#F6F6F6');


///////Update the score and the bestscore///////
var updateScore = function() {
  if (gameStats.score > gameStats.bestScore) {
    gameStats.bestScore = gameStats.score;
  }
  d3.select('.collisions').select('span').text(gameStats.collisions.toString());
  d3.select('.highscore').select('span').text(gameStats.bestScore.toString());
  d3.select('.current').select('span').text(gameStats.score.toString());

  gameStats.score++;
};


////////Added drag to Player///////////////////
var dragMove = function() {
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

  player.attr('cx', x).attr('cy', y);
};

var drag = d3.behavior.drag()
    .on('drag', dragMove);


///////Create purple circle player/////////////
var player = svg.append('circle')
  .attr('class', 'player')
  .attr('cx', axes.x(50))
  .attr('cy', axes.y(50))
  .attr('r', 15)
  .style('fill', function() {
  return 'hsl(' + Math.random() * 360 + ',100%,50%)';
})
  .call(drag);


////////Data for all badGuys//////////////////
var badGuyArray = d3.range(gameOptions.numEnemies).map(function(enemy) {
   var results = {
    'x': axes.x(Math.random() * 100),
    'y': axes.y(Math.random() * 100)
  };
  return results;
});

var allEnemies = svg.selectAll('circle.enemies')
    .data(badGuyArray)
  .enter().append('circle')
    .attr('class', 'enemies')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 20)
    .style('fill', 'red');

var moveEnemies = function() {
  allEnemies
    .transition()
    .duration(2000)
    .attr('cx', function(d) { return axes.x(Math.random() * 100) })
    .attr('cy', function(d) { return axes.y(Math.random() * 100) })

    setTimeout(moveEnemies, 2000);
}


// Implements collision detections between player and enemies
var detectCollision = function() {
  var playerCoords = {x: parseFloat(player.attr('cx')), y: parseFloat(player.attr('cy')), r: parseFloat(player.attr('r'))};

  allEnemies.each(function(){
    var currentEnemy = d3.select(this);

    var diffX = Math.abs(parseFloat(currentEnemy.attr('cx')) - playerCoords.x);
    var diffY = Math.abs(parseFloat(currentEnemy.attr('cy')) - playerCoords.y);
    var distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
    var sumRadius = parseFloat(currentEnemy.attr('r')) + playerCoords.r;

    if (distance < sumRadius) {
      console.log('COLLISIOOONNN!!!');
      gameStats.score = 0;
      gameStats.collisions++;
    }
  })
};

moveEnemies();
setInterval(detectCollision, 200);
setInterval(updateScore, 500);
//useful methods
//d3.behavior.drag
//d3.mouse
//d3.range

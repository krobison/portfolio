/* GLOBAL VARIABLES */
var canvasPixels = 600;
var gridSize = 20;
var cellPixels = (canvasPixels / gridSize);
var foodColor = "#BB6666";
var snakeColor = "#6666BB";
var gridColor = "#000000";
var errorColor = "#FF4444";
var wallColor = "#555555";
var c;
var ctx;
var scoreElem;
var highscoresElem;
var lengthMultElem;
var speedMultElem;
var levelMultElem;
var levelScore = 0;
/* END GLOBAL VARIABLES */

/* DIRECTIONS ENUM */
var directions = {
	UP    : 1,
	DOWN  : 2,
	LEFT  : 3,
    RIGHT : 4
};
/* END DIRECTIONS ENUM */

/* CELL OBJECT */
var Cell = function(x, y) {
    this.x = x;
    this.y = y;
};
Cell.prototype.getX = function() { return this.x; };
Cell.prototype.getY = function() { return this.y; };
Cell.prototype.draw = function(color) {
    ctx.fillStyle = color;
	ctx.fillRect(this.x * cellPixels + 1, this.y * cellPixels + 1, cellPixels - 2, cellPixels - 2);
};
Cell.prototype.clear = function() {
    ctx.clearRect(this.x * cellPixels + 1, this.y * cellPixels + 1, cellPixels - 2, cellPixels - 2);
};
Cell.prototype.copy = function() { return new Cell(this.x, this.y); };
Cell.prototype.equals = function(eCell) { return ((eCell.getX() === this.x) && (eCell.getY() === this.y)); };
Cell.prototype.move = function(direction) {
    if (!direction) {
        direction = snakeDirection;
    }
    
    switch (direction) {
        case directions.UP:
			this.y--;
			if (this.y < 0) {
				this.y = gridSize - 1;
			}
            break;
        case directions.DOWN:
            this.y++;
			if (this.y >= gridSize) {
				this.y = 0;
			}
            break;
        case directions.LEFT:
            this.x--;
			if (this.x < 0) {
				this.x = gridSize - 1;
			}
            break;
        case directions.RIGHT:
            this.x++;
			if (this.x >= gridSize) {
				this.x = 0;
			}
            break;
        default:
            break;
    }
};
/* END CELL OBJECT */

/* GLOBAL GAME VARIABLES */
var foodCell;
var snakeQueue = [];
var snakeDirection = directions.RIGHT;
var moveInterval;
var gameOver = false;
var gameStarted = false;
var snakeMoved = false;
var gameSpeed = 175;
var walls = [];
var gameScore = 0;
var highscores = [];
var gameLevel = 0;
/* END GLOBAL GAME VARIABLES */


/* *************************************************************************** */
/* GAME PLAY */

function pageInitialized() {
    c = document.getElementById("canvasGame");
    ctx = c.getContext("2d");
    scoreElem = document.getElementById("score");
    highscoresElem = document.getElementById("highscores");

    lengthMultElem = document.getElementById("lengthMult");
    levelMultElem = document.getElementById("levelMult");
    speedMultElem = document.getElementById("speedMult");

    resetGame();
    pauseGame();
    updateMult();
}

function resetGame() {
	if (!gameOver) {
    	foodCell = new Cell(-1,-1);
    	snakeDirection = directions.RIGHT;
    	snakeQueue = [new Cell(2, 2), new Cell(3, 2), new Cell(4, 2)];
        gameScore = 0;
		updateScore(gameScore);
        
        createLevel(gameLevel);
        createFood();
    
    	redrawBoard();
	}
}

function clearBoard() {
    ctx.clearRect(0, 0, canvasPixels, canvasPixels);   
}

function drawGrid() {
    ctx.fillStyle = gridColor;
	for(var i = 0; i <= gridSize; i++) {
		ctx.moveTo(i * cellPixels, 0);
		ctx.lineTo(i * cellPixels, canvasPixels);
		ctx.moveTo(0, i * cellPixels);
		ctx.lineTo(canvasPixels, i * cellPixels);
		ctx.stroke();
	}
}

function drawSnake() {
	for (var i = 0; i < snakeQueue.length; i++){
        var sCell = snakeQueue[i];
		sCell.draw(snakeColor);
	}
}

function drawWalls(){
	for (var i = 0; i < walls.length; i++){
		var wCell = walls[i];
		wCell.draw(wallColor);
	}
}

function createFood() {
    foodCell.clear();
    
    var validLocation = false;
    
    while (!validLocation) {
        var randX = Math.floor((Math.random()*gridSize));
        var randY = Math.floor((Math.random()*gridSize));
        var fCell = new Cell(randX, randY);
        validLocation = true;
        
        for (var i = 0; i < snakeQueue.length; i++){
            var sCell = snakeQueue[i];
            if (sCell.equals(fCell)) {
                validLocation = false; 
                break;
            }
        }
        if (!validLocation) continue;
        
		for (var i = 0; i < walls.length; i++){
            var wCell = walls[i];
            if (wCell.equals(fCell)) {
                validLocation = false; 
                break;
            }
        }
        if (!validLocation) continue;
        
        foodCell = fCell.copy();
    }
}

function drawFood() {
    foodCell.draw(foodColor);   
}

function moveSnake() {
    snakeMoved = false;
    var hCell = snakeQueue[snakeQueue.length - 1];
    var newHCell = hCell.copy();
    newHCell.move(snakeDirection);
    snakeQueue.push(newHCell);
    
    //check for collision with self
	for (var i = 0; i < snakeQueue.length-1; i++){
    	var sCell = snakeQueue[i];
    	if (sCell.equals(newHCell)) {
        	endGame(newHCell);
			return;
        }
    }
	//check for collision with walls
	for (var i = 0; i < walls.length; i++){
    	var wCell = walls[i];
    	if (wCell.equals(newHCell)) {
        	endGame(newHCell);
			return;
        }
    }
    
    if (newHCell.equals(foodCell)) {
        //keep last element of snake (grow) and create new food
        createFood();
        drawFood();
        increaseScore();
        updateMult();
    }
    else {
        //remove last element of snake
        var tCell = snakeQueue.shift();
        tCell.clear();
    }
    
    newHCell.draw(snakeColor);
}

function canvas_keyDown(e) {
    var event = window.event ? window.event : e;
    e.preventDefault(); //This prevents the page from scrolling while the arrows are pressed in the active canvas
    if (!snakeMoved) {
        switch (e.keyCode) {
            case 38:
            case 87:
                //up
                if (snakeDirection !== directions.DOWN){
                    snakeDirection = directions.UP;
                    snakeMoved = true;
                }
                break;
            case 40:
            case 83:
                //down
                if (snakeDirection !== directions.UP){
                    snakeDirection = directions.DOWN;
                    snakeMoved = true;
                }
                break;
            case 37:
            case 65:
                //left
                if (snakeDirection !== directions.RIGHT){
                    snakeDirection = directions.LEFT;
                    snakeMoved = true;
                }
                break;
            case 39:
            case 68:
                //right
                if (snakeDirection !== directions.LEFT){
                    snakeDirection = directions.RIGHT;
                    snakeMoved = true;
                }
                break;
            default:
                break;
        }
    }
}

function pauseGame() {
    window.clearInterval(moveInterval);
    if (!gameOver) {
        drawGamePausedText();
    }
}

function resumeGame() {
	if (gameOver) {
		gameOver = false;
		resetGame();
	} 
    else {
        gameStarted = true;
        redrawBoard();
    }
	moveInterval = window.setInterval(function() { moveSnake(); }, gameSpeed);
}

function endGame(eCell) {
    gameOver = true;
    
    if (eCell) {
        //draw mistake cell
        snakeQueue.shift().clear();
        eCell.draw(errorColor);
    }
    else {
        //clear board
        clearBoard();
    }
	pauseGame();
	drawGameOverText();
	c.blur();
    insertScore();
}

function drawGameOverText() {
    //Draw Game Over Text
		ctx.fillStyle = errorColor;
		ctx.font = "45px Arial";
		ctx.fillText("Game Over", 185, 255);
		ctx.fill();
    
    //Draw Restart Text
        ctx.fillStyle = gridColor;
		ctx.font = "20px Arial";
		ctx.fillText("Click to start a new game", 193, 290);
		ctx.fill();
}

function drawGamePausedText() {
    //Draw Game Over Text
		ctx.fillStyle = errorColor;
		ctx.font = "45px Arial";
		ctx.fillText("Game Paused", 155, 255);
		ctx.fill();
    
    //Draw Restart Text
        ctx.fillStyle = gridColor;
		ctx.font = "20px Arial";
		ctx.fillText("Click to resume game", 205, 290);
		ctx.fill();
}

function redrawBoard() {
    clearBoard();
    drawGrid();
    drawWalls();
    drawSnake();
    drawFood();
}

function redrawBoardNoFood() {
    clearBoard();
    drawGrid();
    drawWalls();
    drawSnake();
}

function createLevel(l) {
    if (!l) {
        l = gameLevel;    
    }
    
    var w;
    walls = [];
    
    switch (l.toString()) {
        //This level does not contain walls
        case "0":
        case "empty":
        case "blank":
            walls = [];
	    levelScore=0;
            break;
            
        //This level has walls along all edges
        case "1":
        case "sides":
            for (var i = 0; i < gridSize; i++){ //Draw top and bottom
                w = new Cell(i,0);
                walls.push(w);
                w = new Cell(i,gridSize-1);
                walls.push(w);
            }
            for (var i = 1; i < gridSize-1; i++){ //draw left and right
                w = new Cell(0,i);
                walls.push(w);
                w = new Cell(gridSize-1,i);
                walls.push(w);
            }
	    levelScore = 30; //bonus points per each food in this level
            break;
            
        //This level has walls along all edges except for small passages
        case "2":
        case "tunnels":
        case "goofy sides":
            for (var i = 0; i < gridSize; i++){ //Draw top and bottom
                if ( (i != gridSize/2)&&(i != gridSize/2-1) ){
                    w = new Cell(i,0);
                    walls.push(w);
                    w = new Cell(i,gridSize-1);
                    walls.push(w);
                }
            }
            for (var i = 1; i < gridSize - 1; i++){ //draw left and right
                if ( (i != gridSize/2)&&(i != gridSize/2-1) ){
                    w = new Cell(0,i);
                    walls.push(w);
                    w = new Cell(gridSize-1,i);
                    walls.push(w);
                }
            }
	    levelScore = 25; //bonus points per each food in this level
            break;
            
        //This level has 4 partitions
        case "3":
        case "plus":
            for (var i = 0; i < gridSize ;i++){ //Draw up/down lines
                if ( (i > gridSize/2)||(i < gridSize/2-1) ){
                    w = new Cell(gridSize/2,i);
                    walls.push(w);
                    w = new Cell(gridSize/2-1,i);
                    walls.push(w);
                }
            }
            for (var i = 0; i < gridSize; i++){ //Draw left/right lines
                w = new Cell(i,gridSize/2);
                walls.push(w);
                w = new Cell(i,gridSize/2-1);
                walls.push(w);
            }
            levelScore = 150; //bonus points per each food in this level
            break;
            
        //This level has a giant slash
        case "4":
        case "dash":
            for (var i = gridSize; i > 0; i--){ //Draw up/down lines
                w = new Cell(i-1,gridSize-i);
                walls.push(w);
            }
	    levelScore = 65; //bonus points per each food in this level
            break;
        //This level has a square in the middle
        case "5":
        case "Square":
            for (var i = 5; i < 15; i++){ 
		for (var j = 5; j < 15; j++){ 
                    w = new Cell(i,j);
                    walls.push(w);
		}
            }
	    levelScore = 15; //bonus points per each food in this level
            break;
        default:
            break;
    }
    updateMult();
}

function updateGameSpeed(x) {
    gameSpeed = ((11 - x) * 35);
    updateMult();
}

function updateMult(){
    speedMultElem.innerHTML = formatNumber(10*(11 - Math.floor((gameSpeed / 35))));
    lengthMultElem.innerHTML = formatNumber(10*snakeQueue.length);
    levelMultElem.innerHTML = formatNumber(levelScore);
}

function updateGameLevel(l) {
    gameLevel = l;
    if (!gameStarted) {
        createLevel(gameLevel);
        createFood();
        redrawBoardNoFood();
        pauseGame();
    }
    else if (gameOver){
       createLevel(gameLevel);
       snakeQueue = [new Cell(2, 2), new Cell(3, 2), new Cell(4, 2)];
       redrawBoardNoFood();
       drawGameOverText();
    }
    else {
        alert("Game has already started, changes will reflect on next game.");   
    }
}

function updateScore(newScore) {
	scoreElem.innerHTML = formatNumber(newScore);
}

function increaseScore() {
    var xSpeed = 11 - Math.floor((gameSpeed / 35));
    var xLength = Math.floor((snakeQueue.length / 1));

    var speedScore = 10 * xSpeed;
    var lengthScore = 10 * xLength;
    
    var addScore = 100 + speedScore + lengthScore + levelScore;
    gameScore += Math.floor(addScore);
    updateScore(gameScore);
}

function insertScore() {
	highscores.push(gameScore);
  	highscores.sort(function(a,b) {return b-a});

	highscoresElem.innerHTML = "";

	for (var i = 0; i < highscores.length; i++) {
		if (i < 10) {
			highscoresElem.innerHTML += "<p>" + (i + 1) + ") " + formatNumber(highscores[i]) + "</p>";
		}
		else {
			highscores.pop();
		}
	}
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
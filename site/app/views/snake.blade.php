@extends('layouts.master')

@section('title')
    Snake
@endsection

{{HTML::style('css/home.css')}}
{{HTML::style('css/snake.css')}}
{{HTML::script('js/snake.js');}}

@section('content')
<!DOCTYPE HTML>
<html>
<head>
	<title>Snake Game</title>
        <meta charset="utf-8">
</head>

<body onload="pageInitialized();">
	<header>
        <img src=<?php echo asset('img/snakeHeader.gif');?> alt="Snake" id="logo"/>
	</header>

	<section>
		<div class="leftSection">
			<div id="optionsHolder">
				<h3>Options</h3>
					<div><br>	
						<p>
							<label>Game Speed (1-10)
							<input type="range" id="gameSpeed" name="gameSpeed" min="1" max="10" onchange="updateGameSpeed(this.value);">
							</label>
			    			</p>
                    				<p>
							<label>Game Level
							<select id="gameLevel" name="gameLevel" onchange="updateGameLevel(this.value);" size="6">
                            					<option value="0">No walls</option>
                            					<option value="1">Sides</option>
                            					<option value="2">Tunnels</option>
                            					<option value="3">Plus</option>
                            					<option value="4">Dash</option>
			    					<option value="5">Square</option>
                        				</select>
							</label>
						</p>
                			</div>
				<h3>Intructions</h3>
					<div id="Instructions">
					<ul>
						<li>Select game speed and level</li>
						<li>Click game at any time to start</li>
						<li>Use arrow keys or WASD to control snake</li>
						<li>Eat the red "food" to grow</li>
						<li>Earn higher scores by playing harder levels or faster games!</li>
					</ul>
					</div>
            		</div>
		</div>
	
		<div class="middleSection">
            		<div id="gameHolder">
                		<div id="scoreHolder">Score : <span id="score">0</span>
				<div class="multipliers">
					Level Multiplier: <span id="levelMult">0</span>
					Speed Multiplier: <span id="speedMult">0</span>
					Length Multiplier: <span id="lengthMult">0</span>
			</div>
		</div>
                <canvas id="canvasGame" width="600" height="600" tabindex="1" onkeydown="canvas_keyDown(event);" onfocus="resumeGame();" onblur="pauseGame();">
                    Your browser does not support HTML 5.
                </canvas>
		</div>
		</div>

		<div class="rightSection">
            		<div id="highscoresHolder">
                		<h3>High-Scores</h3>
                			<div id="highscores" style="text-align:left;">
                    				<p>Play to aquire high-scores!</p>
                			</div>
           		 </div>
		</div>
	</section>
</body>
</html>


@endsection
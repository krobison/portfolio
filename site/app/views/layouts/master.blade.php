<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
	
	{{HTML::style('css/bootstrap.min.css')}}
	{{HTML::style('css/master.css')}}
	
	{{HTML::script('js/jquery-2.0.3.min.js');}}
	{{HTML::script('js/bootstrap.min.js');}}
	{{HTML::script('js/carousel.js');}}

</head>

<body>

	<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="<?php echo asset('/'); ?>">Kolten Robison</a>
			</div>
			<div class="navbar-collapse collapse">
				<ul class="nav navbar-nav">
					<?php
						if ($page == "home"){
							echo "<li class=\"active\"><a href=\"".asset('/')."\">Home</a></li>";
						}else{
							echo "<li><a href=\"".asset('/')."\">Home</a></li>";
						}
					?>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Projects<b class="caret"></b></a>
						<ul class="dropdown-menu">
							<?php
								if ($page == "sites"){
									echo "<li class=\"active\"><a href=\"".asset('sites')."\">Web Applications</a></li>";
								}else{
									echo "<li><a href=\"".asset('sites')."\">Web Applications</a></li>";
								}
								if ($page == "cPlusPlus"){
									echo "<li class=\"active\"><a href=\"".asset('cPlusPlus')."\">C++</a></li>";
								}else{
									echo "<li><a href=\"".asset('cPlusPlus')."\">C++</a></li>";
								}
							?>
						</ul>
					</li>
					<?php	
						if ($page == "about"){
							echo "<li class=\"active\"><a href=\"".asset('about')."\">About</a></li>";
						}else{
							echo "<li><a href=\"".asset('about')."\">About</a></li>";
						}
					?>
				</ul>
			</div><!--/.nav-collapse -->
		</div>
	</div>
	

    <div class="container "id="page">
        
        <section id="content">
            @yield('content')
        </section>
	</div>
	<footer>
		@section('footer')
		<div id="footer">
			Copyright &copy; 2013 Kolten Robison
		</div>
		@show
    </footer>
	
</body>
</html>

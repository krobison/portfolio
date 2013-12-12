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
            <li class="active"><a href="<?php echo asset('/'); ?>">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
</div>
	

    <div class="container "id="page">
        
        <section id="content">
            @yield('content')
        </section>
        
        <footer>
            @section('footer')
                Copyright &copy; 2013 Kolten Robison
            @show
        </footer>
	</div>
	
</body>
</html>

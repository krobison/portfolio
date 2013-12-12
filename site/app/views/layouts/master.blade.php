<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
</head>
<body>
    <div id="page">
        <header>
            @section('header')
			header
            @show
        </header>
        
        <section id="content">
            @yield('content')
        </section>
        
        <footer>
            @section('footer')
                Copyright &copy; 2013 Kolten Robison
            @show
        </footer>
</body>
</html>

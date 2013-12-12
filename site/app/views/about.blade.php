@extends('layouts.master')

@section('title')
    Home
@endsection

{{HTML::style('css/home.css')}}

@section('content')
	<div class="page-header">
		<h1>About <small>Kolten Robison</small></h1>
	</div>
	<p class="lead">My name is Kolten Robison, and I am currently a Computer Science student at the Colorado School of Mines.<br><br>
		My programming interests include web programming using the Laravel Framework, Java/C++ application programming, and Artificial Intelligence<br><br>
		You can reach me at: <a href="mailto:krobison@mymail.mines.edu">krobison@mymail.mines.edu</a>
	</p>
@endsection
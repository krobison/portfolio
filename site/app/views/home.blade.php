@extends('layouts.master')

@section('title')
    Home
@endsection

{{HTML::style('css/home.css')}}

@section('content')

<div id="carouseldiv" class="carousel slide" data-ride="carousel">
	<ol class="carousel-indicators">
		<li data-target="#carouseldiv" data-slide-to="0" class="active"></li>
		<li data-target="#carouseldiv" data-slide-to="1"></li>
		<li data-target="#carouseldiv" data-slide-to="2"></li>
	</ol>

	<div class="carousel-inner">
		<div class="item active">
			<img src="<?php echo asset('img/slide1.png'); ?>" alt="...">
			<div class="carousel">
			</div>
		</div>
		<div class="item">
			<img src="<?php echo asset('img/slide2.png'); ?>" alt="...">
			<div class="carousel">
			</div>
		</div>
		<div class="item">
			<img src="<?php echo asset('img/slide3.png'); ?>" alt="...">
			<div class="carousel">
			</div>
		</div>
	</div>

	<a class="left carousel-control" href="#carouseldiv" data-slide="prev">
		<span class="glyphicon glyphicon-chevron-left"></span>
	</a>
	<a class="right carousel-control" href="#carouseldiv" data-slide="next">
		<span class="glyphicon glyphicon-chevron-right"></span>
	</a>
</div>
@endsection
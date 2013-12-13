@extends('layouts.master')

@section('title')
    Home
@endsection

{{HTML::style('css/home.css')}}

@section('content')
	<?php 
	if (isset($app->youtube)){
		echo '<div class="video-container">';
			echo '<iframe width="560" height="315" src="'.$app->youtube.'" frameborder="0" allowfullscreen=""></iframe>';
		echo '</div>';
	}
	echo '<div class="page-header">';
		echo '<h3>'.$app->name.'</h3>';
		echo '<small>Created: '.$app->start_date." &nbsp; &nbsp;Updated: ".$app->last_date.'</small>';
	echo '</div>';
	?>
	
	<span>{{$app->details}}</span><br><br>

@endsection
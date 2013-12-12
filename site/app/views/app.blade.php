@extends('layouts.master')

@section('title')
    Home
@endsection

{{HTML::style('css/home.css')}}

@section('content')
	this is app <?php echo $app->id;?>

@endsection
@extends('layouts.master')

@section('title')
    C++ Projects
@endsection

{{HTML::style('css/home.css')}}

@section('content')
	<div class="tablediv">
	<table class="table">
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Genre</th>
			<th>Created</th>
			<th>Updated</th>
		</tr>
	 <?php
		foreach ($apps as $app) {	
			echo '<tbody>';
			echo '<tr>';
				echo '<td>'.'<a href="'.asset("apps/".$app->id).'">'.($app->name).'</a></td>';
				echo '<td>'.($app->description).'</td>';
				echo '<td>'.($app->genre).'</td>';
				echo '<td class="daterow">'.($app->start_date).'</td>';
				echo '<td class="daterow">'.($app->last_date).'</td>';
			echo '</tr>';
			echo '</tbody>';
		}
	?>
	</table>
	</div>
@endsection
@extends('layouts.master')

@section('title')
    Home
@endsection

{{HTML::style('css/home.css')}}

@section('content')
	<div class="tablediv">
	<table class="table">
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Created</th>
			<th>Updated</th>
		</tr>
	 <?php
		foreach ($sites as $site) {	
			echo '<tbody>';
			echo '<tr>';
				echo '<td>'.'<a href="'.$site->url.'">'.($site->name).'</a></td>';
				echo '<td>'.($site->description).'</td>';
				echo '<td class="daterow">'.($site->start_date).'</td>';
				echo '<td class="daterow">'.($site->last_date).'</td>';
			echo '</tr>';
			echo '</tbody>';
		}
	?>
	</table>
	</div>

@endsection
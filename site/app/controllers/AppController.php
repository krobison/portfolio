<?php

class AppController extends BaseController {

	 public function showApp($id) {
		$query = DB::table('apps');
		$query = $query->where('id', $id);
		$app = $query->first();
		if (isset($app)){
       		return View::make('app')->with('app', $app)->with('page',"");
		}
		return Redirect::to('/')->with('page',"home");;
    }
	
	public function playSnake(){
		return View::make('snake')->with('page','snake');
	}

}
<?php

class HomeController extends BaseController {

	/*
	|--------------------------------------------------------------------------
	| Default Home Controller
	|--------------------------------------------------------------------------
	|
	| You may wish to use controllers instead of, or in addition to, Closure
	| based routes. That's great! Here is an example controller method to
	| get you started. To route to this controller, just add the route:
	|
	|	Route::get('/', 'HomeController@showWelcome');
	|
	*/

	public function showHome(){
		return View::make('home')->with("page","home");
	}
	
	public function showAbout(){
		return View::make('about')->with("page","about");
	}
	
	public function showSites(){
		$sites = DB::table('sites')->get();
		return View::make('sites')->with("page","sites")->with('sites',$sites);
	}
	
	public function showCPlusPlus(){
		$apps = DB::table('apps')->where('apptype', '=',"cPlusPlus")->get();
		return View::make('cPlusPlus')->with("page","cPlusPlus")->with('apps',$apps);
	}

}
<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::pattern('id', '[0-9]+');

Route::get('/', 'HomeController@showHome');

Route::get('about', 'HomeController@showAbout');

Route::get('sites', 'HomeController@showSites');
Route::get('cPlusPlus', 'HomeController@showCPlusPlus');

Route::get('apps/{id}', 'AppController@showApp');

Route::get('snake','AppController@playSnake');
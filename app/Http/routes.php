<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


//API
Route::group(array('prefix' => 'api/v1'), function()
{
    Route::get('fans', 'APIController@index');
});

//Login
Route::post('geo-info-response', 'HomeController@getFanURL');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => 'web'], function () {

    Route::get('/logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);

    Route::get('/login', 'Auth\LoginController@index');
    Route::post('/login', 'Auth\LoginController@login');

    Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);

    Route::get('/sensor/ventilatoren', ['as' => 'ventilatoren', 'uses' => 'Sensors\Fans\TubeController@index']);
    Route::get('/sensor/ventilatoren/{buis}/{zijde}', ['as' => 'tunnelbuis', 'uses' => 'Sensors\Fans\FanController@index']);

});


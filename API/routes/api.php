<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
///////////////////////////////////////////////////////////
Route::get('/status','Api\DadosController@status');

Route::namespace('Api')->group(function (){
    Route::post('/dados/add', 'DadosController@add');

    Route::get('/dados','DadosController@list');

    Route::get('/dados/(id)','DadosController@select');
    Route:: put('/dados/(id)','DadosController@update');
    Route::delete('/dados/(id)', 'DadosController@delete');

});
<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 23.05.17
 * Time: 12:45
 */
Route::get('^admin{path?}', function () {
    return view('ng-adminlte::angular');
})
    ->name('admin')
    ->where('path', '.*')
    ->middleware('auth')
    ->middleware('admin')
;
Route::get('!/adminlte/routes', function () {
    \Larakit\Event\Event::notify('ng_routes');
    $routes   = \Larakit\Ng\LkRoute::routes();
    $response = Response::make(view('sf-adminlte::ng-routes', compact('routes')));
    $response->header('Content-Type', 'application/javascript; charset=UTF-8');
    
    return $response;
})
    ->middleware('web')
    ->middleware('auth')
    ->name('adminlte.routes');

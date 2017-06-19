<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:52
 */
Route::get('!/adminlte/me', function () {
    $me = Auth::getUser();
    if($me) {
        return $me->toArray();
    }
    
    return null;
})
    ->middleware('web')
    ->middleware('auth')
    ->name('ajax.me');


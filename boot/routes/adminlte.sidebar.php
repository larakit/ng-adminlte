<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:52
 */
Route::get('!/adminlte/sidebar', function () {
    \Larakit\Event\Event::notify('lkng::init');
    $ret = \Larakit\NgAdminlte\LkNgSidebar::sidebars();
    
    //    dd($ret);
    
    return $ret;
})->middleware('web');

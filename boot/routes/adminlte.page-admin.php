<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:52
 */
Route::get('!/adminlte/page-admin', function () {
    return \Larakit\NgAdminlte\LkNgDashboard::all();
})
    ->middleware('web')
    ->middleware('auth')
    ->name('ajax.page-admin');


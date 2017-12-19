<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:52
 */
Route::get('!/adminlte/header', function () {
    $ret = [
        'items'     => \Larakit\NgAdminlte\LkNgHeader::items(),
        'langs'     => config('app.locales'),
        'lang'      => App::getLocale(),
        'logo_mini' => env('ADMINLTE_HEADER_LOGO_MINI', '<b>L</b>K'),
        'logo_lg'   => env('ADMINLTE_HEADER_LOGO_LG', '<b>Lara</b>kit'),
    ];
    
    return $ret;
});

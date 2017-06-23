<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 23.06.17
 * Time: 21:30
 */

//##################################################
//      создание файла миграции
//##################################################
Route::any('!/lknggen/call-migrate', function () {
    \Artisan::call('migrate', []);
    
    return [
        'result'    => 'success',
        'message'   => 'Миграции были запущены',
    ];
});

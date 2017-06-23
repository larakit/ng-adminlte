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
Route::any('!/lknggen/call-make-migration', function () {
    $table = \Illuminate\Support\Str::snake(Request::input('table'));
    $class = \Illuminate\Support\Str::studly("create_{$table}_table");
    system(base_path('composer dump-autoload'));
    sleep(3);
    //    dd('CreateTestsTable', $class, ('CreateTestsTable' == $class), class_exists($class));
    if(!class_exists($class)) {
        \Artisan::call('make:migration', [
            'name'     => "create_{$table}_table",
            '--create' => $table,
        ]);
        
        return [
            'result'    => 'success',
            'message'   => 'Миграция успешно создана',
            'migration' => $class,
        ];
    } else {
        return [
            'result'    => 'error',
            'message'   => 'Миграция была создана ранее',
            'migration' => $class,
        ];
        
    }
});

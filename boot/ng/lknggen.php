<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 26.05.17
 * Time: 15:22
 */
//##################################################
//      Регистрация компонента страницы
//##################################################
\Larakit\NgAdminlte\LkNgComponent::register('page-lknggen', '/packages/larakit/ng-adminlte/components/');
\Larakit\NgAdminlte\LkNgComponent::register('page-lknggen-table', '/packages/larakit/ng-adminlte/components/');
\Larakit\NgAdminlte\LkNgComponent::register('lknggen-tables', '/packages/larakit/ng-adminlte/components/');
//\Larakit\NgAdminlte\LkNgComponent::register('page-lknggen-model', '/packages/larakit/ng-adminlte/components/');

//##################################################
//      генерируем урл страницы
//##################################################
$url = '/lknggen';

//##################################################
//      Добавление в sidebar администратора
//##################################################
\Larakit\NgAdminlte\LkNgSidebar::section('lknggen')
    ->item('lknggen', 'Генератор кода', 'fa fa-gear', $url);
//\Larakit\NgAdminlte\LkNgSidebar::section('lknggen')
//    ->item('lknggen_model', 'Модель', 'fa fa-gear', $url);

//##################################################
//      Добавление в Angular - routing
//##################################################

\Larakit\NgAdminlte\LkNgRoute::factory($url, 'lknggen')
    ->title('Генератор кода')
    ->icon('fa fa-gear');
\Larakit\NgAdminlte\LkNgRoute::factory($url . '/:table', 'lknggen-table')
    ->title('{{table}}')
    ->icon('fa fa-gear');
//\Larakit\NgAdminlte\LkNgRoute::factory($url, 'lknggen_model')
//    ->title('Модель')
//    ->icon('fa fa-gear');

//##################################################
//      Добавление в Laravel - routing
//##################################################
Route::get($url . '{path?}', function () {
    return view('ng-adminlte::layout');
})->where('path', '.*');
//##################################################
//      загрузка полей таблицы
//##################################################
Route::any('!/lknggen/load', function () {
    $table = Request::input('table');
    $file  = storage_path('lknggen/' . $table . '.php');
    $ret   = [];
    if(file_exists($file)) {
        $ret = include $file;
    }
    foreach(Schema::getColumnListing($table) as $column) {
        if(!isset($ret['labels'][$column])) {
            $ret['labels'][$column] = '';
        }
    }
    
    return $ret;
});
//##################################################
//      онлайн-сохранение
//##################################################
Route::post('!/lknggen/save', function () {
    $table = Request::input('table');
    $file  = storage_path('lknggen/' . $table . '.php');
    $data  = include $file;
    $data  = (array) $data;
    $data  = array_merge($data, Request::input('data'));
    if(!file_exists(dirname($file))) {
        mkdir(dirname($file), 0777, true);
    }
    file_put_contents($file, '<?php' . PHP_EOL . 'return ' . var_export($data, true) . ';');
    
    return [
        'result'  => 'success',
        'data'    => $data,
        'message' => 'Данные сохранены',
    ];
});
//##################################################
//      загрузка списка таблиц
//##################################################
Route::get('!/lknggen/tables', function () {
    $tmp    = DB::select('show tables');
    $tables = [];
    foreach($tmp as $item) {
        foreach($item as $table) {
            $tables[$table] = Schema::getColumnListing($table);
        }
    }
    
    return $tables;
});

//##################################################
//      Генератор класса модели
//##################################################
Route::post('!/lknggen/model', function () {
    return [
        'source' => highlight_string(file_get_contents(app_path('Models/Brand.php')), true),
    ];
});

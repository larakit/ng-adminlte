<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 23.05.17
 * Time: 12:45
 */
Route::get('admin{path?}', function () {
    $page = \Larakit\Page\LkPage::instance()
        ->setBodyContent('<div class="wrapper" style="height: auto;">
    <ng-view></ng-view>
</div>');
    $page->html()->ngApp();
    $page->body()
        ->addClass('skin-black')->setAttribute('ng-class', '{
        \'sidebar-collapse\':leftValue(),
        \'control-sidebar-open\':rightValue(),
}');
    
    return $page;
})
    ->name('admin')
    ->where('path', '.*')
    ->middleware('web')
    ->middleware('auth')
    ->middleware('admin');

Route::get('!/adminlte/header', function () {
    $ret = \Larakit\NgAdminlte\LkNgHeader::items();
    
    //    dd($ret );
    return $ret;
});
Route::get('!/adminlte/routes', function () {
    \Larakit\Event\Event::notify('ng_routes');
    $routes   = \Larakit\NgAdminlte\LkNgRoute::routes();
    $response = Response::make(view('ng-adminlte::ng-routes', compact('routes')));
    $response->header('Content-Type', 'application/javascript; charset=UTF-8');
    
    return $response;
})
    ->middleware('web')
    ->middleware('auth')
    ->name('adminlte.routes');

<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 23.05.17
 * Time: 12:45
 */

$callback = function () {
    $page = \Larakit\Page\LkPage::instance()
        ->setBodyContent('<div class="wrapper">
    <ng-view></ng-view>
</div>');
    $page->html()->ngApp(env('LARAKIT_NG_APP', 'larakit'));
    $page->body()
        ->setAttribute('style', 'height: auto; min-height: 100%;')
        ->addClass('skin-black')->setAttribute('ng-class', '{
        \'sidebar-collapse\':leftValue(),
        \'control-sidebar-open\':rightValue(),
}');
    
    return $page;
};
Route::get(\Larakit\NgAdminlte\LkNgRoute::adminUrl() . '{path?}', $callback)
    ->name('admin')
    ->where('path', '.*')
    ->middleware('web')
    ->middleware('auth')
    ->middleware('admin');

Route::get(\Larakit\NgAdminlte\LkNgRoute::accountUrl() . '{path?}', $callback)
    ->name('account')
    ->where('path', '.*')
    ->middleware('web')
    ->middleware('auth');

Route::get('!/adminlte/header', function () {
    $ret = [
        'items'     => \Larakit\NgAdminlte\LkNgHeader::items(),
        'logo_mini' => env('ADMINLTE_HEADER_LOGO_MINI', '<b>L</b>K'),
        'logo_lg'   => env('ADMINLTE_HEADER_LOGO_LG', '<b>Lara</b>kit'),
    ];
    
    return $ret;
});
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

Route::get('!/adminlte/footer', function () {
    $year = env('ADMINLTE_FOOTER_FROM', '2014');
    if($year == date('Y')) {
        $years = $year;
    } else {
        $years = $year . ' - ' . date('Y');
    }
    $ret = [
        'years'     => $years,
        'copyright' => env('ADMINLTE_FOOTER_COPYRIGHT', 'Все права защищены'),
        'name'      => env('ADMINLTE_FOOTER_NAME', 'Almsaeed Studio'),
        'url'       => env('ADMINLTE_FOOTER_URL', 'https://adminlte.io/'),
    ];
    
    return $ret;
});
Route::get('!/adminlte/sidebar', function () {
    \Larakit\Event\Event::notify('lkng::init');
    $ret = \Larakit\NgAdminlte\LkNgSidebar::sidebars();
//    dd($ret);
    
    return $ret;
})->middleware('web');
Route::get('!/adminlte/routes', function () {
    \Larakit\Event\Event::notify('lkng::init');
    $routes   = \Larakit\NgAdminlte\LkNgRoute::routes();
    $otherwise = env('LKNG_OTHERWISE', \Larakit\NgAdminlte\LkNgRoute::adminUrl());
    $response = Response::make(view('ng-adminlte::ng-routes', compact('routes', 'otherwise')));
    $response->header('Content-Type', 'application/javascript; charset=UTF-8');
    
    return $response;
})
    ->middleware('web')
    ->middleware('auth')
    ->name('adminlte.routes');


Route::get('!/ng-larakit-js', function (){
    $modules = \Larakit\NgAdminlte\LkNg::modules();
    $modules = '"'.implode('", "', $modules).'"';
    return '(function () {angular.module("ng-larakit",['.$modules.'])})();';
});
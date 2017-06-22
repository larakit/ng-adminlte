<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:55
 */
$callback = function () {
    //    $model = \App\Models\Color::find(2);
    //    dd($model->toArray());
    $page = \Larakit\Page\LkPage::instance()
        ->setBodyContent('<div class="wrapper">
    <ng-view></ng-view>
</div>');
    $page->html()->ngApp(env('LARAKIT_NG_APP', 'ng-larakit'));
    $page->body()
        ->setAttribute('style', 'height: auto; min-height: 100%;')
        ->addClass('skin-black')->setAttribute('ng-class', '{
        \'sidebar-collapse\':leftValue(),
        \'control-sidebar-open\':rightValue(),
}');
    
    return $page;
};

Route::get(\Larakit\NgAdminlte\LkNgRoute::accountUrl() . '{path?}', $callback)
    ->name('account')
    ->where('path', '.*')
    ->middleware('web')
    ->middleware('auth');

Route::get(\Larakit\NgAdminlte\LkNgRoute::adminUrl() . '{path?}', $callback)
    ->name('admin')
    ->where('path', '.*')
    ->middleware('web')
    ->middleware('auth')
    ->middleware('admin');

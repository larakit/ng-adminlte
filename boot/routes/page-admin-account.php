<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:55
 */

//$url = \Larakit\LkNgRoute::adminUrl('colors');
//\Larakit\LkNgRoute::proxy($url);

if(!env('ADMINLTE_NO_ROUTE')) {
    
    $adminlte_callback = function (\Larakit\Page\LkPage $page) {
        $page = \Larakit\Page\LkPage::instance()
            ->setBodyContent('<div class="wrapper">
    <ng-view></ng-view>
</div>');
        $page->body()
            ->setAttribute('style', 'height: auto; min-height: 100%;')
            ->addClass('skin-black')->setAttribute('ng-class', '{
        \'sidebar-collapse\':leftValue(),
        \'control-sidebar-open\':rightValue(),
        \'sidebar-open\':!leftValue(),
        \'control-sidebar-open\':rightValue(),
}');
        
    };
    \Larakit\LkNgRoute::proxy(\Larakit\LkNgRoute::accountUrl() . '{path?}', true, $adminlte_callback)
        ->name('account')
        ->middleware('ng-larakit')
        ->where('path', '.*');
    \Larakit\LkNgRoute::proxy(\Larakit\LkNgRoute::adminUrl() . '{path?}', true, $adminlte_callback)
        ->name('admin')
        ->middleware('admin')
        ->middleware('ng-larakit')
        ->where('path', '.*');
}
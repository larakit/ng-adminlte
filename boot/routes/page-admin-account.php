<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:55
 */

//$url = \Larakit\NgAdminlte\LkNgRoute::adminUrl('colors');
//\Larakit\NgAdminlte\LkNg::proxyRoute($url);

\Larakit\NgAdminlte\LkNg::proxyRoute(\Larakit\NgAdminlte\LkNgRoute::accountUrl() . '{path?}', true)
    ->name('account')
    ->middleware('ng-larakit')
    ->where('path', '.*');
\Larakit\NgAdminlte\LkNg::proxyRoute(\Larakit\NgAdminlte\LkNgRoute::adminUrl() . '{path?}', true)
    ->name('admin')
    ->middleware('admin')
    ->middleware('ng-larakit')
    ->where('path', '.*');


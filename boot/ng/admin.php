<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 26.05.17
 * Time: 15:22
 */

//##################################################
//      генерируем урл страницы
//##################################################
$url = \Larakit\LkNgRoute::adminUrl();




//##################################################
//      Регистрация компонента страницы
//##################################################
\Larakit\LkNgComponent::register('page-admin', '/packages/larakit/ng-adminlte/components/');

\Larakit\Event\Event::listener('lkng::init', function () use ($url) {
    if(me('is_admin')) {
        $icon = 'fa fa-dashboard';
        //##################################################
        //      Добавление в sidebar администратора
        //##################################################
        \Larakit\LkNgSidebar::section('admin')
            ->item('admin', 'Dashboard', $icon, $url);
        
        //##################################################
        //      Добавление в Angular - routing
        //##################################################
        \Larakit\LkNgRoute::factory($url, 'admin')
            ->title('Dashboard')
            ->icon($icon);
    }
});
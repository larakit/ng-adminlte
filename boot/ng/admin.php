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
\Larakit\NgAdminlte\LkNgComponent::register('page-admin', '/packages/larakit/ng-adminlte/components/');

//##################################################
//      генерируем урл страницы
//##################################################
$url = \Larakit\NgAdminlte\LkNgRoute::adminUrl();

//##################################################
//      Добавление в sidebar администратора
//##################################################
$sidebar_admin = \Larakit\NgAdminlte\LkNgSidebar::section('admin');
$sidebar_admin
    ->item($url)
    ->setIcon('fa fa-dashboard')
    ->setText('Dashboard');


//##################################################
//      Добавление в Angular - routing
//##################################################


\Larakit\NgAdminlte\LkNgRoute::factory($url, 'admin')
    ->title('Система администрирования')
    ->icon('fa fa-dashboard');

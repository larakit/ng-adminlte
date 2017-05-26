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
\Larakit\NgAdminlte\LkNgSidebar::section('admin')
    ->item('admin', 'Dashboard', 'fa fa-dashboard')
    ->item('admin.1', 'Dashboard 1', 'fa fa-dashboard')
    ->item('admin.2', 'Dashboard 2', 'fa fa-dashboard')
;

//##################################################
//      Добавление в Angular - routing
//##################################################

\Larakit\NgAdminlte\LkNgRoute::factory($url, 'admin')
    ->title('Система администрирования')
    ->icon('fa fa-dashboard');
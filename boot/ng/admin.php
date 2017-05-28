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
\Larakit\NgAdminlte\LkNgSidebar::section('admin', 'xxx')
                               ->item('admin', 'Dashboard', 'fa fa-dashboard')
                               ->item('admin.1', 'Dashboard 1', 'fa fa-dashboard')
                               ->item('admin.2', 'Dashboard 2', 'fa fa-dashboard')
                               ->item('admin.2.1', 'Dashboard 2.1', 'fa fa-dashboard', '/admin/2/1')
                               ->item('admin.2.2', 'Dashboard 2.2', 'fa fa-dashboard', '/admin/2/2')
                               ->item('admin.1.1', 'Dashboard 1.1', 'fa fa-dashboard', '/admin/1/1')
                               ->item('admin.1.2', 'Dashboard 1.2', 'fa fa-dashboard', '/admin/1/2')
                               ->item('test', 'test', 'fa fa-dashboard', '/admin/test')
;

//##################################################
//      Добавление в Angular - routing
//##################################################

\Larakit\NgAdminlte\LkNgRoute::factory($url, 'admin')
                             ->title('Система администрирования')
                             ->icon('fa fa-dashboard');
\Larakit\NgAdminlte\LkNgRoute::factory($url . '/1/1', 'admin-1-1')
                             ->title('1.1')
                             ->template('<page-admin></page-admin>')
                             ->icon('fa fa-dashboard');
\Larakit\NgAdminlte\LkNgRoute::factory($url . '/1/2', 'admin-1-2')
                             ->title('1.2')
                             ->template('<page-admin></page-admin>')
                             ->icon('fa fa-dashboard');
\Larakit\NgAdminlte\LkNgRoute::factory($url . '/2/1', 'admin-2-1')
                             ->title('2.1')
                             ->template('<page-admin></page-admin>')
                             ->icon('fa fa-dashboard');
\Larakit\NgAdminlte\LkNgRoute::factory($url . '/2/2', 'admin-2-2')
                             ->title('2.2')
                             ->template('<page-admin></page-admin>')
                             ->icon('fa fa-dashboard');
\Larakit\NgAdminlte\LkNgRoute::factory($url . '/test', 'test')
                             ->title('test')
                             ->template('<page-admin></page-admin>')
                             ->icon('fa fa-dashboard');

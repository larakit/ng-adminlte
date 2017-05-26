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
\Larakit\NgAdminlte\LkNgComponent::register('page-admin-user', '/packages/larakit/ng-adminlte/components/');

//##################################################
//      генерируем урл страницы
//##################################################
$url = \Larakit\NgAdminlte\LkNgRoute::adminUrl('users');

//##################################################
//      Добавление в sidebar администратора
//##################################################
$sidebar_admin = \Larakit\NgAdminlte\LkNgSidebar::section('admin');
$sidebar_admin
    ->item($url)
    ->setIcon('fa fa-users')
    ->setGroup('Пользователи системы')
    ->setText('Пользователи');


//##################################################
//      Добавление в Angular - routing
//##################################################


\Larakit\NgAdminlte\LkNgRoute::factory($url, 'admin-user')
    ->title('Пользователи')
    ->icon('fa fa-dashboard');

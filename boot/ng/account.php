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
\Larakit\NgAdminlte\LkNgComponent::register('page-account', '/packages/larakit/ng-adminlte/components/');

//##################################################
//      генерируем урл страницы
//##################################################
$url = \Larakit\NgAdminlte\LkNgRoute::accountUrl();

//##################################################
//      Добавление в sidebar администратора
//##################################################
$sidebar_account = \Larakit\NgAdminlte\LkNgSidebar::section('account');
$sidebar_account
    ->item($url)
    ->setPriority(100500)
    ->setIcon('fa fa-dashboard')
    ->setText('Мой кабинет');


//##################################################
//      Добавление в Angular - routing
//##################################################


\Larakit\NgAdminlte\LkNgRoute::factory($url, 'account')
    ->title('Кабинет пользователя')
    ->subtitle('Управление профилем')
    ->icon('fa fa-dashboard');
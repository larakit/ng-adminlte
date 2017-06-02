<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 23.05.17
 * Time: 11:56
 */
//$ng_boot_dir =
\Larakit\Boot::register_boot(__DIR__ . '/boot');
\Larakit\Boot::register_view_path(__DIR__ . '/views', 'ng-adminlte');

\Larakit\StaticFiles\Manager::package('larakit/ng-adminlte')
    ->usePackage('larakit/sf-adminlte')
    ->usePackage('larakit/sf-angular-larakit')
    ->setSourceDir('public')
    ->jsPackage('services/breadcrumbs-builder.js')
    ->jsPackage('services/lk-hasher.js')
    ->jsPackage('services/lk-alerts.js')
    ->jsPackage('services/lk-page.js')
    ->jsPackage('services/lk-sidebars.js')
    ->jsPackage('services/lk-user.js');

\Larakit\Boot::register_middleware(\Larakit\NgAdminlte\NgComponentsMiddleware::class);

//##################################################
//components
//##################################################
$components_directory = '/packages/larakit/ng-adminlte/components/';
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-header', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-sidebar-left', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-sidebar-right', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-content-wrapper', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-footer', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-filter-pagination', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-filter-form', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-filter-labels', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list-item', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-alerts', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-helpbox', $components_directory);
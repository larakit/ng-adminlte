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
\Larakit\Boot::register_middleware(\Larakit\LkNg\LkNgSnippetMiddleware::class);
\Larakit\Boot::register_view_path(__DIR__ . '/views', 'ng-adminlte');

\Larakit\StaticFiles\Manager::package('larakit/ng-adminlte')
    ->usePackage('larakit/sf-adminlte')
    ->usePackage('larakit/sf-angular-larakit')
    ->setSourceDir('public')
    ->jsPackage('services/breadcrumbs-builder.js')
    ->jsPackage('services/lk-hasher.js')
    ->jsPackage('services/lk-list.js')
    ->jsPackage('services/lknggen.js')
    ->jsPackage('services/lk-alerts.js')
    ->jsPackage('services/lk-page.js')
    ->jsPackage('services/lk-thumb.js')
    ->jsPackage('services/lk-sidebars.js')
    ->jsPackage('services/lk-user.js')
    ->jsPackage('module.js')
;

\Larakit\Boot::register_middleware_route('ng-larakit',\Larakit\NgAdminlte\NgComponentsMiddleware::class);
\Larakit\Boot::register_command(\Larakit\NgAdminlte\Commands\LkNgGenerator::class);

//##################################################
//components
//##################################################
$components_directory = '/packages/larakit/ng-adminlte/components/';
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-header', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-sidebar-left', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-sidebar-right', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-content-wrapper', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-footer', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list-pagination', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list-filter', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list-sorter', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list-filter-labels', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list-item', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-list', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-alerts', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-helpbox', $components_directory);
//\Larakit\NgAdminlte\LkNgComponent::register('page-lknggen', $components_directory);
//\Larakit\NgAdminlte\LkNgComponent::register('lknggen-tables', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-thumb-step1', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-thumb-step2', $components_directory);
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-thumb-step3', $components_directory);

\Larakit\NgAdminlte\LkNgComponent::register('adminlte-uploader', $components_directory);
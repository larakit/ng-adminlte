<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 23.05.17
 * Time: 11:56
 */
\Larakit\Boot::register_boot(__DIR__ . '/boot');
\Larakit\Boot::register_view_path(__DIR__ . '/views', 'ng-adminlte');

\Larakit\StaticFiles\Manager::package('larakit/ng-adminlte')
    ->usePackage('larakit/sf-adminlte')
    ->usePackage('larakit/sf-angular-larakit')
    ->setSourceDir('public')
    ->jsPackage('services/breadcrumbs-builder.js')
    ->jsPackage('services/lk-hasher.js')
    ->jsPackage('services/lk-page.js')
    ->jsPackage('services/lk-sidebars.js')
    ->jsPackage('services/lk-user.js');

\Larakit\Boot::register_middleware(\Larakit\NgAdminlte\NgComponentsMiddleware::class);
\Larakit\NgAdminlte\LkNgComponent::register('page-admin', '/packages/larakit/ng-adminlte/components/page-admin/');
\Larakit\NgAdminlte\LkNgComponent::register('adminlte-header', '/packages/larakit/ng-adminlte/components/adminlte-header/');


\Larakit\NgAdminlte\LkNgHeader::register('letter')
    ->setContent('content')
    ->setIcon('fa fa-flag-o')
    ->setLabelClass('success')
    ->setLabelCnt(9);
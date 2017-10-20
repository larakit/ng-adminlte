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

//\Larakit\Boot::register_middleware(\Larakit\LkNg\LkNgSnippetMiddleware::class);

\Larakit\Boot::register_view_path(__DIR__ . '/views', 'ng-adminlte');

\Larakit\StaticFiles\Manager::package('larakit/ng-adminlte')
    ->usePackage('larakit/sf-adminlte')
    ->usePackage('larakit/lk-angular')
    ->setSourceDir('public')
    ->jsPackage('larakit.form.js')
    ->jsPackage('larakit.form/form-examples.js')
    ->jsPackage('larakit.form/formfield-textarea.js')
    ->jsPackage('larakit.form/formfield-text.js')
    ->jsPackage('larakit.form/formfield-priority.js')
    ->jsPackage('larakit.form/formfield-number.js')
    ->jsPackage('larakit.form/formfield-radio.js')
    ->jsPackage('larakit.form/formfield-select.js')
    ->jsPackage('larakit.form/formfield-color.js')
    ->jsPackage('larakit.form/formfield-checkbox.js')
    ->jsPackage('larakit.form/formfield-date.js')
    ->jsPackage('larakit.form/formfield-icons.js')
    ->jsPackage('larakit.form/formfield-switch.js')
    ->jsPackage('larakit.form/formfield-quill.js')
    ->cssPackage('larakit.form/formfield-quill.css')
    ->cssPackage('larakit.form/example.css');
\Larakit\LkNgModule::register('larakit.form');

\Larakit\Boot::register_command(\Larakit\NgAdminlte\Commands\LkNgGenerator::class);

//##################################################
//components
//##################################################
$components_directory = '/packages/larakit/ng-adminlte/components/';
\Larakit\LkNgComponent::register('adminlte-header', $components_directory);
\Larakit\LkNgComponent::register('adminlte-sidebar-left', $components_directory);
\Larakit\LkNgComponent::register('adminlte-sidebar-right', $components_directory);
\Larakit\LkNgComponent::register('adminlte-content-wrapper', $components_directory);
\Larakit\LkNgComponent::register('adminlte-footer', $components_directory);
\Larakit\LkNgComponent::register('adminlte-list-pagination', $components_directory);
\Larakit\LkNgComponent::register('adminlte-list-filter', $components_directory);
\Larakit\LkNgComponent::register('adminlte-list-sorter', $components_directory);
\Larakit\LkNgComponent::register('adminlte-list-filter-labels', $components_directory);
\Larakit\LkNgComponent::register('adminlte-list-item', $components_directory);
\Larakit\LkNgComponent::register('adminlte-list', $components_directory);
\Larakit\LkNgComponent::register('adminlte-alerts', $components_directory);
\Larakit\LkNgComponent::register('adminlte-helpbox', $components_directory);
\Larakit\LkNgComponent::register('adminlte-uploader', $components_directory);
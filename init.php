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

for($i = 0; $i < 5; $i++) {
    \Larakit\NgAdminlte\LkNgHeader::register('letter' . $i)
        ->setContent('content')
        ->setIcon('fa fa-flag-o')
        ->setLabelClass('success')
        ->setLabelCnt(9);
}

\Larakit\NgAdminlte\LkNgHeader::register('envelope')
    ->setContent('<table class="table table-bordered">
                <tbody><tr>
                  <th style="width: 10px">#</th>
                  <th>Task</th>
                  <th>Progress</th>
                  <th style="width: 40px">Label</th>
                </tr>
                <tr>
                  <td>1.</td>
                  <td>Update software</td>
                  <td>
                    <div class="progress progress-xs">
                      <div class="progress-bar progress-bar-danger" style="width: 55%"></div>
                    </div>
                  </td>
                  <td><span class="badge bg-red">55%</span></td>
                </tr>
                <tr>
                  <td>2.</td>
                  <td>Clean database</td>
                  <td>
                    <div class="progress progress-xs">
                      <div class="progress-bar progress-bar-yellow" style="width: 70%"></div>
                    </div>
                  </td>
                  <td><span class="badge bg-yellow">70%</span></td>
                </tr>
                <tr>
                  <td>3.</td>
                  <td>Cron job running</td>
                  <td>
                    <div class="progress progress-xs progress-striped active">
                      <div class="progress-bar progress-bar-primary" style="width: 30%"></div>
                    </div>
                  </td>
                  <td><span class="badge bg-light-blue">30%</span></td>
                </tr>
                <tr>
                  <td>4.</td>
                  <td>Fix and squish bugs</td>
                  <td>
                    <div class="progress progress-xs progress-striped active">
                      <div class="progress-bar progress-bar-success" style="width: 90%"></div>
                    </div>
                  </td>
                  <td><span class="badge bg-green">90%</span></td>
                </tr>
              </tbody></table>')
    ->setIcon('fa fa-envelope-o')
    ->setLabelClass('danger')
    ->setLabelCnt(0);
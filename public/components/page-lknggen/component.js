(function () {

    angular
        .module('larakit')
        .component('pageLknggen', {
            templateUrl: '/packages/larakit/ng-adminlte/components/page-lknggen/component.html',
            controller: Controller
        });

    Controller.$inject = ['BreadCrumbs', '$http', '$timeout', '$rootScope'];

    function Controller(BreadCrumbs, $http, $timeout, $rootScope) {
        var $ctrl = this;
        /**
         * Хлебные крошки
         */
        BreadCrumbs.clear();
        BreadCrumbs.add('lknggen');
        $ctrl.breadcrumbs = BreadCrumbs.all();

        $ctrl.config = {
            labels: {}
        };
        $ctrl.table = '';

        $ctrl.callMigrate = function () {
            $http
                .post('/!/lknggen/call-migrate')
                .then(function (response) {
                    larakit_toastr(response.data);
                    $rootScope.$broadcast('lknggen.migration');
                });
        };
        $ctrl.callMakeMigration = function (table) {
            $http
                .post('/!/lknggen/call-make-migration', {table: table})
                .then(function (response) {
                    larakit_toastr(response.data);
                    $ctrl.migration = response.data.migration;
                });
        };
        $ctrl.setTable = function (table) {
            $ctrl.table = table;
            $http
                .post('/!/lknggen/load', {table: $ctrl.table})
                .then(function (response) {
                    $ctrl.config = response.data;
                });
        };

        $ctrl.save = function () {
            $timeout(function () {
                $http
                    .post('/!/lknggen/save', {table: $ctrl.table, data: $ctrl.config})
                    .then(function (response) {
                        larakit_toastr(response.data)
                    });
            }, 500);
        };
    }
})();
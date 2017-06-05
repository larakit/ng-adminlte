(function () {

    angular
        .module('larakit')
        .component('pageLknggenTable', {
            templateUrl: '/packages/larakit/ng-adminlte/components/page-lknggen-table/component.html',
            controller: Controller
        });

    Controller.$inject = ['BreadCrumbs', '$http', 'LkngGen', '$route', '$timeout', '$sce'];

    function Controller(BreadCrumbs, $http, LkngGen, $route, $timeout, $sce) {
        var $ctrl = this;
        /**
         * Хлебные крошки
         */
        BreadCrumbs.clear();
        BreadCrumbs.add('lknggen');
        $ctrl.breadcrumbs = BreadCrumbs.all();

        $ctrl.tables = {};
        $ctrl.config = {
            labels: {}
        };
        $ctrl.table = $route.current.params.table;
        $http
            .post('/!/lknggen/load', {table: $ctrl.table})
            .then(function (response) {
                $ctrl.config = response.data;
            });

        LkngGen.tables().then(function (tables) {
            console.log(tables);
            $ctrl.tables = tables;
        });
        $ctrl.trustAsHtml = function(string) {
            return $sce.trustAsHtml(string);
        };

        $ctrl.save = function () {
            $timeout(function () {
                $http
                    .post('/!/lknggen/save', {table: $ctrl.table, data: $ctrl.config})
                    .then(function (response) {
                        larakit_toastr(response.data)
                        $ctrl.genModel();
                    });
            }, 500);
        };
        $ctrl.code_model = '';
        $ctrl.genModel = function () {
            $http
                .post('/!/lknggen/model', {table: $ctrl.table})
                .then(function (response) {
                    $ctrl.code_model = response.data.source;
                });
        };
        $ctrl.genModel();
    }
})();
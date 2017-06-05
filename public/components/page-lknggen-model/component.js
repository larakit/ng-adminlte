(function () {

    angular
        .module('larakit')
        .component('pageLknggenModel', {
            templateUrl: '/packages/larakit/ng-adminlte/components/page-lknggen-model/component.html',
            controller: Controller
        });

    Controller.$inject = ['BreadCrumbs', '$http'];

    function Controller(BreadCrumbs, $http) {
        var $ctrl = this;
        /**
         * Хлебные крошки
         */
        BreadCrumbs.clear();
        BreadCrumbs.add('lknggen');
        $ctrl.breadcrumbs = BreadCrumbs.all();

        $ctrl.tables = {};
        $ctrl.config = {
            labels:{}
        };
        $ctrl.table = '';
        $ctrl.setTable = function (table) {
            $ctrl.table = table;
            $http
                .post('/!/lknggen/load', {table: $ctrl.table})
                .then(function (response) {
                    $ctrl.config = response.data;
                });
        };

        $ctrl.save = function(){
            $http
                .post('/!/lknggen/save', {table: $ctrl.table, data:$ctrl.config})
                .then(function (response) {
                    larakit_toastr(response.data)
                });
        };

        $http
            .get('/!/lknggen/tables')
            .then(function (response) {
                $ctrl.tables = response.data;
            });

    }
})();
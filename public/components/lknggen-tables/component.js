(function () {

    angular
        .module('larakit')
        .component('lknggenTables', {
            templateUrl: '/packages/larakit/ng-adminlte/components/lknggen-tables/component.html',
            controller: Controller
        });

    Controller.$inject = ['LkngGen', '$route'];

    function Controller(LkngGen, $route) {
        var $ctrl = this;
        $ctrl.tables = {};
        $ctrl.table = $route.current.params.table;

        LkngGen.tables().then(function (tables) {
            $ctrl.tables = tables;
        });
    }

})();
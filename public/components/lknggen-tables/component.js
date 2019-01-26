(function () {

    angular
        .module('larakit')
        .component('lknggenTables', {
            templateUrl: '/packages/larakit/ng-adminlte/components/lknggen-tables/component.html',
            controller: Controller
        });

    Controller.$inject = ['LkngGen', '$route', '$rootScope'];

    function Controller(LkngGen, $route, $rootScope) {
        var $ctrl = this;
        $ctrl.tables = {};
        $ctrl.table = $route.current.params.table;

        $ctrl.load = function(is_clear){
            LkngGen.tables(is_clear).then(function (tables) {
                $ctrl.tables = tables;
            });
        };
        $ctrl.load();

        $rootScope.$on('lknggen.migration', function (event, data) {
            $ctrl.load(true);
        });
    }

})();
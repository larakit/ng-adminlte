(function () {

    angular
        .module('larakit')
        .component('adminlteListSorter', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-sorter/component.html',
            transclude: true,
            bindings: {
                params: '=',
                sorters: '=',
                load: '&'
            },
            controller: Controller
        });

    Controller.$inject = ['$timeout'];

    function Controller($timeout) {
        var $ctrl = this;
        $ctrl.orderBy = function (sorter) {
            if ($ctrl.params.order_field == sorter.name) {
                $ctrl.params.order_desc = !$ctrl.params.order_desc;
            } else {
                $ctrl.params.order_desc = false;
            }
            $ctrl.params.order_field = sorter.name;
            $ctrl.load()();
        };
    }

})();
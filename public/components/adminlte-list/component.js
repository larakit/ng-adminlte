(function () {

    angular
        .module('larakit')
        .component('adminlteList', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list/component.html',
            transclude: {
                'body': 'listBody',
                'add': '?listAdd',
                'buttons': '?listButtons'
            },
            bindings: {
                data: '=',
                load: '=',
                params: '=',
                config: '=',
                isBulk: '=',
                page: '&'
            },
            controller: Controller
        });

    Controller.$inject = ['$transclude'];

    function Controller($transclude) {
        var $ctrl = this;
        $ctrl.is = false;
        $ctrl.isBulk = $transclude.isSlotFilled('buttons');
        $ctrl.isAdd = $transclude.isSlotFilled('add');
        $ctrl.toggle = function () {
            $ctrl.is = !$ctrl.is;
            _.each($ctrl.data.data, function (model) {
                model.is_checkbox_bulk = $ctrl.is;
            });
            //
        };
        $ctrl.countSelected = function () {
            return _.filter($ctrl.data.data, function (model) {
                return (true == model.is_checkbox_bulk);
            }).length;
        }
    }

})();
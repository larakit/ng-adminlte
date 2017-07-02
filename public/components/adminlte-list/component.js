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
                listOpened: '=',
                listChecked: '=',
                config: '=',
                isBulk: '='
            },
            controller: Controller
        });

    Controller.$inject = ['$transclude'];

    function Controller($transclude) {
        var $ctrl = this;
        $ctrl.is = false;
        $ctrl.isAdd = $transclude.isSlotFilled('add');
        $ctrl.collapseMinus = function () {
            _.each($ctrl.data.data, function (model) {
                if($ctrl.listChecked[model.id]){
                    $ctrl.listOpened[model.id] = false;
                }
            });
        };
        $ctrl.collapsePlus = function () {
            _.each($ctrl.data.data, function (model) {
                if($ctrl.listChecked[model.id]) {
                    $ctrl.listOpened[model.id] = true;
                }
            });
        };
        $ctrl.toggle = function () {
            $ctrl.is = !$ctrl.is;
            _.each($ctrl.data.data, function (model) {
                $ctrl.listChecked[model.id] = $ctrl.is;
            });
            //
        };
        $ctrl.countSelected = function () {
            return _.filter($ctrl.data.data, function (model) {
                return (true == $ctrl.listChecked[model.id]);
            }).length;
        }
    }

})();
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
                if(model.is_list_item_checkbox){
                    model.is_list_item_opened = false;
                }

            });
        };
        $ctrl.collapsePlus = function () {
            _.each($ctrl.data.data, function (model) {
                if(model.is_list_item_checkbox){
                    model.is_list_item_opened = true;
                }

            });
        };
        $ctrl.toggle = function () {
            $ctrl.is = !$ctrl.is;
            _.each($ctrl.data.data, function (model) {
                model.is_list_item_checkbox = $ctrl.is;
            });
            //
        };
        $ctrl.countSelected = function () {
            return _.filter($ctrl.data.data, function (model) {
                return (true == model.is_list_item_checkbox);
            }).length;
        }
    }

})();
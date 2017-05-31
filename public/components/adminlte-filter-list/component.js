(function () {

    angular
        .module('larakit')
        .component('adminlteFilterList', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-filter-list/component.html',
            transclude: {
                'body': 'listBody',
                'buttons': '?listButtons'
            },
            bindings: {
                data: '=',
                load: '=',
                page: '&'
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
        $ctrl.is = false;
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
(function () {

    angular
        .module('larakit')
        .component('adminlteListItem', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-item/component.html',
            transclude: {
                'body': '?itemBody',
                'header': '?itemHeader',
                'buttons': '?itemButtons'
            },
            bindings: {
                model: '=',
                color: '=',
                isHideFooter: '=?',
                isBulk: '='
            },
            controller: Controller
        });

    Controller.$inject = ['$transclude'];

    function Controller($transclude) {
        var $ctrl = this;
        $ctrl.isHideToggle = !$transclude.isSlotFilled('body');
    }

})();
(function () {

    angular
        .module('larakit')
        .component('adminlteFilterItem', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-filter-item/component.html',
            transclude: {
                'body': '?itemBody',
                'header': '?itemHeader',
                'buttons': '?itemButtons'
            },
            bindings: {
                model: '=',
                color: '=',
                isBulk: '=',
                isHideToggle: '='
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
    }

})();
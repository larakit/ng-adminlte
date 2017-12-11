(function () {

    angular
        .module('larakit')
        .component('adminlteListItemChecked', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-item-checked/component.html?' + Math.random(),
            bindings: {
                model: '=',
                listChecked: '=',
                isHideId: '=?'
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
    }

})();
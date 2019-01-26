(function () {

    angular
        .module('larakit')
        .component('adminlteListItemBulk', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-item-bulk/component.html?' + Math.random(),
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
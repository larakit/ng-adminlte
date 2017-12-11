(function () {

    angular
        .module('larakit')
        .component('adminlteListItemOpened', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-item-opened/component.html?' + Math.random(),
            bindings: {
                model: '=',
                listOpened: '='
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
    }

})();
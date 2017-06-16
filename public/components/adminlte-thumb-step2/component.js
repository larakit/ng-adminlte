(function () {

    angular
        .module('larakit')
        .component('adminlteThumbStep2', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-thumb-step2/component.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
        $ctrl.model = {};
        $ctrl.$onInit = function () {
            $ctrl.model = $ctrl.resolve.model;
            $ctrl.type = $ctrl.resolve.type;
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };

    }
})();
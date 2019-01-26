(function () {

    angular
        .module('larakit')
        .component('adminlteAlerts', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-alerts/component.html',
            controller: Controller
        });

    Controller.$inject = ['LkAlerts'];

    function Controller(LkAlerts) {
        var $ctrl = this;
        $ctrl.alerts = LkAlerts.get();
        $ctrl.close = function (index) {
            LkAlerts.close(index);
        }
    }

})();
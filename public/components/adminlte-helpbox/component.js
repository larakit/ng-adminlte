(function () {

    angular
        .module('larakit')
        .component('adminlteHelpbox', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-helpbox/component.html',
            transclude:true,
            bindings: {
                header: '=?'
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
    }

})();
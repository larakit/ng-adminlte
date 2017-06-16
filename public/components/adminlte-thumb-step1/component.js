(function () {

    angular
        .module('larakit')
        .component('adminlteThumbStep1', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-thumb-step1/component.html',
            bindings: {
                model: '='
            },
            controller: Controller
        });

    Controller.$inject = ['$uibModal', 'CSRF_TOKEN'];

    function Controller($uibModal, CSRF_TOKEN) {
        var $ctrl = this;

        $ctrl.gotoStep2 = function (type) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                component: 'adminlteThumbStep2',
                size: 'lg',
                resolve: {
                    model: function () {
                        return $ctrl.model;
                    },
                    type: function () {
                        return type;
                    }
                }
            });
            modalInstance.result.then(function (o) {
                callback.call(null);
            }, function () {
                console.info('modal-component dismissed at: ' + new Date());
            });
        };

    }
})();
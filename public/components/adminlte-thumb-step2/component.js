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

    Controller.$inject = ['$uibModal'];

    function Controller($uibModal) {
        var $ctrl = this;
        $ctrl.model = {};
        $ctrl.$onInit = function () {
            $ctrl.model = $ctrl.resolve.model;
            $ctrl.type = $ctrl.resolve.type;
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };

        $ctrl.gotoStep3 = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                component: 'adminlteThumbStep3',
                size: 'lg',
                resolve: {
                    thumber: function () {
                        return $ctrl.model.thumbs[$ctrl.type];
                    },
                    size: function () {
                        return size;
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
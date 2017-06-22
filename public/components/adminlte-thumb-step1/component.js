(function () {

    angular
        .module('larakit')
        .component('adminlteThumbStep1', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-thumb-step1/component.html',
            bindings: {
                model: '=',
                isRound: '=?'
            },
            controller: Controller
        });

    Controller.$inject = ['$uibModal', '$http'];

    function Controller($uibModal, $http) {
        var $ctrl = this;

        $ctrl.load = function (type) {
            $http
                .get($ctrl.model.thumbs[type].url_thumb)
                .then(function (response) {
                    $ctrl.model = response.data.model;
                });
        };

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
                $ctrl.load(type);
            }, function () {
                $ctrl.load(type);
                console.log();
            });
        };

    }
})();
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

    Controller.$inject = ['$uibModal', '$http'];

    function Controller($uibModal, $http) {
        var $ctrl = this;
        $ctrl.model = {};
        $ctrl.$onInit = function () {
            $ctrl.model = $ctrl.resolve.model;
            $ctrl.type = $ctrl.resolve.type;
            $ctrl.load();
        };

        $ctrl.clear = function () {
            $http
                .post($ctrl.model.thumbs[$ctrl.type].url_clear)
                .then(function (response) {
                    $ctrl.load();
                });
        };

        $ctrl.load = function () {
            $http
                .get($ctrl.model.thumbs[$ctrl.type].url_thumb)
                .then(function (response) {
                    $ctrl.model = response.data.model;
                });
        };
        $ctrl.onCompleteItem = function(fileItem, response, status, headers){
            larakit_toastr(response);
            $ctrl.model.thumbs = response.model.thumbs;
        };


        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: $ctrl.model});
        };

        $ctrl.gotoStep3 = function (size) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                component: 'adminlteThumbStep3',
                size: 'full',
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
                $ctrl.load();
            }, function () {
                $ctrl.load();
            });
        };

    }
})();
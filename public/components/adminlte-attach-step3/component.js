(function () {

    angular
        .module('larakit')
        .component('adminlteAttachStep3', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-attach-step3/component.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: Controller
        });

    Controller.$inject = ['$http'];

    Controller.$inject = ['$http'];

    function Controller($http) {
        var $ctrl = this;
        $ctrl.model = {};

        $ctrl.$onInit = function () {
            $ctrl.model = _.clone($ctrl.resolve.model);
        };

        $ctrl.save = function () {
            $http.post('/!/attach/' + $ctrl.model.id + '/save', $ctrl.model)
                .then(
                    function (response) {
                        if ('error' == response.data.result) {
                            $ctrl.errors = response.data.errors;
                            larakit_toastr(response.data);
                        } else {
                            larakit_toastr(response.data);
                            $ctrl.errors = {};
                            $ctrl.close({$value: response.data.model});
                        }
                    }, function () {

                    }
                );
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }
})();
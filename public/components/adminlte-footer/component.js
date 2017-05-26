(function () {

    angular
        .module('larakit')
        .component('adminlteFooter', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-footer/component.html',
            controller: Controller
        });

    Controller.$inject = ['$http'];

    function Controller($http) {
        var $ctrl = this;
        $ctrl.load = function () {
            $http
                .get('/!/adminlte/footer')
                .then(function (response) {
                    $ctrl.data = response.data;
                });
        };
        $ctrl.load();

    }

})();
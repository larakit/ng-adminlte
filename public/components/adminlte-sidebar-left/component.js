(function () {

    angular
        .module('larakit')
        .component('adminlteSidebarLeft', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-sidebar-left/component.html',
            controller: Controller
        });

    Controller.$inject = ['$http', '$route'];

    function Controller($http, $route) {
        var $ctrl = this;

        $ctrl.load = function () {
            $http
                .get('/!/adminlte/sidebar')
                .then(function (response) {
                    $ctrl.menu_items = response.data;
                });
        };
        $ctrl.current = $route.current.name;
        $ctrl.load();

    }

})();
(function () {

    angular
        .module('larakit')
        .component('adminlteContentWrapper', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-content-wrapper/component.html',
            transclude: true,
            bindings: {
                breadcrumbs: '='
            },
            controller: Controller
        });

    Controller.$inject = ['$route'];

    function Controller($route) {

        var $ctrl = this;

        $ctrl.route = $route.current;

        $ctrl.getTitle = function () {
            return $ctrl.breadcrumbs[$ctrl.breadcrumbs.length - 1].title;
        };
        $ctrl.getSubTitle = function () {
            return $ctrl.breadcrumbs[$ctrl.breadcrumbs.length - 1].subtitle;
        };
    }

})();
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
        if($ctrl.breadcrumbs && $ctrl.breadcrumbs.length){
            $ctrl.current_page = $ctrl.breadcrumbs[$ctrl.breadcrumbs.length-1];
        }
    }

})();
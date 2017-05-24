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

    Controller.$inject = ['$rootScope', '$route'];

    function Controller($rootScope, $route) {

        var $ctrl = this;

        $ctrl.route = $route.current;
        if($ctrl.breadcrumbs.length){
            $ctrl.current_page = $ctrl.breadcrumbs[$ctrl.breadcrumbs.length-1];
        }

        $ctrl.toggleLeft = function () {
            $rootScope.sidebar_left_collapse = !!!$rootScope.sidebar_left_collapse;
            // console.log('$rootScope.sidebar_left_collapse', $rootScope.sidebar_left_collapse);
        };

        $ctrl.toggleRight = function () {
            $rootScope.sidebar_right_collapse = !!!$rootScope.sidebar_right_collapse;
            // console.log('$rootScope.sidebar_right_collapse', $rootScope.sidebar_right_collapse);
        };

    }

})();
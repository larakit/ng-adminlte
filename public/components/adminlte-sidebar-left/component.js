(function () {

    angular
        .module('larakit')
        .component('adminlteSidebarLeft', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-sidebar-left/component.html',
            bindings: {
                section: '='
            },
            controller: Controller
        });

    Controller.$inject = ['$http', '$route', 'LkSidebars', 'hotkeys'];

    function Controller($http, $route, LkSidebars, hotkeys) {
        var $ctrl = this;

        $ctrl.load = function () {
            $http
                .get('/!/adminlte/sidebar')
                .then(function (response) {
                    $ctrl.menu_items = response.data[$ctrl.section];
                    console.log(response.data);
                    console.log($ctrl.section);
                    console.log($ctrl.menu_items);
                });
        };
        $ctrl.current = $route.current.originalPath;
        $ctrl.load();

        hotkeys.add({
            combo: 'ctrl+left',
            description: 'Description goes here',
            callback: function (event, hotkey) {
                LkSidebars.leftToggle();
            }
        });


    }

})();
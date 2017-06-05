(function () {

    angular
        .module('larakit')
        .component('adminlteSidebarLeft', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-sidebar-left/component.html',
            transclude: true,
            bindings: {
                section: '='
            },
            controller: Controller
        });

    Controller.$inject = ['$http', '$route', 'LkSidebars', 'hotkeys'];

    function Controller($http, $route, LkSidebars, hotkeys) {
        var $ctrl = this;
        $ctrl.opened = {};

        $ctrl.load = function () {
            $http
                .get('/!/adminlte/sidebar', {
                    cache: true
                })
                .then(function (response) {
                    $ctrl.menu_items = response.data[$ctrl.section];
                    // console.log(response.data);
                    // console.log($ctrl.section);
                    // console.log($ctrl.menu_items);
                });
        };
        $ctrl.current = $route.current.originalPath;
        $ctrl.load();

        $ctrl.treeViewMenuStyle = function (item) {
            return {
                display: $ctrl.isOpened(item) ? 'block' : 'none'
            };
        };
        $ctrl.toggle = function (item, $event) {
            if (item._items_.length > 0) {
                $ctrl.opened[item.url] = !$ctrl.opened[item.url];
                $event.preventDefault();
            }
        };

        $ctrl.isOpened = function (item) {
            if (undefined == $ctrl.opened[item.url]) {
                $ctrl.opened[item.url] = $ctrl.isActive(item);
            }
            return $ctrl.opened[item.url];
        };
        $ctrl.isActive = function (item) {
            // console.log($ctrl.opened[item.url], item.access_name, item.childs);
            for (var i = 0; i < item.childs.length; i++) {
                if (item.childs[i] == $route.current.originalPath) {
                    return true;
                }
            }
            return false;
        };

        hotkeys.add({
            combo: 'ctrl+left',
            description: 'Description goes here',
            callback: function (event, hotkey) {
                LkSidebars.leftToggle();
            }
        });


    }

})();
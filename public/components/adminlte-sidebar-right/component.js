(function () {

    angular
        .module('larakit')
        .component('adminlteSidebarRight', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-sidebar-right/component.html',
            transclude: true,
            controller: Controller
        });

    Controller.$inject = ['LkSidebars', 'hotkeys'];

    function Controller(LkSidebars, hotkeys) {
        var $ctrl = this;
        hotkeys.add({
            combo: 'ctrl+right',
            description: 'Description goes here',
            callback: function (event, hotkey) {
                LkSidebars.rightToggle();
            }
        });

    }

})();
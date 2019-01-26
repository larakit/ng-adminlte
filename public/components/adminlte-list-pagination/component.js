(function () {

    angular
        .module('larakit')
        .component('adminlteListPagination', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-pagination/component.html',
            transclude: true,
            bindings: {
                data: '=',
                params: '=',
                load: '&'
            },
            controller: Controller
        });

    Controller.$inject = ['hotkeys'];

    function Controller(hotkeys) {
        var $ctrl = this;
        hotkeys.add({
            combo: 'shift+left',
            callback: function (event, hotkey) {
                if ($ctrl.params.page > 1) {
                    $ctrl.params.page--;
                    $ctrl.load()();
                }
            }
        });
        hotkeys.add({
            combo: 'shift+right',
            callback: function (event, hotkey) {
                if ($ctrl.params.page < $ctrl.data.last_page) {
                    $ctrl.params.page++;
                    $ctrl.load()();
                }
            }
        });
    }

})();
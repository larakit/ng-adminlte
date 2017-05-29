(function () {

    angular
        .module('larakit')
        .component('adminlteFilterPagination', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-filter-pagination/component.html',
            transclude: true,
            bindings: {
                data: '=',
                page: '=',
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
                if ($ctrl.page > 1) {
                    $ctrl.page--;
                    $ctrl.load()();
                }
            }
        });
        hotkeys.add({
            combo: 'shift+right',
            callback: function (event, hotkey) {
                console.log($ctrl.page, $ctrl.data.total);
                if ($ctrl.page < $ctrl.data.last_page) {
                    $ctrl.page++;
                    $ctrl.load()();
                }
            }
        });

    }

})();
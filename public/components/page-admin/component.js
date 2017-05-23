(function () {

    angular
        .module('larakit')
        .component('pageAdmin', {
            templateUrl: '/packages/larakit/ng-adminlte/components/page-admin/component.html',
            controller: Controller
        });

    Controller.$inject = ['BreadCrumbs', 'LkUser'];

    function Controller(BreadCrumbs, LkUser) {
        var $ctrl = this;
        /**
         * Хлебные крошки
         */
        BreadCrumbs.clear();
        BreadCrumbs.add('admin');
        $ctrl.breadcrumbs = BreadCrumbs.all();


        LkUser.me().then(function (data) {
            $ctrl.me = data;
        });

    }
})();
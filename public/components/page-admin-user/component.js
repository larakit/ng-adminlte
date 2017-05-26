(function () {

    angular
        .module('larakit')
        .component('pageAdminUser', {
            templateUrl: '/packages/larakit/ng-adminlte/components/page-admin-user/component.html',
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
        BreadCrumbs.add('admin-user');
        $ctrl.breadcrumbs = BreadCrumbs.all();


        LkUser.me().then(function (data) {
            $ctrl.me = data;
        });

    }
})();
(function () {

    angular
        .module('larakit')
        .component('pageAdmin', {
            templateUrl: '/packages/larakit/ng-adminlte/components/page-admin/component.html',
            controller: Controller
        });

    Controller.$inject = ['BreadCrumbs', 'LkUser', '$http'];

    function Controller(BreadCrumbs, LkUser, $http) {
        var $ctrl = this;
        /**
         * Хлебные крошки
         */
        BreadCrumbs.clear();
        BreadCrumbs.add('admin');
        $ctrl.breadcrumbs = BreadCrumbs.all();

        $http
            .get('/!/adminlte/page-admin')
            .then(function (response) {
                $ctrl.data = response.data;
            });

        LkUser.me().then(function (data) {
            $ctrl.me = data;
        });

    }
})();
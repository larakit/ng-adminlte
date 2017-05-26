(function () {

    angular
        .module('larakit')
        .component('pageAccountAvatar', {
            templateUrl: '/packages/larakit/ng-adminlte/components/page-account-avatar/component.html',
            controller: Controller
        });

    Controller.$inject = ['BreadCrumbs', 'LkUser'];

    function Controller(BreadCrumbs, LkUser) {
        var $ctrl = this;
        /**
         * Хлебные крошки
         */
        BreadCrumbs.clear();
        BreadCrumbs.add('account');
        $ctrl.breadcrumbs = BreadCrumbs.all();


        LkUser.me().then(function (data) {
            $ctrl.me = data;
        });

    }
})();
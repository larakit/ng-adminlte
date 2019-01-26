(function () {

    angular
        .module('larakit')
        .component('adminlteHeader', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-header/component.html',
            bindings: {
                home: '=?'
            },
            controller: Controller
        });

    Controller.$inject = ['LkSidebars', 'LkUser', '$location', '$http', '$translate'];

    function Controller(LkSidebars, LkUser, $location, $http,$translate) {
        var $ctrl = this;
        $ctrl.me = {};
        $ctrl.menu_items = [];

        $ctrl.leftToggle = function () {
            console.log('$ctrl.leftToggle');
            LkSidebars.leftToggle();
        };
        $ctrl.rightToggle = function () {
            console.log('$ctrl.rightToggle');
            LkSidebars.rightToggle();
            return false;
        };
        LkUser.me().then(function (data) {
            $ctrl.me = data;
            if (undefined == $ctrl.me.id) {
                $location.href = '/?no_auth';
            }
        });
        $ctrl.load = function () {
            $http
                .get('/!/adminlte/header')
                .then(function (response) {
                    $ctrl.menu_items = response.data.items;
                    $ctrl.logo_mini = response.data.logo_mini;
                    $ctrl.logo_lg = response.data.logo_lg;
                    $ctrl.langs = response.data.langs;
                    $ctrl.lang = response.data.lang;
                });
        };
        $ctrl.load();
        $ctrl.logout = function () {
            $http.post('/logout').then(function (response) {
                if ('success' == response.data.result) {
                    larakit_toastr(response.data);
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 1000);
                }

            })
        }
        $ctrl.currentLanguage = function () {
            return $translate.use();
        };

        $ctrl.changeLanguage = function (langKey, $event) {
            $translate.use(langKey);
            $event.preventDefault();
        };
    }

})();
(function () {

    angular
        .module('larakit')
        .component('adminlteHeader', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-header/component.html',
            controller: Controller
        });

    Controller.$inject = ['LkSidebars', 'LkUser', '$location', '$http'];

    function Controller(LkSidebars, LkUser, $location, $http) {
        var $ctrl = this;
        $ctrl.me = {};
        $ctrl.menu_items = [];

        $ctrl.leftToggle = function () {
            LkSidebars.leftToggle();
        };
        $ctrl.rightToggle = function () {
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
                    $ctrl.menu_items = response.data;
                    console.log(response.data);
                });
        };
        $ctrl.load();
        $ctrl.logout = function () {
            $http.post('/logout').then(function (response) {
                if('success'==response.data.result){
                    larakit_toastr(response.data);
                    setTimeout(function(){
                        window.location.href = '/';
                    }, 1000);
                }

            })
        }
    }

})();
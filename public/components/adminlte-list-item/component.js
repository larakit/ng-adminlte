(function () {

    angular
        .module('larakit')
        .component('adminlteListItem', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-item/component.html?' + Math.random(),
            transclude: {
                'body': '?itemBody',
                'header': '?itemHeader',
                'buttons': '?itemButtons'
            },
            bindings: {
                model: '=',
                color: '=',
                half: '=?',
                wLeft: '=?',
                wRight: '=?',
                listOpened: '=',
                listChecked: '=',
                isHideFooter: '=?',
                isHideId: '=?'
            },
            controller: Controller
        });

    Controller.$inject = ['$transclude'];

    function Controller($transclude) {
        var $ctrl = this;
        $ctrl.isHideToggle = !$transclude.isSlotFilled('body');
        $ctrl.$postLink = function(){
            if(!$ctrl.wLeft){
                $ctrl.wLeft = '80px';
            }
            if(!$ctrl.wRight){
                $ctrl.wRight = '50px';
            }
        }
    }

})();
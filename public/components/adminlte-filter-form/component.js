(function () {

    angular
        .module('larakit')
        .component('adminlteFilterForm', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-filter-form/component.html',
            transclude: true,
            bindings: {
                params: '=',
                config: '=',
                load: '&'
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
        //##################################################
        // BOOLEAN
        //##################################################
        $ctrl.isShowBoolean = function (filter) {
            return 'boolean' == filter.type;
        };
        //##################################################
        // SLIDER
        //##################################################
        $ctrl.isShowSlider = function (filter) {
            return 'slider' == filter.type;
        };

        //##################################################
        // BUTTON
        //##################################################
        $ctrl.isShowButton = function (filter) {
            return 'button' == filter.type;
        };

        //##################################################
        // CHECKBOX
        //##################################################
        $ctrl.isShowCheckbox = function (filter) {
            return 'checkbox' == filter.type;
        };

        //##################################################
        // LIKE
        //##################################################
        $ctrl.isShowLike = function (filter) {
            return 'like' == filter.type;
        };

        //##################################################
        // SELECT2
        //##################################################
        $ctrl.isShowSelect2 = function (filter) {
            return 'select2' == filter.type;
        };
    }

})();
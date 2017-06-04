(function () {

    angular
        .module('larakit')
        .component('adminlteListFilter', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-filter/component.html',
            transclude: true,
            bindings: {
                params: '=',
                filters: '=',
                load: '&'
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
        $ctrl.isShowCondition = function (filter, type) {
            if (type != filter.type) {
                return false;
            }
            if (null != filter.condition) {
                if (!eval(filter.condition)) {
                    return false;
                }
            }
            return true;
        };

        //##################################################
        // BOOLEAN
        //##################################################
        $ctrl.isShowBoolean = function (filter) {
            return $ctrl.isShowCondition(filter, 'boolean');
        };
        //##################################################
        // SLIDER
        //##################################################
        $ctrl.isShowSlider = function (filter) {
            return $ctrl.isShowCondition(filter, 'slider');
        };
        $ctrl.sliderOptions = function (options) {
            options.onChange = function () {
                $ctrl.load()(false, 1)
            };
            return options;
        };

        //##################################################
        // BUTTON
        //##################################################
        $ctrl.isShowButton = function (filter) {
            return $ctrl.isShowCondition(filter, 'button');
        };

        //##################################################
        // CHECKBOX
        //##################################################
        $ctrl.isShowCheckbox = function (filter) {
            return $ctrl.isShowCondition(filter, 'checkbox');
        };

        //##################################################
        // LIKE
        //##################################################
        $ctrl.isShowLike = function (filter) {
            return $ctrl.isShowCondition(filter, 'like');
        };

        //##################################################
        // SELECT2
        //##################################################
        $ctrl.isShowSelect2 = function (filter) {
            return $ctrl.isShowCondition(filter, 'select2');
        };
    }

})();
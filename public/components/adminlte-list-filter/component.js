(function () {

    angular
        .module('larakit')
        .component('adminlteListFilter', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-filter/component.html?' + Math.random(),
            transclude: true,
            bindings: {
                current: '=?',
                currentMode: '=?',
                params: '=',
                filters: '=',
                load: '&'
            },
            controller: Controller
        });

    Controller.$inject = ['LkList'];

    function Controller(LkList) {
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
        $ctrl.isLoading = function () {
            return LkList.isLoading();
        };

        $ctrl.filterCurrentOne = function (model) {
            if($ctrl.params.filters.id == model.id){
                $ctrl.params.filters.id = '';
            } else {
                $ctrl.params.filters.id = model.id.toString();
            }

            $ctrl.load()(false, 1);
        };
        $ctrl.filterCurrentAll = function(){
            var ids = [];
            _.each($ctrl.current, function(o){
                ids.push(o.id);
            });
            $ctrl.params.filters.id = ids.join();
            $ctrl.load()(false, 1);
        }

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
        // EQUAL
        //##################################################
        $ctrl.isShowEqual = function (filter) {
            return $ctrl.isShowCondition(filter, 'equal');
        };

        //##################################################
        // SELECT2
        //##################################################
        $ctrl.isShowSelect2 = function (filter) {
            return $ctrl.isShowCondition(filter, 'select2');
        };
        //##################################################
        // SELECT2
        //##################################################
        $ctrl.isShowRangeDate = function (filter) {
            return $ctrl.isShowCondition(filter, 'range_date');
        };
    }

})();
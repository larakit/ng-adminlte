angular
    .module('larakit.form')
    .component('formfieldDualselect', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-dualselect.html?'+Math.random(),
        transclude: true,

        bindings: {
            error: '=',
            desc: '=',
            options: '=',
            change: '&?',
            config: '=',
            model: '=',
            titleLeft: '=?',
            titleRight: '=?'
        },
        controller: function () {
            var $ctrl = this;
            $ctrl.multiple = !!$ctrl.multiple;
            $ctrl.select_model = {id: 0};
            $ctrl.onChange = function () {
                if ($ctrl.change) {
                    $ctrl.change()();
                }
            };

            $ctrl.selected = function () {
                $ctrl.model = $ctrl.select_model.id;
            };

            $ctrl.getLabel = function () {
                var selected = _.find($ctrl.options, {id: $ctrl.model});
                if ($ctrl.model) {
                    if (undefined != selected) {
                        var val = selected[$ctrl.optionKey];
                        if (undefined != val) {
                            return val;
                        }
                    }
                }
                return '-';
            };
            $ctrl.$onInit = function () {
                if (true != $ctrl.multiple) {
                    $ctrl.multiple = false;
                    $ctrl.select_model.id = $ctrl.model;
                }
                if(!$ctrl.optionKey){
                    $ctrl.optionKey = 'toString';
                }
            };
            $ctrl.groupBy = function (item) {
                return _.get(item, $ctrl.groupField);
            };


        }
    });

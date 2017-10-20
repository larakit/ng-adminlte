angular
    .module('larakit.form')
    .component('formfieldNumber', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-number.html',
        transclude: true,
        bindings: {
            error: '=?',
            examples: '=?',
            append: '=?',
            prepend: '=?',
            desc: '=?',
            step: '=?',
            change: '&?',
            model: '='
        },
        controller: function ($transclude) {
            var $ctrl = this;
            $ctrl.isLabel = $transclude.isSlotFilled(false);
            $ctrl.getStep = function (va) {
                return (undefined == $ctrl.step) ? 1 : 'any';
            };
            $ctrl.onChange = function () {
                if ($ctrl.change) {
                    $ctrl.change();
                }
            };
        }
    });
angular
    .module('larakit.form')
    .component('formfieldCheckbox', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-checkbox.html',
        transclude: true,
        bindings: {
            error: '=',
            desc: '=',
            label: '=',
            model: '='
        }
    });
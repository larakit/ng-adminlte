angular
    .module('larakit.form')
    .component('formfieldRadio', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-radio.html',
        transclude: true,
        bindings: {
            error: '=',
            isVertical: '=?',
            isFull: '=?',
            desc: '=',
            options: '=',
            label: '=',
            model: '='
        }
    });
angular
    .module('larakit.form')
    .component('formfieldTextarea', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-textarea.html',
        transclude: true,
        bindings: {
            error: '=',
            desc: '=',
            append: '=?',
            prepend: '=?',
            examples: '=',
            label: '=',
            rows: '=',
            cols: '=',
            isExampleAppend: '=?',
            model: '='
        },
        controller: function () {
            var self = this;
        }
    });
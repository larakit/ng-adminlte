angular
    .module('larakit.form')
    .component('formfieldPriority', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-priority.html',
        bindings: {
            error: '=?',
            examples: '=?',
            append: '=?',
            prepend: '=?',
            desc: '=?',
            step: '=?',
            change: '&?',
            model: '='
        }
    });
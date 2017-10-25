angular
    .module('larakit.form')
    .component('formfieldPhone', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-phone.html',
        transclude: true,
        bindings: {
            error: '=?',
            examples: '=?',
            append: '=?',
            prepend: '=?',
            desc: '=?',
            change: '&?',
            model: '=',
            isExampleAppend: '=?'
        },
        controller: function () {
            var self = this;
            self.onChange = function () {
                if (self.change) {
                    self.change();
                }
            };
        }
    });
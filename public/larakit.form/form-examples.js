angular
    .module('larakit.form')
    .component('formExamples', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/form-examples.html',
        transclude: true,
        bindings: {
            examples: '=',
            isExampleAppend: '=?',
            model: '='
        },
        controller: function () {
            var self = this;
            self.setExample = function (val) {
                if (true == self.isExampleAppend) {
                    if (undefined == self.model || 0 == self.model.length) {
                        self.model = val;
                    } else {
                        self.model = self.model + ', ' + val;
                    }
                } else {
                    self.model = val;
                }
            };
        }
    });
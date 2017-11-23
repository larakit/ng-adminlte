angular
    .module('larakit.form')
    .component('formExamples', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/form-examples.html',
        transclude: true,
        bindings: {
            examples: '=',
            isExampleAppend: '=?',
            isForceNumber: '=?',
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
                    if (self.isFloat(self.model)) {
                        self.model = parseFloat(self.model);
                    }
                    if (self.isInt(self.model)) {
                        self.model = parseInt(self.model);
                    }
                }
            };
            self.isInt = function (n) {
                return Number(n) === n && n % 1 === 0;
            }

            self.isFloat = function (n) {
                return Number(n) === n && n % 1 !== 0;
            }
        }
    });
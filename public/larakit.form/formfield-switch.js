angular
    .module('larakit.form')
    .component('formfieldSwitch', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-switch.html',
        transclude: true,
        bindings: {
            error: '=?',
            switchOn: '=?',
            switchOff: '=?',
            switchInverse: '=?',
            switchClass: '=?',
            desc: '=',
            change: '&?',
            label: '=',
            model: '='
        },
        controller: function () {
            var self = this;
            self.onChange = function () {
                if (self.change) {
                    self.change();
                }
            };
            self.$onInit = function () {
                self.switchOn = (undefined == self.switchOn) ? 'Да' : self.switchOn;
                self.switchOff = (undefined == self.switchOff) ? 'Нет' : self.switchOff;
                self.switchClass = (undefined == self.switchClass) ? 'wide' : self.switchClass;
            };
        }
    });
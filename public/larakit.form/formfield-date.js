angular
    .module('larakit.form')
    .component('formfieldDate', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-date.html?' + Math.random(),
        transclude: true,
        bindings: {
            error: '=',
            desc: '=',
            label: '=',
            max: '=',
            min: '=',
            change: '&?',
            model: '='
        },
        controller: function () {
            var self = this;
            self.opened = false;
            self.dateOptions = {
                formatYear: 'yy',
                maxDate: (undefined !== self.max) ? new Date(self.max) : null,
                minDate: (undefined !== self.min) ? new Date(self.min) : null,
                startingDay: 1
            };
<<<<<<< HEAD
            self.$postLink = function () {
                if (self.model) {
                    self.model = new Date(self.model);
                }

=======
            self.$postLink = function(){
                if(self.model){
                    self.model = new Date(self.model);
                }
>>>>>>> ea8e2fc8c3cc2ebec2d0f86f626fd010e47fd10a
            };

            self.format = 'dd.MM.yyyy';
            self.clear = function () {

            }
            self.onChange = function () {
                if (self.change) {
                    self.change();
                }
            };
        }
    })
    .directive('datetimepickerNeutralTimezone', function () {
        return {
            restrict: 'A',
            priority: 1,
            require: 'ngModel',
            link: function (scope, element, attrs, ctrl) {
                ctrl.$formatters.push(function (value) {
                    if (value) {
                        var date = new Date(Date.parse(value));
                        date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()));
                        return date;
                    } else {
                        return null;
                    }
                });

                ctrl.$parsers.push(function (value) {
                    if (value) {
                        var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()));
                        return date;
                    } else {
                        return null;
                    }
                });
            }
        };
    });
;
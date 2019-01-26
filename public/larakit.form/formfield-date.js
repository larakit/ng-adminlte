(function () {
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
            controller: Controller
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

    Controller.$inject = ['LkEvent', '$locale', '$filter'];

    function Controller (LkEvent, $locale, $filter) {
        var $ctrl = this;
        $ctrl.opened = false;
        $ctrl.dateOptions = {
            formatYear: 'yy',
            maxDate: (undefined !== $ctrl.max) ? new Date($ctrl.max) : null,
            minDate: (undefined !== $ctrl.min) ? new Date($ctrl.min) : null,
            startingDay: 1
        };
        $ctrl.$postLink = function () {
            if ($ctrl.model) {
                $ctrl.model = new Date($ctrl.model);
            }
            $ctrl.applyLocale();
            console.log($locale.DATETIME_FORMATS);
            LkEvent.subscribe('lk-change-locale', null, function () {
                $ctrl.applyLocale();
            });

        };

        $ctrl.format = 'dd.MM.yyyy';
        $ctrl.clear = function () {

        };
        $ctrl.onChange = function () {
            if ($ctrl.change) {
                $ctrl.change();
            }
        };
    }
})();
angular.module('larakit.form', [
    'uiSwitch',
    'ui.select',
    'color.picker',
    'ngQuill'
]);

angular.module('larakit.form')
    .filter('toDate', function () {
        return function (input) {
            return new Date(input);
        }
    });

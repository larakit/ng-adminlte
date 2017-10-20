angular
    .module('larakit.form')
    .component('formfieldIcons', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-icons.html',
        transclude: true,
        bindings: {
            error: '=',
            model: '=',
            labels: '=?',
            options: '=',
            w: '=?',
            h: '=?'
        },
        controller: function () {
            var self = this;
            !self.w ? self.w = 50 : self.w;
            !self.h ? self.h = 50 : self.w;
        }
    });
angular
    .module('larakit.form')
    .component('formfieldDate', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-date.html',
        transclude: true,
        bindings: {
            error: '=',
            desc: '=',
            label: '=',
            max: '=',
            min: '=',
            model: '='
        },
        controller: function () {
            var self = this;
            self.opened = false;
            self.dateOptions = {
                formatYear: 'yy',
                maxDate: (undefined!==self.max)?new Date(self.max):null,
                minDate: (undefined!==self.min)?new Date(self.min):null,
                startingDay: 1
            };
            self.$postLink = function(){
                self.model = new Date(self.model);
            };

            self.format = 'dd.MM.yyyy';
            self.clear = function(){

            }
        }
    });
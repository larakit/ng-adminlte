angular
    .module('larakit.form')
    .component('formfieldQuill', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-quill.html',
        transclude: true,
        bindings: {
            error: '=',
            desc: '=',
            examples: '=',
            label: '=?',
            max: '=?',
            min: '=?',
            model: '=',
            theme: '=?',
            cssClass: '=?'
        },
        controller: function () {
            var self = this;
            self.preparedExamples = [];
            if (undefined != self.examples) {
                var title, value;
                _.each(self.examples, function (v, k) {
                    value = v[0];
                    title = (undefined !== v[1]) ? v[1] : value;
                    self.preparedExamples.push({value: value, title: title});
                });
            }
            !self.theme ? self.theme = 'snow' : self.theme;
            !self.cssClass ? self.cssClass = 'default' : self.cssClass;
        }
    });
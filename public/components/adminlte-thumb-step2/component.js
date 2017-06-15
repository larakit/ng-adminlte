(function () {

    angular
        .module('larakit')
        .component('adminlteThumbStep2', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-thumb-step2/component.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
        $ctrl.model = {};
        $ctrl.$onInit = function () {
            $ctrl.model = $ctrl.resolve.model;
            $ctrl.thumbType = $ctrl.resolve.thumbType;
        };

        $ctrl.thumbs = function () {
            return _.get($ctrl.model, 'thumbs.' + $ctrl.thumbType, []);
        };


        $ctrl.getUrl = function(thumb){
            var url = _.get(thumb, 'url', null);
            return url ? url + '?' + Math.random() : 'http://placehold.it/' + thumb.w + 'x' + thumb.h;
        };

    }
})();
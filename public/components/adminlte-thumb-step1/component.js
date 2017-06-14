(function () {

    angular
        .module('larakit')
        .component('adminlteThumbStep1', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-thumb-step1/component.html',
            bindings: {
                model: '=',
                thumbType: '=',
                thumbSize: '='
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
        $ctrl.getUrl = function () {
            var url = _.get($ctrl.model, 'thumbs.' + $ctrl.thumbType + '.' + $ctrl.thumbSize + '.url', null);
            return url ? url : 'http://placehold.it/' + $ctrl.getW() + 'x' + $ctrl.getW();
        };
        $ctrl.getHash = function () {
            return Math.random();
        };
        $ctrl.getTitle = function () {
            return _.get($ctrl.model, 'thumbs.' + $ctrl.thumbType + '.' + $ctrl.thumbSize + '.name', null);
        };
        $ctrl.getH = function () {
            return _.get($ctrl.model, 'thumbs.' + $ctrl.thumbType + '.' + $ctrl.thumbSize + '.h', null);
        };
        $ctrl.getW = function () {
            return _.get($ctrl.model, 'thumbs.' + $ctrl.thumbType + '.' + $ctrl.thumbSize + '.w', null);
        };
    }
})();
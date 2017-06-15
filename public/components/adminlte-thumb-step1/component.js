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

    Controller.$inject = ['$uibModal'];

    function Controller($uibModal) {
        var $ctrl = this;
        $ctrl.getUrl = function () {
            var url = _.get($ctrl.model, 'thumbs.' + $ctrl.thumbType + '.' + $ctrl.thumbSize + '.url', null);
            return url ? url + '?' + Math.random() : 'http://placehold.it/' + $ctrl.getW() + 'x' + $ctrl.getW();
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

        $ctrl.gotoStep2 = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                component: 'adminlteThumbStep2',
                size: 'lg',
                resolve: {
                    model: function () {
                        return $ctrl.model;
                    },
                    thumbType: function () {
                        return $ctrl.thumbType;
                    }
                }
            });
            modalInstance.result.then(function (o) {
                callback.call(null);
            }, function () {
                console.info('modal-component dismissed at: ' + new Date());
            });
        };

    }
})();
angular
    .module('larakit.form')
    .component('formfieldBelongsto', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-belongsto.html?' + Math.random(),
        transclude: true,

        bindings: {
            error: '=?',
            onSelect: '&',
            modalComponent: '=',
            model: '=?',
            modelId: '=?'
        },

        controller: function ($uibModal) {
            var $ctrl = this;

            $ctrl.$postLink = function () {
                if (!$ctrl.model) {
                    $ctrl.modelId = 0;
                    $ctrl.model = {
                        id: 0,
                        toString: '- не выбрано -'
                    };
                }
            };
            $ctrl.showModal = function () {
                var config = {
                    animation: true,
                    ariaLabelledBy: 'modal-title-bottom',
                    ariaDescribedBy: 'modal-body-bottom',
                    component: $ctrl.modalComponent,
                    size: 'full',
                    resolve: {
                        model: function () {
                            return $ctrl.model;
                        }
                    }
                };
                config.backdrop = 'static';
                config.keyboard = false;
                var modalInstance = $uibModal.open(config);
                modalInstance.result.then(function (o) {
                    $ctrl.modelId = o.id;
                    $ctrl.model = o;
                    if($ctrl.onSelect){
                        console.log('onSelect', $ctrl.model);
                        $ctrl.onSelect()($ctrl.model);
                    }
                    // $ctrl.current = obj;
                }, function () {
                    // console.info('modal-component dismissed at: ' + new Date());
                });
            };
        }
    });

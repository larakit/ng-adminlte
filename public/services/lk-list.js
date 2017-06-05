(function () {

    angular
        .module('larakit')
        .factory('LkList', Factory);

    Factory.$inject = ['$http', 'LkAlerts', '$timeout', '$uibModal'];

    function Factory($http, LkAlerts, $timeout, $uibModal) {
        var self = this;
        self.alerts = [];

        return {
            ids: ids,
            config: config,
            actionRemove: actionRemove,
            actionLoad: actionLoad,
            actionEdit: actionEdit
        };

        function ids(models) {
            var ids = [];
            _.each(models, function (model) {
                if (true == model.is_checkbox_bulk) {
                    ids.push(model.id);
                }
            });
            return ids;
        }

        function config($ctrl) {
            /**
             * Данные для формирования списка
             */
            $ctrl.params = {
                filters: {},
                page: 1,
                order_field: null,
                order_desc: false
            };

            /**
             * Элементы списка
             */
            $ctrl.data = {};

            /**
             * Настройки фильтров
             * Настройки сортировщика
             */
            $ctrl.config = {
                filters: [],
                sorters: []
            };

            $http
                .post($ctrl.url_config)
                .then(function (response) {
                    $ctrl.config = response.data;
                    $ctrl.params.order_field = response.data.sorter_default;
                    $ctrl.params.order_desc = false;
                    //первоначальное наполнение
                    actionLoad($ctrl);
                });

        }

        function actionLoad($ctrl, is_clear_filters, page) {
            if (true == is_clear_filters) {
                $ctrl.params.filters = {};
            }
            if (undefined != page) {
                $ctrl.params.page = page;
            }
            $timeout(function () {
                $http
                    .post($ctrl.url_load, $ctrl.params)
                    .then(function (response) {
                        $ctrl.data = response.data.models;
                    }, 100);
            });
        }

        function actionRemove(model, $ctrl, confirm_message) {
            if (confirm(confirm_message)) {
                $http.post($ctrl.url_delete, model)
                    .then(function (response) {
                            larakit_toastr(response.data);
                            LkAlerts.add(response.data);
                            actionLoad($ctrl);
                        }
                    );
            }

        }

        function actionEdit(model, componentForm, callback) {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title-bottom',
                ariaDescribedBy: 'modal-body-bottom',
                component: componentForm,
                size: 'lg',
                resolve: {
                    model: function () {
                        return model;
                    }
                }
            });
            modalInstance.result.then(function (o) {
                callback.call(null);
            }, function () {
                console.info('modal-component dismissed at: ' + new Date());
            });

        }
    }

})();
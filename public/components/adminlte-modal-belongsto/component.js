(function () {

    angular
        .module('larakit')
        .component('adminlteModalBelongsto', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-modal-belongsto/component.html',
            bindings: {
                model: '=?',
                urlConfig: '=?',
                urlLoad: '=?',
                urlDelete: '=?',
                componentList: '=?',
                close: '&',
                dismiss: '&'
            },
            controller: Controller
        });

    Controller.$inject = ['$http', 'LkList'];

    function Controller($http, LkList) {
        var $ctrl = this;
        $ctrl.model = {};

        $ctrl.$postLink = function () {
            console.log($ctrl.resolve);
            $ctrl.model = _.clone($ctrl.resolve.model);
            $ctrl.url_config = $ctrl.resolve.url_config;
            $ctrl.url_load = $ctrl.resolve.url_load;
            $ctrl.url_delete = $ctrl.resolve.url_delete;
            $ctrl.modalComponent = $ctrl.resolve.modal_component;
            //получаем настройки списка
            LkList.config($ctrl);
        };

        //функция загрузки данных
        $ctrl.load = function (is_clear_filters, page) {
            LkList.actionLoad($ctrl, is_clear_filters, page);
        };

        $ctrl.isActiveFilial = function (filial,model) {
            return LkArray.in_array(filial.id, model.filials);
        };

        $ctrl.actionRemove = function (model) {
            LkList.actionRemove(model, $ctrl, 'Вы действительно хотите удалить эту запись?');
        };

        //вызов модала с формой редактирования
        $ctrl.actionEdit = function (model) {
            console.log(model);
            LkList.actionEdit(model, $ctrl.modalComponent, function () {
                $ctrl.load();
            }, 'full', 1);
        };

        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
    }

})();
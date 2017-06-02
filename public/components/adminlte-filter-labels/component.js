(function () {

    angular
        .module('larakit')
        .component('adminlteFilterLabels', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-filter-labels/component.html',
            bindings: {
                config: '=',
                load: '&',
                params: '='
            },
            controller: Controller
        });

    Controller.$inject = [];

    function Controller() {
        var $ctrl = this;
        /**
         * Сброс установленного фильтра
         * @param name
         * @param id
         */
        $ctrl.clearCollection = function (name, id) {
            $ctrl.params[name] = _.filter($ctrl.params[name], function(o){
                return o.id != id;
            });
            $ctrl.load()();
        };
        $ctrl.clear = function (name, id) {
            var path = name;
            if (undefined !== id) {
                path += '.' + id;
            }
            _.set($ctrl.params, path, undefined);
            $ctrl.load()();
        };

        $ctrl.isShow = function () {
            var cnt = 0;
            _.each($ctrl.config, function (filter) {
                switch (filter.type) {
                    case 'boolean':
                        if ($ctrl.isShowBoolean(filter)) {
                            cnt++;
                        }
                        break;
                    case 'checkbox':
                    case 'button':
                        if ($ctrl.isShowCheckbox(filter)) {
                            cnt++;
                        }
                        break;
                    case 'like':
                        if ($ctrl.isShowLike(filter)) {
                            cnt++;
                        }
                        break;
                    case 'select2':
                        if ($ctrl.isShowSelect2(filter)) {
                            cnt++;
                        }
                        break;
                }
            });
            return cnt > 0;
        };

        //##################################################
        // BOOLEAN
        //##################################################
        /**
         * Сравнение значения фильтра с конкретным значением
         * @param name
         * @param value
         * @returns {boolean}
         */
        $ctrl.isCurrentValueBoolean = function (name, value) {
            return _.get($ctrl.params, name) == value;
        };
        $ctrl.isShowBoolean = function (filter) {
            return 'boolean' == filter.type && ($ctrl.params[filter.name] != undefined);
        };

        //##################################################
        // CHECKBOX
        //##################################################

        /**
         * Сравнение значения фильтра с конкретным значением
         * @param name
         * @param value
         * @returns {boolean}
         */
        $ctrl.isCurrentValueCheckbox = function (name, id) {
            return true == _.get($ctrl.params, name + '.' + id);
        };
        $ctrl.isShowCheckbox = function (filter) {
            if ('checkbox' != filter.type && 'button' != filter.type) {
                return false;
            }
            if ($ctrl.params[filter.name] == undefined) {
                return false;
            }
            return _.filter($ctrl.params[filter.name], function (v) {
                    return v;
                }).length > 0;
        };

        //##################################################
        // LIKE
        //##################################################
        /**
         * Проверка состояния LIKE
         * @param filter
         * @returns {boolean}
         */
        $ctrl.isShowLike = function (filter) {
            return ('like' == filter.type ) && ($ctrl.params[filter.name] != undefined) && $ctrl.params[filter.name].length > 0;
        };

        //##################################################
        // SELECT2
        //##################################################
        $ctrl.isShowSelect2 = function (filter) {
            if ('select2' != filter.type) {
                return false;
            }
            return (undefined != $ctrl.params[filter.name]) && $ctrl.params[filter.name].length;
        };
        $ctrl.isCurrentValueSelect2 = function (name, id) {
            return _.filter($ctrl.params[name], {id: id}).length > 0;
        };
    }

})();
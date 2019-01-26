(function () {

    angular
        .module('larakit')
        .component('adminlteListItemCurrent', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-list-item-current/component.html?' + Math.random(),
            bindings: {
                model: '=',
                current: '=',
                currentMode: '=?'
            },
            controller: Controller
        });

    Controller.$inject = ['LkEvent', '$timeout'];

    function Controller(LkEvent, $timeout) {
        var $ctrl = this;
        $ctrl.is_current = false;
        $ctrl.$postLink = function () {
            $ctrl.checkCurrent();
        };
        $ctrl.checkCurrent = function () {
            var ret = 0;
            if ('belongsTo' == $ctrl.currentMode) {
                //********************
                //  RELATION: belongsTo
                //********************
                if ($ctrl.model.id == $ctrl.current.id) {
                    ret++;
                }
            } else {
                //********************
                //  RELATION: hasMany
                //********************
                _.each($ctrl.current, function (item) {
                    if (item.id == $ctrl.model.id) {
                        ret++;
                    }
                });
            }
            return $ctrl.is_current = (ret > 0);
        };
        LkEvent.subscribe('change-current-item', $ctrl, function () {
            $ctrl.checkCurrent();
        });

        $ctrl.toggleCurrent = function () {
            if ('belongsTo' == $ctrl.currentMode) {
                //********************
                //  RELATION: belongsTo
                //********************
                $ctrl.current = $ctrl.model;
            } else {
                //********************
                //  RELATION: hasMany
                //********************
                var idx = _.findIndex($ctrl.current, function (o) {
                    return o.id == $ctrl.model.id;
                });
                //если такой не найден
                if (-1 == idx) {
                    $ctrl.current.push($ctrl.model);
                } else {
                    $ctrl.current.splice(idx,1);
                }
            }
            $timeout(function () {
                LkEvent.fire('change-current-item');
            }, 100);
        };
    }

})();
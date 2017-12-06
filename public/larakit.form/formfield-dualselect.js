angular
    .module('larakit.form')
    .component('formfieldDualselect', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-dualselect.html?' + Math.random(),
        transclude: true,

        bindings: {
            error: '=?',
            perPage: '=?',
            desc: '=?',
            options: '=',
            model: '='
        },

        controller: function ($timeout) {
            var $ctrl = this;
            $ctrl.ids = [];
            $ctrl.page_yes = 1;
            $ctrl.page_no = 1;

            $ctrl.$postLink = function () {
                if (!$ctrl.perPage) {
                    $ctrl.perPage = 5;
                }
                if (!$ctrl.model) {
                    $ctrl.model = '';
                }
                $ctrl.ids = $ctrl.model.split(',').map(Number);
                $timeout(function () {
                    $ctrl.onChange();
                }, 1000);
            };

            $ctrl.onChange = function () {
                console.log($ctrl.ids);
                $ctrl.unique();
                console.log($ctrl.ids);
                $ctrl.items_yes = [];
                $ctrl.items_no = [];
                var used;
                _.each($ctrl.options, function (option) {
                    used = 0;
                    _.each($ctrl.ids, function (id) {
                        if (parseInt(option.id) == parseInt(id)) {
                            console.log(option.id, id);
                            used++;
                        }
                    });
                    if (used) {
                        $ctrl.items_yes.push(option);
                    } else {
                        $ctrl.items_no.push(option);
                    }

                });
                $ctrl.model = $ctrl.ids.join(',');
            };

            $ctrl.has = function (id) {
                var ret = -1;
                _.each($ctrl.ids, function (val, idx) {
                    if (parseInt(id) === parseInt(val)) {
                        ret = idx;
                    }
                });
                return ret;
            }

            $ctrl.yes = function (id) {
                if (0 == id) {
                    $ctrl.ids = [];
                    _.each($ctrl.options, function (option) {
                        $ctrl.ids.push(option.id);
                    })
                } else {
                    if (-1 == $ctrl.has(id)) {
                        $ctrl.ids.push(id);
                    }
                }
                $ctrl.onChange();
            };

            $ctrl.no = function (id) {
                if (0 == id) {
                    $ctrl.ids = [];
                } else {
                    var idx = $ctrl.has(id);
                    if (idx != -1) {
                        $ctrl.ids.splice(idx, 1);
                    }
                }
                $ctrl.onChange();
            };

            $ctrl.unique = function (ids) {
                var p, i, j;
                for (i = $ctrl.ids.length; i;) {
                    for (p = --i; p > 0;) {
                        if ($ctrl.ids[i] === $ctrl.ids[--p]) {
                            for (j = p; --p && $ctrl.ids[i] === $ctrl.ids[p];) ;
                            i -= $ctrl.ids.splice(p + 1, j - p).length;
                        }
                    }
                }
                $ctrl.ids = _.difference($ctrl.ids, [0]);

                return true;
            }


        }
    });

angular
    .module('larakit.form')
    .component('formfieldDualselectString', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-dualselect-string.html?' + Math.random(),
        transclude: true,

        bindings: {
            error: '=?',
            perPage: '=?',
            desc: '=?',
            options: '=',
            isHideId: '=',
            titleYes: '=?',
            titleNo: '=?',
            fields: '=?',
            model: '='
        },

        controller: function ($timeout, LkEvent, LkArray) {
            var $ctrl = this;
            $ctrl.ids = [];
            $ctrl.page_yes = 1;
            $ctrl.page_no = 1;
            $ctrl.filter_yes = {};
            $ctrl.filter_no = {};

            $ctrl.$postLink = function () {
                if (!$ctrl.perPage) {
                    $ctrl.perPage = 5;
                }
                if (!$ctrl.titleYes) {
                    $ctrl.titleYes = 'Выбранные';
                }
                if (!$ctrl.titleNo) {
                    $ctrl.titleNo = 'Доступные для выбора';
                }
                if (!$ctrl.fields) {
                    $ctrl.fields = [
                        {
                            'field': 'toString',
                            'name': 'Название'
                        }
                    ];
                }
                _.each($ctrl.fields, function (v, k) {
                    $ctrl.filter_yes[v.field] = null;
                    $ctrl.filter_no[v.field] = null;
                });
                if (!$ctrl.model) {
                    $ctrl.model = '';
                }
                $ctrl.ids = $ctrl.model.split(',').map(Number);
                $timeout(function () {
                    $ctrl.onChange();
                }, 1);
                LkEvent.subscribe('formfield-dualselect-ids', $ctrl, function () {
                    $ctrl.onChange();
                })
            };
            $ctrl.get = function (item, key) {
                return _.get(item, key);
            };


            $ctrl.onChange = function () {
                $timeout(function () {
                    //console.log($ctrl.ids);
                    $ctrl.unique();
                    //console.log($ctrl.ids);
                    $ctrl.items_yes = [];
                    $ctrl.items_no = [];
                    var fail;
                    var used;
                    $ctrl.items_yes = _.filter($ctrl.options, function (option) {
                        return LkArray.in_array(option.id, $ctrl.ids);
                    });
                    _.each($ctrl.filter_yes, function (v, k) {
                        $ctrl.items_yes = _.filter($ctrl.items_yes, function (option) {
                            if (!v) {
                                return true;
                            }
                            return (-1 != $ctrl.get(option, k).toString().toUpperCase().indexOf(v.toUpperCase()));
                        });
                    });
                    $ctrl.items_no = _.filter($ctrl.options, function (option) {
                        return !LkArray.in_array(option.id, $ctrl.ids);
                    });
                    _.each($ctrl.filter_no, function (v, k) {
                        $ctrl.items_no = _.filter($ctrl.items_no, function (option) {
                            if (!v) {
                                return true;
                            }
                            return (-1 != $ctrl.get(option, k).toString().toUpperCase().indexOf(v.toUpperCase()));
                        });
                    });
                    $ctrl.model = $ctrl.ids.join(',');
                }, 500);
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
                    // $ctrl.ids = [];
                    _.each($ctrl.items_no, function (option) {
                        $ctrl.ids.push(option.id);
                    });
                } else {
                    if (-1 == $ctrl.has(id)) {
                        $ctrl.ids.push(id);
                    }
                }
                $ctrl.onChange();
            };

            $ctrl.no = function (id) {
                if (0 == id) {
                    _.each($ctrl.items_yes, function (option) {
                        var idx = $ctrl.has(option.id);
                        if (idx != -1) {
                            $ctrl.ids.splice(idx, 1);
                        }
                    });
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

angular
    .module('larakit.form')
    .component('formfieldGeopoint', {
        templateUrl: '/packages/larakit/ng-adminlte/larakit.form/formfield-geopoint.html',
        transclude: true,
        bindings: {
            error: '=?',
            desc: '=?',
            model: '='
        },
        controller: function ($http) {
            var $ctrl = this;
            $ctrl.coords = {};
            $ctrl.geoObject = {};
            var map;
            $ctrl.search = '';
            $ctrl.afterMapInit = function ($map) {
                map = $map;
                console.log(arguments);
                console.log('afterMapInit', map);
                $ctrl.onSetValue();
            };
            $ctrl.onSetValue = function () {
                if (!$ctrl.model) {
                    $ctrl.coords = {};
                    $ctrl.geoObject = {};
                } else {
                    var val = $ctrl.model.split(' ');
                    $ctrl.coords = [
                        parseFloat(val[0]),
                        parseFloat(val[1])
                    ];
                }
                if (0 == Object.keys($ctrl.coords).length) {
                    return null;
                }
                $ctrl.geoObject = {
                    geometry: {
                        coordinates: $ctrl.coords,
                        type: 'Point'
                    }
                };
                console.log('onSetValue', map);
                map.panTo($ctrl.coords, {
                    // Задержка перед началом перемещения.
                    delay: 1500
                });
            };

            $ctrl.click = function (e) {
                var coords = e.get('coords');
                $ctrl.model = coords.join(' ');
                $ctrl.onSetValue();
            }
            $ctrl.find = function () {
                var url = 'https://geocode-maps.yandex.ru/1.x/?format=json&geocode=';
                $http
                    .get(url + $ctrl.search)
                    .then(function (response) {
                        $ctrl.results = response.data.response.GeoObjectCollection.featureMember;
                        if (1 == $ctrl.results.length) {
                            $ctrl.apply(response.data.response.GeoObjectCollection.featureMember[0])
                        }
                    })
            }
            $ctrl.findByKey = function ($event) {
                if (13 == $event.keyCode) {
                    $ctrl.find();
                }
            }
            $ctrl.apply = function (result) {
                $ctrl.model = result.GeoObject.Point.pos;
                $ctrl.onSetValue();
            };

        }
    });
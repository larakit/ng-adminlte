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
        controller: function ($http, $timeout) {
            var $ctrl = this;
            $ctrl.coords = [0, 0];
            $ctrl.cnt_find = 0;
            $ctrl.geoObject = {
                "geometry": {
                    "coordinates": [
                        0, 0
                    ],
                    "type": "Point"
                }
            };


            var map;
            $ctrl.search = '';
            $ctrl.afterMapInit = function ($map) {
                map = $map;
                if (!$ctrl.model) {
                    ymaps.geolocation.get().then(function (res) {
                        $ctrl.model = res.geoObjects.position.join(' ');
                        $ctrl.onSetValue();
                    }, function (e) {
                        console.log(e);
                    });
                }

                $timeout(function () {
                    $ctrl.onSetValue();
                }, 1000);

            };
            $ctrl.onSetValue = function () {
                if (!$ctrl.model) {
                    $ctrl.coords = [0, 0];
                    $ctrl.geoObject = {
                        "geometry": {
                            "coordinates": [
                                0, 0
                            ],
                            "type": "Point"
                        }
                    };
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
                // console.log('onSetValue', $ctrl.coords);
                $ctrl.geoObject = {
                    geometry: {
                        coordinates: $ctrl.coords,
                        type: 'Point'
                    }
                };
                $ctrl.center();
            };
            $ctrl.scale = function (zoom) {
                // console.log(map);
                map.setCenter($ctrl.coords, zoom);
            };
            $ctrl.center = function () {
                if (0 == Object.keys($ctrl.coords).length) {
                    return null;
                }
                map.panTo($ctrl.coords, {
                    // Задержка перед началом перемещения.
                    delay: 1500
                });
            }

            $ctrl.click = function (e) {
                var coords = e.get('coords');
                // console.log('coords', coords);
                $ctrl.model = coords.join(' ');
                $timeout(function () {
                    $ctrl.onSetValue();
                }, 1000);
            }
            $ctrl.find_process = false;
            $ctrl.find = function () {
                var url = 'https://geocode-maps.yandex.ru/1.x/?format=json&geocode=';
                $ctrl.cnt_find++;
                $ctrl.find_process = true;
                $http
                    .get(url + $ctrl.search)
                    .then(function (response) {
                        $ctrl.results = response.data.response.GeoObjectCollection.featureMember;
                        if (1 == $ctrl.results.length) {
                            $ctrl.apply(response.data.response.GeoObjectCollection.featureMember[0])
                        }
                        $ctrl.find_process = false;
                    })
            }
            $ctrl.findByKey = function ($event) {
                if (13 == $event.keyCode) {
                    $ctrl.find();
                }
            }
            $ctrl.apply = function (result) {
                $ctrl.model = result.GeoObject.Point.pos;
                // console.log('$ctrl.model', $ctrl.model);
                $ctrl.onSetValue();
            };

        }
    });
(function () {

    angular
        .module('larakit')
        .component('adminlteThumbStep3', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-thumb-step3/component.html',
            bindings: {
                resolve: '<',
                close: '&',
                dismiss: '&'
            },
            controller: Controller
        });

    Controller.$inject = ['FileUploader', '$scope', 'hotkeys', '$timeout', '$http'];

    function Controller(FileUploader, $scope, hotkeys, $timeout, $http) {
        var $ctrl = this;
        $ctrl.url = '';
        $ctrl.thumb = {};
        $scope.preview = '';
        $ctrl.$onInit = function () {
            $ctrl.size = $ctrl.resolve.size;
            $ctrl.thumber = $ctrl.resolve.thumber;
            $ctrl.w = $ctrl.thumber.sizes[$ctrl.size].w.toString();
            $ctrl.h = $ctrl.thumber.sizes[$ctrl.size].h.toString();
        };
        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
        $ctrl.ok = function () {
            $http.post(
                $ctrl.thumber.sizes[$ctrl.size].url_crop, {
                    data: $scope.preview
                }
            ).then(function (response) {
                larakit_toastr(response.data)
                $ctrl.close();
            });
        };


        $ctrl.api = function (api) {
            function e(){
                $timeout(function(){
                    api.crop();
                    e();
                },1000);
            }
            e();
            $ctrl.buttonRotateLeft = function () {
                api.rotate(-90);
                api.crop();
            };
            $ctrl.buttonRotateRight = function () {
                api.rotate(90);
                api.crop();
            };
            $ctrl.buttonZoomIn = function () {
                api.zoomIn(.1);
                api.crop();
            };
            $ctrl.buttonZoomOut = function () {
                api.zoomOut(.1);
                api.crop();
            };
            $ctrl.buttonFit = function () {
                api.fit();
                api.crop();
            };
            $ctrl.buttonCrop = function () {
                api.crop();
            };
        };
        $ctrl.myCallbackFunction = function (base64) {
            // console.log(typeof (data));
            $scope.preview = base64;
            $timeout(function () {
                $scope.$apply(); // Apply the changes.
            }, 10);

        };

        $ctrl.myButtonLabelsObject = {
            rotateLeft: ' <span class="fa fa-rotate-left"> Против часовой (стрелка вниз)</span> ',
            rotateRight: ' <span class="fa fa-rotate-right"> По часовой (стрелка вверх)</span> ',
            zoomIn: ' <span class="fa fa-search-plus"> Увеличить (стрелка вверх)</span> ',
            zoomOut: ' <span class="fa fa-search-minus"> Уменьшить (стрелка вниз)</span> ',
            fit: ' <span class="fa fa-expand"> В полный размер (Ctrl+пробел)</span> '
        };


    }
})();
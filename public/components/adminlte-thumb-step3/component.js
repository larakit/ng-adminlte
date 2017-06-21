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

    Controller.$inject = ['Cropper', '$http', '$scope', '$timeout'];

    function Controller(Cropper, $http, $scope, $timeout) {
        var data, $ctrl = this;
        $ctrl.thumb = {};
        $ctrl.data = {};
        $ctrl.$onInit = function () {
            $ctrl.size = $ctrl.resolve.size;
            $ctrl.thumber = $ctrl.resolve.thumber;
            $ctrl.w = $ctrl.thumber.sizes[$ctrl.size].w.toString();
            $ctrl.h = $ctrl.thumber.sizes[$ctrl.size].h.toString();
            var base_image = new Image();
            base_image.src = 'img/base.png';
            $scope.dataUrl = $ctrl.thumber.original;
            $timeout(showCropper);  // wait for $digest to set image's src
        };

        $scope.cropper = {};
        $scope.cropperProxy = 'cropper.first';


        $scope.options = {
            maximize: true,
            aspectRatio: NaN,
            crop: function (dataNew) {
                console.log(dataNew);
                $ctrl.data = dataNew;
            }
        };

        $scope.showEvent = 'show';
        $scope.hideEvent = 'hide';

        function showCropper() {
            $scope.$broadcast($scope.showEvent);
        }

        function hideCropper() {
            $scope.$broadcast($scope.hideEvent);
        }
        $scope.preview = function () {
            if (!file || !data) return;
            Cropper.crop(file, data).then(Cropper.encode).then(function (dataUrl) {
                ($scope.preview || ($scope.preview = {})).dataUrl = dataUrl;
            });
        };



        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
        // $ctrl.ok = function () {
        //     Cropper.encode((file = blob)).then(function (dataUrl) {
        //         $scope.dataUrl = dataUrl;
        //         $timeout(showCropper);  // wait for $digest to set image's src
        //     });
        //     return;
        //     $http.post(
        //         $ctrl.thumber.sizes[$ctrl.size].url_crop, {
        //             data: $scope.preview
        //         }
        //     ).then(function (response) {
        //         larakit_toastr(response.data)
        //         $ctrl.close();
        //     });
        // };


        $ctrl.myButtonLabelsObject = {
            rotateLeft: ' <span class="fa fa-rotate-left"> Против часовой (стрелка вниз)</span> ',
            rotateRight: ' <span class="fa fa-rotate-right"> По часовой (стрелка вверх)</span> ',
            zoomIn: ' <span class="fa fa-search-plus"> Увеличить (стрелка вверх)</span> ',
            zoomOut: ' <span class="fa fa-search-minus"> Уменьшить (стрелка вниз)</span> ',
            fit: ' <span class="fa fa-expand"> В полный размер (Ctrl+пробел)</span> '
        };


    }
})();
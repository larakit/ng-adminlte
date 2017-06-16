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

    Controller.$inject = ['FileUploader', '$scope', 'hotkeys', '$timeout'];

    function Controller(FileUploader, $scope, hotkeys, $timeout) {
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
        $ctrl.api = function (api) {
            $ctrl.buttonUp = function () {
                api.zoomIn(.1);
                api.crop();
            };
            hotkeys.add({
                combo: 'ctrl+space',
                description: 'В полный экран',
                callback: function (event, hotkey) {
                    api.fit();
                    api.crop();
                    event.preventDefault();
                }
            });
            hotkeys.add({
                combo: 'up',
                description: 'up',
                callback: function (event, hotkey) {
                    api.zoomIn(.1);
                    api.crop();
                    event.preventDefault();
                }
            });
            hotkeys.add({
                combo: 'down',
                description: 'down',
                callback: function (event, hotkey) {
                    api.zoomOut(.1);
                    api.crop();
                    event.preventDefault();
                }
            });
            hotkeys.add({
                combo: 'left',
                description: 'left',
                callback: function (event, hotkey) {
                    api.rotate(-90);
                    api.crop();
                    event.preventDefault();
                }
            });
            hotkeys.add({
                combo: 'right',
                description: 'right',
                callback: function (event, hotkey) {
                    api.rotate(90);
                    api.crop();
                    event.preventDefault();
                }
            });
        };
        $ctrl.myCallbackFunction = function (base64) {
            // console.log(typeof (data));
            $scope.preview = base64;
            $timeout(function(){
                $scope.$apply(); // Apply the changes.
            },10);

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
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

    Controller.$inject = ['FileUploader'];

    function Controller(FileUploader) {
        var $ctrl = this;
        $ctrl.url = '';
        $ctrl.thumb = {};
        $ctrl.preview = '';
        $ctrl.$onInit = function () {
            $ctrl.size = $ctrl.resolve.size;
            $ctrl.thumber = $ctrl.resolve.thumber;
        };
        $ctrl.cancel = function () {
            $ctrl.dismiss({$value: 'cancel'});
        };
        $ctrl.myCallbackFunction = function(data){
            $this.preview = data;
        };

        $ctrl.myButtonLabelsObject = {
            rotateLeft: ' (rotate left) ',
            rotateRight: ' (rotate right) ',
            zoomIn: ' (zoomIn) ',
            zoomOut: ' (zoomOut) ',
            fit: ' (fit) ',
            crop: ' <span class="fa fa-crop">[crop]</span> ' // You can pass html too.
        };

    }
})();
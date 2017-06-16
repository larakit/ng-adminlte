(function () {

    angular
        .module('larakit')
        .component('thumbStep3', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-thumb-step3/component.html',
            controller: Controller
        });

    Controller.$inject = ['FileUploader'];

    function Controller(FileUploader) {
        var $ctrl = this;
        $ctrl.uploader = new FileUploader({
            url: 'upload.php'
        });

        // FILTERS

        $ctrl.uploader.filters.push({
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        $ctrl.uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        $ctrl.uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        $ctrl.uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        $ctrl.uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        $ctrl.uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        $ctrl.uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        $ctrl.uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        $ctrl.uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        $ctrl.uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        $ctrl.uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        $ctrl.uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);
    }
})();
(function () {

    angular
        .module('ng-larakit')
        .component('adminlteUploader', {
            templateUrl: '/packages/larakit/ng-adminlte/components/adminlte-uploader/component.html',
            controller: Controller,
            bindings: {
                exts: '=?',
                onCompleteAll: '&?',
                onCompleteItem: '&?',
                onCancelItem: '&?',
                onSuccessItem: '&?',
                onProgressAll: '&?',
                onProgressItem: '&?',
                onBeforeUploadItem: '&?',
                onAfterAddingAll: '&?',
                onAfterAddingFile: '&?',
                onWhenAddingFileFailed: '&?',
                url: '=',
                isMultiple: '=?'
            }
        });

    Controller.$inject = ['FileUploader', 'CSRF_TOKEN'];

    function Controller(FileUploader, CSRF_TOKEN) {
        var $ctrl = this;
        var uploader = $ctrl.uploader = new FileUploader({
            url: $ctrl.url,
            withCredentials: true,
            autoUpload: true,
            headers: {
                'X-XSRF-TOKEN': CSRF_TOKEN
            }
        });

        // FILTERS

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item, options) {
                if (!$ctrl.exts) {
                    return true;
                }
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return ($ctrl.exts).indexOf(type) !== -1;
                //return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function (item, filter, options) {
            // console.info('onWhenAddingFileFailed', item, filter, options);
            if (undefined != $ctrl.onWhenAddingFileFailed) {
                $ctrl.onWhenAddingFileFailed()(item, filter, options);
            }
        };
        uploader.onAfterAddingFile = function (fileItem) {
            // console.info('onAfterAddingFile', fileItem);
            if (undefined != $ctrl.onAfterAddingFile) {
                $ctrl.onAfterAddingFile()(fileItem);
            }
        };
        uploader.onAfterAddingAll = function (addedFileItems) {
            // console.info('onAfterAddingAll', addedFileItems);
            if (undefined != $ctrl.onAfterAddingAll) {
                $ctrl.onAfterAddingAll()(addedFileItems);
            }
        };
        uploader.onBeforeUploadItem = function (item) {
            // console.info('onBeforeUploadItem', item);
            if (undefined != $ctrl.onBeforeUploadItem) {
                $ctrl.onBeforeUploadItem()(item);
            }
        };
        uploader.onProgressItem = function (fileItem, progress) {
            // console.info('onProgressItem', fileItem, progress);
            // larakit_toastr(progress);
            if (undefined != $ctrl.onProgressItem) {
                $ctrl.onProgressItem()(fileItem, progress);
            }
        };
        uploader.onProgressAll = function (progress) {
            // console.info('onProgressAll', progress);
            if (undefined != $ctrl.onProgressAll) {
                $ctrl.onProgressAll()(progress);
            }
        };
        uploader.onSuccessItem = function (fileItem, response, status, headers) {
            // console.info('onSuccessItem', fileItem, response, status, headers);
            if (undefined != $ctrl.onSuccessItem) {
                $ctrl.onSuccessItem()(fileItem, response, status, headers);
            }
        };
        uploader.onErrorItem = function (fileItem, response, status, headers) {
            // console.info('onErrorItem', fileItem, response, status, headers);
            if (undefined != $ctrl.onCancelItem) {
                $ctrl.onCancelItem()(fileItem, response, status, headers);
            }
        };
        uploader.onCancelItem = function (fileItem, response, status, headers) {
            // console.info('onCancelItem', fileItem, response, status, headers);
            if (undefined != $ctrl.onCancelItem) {
                $ctrl.onCancelItem()(fileItem, response, status, headers);
            }
        };
        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if (undefined != $ctrl.onCompleteItem) {
                $ctrl.onCompleteItem()(fileItem, response, status, headers);
            }
        };
        uploader.onCompleteAll = function () {
            if (undefined != $ctrl.onCompleteAll) {
                $ctrl.onCompleteAll()();
            }
            // console.info('onCompleteAll');
        };
    }
})();
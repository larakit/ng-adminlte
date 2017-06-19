<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 11:24
 */

//################################################################################
//      получение превьюшек
//################################################################################
Route::any('!/thumb/{model}/{id}', function () {
    $model = \Larakit\NgAdminlte\LkNgThumb::model();
    if($model) {
        return [
            'result' => 'success',
            'model'  => $model->toArray(),
        ];
    }
    
    return [
        'result'  => 'error',
        'message' => 'Изображение не загружено',
    ];
})->name('thumb-data');

//################################################################################
//      загрузка превьюшки
//################################################################################
Route::post('!/thumb/{model}/{id}/{type}/upload', function () {
    $model = \Larakit\NgAdminlte\LkNgThumb::model();
    if($model) {
        $type = Request::route('type');
        if($model->thumbUpload($type)) {
            return [
                'result'  => 'success',
                'message' => 'Изображение успешно загружено',
                'type'    => $type,
                'model'   => $model->toArray(),
            ];
        } else {
            return [
                'result'  => 'error',
                'message' => 'Изображение не загружено',
                'type'    => $type,
                'model'   => $model->toArray(),
            ];
        }
        
    }
})->name('thumb-upload');

//################################################################################
//      загрузка превьюшки
//################################################################################
Route::post('!/thumb/{model}/{id}/{type}/{size}/crop', function () {
    $model       = \Larakit\NgAdminlte\LkNgThumb::model();
    $model_class = \Larakit\NgAdminlte\LkNgThumb::modelClass();
    if($model) {
        $type        = \Request::route('type');
        $size        = \Request::route('size');
        $thumb_class = \Illuminate\Support\Arr::get($model_class::thumbsConfig(), $type);
        if(class_exists($thumb_class)) {
            $thumb = new $thumb_class($model->id);
            if($thumb->processingSize(\Request::input('data'), $size)) {
                return [
                    'result'  => 'success',
                    'message' => 'Изображение успешно загружено',
                    'model'   => $model->toArray(),
                ];
            }
        }
    }
    
    return [
        'result'  => 'error',
        'message' => 'Изображение не загружено',
    ];
})->name('thumb-crop');


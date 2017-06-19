<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:52
 */
Route::get('!/adminlte/footer', function () {
    $year = env('ADMINLTE_FOOTER_FROM', '2014');
    if($year == date('Y')) {
        $years = $year;
    } else {
        $years = $year . ' - ' . date('Y');
    }
    $ret = [
        'years'     => $years,
        'copyright' => env('ADMINLTE_FOOTER_COPYRIGHT', 'Все права защищены'),
        'name'      => env('ADMINLTE_FOOTER_NAME', 'Almsaeed Studio'),
        'url'       => env('ADMINLTE_FOOTER_URL', 'https://adminlte.io/'),
    ];
    
    return $ret;
});


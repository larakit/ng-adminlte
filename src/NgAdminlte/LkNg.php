<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

use Illuminate\Routing\Route;

class LkNg {
    
    /**
     * @param      $url
     * @param bool $is_auth
     *
     * @return Route
     */
    static function proxyRoute($url, $is_auth = true) {
        $middlewares = ['web'];
        if($is_auth) {
            $middlewares[] = 'auth';
        }
        
        return \Route::get($url, function () {
            return view('ng-adminlte::layout');
        })->middleware($middlewares);
    }
    
    protected static $ng_larakit_modules = [];
    
    static function moduleRegister($module) {
        self::$ng_larakit_modules[$module] = $module;
    }
    
    static function modules() {
        return array_merge(['larakit'], array_values(self::$ng_larakit_modules));
    }
}
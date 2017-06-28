<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

use App\Models\Advice;
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
            \Config::set('larakit.lk-staticfiles.js.external.build', false);
            \Config::set('larakit.lk-staticfiles.js.external.min', false);
            define('LKNG_ROUTE', true);
            $page = \Larakit\Page\LkPage::instance()
                ->setBodyContent('<div class="wrapper">
    <ng-view></ng-view>
</div>');
            $page->html()->ngApp(env('LARAKIT_NG_APP', 'ng-larakit'));
            $page->body()
                ->setAttribute('style', 'height: auto; min-height: 100%;')
                ->addClass('skin-black')->setAttribute('ng-class', '{
        \'sidebar-collapse\':leftValue(),
        \'control-sidebar-open\':rightValue(),
}');
    
            return $page;
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
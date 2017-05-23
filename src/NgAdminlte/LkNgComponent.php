<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

class LkNgComponent {
    
    protected static $components = [];
    
    static function components() {
        return array_map(function ($v) {
            return '/' . trim($v, '/') . '/';
        }, self::$components);
    }
    
    /**
     * @param      $name
     * @param null $path
     */
    static function register($name, $path = null) {
        if(!isset(self::$components[$name])) {
            self::$components[$name] = $path ? : self::path($name);
        }
    }
    
    /**
     * @param $name
     *
     * @return string
     */
    static function path($name) {
        if('page-' == mb_substr($name, 0, 5)) {
            return '/!/ng/pages/' . mb_substr($name, 5) . '/';
        }
        
        return '/!/ng/components/' . $name . '/';
    }
    
}
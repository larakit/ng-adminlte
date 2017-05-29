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
    static function register($name, $components_directory = null) {
        if(!isset(self::$components[$name])) {
            if(!$components_directory) {
                $components_directory = '/!/ng/components/';
            }
            self::$components[$name] = trim($components_directory, '/') . '/' . $name . '/';
        }
    }
    
}
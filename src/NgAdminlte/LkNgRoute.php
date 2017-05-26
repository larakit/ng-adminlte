<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

use Illuminate\Support\Arr;

class LkNgRoute {
    
    protected static $routes = [];
    
    protected $url;
    protected $data;
    
    static function adminUrl($suffix = null) {
        return env('ADMINLTE_ADMIN_URL', '/admin') . ($suffix ? '/' . ltrim($suffix, '/') : '');
    }
    
    static function accountUrl($suffix = null) {
        return env('ADMINLTE_ACCOUNT_URL', '/account') . ($suffix ? '/' . ltrim($suffix, '/') : '');
    }
    
    /**
     * @param $url
     *
     * @return LkNgRoute
     */
    static function factory($url, $name = null) {
        if(!isset(self::$routes[$url])) {
            self::$routes[$url] = new LkNgRoute($url, $name);
        }
        
        return self::$routes[$url];
    }
    
    static function routes() {
        return self::$routes;
    }
    
    function __construct($url, $name) {
        $this->url = $url;
        $this->name($name);
        $this->template('<page-' . $name . '></page-' . $name . '>');
    }
    
    function get($k) {
        return Arr::get($this->data, $k);
    }
    
    function set($k, $v) {
        $this->data[$k] = $v;
        
        return $this;
    }
    
    function title($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    function subtitle($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    function template($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    function name($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    function icon($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    function getJson() {
        return json_encode($this->data, JSON_PRETTY_PRINT);
    }
    
}
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
    
    protected static $routes   = [];
    protected static $sidebars = [];
    
    protected $url;
    protected $data;
    
    static function adminUrl($suffix = null) {
        return env('ADMIN_URL', '/admin') . ($suffix ? '/' . ltrim($suffix, '/') : '');
    }
    
    /**
     * @param $url
     *
     * @return LkNgRoute
     */
    static function factory($url, $name) {
        if(!isset(self::$routes[$url])) {
            self::$routes[$url] = new LkNgRoute($url, $name);
        }
        
        return self::$routes[$url];
    }
    
    static function routes() {
        return self::$routes;
    }
    
    static function sidebars() {
        $ret = [];
        foreach(self::$sidebars as $section => $data) {
            foreach($data as $k => $v) {
                $ret[$section][$v][$k] = [
                    'title' => self::factory($k)->get('title'),
                    'icon'  => self::factory($k)->get('icon'),
                ];
            }
            if(isset($ret[$section][null])) {
                $tmp = $ret[$section][null];
                unset($ret[$section][null]);
            }
            ksort($ret[$section]);
            $ret[$section] = [null => $tmp] + $ret[$section];
        }
        
        return $ret;
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
    
    function sidebar($section, $group = null) {
        self::$sidebars[$section][$this->url] = $group;
        
        return $this;
    }
    
    function getJson() {
        return json_encode($this->data, JSON_PRETTY_PRINT);
    }
    
}
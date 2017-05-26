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

class LkNgSidebar {
    
    protected static $sidebars = [];
    protected        $items    = [];
    
    /**
     * @param $section
     *
     * @return LkNgSidebar
     */
    static function section($section, $folder = null) {
        if(!isset(self::$sidebars[$section][$folder])) {
            self::$sidebars[$section][$folder] = new LkNgSidebar();
        }
        
        return self::$sidebars[$section][$folder];
    }
    
    function item($access_name, $text, $icon = null, $url = null) {
        $access_name = str_replace('/', '.', $access_name);
        $path        = str_replace('.', '._items.', $access_name);
        Arr::set($this->items, $path . '.item.text', $text);
        Arr::set($this->items, $path . '.item.url', $url);
        Arr::set($this->items, $path . '.item.icon', $icon);
        //        Arr::set($this->items,$path . '.access_name',$access_name);
        $parents = explode(
            '.',
            $access_name
        );
        while(array_pop($parents) != null) {
            if(count($parents)) {
                $this->autoCreateParent(
                    implode(
                        '.',
                        $parents
                    ),
                    $url
                );
            }
        }
        
        return $this;
    }
    
    /**
     * @param        $access_name
     * @param        $cnt
     * @param string $class
     *
     * @return $this
     */
    function addLabel($access_name, $cnt, $class = 'success') {
        $access_name = str_replace('/', '.', $access_name);
        $path        = str_replace('.', '._items.', $access_name) . '.item.labels';
        $labels      = (array) Arr::get($this->items, $path);
        $labels[]    = compact('cnt', 'class');
        Arr::set($this->items, $path, $labels);
        
        return $this;
    }
    
    /**
     * $access_name = 'admin.plugins.module.config_module';
     * $path = 'admin._items.plugins._items.module._items.config';
     * $default_title = 'Config Module';
     *
     * @param type $access_name
     */
    function autoCreateParent($access_name, $url) {
        $path          = str_replace('.', '._items.', $access_name);
        $arr           = explode('.', $access_name);
        $tmp           = array_pop($arr);
        $default_title = ucwords(str_replace('_', ' ', $tmp));
        if(!Arr::get($this->items, $path . '.item')) {
            Arr::set($this->items, $path . '.item.text', $default_title);
            Arr::set($this->items, $path . '.item.url', null);
            Arr::set($this->items, $path . '.item.icon', null);
        }
        if(!Arr::get($this->items, $path . '.item.urls')) {
            Arr::set($this->items, $path . '.item.urls', []);
        }
        $urls   = Arr::get($this->items, $path . '.item.urls');
        $urls[] = $url;
        Arr::set($this->items, $path . '.item.urls', $urls);
        //        if (!Arr::get($this->items,$path . '.access_name')) {
        //            Arr::set($this->items,$path . '.access_name',$access_name);
        //        }
    }
    
    function getItems() {
        return $this->items;
    }
    
    static function sidebars() {
        $ret = [];
        foreach(self::$sidebars as $section => $data) {
            foreach($data as $folder => $sidebar) {
                $ret[$section][$folder] = $sidebar->getItems();
            }
            if(isset($ret[$section][null])){
                $tmp = $ret[$section][null];
                unset($ret[$section][null]);
                $ret[$section] =[null => $tmp] + $ret[$section];
            }
        }
        
        return $ret;
    }
    
}
<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

class LkNgSidebar {
    
    protected static $sidebars = [];
    protected        $items    = [];
    
    /**
     * @param $section
     *
     * @return LkNgSidebar
     */
    static function section($section) {
        if(!isset(self::$sidebars[$section])) {
            self::$sidebars[$section] = new LkNgSidebar();
        }
        
        return self::$sidebars[$section];
    }
    
    /**
     * @param $url
     *
     * @return LkNgSidebarItem
     */
    function item($url) {
        if(!isset($this->items[$url])) {
            $this->items[$url] = new LkNgSidebarItem($url);
        }
        
        return $this->items[$url];
    }
    
    static function sidebars() {
        $ret = [];
        foreach(self::$sidebars as $section => $sidebar) {
            $ret[$section] = $sidebar->toArray();
        }
        
        return $ret;
    }
    
    function toArray() {
        $items = [];
        foreach($this->items as $url => $item) {
            $items[$item->getGroup()][$url] = $item->toArray();
        }
        if(isset($items[null])) {
            $tmp = $items[null];
            unset($items[null]);
            $items = [null => $tmp] + $items;
        }
        return $items;
    }
    
}
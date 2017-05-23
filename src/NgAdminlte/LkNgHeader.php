<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

use Illuminate\Support\Str;

class LkNgHeader {
    
    protected $name;
    protected $data;
    
    /**
     * @param mixed $content
     *
     * @return $this
     */
    protected function set($k, $v) {
        $k              = mb_substr($k, 3);
        $k              = Str::snake($k);
        $this->data[$k] = $v;
        
        return $this;
    }
    
    public function setContent($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    public function setLabelClass($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    public function setLabelCnt($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    public function setIcon($v) {
        return $this->set(__FUNCTION__, $v);
    }
    
    protected static $items = [];
    
    function get() {
        return $this->data;
    }
    
    static function items() {
        $ret = [];
        foreach(self::$items as $k=>$item) {
            $ret[$k] = $item->get();
        }
        
        return $ret;
    }
    
    /**
     * @param $name
     *
     * @return LkNgHeader
     */
    static function register($name) {
        if(!isset(self::$items[$name])) {
            self::$items[$name] = new LkNgHeader($name);
        }
        return self::$items[$name];
    }
    
    function __construct($name) {
        $this->name = $name;
    }
    
}
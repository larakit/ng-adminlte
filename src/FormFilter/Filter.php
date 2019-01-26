<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

class Filter {
    
    protected $db_field;
    protected $form_field;
    protected $label;
    protected $desc;
    protected $units;
    protected $relation;
    protected $condition_js;
    protected $condition_php;
    protected $options     = [];
    protected $is_vertical = false;
    protected $type        = null;
    
    function __construct($form_field) {
        $this->form_field = $this->db_field = $form_field;
    }
    
    function isVertical($v = true) {
        $this->is_vertical = (bool) $v;
        
        return $this;
    }
    
    function optionsNumeric($range, $suffix = null) {
        $this->options = [];
        foreach($range as $i) {
            $this->options[] = [
                'id'       => $i,
                'toString' => $i . ($suffix ? ' ' . $suffix : ''),
            ];
        }
        
        return $this;
    }
    
    function element() {
        $ret = [
            'label'       => $this->label,
            'condition'   => $this->condition_js,
            'name'        => $this->form_field,
            'options'     => $this->options,
            'type'        => $this->getType(),
            'is_vertical' => $this->is_vertical,
        ];
        
        return $ret;
    }
    
    function getType() {
        return $this->type;
    }
    
    function setValue($value) {
        $this->value = $value;
        
        return $this;
    }
    
    /**
     * @param      $form_field
     * @param      $label
     * @param null $db_field
     *
     * @return $this
     */
    static function factory($form_field) {
        $class = get_called_class();
        
        return new $class($form_field);
    }
    
    function dbField($val) {
        $this->db_field = $val;
        
        return $this;
    }
    
    function conditionJs($val) {
        $this->condition_js = $val;
        
        return $this;
    }
    
    function conditionPhp($val = null) {
        if(!$val) {
            return $this->condition_php;
        }
        $this->condition_php = $val;
        
        return $this;
    }
    
    function options($val) {
        $this->options = $val;
        
        return $this;
    }
    
    function units($val) {
        $this->units = $val;
        
        return $this;
    }
    
    function label($val) {
        $this->label = $val;
        
        return $this;
    }
    
    function hasValue() {
        return $this->value;
    }
    
    function desc($val) {
        $this->desc = $val;
        
        return $this;
    }
    
    function relation($val) {
        $this->relation = $val;
        
        return $this;
    }
    
    function query($model) {
    }
}
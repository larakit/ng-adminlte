<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

use Illuminate\Support\Arr;

class FilterIn extends Filter {
    
    protected $is_vertical = false;
    protected $type        = null;
    
    function element() {
        $ret = [
            'label'       => $this->label,
            'name'        => $this->form_field,
            'options'     => $this->options,
            'type'        => $this->getType(),
            'is_vertical' => $this->is_vertical,
        ];
        
        return $ret;
    }
    
    function setTypeSelect2() {
        $this->type = 'select2';
        
        return $this;
    }
    
    function setTypeCheckbox() {
        $this->type = 'checkbox';
        
        return $this;
    }
    
    function setTypeButton() {
        $this->type = 'button';
        
        return $this;
    }
    
    function getType() {
        if(!$this->type) {
            return count($this->options) > 5 ? 'select2' : 'checkbox';
        }
        
        return $this->type;
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
    
    function getValues() {
        $value = (array) \Request::input($this->form_field);
        $ret   = [];
        if('select2' == $this->getType()) {
            foreach($value as $v) {
                $ret[] = Arr::get($v, 'id');
            }
        } else {
            foreach($value as $k => $v) {
                if($v) {
                    $ret[] = $k;
                }
            }
        }
        $ret = array_map('intval', $ret);
        
        return $ret;
    }
    
    function query($model) {
        $values = $this->getValues();
        if(count($values)) {
            if($this->relation) {
                $model->whereHas($this->relation, function ($query) use ($values) {
                    $query->whereIn($this->db_field, $values);
                });
            } else {
                $model->whereIn($this->db_field, $values);
            }
        }
    }
}
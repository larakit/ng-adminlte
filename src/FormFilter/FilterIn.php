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
    
    function getValues() {
        $value = (array) \Request::input('filters.' . $this->form_field);
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
                $table = $model->getModel()->getTable();
                $model->whereIn($table . '.' . $this->db_field, $values);
            }
        }
    }
}
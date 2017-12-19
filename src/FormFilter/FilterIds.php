<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

class FilterIds extends Filter {
    
    protected $type = 'like';
    
    function query($model) {
        $value = \Request::input('filters.'.$this->form_field);
        $value = explode(',', $value);
        $value = array_map('intval', $value);
        $ids = [];
        foreach($value as $v){
            if($v){
                $ids[] = $v;
            }
        }
        
        if(count($ids)) {
            if($this->relation) {
                $model->whereHas($this->relation, function ($query) use ($ids) {
                    $query->whereIn($this->db_field, $ids);
                });
            } else {
                $table = $model->getModel()->getTable();
                $model->where(function ($query) use ($ids, $table) {
                    $query->whereIn($table.'.'.$this->db_field, $ids);
                });
            }
        }
    }
}
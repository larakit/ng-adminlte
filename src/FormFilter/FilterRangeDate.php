<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

use Carbon\Carbon;
use Illuminate\Support\Arr;

class FilterRangeDate extends Filter {
    
    protected $type = 'range_date';
    
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
    
    function query($model) {
        $value = \Request::input('filters.' . $this->form_field);
        $min   = Arr::get($value, 'from');
        $max   = Arr::get($value, 'to');
        
        if($min) {
            $min = Carbon::parse($min)->format('Y-m-d 00:00:00');
        }
        if($max) {
            $max = Carbon::parse($max)->format('Y-m-d 23:59:59');
        }
        
        if($min || $max) {
            if($this->relation) {
                $model->whereHas($this->relation, function ($query) use ($min, $max) {
                    if($min) {
                        $query->where($this->db_field, '>=', $min);
                    }
                    if($max) {
                        $query->where($this->db_field, '<=', $max);
                    }
                });
            } else {
                if($min) {
                    $model->where($this->db_field, '>=', $min);
                }
                if($max) {
                    $model->where($this->db_field, '<=', $max);
                }
            }
        }
    }
}
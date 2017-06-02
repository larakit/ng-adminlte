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

class FilterRangeNumeric extends Filter {
    
    protected $from = 0;
    protected $to   = 100;
    protected $step = 1;
    
    function element() {
        $ret = [
            'label'   => $this->label,
            'name'    => $this->form_field,
            'type'    => 'slider',
            'options' => [
                'floor'     => $this->from,
                'ceil'      => $this->to,
                'step'      => $this->step,
                'showTicks' => true,
            ],
        ];
        
        return $ret;
    }
    
    function setFrom($from) {
        $this->from = $from;
        
        return $this;
    }
    
    function setStep($step) {
        $this->step = $step;
        
        return $this;
    }
    
    function setTo($to) {
        $this->to = $to;
        
        return $this;
    }
    
    function query($model) {
        if(\Request::has($this->form_field)){
            $value = \Request::input($this->form_field);
            $min = Arr::get($value, 'from');
            $max = Arr::get($value, 'to');
            if('' != $min || '' != $max) {
                if($this->relation) {
                    $model->whereHas($this->relation, function ($query) use ($min, $max) {
                        if('' != $min) {
                            $query->where($this->db_field, '>=', $min);
                        }
                        if('' != $max) {
                            $query->where($this->db_field, '<=', $max);
                        }
                    });
                } else {
                    if('' != $min) {
                        $model->where($this->db_field, '>=', $min);
                    }
                    if('' != $max) {
                        $model->where($this->db_field, '<=', $max);
                    }
                }
            }
        }
    }
}
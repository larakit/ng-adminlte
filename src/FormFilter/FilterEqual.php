<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

class FilterEqual extends Filter {
    
    function element() {
        return [
            'label' => $this->label,
            'type'  => 'like',
            'name'  => $this->form_field,
        ];
    }
    
    function query($model) {
        $value = \Request::input($this->form_field);
        if($value) {
            if($this->relation) {
                $model->whereHas($this->relation, function ($query) use ($value) {
                    $db_field = (array) $this->db_field;
                    $query->where(function ($query) use ($value, $db_field) {
                        foreach($db_field as $_db_field) {
                            $query->orWhere($_db_field, '=', $value);
                        }
                    });
                });
            } else {
                $model->where(function ($query) use ($value) {
                    $db_field = (array) $this->db_field;
                    $query->where(function ($query) use ($value, $db_field) {
                        foreach($db_field as $_db_field) {
                            $query->orWhere($_db_field, 'like', $value);
                        }
                    });
                });
            }
        }
    }
}
<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

class FilterBoolean extends Filter {
    
    protected $no  = 'Нет';
    protected $yes = 'Да';
    protected $all = 'Все';
    
    /**
     * @param string $no
     *
     * @return FilterBoolean;
     */
    public function setNo($no) {
        $this->no = $no;
        
        return $this;
    }
    
    /**
     * @param string $yes
     *
     * @return FilterBoolean;
     */
    public function setYes($yes) {
        $this->yes = $yes;
        
        return $this;
    }
    
    /**
     * @param string $all
     *
     * @return FilterBoolean;
     */
    public function setAll($all) {
        $this->all = $all;
        
        return $this;
    }
    
    function element() {
        return [
            'label' => $this->label,
            'type'  => 'boolean',
            'name'  => $this->form_field,
            'all'   => $this->all,
            'off'   => $this->no,
            'on'     => $this->yes,
        ];
    }
    
    function query($model) {
        if(\Request::has($this->form_field)) {
            $value = (int) \Request::input($this->form_field);
            if($this->relation) {
                $model->whereHas($this->relation, function ($query) use ($value) {
                    $query->where($this->db_field, '=', (1 == $value));
                });
            } else {
                $model->where($this->db_field, '=', (1 == $value));
            }
        }
    }
}
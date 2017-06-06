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
    
    protected $no   = 'Нет';
    protected $yes  = 'Да';
    protected $all  = 'Все';
    protected $type = 'boolean';
    
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
        $element        = parent::element();
        $element['all'] = $this->all;
        $element['off'] = $this->no;
        $element['on']  = $this->yes;
        return $element;
    }
    
    function query($model) {
        if(\Request::has('filters.'.$this->form_field)) {
            $value = (int) \Request::input('filters.'.$this->form_field);
            if($this->relation) {
                $model->whereHas($this->relation, function ($query) use ($value) {
                    $query->where($this->db_field, '=', (1 == $value));
                });
            } else {
                $table = $model->getModel()->getTable();
                $model->where($table.'.'.$this->db_field, '=', (1 == $value));
            }
        }
    }
}
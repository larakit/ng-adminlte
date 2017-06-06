<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

use Illuminate\Support\Str;

class Sorter {
    
    protected $db_field;
    protected $form_field;
    protected $label;
    protected $relation;
    
    function __construct($form_field) {
        $this->form_field = $this->db_field = $form_field;
    }
    
    function element() {
        return [
            'label' => $this->label,
            'name'  => $this->form_field,
        ];
    }
    
    function getName() {
        return $this->form_field;
    }
    
    /**
     * @param      $form_field
     * @param      $label
     * @param null $db_field
     *
     * @return $this
     */
    static function factory($form_field) {
        return new Sorter($form_field);
    }
    
    function dbField($val) {
        $this->db_field = $val;
        
        return $this;
    }
    
    function label($val) {
        $this->label = $val;
        
        return $this;
    }
    
    function hasValue() {
        return $this->value;
    }
    
    function relation($val) {
        $this->relation = $val;
        
        return $this;
    }
    
    function query($model) {
        if(\Request::input('order_field') == $this->form_field) {
            //            $o = new City();
            //            $o->region()->getParent()
            if($this->relation) {
                $model->select($model->getModel()->getTable().'.*');
                //region.country
                $relation_names = explode('.', $this->relation);
                $key            = ['sorter'];
                $prev_table = $model->getModel()->getTable();
                foreach($relation_names as $relation_name) {
                    $key[] = $relation_name;
                    if(!isset($m)) {
                        $m = $model->getModel();
                    }
                    $relation = $m->getModel()->{$relation_name}();
                    $model->join(
                        \DB::raw($relation->getRelated()->getTable() . ' as ' . implode('__', $key)),
                        $prev_table.'.'.$relation->getForeignKey(),
                        '=',
                        implode('__', $key).'.'.$relation->getOwnerKey()
                    );
                    $prev_table = implode('__', $key);
                    $m        = $relation->getRelated();
                }
                $model->orderBy(implode('__', $key).'.'.$this->db_field, (bool) \Request::input('order_desc') ? 'desc' : 'asc');
            } else {
                $model->orderBy($this->db_field, (bool) \Request::input('order_desc') ? 'desc' : 'asc');
            }
        }
    }
    
}
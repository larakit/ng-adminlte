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
                $model = $model->getModel();
                $this->joinRelation($this->relation, $model, $model);
                //TODO: тут надо сделать JOIN
                
                //                $table_related = $relation->getRelated()->getTable();
                //                dd($relation->getRelated(), $relation->getRelated()->joiningTable('country'));
                //                $model->join($table_related, $relation->getForeignKey(), '=', $table_related . '.' . $relation->getOwnerKey());
                //                $model->orderBy($table_related . '.' . $this->db_field, (bool) \Request::input('order_desc') ? 'desc' : 'asc');
                //                dd($model->{$this->relation}());
                //                $model->whereHas($this->relation, function ($query) use ($values) {
                //                    $query->whereIn($this->db_field, $values);
                //                });
            } else {
                $model->orderBy($this->db_field, (bool) \Request::input('order_desc') ? 'desc' : 'asc');
            }
        }
    }
    
    function joinRelation($relation_name, $model, $_model, $prefix = null) {
        $relation_names = explode('.', $relation_name);
        //        dump($relation_names);
        $rel_first     = array_shift($relation_names);
        $relation      = $_model->getModel()->{$rel_first}();
        $table_related = $relation->getRelated()->getTable();
        dump($table_related);
        dump($model);
        dump($_model);
        dump(\DB::raw($table_related . ' as ' . Str::snake(($prefix ? $prefix . '_' : '') . $rel_first)),
            $relation->getForeignKey(),
            '=',
            $table_related . '.' . $relation->getOwnerKey());
        //        dd($relation, $table_related);
        $model->join(\DB::raw($table_related . ' as ' . Str::snake(($prefix ? $prefix . '_' : '') . $rel_first)),
            $relation->getForeignKey(),
            '=',
            $table_related . '.' . $relation->getOwnerKey()
        );
        if(0 < count($relation_names)) {
            $this->joinRelation(implode('.', $relation_names), $model, $relation->getModel(), ($prefix ? $prefix . '_' : '').$rel_first);
        }
    }
}
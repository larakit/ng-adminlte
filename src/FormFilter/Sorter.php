<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 19:42
 */

namespace Larakit\FormFilter;

use Illuminate\Database\Eloquent\Model;

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
    
    function getName(){
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
            if($this->relation) {
                //TODO: тут надо сделать JOIN
                //                $model->whereHas($this->relation, function ($query) use ($values) {
                //                    $query->whereIn($this->db_field, $values);
                //                });
            }
            else {
                $model->orderBy($this->db_field, (bool)\Request::input('order_desc') ? 'desc' : 'asc');
            }
        }
    }
}
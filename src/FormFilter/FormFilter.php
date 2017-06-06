<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 20.07.16
 * Time: 14:41
 */

namespace Larakit\FormFilter;

abstract class FormFilter {
    
    protected $filters        = [];
    protected $sorters        = [];
    protected $sorter_default = null;
    protected $model;
    protected $per_page       = 10;
    protected $title          = 'Фильтры списка';
    
    function __construct() {
        $model_class = static::classModel();
        $this->model = $model_class::select();
    }
    
    static function ngOptions($models) {
        $ret = [];
        foreach($models as $model) {
            $ret[] = [
                'id'           => $model->id,
                'filter_label' => (string) $model,
            ];
        }
        
        return $ret;
    }
    
    static function classModel() {
        $class = static::class;
        
        $r         = new \ReflectionClass($class);
        $namespace = $r->getNamespaceName();
        $class     = str_replace($namespace . '\\', '', $class);
        $class     = mb_substr($class, 0, -10);
        
        return str_replace('FormFilters', 'Models', $namespace) . '\\' . $class;
    }
    
    static function config() {
        $ret = [];
        /** @var FormFilter $formfilter */
        $formfilter = new static();
        $formfilter->init();
        //        $formfilter->model->sorted();
        foreach($formfilter->filters as $filter) {
            /* @var $filter Filter */
            $ret['filters'][] = $filter->element();
        }
        foreach($formfilter->sorters as $sorter) {
            /* @var $filter Filter */
            $ret['sorters'][] = $sorter->element();
        }
        $ret['sorter_default'] = $formfilter->sorter_default;
        
        return $ret;
    }
    
    static function load() {
        \DB::enableQueryLog();
        $ret = [];
        /** @var FormFilter $formfilter */
        $formfilter = new static();
        $formfilter->init();
        foreach($formfilter->filters as $filter) {
            /* @var $filter Filter */
            $condition = $filter->conditionPhp();
            if(!$condition || ($condition && call_user_func($condition))) {
                $filter->query($formfilter->model);
            }
        }
        foreach($formfilter->sorters as $sorter) {
            $sorter->query($formfilter->model);
        }
        $ret['models'] = $formfilter->model->paginate($formfilter->per_page)
            ->appends($_GET);
        $ret['sql']    = \DB::getQueryLog();
        
        return $ret;
    }
    
    abstract function init();
    
    protected function addFilter($filter) {
        $this->filters[] = $filter;
        
        return $this;
    }
    
    protected function addSorter($sorter, $is_default = false) {
        $this->sorters[] = $sorter;
        if($is_default) {
            $this->sorter_default = $sorter->getName();
        }
        
        return $this;
    }
    
}
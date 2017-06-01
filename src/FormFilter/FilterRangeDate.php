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

    function element(\HTML_QuickForm2_Container $form) {
        $gr   = $form->putGroupTwbs($this->form_field)
                     ->setLabel($this->label)->addClass('filter-daterange-block');
        $from = $gr->putDateTwbs('from')->setAppendClear()->setWrapClass('col-lg-6')->setPrepend('с');
        $to   = $gr->putDateTwbs('to')->setAppendClear()->setWrapClass('col-lg-6')->setPrepend('по');

        $gr
            ->setAttribute('data-from', $from->getId())
            ->setAttribute('data-to', $to->getId())
            ->setDesc('
<div class="col-lg-12">
    <span class="js-filter-daterange" data-from="' . Carbon::now()->format('d.m.Y') . '" data-to="' . Carbon::now()->format('d.m.Y') . '">Сегодня</span>
    <span class="js-filter-daterange" data-from="' . Carbon::now()->subDay()->format('d.m.Y') . '" data-to="' . Carbon::now()->subDay()->format('d.m.Y') . '">Вчера</span>
    <span class="js-filter-daterange" data-from="' . Carbon::now()->subDays(7)->format('d.m.Y') . '" data-to="' . Carbon::now()->format('d.m.Y') . '">Неделя</span>
    <span class="js-filter-daterange" data-from="' . Carbon::now()->subDays(14)->format('d.m.Y') . '" data-to="' . Carbon::now()->format('d.m.Y') . '">2 недели</span>
    <span class="js-filter-daterange" data-from="' . Carbon::now()->subDays(30)->format('d.m.Y') . '" data-to="' . Carbon::now()->format('d.m.Y') . '">Месяц</span>
</div>            
            
            ');
    }

    function query($model) {
        $min = Arr::get($this->value, 'from');
        $max = Arr::get($this->value, 'to');

        try {
            $min = Carbon::parse($min)->format('Y-m-d 00:00:00');
        }
        catch(\Exception $e) {
            $min = '';
        }
        try {
            $max = Carbon::parse($max)->format('Y-m-d 23:59:59');
        }
        catch(\Exception $e) {
            $max = '';
        }

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
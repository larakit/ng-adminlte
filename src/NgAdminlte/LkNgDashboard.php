<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

class LkNgDashboard {
    
    protected static $infoboxes = [];
    
    static function infobox($cnt, $text, $class = 'bg-green', $icon = 'fa fa-lock', $link_text = null, $link_href = null) {
        self::$infoboxes[$text]            = [
            'cnt'   => $cnt,
            'text'  => $text,
            'class' => $class,
            'icon'  => $icon,
            'link'  => [
                'href'  => $link_href ,
                'text' => $link_text,
            ],
        ];
    }
    
    static function all() {
        return [
            'infoboxes' => self::$infoboxes
        ];
    }
}
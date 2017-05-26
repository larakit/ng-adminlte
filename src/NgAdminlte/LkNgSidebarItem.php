<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 22.05.17
 * Time: 13:27
 */

namespace Larakit\NgAdminlte;

class LkNgSidebarItem {
    
    protected $text;
    protected $group;
    protected $icon;
    protected $labels = [];
    
    function __construct($text) {
        $this->text = $text;
    }
    
    /**
     * @param        $text
     * @param string $class
     *
     * @return $this
     */
    function addLabel($text, $class = 'success') {
        $class = trim($class);
        $this->labels[] = compact('text', 'class');
        
        return $this;
    }
    
    /**
     * @param $text
     *
     * @return $this
     */
    function setText($text) {
        $this->text = $text;
        
        return $this;
    }
    
    function setIcon($icon) {
        $this->icon = $icon;
        
        return $this;
    }
    
    /**
     * @param $group
     *
     * @return $this
     */
    function getGroup() {
        return $this->group;
    }
    
    function setGroup($group) {
        $this->group = $group;
        
        return $this;
    }
    
    /**
     * @return array
     */
    function toArray() {
        return [
            'text'   => $this->text,
            'icon'   => $this->icon,
            'labels' => $this->labels,
        ];
    }
}
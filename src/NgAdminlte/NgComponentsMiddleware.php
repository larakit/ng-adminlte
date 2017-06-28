<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 12.05.17
 * Time: 9:20
 */

namespace Larakit\NgAdminlte;

class NgComponentsMiddleware {
    
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure                 $next
     *
     * @return mixed
     */
    public function handle($request, \Closure $next) {
        $dir = base_path('bootstrap/ng');
        if(is_dir($dir)) {
            $routes = rglob('*.php', 0, $dir);
            foreach($routes as $route) {
                include_once $route;
            }
            
        }
        $package = \Larakit\StaticFiles\Manager::package('larakit');
        $package->js('/!/ng-larakit-js');
        foreach(LkNgComponent::components() as $path) {
            //            dump($path);
            $file = public_path($path . 'component.js');
            if(file_exists($file)) {
                $package->js($path . 'component.js');
            }
            $file = public_path($path . 'component.css');
            if(file_exists($file)) {
                $package->css($path . 'component.css');
            }
        }
        //        dump(__FILE__);
        $package->js('/!/adminlte/routes');
        
        return $next($request);
    }
}
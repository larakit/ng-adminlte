<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 19.06.17
 * Time: 10:55
 */

//$url = \Larakit\LkNgRoute::adminUrl('colors');
//\Larakit\LkNgRoute::proxy($url);

if(!env('ADMINLTE_NO_ROUTE')) {
    
    $adminlte_callback = function (\Larakit\Page\LkPage $page) {
        $page = \Larakit\Page\LkPage::instance()
            ->setBodyContent('<div class="wrapper" style="height: auto; min-height: 100%;">
    <ng-view></ng-view>
    
    
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>
    <script type="text/javascript">
        (function() {
            var socket = io(\'ws://localhost:6684\', {transports: [\'websocket\']});

            socket.on(\'connect\', function() {
                
                socket.emit(\'subscribe\', \'test2\');
                socket.emit(\'subscribe\', \'admin\');
            
            //    console.log(socket.id); // \'G5p5...\'
            });

            socket.on(\'notifier:message\', function(msg) {
                var result = JSON.parse(msg);
            larakit_toastr(result);
                console.log(result);
            });
        })();
    </script>
</div>');
        $page->body()
            ->setAttribute('style', 'height: auto; min-height: 100%;')
            ->addClass('skin-black')->setAttribute('ng-class', '{
        \'sidebar-collapse\':leftValue(),
        \'control-sidebar-open\':rightValue(),
        \'sidebar-open\':!leftValue(),
        \'control-sidebar-open\':rightValue(),
}');
        
    };
    \Larakit\LkNgRoute::proxy(\Larakit\LkNgRoute::accountUrl() . '{path?}', true, $adminlte_callback)
        ->name('account')
        ->middleware('ng-larakit')
        ->where('path', '.*');
    \Larakit\LkNgRoute::proxy(\Larakit\LkNgRoute::adminUrl() . '{path?}', true, $adminlte_callback)
        ->name('admin')
        ->middleware('admin')
        ->middleware('ng-larakit')
        ->where('path', '.*');
}
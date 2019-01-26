<?php
/**
 * Created by Larakit.
 * Link: http://github.com/larakit
 * User: Alexey Berdnikov
 * Date: 23.06.17
 * Time: 10:52
 */

namespace Larakit\NgAdminlte\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class LkNgGenerator extends Command {
    
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'larakit:ng {name : Название модели} {section=admin : Секция (admin,account)} {--thumb? : Нужны превьюшки}';
    
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Генерация модуля ng-larakit';
    
    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct() {
        parent::__construct();
    }
    
    protected $name_studly;
    protected $table;
    
    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle() {
        dd($this->arguments(), $this->options());
        $this->name_studly = Str::studly($this->argument('name'));
        $this->table       = Str::plural(Str::snake(class_basename($this->argument('name'))));
        //создали миграцию
        $this->makeMigration();
        //создали модель
        $this->makeModel();
    }
    
    function makeModel() {
        $file = base_path('app/Models/' . $this->name_studly.'.php');
        if(!file_exists($file)){
            
        }
    }
    
    function makeMigration() {
        if(!class_exists('Create' . Str::studly($table) . 'Table')) {
            \Artisan::call('make:migration', [
                'name'     => "create_{$table}_table",
                '--create' => $table,
            ]);
        }
    }
}

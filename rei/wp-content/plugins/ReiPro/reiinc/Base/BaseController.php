<?php

namespace REIInc\Base;

class BaseController{
    public $plugin_path;
    
    public $plugin_url;

    public $plugin;

    public $managers;

    public function __construct(){
        $this->plugin_path = plugin_dir_path( dirname( __FILE__, 2) );
        $this->plugin_url = plugin_dir_url( dirname( __FILE__, 2) );
        $this->plugin = plugin_basename( dirname( __FILE__, 3)) . '/ReiPro.php';

        $this->managers = array(
            'company_details' => 'Enter Company Details'        
        );
    }

    public function activated( string $key ){
        $option = get_option('reipro_plugin');
        return (isset($option[$key])) ? $option[$key] : false ;
    }
}
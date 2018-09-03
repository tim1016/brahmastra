<?php

namespace Inc\Base;

class BaseController{
    public $plugin_path;
    
    public $plugin_url;

    public $plugin;

    public $managers;

    public function __construct(){
        $this->plugin_path = plugin_dir_path( dirname( __FILE__, 2) );
        $this->plugin_url = plugin_dir_url( dirname( __FILE__, 2) );
        $this->plugin = plugin_basename( dirname( __FILE__, 3)) . '/reitest.php';
        $this->managers = array(
            'cpt_manager' => 'Activate custom post types',
            'taxonomy_manager' => 'Activate custom taxonomies',
            'media_widget' => 'Activate media widgets',
            'gallery_manager' => 'Activate custom galleries',
            'testimonial_manager' => 'Activate testimonials',
            'templates_manager'=> 'Activate custom templates', 
            'login_manager' => 'Activate AJAX login system',
            'membership_manager' => 'Activate memberships',
            'chat_manager' => 'Activate chat manager',
            'company_details' => 'Enter Company Details'        
        );
    }

    public function activated( string $key ){
        $option = get_option('alecaddd_plugin');
        return (isset($option[$key])) ? $option[$key] : false ;
    }
}
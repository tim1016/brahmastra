<?php 

namespace REIInc\Base;

use REIInc\Base\BaseController;

class Enqueue extends BaseController{

    public function register(){
        add_action('admin_enqueue_scripts', array($this, 'enqueueAdmin'));
        add_action('wp_enqueue_scripts', array($this, 'enqueueFrontEnd'));
    }


    public  function enqueueAdmin(){
        wp_enqueue_script( 'media-upload' );
        wp_enqueue_media(  );
        wp_enqueue_style('adminStyle', $this->plugin_url . 'assets/stylesAdmin.css');
        wp_enqueue_script('mypluginscript', $this->plugin_url . 'assets/myscript.js');
    }


    public  function enqueueFrontEnd(){
        wp_enqueue_style('frontEndStyle', $this->plugin_url . 'assets/stylesFrontEnd.css');
        wp_enqueue_style('pluginBootstrap', $this->plugin_url . 'assets/bootstrap.min.css');
    }
}
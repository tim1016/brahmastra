<?php

namespace REIInc\Base;

class ReiPluginHooks{
    
    public static function activate(){
        flush_rewrite_rules();

        $default = array();

        if (!get_option('rei_plugin')){

            update_option( 'rei_plugin', $default );         
        }     
    }

    public static function deactivate(){
        flush_rewrite_rules();
    }
}
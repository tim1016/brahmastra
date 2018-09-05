<?php

namespace REIInc\Base;

class SettingsLinks extends BaseController
{
    
    public function register(){
        add_filter( "plugin_action_links_". $this->plugin,  array($this, 'settings_link'));
    }

    public function settings_link($links){
    //add custom settings
        $settings_link = '<a href="admin.php?page=reipro_plugin">Settings</a>';
        array_push($links, $settings_link);
        return $links;
    }

}

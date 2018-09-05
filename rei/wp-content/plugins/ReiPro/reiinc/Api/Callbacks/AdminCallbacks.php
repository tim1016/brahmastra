<?php

namespace REIInc\Api\Callbacks;
use REIInc\Base\BaseController;

class AdminCallbacks extends BaseController{

    public function adminDashboard(){
        return require_once( "$this->plugin_path/templates/admin.php" ); 
    }
    
    public function adminCompany(){
        return require_once( "$this->plugin_path/templates/company.php" ); 
    }

    public function widgetsManager(){
        return require_once( "$this->plugin_path/templates/widgets.php" ); 
    }

    public function checkboxSanitize($input){
        return $input; 
    }

    public function alecadddAdminSection(){
        echo 'Check this out'; 
    }

    public function alecadddTextExample(){
        $value = esc_attr( get_option( 'text_example' ) );
        echo '<input type="text" class="regular-text" name="text_example" placeholder="Write Something" value = "'. $value .'">'; 
    }

    public function alecadddFirstName(){
        $value = esc_attr( get_option( 'first_name' ) );
        echo '<input type="text" class="regular-text" name="first_name" placeholder="Your First Name" value = "'. $value .'">'; 
    }
}


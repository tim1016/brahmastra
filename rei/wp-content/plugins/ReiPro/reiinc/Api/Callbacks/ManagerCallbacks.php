<?php

namespace REIInc\Api\Callbacks;
use REIInc\Base\BaseController;

class ManagerCallbacks extends BaseController{
    public function checkboxSanitize($input)
    {
        $output = array();
        foreach ($this->managers as $key => $val){
            $output[$key] = (isset($input[$key])) ? true : false;
        }
        return $output;
    }

    public function adminSectionManager(){
        echo 'Manage the section and features of this plugin';
    }

	public function checkboxField( $args )
	{
		$name = $args['label_for'];
		$classes = $args['class'];
		$option_name = $args['option_name'];
		$checkbox = get_option( $option_name );
		$checked = isset($checkbox[$name]) ? ($checkbox[$name] ? true : false) : false;
		echo '<div class="' . $classes . '"><input type="checkbox" id="' . $name . '" name="' . $option_name . '[' . $name . '] " value="1" class="" ' . ( $checked ? 'checked' : '') . '><label for="' . $name . '"><div></div></label></div>';
	}
}

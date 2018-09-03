<?php

namespace Inc\Api\Callbacks;


class CptCallbacks{

    public function cptSection(){
        echo 'Manage your custom post types';
    }
    public function cptSectionManager(){
        echo 'Manage your custom post types';
    }

    public function cptSanitize( $input ){

        if( isset($_POST["remove"]) )
        {
            $option = get_option('alecaddd_plugin_cpt');
            unset($option[$_POST["remove"]]);
            return $option;
        }
        


        $output = get_option('alecaddd_plugin_cpt');
        
        if(count($output)==0){
            $output[$input['post_type'] ]=$input;
            return $output;
        } 

        foreach($output as $key => $value)
        {
            var_dump($key);
            if($input['post_type'] === $key){
                $output[$key] = $input;
            }else{
                $output[$input['post_type'] ]=$input;
            }
        }
        return $output;

    }

    public function textField( $args )
    {
        $name = $args['label_for'];
        $class = $args['class'];
        $placeholder = $args['placeholder'];
        $option_name = $args['option_name'];
        $disabled = '';

        $value='';
        // $value = $input[$name];
        if(isset($_POST['edit_post'])){
            $input = get_option( $option_name );
            $value = $input[$_POST['edit_post']][$name];
            if($name === 'post_type') $disabled = 'disabled';
        }       
        echo '<input type="text" class="regular-text '. $class .'" name="'. $option_name. '[' . $name . ']' . '" value="'. $value .'" id="'. $name .'" placeholder=" '. $placeholder .' required "' .$disabled. '>';
        

    }

	public function checkboxField( $args )
	{
		$name = $args['label_for'];
		$classes = $args['class'];
        $option_name = $args['option_name'];
        $checked='';
        
        if(isset($_POST['edit_post'])){
            $checkbox = get_option( $option_name );
            $checked = isset($checkbox[$_POST['edit_post']][$name]) ? 'checked' : false;

        }  
		echo '<div class="' . $classes . '"><input type="checkbox" id="' . $name . '" name="' . $option_name . '[' . $name . ']" value="1" class=" "' .  $checked    .  '><label for="' . $name . '"><div></div></label></div>';
	}
}

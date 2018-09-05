<?php 
/**
 * @package  AlecadddPlugin
 */
namespace REIInc\Api\Callbacks;

class CompanyCallbacks
{
	public function SectionManager() {
		echo 'Create as many Custom Taxonomies as you want.';
	}

	public function Sanitize( $input )
	{
		// $output = get_option('alecaddd_company');
		return $input;
	}


	public function textField( $args )
	{
		$name = $args['label_for'];
		$classes = $args['class'];
		$option_name = $args['option_name'];
		$checkbox = get_option( $option_name );
		$value = isset($checkbox[$name]) ? $checkbox[$name]  : '';
		$description = $args['description'];
		echo '<div class="' . $classes . '"><input type="text" id="' . $name . '" name="' . $option_name . '[' . $name . '] " value="' .$value. '" class="" ' . ' ' . '><label for="' . $name . '"><div></div></label> <p class="description">'. $description .' </p></div>';
	}

}
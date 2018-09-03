<?php
/**
 * Plugin Name
 *
 * @package     reitest List Builder
 * @author      Inkant Awasthi
 * @copyright   2018 Resonance Realty Management Inc.   
 * @license     GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name: reitest list builder
 * Plugin URI:  https://reisavvy.com
 * Description: Builds lists for address book
 * Version:     1.0.0
 * Author:      Inkant Awasthi
 * Author URI:  https://reisavvy.com
 * Text Domain: reitest-list-builder
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

 defined ( 'ABSPATH' ) or die('You are not allowed to access externally !');

 if(file_exists( dirname(__FILE__) . '/vendor/autoload.php')){
    require_once dirname(__FILE__).  '/vendor/autoload.php';
 }

// define('PLUGIN_PATH', plugin_dir_path( __FILE__ ));
// define('PLUGIN_URL', plugin_dir_url( __FILE__ ));
// define('PLUGIN', plugin_basename( __FILE__ ));


if ( class_exists( 'Inc\\Init' ) ){
    Inc\Init::register_services();
}



register_activation_hook( __FILE__, 'ActivateAlecadddPlugin');
register_deactivation_hook( __FILE__, 'DeactivateAlecadddPlugin');
function ActivateAlecadddPlugin(){
    Inc\Base\Activate::activate();
}
function DeactivateAlecadddPlugin(){
    Inc\Base\Deactivate::deactivate();
}
<?php
/**
 * Plugin Name
 *
 * @package     REIPro
 * @author      Inkant Awasthi
 * @copyright   2016 Inkant Awasthi, Resonance Realty Management
 * @license     GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name: REIPro
 * Plugin URI:  https://github.com/tim1016/reipro.git
 * Description: Description of the plugin.
 * Version:     1.0.0
 * Author:      Inkant Awasthi
 * Author URI:  https://example.com
 * Text Domain: REIPro
 * License:     GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.txt
 */

defined ( 'ABSPATH' ) or die('You are not allowed to access the plugin externally !');

if(file_exists( dirname(__FILE__) . '/vendor/autoload.php'))
{
    require_once dirname(__FILE__).  '/vendor/autoload.php';
}

if(file_exists( dirname(__FILE__) . '/vendor/webdevstudios/cmb2/init.php'))
{
    require_once dirname(__FILE__).  '/vendor/webdevstudios/cmb2/init.php';
}

define('PLUGIN_PATH', plugin_dir_path( __FILE__ ));
define('PLUGIN_URL', plugin_dir_url( __FILE__ ));
define('PLUGIN', plugin_basename( __FILE__ ));
define('PREFIX', 'reipro_');



if ( class_exists( 'REIInc\\Init' ) ){
    REIInc\Init::register_services();
}



register_activation_hook( __FILE__, 'ActivateReiPlugin');
register_deactivation_hook( __FILE__, 'DeactivateReiPlugin');
function ActivateReiPlugin(){
    REIInc\Base\ReiPluginHooks::activate();
}
function DeactivateReiPlugin(){
    REIInc\Base\ReiPluginHooks::deactivate();
}

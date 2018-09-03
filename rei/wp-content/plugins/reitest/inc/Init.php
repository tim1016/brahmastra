<?php 
/**
 * Plugin Name
 *
 * @package     reitest List Builder
 * @author      Inkant Awasthi
 * @copyright   2018 Resonance Realty Management Inc.   
 * @license     GPL-2.0+
 *
 */
namespace Inc;


final class Init{


/**
 *  Store all the classes inside an array 
 * @return array full list of classes
 */

     public static function get_services(){
// [] is the same as array(). It was started in PHP7
        return [
            Pages\Dashboard::class,
            Base\Enqueue::class,
            Base\SettingsLinks::class,
            Base\CustomPostTypeController::class,
            Base\CustomTaxonomyController::class,
            Base\WidgetController::class,
            Base\TestimonialController::class,
            Base\CompanyController::class
        ];
    }

/** Loop through all the classes, initialize them and call the register method
 * @return 
 */

    public static function register_services(){
        foreach (self::get_services() as $class){
            $service = self::instantiate( $class );

            if(  method_exists($service, 'register' ) ){
                $service->register();
            }
        }

    }

/**
 * @param class $class class from the services array
 */

    private static function instantiate ($class){
        $service = new $class();
        return $service;
    }
}


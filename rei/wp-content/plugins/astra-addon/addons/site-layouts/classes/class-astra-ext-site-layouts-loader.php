<?php
/**
 * Site Layouts - Customizer.
 *
 * @package Astra Addon
 * @since 1.0.0
 */

if ( ! class_exists( 'Astra_Ext_Site_Layouts_Loader' ) ) {

	/**
	 * Customizer Initialization
	 *
	 * @since 1.0.0
	 */
	class Astra_Ext_Site_Layouts_Loader {

		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance;

		/**
		 *  Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		/**
		 *  Constructor
		 */
		public function __construct() {

			add_filter( 'astra_theme_defaults', array( $this, 'theme_defaults' ) );
			add_action( 'customize_register', array( $this, 'customize_register_old' ) );
			add_action( 'customize_register', array( $this, 'customize_register' ), 2 );
			add_action( 'customize_preview_init', array( $this, 'preview_scripts' ) );
			add_action( 'customize_controls_enqueue_scripts', array( $this, 'controls_scripts' ), 9 );

		}

		/**
		 * Set Options Default Values
		 *
		 * @param  array $defaults  Astra options default value array.
		 * @return array
		 */
		function theme_defaults( $defaults ) {

				$defaults['site-layout-padded-width'] = 1200;
				$defaults['site-layout-padded-pad']   = array(
					'desktop'      => array(
						'top'    => 25,
						'right'  => 50,
						'bottom' => 25,
						'left'   => 50,
					),
					'tablet'       => array(
						'top'    => '',
						'right'  => '',
						'bottom' => '',
						'left'   => '',
					),
					'mobile'       => array(
						'top'    => '',
						'right'  => '',
						'bottom' => '',
						'left'   => '',
					),
					'desktop-unit' => 'px',
					'tablet-unit'  => 'px',
					'mobile-unit'  => 'px',
				);

				$defaults['site-layout-fluid-lr-padding'] = 25;
				$defaults['site-layout-box-width']        = 1200;
				$defaults['site-layout-box-tb-margin']    = 0;
				$defaults['site-layout-box-bg-img']       = '';
				$defaults['site-layout-outside-bg-obj']   = array(
					'background-color'      => '',
					'background-image'      => '',
					'background-repeat'     => 'repeat',
					'background-position'   => 'center center',
					'background-size'       => 'auto',
					'background-attachment' => 'scroll',
				);

			return $defaults;
		}

		/**
		 * Add postMessage support for site title and description for the Theme Customizer.
		 *
		 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
		 */
		function customize_register( $wp_customize ) {

			if ( class_exists( 'Astra_Customizer_Config_Base' ) ) {

				/**
				 * Sections
				 */
				require_once ASTRA_EXT_SITE_LAYOUTS_DIR . 'classes/sections/class-astra-site-layout-configuration.php';
			}
		}

		/**
		 * Add postMessage support for site title and description for the Theme Customizer.
		 *
		 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
		 */
		function customize_register_old( $wp_customize ) {

			if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {

				/**
				 * Sections
				 */
				require_once ASTRA_EXT_SITE_LAYOUTS_DIR . 'classes/sections/section-site-layout.php';
			}
		}

		/**
		 * Customizer Controls
		 *
		 * @see 'astra-customizer-controls-js' panel in parent theme
		 */
		function controls_scripts() {

			if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {

				if ( SCRIPT_DEBUG ) {
					wp_enqueue_script( 'astra-ext-site-layouts-customizer-toggles', ASTRA_EXT_SITE_LAYOUTS_URL . 'assets/js/unminified/customizer-toggles.js', array( 'astra-customizer-controls-toggle-js' ), ASTRA_EXT_VER, true );
				} else {
					wp_enqueue_script( 'astra-ext-site-layouts-customizer-toggles', ASTRA_EXT_SITE_LAYOUTS_URL . 'assets/js/minified/customizer-toggles.min.js', array( 'astra-customizer-controls-toggle-js' ), ASTRA_EXT_VER, true );
				}
			}

		}

		/**
		 * Customizer Preview
		 */
		function preview_scripts() {

			if ( SCRIPT_DEBUG ) {
				wp_enqueue_script( 'astra-ext-site-layouts-customize-preview-js', ASTRA_EXT_SITE_LAYOUTS_URL . 'assets/js/unminified/customizer-preview.js', array( 'customize-preview', 'astra-customizer-preview-js' ), ASTRA_EXT_VER, true );
			} else {
				wp_enqueue_script( 'astra-ext-site-layouts-customize-preview-js', ASTRA_EXT_SITE_LAYOUTS_URL . 'assets/js/minified/customizer-preview.min.js', array( 'customize-preview', 'astra-customizer-preview-js' ), ASTRA_EXT_VER, true );
			}
		}

	}
}

/**
 *  Kicking this off by calling 'get_instance()' method
 */
Astra_Ext_Site_Layouts_Loader::get_instance();

<?php
/**
 * Above Header
 *
 * @package     Astra Addon
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2018, Brainstorm Force
 * @link        http://www.brainstormforce.com
 * @since       1.4.8
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Customizer Sanitizes
 *
 * @since 1.4.8
 */
if ( ! class_exists( 'Astra_Customizer_Adv_Search_Above_Header' ) ) {

	/**
	 * Register General Customizer Configurations.
	 */
	class Astra_Customizer_Adv_Search_Above_Header extends Astra_Customizer_Config_Base {

		/**
		 * Register General Customizer Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 1.4.8
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			$_configs = array(

				// Option: Above Header Section 1 Search Style.
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[above-header-section-1-search-box-type]',
					'default'  => astra_get_option( 'above-header-section-1-search-box-type' ),
					'section'  => 'section-above-header',
					'priority' => 45,
					'title'    => __( 'Search Style', 'astra-addon' ),
					'type'     => 'control',
					'control'  => 'select',
					'choices'  => array(
						'slide-search' => __( 'Slide Search', 'astra-addon' ),
						'full-screen'  => __( 'Full Screen Search', 'astra-addon' ),
						'header-cover' => __( 'Header Cover Search', 'astra-addon' ),
						'search-box'   => __( 'Search Box', 'astra-addon' ),
					),
					'required' => array(
						array( ASTRA_THEME_SETTINGS . '[above-header-layout]', '!=', 'disabled' ),
						array( ASTRA_THEME_SETTINGS . '[above-header-section-1]', '==', 'search' ),
					),
				),

				// Option: Above Header Section 2 Search Style.
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[above-header-section-2-search-box-type]',
					'default'  => astra_get_option( 'above-header-section-2-search-box-type' ),
					'section'  => 'section-above-header',
					'priority' => 70,
					'title'    => __( 'Search Style', 'astra-addon' ),
					'type'     => 'control',
					'control'  => 'select',
					'choices'  => array(
						'slide-search' => __( 'Slide Search', 'astra-addon' ),
						'full-screen'  => __( 'Full Screen Search', 'astra-addon' ),
						'header-cover' => __( 'Header Cover Search', 'astra-addon' ),
						'search-box'   => __( 'Search Box', 'astra-addon' ),
					),
					'required' => array(
						array( ASTRA_THEME_SETTINGS . '[above-header-layout]', '!=', 'disabled' ),
						array( ASTRA_THEME_SETTINGS . '[above-header-section-2]', '==', 'search' ),
					),
				),
			);

			return array_merge( $configurations, $_configs );
		}
	}
}

/**
 * Kicking this off by calling 'get_instance()' method
 */
new Astra_Customizer_Adv_Search_Above_Header;

<?php
/**
 * Typography - Panels & Sections
 *
 * @package Astra Addon
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Typo_Panel_Section_Configs' ) ) {

	/**
	 * Register below header Configurations.
	 */
	class Astra_Typo_Panel_Section_Configs extends Astra_Customizer_Config_Base {

		/**
		 * Register Typography Customizer Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 1.4.3
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			$_configs = array(

				array(
					'name'     => 'section-primary-menu-typo',
					'type'     => 'section',
					'title'    => __( 'Primary Menu', 'astra-addon' ),
					'panel'    => 'panel-typography',
					'section'  => 'section-header-typo-group',
					'priority' => 25,
				),

				array(
					'name'     => 'section-button-typo',
					'type'     => 'section',
					'title'    => __( 'Button', 'astra-addon' ),
					'panel'    => 'panel-typography',
					'priority' => 36,
				),

				array(
					'name'     => 'section-footer-typo',
					'type'     => 'section',
					'title'    => __( 'Footer', 'astra-addon' ),
					'panel'    => 'panel-typography',
					'priority' => 60,
				),

				array(
					'name'     => 'section-sidebar-typo',
					'type'     => 'section',
					'title'    => __( 'Sidebar', 'astra-addon' ),
					'panel'    => 'panel-typography',
					'priority' => 50,
				),
			);

			return array_merge( $configurations, $_configs );
		}
	}
}

new Astra_Typo_Panel_Section_Configs;

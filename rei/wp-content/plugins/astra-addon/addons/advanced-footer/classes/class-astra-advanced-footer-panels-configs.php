<?php
/**
 * Advanced Footer - Panels & Sections
 *
 * @package Astra Addon
 */

if ( ! class_exists( 'Astra_Advanced_Footer_Panels_Configs' ) ) {

	/**
	 * Register Advanced Footer Layout Customizer Configurations.
	 */
	class Astra_Advanced_Footer_Panels_Configs extends Astra_Customizer_Config_Base {

		/**
		 * Register Advanced Footer Layout Customizer Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 1.4.3
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			$_config = array(

				array(
					'name'     => 'section-footer-adv',
					'type'     => 'section',
					'title'    => __( 'Footer Widgets', 'astra-addon' ),
					'panel'    => 'panel-layout',
					'section'  => 'section-footer-group',
					'priority' => 5,
				),

				array(
					'name'     => 'section-footer-adv-color-bg',
					'type'     => 'section',
					'title'    => __( 'Footer Widgets', 'astra-addon' ),
					'panel'    => 'panel-colors-background',
					'priority' => 55,
				),

				array(
					'name'     => 'section-footer-adv-typo',
					'type'     => 'section',
					'title'    => __( 'Footer Widgets', 'astra-addon' ),
					'panel'    => 'panel-typography',
					'priority' => 55,
				),
			);

			return array_merge( $configurations, $_config );
		}

	}
}

new Astra_Advanced_Footer_Panels_Configs;

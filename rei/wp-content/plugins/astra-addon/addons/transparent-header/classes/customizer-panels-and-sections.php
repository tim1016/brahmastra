<?php
/**
 * Transparent Header - Panels & Sections
 *
 * @package Astra Addon
 */

$wp_customize->add_section(
	new Astra_WP_Customize_Section(
		$wp_customize, 'section-transparent-header',
		array(
			'title'    => __( 'Transparent Header', 'astra-addon' ),
			'panel'    => 'panel-layout',
			'section'  => 'section-header-group',
			'priority' => 33,
		)
	)
);


$wp_customize->add_section(
	new Astra_WP_Customize_Section(
		$wp_customize, 'section-colors-transparent-header',
		array(
			'title'    => __( 'Transparent Header', 'astra-addon' ),
			'panel'    => 'panel-colors-background',
			'section'  => 'section-colors-header-group',
			'priority' => 32,
		)
	)
);

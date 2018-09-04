/**
 * Showing and Hiding controls of Customizer.
 *
 * @package Astra Addon
 * @since 1.0.0
 */

( function( $ ) {
	
	ASTControlTrigger.addHook( 'astra-toggle-control', function( argument, api ) {

		ASTCustomizerToggles ['astra-settings[site-layout]'] = [
			{
				controls: [
					'astra-settings[site-content-width]'
				],
				callback: function( site_layout ) {
					if ( 'ast-full-width-layout' == site_layout ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'astra-settings[site-layout-fluid-lr-padding]'
				],
				callback: function( site_layout ) {
					if ( 'ast-fluid-width-layout' == site_layout ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'astra-settings[site-layout-box-width]',
					'astra-settings[site-layout-box-tb-margin]',
					'astra-settings[ast-box-layout-bg-color]',
				],
				callback: function( site_layout ) {
					if ( 'ast-box-layout' == site_layout ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'astra-settings[site-layout-padded-pad]',
					'astra-settings[site-layout-padded-width]',
				],
				callback: function( site_layout ) {

					if ( 'ast-padded-layout' == site_layout ) {
						return true;
					}
					return false;
				}
			},
			{
				controls: [
					'astra-settings[header-main-layout-width]',
					'astra-settings[footer-layout-width]'
				],
				callback: function( site_layout ) {
					if ( 'ast-full-width-layout' == site_layout || 'ast-padded-layout' == site_layout ) {
						return true;
					}
					return false;
				}
			},
		];

	});

})( jQuery );

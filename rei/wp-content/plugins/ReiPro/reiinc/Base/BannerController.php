<?php

namespace REIInc\Base;
use REIInc\Base\BaseController;

class BannerController extends BaseController{

    public $banner_metabox;
    
    public function register()
    {   
        add_action( 'cmb2_admin_init', array( $this, 'createBannerMetabox' ));
        add_action( 'astra_primary_content_top', array($this, 'displayPageBanner'));
    }
    


    public function createBannerMetabox(  ) {
    
        $this->banner_metabox = new_cmb2_box( array(
            'id' => PREFIX . 'metabox',
            'title' => __( 'Page Banner', 'cmb2' ),
            'object_types' => array( 'post', 'page')
        ));
        
    
    
        $this->banner_metabox->add_field( array(
            'name'    => 'Banner Image',
            'desc'    => 'Upload image or enter an URL. This image will be displayed as the banner for this page.',
            'id'      => PREFIX . 'pageBanner',
            'type'    => 'file',
            // Optional:
            'options' => array(
                'url' => false, // Hide the text input for the url
            ),
            'text'    => array(
                'add_upload_file_text' => 'Add File' // Change upload button text. Default: "Add or Upload File"
            ),
            // query_args are passed to wp.media's library query.
            'query_args' => array(
                //'type' => 'application/pdf', // Make library only display PDFs.
                // Or only allow gif, jpg, or png images
                 'type' => array(
                    'image/gif',
                    'image/jpeg',
                    'image/png',
                ),
            ),
            'preview_size' => 'large', // Image size to use when previewing in the admin.
        ) );
    
    
        $this->banner_metabox->add_field( array(
            'name'    => __('Subtitle for the page', 'cmb2'),
            'desc'    => 'This text will be display after the page title',
            'id'      => PREFIX . 'banner_subtitle',
            'type'    => 'Text'
            )
        );

    }

    public function displayPageBanner(){

        $title = get_the_title(get_the_ID());
        $subtitle = get_post_meta( get_the_ID(), 'reipro_banner_subtitle', true );
        $imgSrcBanner = get_post_meta( get_the_ID(), 'reipro_pageBanner', true );
        if(empty($imgSrcBanner)){
            $imgSrcBanner = PLUGIN_URL . 'reiinc/img/posts_banner.jpg';
        }
		echo "<h1> Banner Title:" . $title . "</h1>"; 
		echo "<h1> Banner Subtitle:" . $subtitle . "</h1>"; ?>
        <div>
            <img src="<?php echo $imgSrcBanner?>" alt=""> 
        </div>
        <?php
    }
}
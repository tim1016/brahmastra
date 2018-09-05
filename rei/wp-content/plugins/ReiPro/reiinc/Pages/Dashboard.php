<?php 

namespace REIInc\Pages;
use \REIInc\Base\BaseController;
use \REIInc\Api\SettingsApi;
use \REIInc\Api\Callbacks\AdminCallbacks;
use \REIInc\Api\Callbacks\ManagerCallbacks;


class Dashboard extends BaseController{

    public $settings;
    public $pages = array();
    public $subpages = array();
    public $callbacks;
    public $callbacks_mngr;


    public function register(){
        $this->settings = new SettingsApi();
        $this->callbacks = new AdminCallbacks();
        $this->callbacks_mngr = new ManagerCallbacks();
        $this->setPages();

        $this->setSettings();
        $this->setSections();
        $this->setFields();
        $this->settings->addPages($this->pages)->withSubPage( 'Dashboard' )->register();
    }


    public function setPages(){

        $this->pages = [
            [
                'page_title' => 'ReiPro Plugin',
                'menu_title' => 'ReiPro',
                'capability' => 'manage_options',
                'menu_slug'=> 'reipro_plugin',
                'callback' => array($this->callbacks, 'adminDashboard'),
                'icon_url' => 'dashicons-welcome-widgets-menus',
                'position' => 112
            ]
        ];
    }

    // public function setSubpages(){
    //     $this->subpages = [
    //         [
    //             'parent_slug' => 'reipro_plugin',
    //             'page_title' => 'Custom Taxonomies',
    //             'menu_title' => 'Taxonomies',
    //             'capability' => 'manage_options',
    //             'menu_slug'=>  'reipro_taxonomies',
    //             'callback' => array($this->callbacks, 'taxonomyManager'),
    //         ],
    //         [
    //             'parent_slug' => 'reipro_plugin',
    //             'page_title' => 'Custom Widgets',
    //             'menu_title' => 'Widgets',
    //             'capability' => 'manage_options',
    //             'menu_slug'=>  'reipro_widgets',
    //             'callback' => array($this->callbacks, 'widgetsManager'),
    //         ],
    //     ];

    // }

    public function setSettings(){
        $args = array(
            array(
                'option_group' => 'reipro_plugin_settings',
                'option_name' => 'reipro_plugin',
                'callback' => array($this->callbacks_mngr, 'checkboxSanitize')
            )
        );
        $this->settings->setSettings( $args );
    }

    public function setSections(){
        $args = array(
            array(
                'id' => 'reipro_admin_index',
                'title' => 'Settings Manager',
                'callback' => array($this->callbacks_mngr, 'adminSectionManager'),
                'page' => 'reipro_plugin'
            )
        );
        $this->settings->setSections( $args );

    }
    public function setFields()
    {
        // $args = array();
        // foreach ($this->managers as $key => $val){
        //     $args[] = array(
        //         'id' => $key,
        //         'title' => $val,
        //         'callback' => array($this->callbacks_mngr, 'checkboxField'),
        //         'page' => 'reipro_plugin',
        //         'section' => 'reipro_admin_index',
        //         'args' => array(
        //             'option_name' => 'reipro_plugin',
        //             'label_for' => $key,
        //             'class' => 'ui-toggle'
        //         )
        //         );
        // }
        // $this->settings->setFields( $args );
    }
}
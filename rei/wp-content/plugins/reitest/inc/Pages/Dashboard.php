<?php 

namespace Inc\Pages;
use \Inc\Base\BaseController;
use \Inc\Api\SettingsApi;
use \Inc\Api\Callbacks\AdminCallbacks;
use \Inc\Api\Callbacks\ManagerCallbacks;


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
                'page_title' => 'Alecaddd Plugin',
                'menu_title' => 'Alecaddd',
                'capability' => 'manage_options',
                'menu_slug'=> 'alecaddd_plugin',
                'callback' => array($this->callbacks, 'adminDashboard'),
                'icon_url' => 'dashicons-store',
                'position' => 110
            ]
        ];
    }

    // public function setSubpages(){
    //     $this->subpages = [
    //         [
    //             'parent_slug' => 'alecaddd_plugin',
    //             'page_title' => 'Custom Taxonomies',
    //             'menu_title' => 'Taxonomies',
    //             'capability' => 'manage_options',
    //             'menu_slug'=>  'alecaddd_taxonomies',
    //             'callback' => array($this->callbacks, 'taxonomyManager'),
    //         ],
    //         [
    //             'parent_slug' => 'alecaddd_plugin',
    //             'page_title' => 'Custom Widgets',
    //             'menu_title' => 'Widgets',
    //             'capability' => 'manage_options',
    //             'menu_slug'=>  'alecaddd_widgets',
    //             'callback' => array($this->callbacks, 'widgetsManager'),
    //         ],
    //     ];

    // }

    public function setSettings(){
        $args = array(
            array(
                'option_group' => 'alecaddd_plugin_settings',
                'option_name' => 'alecaddd_plugin',
                'callback' => array($this->callbacks_mngr, 'checkboxSanitize')
            )
        );
        $this->settings->setSettings( $args );
    }

    public function setSections(){
        $args = array(
            array(
                'id' => 'alecaddd_admin_index',
                'title' => 'Settings Manager',
                'callback' => array($this->callbacks_mngr, 'adminSectionManager'),
                'page' => 'alecaddd_plugin'
            )
        );
        $this->settings->setSections( $args );

    }
    public function setFields()
    {
        $args = array();
        foreach ($this->managers as $key => $val){
            $args[] = array(
                'id' => $key,
                'title' => $val,
                'callback' => array($this->callbacks_mngr, 'checkboxField'),
                'page' => 'alecaddd_plugin',
                'section' => 'alecaddd_admin_index',
                'args' => array(
                    'option_name' => 'alecaddd_plugin',
                    'label_for' => $key,
                    'class' => 'ui-toggle'
                )
                );
        }
        $this->settings->setFields( $args );
    }
}
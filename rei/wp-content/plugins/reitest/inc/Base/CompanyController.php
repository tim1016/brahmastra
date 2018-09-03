<?php
/**
 * @package  AlecadddPlugin
 */
namespace Inc\Base;

use Inc\Api\SettingsApi;
use Inc\Base\BaseController;
use Inc\Api\Callbacks\AdminCallbacks;
use Inc\Api\Callbacks\CompanyCallbacks;

/**
* 
*/
class CompanyController extends BaseController
{
	public $callbacks;

	public $co_callbacks;

	public $managers;

	public $subpages = array();

	public function register()
	{
		if ( ! $this->activated( 'company_details' ) ) return;

        $this->managers = array(
            'Company_Name'=>'This is the Brand Name of your company. Example: Savvy-Investors',
            'Site_Tagline'=>'Unique proposition. Example: The Win-Win Philosophy' ,
            'Market_City'=>'Your target city',
            'Market_State'=>'Your target state',
            'Contact_Name'=>'Name of the company contact. Example: Savvy Customer Support',
            'Contact_Email'=>'Publicly displayed email address of your company', 
            'Contact_Phone'=>'Publicly displayed phone number of your company',
            'Street_Address'=>'Business address street. Example: 1659 Tomahawk Trail',
            'City'=> 'Business City. Example: Omaha',
			'State'=>'Business State. Example: Colorado',        
			'Zipcode' => '63622'       
        );


		$this->settings = new SettingsApi();
		$this->callbacks = new AdminCallbacks();
		$this->co_callbacks = new CompanyCallbacks();

        $this->setSubpages();
        $this->setSettings();
        $this->setSections();
		$this->setFields();
		$this->settings->addSubpages($this->subpages)->register();

	}

	public function setSubpages()
	{
		$this->subpages = array(
			array(
				'parent_slug' => 'alecaddd_plugin', 
				'page_title' => 'Company Profile', 
				'menu_title' => 'Company Profile', 
				'capability' => 'manage_options', 
				'menu_slug' => 'rei_company', 
				'callback' => array( $this->callbacks, 'adminCompany' )
			)
		);
	}

	public function setSettings()
	{
		$args = array(
			array(
				'option_group' => 'alecaddd_company_settings',
				'option_name' => 'alecaddd_company',
				'callback' => array($this->co_callbacks, 'Sanitize')
			)
		);
		$this->settings->setSettings( $args );
	}

    public function setSections(){
        $args = array(
            array(
                'id' => 'alecaddd_company_index',
                'title' => 'Company Manager Section title',
                'callback' => array($this->co_callbacks, 'SectionManager'),
                'page' => 'rei_company'
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
                'title' => str_replace("_"," ",$key),
                'callback' => array($this->co_callbacks, 'textField'),
                'page' => 'rei_company',
                'section' => 'alecaddd_company_index',
                'args' => array(
                    'option_name' => 'alecaddd_company',
                    'label_for' => $key,
					'class' => '',
                    'placeholder' => '',
                    'description' => $val
                )
			);
        }
        $this->settings->setFields( $args );

    }



}
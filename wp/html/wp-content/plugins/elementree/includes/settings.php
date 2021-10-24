<?php

namespace Elementree;

if (!defined('ABSPATH')) {
	exit;
}

class Settings
{
	/**
	 * Holds the values to be used in the fields callbacks
	 */

	/**
	 * Start up
	 */
	public function __construct()
	{
		add_action('admin_init', array($this, 'elementree_setup_init'));
		add_action('admin_menu', array($this, 'elementree_setup_menu'));
	}

	/**
	 * add settings sections and fields for the config page of the plugin in admin panel
	 */
	public function elementree_setup_init()
	{
		add_settings_section("elementree_settings", "", array($this, 'section_callback'), "elementree_settings_fields");

		add_settings_field('elementree_widgets_files', 'Elementree widgets files: ', array($this, 'widgets_files_form_element'), 'elementree_settings_fields', "elementree_settings");

		register_setting("elementree_settings", "elementree_widgets_files");
	}

	/**
	 * function: elementree_setup_menu
	 *
	 * creating a menu item in the admin menu for the plugin
	 */
	public function elementree_setup_menu()
	{
		add_options_page('Elementree', 'Elementree', 'manage_options', 'elementree', array($this, 'elementree_config_form'));
	}

	/**
	 * create the title field in the config page
	 */
	public function widgets_files_form_element()
	{
?>
		<textarea style="width: 100%" name="elementree_widgets_files" id="elementree_widgets_files" rows="4"><?php echo get_option('elementree_widgets_files'); ?></textarea>
	<?php
	}

	/**
	 * section callback function from add_settings_section function
	 * we can add here description and etc. as the example in the comment
	 * we are keeping this for an example
	 */
	public function section_callback($arguments)
	{
	}

	/**
	 * function: elementree_config_form
	 *
	 * creating a config form for the plugin
	 */
	public function elementree_config_form()
	{
	?>
		<div>

			<h1>Elementree Settings</h1>
			<form method="post" action="options.php">
				<?php
				settings_fields("elementree_settings");
				do_settings_sections("elementree_settings_fields");
				submit_button();
				?>
			</form>
		</div>
<?php
	}
}

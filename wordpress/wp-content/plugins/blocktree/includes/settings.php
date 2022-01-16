<?php

namespace Blocktree;

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
    add_action('admin_init', array($this, 'blocktree_settings_init'));
    add_action('admin_menu', array($this, 'blocktree_setup_menu'));
  }

  /**
   * function: blocktree_setup_menu
   *
   * creating a menu item in the admin menu for the plugin
   */
  public function blocktree_setup_menu()
  {
    add_options_page(
      __('Blocktree', 'blocktree'),
      __('Blocktree', 'blocktree'),
      'manage_options',
      'blocktree',
      array($this, 'blocktree_config_form')
    );
  }

  /**
   * add settings sections and fields for the config page of the plugin in admin panel
   */
  public function blocktree_settings_init()
  {
    add_settings_section(
      'blocktree_section',
      __('Blocktree settings', 'blocktree'),
      array($this, 'section_callback'),
      'blocktree'
    );

    add_settings_field(
      'blocktree_sources',
      __('Sources files:', 'blocktree'),
      array($this, 'sources_form_element'),
      'blocktree',
      'blocktree_section'
    );

    add_settings_field(
      'blocktree_handler_key',
      __('Handler key:', 'blocktree'),
      array($this, 'handler_key_form_element'),
      'blocktree',
      'blocktree_section'
    );

    register_setting('blocktree', 'blocktree_sources');

    register_setting('blocktree', 'blocktree_handler_key');
  }

  /**
   * create the sources field in the config page
   */
  public function sources_form_element()
  {
    $value = get_option('blocktree_sources');
    ?>
      <textarea style="width: 100%" name="blocktree_sources" id="sources" rows="4"><?php echo esc_textarea( $value ); ?></textarea>
    <?php
  }

  /**
   * create the handler_key field in the config page
   */
  public function handler_key_form_element()
  {
    $value = get_option('blocktree_handler_key');
    ?>
      <input style="width: 100%" name="blocktree_handler_key" id="blocktree_handler_key" value="<?php echo esc_attr( $value ); ?>" />
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
   * function: blocktree_config_form
   *
   * creating a config form for the plugin
   */
  public function blocktree_config_form()
  {
    ?>
      <div>
        <h1>Blocktree Settings</h1>
        <form method="post" action="options.php">
          <?php
          settings_fields("blocktree");
          do_settings_sections("blocktree");
          submit_button();
          ?>
        </form>
      </div>
    <?php
  }
}

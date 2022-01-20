<?php

/*
 * Plugin Name: dfa
 * # Plugin URI: https://linnovate.net/
 * Description: Manage Elementree for Wordpress.
 * Version: 1.0.2
 * Author: Linnovate
 * Author URI: https://linnovate.net/
 * License: GPLv2 or later
 * Text Domain: dfa
 */

if (!defined('ABSPATH')) {
  exit('Press Enter to proceed...');
}

include_once(ABSPATH . 'wp-admin/includes/plugin.php');

if (!is_plugin_active('blocktree/blocktree.php') || !is_plugin_active('elementor/elementor.php')) {

  add_action('admin_notices', function () {
    printf('<div class="notice notice-error"><p>
		<strong>Dfa</strong> plugin is <strong>deactivate</strong> (blocktree & elementor plugins is Required) !
	<p></div>');
  });

  deactivate_plugins(plugin_basename(__FILE__));
} else {

  require __DIR__ . '/plugin.php';
}

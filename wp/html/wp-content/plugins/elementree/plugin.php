<?php

namespace Elementree;

if (!defined('ABSPATH')) {
	exit('Press Enter to proceed...');
}

/**
 * ClientRender plugin.
 *
 * @since 1.0.0
 */
class Plugin
{

	/**
	 * Instance.
	 *
	 * Holds the plugin instance.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @var $instance
	 */
	public static $instance = null;

	/**
	 * Render the widget output.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function get_markup($widget_name, $settings)
	{
		$settings = json_encode($settings);
		$hash = uniqid(rand(), TRUE);

		return "
   		<div id='$hash'></div>
		  <script>
		 		window.ElementreeWidgets('$widget_name', document.getElementById('$hash'), $settings)
		  </script>
	    ";
	}

	/**
	 * Load the assets.
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 */
	private function assets()
	{
		$widgets_files  = explode(PHP_EOL, get_option('elementree_widgets_files'));

		foreach ($widgets_files as $key => $path) {

			$extension = pathinfo(strtok(trim($path), '?'), PATHINFO_EXTENSION);

			if ($extension == 'js') {
				wp_enqueue_script('elementree-widgets-' . $key, trim($path));
			}
			if ($extension == 'css') {
				wp_enqueue_style('elementree-widgets-' . $key, trim($path));
			}
		}
	}

	/**
	 * Basic shortcode.
	 *
	 * Written a shortcode, using elementree widget. [elementree widget="my_widget_name" value="123" /]
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 */
	public function elementree_shortcode($atts = array(), $content = null)
	{
		return $this->get_markup($atts['widget'], $atts);
	}

	/**
	 * Instance.
	 *
	 * Ensures only one instance of the plugin class is loaded or can be loaded.
	 *
	 * @since 1.0.0
	 * @access public
	 * @static
	 *
	 * @return Plugin An instance of the class.
	 */
	public static function instance()
	{
		if (is_null(self::$instance)) {
			self::$instance = new self();
		}
	}

	/**
	 * Plugin constructor.
	 *
	 * Initializing Elementor Experts plugin.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function __construct()
	{
		// setup settings page
		new Settings();

		// add shortcodes
		add_shortcode('elementree', [$this, 'elementree_shortcode']);

		// add assets
		add_action('init', function () {
			$this->assets();
		}, 100);
	}
}

Plugin::instance();

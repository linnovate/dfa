<?php

namespace Blocktree;

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
  public function get_markup($component_name, $settings = [], $handler_key = null)
  {
    $handler_key = $handler_key ? $handler_key : esc_attr(get_option('blocktree_handler_key'));

    $settings = json_encode($settings);
    $hash = uniqid(rand(), TRUE);

    return "<div id='$hash'></div>
            <script>
              window['$handler_key']('$component_name', document.getElementById('$hash'), $settings);
            </script>";

    // return "<textarea data-blocktree
    // 		 data-component-name='$component_name'
    // 		 data-handler-key='$handler_key'
    // 		>$settings</textarea>";
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
    $widgets_files  = explode(PHP_EOL, get_option('blocktree_sources'));

    foreach ($widgets_files as $key => $path) {

      $extension = pathinfo(strtok(trim($path), '?'), PATHINFO_EXTENSION);

      if ($extension == 'js') {
        wp_enqueue_script('blocktree-sources-' . $key, trim($path));
      }
      if ($extension == 'css') {
        wp_enqueue_style('blocktree-sources-' . $key, trim($path));
      }
    }

    // wp_enqueue_script('blocktree-widgets', plugin_dir_url(__FILE__) . '/blocktree-widgets-example.js');
    //wp_enqueue_script('blocktree-wp', plugin_dir_url(__FILE__) . '/blocktree-wp.js');
  }

  /**
   * Basic shortcode.
   *
   * Written a shortcode, using blocktree widget. [blocktree component-name="my_widget_name" value="123" /]
   *
   * @since 1.0.0
   * @access public
   *
   */
  public function blocktree_shortcode($atts = array(), $content = null)
  {
    return $this->get_markup($atts['component-name'], $atts, $atts['handler_key']);
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
    add_shortcode('blocktree', [$this, 'blocktree_shortcode']);

    // add assets
    add_action('init', function () {
      $this->assets();
    }, 100);
  }
}

Plugin::instance();

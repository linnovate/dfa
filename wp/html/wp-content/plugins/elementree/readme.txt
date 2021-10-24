=== Elementree ===
Contributors: Linnovate
Donate link: https://linnovate.net/
Tags: elementree
Requires at least: 4.0
Tested up to: 4.9
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==
Manage Back office with Elementree

This plugin requires:

== Installation ==

1. Upload the elementree plugin to the /wp-content/plugins/ directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Add widgets files at /wp-admin/options-general.php?page=elementree

== Exemple ==

```php

// Basic markup:

echo \Elementree\Plugin::$instance->get_markup($widget_name, $settings);

// Set a shortcode used elementree markup

do_shortcode('[elementree widget="my_widget_name" value="123" /]');

// Add simple page & sub page used elementree markup:

add_action('admin_menu', function() {

  add_menu_page(
    $page_title,
    $menu_title,
    $capability,
    $menu_slug, 
    function() use ( $widget_name, $settings ) {
      echo \Elementree\Plugin::$instance->get_markup($widget_name, $settings);
    },
    $icon_url,
    $position
  );

  add_submenu_page(
    $parent_slug,
    $page_title,
    $menu_title,
    $capability,
    $menu_slug,
    function() use ( $widget_name, $settings ) {
      echo \Elementree\Plugin::$instance->get_markup($widget_name, $settings);
    },
    $position
  );

});


// Elementor widget-render example:

class MyElementorWidget extends Widget_Base {

  protected function render() {

    $widget_name = $this->get_name();
    $settings = $this->get_data();

    if ($settings) {
        $settings = $settings['settings'];
    }
        
    echo \Elementree\Plugin::$instance->get_markup($widget_name, $settings);
  
  }

}
```

== Screenshots ==


== Changelog ==




## Manage Back office with Blocktree

### Installation

1. Upload the blocktree plugin to the /wp-content/plugins/ directory.
2. Activate the plugin through the 'Plugins' menu in WordPress.
3. Add widgets files at /wp-admin/options-general.php?page=blocktree.

### Example

Basic markup:

    echo \Blocktree\Plugin::$instance->get_markup($widget_name, $settings);

Set a shortcode used blocktree markup:

    do_shortcode('[blocktree component-name="my_widget_name" value="123" /]');

Add simple page & sub page used blocktree markup:

    add_action('admin_menu', function() {

      add_menu_page(
        $page_title,
        $menu_title,
        $capability,
        $menu_slug, 
        function() use ( $widget_name, $settings ) {
          echo \Blocktree\Plugin::$instance->get_markup($component_name, $settings = [], $handler_key);
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
          echo \Blocktree\Plugin::$instance->get_markup($component_name, $settings = [], $handler_key);
        },
        $position
      );

    });

Elementor widget-render example:

    class MyElementorWidget extends Widget_Base {

      protected function render() {

        $widget_name = $this->get_name();
        $settings = $this->get_data();

        if ($settings) {
            $settings = $settings['settings'];
        }
            
        echo \Blocktree\Plugin::$instance->get_markup($component_name, $settings = [], $handler_key);
      
      }

    }


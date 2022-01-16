<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_AllRequests extends AbstractWidget
{
  public function get_name()
  {
    return 'AllRequests';
  }

  public function get_title()
  {
    return __('All Requests', 'dfa');
  }

  public function get_icon()
  {
    return 'eicon-bullet-list';
  }

  protected function _register_controls()
  {
  }
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_AllRequests());

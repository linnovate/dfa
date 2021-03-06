<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_Parteis extends AbstractWidget
{
  public function get_name()
  {
    return 'Parteis';
  }

  public function get_title()
  {
    return __('Parteis', 'dfa');
  }

  public function get_icon()
  {
    return 'eicon-user-circle-o';
  }

  protected function _register_controls()
  {
  }
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_Parteis());

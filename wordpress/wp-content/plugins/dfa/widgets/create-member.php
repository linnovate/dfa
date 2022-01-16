<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_CreateMember extends AbstractWidget
{
  public function get_name()
  {
    return 'CreateMember';
  }

  public function get_title()
  {
    return __('Create Member', 'dfa');
  }

  public function get_icon()
  {
    return 'eicon-instagram-comments';
  }

  protected function _register_controls()
  {
  }
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_CreateMember());

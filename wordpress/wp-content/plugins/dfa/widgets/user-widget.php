<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_UserWidget extends AbstractWidget
{
  public function get_name()
  {
    return 'UserWidget';
  }

  public function get_title()
  {
    return __('User Widget', 'dfa');
  }

  public function get_icon()
  {
    return 'eicon-user-circle-o';
  }

	protected function _register_controls()
	{
	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_UserWidget());

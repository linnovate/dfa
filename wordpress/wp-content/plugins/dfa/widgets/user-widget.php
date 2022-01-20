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
	$this->start_controls_section('settings', array(
		'label' => __('Settings', 'dfa'),
	));
	
	$this->add_control('ledgerId', array(
		'type'        => Controls_Manager::TEXT,
		'label'       => __('Ledger ID:', 'dfa'),
	));

    $this->end_controls_section();
  }
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_UserWidget());

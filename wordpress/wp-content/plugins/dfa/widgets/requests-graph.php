<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_RequestsGraph extends AbstractWidget
{
	public function get_name()
	{
		return 'RequestsGraph';
	}

	public function get_title()
	{
		return __('Requests Graph', 'dfa');
	}

	public function get_icon()
	{
		return 'eicon-map-pin';
	}

	protected function _register_controls()
	{

	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_RequestsGraph());

<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_MyRequests extends AbstractWidget
{
	public function get_name()
	{
		return 'MyRequests';
	}

	public function get_title()
	{
		return __('My Requests', 'dfa');
	}

	public function get_icon()
	{
		return 'eicon-editor-list-ol';
	}

	protected function _register_controls()
	{

	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_MyRequests());

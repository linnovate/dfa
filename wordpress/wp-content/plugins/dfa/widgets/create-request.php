<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_CreateRequest extends AbstractWidget
{
	public function get_name()
	{
		return 'CreateRequest';
	}

	public function get_title()
	{
		return __('Create Request', 'dfa');
	}

	public function get_icon()
	{
		return 'eicon-instagram-comments';
	}

	protected function _register_controls()
	{

	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_CreateRequest());

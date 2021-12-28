<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_RequestsForApproval extends AbstractWidget
{
	public function get_name()
	{
		return 'RequestsForApproval';
	}

	public function get_title()
	{
		return __('Requests For Approval', 'dfa');
	}

	public function get_icon()
	{
		return 'eicon-radio';
	}

	protected function _register_controls()
	{

	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_RequestsForApproval());

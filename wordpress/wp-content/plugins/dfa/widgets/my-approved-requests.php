<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_MyApprovedRequests extends AbstractWidget
{
	public function get_name()
	{
		return 'MyApprovedRequests';
	}

	public function get_title()
	{
		return __('My Approved Requests', 'dfa');
	}

	public function get_icon()
	{
		return 'eicon-video-playlist';
	}

	protected function _register_controls()
	{

	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_MyApprovedRequests());

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
		/* ================================== General =================================== */

		//         $this->start_controls_section('general', array(
		//             'label' => __('General', 'dfa'),
		//         ));

		//         $this->add_control('btnText', array(
		//             'type'        => Controls_Manager::TEXT,
		//             'label'       => __('Text:', 'dfa'),
		//             'default' => __('Create request', 'dfa'),
		//         ));

		//         $this->end_controls_section();

	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_MyApprovedRequests());
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

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_UserWidget());

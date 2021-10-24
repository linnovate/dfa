<?php

namespace Dfa;

use \Elementor\Controls_Manager;

class Widget_ViewMap extends AbstractWidget
{
	public function get_name()
	{
		return 'ViewMap';
	}

	public function get_title()
	{
		return __('View Map', 'dfa');
	}

	public function get_icon()
	{
		return 'eicon-map-pin';
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

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_ViewMap());

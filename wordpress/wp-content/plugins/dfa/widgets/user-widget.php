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

		$this->start_controls_section('general', array(
		    'label' => __('Redirects', 'dfa'),
		));

		$this->add_control('requestLink', array(
		    'type'        => Controls_Manager::URL,
		    'label'       => __('Request redirect:', 'dfa'),
		    'placeholder' => __( 'https://your-link.com', 'dfa' ),
		    'default' => [
		      'url' => '/flight-request',
		    ],
		    'options' => false,
		));

		$this->add_control('approvalLink', array(
		    'type'        => Controls_Manager::URL,
		    'label'       => __('Approval redirect:', 'dfa'),
		    'placeholder' => __( 'https://your-link.com', 'dfa' ),
		    'default' => [
		      'url' => '/weather-approval',
		    ],
		    'options' => false,
		));

		$this->add_control('logoutLink', array(
		    'type'        => Controls_Manager::URL,
		    'label'       => __('Logout redirect:', 'dfa'),
		    'placeholder' => __( 'https://your-link.com', 'dfa' ),
		    'default' => [
		      'url' => '/logout',
		    ],
		    'options' => false,
		));

		$this->end_controls_section();

	}
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type(new Widget_UserWidget());

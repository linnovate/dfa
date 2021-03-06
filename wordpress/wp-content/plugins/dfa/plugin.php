<?php

namespace Dfa;

if (!defined('ABSPATH')) {
  exit('Press Enter to proceed...');
}

/**
 * Register category
 *
 * @since 1.0.0
 */
add_action('elementor/init', function () {

  \Elementor\Plugin::instance()->elements_manager->add_category(
    'dfa',
    array(
      'title' => __('Dfa', 'dfa'),
      'icon'  => 'fa fa-plug'
    )
  );
});

/**
 * Register widgets.
 *
 * @since 1.0.0
 */
add_action('elementor/widgets/widgets_registered', function () {

  require_once(__DIR__ . '/widgets/AbstractWidget.php');
  require_once(__DIR__ . '/widgets/user-widget.php');

  require_once(__DIR__ . '/widgets/create-member.php');
  require_once(__DIR__ . '/widgets/members.php');

  require_once(__DIR__ . '/widgets/create-request.php');
  require_once(__DIR__ . '/widgets/my-requests.php');
  require_once(__DIR__ . '/widgets/my-approved-requests.php');
  require_once(__DIR__ . '/widgets/requests-for-approval.php');
  require_once(__DIR__ . '/widgets/all-requests.php');
  
  require_once(__DIR__ . '/widgets/requests-graph.php');

  require_once(__DIR__ . '/widgets/parteis.php');

});

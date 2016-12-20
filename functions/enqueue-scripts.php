<?php

//Making jQuery Google API
function modify_jquery() {
	if (!is_admin()) {
		// comment out the next two lines to load the local copy of jQuery
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js', false, '3.1.1');
		wp_enqueue_script('jquery');
	}
}
add_action('init', 'modify_jquery');

function site_scripts() {
  global $wp_styles; // Call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way

  // VENDOR - concat on release
  wp_enqueue_script( 'restive-js', get_template_directory_uri() . '/assets/js/vendor/restive/dist/restive.min.js', array( 'jquery' ), '', true );

  wp_enqueue_script( 'smoothstate-js', get_template_directory_uri() . '/assets/js/vendor/smoothstate/jquery.smoothState.min.js', array( 'jquery' ), '', true );

  // APP
  wp_enqueue_script( 'site-js', get_template_directory_uri() . '/assets/js/dist/app.min.js', array( 'jquery' ), '', true );

  // CSS
  wp_enqueue_style( 'site-css', get_template_directory_uri() . '/assets/css/style.css', array(), '', 'all' );
}

add_action('wp_enqueue_scripts', 'site_scripts', 999);

<?php
// Calling your own login css so you can style it
function mhem_login_css() {
	wp_enqueue_style( 'mhem_login_css', get_template_directory_uri() . '/assets/css/login.min.css', false );
}

// changing the logo link from wordpress.org to your site
function mhem_login_url() {  return home_url(); }

// changing the alt text on the logo to show your site name
function mhem_login_title() { return get_option('blogname'); }

// calling it only on the login page
add_action('login_enqueue_scripts', 'mhem_login_css', 10 );
add_filter('login_headerurl', 'mhem_login_url');
add_filter('login_headertitle', 'mhem_login_title');

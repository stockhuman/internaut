<?php

function mhem_customizer_register( $wp_customize ) {

	/* Panels */
	$wp_customize->add_panel( 'panel_content', array(
		'priority' => 10,
		'capability' => 'edit_theme_options',
		'theme_supports' => '',
		'title' => __( 'Presentation', 'mhem' ),
		'description' => __('This panel controls what the main page will display as the featured story, submission link images and fixed media across the site.', 'mhem')
	) );


	// Panel 1: Homepage
	$wp_customize->add_section( 'section_home', array(
	    'priority' => 1,
	    'capability' => 'edit_theme_options',
	    'theme_supports' => '',
	    'title' => __( 'Home Page', 'mhem' ),
	    'description' => 'This panel controls what the homepage will display.',
			'panel' => 'panel_content'
	) );

	// Name for the Works section
	$wp_customize->add_setting('home_work_name', array('default' => 'Works'));
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'home_work_name', array(
				'label'     => __('Call to action page', 'mhem'),
				'section'   => 'section_home',
				'settings'  => 'home_work_name',
				'priority'  => 2,
				'description'=> __('Send users directly to a page from your homescreen, prioritizing that content.', 'mhem'),
			)
		)
	);

	// Name for the blog posts section
	$wp_customize->add_setting('home_musings_name', array('default' => 'Musings'));
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'home_musings_name', array(
				'label'     => __('Call to action button text', 'mhem'),
				'section'   => 'section_home',
				'settings'  => 'home_musings_name',
				'priority'  => 2,
				'description'=> __('Cutomize the call to action text within the above button', 'mhem'),
			)
		)
	);

	// // Feature One
	// $wp_customize->add_setting('home_feature_one', array('default' => '-1'));
	// $wp_customize->add_control(
	// 	new WP_Customize_Control(
	// 		$wp_customize, 'home_feature_one', array(
	// 			'label'     => __('Featured Block 1', 'mhem'),
	// 			'section'   => 'section_home',
	// 			'settings'  => 'home_feature_one',
	// 			'priority'  => 3,
	// 			'type'      => 'dropdown-pages',
	// 			'description'=> __('Send users directly to a page from your homescreen, prioritizing that content.', 'mhem'),
	// 		)
	// 	)
	// );
	//
	// // Feature Two
	// $wp_customize->add_setting('home_feature_two', array('default' => '-1'));
	// $wp_customize->add_control(
	// 	new WP_Customize_Control(
	// 		$wp_customize, 'home_feature_two', array(
	// 			'label'     => __('Featured Block 2', 'mhem'),
	// 			'section'   => 'section_home',
	// 			'settings'  => 'home_feature_two',
	// 			'priority'  => 3,
	// 			'type'      => 'dropdown-pages'
	// 		)
	// 	)
	// );
	//
	// // Feature Three
	// $wp_customize->add_setting('home_feature_three', array('default' => '-1'));
	// $wp_customize->add_control(
	// 	new WP_Customize_Control(
	// 		$wp_customize, 'home_feature_three', array(
	// 			'label'     => __('Featured Block 3', 'mhem'),
	// 			'section'   => 'section_home',
	// 			'settings'  => 'home_feature_three',
	// 			'priority'  => 3,
	// 			'type'      => 'dropdown-pages'
	// 		)
	// 	)
	// );
	//
	// // Feature Four
	// $wp_customize->add_setting('home_feature_four', array('default' => '-1'));
	// $wp_customize->add_control(
	// 	new WP_Customize_Control(
	// 		$wp_customize, 'home_feature_four', array(
	// 			'label'     => __('Featured Block 4', 'mhem'),
	// 			'section'   => 'section_home',
	// 			'settings'  => 'home_feature_four',
	// 			'priority'  => 3,
	// 			'type'      => 'dropdown-pages'
	// 		)
	// 	)
	// );

	// SITE INDENTITY
	// = = = = = = = = = = = = = = = = = = =

	// Added to existing Title tag
	$wp_customize->add_setting( 'mhem_header_logo' );
	$wp_customize->add_control(
		new WP_Customize_Image_Control(
			$wp_customize, 'header_logo', array(
				'label'    => __('Header Logo', 'mhem'),
				'section'  => 'title_tagline',
				'settings' => 'mhem_header_logo',
			)
		)
	);

	// Add nav info to existing title section
	$wp_customize->add_setting( 'mhem_nav_email' );
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'mhem_nav_email', array(
				'label'    => __('Email Contact', 'mhem'),
				'section'  => 'title_tagline',
				'settings' => 'mhem_nav_email',
			)
		)
	);

	// Add nav info to existing title section
	$wp_customize->add_setting( 'mhem_nav_tel' );
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'mhem_nav_tel', array(
				'label'    => __('Telephone Number', 'mhem'),
				'section'  => 'title_tagline',
				'settings' => 'mhem_nav_tel',
			)
		)
	);

	$wp_customize->add_setting( 'mhem_nav_show_info', array('default'  => '1'));
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'mhem_nav_show_info', array(
				'label'	   => __('Show Contact info', 'mhem'),
				'section'  => 'title_tagline',
				'settings' => 'mhem_nav_show_info',
				'type'     => 'checkbox'
			)
		)
	);

	// street adress ?

	// Same thing, add social media icons
	$wp_customize->add_setting( 'mhem_nav_facebook' );
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'mhem_nav_facebook', array(
				'label'    => __( 'Facebook link', 'mhem' ),
				'section'  => 'title_tagline',
				'settings' => 'mhem_nav_facebook',
			)
		)
	);
	// Same thing, add social media icons
	$wp_customize->add_setting( 'mhem_nav_twitter' );
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'mhem_nav_twitter', array(
				'label'    => __( 'Twitter link', 'mhem' ),
				'section'  => 'title_tagline',
				'settings' => 'mhem_nav_twitter',
			)
		)
	);
	// Same thing, add social media icons
	$wp_customize->add_setting( 'mhem_nav_youtube' );
	$wp_customize->add_control(
		new WP_Customize_Control(
			$wp_customize, 'mhem_nav_youtube', array(
				'label'    => __( 'YouTube link', 'mhem' ),
				'section'  => 'title_tagline',
				'settings' => 'mhem_nav_youtube',
			)
		)
	);


}
add_action( 'customize_register', 'mhem_customizer_register' );

// Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
function mhem_customize_preview_js() {
	wp_enqueue_script( 'mhem_customizer', get_template_directory_uri() . '/assets/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'mhem_customize_preview_js' );

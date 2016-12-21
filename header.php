<!doctype html>

  <html class="no-js"  <?php language_attributes(); ?>>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<?php if ( ! function_exists( 'has_site_icon' ) || ! has_site_icon() ) { ?>
      <!-- Icons & Favicons -->
    	<link rel="icon" href="<?php echo get_template_directory_uri(); ?>/assets/icons/favicon.ico">

    	<link rel="apple-touch-icon" sizes="57x57" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-57x57.png">
    	<link rel="apple-touch-icon" sizes="60x60" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-60x60.png">
    	<link rel="apple-touch-icon" sizes="72x72" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-72x72.png">
    	<link rel="apple-touch-icon" sizes="76x76" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-76x76.png">
    	<link rel="apple-touch-icon" sizes="114x114" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-114x114.png">
    	<link rel="apple-touch-icon" sizes="120x120" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-120x120.png">
    	<link rel="apple-touch-icon" sizes="144x144" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-144x144.png">
    	<link rel="apple-touch-icon" sizes="152x152" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-152x152.png">
    	<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/assets/icons/apple-icon-180x180.png">
    	<link rel="icon" type="image/png" sizes="192x192" href="<?php echo get_template_directory_uri(); ?>/assets/icons/android-icon-192x192.png">
    	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/assets/icons/favicon-32x32.png">
    	<link rel="icon" type="image/png" sizes="96x96" href="<?php echo get_template_directory_uri(); ?>/assets/icons/favicon-96x96.png">
    	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/assets/icons/favicon-16x16.png">

    	<meta name="msapplication-TileColor" content="#121212">
    	<meta name="msapplication-TileImage" content="<?php echo get_template_directory_uri(); ?>/assets/icons/ms-icon-144x144.png">

    	<!--[if IE]>
    		<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico">
    	<![endif]-->

    	<meta name="theme-color" content="#121212">
	  <?php } ?>

		<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

		<?php wp_head(); ?>

		<!-- Drop Google Analytics here -->
		<!-- end analytics -->

    <!--[if lt IE 9]>
      <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->

	</head>

	<body <?php body_class(); ?>>
    <div id="preloader"></div>
    <div class="innie"></div>
    <div class="outie"></div>

    <div id="background"></div>

		<header class="header" role="banner">

		</header>

    <?php get_template_part( 'parts/nav' ); ?>
    <!-- end of transition elements, header and nav -->

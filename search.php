<?php get_header(); ?>

	<main id="main" class="" role="main">
		<header>
			<h1 class="archive-title"><?php _e( 'Search Results for:', 'mhemwp' ); ?>
				<?php echo esc_attr(get_search_query()); ?>
			</h1>
		</header>

		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

			<!-- To see additional archive styles, visit the /parts directory -->
			<?php get_template_part( 'parts/loop', 'archive' ); ?>

		<?php endwhile; ?>

			<?php //mhem_page_navi(); ?>

		<?php else : ?>

			<?php get_template_part( 'parts/content', 'missing' ); ?>

	    <?php endif; ?>

    </main> <!-- end #main -->

<?php get_footer(); ?>

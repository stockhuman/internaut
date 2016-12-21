<?php get_header(); ?>

	<div class="container">
		<main id="main" class="" role="main">
			<header>
				<h1 class="archive-title"><?php _e( 'Search Results for:', 'arthemwp' ); ?>
					<?php echo esc_attr(get_search_query()); ?>
				</h1>
			</header>

			<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

				<!-- To see additional archive styles, visit the /parts directory -->
				<?php get_template_part( 'parts/loop', 'archive' ); ?>

			<?php endwhile; ?>

				<?php //arthem_page_navi(); ?>

			<?php else : ?>

				<?php get_template_part( 'parts/content', 'missing' ); ?>

		    <?php endif; ?>

	    </main> <!-- end #main -->
	</div>

<?php get_footer(); ?>

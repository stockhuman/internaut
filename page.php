<?php get_header(); ?>

  <div class="container">
    <main id="main" class="" role="main">

  	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

      <?php get_template_part( 'parts/loop', 'page' ); ?>

    <?php endwhile; endif; ?>

  	</main> <!-- end #main -->
  </div>

	<?php get_sidebar(); ?>

<?php get_footer(); ?>

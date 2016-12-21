<?php get_header(); ?>

  <div class="container">
    <main id="main" class="" role="main">

      <?php if (have_posts()) : while (have_posts()) : the_post(); ?>

      	<?php get_template_part( 'parts/loop', 'single' ); ?>

      <?php endwhile; else : ?>

     		<?php get_template_part( 'parts/content', 'missing' ); ?>

      <?php endif; ?>

    </main>
  </div>
  
<?php get_footer(); ?>

<?php get_header(); ?>

  <main id="main" class="" role="main">

  <!-- work category section -->
  <section id="work-feed">
    <? $args = array( 'category_name' => 'work' );
      $loop = new WP_Query( $args );
      if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post(); ?>

  		<?php get_template_part( 'parts/loop', 'home-work' ); ?>

  	<?php endwhile; else : get_template_part( 'parts/content', 'missing' ); endif; ?>
  </section>

  <!-- musings category feed -->
  <section id="musings-feed">
    <? $args = array( 'category_name' => 'musings' );
      $loop = new WP_Query( $args );
      if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post(); ?>

      <?php get_template_part( 'parts/loop', 'home' ); ?>

    <?php endwhile; else : get_template_part( 'parts/content', 'missing' ); endif; ?>
  </section>

  </main> <!-- end #main -->


<?php get_footer(); ?>

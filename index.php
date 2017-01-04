<?php get_header(); ?>

  <main id="main" class="" role="main">

    <header id="global-header">
        <h1>Michael Hemingway</h1>
    </header>

  <!-- work category section -->
  <section id="work-feed" class="grid">
    <? $args = array( 'category_name' => 'work' );

      $loop = new WP_Query( $args );

      if ( $loop->have_posts() ) : while ( $loop->have_posts() ) : $loop->the_post();

      $count_posts = $loop->current_post + 1; ?>

      <article id="post-<?php the_ID(); ?>" <?php post_class('grid-item'); ?>>
        <a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>">

          <div class="grid-item-overlay">
            <h2 class="item-title"><?php the_title(); ?></h2>
            <span class="item-number">0<?php echo $count_posts; ?></span>
          </div>
          <?php the_post_thumbnail('large'); ?>
        </a>
      </article>

  	<?php endwhile; else : get_template_part( 'parts/content', 'missing' ); endif; ?>
  </section>

  </main> <!-- end #main -->


<?php get_footer(); ?>

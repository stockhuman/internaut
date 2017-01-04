<header id="global-header" class="single">
		<h1><?php the_title(); ?></h1>
</header>

<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?> role="article" itemscope itemtype="http://schema.org/BlogPosting">
	<div class="post-thumbnail">
		<?php the_post_thumbnail('full'); ?>
	</div>

	<header class="article-header">
		<h1 class="entry-title single-title" itemprop="headline"><?php the_title(); ?></h1>
		<?php get_template_part( 'parts/content', 'byline' ); ?>
  </header> <!-- end article header -->

  <section class="entry-content" itemprop="articleBody">
		<?php the_content(); ?>
	</section> <!-- end article section -->


	<?php wp_link_pages( array( 'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'mhemwp' ), 'after'  => '</div>' ) ); ?>

</article>

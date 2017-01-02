<article id="post-<?php the_ID(); ?>" <?php post_class('grid-item'); ?>>
    <div class="item-overlay">
  		<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="<?php the_title_attribute(); ?>"><?php the_title(); ?></a></h2>
    </div>
    <?php the_post_thumbnail('large'); ?>
</article>

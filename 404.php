<?php get_header(); ?>

	<div class="container">
		<main id="main" class="" role="main">

			<article id="content-not-found">

				<header class="article-header">
					<h1><?php _e( 'Epic 404 - Article Not Found', 'arthemwp' ); ?></h1>
				</header> <!-- end article header -->

				<section class="entry-content">
					<p><?php _e( 'The article you were looking for was not found, but maybe try looking again!', 'arthemwp' ); ?></p>
				</section> <!-- end article section -->

				<section class="search">
				    <p><?php get_search_form(); ?></p>
				</section> <!-- end search section -->

			</article> <!-- end article -->

		</main> <!-- end #main -->
	</div>

<?php get_footer(); ?>

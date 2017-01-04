		<footer class="footer" role="contentinfo">
			<nav role="navigation">
				<?php mhem_footer_links(); ?>
			</nav>

			<div class="footer-links">
				<a href="#fb" class="footer-social">
						<img src="<?= get_template_directory_uri(); ?>/assets/images/ui/facebook.svg" alt="facebook">
				</a>
				<a href="#fb" class="footer-social">
						<img src="<?= get_template_directory_uri(); ?>/assets/images/ui/twitter.svg" alt="twitter">
				</a>
				<a href="#fb" class="footer-social">
						<img src="<?= get_template_directory_uri(); ?>/assets/images/ui/instagram.svg" alt="instagram">
				</a>
				<a href="#fb" class="footer-social">
						<img src="<?= get_template_directory_uri(); ?>/assets/images/ui/googleplus.svg" alt="github">
				</a>
			</div>
			<p class="source-org copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>.</p>
		</footer>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			window.jQuery || document.write('<script src="<?= get_template_directory_uri(); ?>/assets/js/vendor/jquery/dist/jquery.min.js"><\\/script>');
		</script>
		<?php wp_footer(); ?>
	</body>
</html> <!-- end page -->

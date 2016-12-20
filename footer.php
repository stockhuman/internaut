		<footer class="footer" role="contentinfo">
			<nav role="navigation">
				<?php arthem_footer_links(); ?>
			</nav>
			<p class="source-org copyright">&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>.</p>
		</footer>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
		<script>
			window.jQuery || document.write('<script src="<?= get_template_directory_uri(); ?> /assets/js/vendor/jquery/dist/jquery.min.js"><\\/script>');
		</script>
		<?php wp_footer(); ?>
	</body>
</html> <!-- end page -->

<main id="content" class="page">
	<article class="page about">
		<progress value="0" max="0" class="page-title"></progress>
		<p>Assuming a lifespan of 80 years.</p>
		<h2 class="text-center"></h2>
	</article>
</main>

<style>
	progress[value] {
		width: 100%;
	}
</style>
<script>
	function formatTime(time) {
		return Math.ceil(time / (1000*3600*24));
	}

	// compute how long I have to live
	var birth = new Date("4/24/1997");
	var death = new Date("4/24/2077");

	var lifeTime = Math.abs(death.getTime() - birth.getTime());
	var lifeDays = formatTime(lifeTime);

	var DDC = formatTime(death) - formatTime(birth); // formatted to 29000

	var life = formatTime(new Date(Date.now()).getTime()) - formatTime(birth);

	document.getElementsByTagName('progress')[0].value = life;
	document.getElementsByTagName('progress')[0].max = DDC;
	document.getElementsByTagName('h2')[0].innerHTML = life + " / " + DDC;
</script>

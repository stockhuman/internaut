---
layout: project
description: My personal productivity app
cover: dither-jars.png.png
slug: jars
category: code
statsfor: Jars
tags: []
year: [2017, 2019]
bg: 00AEEF
fg: EEEEEE
---

# The organization app

Jars was the longest-running under-development app I've made to date by technicality: now integrated into all new projects on [this site](/this-site), Jars started in 2017 as an desktop app built to organise my daily life.

<figure>
	<img src="/assets/img/work/jars/dither-jars-v2.0.2.jpg.png" alt="">
	<figcaption>Jars v2.0.2, August 2019</figcaption>
</figure>

It started as a way to formalize and keep record of the markdown documents that preceded it: today.md, week.md &amp; notes.md (among others) that I used to organise my life.

<figure>
	<img src="/assets/img/work/jars/dither-jars-v2.0.2-editor.jpg.png" alt="">
	<figcaption>Jars v2.0.2 editor view, August 2019</figcaption>
</figure>

I started development with a Vue and Electron framework hybrid, to teach myself both. I think in that regard it's been a wild succes, and I learned ES6 along the way as well.

Inspiration for the project in it's current form conceptually borrows from <a href="https://joshavanier.github.io/">Josh Avanier's</a> <a href="https://joshavanier.github.io/wiki/log/">log</a> and [other similar works](https://log.v-os.ca/). A prominent component of this version of Jars utilises a [calendar representation](https://github.com/nomand/Letnice) written by Alexey Botkov.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" style="height: 100px; margin: 2rem 0 3rem 0; text-align:center; width: 100%">
<circle id="base" cx="64" cy="64" r="64" fill="#FFFFFF"/>
<clipPath id="clippath">
<rect width="0" height="128" id="jars-logo-width"/>
</clipPath>
<circle id="clip" fill="#FFCC66" cx="64" cy="64" r="64" style="clip-path:url(#clippath);"/>
</svg>

Jars is so named after the Christopher Crawford ritual of moving a colored bean from one jar to another each day, acknowledging the passage of time and one's best use of it.

Jars' ever-changing logo is effectively an hourglass for the 80 year lifespan.

<figure>
<h2>Early Design</h2>
	<img src="/assets/img/work/jars/dither-side-by-side-dev.png.png" alt="Illustrator to JS">
	<figcaption>From concept to code</figcaption>
	<br>
	<img src="/assets/img/work/jars/dither-NYE-build.png.png" alt="">
	<figcaption>NYE Build 2017 build, pre-refactor</figcaption>
	<br>
	<img src="/assets/img/work/jars/dither-good-evening.png.png" alt="early jars header">
	<figcaption>The header detail, which incorporates the death countdown from the <a href="/life">life</a> page.</figcaption>
	<br>
	<img src="/assets/img/work/jars/dither-readme-1.png.png" alt="">
	<figcaption>The app homepage, v.0.0.2</figcaption>
</figure>

The project is [available here on Github](https://github.com/stockHuman/Jars) with more notes on technical details.

<script>
const logo = document.getElementById('jars-logo-width')
const move = e => {
	logo.attributes.width.value = (e.clientX / window.innerWidth) * 128
}
document.addEventListener("mousemove", move)
document.addEventListener("touchmove", move)
</script>

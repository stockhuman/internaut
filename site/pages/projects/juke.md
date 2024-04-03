---
layout: project
title: JUKE
description: A Fisher Price record disc creator and library
cover: dither-juke.jpg.png
category: code
statsfor: Juke
tags: [3D printing, Svelte]
year: [2023]
bg: 1f5a9b
fg: f1f1f1
tc: FFCC66
---

# JUKE

Juke is an online STL builder and sharing platform that allows users to create
custom music discs for the 1971 Fisher-Price Music Box - Record Player.

<figure>
	<img alt="Main app interface, showing a spinning blue disk on a white background, light theme" src="/assets/img/work/juke/light.png" />
	<figcaption>Main app interface, light theme</figcaption>
</figure>

## Tech Stack

The app itself is built with [Svelte](https://svelte.dev/), [Vite](https://vitejs.dev/), and [Threlte](https://threlte.xyz/) for [Threejs](https://threejs.org/) interoperability. Fonts used in the generation of 3D text were built using [FaceType.js](https://gero3.github.io/facetype.js/). An incomplete character set was provided to save on loading times, as extruded fonts can become enormous with little benefit if latin uppercase is all I aim to support.

<figure>
  <video controls autoplay style="border-radius: 8px">
    <source src="/assets/video/juke/demo.mp4" type="video/mp4">
  </video>
  <figcaption>Entire app demo, at launch</figcaption>
</figure>

Initial modelling (the disc is not entirely generated, a base model is first loaded) was done in Blender, with manual measurements and adjustments over iterations to compensate for thermal expansion and tolerances. This model is a two-sided disc with 11 groves and no text.

## Server-side

<figure style="padding-top: 0px">
	<img alt="Dark theme, showcasing initial state with a blank disc" src="/assets/img/work/juke/dark.png" />
	<figcaption style="text-align: center">Dark theme, showcasing initial state with a blank disc</figcaption>
</figure>

By virtue of convenience, this initially ran on a tiny [Olimex A20](https://www.olimex.com/Products/OLinuXino/A20/A20-OLinuXino-LIME/open-source-hardware) in my home office, though Nginx. A small Node server passed requests to MongoDB, daemonized via [PM2](https://pm2.io/). My home internet connection is no longer static, so this feature has been removed pending a migration to a hosted endpoint.

Further work is necessary to support ranking features, pagination of database results, input sanitization and more for a public release.

Storage has been optimized by encoding the 75 possible notes spaces and 16 possible notes into zero-padded hexadecimal string arrays. Further optimizations are possible at the cost of code legibility. Base64 unfortunately carries too much overhead, but a blob format would be possible.

<figure>
	<img alt="A screenshot of a figma design concept, showcasing the concentric rings of the logo and the treble cleff interface" src="/assets/img/work/juke/figma.png" />
	<figcaption>Figma: Initial interface concept, logo, final design concept</figcaption>
</figure>

Whilst planned from the start, the user catalogue was relatively rushed, as I had spent a great amount of time with two other backend implementations in Strapi and Directus (both self-hosted). These were too resource-intensive for the shared VPS I planned to host on and on my own low powered machine (my own home server is dedicated to other tasks and isn’t exposed to the internet). This is reflected in the design and lack of real input sanitization, but performance is acceptable and loading of other users’ data is instantaneous (as demonstrated in the feature video).

User input was planned as a notation app, using conventional Western sheet music. This did not pan out as the differences between individual units (notices by comparing videos to mine) do not reliably produce tones in the way that sheet music would convey. The notches on the disc are instead rough approximations of particular notes.

<figure>
	<img alt="An array of radio buttons representing the input notches of the software's initial mode of data-entry." src="/assets/img/work/juke/side-a.png" />
  <img alt="The alternating notch pattern" src="/assets/img/work/juke/detail.png" />
	<figcaption>Top: An input panel, with “Side A” and some populated notes visible, Below: The alternating notch pattern</figcaption>
</figure>

Another planned-but-not-implemented user input method is that of a direct file-to-notch data upload function, with special attention to JSON and CSV. While arbitrary quantization is possible (and was performed in one of the demo discs), the complexity required in a sanitization interface made it unfeasible.

Instead, the only current implementation of user notch input is a full presentation of all the possible notes (but not the possible spaces) that may be placed one one side of the disc. This is the case as I noticed during testing that 6 of the middle lanes actually played the same note, and when arranged in factory discs, closely repeated notes would alternate across groves to improve response time. I implemented this algorithm in the data editor. It is visible when placing repeated notes immediately following one another.

Lastly, missing from intended features is a audio feedback mechanism. An audio file exists on GitHub to slice into individual notes and play back on placement. This is an essential component for a public release as one usually doesn’t want to commit to 3D printing for hours only for an acoustic dud.

<div style="margin-bottom: 1em">
  <audio src="/assets/audio/juke.m4a" controls style="width: 100%">
    <a href="/assets/audio/juke.m4a">Download audio</a>
  </audio>
  <figcaption>Audio recording of a demo disc, sequentially playing each note in every position</figcaption>
</div>

## Hardware

In the process of building this project, I managed to find a bug in the STL Exporter in [three-stdlib](https://github.com/pmndrs/three-stdlib).

3D printed discs are highly variable in quality but there is not much I can do from the web interface to account for that. I have tried to optimize for both print speed and ease of printing (without supports on the underside) without sacrificing playability. Given the original toy is meant for children, bad print jobs are tolerated by the rather hardy machine. The FDM printing target (my own printer, the most common) is deliberate, and higher- quality resin printing may break given the shape I chose for the notches (cuboids), when printed at sufficiently high resolution, might create a barrier to the play arm’s needles without the rounding-off effect FDM printing has on fine model geometry.

<figure>
	<img alt="A 3D printed blank disc" src="/assets/img/work/juke/blank.jpg" />
  <img alt="The original toy, with a 3D printed disc inserted" src="/assets/img/work/juke/toy.jpg" />
  <img alt="An original disc that came with the toy" src="/assets/img/work/juke/original.jpg" />
  <img alt="A test disc with holes drilled in it to account for tolerance issues" src="/assets/img/work/juke/test-2.jpg" />
  <figcaption>1: A blank printed disc</figcaption>
  <figcaption>2: The toy with a 3D printed record obtained via the web interface</figcaption>
  <figcaption>3: A factory Disc “Humpty Dumpty 1”</figcaption>
  <figcaption>4: Detail of a random data print. Note holes drilled to avoid tolerance issues.</figcaption>
</figure>

## Other Works

This was fun to make. Other attempts at this idea (discovered after I had already settled on the project), while good, only served as a benchmark to beat. I did not make use of their code nor execution. The disc shape itself, being relatively simple, was not copied but instead made from scratch with measurements, as I had the luxury of owning the toy myself and could thus study it at my leisure. IBM Plex should be acknowledged for the excellent typeface.

I hope, upon public launch, that this project’s resultant discs are as fun to listen to as this was to make.

Thanks for reading,

Michael

<style>
  html {
    background: #EFEFEF;
  }
</style>

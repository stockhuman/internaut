---
layout: project
description: A connected database of sounds
cover: dither-tellum.png.png
slug: tellum
category: code
tags:
year: 2017
bg: ED254E
fg: EEEEEE
---

# Tellum

The story behind this app begins with an experience I had of an item exchange box some five years ago.

I loved the idea of the box; it was this little wooden thing affixed to a wall a few paces from my high school. I would pass by it every day to class. The idea of this thing had so much promise.

And yet, people would only fill it with trash. The most dubiously useful item in there of value was a flavoured condom. The value proposition of giving up physical possessions to strangers simply wasn't there. And so it failed. The box fell into disrepair and was eventually taken down.

<figure>
	<img alt="The map" src="/assets/img/work/tellum/map.jpg">
</figure>

So came to me the inspiration and driving motive behind Tellum. It was to be an item exchange box, but networked around the city for that same sense of community, and it was to exchange audio instead of items; sound is far easier to give and receive, and still holds that possibility for kindness and expression.

Tellum was initially conceived with a physical component, a node that would serve as the 'exchange box' and was to have connect to an array of others across the city. The image of [playground telephone tubes](https://i.pinimg.com/originals/33/f0/eb/33f0ebd6ca037f6235bf2acc30c410b9.jpg) came to mind.

With parts coming in too late, I built a mobile platform instead, relying heavily on WebAudio APIs and the blob datatype and API. In this arrangement, users capture audio live on their device, and upon completing their message, it is uploaded to the server and the option to listen is made available to them.

One then can hear another's voice, and if they navigate to the 'desktop' interface, can see the heatmap of where these soundbytes come from.

<figure class="full-width-video" style="padding-bottom: 65.2%; margin-bottom: 2em;">
	<iframe src="https://player.vimeo.com/video/247917559" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</figure>

The SQL and PHP backend utilizes a CRUD framework I've grown rather familiar with, and in its current configuration, is open to the public. Details about the technical side of this project can be found on [Github](https://github.com/stockHuman/tellum).

The Desktop component, while barebones at the time of writing, utilizes Mapbox's API to display the map and geolocation data. The colors are my own, meant to match the scheme of the project.

The _aesthetic_ of this project, a rather emergent one, but one that I'd hoped for all the same, is that of surprise. When I finally heard a voice other than my own on the platform, and then heard full sturies at that, I was delighted. Truly happy to see and exchange of creative expression, in sound, just like that.

---

[Try it out for yourself](tellum-app)

[Github](https://github.com/stockHuman/tellum)

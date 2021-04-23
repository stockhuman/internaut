---
layout: project
title: Heraldry
description: Blazonry and coat-of-arms generation for the UTF-8 generation
cover: dither-heraldry.png.png
category: code
statsfor: Heraldry
tags: [React, Twitter]
year: 2019
bg: e5e500
fg: 282c34
tc: e5e500
---

# Heraldry

Heraldry is a _escutcheon_-generating web-app and [twitter bot](https://twitter.com/EmojiHeraldry), developed on a whim after an intense bout of burning curiosity surrounding the medieval art of heraldry.

I spent quite some time researching the composition, history and idiosyncrasies of the artform, and later another length of time with the art of blazonry.

I've learnt a great deal and come to a profound appreciation for the poetic terseness of a well-bazoned coat of arms.

<figure>
	<img src="/assets/img/work/heraldry/dither-003.png.png">
	<figcaption>
	Quarterly, I azure, four Folded Hands Or sleeved azure, II Or, a hotdog bendwise proper, III Or, IV azure
	</figcaption>
</figure>

The bot has enjoyed continued updates to reflect new emoji releases and the occasional new design, as well as continued improvements to my bespoke blazonry. Indeed, since no repository of pre-blazoned emoji exists, I've had to make my own.

```js
['🧜‍♀️', 'mermaid# Or vested gules of hair azure, dexter arm raised', azure],
```

Using a system of hashes, brackets and some edge-case handlers, I can generate plurals of each emoji, and as of writing plan to finally make the bot tincture-aware with it's charges (the heraldic word for the objects & designs placed upon a shield).

<figure>
	<img src="/assets/img/work/heraldry/dither-001.png.png">
	<figcaption>
	Argent, in a pale purpure, three tulips slipped and leaved proper
	</figcaption>
</figure>

The bot is currently [hosted on glitch](https://glitch.com/heraldry-bot), where a small node environment listens for pings from an external service, waiting to post images to twitter. Find it live [here](https://heraldry.michaelhemingway.com/), and source code [here](https://github.com/stockhuman/heraldry/).

And Find below two early examples of the bot at work, before I switched emoji sets on account of copyright grounds.

<figure>
	<img src="/assets/img/work/heraldry/dither-004.png.png">
	<figcaption>
	Argent, in a pile purpure a basket gules, in chief two legs embowed Or
	</figcaption>
</figure>

<figure>
	<img src="/assets/img/work/heraldry/dither-002.png.png">
	<figcaption>
	Quarterly, I argent, four cherry blossom argent, II gules, a laughing crying emoji proper, III gules, IV argent
	</figcaption>
</figure>

Thank you :)

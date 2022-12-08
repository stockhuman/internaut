---
layout: project
title: The Partisan Web
description: An open data repository for political influence in online media
cover: dither-tpw.png.png
category: web
statsfor: [tpw-site, tpw-data, tpw, tpw-scraper, TPW]
tags: [gastby, react, graphql, news]
year: 2021
bg: ffea2c
fg: 0a0a0a
tc: ffea2c
---

# The Partisan Web

TPW was a freely accesible, open-source repository of user-categorised online publications.

<figure>
	<img src="/assets/img/work/tpw/dither-logos.png.png" alt="previously considered designs" />
	<figcaption>The selected logo, whilst perhaps a little strange, captured to me the ideas of stratified quantities within a network.</figcaption>
</figure>


## But what about "x"?

A small number of other sites have approached the task of categorizing our digital media landscape with various methodologies and degrees of completeness.

Common to all of them was an unfortunate U.S.-centric perspective, which seemingly attempts to map political positions to their two major parties with sometimes strange results. At its most harmless, this can be seen with the inverted-from-tradition color scheme of left v. right with exceptions made for the color red and explicit socialism. More serious artefacts of this American perspective can been when other sites must include manual notes to distinguish progressive left from liberal / Democrat when both are categorically placed in the same political box, or libertarian, populist and corporate variants of right-wing politics in the same manner.

Additionally, many of these projects lack the transparency about themselves and their categorisation process that they aim to provide for other publications. Some provide a tally as rated by anonymous voters, whose database was private, or others simply provide a rating with no accountability to authors whatsoever.

And finally, by storing the data source in an open fashion and providing the API for free, other enterprising individuals may build off of this work without need to negotiate terms, run afoul of copyright, or find API lock-in.

<figure>
	<img src="/assets/img/work/tpw/dither-page.png.png" alt="screenshot of an organisation page" />
	<figcaption>The sidebar showcases the entirety of the API's data, formatted in the 'reccomended' way, chunked into sections.</figcaption>
</figure>

## Does this duplicate Wikipedia?

No, although the content license was compatible. Wikipedia provides a great deal of information in a great number of languages, and also lists a history of edits on each entry. Unfortunately, there was no API for this content, and the explicit focus of this project (political leaning) was not Wikipedia's. Their design de-empasises the edit history and discussion around entries, and those may not necessarily address the political leaning or factual accuracy that this project aims to cover.

## Architecture

This site works with a unidirectional data flow, from the GitHub source files written in human-readable markdown, to a read-only GraphQL representation of that data, and then finally to this site.

This site was built with Gatsby, which makes a "static website." As such, the entries on this site might be delayed from what exists in the source files. This decision was made to facilitate portability of the site itself and improve site speed, with an understanding that the heart of this project was the data itself, and not the site. As this was an open-source project, anyone can build their own representation of the data, or submit requests to alter how this website looks and works.

The site was once live [here](https://www.thepartisanweb.com/).

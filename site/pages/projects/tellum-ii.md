---
layout: project
title: A million Missed Calls
description: The infinite voicemail
cover: dither-tellum-ii.png.png
category: [hardware, code]
tags: [audio, linux]
year: 2023
bg: c0c0c0
fg: 111111
tc: 45454a
---

_A Million Missed Calls_ (also known as: _Tellum II_) is an installation piece centering a SouthWestern Bell payphone.

<div style="margin-bottom: 1em">
  <audio src="/assets/audio/tutorial00.wav" controls style="width: 100%">
    <a href="/assets/audio/tutorial00.wav">Download audio</a>
  </audio>
  <figcaption>Tutorial audio as implemented in the first release</figcaption>
</div>

This phone can't make calls. Instead, its insides have been gutted and rewired into a machine that lets users explore an infinite coordinate space. Using the keypad as a navigation instrument and with the handset pressed to one's ear, they may listening to, and record audio messages along the way.
Visitors are encouraged to mark locations in coordinate space on the device itself, allowing others to easily naviagate to them. A [thematically-integrated user manual](/assets/docs/Manual.pdf) and artist's statement was printed for its vernissage and the Concordia D/CART year-end show.

## Aesthetics & functionality

<figure>

  ![As installed during the vernissage](/assets/img/work/tellum-ii/dither-expo.png.png)

  <div style="display: flex;gap: 10px;flex-wrap: wrap; margin-bottom: 10px">
  <audio src="/assets/audio/2.wav" controls style="flex-grow: 1;">
    <a href="/assets/audio/2.wav">Download audio</a>
  </audio>
  <audio src="/assets/audio/1680089846266.wav" controls style="flex-grow: 1;">
    <a href="/assets/audio/1680089846266.wav">Download audio</a>
  </audio>
  <audio src="/assets/audio/takefive.wav" controls style="flex-grow: 1;">
    <a href="/assets/audio/takefive.wav">Download audio</a>
  </audio>
  </div>
  <figcaption>Audio files <br>1. keypad tone. <br>2. Early audio message left by a classmate. <br>3. Example of the pre-seeded sounds on the device</figcaption>
</figure>

As noted in the [dev log](/c411), I took primary inspiration in the delight of perusing community libraries, though I confess I've seldom ever found something I enjoyed. So then, this project finds the same delight and whimsy in the easier exchange of sound and sentences.

![A screenshot of the Vimeo interface for "Out of touch but it's the last 20 years of culture and geopolitics in the West"](/assets/img/work/tellum-ii/geopolitics.png)

I have previously worked on Tellum as a concept, executed instead as a web app. As fun as that was, the potential physicality of the experience was what I was after, and what I aim for now. I’m drawn to data representation and retrospectives with regard to politics and ecology, and always with a certain sense of whimsy. With Tellum II I hope to capture a certain sense of whimsy, but actually invite Montrealers to reflect on the city with the physical installation of real devices around town.

## Technical

For ease of prototyping, I elected to write the runtime as a [Nodejs app](https://github.com/stockhuman/tellum-ii), running as `systemd` service. Node effectively batches `exec` calls to record and playback audio, routed to onboard mic and headphone jack outputs that in turn are wired to the handset.

```js
const fs = require('fs')
const { exec } = require('child_process')

if (process.getuid && process.getuid() !== 0) {
  console.warn('Audio playback must run as root')
}

const rate = 8000
const name = Date.now()

// sudo arecord --device=hw:1,0 -f dat --rate 8000 test3.wav
exec(`arecord --device=hw:1,0 -f dat --rate ${rate} ${name}-${rate}.wav`)
```

The real challenge in this approach was actually configuring handset oudio output; Linux audio is troublesome to say the least (where I had to disable the default HDMI audio out driver as I needed a consistent boot order for audio cards so that I could programatically select hardware - this was not straighforward). As noted in the [dev log](/c411), the internal microphone in the handset had likely fried, and so the housing needed to be sawed apart for a replacement.

<video src="/assets/video/tellum/plasma.mov" controls></video>

Not finding a suitably easy sqlite wrapper (I did not want to write base SQL calls), I instead wrote changes to a JSON file. Audio files are streamed as uncompressed 8000Hz, unsigned 16-bit LE (the only codec the board supports), taking roughly 400kb every ten seconds of audio. Given the Olimex SBC's 16GB of onboard space, 10GB or so I may use, the phonebooth is capable of storing roughly 69 hours of audio.

![As installed during the vernissage](/assets/img/work/tellum-ii/dither-setup.jpeg.png)

At the time of writing, the phone booth lives in my living room, functioning as a very odd guestbook, pending permanent installation at Concordia. Many thanks to all who came to see it, with special thanks to Brad Todd and Elio Bidinost for their support.

<script>
// see https://asvd.github.io/microlight/
!function(e,t){"function"==typeof define&&define.amd?define(["exports"],t):t("undefined"!=typeof exports?exports:e.microlight={})}(this,function(e){var t,i=window,n=document,o="appendChild",r="test",a=";text-shadow:",l="opacity:.",s=" 0px 0px ",c="3px 0px 5",d=")",u=n.getElementsByClassName("language-js"),f=function(e){for(e=0;t=u[e++];)for(var f,p,h,g,m,y=t.textContent,x=0,b=y[0],w=1,v=t.innerHTML="",k=0,C=/(\d*\, \d*\, \d*)(, ([.\d]*))?/g.exec(i.getComputedStyle(t).color),N="px rgba("+C[1]+",",E=C[3]||1;p=f,f=7>k&&"\\"==f?1:w;){if(w=b,b=y[++x],g=v.length>1,!w||k>8&&"\n"==w||[/\S/[r](w),1,1,!/[$\w]/[r](w),("/"==f||"\n"==f)&&g,'"'==f&&g,"'"==f&&g,y[x-4]+p+f=="-->",p+f=="*/"][k])for(v&&(t[o](m=n.createElement("span")).setAttribute("style",["",a+s+9+N+.7*E+"),"+s+2+N+.4*E+d,l+6+a+s+7+N+E/4+"),"+s+3+N+E/4+d,l+7+a+c+N+E/5+"),-"+c+N+E/5+d,"font-style:italic;"+l+5+a+c+N+E/4+"),-"+c+N+E/4+d][k?3>k?2:k>6?4:k>3?3:+/^(a(bstract|lias|nd|rguments|rray|s(m|sert)?|uto)|b(ase|egin|ool(ean)?|reak|yte)|c(ase|atch|har|hecked|lass|lone|ompl|onst|ontinue)|de(bugger|cimal|clare|f(ault|er)?|init|l(egate|ete)?)|do|double|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|p(licit|ort)|te(nds|nsion|rn)))|f(allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)|global|goto|guard|i(f|mp(lements|licit|ort)|n(it|clude(_once)?|line|out|stanceof|t(erface|ernal)?)?|s)|l(ambda|et|ock|ong)|m(icrolight|odule|utable)|NaN|n(amespace|ative|ext|ew|il|ot|ull)|o(bject|perator|r|ut|verride)|p(ackage|arams|rivate|rotected|rotocol|ublic)|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))|s(byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch)|t(emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|v(ar|irtual|oid|olatile)|w(char_t|hen|here|hile|ith)|xor|yield)$/[r](v):0]),m[o](n.createTextNode(v))),h=k&&7>k?k:h,v="",k=11;![1,/[\/{}[(\-+*=<>:;|\\.,?!&@~]/[r](w),/[\])]/[r](w),/[$\w]/[r](w),"/"==w&&2>h&&"<"!=f,'"'==w,"'"==w,w+b+y[x+1]+y[x+2]=="<!--",w+b=="/*",w+b=="//","#"==w][--k];);v+=w}};e.reset=f,"complete"==n.readyState?f():i.addEventListener("load",f,0)});
</script>
<style>
  pre {
    line-height: 1;
    background-color: black;
    color: white;
    padding: 10px;
    margin: -10px;
    margin-bottom: 20px;
    border-radius: 4px;
    border: 4px groove #888;
  }
  .language-js {
    font-size: 12px;
    line-height: 1;
  }
  html {
    /* background: #EFEFEF;*/
    background: #FDFD;
  }
</style>
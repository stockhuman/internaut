![Hola](https://raw.githubusercontent.com/stockHuman/internaut/master/site/assets/img/home/home.png)

# It me

Hey there! There's a much more human-readable version of this up at [michaelhemingway.com](https://michaelhemingway.com)!

If you're really here to scrutinize my content and find all my secrets, you'll want to check out [Nanogen](https://github.com/doug2k1/nanogen), which is an old project whose structure Internaut is based upon. Earlier iterations of this site worked with [Harp.js](http://harpjs.com/), but that was abandoned as it is is no longer maintained.

Beyond a few tricks, I don't know how useful one could find this repository, as it's rather tightly-coupled to it's function: building my website.

## License

The code that builds this project as well as the markup and scripts within it are licensed under the [MIT licence](https://en.wikipedia.org/wiki/MIT_License). This is maintained from the original project that Internaut builds upon, [nanogen](https://github.com/doug2k1/nanogen/blob/master/LICENSE).

The _assets_ contained within this project (`.md` files and `site/assets` directory) are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/), with exceptions made for 3D assets and certain images, which remain unlicensed. Please contact me for their use in your projects.

## Building

In resource-constrained environments it may be necessary to run portions of the build process individually, and perform additional steps to optimize the costliest build stages.

Building steps individually is performed by passing a value to the `only` flag as such:

```sh
node ./lib/cli.js --only=dither
```

Sharp [reccomends](https://sharp.pixelplumbing.com/install#linux-memory-allocator) [swapping malloc](https://github.com/lovell/sharp/issues/1041) implementations as follows, allowing the `dither` step to run as expected.

```sh
apt-get install libjemalloc2 # as necessary
export ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2
```

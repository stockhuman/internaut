const path = require('path');
const naut = require('../index');
const log = require('../utils/logger');

const cliProcess = (input = [], flags = {}) => {

  const command = input.length > 0 ? input[0] : null;
  const config = flags.config ? require(path.resolve(flags.config)) : {};

  if (flags.only) {
    const build = new naut.build(config)

    switch (flags.only) {
      case 'styles': build.styles(); break;
      case 'scripts':
        build.scripts(
          './site/scripts/home.js',
          './build/assets/js/home.min.js')
        build.scripts()
        break;
      case 'pages': build.pages(); break;
      case 'assets': build.assets(); break;
      case 'dither': build.dither(); break;
      case 'package':
      case 'build': build.package(); break;
      default: log.error(`That's not a valid build step`)
    }
    return
  }

  if (command === 'start') {
    naut.serve(config, flags);
  } else if (command === 'build') {
    // same as serve, but only once
    const build = new naut.build(config);

    (async function () {
      await build.pages()
      await build.assets()
      await build.scripts()
      await build.dither()

      // extra minification
      await build.package()

    })().then(() => log.info('Build Completed'));
  } else if (command === 'push') {
    naut.push()
  } else {
    log.error('Invalid command');
  }
}
module.exports = cliProcess;

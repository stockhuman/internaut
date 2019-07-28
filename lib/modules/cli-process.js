const path = require('path');
const naut = require('../index');
const log = require('../utils/logger');
const Generator = require('./build')

const cliProcess = (input = [], flags = {}) => {
  // command
  const command = input.length > 0 ? input[0] : null;

  // config
  const config = flags.config ? require(path.resolve(flags.config)) : {};

  if (flags.only) {
    const build = new Generator(config)

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
      default: log.error(`That's not a valid build step`)
    }
    return
  }

  if (command === 'start') {
    naut.serve(config, flags);
  } else if (command === 'build') {
    naut.build(config);
  } else {
    log.error('Invalid command');
  }
}
module.exports = cliProcess;

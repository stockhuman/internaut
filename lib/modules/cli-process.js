const path = require('path');
const internaut = require('../index');
const log = require('../utils/logger');

const cliProcess = (input = [], flags = {}) => {
  // command
  const command = input.length > 0 ? input[0] : null;

  // config
  const config = flags.config ? require(path.resolve(flags.config)) : {};

  if (command === 'start') {
    internaut.serve(config, flags);
  } else if (command === 'build') {
    internaut.build(config);
  } else {
    log.error('Invalid command');
  }
}
module.exports = cliProcess;

const chalk = require('chalk');

module.exports = {
  info(message) {
    console.log(chalk`{gray [naut]} ${message}`);
  },

  success(message) {
    console.log(chalk`{gray [naut]} {green ${message}}`);
  },

  error(message) {
    console.log(chalk`{gray [naut]} {red ${message}}`);
  }
}

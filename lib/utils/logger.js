const chalk = require('chalk');

module.exports = {
  info(message) {
    console.log(chalk`{gray [internaut]} ${message}`);
  },

  success(message) {
    console.log(chalk`{gray [internaut]} {green ${message}}`);
  },

  error(message) {
    console.log(chalk`{gray [internaut]} {red ${message}}`);
  }
};

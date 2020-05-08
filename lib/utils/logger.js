const chalk = require('chalk')

module.exports = {
  info(message) {
    console.log(chalk`{gray [naut]} ${message}`)
  },

  success(message) {
    console.log(chalk`{gray [naut]} {green ${message}}`)
  },

  error(message) {
    console.log(chalk`{gray [naut]} {red ${message}}`)
  },

  time(subject, start) {
    const timeDiff = process.hrtime(start)
    const duration = Math.floor(timeDiff[0] * 1000 + timeDiff[1] / 1e6)
    console.log(chalk`{gray [naut]} {green ${subject} in ${duration}ms.}`)
  }
}

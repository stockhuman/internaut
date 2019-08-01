const liveServer = require('live-server')

module.exports = {
  serve({ path, port, open }) {
    liveServer.start({ port, root: path, logLevel: 0, open})
  }
}

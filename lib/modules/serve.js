const chokidar = require('chokidar')
const debounce = require('lodash.debounce')
const server = require('../utils/server')
const log = require('../utils/logger')
const Generator = require('./build')
const { parseOptions } = require('../utils/parser')



/**
 * Serve the site in watch mode
 */
const serve = (options, flags) => {
  log.info(`Starting local server at http://localhost:${flags.port}`)

  const { srcPath, outputPath } = parseOptions(options)
  const build = new Generator(options)

  build.all(options)
  server.serve({ path: outputPath, port: flags.port })

  chokidar.watch('site', {
    ignored: /node_modules|\.git/,
    ignoreInitial: true
  }).on('change', debounce( path => {
      log.info(`${path} has been changed`)
      if (path.includes('scss')) {
        build.styles()
      } else if (path.includes('js')) {
        build.scripts()
      } else if (path.includes('pages')) {
        build.pages()
      } else if (path.includes('assets')) {
        build.assets()
      } else {
        build.all(options)
      }
    }, 500))
    .on('add', debounce( path => {
      log.info(`${path} has been added`)
      build.all(options) }, 500))
}

module.exports = serve

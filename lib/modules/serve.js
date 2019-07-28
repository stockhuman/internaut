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

  const { outputPath } = parseOptions(options)
  const build = new Generator({...options, ...flags})

  build.all(options)
  server.serve({ path: outputPath, port: flags.port })

  const rules = path => {
    if (path.includes('scss')) {
      build.styles()
    } else if (path.includes('.js')) {
      build.scripts('./site/scripts/home.js', './build/assets/js/home.min.js') // WARN: hardcoded
      build.scripts()
    } else if (path.includes('.ejs')) {
      build.pages()
    } else if (path.includes('assets')) {
      build.assets()
    } else {
      build.all(options)
    }
  }

  chokidar.watch('site', {
    ignored: /node_modules|\.git/,
    ignoreInitial: true
  })
  .on('change', debounce( path => rules(path), 500))
  .on('add', debounce( path => rules(path), 500))
}

module.exports = serve

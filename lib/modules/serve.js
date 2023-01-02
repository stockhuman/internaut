import { watch } from 'chokidar'
import debounce from 'lodash.debounce'
import { serve as _serve } from '../utils/server.js'
import { info } from '../utils/logger.js'
import Generator from './build.js'
import parseOptions from '../utils/parser.js'

/**
 * Serve the site in watch mode
 */
const serve = (options, flags) => {
  info(`Starting local server at http://localhost:${flags.port}`)

  const { outputPath } = parseOptions(options)
  const build = new Generator({ ...options, ...flags })

  build.all(options)
  _serve({ path: outputPath, port: flags.port })

  const rules = path => {
    if (path.includes('scss')) {
      build.styles()
    } else if (path.includes('scripts')) {
      build.scripts('./site/scripts/home.js', './build/assets/js/home.min.js') // WARN: hardcoded
      build.scripts()
    } else if (path.includes('pages') || path.includes('.ejs')) {
      build.pages()
    } else if (path.includes('assets')) {
      build.assets()
    } else if (path.includes('.json')) {
      // this will be removed in favor of all-local data
      const site = require('../../site.config')
      build = new Generator({ ...options, site, ...flags })
      build.pages()
    } else {
      build.all(options)
    }
  }

  watch('site', {
    ignored: /node_modules|\.git/,
    ignoreInitial: true,
  })
    .on(
      'change',
      debounce(path => rules(path), 500),
    )
    .on(
      'add',
      debounce(path => rules(path), 500),
    )
}

export default serve

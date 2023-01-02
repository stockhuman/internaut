import { resolve } from 'path'
import { build as Build, serve, push } from '../index.js'
import { error, info } from '../utils/logger.js'

const cliProcess = (input = [], flags = {}) => {
  const command = input.length > 0 ? input[0] : null
  const config = flags.config ? import(resolve(flags.config)) : {}

  if (flags.only) {
    const build = new Build(config)

    switch (flags.only) {
      case 'styles':
        build.styles()
        break
      case 'scripts':
        build.scripts('./site/scripts/home.js', './build/assets/js/home.min.js')
        build.scripts()
        break
      case 'pages':
        build.pages()
        break
      case 'assets':
        build.assets()
        break
      case 'dither':
        build.dither()
        break
      case 'package':
      case 'build':
        build.package()
        break
      default:
        error(`That's not a valid build step`)
    }
    return
  }

  if (command === 'start') {
    serve(config, flags)
  } else if (command === 'build') {
    // same as serve, but only once
    const build = new Build(config)

    ;(async function () {
      await build.pages()
      await build.assets()
      await build.styles()
      await build.scripts()
      await build.dither()

      // extra minification
      await build.package()
    })().then(() => info('Build Completed'))
  } else if (command === 'push') {
    push()
  } else {
    error('Invalid command')
  }
}
export default cliProcess

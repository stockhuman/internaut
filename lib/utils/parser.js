import { site as defaultSite } from '../../site.config.js'

const buildDefaults = {
  srcPath: './site',
  outputPath: './build',
  cleanUrls: true,
}

const babelPresets = [
  '@babel/preset-env',
  {
    targets: {
      browsers: ['Firefox >= 78', 'last 4 Chrome versions'],
    },
  },
]

/**
 * Parse options, setting the defaults on missing values
 */
const parseOptions = options => {
  const { srcPath, outputPath, cleanUrls } = Object.assign({}, buildDefaults, options.build)
  const site = options.site || defaultSite

  return { srcPath, outputPath, cleanUrls, site, babelPresets }
}

export default parseOptions

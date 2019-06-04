const buildDefaults = {
  srcPath: './src',
  outputPath: './public',
  cleanUrls: true
}

const babelPresets = [
  [
    "@babel/preset-env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: '3.1.3',
    },
  ],
]

/**
 * Parse options, setting the defaults on missing values
 */
const parseOptions = options => {
  const { srcPath, outputPath, cleanUrls } = Object.assign(
    {},
    buildDefaults,
    options.build
  );
  const site = options.site || {};

  return { srcPath, outputPath, cleanUrls, site, babelPresets }
}

module.exports = {
  parseOptions
}

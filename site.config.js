const projects = require('./site/pages/projects/_data.json')

module.exports = {
  build: {
    srcPath: './site',
    outputPath: './build'
  },
  site: {
    title: 'MH',
    description: 'Minimalist static site generator in Node.js',
    cover: '',
    basePath: process.env.NODE_ENV === 'production' ? '/nanogen' : '',
    projects
  }
}

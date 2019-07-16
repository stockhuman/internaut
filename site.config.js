const fse = require('fs-extra')

// via this excellent gist: https://gist.github.com/kethinov/6658166
const walk = (dir, fileList = []) => {
  const files = fse.readdirSync(dir)
  for (const file of files) {
    const stat = fse.statSync(path.join(dir, file))
    if (stat.isDirectory()) fileList = walk(path.join(dir, file), fileList)
    else fileList.push(path.join(dir, file))
  }
  return fileList
}

const collectionData = walk(`./site/pages/collection/`)
collectionData.forEach(page => {
  // const data = fse.readFileSync(`${this.srcPath}/pages/${file}`, 'utf-8')
  const pageData = frontMatter(data)
  const templateConfig = {
    site: this.site,
    page: pageData.attributes
  }
})


// render page


const projects = require('./site/pages/projects/_data.json')
const collection = {
  code: require('./site/pages/collection/code/_data.json'),
  video: require('./site/pages/collection/video/_data.json'),
  writing: require('./site/pages/collection/writing/_data.json')
}


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
    projects,
    collection
  }
}

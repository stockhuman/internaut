const fse = require('fs-extra')
const ejs = require('ejs')
const sass = require('node-sass')
const glob = require('glob')
const path = require('path')
const babel = require('@babel/core')
const marked = require('marked')
const frontMatter = require('front-matter')
const browserify = require('browserify')

const log = require('../utils/logger')
const { parseOptions } = require('../utils/parser')


class Generator {
  constructor(options = {}) {
    const { srcPath, outputPath, cleanUrls, site, babelPresets } = parseOptions(options)

    this.srcPath = srcPath
    this.outPath = outputPath
    this.cleanUrls = cleanUrls
    this.site = site
    this.compilationTargets = { presets: babelPresets, generatorOpts: { minified: true } }

    process.on('unhandledRejection', e => log.error(e))
  }

  // Completely rebuilds the site
  all () {
    this.assets()
    this.pages()
    this.styles()
    this.scripts()
  }

  pages () {
    const startTime = process.hrtime()
    const pages = glob.sync('**/*.@(md|ejs|html)', { cwd: `${this.srcPath}/pages` })
    pages.forEach( file => this.page(file) )
    log.time('Pages Built', startTime)
  }

  page (file) {
    const fileData = path.parse(file)
    let destPath = path.join(this.outPath, fileData.dir)

    // create extra dir if generating clean URLs and filename is not index
    if (this.cleanUrls && fileData.name !== 'index') {
      destPath = path.join(destPath, fileData.name)
    }

    // create destination directory
    fse.mkdirsSync(destPath)

    // read page file
    const data = fse.readFileSync(`${this.srcPath}/pages/${file}`, 'utf-8')

    // render page
    const pageData = frontMatter(data)
    const templateConfig = {
      site: this.site,
      page: pageData.attributes
    }

    let pageContent
    const pageSlug = file.split(path.sep).join('-')

    // generate page content according to file type
    switch (fileData.ext) {
      case '.md':
        pageContent = marked(pageData.body)
        break
      case '.ejs':
        pageContent = ejs.render(pageData.body, templateConfig, {
          filename: `${this.srcPath}/page-${pageSlug}`
        })
        break
      default:
        pageContent = pageData.body
    }

    const loadLayout = layout => {
      const file = `${this.srcPath}/layouts/${layout}.ejs`
      const data = fse.readFileSync(file, 'utf-8')
      return { file, data }
    }

    // render layout with page contents
    const layoutName = pageData.attributes.layout || 'default'
    const layout = loadLayout(layoutName)
    const completePage = ejs.render(
      layout.data,
      Object.assign({}, templateConfig, {
        body: pageContent,
        filename: `${this.srcPath}/layout-${layoutName}`
      })
    )

    // save the html file
    if (this.cleanUrls) {
      fse.writeFileSync(`${destPath}/index.html`, completePage)
    } else {
      fse.writeFileSync(`${destPath}/${fileData.name}.html`, completePage)
    }
  }

  assets (asset = null) {
    const startTime = process.hrtime()
    if (asset) {
      fse.copyFileSync(`${this.srcPath}/assets/${asset}`, `${this.outPath}/assets`)
    } else {
      // clear destination folder (and create if it doesn't exist)
      fse.emptyDirSync(this.outPath)

      // copy assets folder
      if (fse.existsSync(`${this.srcPath}/assets`)) {
        fse.copySync(`${this.srcPath}/assets`, `${this.outPath}/assets`)
      }
    }
    log.time('Assets copied', startTime)
  }

  styles(entry, dest, options = { outputStyle: 'compressed' }) {
    entry = entry ? entry : `${this.srcPath}/scss/style.scss`
    dest = dest ? dest : `${this.outPath}/assets/css/style.css`

    sass.render({
      file: entry,
      outFile: dest,
      ...options
    }, (error, result) => {
      if (error) {
        log.error(error.column)
        log.error(error.message)
        log.error(error.line)
      }
      else {
        log.success(`SCSS compiled in ${result.stats.duration}ms.`)
        fse.writeFile(dest, result.css, err => {
          if (err) { // file not written on disk
            log.error(`Failed to write ${dest} to disk.`)
          }
        })
      }
    })
  }

  async scripts (entry, dest) {
    const startTime = process.hrtime()
    entry = entry ? entry : `${this.srcPath}/scripts/app.js`
    dest = dest ? dest : `${this.outPath}/assets/js/app.min.js`

    const b = browserify(entry)
    b.transform('babelify', { presets: ["@babel/preset-env"] })

    await b.bundle((error, buffer) => {
      if (error) { return log.error(error) }
      fse.writeFileSync(dest, buffer)
      log.time('Scripts transpiled', startTime)
    })
  }
}

module.exports = Generator

import fs from 'fs-extra'
import { render } from 'ejs'
import sass from 'sass'
import glob from 'fast-glob'
import { parse, join, sep, dirname, win32, basename, extname } from 'path'
import { marked } from 'marked'
import frontMatter from 'front-matter'
import browserify from 'browserify'
import { minify } from 'terser'
import { spawn } from 'child_process'

import log from '../utils/logger.js'
import parseOptions from '../utils/parser.js'
import Image from '../utils/image.js'

class Generator {
  constructor(options = {}) {
    const { srcPath, outputPath, cleanUrls, site, babelPresets } = parseOptions(options)

    this.noCache = options.noCache

    this.srcPath = srcPath
    this.outPath = outputPath
    this.cleanUrls = cleanUrls
    this.site = site
    this.babelPresets = babelPresets

    process.on('unhandledRejection', e => log.error(e))
  }

  // Completely rebuilds the site
  all() {
    this.assets()
    this.pages()
    this.styles()
    this.scripts()
    this.fork()
  }

  async pages() {
    const startTime = process.hrtime()
    const pages = await glob('**/*.@(md|ejs|html)', {
      cwd: `${this.srcPath}/pages`,
    })
    pages.forEach(file => this.page(file))
    log.time('Pages built', startTime)
  }

  page(file) {
    const fileData = parse(file)
    let destPath = join(this.outPath, fileData.dir)

    // create extra dir if generating clean URLs and filename is not index
    if (this.cleanUrls && fileData.name !== 'index') {
      destPath = join(destPath, fileData.name)
    }

    // create destination directory
    fs.mkdirsSync(destPath)

    // read page file
    const data = fs.readFileSync(`${this.srcPath}/pages/${file}`, 'utf-8')

    // render page
    const pageData = frontMatter(data)
    const templateConfig = {
      site: this.site,
      page: { slug: fileData.name, ...pageData.attributes },
    }

    let pageContent
    const pageSlug = file.split(sep).join('-')

    // generate page content according to file type
    switch (fileData.ext) {
      case '.md':
        pageContent = marked(pageData.body)
        break
      case '.ejs':
        pageContent = render(pageData.body, templateConfig, {
          filename: `${this.srcPath}/page-${pageSlug}`,
        })
        break
      // copy html verbatim
      case '.html':
        fs.writeFileSync(`${destPath}/${fileData.name}.html`, data)
        break
      default:
        pageContent = pageData.body
    }

    if (fileData.ext === '.html') return

    const loadLayout = layout => {
      const file = `${this.srcPath}/layouts/${layout}.ejs`
      const data = fs.readFileSync(file, 'utf-8')
      return { file, data }
    }

    // render layout with page contents
    const layoutName = pageData.attributes.layout || 'default'
    const layout = loadLayout(layoutName)
    const completePage = render(
      layout.data,
      Object.assign({}, templateConfig, {
        body: pageContent,
        filename: `${this.srcPath}/layout-${layoutName}`,
      }),
    )

    // save the html file
    if (this.cleanUrls) {
      fs.writeFileSync(`${destPath}/index.html`, completePage)
    } else {
      fs.writeFileSync(`${destPath}/${fileData.name}.html`, completePage)
    }
  }

  async dither() {
    const startTime = process.hrtime()

    // via this excellent gist: https://gist.github.com/kethinov/6658166
    const walk = async (dir, fileList = []) => {
      const files = await fs.readdir(dir)
      for (const file of files) {
        const stat = await fs.stat(join(dir, file))
        if (stat.isDirectory()) fileList = await walk(join(dir, file), fileList)
        else fileList.push(join(dir, file))
      }
      return fileList
    }

    const ditherfolder = async folder => {
      const list = await walk(`${this.srcPath}/assets/img/${folder}`)
      await Promise.all(
        list.map(async file => {
          const filepath = this._path(file, true)
          // is image, but not animated gif
          if (filepath.ext.match(/.(jpg|jpeg|png)$/i)) {
            let img = new Image(filepath.full, { width: 1028, height: 1028 })
            try {
              await img.resize()
              await img.dither()
              await img.save({
                name: filepath.name,
                dir: this.outPath,
                subfolder: filepath.folder,
              })
            } catch (error) {
              log.error(error)
            }
          }
        }),
      )
    }

    // create a dithered image for each jpg or png in work dir
    // NOTE: hardcoded paths
    await ditherfolder('other')
    await ditherfolder('work')
    await ditherfolder('home')

    log.time('Dithered images created', startTime)
  }

  fork() {
    const startTime = process.hrtime()
    const child = spawn('node', ['./lib/cli.js', '-o', 'dither'])
    child.stdout.on('data', () => {
      log.time('Dithered images created', startTime)
    })
  }

  async assets(asset = null) {
    const startTime = process.hrtime()

    const isImage = filename => {
      return filename.match(/.(jpg|jpeg|png|gif)$/i)
    }

    if (asset) {
      let formattedpath = asset.substring(12) // removes 'site/assets/'

      if (isImage(asset)) {
        let filename = asset.split(/(\\|\/)/g).pop()
        let img = new Image(asset)

        await img.resize()
        await img.dither()
        await img.save({ filename, dir: this.outPath })
      } else {
        await fs.copyFile(
          `${this.srcPath}/assets/${formattedpath}`,
          `${this.outPath}/assets/${formattedpath}`,
        )
      }
      log.time(`${formattedpath} copied`, startTime)
    } else {
      if (this.noCache) {
        // clear destination folder (and create if it doesn't exist)
        fs.emptyDirSync(this.outPath)

        // copy assets folder
        if (fs.existsSync(`${this.srcPath}/assets`)) {
          fs.copySync(`${this.srcPath}/assets`, `${this.outPath}/assets`)
        }

        log.time('Assets copied', startTime)
      } else {
        await fs.copy(`${this.srcPath}/assets`, `${this.outPath}/assets`)
        log.time('Assets copied', startTime)
      }
    }
  }

  async styles(entry, dest, options = { outputStyle: 'compressed' }) {
    entry = entry ? entry : `${this.srcPath}/scss/style.scss`
    dest = dest ? dest : `${this.outPath}/assets/css/style.css`
    const startTime = process.hrtime()

    // According to https://sass-lang.com/documentation/js-api,
    // renderSync is significantly faster than the Async API
    try {
      const result = sass.compile(entry, { ...options })

      fs.ensureDirSync(dirname(dest))
      fs.writeFile(dest, result.css, err => {
        if (err) {
          // file not written on disk
          log.error(err)
          log.error(`Failed to write ${dest} to disk.`)
        } else log.time('SCSS compiled', startTime)
      })
    } catch (error) {
      log.error(error)
      log.error(error.message)
    }
  }

  async scripts(entry, dest) {
    const startTime = process.hrtime()
    entry = entry ? entry : `${this.srcPath}/scripts/app.js`
    dest = dest ? dest : `${this.outPath}/assets/js/app.min.js`

    const b = browserify(entry)
    b.transform('babelify', {
      presets: [this.babelPresets],
      plugins: ['@babel/transform-runtime'],
    })

    b.bundle((error, buffer) => {
      if (error) {
        return log.error(error)
      }
      fs.ensureDirSync(dirname(dest))
      fs.writeFile(dest, buffer, err => {
        if (err) {
          // file not written on disk
          log.error(err)
          log.error(`Failed to write ${dest} to disk.`)
        } else log.time('Scripts transpiled', startTime)
      })
    })
  }

  // Minifies JS
  async package() {
    const scripts = await glob('**/*.@(js)', {
      cwd: `${this.outPath}/assets/js`,
    })
    scripts.forEach(file => {
      fs.readFile(`${this.outPath}/assets/js/${file}`, 'utf8', (e, data) => {
        if (!e) {
          // See https://github.com/terser-js/terser#minify-options
          minify(data, { ecma: 7 }).then(data => {
            fs.writeFile(`${this.outPath}/assets/js/${file}`, data.code)
          })
        } else {
          log.error(e)
        }
      })
    })
  }

  _path(string, obj = false) {
    // standardises a given path to POSIX line separators
    // if obj, returns an object of component parts
    const double = /\/\//
    let fullpath = win32.normalize(string).replace(/\\/g, '/')
    // via https://github.com/anodynos/upath/
    while (fullpath.match(double)) {
      // node on windows doesn't replace doubles
      fullpath = string.replace(double, '/')
    }

    if (obj) {
      return {
        full: fullpath,
        folder: dirname(fullpath).substring(12), // folder within assets/img/
        name: basename(fullpath),
        ext: extname(fullpath),
      }
    } else {
      return fullpath
    }
  }
}

export default Generator

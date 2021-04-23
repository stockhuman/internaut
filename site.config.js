const path = require('path')
const fse = require('fs-extra')
const frontMatter = require('front-matter')

const collection = []
const projects = []

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
  if (page.endsWith('.md')) {
    const data = fse.readFileSync(page, 'utf-8')
    const pageData = frontMatter(data)
    collection.push({ path: path.basename(page, '.md'), page: pageData.attributes })
  }
})

const projectData = walk(`./site/pages/projects/`)
projectData.forEach((page) => {
	if (page.endsWith('.md')) { // skip index
		const data = fse.readFileSync(page, 'utf-8')
		const pageData = frontMatter(data)
    const slug = path.basename(page, '.md')

		projects.push({
			path: slug,
			page: { slug, ...pageData.attributes }
		})
	}
})
projects.sort((a, b) => b.page.year - a.page.year)

// // allows for custom ordering of projects, and omission from project page
// const projects = require('./site/pages/projects/_data.json')

module.exports = {
  build: {
    srcPath: './site',
    outputPath: './build'
  },
  site: {
    title: 'MH',
    description: 'Michael Hemingway is online',
    cover: 'default.png',
    basePath: process.env.NODE_ENV === 'production' ? '' : '',
    projects,
    collection
  }
}

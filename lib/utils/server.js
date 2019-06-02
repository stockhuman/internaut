const http = require('http')
const open = require('open')
const path = require('path')
const mime = require('mime/lite')
const url = require('url')
const fs = require('fs')

const liveServer = ({ root, port = 3000, newWindow = true }) => {

  http.createServer((request, response) => {

    const uri = url.parse(request.url).pathname
    let filename = path.join(root, uri)

    fs.exists(filename, exists => {
      if (!exists) {
        response.writeHead(404, { "Content-Type": "text/plain" })
        response.write("404 Not Found\n")
        response.end()
        return
      }

      if (fs.statSync(filename).isDirectory()) {
        filename += '/index.html'
      }

      fs.readFile(filename, "binary", (err, file) => {
        if (err) {
          response.writeHead(500, { "Content-Type": "text/plain" })
          response.write(err + "\n")
          response.end()
          return
        }



        response.writeHead(200, {  "Content-Type": mime.getType(filename) })
        response.write(file, "binary")
        response.end()
      })
    })

  }).listen(port, 'localhost', () => {
    if (newWindow) op(port)
  })
}

async function op (port) {
  await open(`http://localhost:${port}`)
}

module.exports = {
  serve({ path, port, open }) {
    liveServer({
      port,
      root: path,
      newWindow: open
    })
  }
}

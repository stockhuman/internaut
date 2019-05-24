

const liveServer = ({ root, port = 3000, open }) => {
  const mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"
  }

  http.createServer((request, response) => {

    const uri = url.parse(request.url).pathname
    const filename = path.join(root, uri)

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

        let mimeType = mimeTypes[filename.split('.').pop()]

        if (!mimeType) {
          mimeType = 'text/plain'
        }

        response.writeHead(200, { "Content-Type": mimeType })
        response.write(file, "binary")
        response.end()
      })
    })

  }).listen(port, 'localhost', () => {
    open(`http://localhost:${port}`)
  })
}

module.exports = {
  serve({ path, port, open }) {
    liveServer({
      port,
      root: path,
      open
    })
  }
}

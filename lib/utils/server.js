import server from 'live-server'

export function serve({ path, port, open }) {
  server.start({ port, root: path, logLevel: 0, open })
}

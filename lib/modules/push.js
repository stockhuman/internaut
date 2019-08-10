const server = require('ssh2-sftp-client')
const log = require('../utils/logger')
const login = require('../../server')
const sftp = new server()

const session = sftp.connect(login)
.then(() => sftp.put('./build/collection/', login.dir + 'collection/'))
.catch((err) => log.error(err))






module.exports = () => session

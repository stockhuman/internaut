import chalk from 'chalk'
import meow from 'meow'
import cliProcess from './modules/cli-process.js'

const cli = meow(
  chalk`
    {yellow Start the current site:}

      {cyan $ naut start [options]}

    {yellow Build the current site:}

      {cyan $ naut build [options]}

    {underline {yellow Options}}
      {cyan -c, --config <file-path>}  Path to the config file (default: site.config.js)
      {cyan -p, --port <port-number>}  Port to use for local server (default: 3000)
      {cyan -o, --only <build-step>}   Only run the specified build step (styles, scripts, etc.)
      {cyan -a, --noCache}             Enable flag to always rebuild assets

      {cyan -h, --help}                Display this help text
      {cyan -v, --version}             Display naut version
  `,
  {
    importMeta: import.meta,
    flags: {
      config: {
        type: 'string',
        default: 'site.config.js',
        shortFlag: 'c',
      },
      port: {
        type: 'string',
        default: '3000',
        shortFlag: 'p',
      },
      only: {
        type: 'string',
        shortFlag: 'o',
      },
      noCache: {
        type: 'boolean',
        default: false,
        shortFlag: 'a',
      },
      help: {
        type: 'boolean',
        shortFlag: 'h',
      },
      version: {
        type: 'boolean',
        shortFlag: 'v',
      },
    },
  },
)

cliProcess(cli.input, cli.flags)

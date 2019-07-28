const chalk = require('chalk');
const meow = require('meow');
const cliProcess = require('./modules/cli-process');

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
    flags: {
      config: {
        type: 'string',
        default: 'site.config.js',
        alias: 'c'
      },
      port: {
        type: 'string',
        default: '3000',
        alias: 'p'
      },
      only: {
        type: 'string',
        alias: 'o'
      },
      noCache: {
        type: 'boolean',
        default: false,
        alias: 'a'
      },
      help: {
        type: 'boolean',
        alias: 'h'
      },
      version: {
        type: 'boolean',
        alias: 'v'
      }
    }
  }
);

cliProcess(cli.input, cli.flags);

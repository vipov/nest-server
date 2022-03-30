#!/usr/bin/env node

const program = require('commander');
// const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

clear();
console.log('')
console.log(figlet.textSync('My API CLI', { horizontalLayout: 'full' }));

program
    .version('0.0.1', '--version')
    .description('Mange the infrastructure of My API')
    .command('setup', 'setup this project for development')
    .command('deploy', 'manage deploys')
    .command('stats', 'display system stats', { isDefault: false });


// allow commander to parse `process.argv`
program.parse(process.argv);

// if no command display help info
if (program.args.length === 0) {
  program.help();
}

#!/usr/bin/env node
console.log('API WELCOME :)')
 
const clear = require('clear');
const chalk = require('chalk');
const figlet = require('figlet');
const program = require('commander');
 
clear();
console.log('')
console.log(chalk.yellow(figlet.textSync('My API CLI', { horizontalLayout: 'full' })));

program
    .version('0.0.1', '--version')
    .description('Mange the infrastructure of My API')
    .command('setup', 'setup this project for development')
    .command('stats', 'display system stats', { isDefault: false });


// allow commander to parse `process.argv`
program.parse(process.argv);

// if no command display help info
if (program.args.length === 0) {
  program.help();
}


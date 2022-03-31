#!/usr/bin/env node

import { Command } from 'commander';
import * as chalk from 'chalk';
import * as figlet from 'figlet';
import * as clear from 'clear';

const program = new Command();

clear();
const banner = figlet.textSync('Api Tools', { horizontalLayout: 'full' });
console.log(chalk.yellow(banner), "\n");

program
    .version('0.0.1', '--version')
    .description('Narzędzia do zarządzania projektem Nest Server')
    .command('setup', 'setup this project for development')
    .command('stats', 'display system stats')
    .exitOverride((err) => process.exit(0) /** TODO handle errors */);


// start programm
program.parse();

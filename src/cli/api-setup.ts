import { existsSync, readFileSync, writeFileSync } from 'fs'
import * as chalk from 'chalk';
import * as inquirer from 'inquirer';

(async function setup() {
  const envFile = "./.env";
  const envTplFile = './.env-tpl';

  if(existsSync(envFile)) {
    return console.log(chalk.green('This project is ready :)'))
  }
  console.log(chalk.green('Setting up...'))

  let tpl = readFileSync(envTplFile).toString();

  const data = await inquirer.prompt([
    {
      type: 'text',
      name: 'jwt_secret',
      message: 'Select your jwt secret',
      default: 'jwt-secret',
      validate: (v) => !!v
    },
    {
      type: 'text',
      name: 'worker_port',
      message: 'Worker microservice port number',
      default: 3001,
      validate: (v) => parseInt(v, 10) >=0
    },
    {
      type: 'text',
      name: 'api_token',
      message: 'Api token header name',
      default: 'api_token',
      validate: (v) => !!v
    },
  ]);

  var Table = require('cli-table');

  var table = new Table({
      head: ['Key', 'Value']
  });

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      table.push([key, value]);
      tpl = tpl.replace(`<${key}>`, value)
    }
  }

  console.log(table.toString());

  writeFileSync(envFile, tpl);

  console.log(chalk.green('You are ready to go :)'))
})()
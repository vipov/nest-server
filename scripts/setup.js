/* eslint-disable no-eval */
const {mkdir, cp} = require('shelljs');
const {existsSync} = require('fs');

mkdir('-p', './storage/databases');
mkdir('-p', './storage/photos');
mkdir('-p', './storage/tmp');
mkdir('-p', './assets/photos');

if(!existsSync('./.env')) {
  cp('./.env.tpl', './.env');
}

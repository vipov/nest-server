const { resolve } = require('path');
const sh = require('shelljs');
const fs = require('fs');

const BASE_DIR = process.cwd();
const package = JSON.parse(
  fs.readFileSync('./package.json', { encoding: 'utf8' }),
);
const version = package.version;
delete package.devDependencies;
delete package.jest;
package.bin.api = package.bin.api.replace('./dist', '.')
package.scripts.pretypeorm = package.scripts.pretypeorm.replace('./src', '.')

console.log('Copy:', 'package.json');
fs.writeFileSync('dist/package.json', JSON.stringify(package, null, 2));

console.log('Copy:', 'package-lock.json');
sh.cp(
  '-f',
  resolve(BASE_DIR, 'package-lock.json'),
  resolve(BASE_DIR, 'dist/package-lock.json'),
);

// console.log('Copy:', 'CHANGELOG.md');
// sh.cp(
//   '-f',
//   resolve(BASE_DIR, 'CHANGELOG.md'),
//   resolve(BASE_DIR, 'dist/CHANGELOG.md'),
// );

// // service worker version update
// console.log('service worker version update');
// const ngswFile = './dist/apps/web/ngsw.json';
// const ngsw = JSON.parse(fs.readFileSync(ngswFile, { encoding: 'utf8' }));
// ngsw.appData.version = version;
// fs.writeFileSync(ngswFile, JSON.stringify(ngsw, null, 2));

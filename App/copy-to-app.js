const fs = require('fs-extra');
const chokidar = require('chokidar');
const path = require('path');
const walkSync = require('walk-sync');
const folders = [''];
const fileSuffix = ['ts', 'tsx'];
const appDesFolder = path.join(__dirname, './dist');
const sourceFolder = path.join(__dirname, './src');
const dotenv = require('dotenv');
dotenv.config();

fs.emptyDirSync(appDesFolder);

const isWatching = process.argv[2] === '--watch';

const copyDir = dir => {
  fs.ensureDirSync(appDesFolder + '/' + dir);
  try {
    fs.copySync(sourceFolder + '/' + dir, appDesFolder + '/' + dir);
    console.log('copy ' + dir + ' success!');
  } catch (err) {
    console.error(err);
  }
  const lbu = process.env.LBU;
  console.log('lbu:' + lbu);
  fileSuffix.forEach(suffix => {
    const paths = walkSync(appDesFolder, {globs: [`**/*.${lbu}.${suffix}`]});
    paths.forEach(file => {
      const oldFile = appDesFolder + '/' + file;
      const newFileName = file.replace(`.${lbu}.${suffix}`, `.${suffix}`);
      const newFile = appDesFolder + '/' + newFileName;
      fs.renameSync(oldFile, newFile);
    });
  });
  console.log('replace lbu file success!');
};
folders.forEach(dir => {
  copyDir(dir);
  if (isWatching) {
    chokidar.watch(sourceFolder + '/' + dir).on('change', event => {
      copyDir(dir);
    });
  }
});

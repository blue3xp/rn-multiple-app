const fs = require('fs-extra');
const chokidar = require('chokidar');
const path = require('path');
const walkSync = require('walk-sync');
const SDKFolders = ['SDK1'];
const fileSuffix = ['ts', 'tsx'];
const appDesFolder = path.join(__dirname, './node_modules/@pruforce');
const dotenv = require('dotenv');
dotenv.config();

fs.emptyDirSync(appDesFolder);

const isWatching = process.argv[2] === '--watch';

const copyDir = dir => {
  fs.ensureDirSync(appDesFolder + '/' + dir);
  const sdkFolder = path.join(__dirname, `../${dir}`);
  try {
    fs.copySync(sdkFolder, appDesFolder + '/' + dir);
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
  console.log('replace lbu sdk file success!');
};
SDKFolders.forEach(sdk => {
  copyDir(sdk);
  if (isWatching) {
    const sdkFolder = path.join(__dirname, `../${sdk}`);
    chokidar.watch(sdkFolder).on('change', event => {
      console.log('sdk:' + sdk);
      copyDir(sdk);
    });
  }
});

'use strict';

const {
  existsSync,
  readFile,
  writeFile,
  unlinkSync,
  renameSync,
} = require('fs');
// eslint-disable-next-line no-console
const log = console.log;
const [source, destination] = process.argv.slice(2);

if (!source || !destination) {
  log('Specify both source and destination params!');
  process.exit();
}

if (source === destination) {
  log('Can not move to the same file!');
  process.exit();
}

const isValidFilename = (filename) => {
  const rg1 = /^[^\\/:*?"<>|]+$/;
  const rg2 = /^\./;
  const rg3 = /^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/i;

  return rg1.test(filename) && !rg2.test(filename) && !rg3.test(filename);
};

const [sourcePath, sourceFolder, sourceFilename] = source.match(/(.*\/)*(.*)/);
const [destPath, destFolder, destFilename] = destination.match(/(.*\/)*(.*)/);

if (sourceFolder && !sourceFilename) {
  log('Specify source file to move!');
  process.exit();
}

if (!existsSync(sourcePath)) {
  log('Source file does not exist!');
  process.exit();
}

if (destFolder && !existsSync(destFolder)) {
  log('Destination folder does not exist!');
  process.exit();
}

if (destFolder && destFilename && existsSync(destPath)) {
  log('Destination file is already exists!');
  process.exit();
}

if (destFilename && !isValidFilename(destFilename)) {
  log('Destination filename is incorrect!');
  process.exit();
}

let destPathOverride = destPath;
let destFolderOverride = destFolder || '';

if (!destFolderOverride && destFilename.indexOf('.') === -1) {
  if (existsSync(destFilename)) {
    destFolderOverride = `${destFilename}/`;
    destPathOverride = destFolderOverride + sourceFilename;
  }
}

if (sourceFolder === destFolderOverride) {
  renameSync(sourcePath, destPathOverride);
  log(`Moved:  ${sourcePath}  >  ${destPathOverride}`);
  process.exit();
}

readFile(sourcePath, (err, data) => {
  if (err) {
    log('Error while trying to read source file');
    process.exit();
  }

  writeFile(destPathOverride, data, () => {
    unlinkSync(sourcePath);
    log(`Moved:  ${sourcePath}  >  ${destPathOverride}`);
  });
});

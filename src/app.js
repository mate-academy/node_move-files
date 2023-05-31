/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [sourcePath, directPath] = process.argv.slice(2);

const moveFile = (from, to) => {
  const sourceFile = path.join(__dirname, from);
  const destinationDir = path.join(__dirname, to);

  if (!fs.existsSync(destinationDir)) {
    throw new Error(`directory '${destinationDir}' does not exist`);
  }

  const isDir = fs.lstatSync(destinationDir).isDirectory();

  const finalPath = isDir
    ? path.join(destinationDir, path.basename(sourceFile))
    : destinationDir;

  console.log('Moving file from:', sourceFile);
  console.log('Moving file to:', finalPath);

  fs.renameSync(sourceFile, finalPath);
};

moveFile(sourcePath, directPath);

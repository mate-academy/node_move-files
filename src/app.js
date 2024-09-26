/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const sourcePath = process.argv[2];
const copyPath = process.argv[3];

try {
  const absoluteSourcePath = path.resolve(sourcePath);
  let absoluteCopyPath = path.resolve(copyPath);
  const nameSourceFile = path.basename(sourcePath);

  const isDirectory = fs.existsSync(absoluteCopyPath)
    && fs.statSync(absoluteCopyPath).isDirectory();

  if (isDirectory) {
    absoluteCopyPath = path.join(absoluteCopyPath, nameSourceFile);
  }

  fs.copyFileSync(absoluteSourcePath, absoluteCopyPath);

  if (absoluteSourcePath !== absoluteCopyPath) {
    fs.rmSync(absoluteSourcePath);
  }
} catch (err) {
  if (err.code === 'ENOENT') {
    console.error('No such file');
  }

  if (err.code === 'EISDIR') {
    console.error('It is a directori');
  }

  if (err.code === 'ERR_INVALID_ARG_TYPE') {
    console.error('Specified second argument');
  }

  if (err.code === 'EPERM') {
    console.error('Operation not permitted');
  }
}

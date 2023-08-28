/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const moveFile = (oldPath, newPath) => {
  const destPath = fs.existsSync(newPath)
    ? path.join(newPath, path.basename(oldPath))
    : newPath;

  const isDestDir = destPath.endsWith('/');

  const destDir = isDestDir ? destPath.slice(0, -1) : path.dirname(destPath);

  if (!fs.existsSync(destDir)) {
    throw new Error('The destination directory does not exist.');
  }

  if (isDestDir) {
    fs.copyFileSync(oldPath, destPath);
    fs.rmSync(oldPath);
  } else {
    fs.renameSync(oldPath, destPath);
  }
};

exports.moveFile = moveFile;

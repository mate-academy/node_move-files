'use strict';

const { renameSync, lstatSync, existsSync } = require('node:fs');
const path = require('path');

function renameFile(oldPath, newPath) {
  try {
    renameSync(oldPath, newPath);
    process.stdout.write(`${oldPath} was moved to ${newPath}`);
  } catch (err) {
    process.stdout.write(err.toString());
  }
}

function moveFile(oldPath, newPath) {
  if (oldPath === newPath) {
    return;
  }

  if (newPath[newPath.length - 1] === '/') {
    const tempNewPath = newPath + path.basename(oldPath);

    renameFile(oldPath, tempNewPath);

    return;
  }

  if (existsSync(newPath) && lstatSync(newPath).isDirectory()) {
    const tempNewPath = newPath + '/' + path.basename(oldPath);

    renameFile(oldPath, tempNewPath);

    return;
  }

  renameFile(oldPath, newPath);
}

module.exports.moveFile = moveFile;

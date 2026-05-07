'use strict';

const fs = require('fs');
const path = require('path');

function move(src, dest) {
  try {
    fs.accessSync(src);
  } catch (error) {
    throw new Error('Source file does not exist');
  }

  let destPath = dest;
  const isDestEndingWithSlash = dest.endsWith('/') || dest.endsWith('\\');

  let isDestExistingDir = false;

  try {
    isDestExistingDir = fs.statSync(dest).isDirectory();
  } catch (error) {
    isDestExistingDir = false;
  }

  if (isDestEndingWithSlash || isDestExistingDir) {
    if (isDestEndingWithSlash && !isDestExistingDir) {
      throw new Error('Destination directory does not exist');
    }

    const fileName = path.basename(src);

    destPath = path.join(dest, fileName);
  }

  const targetDir = path.dirname(destPath);

  try {
    fs.accessSync(targetDir);
  } catch (error) {
    throw new Error('Destination directory does not exist');
  }

  fs.copyFileSync(src, destPath);
  fs.unlinkSync(src);
}

module.exports = { move };

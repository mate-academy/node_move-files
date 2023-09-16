'use strict';

const fs = require('fs-extra');

const moveFiles = (src, dest) => {
  if (!fs.existsSync(src)) {
    return;
  }

  const isDestDirectory = dest.endsWith('/');

  const destDir = isDestDirectory
    ? dest
    : require('path').dirname(dest);

  if (!fs.existsSync(destDir)) {
    return;
  }

  const destFile = isDestDirectory
    ? require('path').basename(src)
    : require('path').basename(dest);

  const newDestPath = require('path')
    .join(destDir, destFile);

  try {
    fs.moveSync(src, newDestPath);
  } catch (err) {
  }
};

const input = process.argv.slice(2);
const source = input[0];
const destination = input[1];

moveFiles(source, destination);

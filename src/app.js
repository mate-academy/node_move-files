'use strict';

const fs = require('fs');

const file = process.argv[2];
const dest = process.argv[3];
let destDir = dest;
let destFile = '';
let checked = false;

function setDestAsFile() {
  destDir = './';
  destFile = dest;
}

if (!dest.endsWith('/')) {
  if (dest.includes('/')) {
    const splitedDest = dest.split('/');

    destDir = splitedDest.slice(0, -1).join('/') + '/';
    destFile = splitedDest[splitedDest.length - 1];
  } else if (dest.includes('.')) {
    setDestAsFile();
    checked = true;
  } else {
    checked = true;

    try {
      if (fs.statSync(dest).isDirectory()) {
        destDir = `./${dest}/`;
      }
    } catch (_err) {
      setDestAsFile();
    }
  }
}

if (!checked) {
  try {
    fs.statSync(destDir);
  } catch (err) {
    throw new Error('no such directory', err);
  }
}

if (!destFile) {
  destFile = file;
}

fs.renameSync(file, destDir + destFile);

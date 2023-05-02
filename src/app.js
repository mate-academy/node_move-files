/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [source, destination] = process.argv.slice(2);

const moveFile = (src, dest) => {
  if (!src || !dest) {
    console.error('Source and destination must be specified');

    return;
  }

  if (!fs.existsSync(src)) {
    console.error(`Source file '${src}' does not exist`);

    return;
  }

  let destPath = dest;

  try {
    const destStat = fs.fstatSync(fs.openSync(dest, 'r'));

    if (destStat.isDirectory()) {
      destPath = path.join(dest, path.basename(src));
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error checking destination file: ${err.message}`);

      return;
    }
  }

  try {
    fs.renameSync(src, destPath);
    console.log(`Moved '${src}' to '${destPath}'`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
};

moveFile(source, destination);

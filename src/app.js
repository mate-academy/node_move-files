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

  const isDirectory = dest.endsWith('/');
  const filename = path.basename(src);
  const destPath = isDirectory ? path.join(dest, filename) : dest;

  try {
    fs.renameSync(src, destPath);
    console.log(`Moved '${src}' to '${destPath}'`);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
};

moveFile(source, destination);

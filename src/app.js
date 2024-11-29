// write code here
/* eslint-disable no-console */

'use strict';

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [from, to] = process.argv.slice(2);

  if (!from || !to) {
    console.error('Must be 2 arguments');

    return;
  }

  const source = path.resolve(from);
  let dest = path.resolve(to);

  try {
    if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
      dest = path.join(dest, path.basename(source));
    }

    fs.renameSync(source, dest);
    console.log('File moved successfully.');
  } catch (error) {
    console.error('Failed to move file:', error);
  }
}

moveFile();

module.exports = { moveFile };

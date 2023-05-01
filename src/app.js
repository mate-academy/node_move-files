'use strict';

const fs = require('fs/promises');
const path = require('path');
const { moveFile } = require('./moveFile');

(async function move() {
  const [source, destination] = process.argv.slice(2);

  try {
    const isDestDirExists = await fs.stat(destination)
      .catch(() => false);

    const isValidDest = await fs.stat(path.dirname(destination))
      .catch(() => false);

    if (isDestDirExists) {
      await moveFile(source, destination + '/' + path.basename(source));

      return;
    }

    if (isValidDest) {
      await moveFile(source, destination);
    }
  } catch (error) {
    global.console.log(error);
  }
})();

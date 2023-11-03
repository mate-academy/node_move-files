/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const [source, destination] = args;

(async function() {
  try {
    if (!fs.existsSync(source)) {
      throw new Error('Source file doesn\'t exists');
    }

    const isDestinationDir = destination.endsWith('/');

    if (isDestinationDir && !fs.existsSync(destination)) {
      throw new Error('Destination folder doesn\'t exists');
    }

    const destinationPath = isDestinationDir
      ? path.join(destination, path.basename(source)) : destination;

    fs.renameSync(source, destinationPath);

    console.log(isDestinationDir
      ? `${source} successfully moved to ${destination}`
      : `${source} successfully renamed to ${destination}`);
  } catch (err) {
    console.error(`Was thrown ${err}`);
  }
})();

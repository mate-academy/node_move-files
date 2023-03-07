/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function getMovedFile(source, destination) {
  if (!fs.existsSync(destination)) {
    console.error(`Destination directory ${destination} does not exist.`);
    process.exit(1);
  }

  const sourceStats = fs.statSync(source);

  if (!sourceStats.isFile()) {
    console.error(`${source} is not a file.`);
    process.exit(1);
  }

  const isDestinationDir = destination.endsWith('/');

  const destinationPath = isDestinationDir
    ? path.join(destination, path.basename(source))
    : destination;

  fs.renameSync(source, destinationPath);

  console.log(`Moved ${source} to ${destinationPath}`);
}

module.exports = { getMovedFile };

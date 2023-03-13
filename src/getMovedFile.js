/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

function getMovedFile(source, destination) {
  const sourcePath = path.join(__dirname, source);
  const destinationPath = path.join(__dirname, destination);

  if (!fs.existsSync(destinationPath)) {
    console.error(`Destination directory ${destination} does not exist.`);
    process.exit(1);
  }

  const sourceStats = fs.statSync(sourcePath);

  if (!sourceStats.isFile()) {
    console.error(`${source} is not a file.`);
    process.exit(1);
  }

  const isDestinationDir = destination.endsWith('/');

  const finalDestinationPath = isDestinationDir
    ? path.join(destinationPath, path.basename(sourcePath))
    : destinationPath;

  fs.renameSync(sourcePath, finalDestinationPath);

  console.log(`Moved ${sourcePath} to ${finalDestinationPath}`);
}

module.exports = { getMovedFile };

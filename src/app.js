/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const moveFiles = (sourceFile, destPath) => {
  const sourcePath = path.join(__dirname, sourceFile);
  const destinationPath = path.join(__dirname, destPath);

  const sourceStats = fs.statSync(sourcePath);

  if (!sourceStats.isFile()) {
    console.error(`${sourceFile} is not a file`);
    process.exit(1);
  }

  const isDestFolder = destinationPath.endsWith('/');

  const finalDestinationPath = isDestFolder
    ? path.join(destinationPath, path.basename(sourcePath))
    : destinationPath;

  fs.renameSync(sourcePath, finalDestinationPath);
  console.log(`Moved ${sourcePath} to ${finalDestinationPath}`);
};

module.exports = moveFiles;

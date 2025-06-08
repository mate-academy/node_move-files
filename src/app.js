/* eslint-disable no-console */
'use strict';

const path = require('path');
const fs = require('node:fs');

function moveFile() {
  const [sourcePath, destinationPath] = process.argv.slice(2);

  if (!sourcePath || !destinationPath) {
    console.error('Please provide source and destination paths');

    // process.exit(1);
    return;
  }

  if (!fs.existsSync(sourcePath)) {
    console.error(`Source file "${sourcePath}" does not exist`);

    // process.exit(1);
    return;
  }

  const sourceStats = fs.statSync(sourcePath);

  if (!sourceStats.isFile()) {
    console.error('Only files can be moved');

    // process.exit(1);
    return;
  }

  let finalDestination = destinationPath;

  const destinationExists = fs.existsSync(destinationPath);

  if (destinationExists) {
    const destinationStats = fs.statSync(destinationPath);

    if (destinationStats.isDirectory()) {
      finalDestination = path.join(destinationPath, path.basename(sourcePath));
    } else {
      finalDestination = destinationPath;
    }
  } else {
    const endsWithSlash = destinationPath.endsWith(path.sep);

    if (endsWithSlash) {
      console.error('Destination directory does not exist');
      // process.exit(1);
    }

    const parentDir = path.dirname(destinationPath);

    if (!fs.existsSync(parentDir)) {
      console.error('Destination parent directory does not exist');
      // process.exit(1);
    }
  }

  try {
    fs.renameSync(sourcePath, finalDestination);
    console.log(`File moved to "${finalDestination}"`);
  } catch (err) {
    console.error(`Failed to move file: ${err.message}`);
    // process.exit(1);
  }
}

moveFile();

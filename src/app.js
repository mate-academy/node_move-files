/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [sourcePath, destinationPath] = process.argv.slice(2);

try {
  if (!sourcePath || !destinationPath) {
    throw new Error('Only one argument is provided');
  }

  let destinationAbsolutePath = path.resolve(destinationPath);

  if (fs.existsSync(destinationAbsolutePath)
    && fs.statSync(destinationAbsolutePath).isDirectory()) {
    destinationAbsolutePath
      = path.join(destinationAbsolutePath, path.basename(sourcePath));
  }

  fs.renameSync(sourcePath, destinationAbsolutePath);
} catch (error) {
  console.error(error);
}

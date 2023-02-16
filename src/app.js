/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const [sourcePath, destinationPath] = process.argv.slice(2);
let newDestinationPath = destinationPath;

const isDirectory = newDestinationPath.endsWith('/');

if (isDirectory) {
  const filename = path.basename(sourcePath);

  newDestinationPath = path.join(newDestinationPath, filename);
}

const destinationDirectory = path.dirname(newDestinationPath);

if (!fs.existsSync(destinationDirectory)) {
  console.log(`${destinationDirectory} does not exist`);
  process.exit(1);
}

fs.rename(sourcePath, newDestinationPath, (err) => {
  if (err) {
    throw err;
  }
});

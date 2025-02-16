/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
const destination = process.argv[3];

try {
  if (!file || !destination || !fs.existsSync(file)) {
    throw new Error('error');
  }

  if (
    destination.endsWith('/') ||
    (fs.existsSync(destination) && fs.statSync(destination).isDirectory())
  ) {
    const rightPath = path.join(destination, path.basename(file));

    fs.renameSync(file, rightPath);
  } else {
    fs.renameSync(file, destination);
  }
} catch (error) {
  console.error(error);
}

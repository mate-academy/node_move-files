/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const [source, destination] = process.argv.slice(2);

try {
  if (!source || !destination) {
    throw new Error('Wrong params');
  }

  let destinationAbsPath = path.resolve(destination);

  if (
    fs.existsSync(destinationAbsPath) &&
    fs.statSync(destinationAbsPath).isDirectory()
  ) {
    destinationAbsPath = path.join(destinationAbsPath, path.basename(source));
  }

  fs.renameSync(source, destinationAbsPath);
} catch (err) {
  console.error(err);
}

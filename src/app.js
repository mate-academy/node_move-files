/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const [source, destination] = process.argv.slice(2);

try {
  if (!source || !destination) {
    console.error('Please provide both source and destination paths.');
  }

  let destinationPath = path.resolve(destination);

  if (
    fs.existsSync(destinationPath) &&
    fs.statSync(destinationPath).isDirectory()
  ) {
    destinationPath = path.join(destinationPath, path.basename(source));
  }

  fs.renameSync(source, destinationPath);
} catch (error) {
  console.error(error);
}

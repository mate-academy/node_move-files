'use strict';

const fs = require('fs');
const path = require('path');

const [source, destination] = process.argv.slice(2);

if (!source || !destination) {
  console.error('Usage: node index source destination');
  process.exit(1);
}

const isDirectory = destination.endsWith('/');
const destinationPath = isDirectory ? path.join(destination, path.basename(source)) :  destination;

console.log(path.join(destination, path.basename(source)));

if (isDirectory && !fs.existsSync(destination)) {
  console.error(`Error: ${destination} does not exist`);
  process.exit(1);
}

fs.rename(source, destinationPath, (err) => {
  if (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  console.log(`File moved from ${source} to ${destinationPath}`);
});

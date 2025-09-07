/* eslint-disable no-console */
'use strict';

const fsCb = require('fs');
const path = require('path');

const [subject, destination] = process.argv.slice(2);

if (process.argv.slice(2).length !== 2) {
  console.error('Usage: node index <source> <destination>');

  process.exit(0);
}

const fileName = path.basename(subject);
let destinationIsDirectory = false;

try {
  destinationIsDirectory = fsCb.statSync(destination).isDirectory();
} catch (error) {}

const correctDestination = destinationIsDirectory
  ? path.join(destination, fileName)
  : destination;

if (!destinationIsDirectory && destination.endsWith(path.sep)) {
  console.error('Destination must be correct path');

  process.exit(0);
}

try {
  fsCb.accessSync(subject, fsCb.constants.F_OK);

  if (fsCb.statSync(subject).isDirectory()) {
    console.error('Subject must be a file');
    process.exit(0);
  }
} catch (subError) {
  console.error(`subject doesn't exist`);
  process.exit(0);
}

try {
  fsCb.renameSync(subject, correctDestination);
} catch (err) {
  console.error(err);
}

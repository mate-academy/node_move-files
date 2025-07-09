'use strict';

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 2) {
  // eslint-disable-next-line no-console
  console.error('Invalid number of arguments');
  process.exit(1);
}

const [source, destination] = args;

const src = path.resolve(source);
const dest = path.resolve(destination);

if (!fs.existsSync(src)) {
  // eslint-disable-next-line no-console
  console.error('Source file does not exist');
  process.exit(1);
}

if (!fs.statSync(src).isFile()) {
  // eslint-disable-next-line no-console
  console.error('Source is not a file');
  process.exit(1);
}

let finalDest;

if (
  destination.endsWith(path.sep) ||
  (fs.existsSync(dest) && fs.statSync(dest).isDirectory())
) {
  if (!fs.existsSync(dest)) {
    // eslint-disable-next-line no-console
    console.error('Destination does not exist');
    process.exit(1);
  }

  finalDest = path.join(dest, path.basename(src));
} else {
  finalDest = dest;

  const parentDir = path.dirname(finalDest);

  if (!fs.existsSync(parentDir)) {
    // eslint-disable-next-line no-console
    console.error('Destination directory does not exist');
    process.exit(1);
  }
}

if (src === finalDest) {
  process.exit(0);
}

try {
  fs.renameSync(src, finalDest);
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(`Error moving file: ${err.message}`);
  process.exit(1);
}

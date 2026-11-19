'use strict';

const fs = require('fs');
const path = require('path');

const [, , source, destination] = process.argv;

if (!source || !destination) {
  process.stderr.write('Error: Source and destination are required');
  process.exit(0);
}

if (!fs.existsSync(source)) {
  process.stderr.write('Error: Source file does not exist');
  process.exit(0);
}

if (!fs.statSync(source).isFile()) {
  process.stderr.write('Error: Source must be a file');
  process.exit(0);
}

let destPath = destination;

if (destination.endsWith('/')) {
  if (!fs.existsSync(destination) || !fs.statSync(destination).isDirectory()) {
    process.stderr.write('Error: Destination directory does not exist');
    process.exit(0);
  }
  destPath = path.join(destination, path.basename(source));
} else if (
  fs.existsSync(destination) &&
  fs.statSync(destination).isDirectory()
) {
  destPath = path.join(destination, path.basename(source));
} else {
  const destDir = path.dirname(destination);

  if (destDir !== '.' && !fs.existsSync(destDir)) {
    process.stderr.write('Error: Destination directory does not exist');
    process.exit(0);
  }
}

if (source === destPath) {
  process.exit(0);
}

fs.renameSync(source, destPath);

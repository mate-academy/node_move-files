'use strict';

const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  if (!fs.statSync(source).isFile()) {
    throw new Error('Source must be a file');
  }

  let destinationStats;

  try {
    destinationStats = fs.statSync(destination);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }

  const isDirectory = destinationStats && destinationStats.isDirectory();

  if (destination.endsWith('/') && !isDirectory) {
    throw new Error('Destination directory does not exist');
  }

  const target = isDirectory
    ? path.join(destination, path.basename(source))
    : destination;

  if (!fs.statSync(path.dirname(target)).isDirectory()) {
    throw new Error('Destination parent must be a directory');
  }

  if (path.resolve(source) === path.resolve(target)) {
    return;
  }

  try {
    fs.renameSync(source, target);
  } catch (error) {
    if (error.code !== 'EXDEV') {
      throw error;
    }

    fs.copyFileSync(source, target);
    fs.unlinkSync(source);
  }
}

try {
  const args = process.argv.slice(2);

  if (args.length !== 2 || args.some((arg) => arg.startsWith('-'))) {
    throw new Error('Usage: node src/app.js <source> <destination> (no flags)');
  }

  moveFile(args[0], args[1]);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
}

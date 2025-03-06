/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function move(file, dest) {
  try {
    checkArgs(file, dest);
    checkFile(file);

    const destPath = getDestinationPath(file, dest);

    checkDestination(destPath);
    submit(file, destPath);
  } catch (error) {
    console.error(error.message);
  }
}

function checkArgs(file, dest) {
  if (!file || !dest) {
    throw new Error('Source and Destination must be provide.');
  }

  if (file === dest) {
    process.exit(0);
  }
}

function checkFile(file) {
  if (!fs.existsSync(file)) {
    throw new Error('Source does not exists.');
  }

  if (fs.statSync(file).isDirectory()) {
    throw new Error('Source is a directory, must be a file.');
  }
}

function getDestinationPath(file, dest) {
  let destPath = dest;

  if (dest[dest.length - 1] === '/') {
    destPath = path.join(dest, path.basename(file));
  }

  if (fs.existsSync(dest) && fs.statSync(dest).isDirectory()) {
    destPath = path.join(dest, path.basename(file));
  }

  return destPath;
}

function checkDestination(dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).isFile()) {
    throw new Error('Destination file already exists');
  }
}

function submit(file, destPath) {
  fs.renameSync(file, destPath);
}

const args = process.argv.slice(2);

move(...args);

module.exports = { move };

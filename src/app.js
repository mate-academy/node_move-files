/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.error('Usage: node app.js <source> <destination>');
} else {
  moveFile(args[0], args[1]);
}

function moveFile(source, destination) {
  const resolvedSource = path.resolve(source);
  let resolvedDestination = path.resolve(destination);

  try {
    if (!fs.existsSync(resolvedSource)) {
      throw new Error('Source file does not exist');
    }

    if (
      destination.endsWith('/') ||
      (fs.existsSync(resolvedDestination) &&
        fs.lstatSync(resolvedDestination).isDirectory())
    ) {
      resolvedDestination = path.join(
        resolvedDestination,
        path.basename(source),
      );
    } else {
      const directory = path.dirname(resolvedDestination);

      if (!fs.existsSync(directory)) {
        throw new Error('Destination directory does not exist');
      }
    }

    fs.renameSync(resolvedSource, resolvedDestination);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  moveFile,
};

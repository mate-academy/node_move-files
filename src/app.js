/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');

function moveFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    throw new Error('Expected 2 arguments');
  }

  const [source, destination] = args;
  const normalizedSource = path.resolve(source);
  const normalizedDestination = path.resolve(destination);

  if (normalizedSource === normalizedDestination) {
    return;
  }

  if (!fs.statSync(source).isFile()) {
    throw new Error('Source must be a file');
  }

  const isEndWithSlash =
    destination.endsWith('/') || destination.endsWith('\\');
  let resultPath = destination;

  if (isEndWithSlash) {
    if (!fs.existsSync(destination)) {
      throw new Error('The folder does not exist');
    }

    resultPath = path.join(destination, path.basename(source));
  } else if (
    fs.existsSync(destination) &&
    fs.statSync(destination).isDirectory()
  ) {
    resultPath = path.join(destination, path.basename(source));
  }

  fs.renameSync(source, resultPath);
}

try {
  moveFile();
} catch (error) {
  console.error(error.message);
}

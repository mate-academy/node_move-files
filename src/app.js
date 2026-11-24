/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');

function moveFile() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Expected 2 arguments');

    return;
  }

  const [source, destination] = args;
  const normalizedSource = path.resolve(source);
  const normalizedDestination = path.resolve(destination);

  if (normalizedSource === normalizedDestination) {
    return;
  }

  const isEndWithSlash =
    destination.endsWith('/') || destination.endsWith('\\');
  let resultPath = destination;

  if (isEndWithSlash) {
    if (!fs.existsSync(destination)) {
      console.error('The folder does not exist');

      return;
    }

    resultPath = path.join(destination, path.basename(source));
  } else if (
    fs.existsSync(destination) &&
    fs.statSync(destination).isDirectory()
  ) {
    resultPath = path.join(destination, path.basename(source));
  }

  try {
    fs.renameSync(source, resultPath);
  } catch (error) {
    console.error(error.message);
  }
}

moveFile();

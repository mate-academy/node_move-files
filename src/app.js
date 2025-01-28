/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  if (!source || !destination) {
    console.error('error');

    return;
  }

  const sourcePath = path.resolve(source);
  const destinationPath = path.resolve(destination);

  try {
    if (!fs.existsSync(sourcePath)) {
      console.error('error');

      return;
    }

    const sourceStats = fs.statSync(sourcePath);

    if (!sourceStats.isFile()) {
      console.error('not a file');

      return;
    }

    let target = destinationPath;

    if (
      destination.endsWith(path.sep) ||
      (fs.existsSync(destinationPath) &&
        fs.statSync(destinationPath).isDirectory())
    ) {
      if (!fs.existsSync(destinationPath)) {
        console.error('destination directory does not exist');
      }
      target = path.join(destinationPath, path.basename(source));
    }

    fs.renameSync(sourcePath, target);
  } catch (error) {
    console.error(error);
  }
}

const [consoleSource, consoleDestination] = process.argv.slice(2);

moveFile(consoleSource, consoleDestination);

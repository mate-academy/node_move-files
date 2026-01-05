// write code here
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const [, , sourceArg, destinationArg] = process.argv;

  if (!sourceArg || !destinationArg) {
    console.error('Not enough parameters');

    return;
  }

  const source = path.resolve(sourceArg);
  const destination = path.resolve(destinationArg);
  const isDestinationDirectory = destinationArg.endsWith(path.sep);

  if (!fs.existsSync(source)) {
    console.error('Source does not exist');

    return;
  }

  const sourceStat = fs.statSync(source);

  if (!sourceStat.isFile()) {
    console.error('Source is not a file');

    return;
  }

  if (isDestinationDirectory) {
    if (!fs.existsSync(destination)) {
      throw new Error('Destination directory does not exist');
    }

    const destStat = fs.statSync(destination);

    if (!destStat.isDirectory()) {
      console.error('Destination is not a directory');

      return;
    }

    const finalPath = path.join(destination, path.basename(source));

    fs.renameSync(source, finalPath);

    return;
  }

  if (fs.existsSync(destination)) {
    const destinationStat = fs.statSync(destination);

    if (destinationStat.isDirectory()) {
      const finalPath = path.join(destination, path.basename(source));

      fs.renameSync(source, finalPath);

      return;
    }
  }

  if (isDestinationDirectory) {
    if (
      !fs.existsSync(destination) ||
      !fs.statSync(destination).isDirectory()
    ) {
      throw new Error('Destination directory does not exist');
    }
  } else {
    const parentDir = path.resolve(path.dirname(destination));

    if (!fs.existsSync(parentDir) || !fs.statSync(parentDir).isDirectory()) {
      console.error('Destination directory does not exist');

      return;
    }
  }

  fs.renameSync(source, destination);
}

moveFile();

module.exports = { moveFile };

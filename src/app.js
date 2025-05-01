/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [sourcePath, destinationPath] = process.argv.slice(2);

  if (!sourcePath || !destinationPath) {
    console.error('You should write 2 files');

    return;
  }

  if (!fs.existsSync(sourcePath) || !fs.statSync(sourcePath).isFile()) {
    console.error('Source file does not exist or is not a file.');

    return;
  }

  let destination = destinationPath;

  if (destinationPath.endsWith('/')) {
    if (
      !fs.existsSync(destinationPath) ||
      !fs.statSync(destination).isDirectory()
    ) {
      console.error(`${destinationPath} does not exist`);

      return;
    }

    destination = path.join(destinationPath, path.basename(sourcePath));
  } else if (
    fs.existsSync(destinationPath) &&
    fs.statSync(destinationPath).isDirectory()
  ) {
    destination = path.join(destinationPath, path.basename(sourcePath));
  }

  try {
    if (path.resolve(sourcePath) === path.resolve(destination)) {
      return;
    }

    fs.renameSync(sourcePath, destination);
  } catch (err) {
    console.error(`Error moving file: ${err.message}`);
  }
}

moveFile();

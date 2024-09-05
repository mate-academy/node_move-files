/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    return console.error('Error');
  }

  const sourcePath = path.resolve(source);
  let destinationPath = path.resolve(destination);

  try {
    if (
      fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory()
    ) {
      const basename = path.basename(sourcePath);

      destinationPath = path.join(destinationPath, basename);
    }

    return fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    return console.error('Error');
  }
}

moveFile();

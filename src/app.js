/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFiles() {
  const [source, destination] = process.argv.slice(2);

  if (!source || !destination) {
    console.error('Please provide source and destination paths');

    return;
  }

  const sourcePath = path.resolve(source);
  let destinationPath = path.resolve(destination);

  const isDirectory =
    fs.existsSync(destinationPath) &&
    fs.statSync(destinationPath).isDirectory();

  try {
    if (isDirectory) {
      const basename = path.basename(sourcePath);

      destinationPath = path.join(destinationPath, basename);
    }

    fs.renameSync(sourcePath, destinationPath);
  } catch (error) {
    console.error(error);
  }
}

moveFiles();

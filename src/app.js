/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const [sourcePath, destinationPath] = process.argv.slice(2);

  try {
    if (!sourcePath || !destinationPath) {
      throw new Error('Please provide source and destination paths');
    }

    if (sourcePath === destinationPath) {
      return;
    }

    if (!fs.existsSync(sourcePath)) {
      throw new Error('Source file does not exist');
    }

    let destinationDir = destinationPath;

    if (
      fs.existsSync(destinationPath) &&
      fs.statSync(destinationPath).isDirectory()
    ) {
      const fileName = path.basename(sourcePath);

      destinationDir = path.join(destinationPath, fileName);
    }

    fs.renameSync(sourcePath, destinationDir);
  } catch (error) {
    console.error(error);
  }
}

moveFile();

'use strict';

const fs = require('fs');
const path = require('path');

function createFile() {
  fs.writeFileSync('aboba/1234.txt', '322');
}

function moveFile() {
  try {
    if (process.argv[2] === 'mv') {
      const [filePath, destinationPath] = process.argv.slice(3);

      const destinationDir = path.dirname(destinationPath);

      if (!fs.existsSync(destinationDir)) {
        throw new Error('Directory did not exist');
      }

      const destination = path.basename(destinationPath);

      const isDestinationDir = fs.existsSync(destination)
        ? fs.statSync(destinationPath).isDirectory()
        : false;

      const newFilePath = isDestinationDir
        ? path.join(destinationPath, path.basename(filePath))
        : destinationPath;

      const fileData = fs.readFileSync(filePath);

      fs.rmSync(filePath);

      fs.writeFileSync(newFilePath, fileData);
    }
  } catch (error) {
    throw new Error(error);
  }
}

createFile();
moveFile();

/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

async function moveFile() {
  const params = process.argv.slice(2);

  if (params.length < 2) {
    console.error('Usage: node app.js <sourceFile> <destinationFile>');

    return;
  }

  const sourceFile = params[0];
  const sourceFileName = path.basename(sourceFile);
  const destinationFile = params[1];
  const destinationDir = path.dirname(destinationFile);

  if (sourceFile === destinationFile) {
    return;
  }

  if (!fs.existsSync(sourceFile)) {
    console.error(`Source file does not exist: ${sourceFile}`);

    return;
  }

  if (
    fs.existsSync(destinationFile) &&
    fs.statSync(destinationFile).isDirectory()
  ) {
    fs.renameSync(sourceFile, path.join(destinationFile, sourceFileName));

    return;
  }

  if (destinationFile.endsWith('/')) {
    // destination is a directory

    if (!fs.existsSync(destinationFile.slice(0, -1))) {
      console.error(`Destination directory does not exist: ${destinationFile}`);

      return;
    }

    fs.renameSync(sourceFile, path.join(destinationFile, sourceFileName));

    return;
  }

  // destination is a file without extension or new filename
  if (destinationDir !== '.' && !fs.existsSync(destinationDir)) {
    console.error(`Destination directory does not exist: ${destinationDir}`);

    return;
  }

  fs.renameSync(sourceFile, destinationFile);
}

moveFile();

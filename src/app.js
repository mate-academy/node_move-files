/* eslint-disable no-console */
// write code here
const fs = require('fs');
const path = require('path');

function moveFiles() {
  const fileLocation = process.argv[2];
  const destinationLocation = process.argv[3];

  if (process.argv.length < 4) {
    console.error(
      'Usage: node app.js <source_file_path> <destination_file_path>',
    );

    return;
  }

  if (!fileLocation || !destinationLocation) {
    console.error('Please provide both the source and destination file paths.');

    return;
  }

  if (fileLocation === destinationLocation) {
    return;
  }

  if (!fs.existsSync(fileLocation)) {
    console.error('Source file does not exist.');

    return;
  }

  if (fs.lstatSync(fileLocation).isDirectory()) {
    console.error('Source path is a directory. Please provide a file path.');

    return;
  }

  const dirPath = destinationLocation.replace(/\/+$/, '');
  const isDirPath =
    destinationLocation.endsWith('/') || destinationLocation.endsWith('\\');

  if (!fs.existsSync(dirPath) && isDirPath) {
    console.error(`Destination path is a directory,
      please provide a file path.`);

    return;
  }

  try {
    if (
      fs.existsSync(destinationLocation) &&
      fs.lstatSync(destinationLocation).isDirectory()
    ) {
      const fileName = path.basename(fileLocation);
      const newDestination = path.join(destinationLocation, fileName);

      fs.renameSync(fileLocation, newDestination);
      console.log(`File moved from ${fileLocation} to ${newDestination}`);
    } else {
      fs.renameSync(fileLocation, destinationLocation);
      console.log(`File moved from ${fileLocation} to ${destinationLocation}`);
    }
  } catch (err) {
    console.error('Error moving file:', err);
  }
}

moveFiles();

module.exports = moveFiles;

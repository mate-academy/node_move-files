/* eslint-disable no-console */
// write code here
const fs = require('fs');
const path = require('path');

function moveFiles(file, destination) {
  if (!fs.existsSync(file)) {
    console.error('error: non-existent source file');

    return;
  }

  if (file === destination) {
    return;
  }

  let movePath;

  try {
    const parentDir = path.dirname(destination);

    if (!fs.existsSync(parentDir)) {
      console.error(
        'Error: Parent directory of the destination does not exist',
      );

      return;
    }

    if (destination.endsWith('/')) {
      if (!fs.existsSync(destination)) {
        console.error('Error: Destination directory does not exist');

        return;
      }
    }

    if (fs.existsSync(destination)) {
      const destinationStatus = fs.statSync(destination);

      if (destinationStatus.isDirectory()) {
        const fileName = path.basename(file);

        movePath = path.join(destination, fileName);
      } else {
        movePath = destination;
      }
    } else {
      movePath = destination;
    }
  } catch (error) {
    console.error('Unexpected error:', error.message);

    return;
  }

  try {
    fs.cpSync(file, movePath);
    fs.rmSync(file);
  } catch (error) {
    console.error('Error during file move:', error.message);
  }
}

const args = process.argv.slice(2);
const filePath = args[0];
const destinationPath = args[1];

if (args.length === 2) {
  moveFiles(filePath, destinationPath);
} else {
  console.error('error: the function takes 2 arguments');
}

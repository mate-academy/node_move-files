/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile(source, destination) {
  try {
    if (!fs.existsSync(source)) {
      throw new Error('Source file does not exist.');
    }

    let destinationPath = destination;

    if (fs.existsSync(destination) && fs.statSync(destination).isDirectory()) {
      destinationPath = path.join(destination, path.basename(source));
    }

    fs.renameSync(source, destinationPath);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error('There must be 2 arguments');
} else {
  moveFile(args[0], args[1]);
}

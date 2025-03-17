/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function move() {
  if (process.argv.length < 4) {
    console.error(
      'Error: need 4 args: node src/app.js sourcePath destinationPath',
    );

    return;
  }

  const [file, destination] = process.argv.slice(2);

  if (file === destination) {
    return;
  }

  if (!fs.existsSync(file)) {
    console.error('Error: the source file does not exist');

    return;
  }

  const destExists = fs.existsSync(destination);
  let isDestDirectory = false;

  if (!destExists && destination[destination.length - 1] === '/') {
    console.error('Error: the destination file does not exist');
  }

  if (destExists) {
    isDestDirectory = fs.statSync(destination).isDirectory();
  }

  let targetPath = destination;

  if (isDestDirectory) {
    const fileName = path.basename(file);

    targetPath = path.join(destination, fileName);
  }

  fs.rename(file, targetPath, (err) => {
    if (err) {
      console.error('Error moving file:', err);

      return;
    }

    console.log(`File moved to ${targetPath}`);
  });
}

move();

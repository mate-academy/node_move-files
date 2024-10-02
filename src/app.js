/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

function moveFile() {
  const [oldPath, newPath] = process.argv.slice(2);

  if (!oldPath || !newPath) {
    console.error('Please provide two params');

    return;
  }

  const destinationIsDir =
    fs.existsSync(newPath) && fs.lstatSync(newPath).isDirectory();

  const finalDest = destinationIsDir
    ? path.join(newPath, path.basename(oldPath))
    : newPath;

  fs.rename(oldPath, finalDest, (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log(`File moved to ${finalDest}`);
    }
  });
}

moveFile();

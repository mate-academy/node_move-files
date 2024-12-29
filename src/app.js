const fs = require('fs');
const path = require('path');

let destination = process.argv[3];
const sourceFile = process.argv[2];

try {
  const destinationIsDirectory =
    fs.existsSync(destination) && fs.statSync(destination).isDirectory();

  if (destinationIsDirectory) {
    const newFileName = path.basename(sourceFile);

    destination = path.join(destination, newFileName);
  }

  fs.renameSync(sourceFile, destination);
} catch (error) {
  global.console.error(error);
}

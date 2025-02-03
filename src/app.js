const fs = require('fs');
const path = require('path');

const source = process.argv[2];
let destination = process.argv[3];

try {
  const destinationIsDirectory =
    fs.existsSync(destination) && fs.statSync(destination).isDirectory();

  if (destinationIsDirectory) {
    const newFileName = path.basename(source);

    destination = path.join(destination, newFileName);
  }

  fs.renameSync(source, destination);
} catch (error) {
  global.console.error(error);
}

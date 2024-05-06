const fs = require('fs');
const path = require('path');

let moveToFile = process.argv[3];
const file = process.argv[2];

try {
  const isDirectory =
    fs.existsSync(moveToFile) && fs.statSync(moveToFile).isDirectory();

  if (isDirectory) {
    const newFile = path.basename(file);

    moveToFile = path.join(moveToFile, newFile);
  }

  fs.renameSync(file, moveToFile);
} catch (err) {
  global.console.error(err);
}
